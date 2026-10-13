import { describe, expect, it } from "vitest";
import { hubOrientationQuestions } from "@/data/hub-orientation-questions";
import { hubOrientationSignals } from "@/data/hub-orientation-signals";

describe("hub orientation questions", () => {
  it("uses stable, unique question and option IDs", () => {
    expect(
      new Set(hubOrientationQuestions.map((question) => question.id)).size,
    ).toBe(hubOrientationQuestions.length);

    for (const question of hubOrientationQuestions) {
      expect(new Set(question.options.map((option) => option.id)).size).toBe(
        question.options.length,
      );
      expect(question.options.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("gives every question one neutral uncertainty choice", () => {
    for (const question of hubOrientationQuestions) {
      const uncertain = question.options.filter((option) => option.uncertainty);
      expect(uncertain, question.id).toHaveLength(1);
      expect(uncertain[0].evidence, question.id).toEqual([]);
    }
  });

  it("uses only registered signals as scoring evidence", () => {
    const signalIds = new Set(hubOrientationSignals.map((signal) => signal.id));

    for (const question of hubOrientationQuestions)
      for (const option of question.options)
        for (const evidence of option.evidence)
          expect(signalIds.has(evidence.signalId), evidence.signalId).toBe(
            true,
          );
  });
});
