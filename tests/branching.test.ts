import { describe, expect, it } from "vitest";
import {
  getVisibleQuestions,
  pruneHiddenAnswers,
  getPlannedQuestionCount,
} from "@/lib/branching";
import type { SurveyQuestion } from "@/lib/types";

describe("adaptive branching", () => {
  it("reserves branch questions before motivation without revealing them", () => {
    expect(getVisibleQuestions({})).toHaveLength(14);
    expect(getPlannedQuestionCount({})).toBe(16);
    expect(getPlannedQuestionCount({ motivation: ["light"] })).toBe(16);
  });
  it("shows a focused 16-question path after a motivation is chosen", () => {
    const visible = getVisibleQuestions({ motivation: ["medicine"] });
    expect(visible).toHaveLength(16);
    expect(visible.map((question) => question.id)).toContain("medicine-focus");
    expect(visible.map((question) => question.id)).not.toContain(
      "energy-focus",
    );
  });

  it("switches branches and removes answers that are no longer visible", () => {
    const changed = pruneHiddenAnswers({
      motivation: ["energy"],
      "medicine-focus": ["binding"],
      "energy-focus": ["capture"],
    });
    expect(changed["medicine-focus"]).toBeUndefined();
    expect(changed["energy-focus"]).toEqual(["capture"]);
  });

  it("has exactly two narrowing questions for every broad doorway", () => {
    for (const motivation of [
      "medicine",
      "energy",
      "environment",
      "materials",
      "reactions",
      "light",
      "fundamentals",
      "computing",
      "space",
      "balanced",
    ]) {
      const narrowing = getVisibleQuestions({
        motivation: [motivation],
      }).filter((question) => question.stage === "narrowing");
      expect(narrowing, motivation).toHaveLength(2);
    }
  });

  it("uses a supplied question set and branch question", () => {
    const materialQuestions: SurveyQuestion[] = [
      {
        id: "materials-doorway",
        stage: "motivation",
        kicker: "Doorway",
        title: "Choose a materials doorway",
        type: "single",
        options: [
          { id: "energy", label: "Energy" },
          { id: "electronics", label: "Electronics" },
        ],
      },
      {
        id: "energy-follow-up",
        stage: "narrowing",
        kicker: "Energy",
        title: "Choose an energy focus",
        type: "single",
        visibleWhen: {
          questionId: "materials-doorway",
          anyOf: ["energy"],
        },
        options: [{ id: "battery", label: "Batteries" }],
      },
    ];

    expect(
      getPlannedQuestionCount({}, materialQuestions, "materials-doorway"),
    ).toBe(2);
    expect(
      getVisibleQuestions(
        { "materials-doorway": ["energy"] },
        materialQuestions,
      ).map((question) => question.id),
    ).toEqual(["materials-doorway", "energy-follow-up"]);
  });
});
