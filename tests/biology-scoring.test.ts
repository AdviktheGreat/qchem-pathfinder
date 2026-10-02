import { describe, expect, it } from "vitest";
import { biologyNicheAffinities } from "@/data/pathfinders/computational-biology/affinities";
import { computationalBiologyNiches } from "@/data/pathfinders/computational-biology/niches";
import { computationalBiologyQuestions } from "@/data/pathfinders/computational-biology/questions";
import { biologyNarrowingBoosts } from "@/data/pathfinders/computational-biology/narrowing-boosts";
import {
  biologyOpenExplorationIds,
  biologyScoringPrinciples,
  biologyScoringWeights,
  biologySignalGroups,
} from "@/data/pathfinders/computational-biology/scoring";

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
});
