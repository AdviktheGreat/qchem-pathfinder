import { describe, expect, it } from "vitest";
import { computationalMaterialsNiches } from "@/data/pathfinders/computational-materials/niches";

describe("computational materials literature vocabulary", () => {
  it("gives every direction 5–8 distinct starter keywords", () => {
    for (const niche of computationalMaterialsNiches) {
      expect(niche.keywords.length, niche.name).toBeGreaterThanOrEqual(5);
      expect(niche.keywords.length, niche.name).toBeLessThanOrEqual(8);
      expect(
        new Set(niche.keywords.map((keyword) => keyword.toLowerCase())).size,
        niche.name,
      ).toBe(niche.keywords.length);
    }
  });

  it("gives every direction useful related search phrases", () => {
    for (const niche of computationalMaterialsNiches) {
      expect(niche.synonyms.length, niche.name).toBeGreaterThanOrEqual(2);
      expect(
        niche.synonyms.every((synonym) => synonym.trim().length > 0),
        niche.name,
      ).toBe(true);
    }
  });

  it("gives every direction broad, focused, and review searches", () => {
    for (const niche of computationalMaterialsNiches) {
      expect(
        niche.searches.orientation.trim().length,
        niche.name,
      ).toBeGreaterThan(20);
      expect(niche.searches.focused.trim().length, niche.name).toBeGreaterThan(
        20,
      );
      expect(niche.searches.review.trim().length, niche.name).toBeGreaterThan(
        20,
      );
      expect(niche.searches.review, niche.name).toMatch(/review|perspective/i);
      expect(new Set(Object.values(niche.searches)).size, niche.name).toBe(3);
    }
  });
});
