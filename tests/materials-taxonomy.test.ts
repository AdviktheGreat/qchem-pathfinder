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
    expect(niches.map((niche) => niche.id)).toEqual([
      "crystal-phase-stability",
      "defects-disorder-diffusion",
    ]);
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
    ["energy-storage", "cycling-stability", "defects-disorder-diffusion"],
    ["open", "energy-landscape", "crystal-phase-stability"],
  ])("ranks a targeted %s path toward %s", (motivation, choice, expected) => {
    const questionId =
      motivation === "open"
        ? "materials-computation-evidence"
        : "materials-energy-process";
    const recommendations = getRecommendations(
      {
        "materials-motivation": [motivation],
        [questionId]: [choice],
      },
      undefined,
      context,
    );
    expect(recommendations[0].niche.id).toBe(expected);
  });
});
