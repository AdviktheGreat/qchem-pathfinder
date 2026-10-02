import { describe, expect, it } from "vitest";
import { computationalBiologyQuestions } from "@/data/pathfinders/computational-biology/questions";
import { biologyResultsOverview } from "@/data/pathfinders/computational-biology/results";

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
});
