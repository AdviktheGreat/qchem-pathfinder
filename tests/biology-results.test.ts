import { describe, expect, it } from "vitest";
import { computationalBiologyQuestions } from "@/data/pathfinders/computational-biology/questions";
import {
  biologyDirectionDetailsCopy,
  biologyPrimaryCopy,
  biologyResultsOverview,
} from "@/data/pathfinders/computational-biology/results";
import { computationalBiologyNiches } from "@/data/pathfinders/computational-biology/niches";

describe("computational biology results experience", () => {
  it("summarizes four useful research coordinates", () => {
    const questionIds = new Set(
      computationalBiologyQuestions.map((question) => question.id),
    );

    expect(biologyResultsOverview.dimensions).toHaveLength(4);
    expect(
      biologyResultsOverview.dimensions.every((dimension) =>
        questionIds.has(dimension.questionId),
      ),
    ).toBe(true);
    expect(
      biologyResultsOverview.dimensions.every(
        (dimension) => dimension.fallback.length > 20,
      ),
    ).toBe(true);
  });

  it("frames the primary direction as an exploratory starting point", () => {
    expect(biologyPrimaryCopy.title).toContain("promising");
    expect(biologyPrimaryCopy.description).toContain("not as a final topic");
    expect(biologyPrimaryCopy.description).toContain("not as");
    expect(biologyPrimaryCopy.contextSummary).toContain("Beginner-friendly");
  });

  it("pairs every direction with concrete questions and biological contexts", () => {
    for (const niche of computationalBiologyNiches) {
      expect(niche.questions.length, niche.id).toBeGreaterThanOrEqual(3);
      expect(niche.systems.length, niche.id).toBeGreaterThanOrEqual(4);
      expect(niche.questions.every((question) => question.endsWith("?"))).toBe(
        true,
      );
    }

    expect(biologyDirectionDetailsCopy.questionsHeading).toContain(
      "computational biologists",
    );
    expect(biologyDirectionDetailsCopy.systemsDescription).toContain(
      "research datasets",
    );
  });
});
