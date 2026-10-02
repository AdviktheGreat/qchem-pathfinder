import { describe, expect, it } from "vitest";
import { biologyNicheAffinities } from "@/data/pathfinders/computational-biology/affinities";
import { computationalBiologyNiches } from "@/data/pathfinders/computational-biology/niches";
import { computationalBiologyQuestions } from "@/data/pathfinders/computational-biology/questions";
import { biologyNarrowingBoosts } from "@/data/pathfinders/computational-biology/narrowing-boosts";
import {
  biologyOpenExplorationIds,
  biologyRecommendationScoring,
  biologyScoringPrinciples,
  biologyScoringWeights,
  biologySignalGroups,
} from "@/data/pathfinders/computational-biology/scoring";
import {
  aggregateSignals,
  getRecommendations,
  rankNiches,
} from "@/lib/recommendation";

const biologyContext = {
  questions: computationalBiologyQuestions,
  niches: computationalBiologyNiches,
  openExplorationIds: biologyOpenExplorationIds,
  scoring: biologyRecommendationScoring,
};

describe("computational biology scoring vocabulary", () => {
  it("registers every survey signal in one editable vocabulary", () => {
    const registered = new Set<string>(
      Object.values(biologySignalGroups).flat(),
    );
    const used = new Set(
      computationalBiologyQuestions.flatMap((question) =>
        question.options.flatMap((option) => Object.keys(option.signals ?? {})),
      ),
    );

    expect([...used].filter((signal) => !registered.has(signal))).toEqual([]);
  });

  it("documents increasing signal and direct-narrowing strengths", () => {
    expect(Object.values(biologyScoringWeights.signal)).toEqual([1, 2, 3]);
    expect(Object.values(biologyScoringWeights.directBoost)).toEqual([
      2, 3, 5, 6,
    ]);
    expect(biologyScoringWeights.engine.directBoostMultiplier).toBe(6);
    expect(biologyScoringPrinciples).toHaveLength(4);
  });

  it("uses valid, varied defaults for an open exploration", () => {
    const nicheIds = new Set(
      computationalBiologyNiches.map((niche) => niche.id),
    );

    expect(biologyOpenExplorationIds).toHaveLength(3);
    expect(biologyOpenExplorationIds.every((id) => nicheIds.has(id))).toBe(
      true,
    );
  });

  it("gives every direction a complete, positive affinity profile", () => {
    expect(Object.keys(biologyNicheAffinities).sort()).toEqual(
      computationalBiologyNiches.map((niche) => niche.id).sort(),
    );

    for (const niche of computationalBiologyNiches) {
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
      computationalBiologyNiches.map((niche) => niche.id),
    );
    const narrowingQuestions = computationalBiologyQuestions.filter(
      (question) => question.stage === "narrowing",
    );

    expect(Object.keys(biologyNarrowingBoosts).sort()).toEqual(
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
      }
    }
  });

  it("makes every biology direction directly reachable", () => {
    const targeted = new Set(
      Object.values(biologyNarrowingBoosts).flatMap((options) =>
        Object.values(options).flatMap((boosts) => Object.keys(boosts)),
      ),
    );

    expect([...targeted].sort()).toEqual(
      computationalBiologyNiches.map((niche) => niche.id).sort(),
    );
  });

  it("keeps every uncertainty answer free of scoring evidence", () => {
    for (const question of computationalBiologyQuestions) {
      for (const option of question.options.filter(
        (candidate) => candidate.uncertainty,
      )) {
        expect(option.signals, `${question.id}:${option.id}`).toBeUndefined();
        expect(
          option.nicheBoosts,
          `${question.id}:${option.id}`,
        ).toBeUndefined();
      }
    }
  });

  it("excludes calibration answers from recommendation signals", () => {
    const preferenceAnswers = {
      "biology-motivation": ["genomes"],
      "biology-question-type": ["compare"],
    };
    const withCalibration = {
      ...preferenceAnswers,
      "biology-starting-point": ["comfortable"],
      "biology-quantitative-comfort": ["comfortable"],
      "biology-coding-comfort": ["enjoy"],
      "biology-explanation-style": ["quantitative"],
    };

    expect(aggregateSignals(withCalibration, biologyContext)).toEqual(
      aggregateSignals(preferenceAnswers, biologyContext),
    );
    expect(
      rankNiches(withCalibration, biologyContext).map(({ niche, score }) => [
        niche.id,
        score,
      ]),
    ).toEqual(
      rankNiches(preferenceAnswers, biologyContext).map(({ niche, score }) => [
        niche.id,
        score,
      ]),
    );
  });

  it("returns varied open defaults when uncertainty provides no evidence", () => {
    const uncertainAnswers = Object.fromEntries(
      computationalBiologyQuestions
        .filter((question) =>
          question.options.some((option) => option.uncertainty),
        )
        .map((question) => [
          question.id,
          [
            question.options.find((option) => option.uncertainty)?.id ??
              "unsure",
          ],
        ]),
    );
    const recommendations = getRecommendations(
      uncertainAnswers,
      undefined,
      biologyContext,
    );

    expect(recommendations.map((result) => result.niche.id)).toEqual(
      biologyOpenExplorationIds,
    );
    expect(recommendations.every((result) => result.score >= 0)).toBe(true);
    expect(
      recommendations.every((result) => result.preferenceEvidenceCount === 0),
    ).toBe(true);
  });
});
