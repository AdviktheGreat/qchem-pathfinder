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
    expect(narrowingIds("proteins")).not.toContain("biology-health-focus");
    expect(narrowingIds("proteins")).not.toContain("biology-health-evidence");
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

  it("shows two genome-focused follow-ups", () => {
    expect(narrowingIds("genomes")).toEqual([
      "biology-genome-focus",
      "biology-genome-evidence",
    ]);
    expect(
      getVisibleQuestions({ "biology-motivation": ["genomes"] }, questions),
    ).toHaveLength(14);
  });

  it("shows two evolution-focused follow-ups", () => {
    expect(narrowingIds("evolution")).toEqual([
      "biology-evolution-focus",
      "biology-evolution-evidence",
    ]);
    expect(
      getVisibleQuestions({ "biology-motivation": ["evolution"] }, questions),
    ).toHaveLength(14);
  });

  it("shows expression and systems follow-ups for the cell branch", () => {
    expect(narrowingIds("cells-systems")).toEqual([
      "biology-cell-expression-focus",
      "biology-cell-systems-focus",
    ]);
    expect(
      getVisibleQuestions(
        { "biology-motivation": ["cells-systems"] },
        questions,
      ),
    ).toHaveLength(14);
  });

  it("shows two protein-focused follow-ups", () => {
    expect(narrowingIds("proteins")).toEqual([
      "biology-protein-focus",
      "biology-protein-evidence",
    ]);
    expect(
      getVisibleQuestions({ "biology-motivation": ["proteins"] }, questions),
    ).toHaveLength(14);
  });

  it("shows two ecology and microbiome follow-ups", () => {
    expect(narrowingIds("microbes-ecosystems")).toEqual([
      "biology-ecology-focus",
      "biology-ecology-evidence",
    ]);
    expect(
      getVisibleQuestions(
        { "biology-motivation": ["microbes-ecosystems"] },
        questions,
      ),
    ).toHaveLength(14);
  });
});
