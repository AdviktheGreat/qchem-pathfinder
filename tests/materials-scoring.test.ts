import { describe, expect, it } from "vitest";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import {
  materialsOpenExplorationIds,
  materialsScoringPrinciples,
  materialsScoringWeights,
  materialsSignalGroups,
} from "@/data/pathfinders/computational-materials/scoring";
import { aggregateSignals } from "@/lib/recommendation";

const questions = computationalMaterialsPathfinder.survey.questions;
const context = {
  questions,
  niches: computationalMaterialsPathfinder.recommendations.niches,
  openExplorationIds: materialsOpenExplorationIds,
};

describe("computational materials scoring conventions", () => {
  it("registers every survey signal in one editable vocabulary", () => {
    const registered = new Set<string>(
      Object.values(materialsSignalGroups).flat(),
    );
    const used = new Set(
      questions.flatMap((question) =>
        question.options.flatMap((option) => Object.keys(option.signals ?? {})),
      ),
    );
    expect([...used].filter((signal) => !registered.has(signal))).toEqual([]);
  });

  it("defines increasing signal and direct-narrowing strengths", () => {
    expect(Object.values(materialsScoringWeights.signal)).toEqual([1, 2, 3]);
    expect(Object.values(materialsScoringWeights.directBoost)).toEqual([
      2, 3, 5, 6,
    ]);
    expect(materialsScoringWeights.directBoost.strong * 5).toBeGreaterThan(
      materialsScoringWeights.signal.strong * 3,
    );
    expect(materialsScoringPrinciples).toHaveLength(4);
  });

  it("keeps every uncertainty option free of scoring evidence", () => {
    for (const question of questions) {
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

  it("excludes calibration from scores while retaining declared preferences", () => {
    expect(
      aggregateSignals(
        {
          "materials-starting-point": ["comfortable"],
          "materials-coding-comfort": ["enjoy"],
          "materials-motivation": ["data-discovery"],
          "materials-workflow": ["coding"],
        },
        context,
      ),
    ).toEqual({
      "interest:data-discovery": 3,
      "style:data": 2,
      "style:coding": 3,
    });
  });

  it("uses varied open defaults from structure, application, and methods", () => {
    expect(materialsOpenExplorationIds).toEqual([
      "crystal-phase-stability",
      "porous-separation-storage",
      "method-potential-evaluation",
    ]);
    expect(
      computationalMaterialsPathfinder.recommendations.openExplorationIds,
    ).toBe(materialsOpenExplorationIds);
  });
});
