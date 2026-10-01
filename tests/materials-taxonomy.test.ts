import { describe, expect, it } from "vitest";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { getRecommendations } from "@/lib/recommendation";

const niches = computationalMaterialsPathfinder.recommendations.niches;
const context = {
  questions: computationalMaterialsPathfinder.survey.questions,
  niches,
  openExplorationIds:
    computationalMaterialsPathfinder.recommendations.openExplorationIds,
};

describe("computational materials taxonomy", () => {
  it("starts with complete crystal stability and defect directions", () => {
    expect(niches.map((niche) => niche.id)).toEqual(
      expect.arrayContaining([
        "crystal-phase-stability",
        "defects-disorder-diffusion",
      ]),
    );
    for (const niche of niches) {
      expect(niche.shortDescription.length, niche.id).toBeGreaterThan(50);
      expect(niche.questions.length, niche.id).toBeGreaterThanOrEqual(3);
      expect(niche.systems.length, niche.id).toBeGreaterThanOrEqual(4);
      expect(niche.approaches.length, niche.id).toBeGreaterThanOrEqual(3);
      expect(niche.keywords.length, niche.id).toBeGreaterThanOrEqual(5);
      expect(niche.synonyms.length, niche.id).toBeGreaterThanOrEqual(3);
      expect(niche.searches.orientation, niche.id).toBeTruthy();
      expect(niche.searches.focused, niche.id).toBeTruthy();
      expect(niche.searches.review, niche.id).toContain("review");
    }
  });

  it.each([
    ["open", "motion-defects", "defects-disorder-diffusion"],
    ["open", "energy-landscape", "crystal-phase-stability"],
  ])("ranks a targeted %s path toward %s", (motivation, choice, expected) => {
    const recommendations = getRecommendations(
      {
        "materials-motivation": [motivation],
        "materials-computation-evidence": [choice],
      },
      undefined,
      context,
    );
    expect(recommendations[0].niche.id).toBe(expected);
  });

  it("separates electrode storage from solid-state ion transport", () => {
    expect(niches.map((niche) => niche.id)).toEqual(
      expect.arrayContaining([
        "battery-electrodes",
        "solid-electrolytes-ion-transport",
      ]),
    );

    for (const [choice, expected] of [
      ["battery-electrodes", "battery-electrodes"],
      ["solid-electrolytes", "solid-electrolytes-ion-transport"],
    ]) {
      expect(
        getRecommendations(
          {
            "materials-motivation": ["energy-storage"],
            "materials-energy-direction": [choice],
          },
          undefined,
          context,
        )[0].niche.id,
      ).toBe(expected);
    }
  });

  it("separates solar conversion from coupled heat and charge transport", () => {
    const conversionIds = niches
      .filter((niche) => niche.area === "Energy conversion")
      .map((niche) => niche.id);
    expect(conversionIds).toEqual([
      "photovoltaic-materials",
      "thermoelectric-materials",
    ]);

    for (const [choice, expected] of [
      ["photovoltaics", "photovoltaic-materials"],
      ["thermal", "thermoelectric-materials"],
    ]) {
      expect(
        getRecommendations(
          {
            "materials-motivation": ["energy-conversion"],
            "materials-energy-direction": [choice],
          },
          undefined,
          context,
        )[0].niche.id,
      ).toBe(expected);
    }
  });

  it("separates semiconductor charge control from optical signal behavior", () => {
    for (const [choice, expected] of [
      ["semiconductors", "semiconductor-electronic-materials"],
      ["optoelectronics", "optoelectronic-photonic-materials"],
    ]) {
      const recommendation = getRecommendations(
        {
          "materials-motivation": ["electronics"],
          "materials-electronic-direction": [choice],
        },
        undefined,
        context,
      )[0];
      expect(recommendation.niche.id).toBe(expected);
      expect(recommendation.interestReasons[0]).toContain("directly points");
    }
  });

  it("separates magnetic spin behavior from broader layered quantum states", () => {
    for (const [choice, expected] of [
      ["magnetism", "magnetic-spintronic-materials"],
      ["two-dimensional", "two-dimensional-quantum-materials"],
      ["quantum", "two-dimensional-quantum-materials"],
    ]) {
      expect(
        getRecommendations(
          {
            "materials-motivation": ["electronics"],
            "materials-electronic-direction": [choice],
          },
          undefined,
          context,
        )[0].niche.id,
      ).toBe(expected);
    }
  });

  it("separates heterogeneous surface chemistry from electrocatalysis", () => {
    for (const [choice, expected] of [
      ["surface-catalysis", "heterogeneous-catalysis-surfaces"],
      ["electrocatalysis", "electrocatalysis"],
    ]) {
      expect(
        getRecommendations(
          {
            "materials-motivation": ["catalysis"],
            "materials-surface-environment-direction": [choice],
          },
          undefined,
          context,
        )[0].niche.id,
      ).toBe(expected);
    }
  });

  it("separates general porous separations from hydrogen storage", () => {
    for (const [choice, expected] of [
      ["separation", "porous-separation-storage"],
      ["molecular-storage", "porous-separation-storage"],
      ["hydrogen", "hydrogen-storage-materials"],
    ]) {
      const questionId =
        choice === "hydrogen"
          ? "materials-energy-direction"
          : "materials-surface-environment-direction";
      expect(
        getRecommendations(
          {
            "materials-motivation": [
              choice === "hydrogen"
                ? "energy-conversion"
                : "climate-environment",
            ],
            [questionId]: [choice],
          },
          undefined,
          context,
        )[0].niche.id,
      ).toBe(expected);
    }
  });

  it("separates general soft matter from biological interfaces", () => {
    for (const [choice, expected] of [
      ["polymers-soft", "polymers-soft-materials"],
      ["biomaterials", "computational-biomaterials"],
    ]) {
      expect(
        getRecommendations(
          {
            "materials-motivation": ["soft-health"],
            "materials-structural-soft-direction": [choice],
          },
          undefined,
          context,
        )[0].niche.id,
      ).toBe(expected);
    }
  });

  it("separates mechanical performance from chemical degradation", () => {
    for (const [choice, expected] of [
      ["alloys-ceramics", "structural-alloys-ceramics"],
      ["corrosion", "corrosion-protective-interfaces"],
    ]) {
      expect(
        getRecommendations(
          {
            "materials-motivation": ["structural"],
            "materials-structural-soft-direction": [choice],
          },
          undefined,
          context,
        )[0].niche.id,
      ).toBe(expected);
    }
  });

  it("separates learned property models from automated screening", () => {
    for (const [choice, expected] of [
      ["machine-learning", "ml-property-prediction"],
      ["high-throughput", "high-throughput-materials-discovery"],
    ]) {
      expect(
        getRecommendations(
          {
            "materials-motivation": ["data-discovery"],
            "materials-computation-direction": [choice],
          },
          undefined,
          context,
        )[0].niche.id,
      ).toBe(expected);
    }
  });

  it("completes 22 unique directions with multiscale and method evaluation", () => {
    expect(niches).toHaveLength(22);
    expect(new Set(niches.map((niche) => niche.id))).toHaveLength(22);

    for (const [choice, expected] of [
      ["multiscale", "multiscale-materials-modeling"],
      ["method-comparison", "method-potential-evaluation"],
    ]) {
      expect(
        getRecommendations(
          {
            "materials-motivation": ["fundamentals"],
            "materials-computation-direction": [choice],
          },
          undefined,
          context,
        )[0].niche.id,
      ).toBe(expected);
    }
  });
});
