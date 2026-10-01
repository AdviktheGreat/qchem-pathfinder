import { describe, expect, it } from "vitest";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import {
  materialsOpenExplorationIds,
  materialsScoringPrinciples,
  materialsScoringWeights,
  materialsSignalGroups,
} from "@/data/pathfinders/computational-materials/scoring";
import { aggregateSignals, getRecommendations } from "@/lib/recommendation";

const questions = computationalMaterialsPathfinder.survey.questions;
const context = {
  questions,
  niches: computationalMaterialsPathfinder.recommendations.niches,
  openExplorationIds: materialsOpenExplorationIds,
  scoring: computationalMaterialsPathfinder.recommendations.scoring,
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
    expect(materialsScoringWeights.engine.directBoostMultiplier).toBe(6);
    expect(materialsScoringPrinciples).toHaveLength(4);
  });

  it.each([
    [
      "open",
      "materials-computation-evidence",
      "energy-landscape",
      "crystal-phase-stability",
    ],
    [
      "open",
      "materials-computation-evidence",
      "motion-defects",
      "defects-disorder-diffusion",
    ],
    [
      "energy-storage",
      "materials-energy-direction",
      "battery-electrodes",
      "battery-electrodes",
    ],
    [
      "energy-storage",
      "materials-energy-direction",
      "solid-electrolytes",
      "solid-electrolytes-ion-transport",
    ],
    [
      "energy-conversion",
      "materials-energy-direction",
      "photovoltaics",
      "photovoltaic-materials",
    ],
    [
      "energy-conversion",
      "materials-energy-direction",
      "thermal",
      "thermoelectric-materials",
    ],
    [
      "electronics",
      "materials-electronic-direction",
      "semiconductors",
      "semiconductor-electronic-materials",
    ],
    [
      "light-sensing",
      "materials-electronic-direction",
      "optoelectronics",
      "optoelectronic-photonic-materials",
    ],
    [
      "electronics",
      "materials-electronic-direction",
      "magnetism",
      "magnetic-spintronic-materials",
    ],
    [
      "electronics",
      "materials-electronic-direction",
      "two-dimensional",
      "two-dimensional-quantum-materials",
    ],
    [
      "catalysis",
      "materials-surface-environment-direction",
      "surface-catalysis",
      "heterogeneous-catalysis-surfaces",
    ],
    [
      "catalysis",
      "materials-surface-environment-direction",
      "electrocatalysis",
      "electrocatalysis",
    ],
    [
      "climate-environment",
      "materials-surface-environment-direction",
      "separation",
      "porous-separation-storage",
    ],
    [
      "energy-conversion",
      "materials-energy-direction",
      "hydrogen",
      "hydrogen-storage-materials",
    ],
    [
      "soft-health",
      "materials-structural-soft-direction",
      "polymers-soft",
      "polymers-soft-materials",
    ],
    [
      "soft-health",
      "materials-structural-soft-direction",
      "biomaterials",
      "computational-biomaterials",
    ],
    [
      "structural",
      "materials-structural-soft-direction",
      "alloys-ceramics",
      "structural-alloys-ceramics",
    ],
    [
      "structural",
      "materials-structural-soft-direction",
      "corrosion",
      "corrosion-protective-interfaces",
    ],
    [
      "data-discovery",
      "materials-computation-direction",
      "machine-learning",
      "ml-property-prediction",
    ],
    [
      "data-discovery",
      "materials-computation-direction",
      "high-throughput",
      "high-throughput-materials-discovery",
    ],
    [
      "fundamentals",
      "materials-computation-direction",
      "multiscale",
      "multiscale-materials-modeling",
    ],
    [
      "fundamentals",
      "materials-computation-direction",
      "method-comparison",
      "method-potential-evaluation",
    ],
  ])(
    "keeps the targeted %s %s:%s direction above incidental style evidence",
    (motivation, questionId, optionId, expected) => {
      const answers = {
        "materials-motivation": [motivation],
        "materials-family": ["crystalline"],
        "materials-phenomena": ["optical"],
        "materials-workflow": ["equations"],
        [questionId]: [optionId],
      };
      expect(getRecommendations(answers, undefined, context)[0].niche.id).toBe(
        expected,
      );
    },
  );

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
