import { describe, expect, it } from "vitest";
import { computationalBiologyNiches } from "@/data/pathfinders/computational-biology/niches";
import {
  biologyKeywordCopy,
  biologyQueryGuidance,
  biologySearchCopy,
  biologySearchRefinements,
} from "@/data/pathfinders/computational-biology/results";
import {
  biologyPaperNoteTemplate,
  biologyPaperTypeGuide,
  biologyReadingCopy,
} from "@/data/pathfinders/computational-biology/reading-guidance";

describe("computational biology literature launchpads", () => {
  it("provides a focused, non-duplicated keyword set for every direction", () => {
    for (const niche of computationalBiologyNiches) {
      expect(niche.keywords.length, niche.id).toBeGreaterThanOrEqual(5);
      expect(niche.keywords.length, niche.id).toBeLessThanOrEqual(8);
      expect(new Set(niche.keywords).size, niche.id).toBe(
        niche.keywords.length,
      );
      expect(niche.synonyms.length, niche.id).toBeGreaterThanOrEqual(3);
      expect(new Set(niche.synonyms).size, niche.id).toBe(
        niche.synonyms.length,
      );
    }

    expect(biologyKeywordCopy.description).toContain("biological system");
    expect(biologyKeywordCopy.description).toContain("computational method");
  });

  it("provides three distinct, usable search depths for every direction", () => {
    for (const niche of computationalBiologyNiches) {
      const searches = Object.values(niche.searches);
      expect(searches).toHaveLength(3);
      expect(new Set(searches).size, niche.id).toBe(3);
      expect(searches.every((query) => query.split(" ").length >= 4)).toBe(
        true,
      );
      expect(niche.searches.review, niche.id).toMatch(/review|perspective/i);
    }

    expect(Object.keys(biologyQueryGuidance)).toEqual([
      "orientation",
      "focused",
      "review",
    ]);
    expect(biologySearchRefinements).toHaveLength(3);
    expect(biologySearchCopy.queriesDescription).toContain("recent review");
  });

  it("teaches a source-first reading workflow without inventing citations", () => {
    expect(biologyPaperTypeGuide.map((entry) => entry.term)).toEqual([
      "Review",
      "Perspective",
      "Methods or benchmark paper",
      "Original application study",
    ]);
    expect(biologyReadingCopy.description).toContain("original evidence");
    expect(biologyReadingCopy.citationWarning).toContain("invented citations");
    expect(biologyReadingCopy.checklist).toHaveLength(3);
    expect(biologyPaperNoteTemplate).toContain("Source checked");
    expect(biologyPaperNoteTemplate).toContain(
      "possible alternative explanation",
    );

    for (const niche of computationalBiologyNiches) {
      expect(niche.paperTypes.length, niche.id).toBeGreaterThanOrEqual(3);
      expect(niche.paperTypes.join(" "), niche.id).toMatch(
        /review|perspective/i,
      );
    }
  });
});
