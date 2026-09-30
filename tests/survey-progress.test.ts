import { describe, expect, it } from "vitest";
import { getSurveyProgress, indexQuestions } from "@/lib/survey-progress";
import type { SurveyQuestion } from "@/lib/types";

const questions: SurveyQuestion[] = [
  {
    id: "doorway",
    stage: "motivation",
    kicker: "Start",
    title: "Choose a doorway",
    type: "single",
    options: [
      { id: "energy", label: "Energy" },
      { id: "electronics", label: "Electronics" },
    ],
  },
  {
    id: "energy-focus",
    stage: "narrowing",
    kicker: "Narrow",
    title: "Choose an energy focus",
    type: "single",
    options: [{ id: "battery", label: "Batteries" }],
    visibleWhen: { questionId: "doorway", anyOf: ["energy"] },
  },
  {
    id: "style",
    stage: "style",
    kicker: "Style",
    title: "Choose a work style",
    type: "single",
    options: [{ id: "visual", label: "Visual models" }],
  },
];

describe("survey progress", () => {
  it("finds the first unanswered visible question and reserves a branch", () => {
    const progress = getSurveyProgress({}, undefined, questions, "doorway");

    expect(progress.visibleQuestions.map((question) => question.id)).toEqual([
      "doorway",
      "style",
    ]);
    expect(progress.plannedQuestionCount).toBe(3);
    expect(progress.resumeQuestion?.id).toBe("doorway");
    expect(progress.isComplete).toBe(false);
  });

  it("honors a saved visible position and reports completion", () => {
    const answers = {
      doorway: ["energy"],
      "energy-focus": ["battery"],
      style: ["visual"],
    };
    const progress = getSurveyProgress(
      answers,
      "energy-focus",
      questions,
      "doorway",
    );

    expect(progress.answeredCount).toBe(3);
    expect(progress.isComplete).toBe(true);
    expect(progress.resumeQuestion?.id).toBe("energy-focus");
    expect(progress.resumeIndex).toBe(1);
  });

  it("indexes an arbitrary pathfinder question set", () => {
    expect(indexQuestions(questions)["energy-focus"]?.title).toBe(
      "Choose an energy focus",
    );
  });
});
