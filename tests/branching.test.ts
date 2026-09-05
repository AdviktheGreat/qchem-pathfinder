import { describe, expect, it } from "vitest";
import { getVisibleQuestions, pruneHiddenAnswers } from "@/lib/branching";

describe("adaptive branching", () => {
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
});
