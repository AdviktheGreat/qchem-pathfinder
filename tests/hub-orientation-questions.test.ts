import { describe, expect, it } from "vitest";
import { hubOrientationQuestions } from "@/data/hub-orientation-questions";
import { hubOrientationSignals } from "@/data/hub-orientation-signals";
import { collectHubOrientationEvidence } from "@/lib/hub-orientation-answers";
import {
  getHubOrientationQuestionPath,
  updateHubOrientationAnswer,
} from "@/lib/hub-orientation-branching";

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

  it("adds only relevant adaptive distinctions", () => {
    expect(
      getHubOrientationQuestionPath(hubOrientationQuestions, {}),
    ).toHaveLength(5);
    expect(
      getHubOrientationQuestionPath(hubOrientationQuestions, {
        "broad-curiosity": "living-systems",
      }).map((question) => question.id),
    ).toContain("molecular-boundary");
    expect(
      getHubOrientationQuestionPath(hubOrientationQuestions, {
        "broad-curiosity": "space-universe",
      }).map((question) => question.id),
    ).toContain("scale-boundary");
    expect(
      getHubOrientationQuestionPath(hubOrientationQuestions, {
        "broad-curiosity": "methods-computing",
      }).map((question) => question.id),
    ).toEqual([
      "broad-curiosity",
      "preferred-system",
      "question-style",
      "working-style",
      "application-balance",
    ]);
  });

  it("removes answers from branches hidden by an earlier edit", () => {
    const answers = {
      "broad-curiosity": "living-systems",
      "preferred-system": "not-sure-yet",
      "molecular-boundary": "biological-function",
    };

    expect(
      updateHubOrientationAnswer(
        hubOrientationQuestions,
        answers,
        "broad-curiosity",
        "methods-computing",
      ),
    ).toEqual({
      "broad-curiosity": "methods-computing",
      "preferred-system": "not-sure-yet",
    });
  });

  it("collects evidence only from selected options", () => {
    expect(
      collectHubOrientationEvidence(hubOrientationQuestions, {
        "broad-curiosity": "living-systems",
        "preferred-system": "not-sure-yet",
      }),
    ).toEqual([
      {
        signalId: "motivation:living-systems",
        label: "Living systems",
        weight: 3,
        uncertainty: undefined,
      },
    ]);
  });
});
