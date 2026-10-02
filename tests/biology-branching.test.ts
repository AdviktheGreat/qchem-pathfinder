import { describe, expect, it } from "vitest";
import { computationalBiologyQuestions as questions } from "@/data/pathfinders/computational-biology";
import { getVisibleQuestions } from "@/lib/branching";

function narrowingIds(motivation: string): string[] {
  return getVisibleQuestions({ "biology-motivation": [motivation] }, questions)
    .filter((question) => question.stage === "narrowing")
    .map((question) => question.id);
}

describe("adaptive computational biology questions", () => {
  it("shows two health-focused follow-ups on a fourteen-question path", () => {
    expect(narrowingIds("health-disease")).toEqual([
      "biology-health-focus",
      "biology-health-evidence",
    ]);
    expect(
      getVisibleQuestions(
        { "biology-motivation": ["health-disease"] },
        questions,
      ),
    ).toHaveLength(14);
  });

  it("keeps health follow-ups hidden from unrelated motivations", () => {
    expect(narrowingIds("proteins")).toEqual([]);
  });

  it("shows two therapeutic-discovery follow-ups", () => {
    expect(narrowingIds("therapeutics")).toEqual([
      "biology-therapeutic-focus",
      "biology-therapeutic-evidence",
    ]);
    expect(
      getVisibleQuestions(
        { "biology-motivation": ["therapeutics"] },
        questions,
      ),
    ).toHaveLength(14);
  });
});
