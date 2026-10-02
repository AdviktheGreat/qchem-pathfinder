import { describe, expect, it } from "vitest";
import { computationalBiologyQuestions } from "@/data/pathfinders/computational-biology/questions";
import {
  biologyPrimaryCopy,
  biologyResultsOverview,
} from "@/data/pathfinders/computational-biology/results";

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
});
