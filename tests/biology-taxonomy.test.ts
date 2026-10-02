import { describe, expect, it } from "vitest";
import { computationalBiologyNiches } from "@/data/pathfinders/computational-biology";

describe("computational biology Phase 2 taxonomy", () => {
  it("contains twenty-four unique, complete research directions", () => {
    expect(computationalBiologyNiches).toHaveLength(24);
    expect(
      new Set(computationalBiologyNiches.map((niche) => niche.id)).size,
    ).toBe(24);
    expect(
      new Set(computationalBiologyNiches.map((niche) => niche.name)).size,
    ).toBe(24);

    for (const niche of computationalBiologyNiches) {
      expect(niche.shortDescription.length, niche.id).toBeGreaterThan(55);
      expect(niche.explanation.length, niche.id).toBeGreaterThan(220);
      expect(niche.questions, niche.id).toHaveLength(3);
      expect(niche.systems.length, niche.id).toBeGreaterThanOrEqual(4);
      expect(niche.approaches.length, niche.id).toBeGreaterThanOrEqual(3);
      expect(niche.concepts.length, niche.id).toBeGreaterThanOrEqual(4);
      expect(niche.preparation.length, niche.id).toBeGreaterThan(120);
      expect(niche.keywords.length, niche.id).toBeGreaterThanOrEqual(5);
      expect(niche.keywords.length, niche.id).toBeLessThanOrEqual(8);
      expect(niche.synonyms.length, niche.id).toBeGreaterThanOrEqual(3);
      expect(niche.paperTypes.length, niche.id).toBeGreaterThanOrEqual(3);
      expect(niche.searches.orientation, niche.id).toBeTruthy();
      expect(niche.searches.focused, niche.id).toBeTruthy();
      expect(niche.searches.review, niche.id).toContain("review");
      expect(niche.comparisonLens.length, niche.id).toBeGreaterThan(100);
    }
  });

  it("balances molecular, cellular, organismal, population, and ecosystem scales", () => {
    const ids = computationalBiologyNiches.map((niche) => niche.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        "protein-structure-prediction",
        "single-cell-transcriptomics",
        "variant-effect-prediction",
        "population-genomics-history",
        "computational-ecology-biodiversity",
        "bioinformatics-method-benchmarking",
      ]),
    );
  });

  it("keeps biomedical preparation notes educational and non-clinical", () => {
    const biomedicalText = computationalBiologyNiches
      .filter((niche) =>
        [
          "pathogen-genomics-surveillance",
          "virtual-screening-docking",
          "variant-effect-prediction",
          "cancer-genomics",
        ].includes(niche.id),
      )
      .map((niche) => `${niche.explanation} ${niche.preparation}`)
      .join(" ");

    expect(biomedicalText).toContain("not a diagnosis");
    expect(biomedicalText).toContain("not personal genomic data");
    expect(biomedicalText).toContain("not individual diagnoses");
    expect(biomedicalText).toContain("requiring experimental evidence");
  });
});
