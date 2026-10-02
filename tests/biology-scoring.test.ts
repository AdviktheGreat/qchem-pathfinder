import { describe, expect, it } from "vitest";
import { computationalBiologyNiches } from "@/data/pathfinders/computational-biology/niches";
import { computationalBiologyQuestions } from "@/data/pathfinders/computational-biology/questions";
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
});
