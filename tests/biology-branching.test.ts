import { describe, expect, it } from "vitest";
import { computationalBiologyQuestions as questions } from "@/data/pathfinders/computational-biology";
import {
  getPlannedQuestionCount,
  getVisibleQuestions,
  pruneHiddenAnswers,
} from "@/lib/branching";

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

  it.each(["data-methods", "open"])(
    "shows two data-method follow-ups for %s",
    (motivation) => {
      expect(narrowingIds(motivation)).toEqual([
        "biology-data-method-focus",
        "biology-data-method-evidence",
      ]);
      expect(
        getVisibleQuestions({ "biology-motivation": [motivation] }, questions),
      ).toHaveLength(14);
    },
  );

  it("provides a complete fourteen-question path for every motivation", () => {
    const motivation = questions.find(
      (question) => question.id === "biology-motivation",
    )!;
    for (const option of motivation.options) {
      const visible = getVisibleQuestions(
        { "biology-motivation": [option.id] },
        questions,
      );
      expect(visible, option.id).toHaveLength(14);
      expect(
        visible.filter((question) => question.stage === "narrowing"),
        option.id,
      ).toHaveLength(2);
    }
    expect(getPlannedQuestionCount({}, questions, "biology-motivation")).toBe(
      14,
    );
  });

  it("removes answers from a previous biology branch", () => {
    const changed = pruneHiddenAnswers(
      {
        "biology-motivation": ["proteins"],
        "biology-health-focus": ["variant-effects"],
        "biology-protein-focus": ["predict-structure"],
      },
      questions,
    );
    expect(changed["biology-health-focus"]).toBeUndefined();
    expect(changed["biology-protein-focus"]).toEqual(["predict-structure"]);
  });

  it("keeps every narrowing uncertainty answer neutral", () => {
    const narrowing = questions.filter(
      (question) => question.stage === "narrowing",
    );
    expect(narrowing).toHaveLength(16);
    for (const question of narrowing) {
      const unsure = question.options.find((option) => option.uncertainty);
      expect(unsure, question.id).toBeDefined();
      expect(unsure?.signals, question.id).toBeUndefined();
      expect(unsure?.nicheBoosts, question.id).toBeUndefined();
    }
  });
});
