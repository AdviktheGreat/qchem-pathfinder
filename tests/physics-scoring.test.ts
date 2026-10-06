import { describe, expect, it } from "vitest";
import {
  computationalPhysicsNiches,
  computationalPhysicsQuestions,
  physicsNarrowingBoosts,
  physicsNicheAffinities,
  physicsNicheReasons,
  physicsOpenExplorationIds,
  physicsRecommendationScoring,
  physicsScoringPrinciples,
  physicsScoringWeights,
  physicsSignalGroups,
} from "@/data/pathfinders/computational-physics";
import { rankNiches } from "@/lib/recommendation";

const physicsContext = {
  questions: computationalPhysicsQuestions,
  niches: computationalPhysicsNiches,
  openExplorationIds: physicsOpenExplorationIds,
  scoring: physicsRecommendationScoring,
};

describe("computational physics scoring fundamentals", () => {
  it("registers every survey signal in one editable vocabulary", () => {
    const registered = new Set<string>(
      Object.values(physicsSignalGroups).flat(),
    );
    const used = new Set(
      computationalPhysicsQuestions.flatMap((question) =>
        question.options.flatMap((option) => Object.keys(option.signals ?? {})),
      ),
    );

    expect([...used].filter((signal) => !registered.has(signal))).toEqual([]);
  });

  it("documents increasing signal and direct-narrowing strengths", () => {
    expect(Object.values(physicsScoringWeights.signal)).toEqual([1, 2, 3]);
    expect(Object.values(physicsScoringWeights.directBoost)).toEqual([
      2, 3, 5, 6,
    ]);
    expect(physicsScoringWeights.engine.directBoostMultiplier).toBe(6);
    expect(physicsScoringPrinciples).toHaveLength(4);
  });

  it("uses valid, scientifically varied open defaults", () => {
    const nicheIds = new Set(
      computationalPhysicsNiches.map((niche) => niche.id),
    );
    const defaultAreas = physicsOpenExplorationIds.map(
      (id) => computationalPhysicsNiches.find((niche) => niche.id === id)?.area,
    );

    expect(physicsOpenExplorationIds).toHaveLength(3);
    expect(physicsOpenExplorationIds.every((id) => nicheIds.has(id))).toBe(
      true,
    );
    expect(new Set(defaultAreas).size).toBe(3);
  });

  it("gives every direction a complete, positive affinity profile", () => {
    expect(Object.keys(physicsNicheAffinities).sort()).toEqual(
      computationalPhysicsNiches.map((niche) => niche.id).sort(),
    );

    for (const niche of computationalPhysicsNiches) {
      expect(
        Object.keys(niche.affinities).length,
        niche.id,
      ).toBeGreaterThanOrEqual(7);
      expect(
        Object.values(niche.affinities).every(
          (weight) => weight >= 1 && weight <= 3,
        ),
        niche.id,
      ).toBe(true);
    }
  });

  it("adds valid direct boosts to every committed narrowing answer", () => {
    const nicheIds = new Set(
      computationalPhysicsNiches.map((niche) => niche.id),
    );
    const narrowingQuestions = computationalPhysicsQuestions.filter(
      (question) => question.stage === "narrowing",
    );

    expect(Object.keys(physicsNarrowingBoosts).sort()).toEqual(
      narrowingQuestions.map((question) => question.id).sort(),
    );

    for (const question of narrowingQuestions) {
      for (const option of question.options.filter(
        (candidate) => !candidate.uncertainty,
      )) {
        expect(option.nicheBoosts, `${question.id}:${option.id}`).toBeDefined();
        expect(
          Object.keys(option.nicheBoosts ?? {}).every((id) => nicheIds.has(id)),
          `${question.id}:${option.id}`,
        ).toBe(true);
        expect(
          Object.values(option.nicheBoosts ?? {}).every(
            (boost) => boost >= 2 && boost <= 6,
          ),
          `${question.id}:${option.id}`,
        ).toBe(true);
      }
    }
  });

  it("makes every physics direction directly reachable", () => {
    const targeted = new Set(
      Object.values(physicsNarrowingBoosts).flatMap((options) =>
        Object.values(options).flatMap((boosts) => Object.keys(boosts)),
      ),
    );

    expect([...targeted].sort()).toEqual(
      computationalPhysicsNiches.map((niche) => niche.id).sort(),
    );
  });

  it("gives every direction answer-grounded interest and style reasons", () => {
    expect(Object.keys(physicsNicheReasons).sort()).toEqual(
      computationalPhysicsNiches.map((niche) => niche.id).sort(),
    );

    for (const niche of computationalPhysicsNiches) {
      expect(
        niche.reasons.some((reason) => reason.category === "interest"),
        niche.id,
      ).toBe(true);
      expect(
        niche.reasons.some((reason) => reason.category === "style"),
        niche.id,
      ).toBe(true);
      expect(
        niche.reasons.every(
          (reason) => (niche.affinities[reason.signal] ?? 0) > 0,
        ),
        niche.id,
      ).toBe(true);
    }
  });

  it("lets every direction lead through a reasonable narrowing answer", () => {
    const reached = new Set<string>();
    const narrowingQuestions = computationalPhysicsQuestions.filter(
      (question) => question.stage === "narrowing",
    );

    for (const question of narrowingQuestions) {
      for (const option of question.options.filter(
        (candidate) => !candidate.uncertainty && candidate.nicheBoosts,
      )) {
        const maximumBoost = Math.max(
          ...Object.values(option.nicheBoosts ?? {}),
        );
        const primaryTargets = Object.entries(option.nicheBoosts ?? {})
          .filter(([, boost]) => boost === maximumBoost)
          .map(([id]) => id);
        const answers = {
          "physics-motivation": [question.visibleWhen?.anyOf[0] ?? "open"],
          [question.id]: [option.id],
        };
        const topId = rankNiches(answers, physicsContext)[0]?.niche.id;

        if (topId && primaryTargets.includes(topId)) reached.add(topId);
      }
    }

    expect([...reached].sort()).toEqual(
      computationalPhysicsNiches.map((niche) => niche.id).sort(),
    );
  });

  it("keeps a targeted answer above weaker incidental preferences", () => {
    const results = rankNiches(
      {
        "physics-motivation": ["quantum-atoms"],
        "physics-question-kind": ["compare"],
        "physics-scale": ["galactic-cosmic"],
        "physics-evidence": ["experimental"],
        "physics-workflow": ["statistics"],
        "physics-quantum-focus": ["noise-decoherence"],
      },
      physicsContext,
    );

    expect(results[0].niche.id).toBe("open-quantum-systems");
    expect(results[0].directScore).toBe(6);
  });

  it("produces stable deterministic rankings for identical answers", () => {
    const answers = {
      "physics-motivation": ["plasma-fusion"],
      "physics-question-kind": ["dynamics"],
      "physics-scale": ["continuum"],
      "physics-plasma-focus": ["reconnection-region"],
    };

    expect(rankNiches(answers, physicsContext)).toEqual(
      rankNiches(answers, physicsContext),
    );
  });
});
