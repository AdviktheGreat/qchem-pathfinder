import { describe, expect, it } from "vitest";
import { hubOrientationQuestions } from "@/data/hub-orientation-questions";
import { hubOrientationSignals } from "@/data/hub-orientation-signals";
import { pathfinderModules } from "@/data/pathfinder-modules";
import { collectHubOrientationEvidence } from "@/lib/hub-orientation-answers";
import { getHubOrientationBalance } from "@/lib/hub-orientation-balance";
import {
  getHubOrientationQuestionPath,
  updateHubOrientationAnswer,
} from "@/lib/hub-orientation-branching";
import {
  createHubOrientationState,
  restoreHubOrientationState,
  serializeHubOrientationState,
} from "@/lib/hub-orientation-persistence";
import { rankHubOrientation } from "@/lib/hub-orientation-ranking";
import type { HubOrientationAnswers } from "@/lib/hub-orientation";

function completeJourney(
  plannedAnswers: Readonly<Record<string, string>>,
): Record<string, string> {
  let answers: Record<string, string> = {};

  while (true) {
    const question = getHubOrientationQuestionPath(
      hubOrientationQuestions,
      answers,
    ).find((candidate) => !answers[candidate.id]);
    if (!question) return answers;

    const optionId = plannedAnswers[question.id];
    expect(optionId, `Missing journey answer for ${question.id}`).toBeDefined();
    expect(
      question.options.some((option) => option.id === optionId),
      `Unknown journey answer ${optionId} for ${question.id}`,
    ).toBe(true);
    answers = updateHubOrientationAnswer(
      hubOrientationQuestions,
      answers,
      question.id,
      optionId,
    );
  }
}

function rankJourney(answers: HubOrientationAnswers) {
  return rankHubOrientation(
    pathfinderModules,
    hubOrientationSignals,
    collectHubOrientationEvidence(hubOrientationQuestions, answers),
  );
}

const journeys = [
  {
    expected: "quantum-chemistry",
    answers: {
      "broad-curiosity": "molecular-health",
      "preferred-system": "molecules-electrons",
      "question-style": "explain-mechanism",
      "working-style": "chemical-mechanisms",
      "application-balance": "balanced-purpose",
      "molecular-boundary": "electronic-chemical-detail",
    },
  },
  {
    expected: "computational-materials",
    answers: {
      "broad-curiosity": "materials-technology",
      "preferred-system": "materials-interfaces",
      "question-style": "design-optimize",
      "working-style": "numerical-simulation",
      "application-balance": "practical-applications",
      "scale-boundary": "material-performance",
    },
  },
  {
    expected: "computational-biology",
    answers: {
      "broad-curiosity": "living-systems",
      "preferred-system": "genes-populations",
      "question-style": "find-data-patterns",
      "working-style": "data-statistics",
      "application-balance": "practical-applications",
      "molecular-boundary": "biological-function",
    },
  },
  {
    expected: "computational-physics",
    answers: {
      "broad-curiosity": "space-universe",
      "preferred-system": "particles-fields",
      "question-style": "develop-theory",
      "working-style": "mathematical-models",
      "application-balance": "fundamental-understanding",
      "scale-boundary": "physical-dynamics",
    },
  },
] as const;

describe("hub orientation release journeys", () => {
  it.each(journeys)(
    "completes a valid journey to $expected",
    ({ expected, answers: plannedAnswers }) => {
      const answers = completeJourney(plannedAnswers);
      const path = getHubOrientationQuestionPath(
        hubOrientationQuestions,
        answers,
      );

      expect(Object.keys(answers)).toHaveLength(path.length);
      expect(rankJourney(answers)[0].pathfinderId).toBe(expected);
    },
  );

  it("keeps an entirely uncertain journey open and complete", () => {
    const answers = completeJourney({
      "broad-curiosity": "not-sure-yet",
      "preferred-system": "not-sure-yet",
      "question-style": "not-sure-yet",
      "working-style": "not-sure-yet",
      "application-balance": "not-sure-yet",
    });
    const rankings = rankJourney(answers);

    expect(Object.keys(answers)).toHaveLength(5);
    expect(rankings.every((ranking) => ranking.score === 0)).toBe(true);
    expect(getHubOrientationBalance(rankings)).toBe("open");
  });

  it("removes obsolete adaptive evidence after an earlier answer changes", () => {
    let answers = completeJourney(journeys[2].answers);
    answers = updateHubOrientationAnswer(
      hubOrientationQuestions,
      answers,
      "broad-curiosity",
      "materials-technology",
    );

    expect(answers["molecular-boundary"]).toBeUndefined();
    expect(
      getHubOrientationQuestionPath(hubOrientationQuestions, answers).map(
        (question) => question.id,
      ),
    ).toContain("scale-boundary");
    expect(
      collectHubOrientationEvidence(hubOrientationQuestions, answers).some(
        (item) => item.label === "Biological function and variation",
      ),
    ).toBe(false);
  });

  it("labels equally supported conflicting paths as a tie", () => {
    const rankings = rankHubOrientation(
      pathfinderModules,
      hubOrientationSignals,
      [
        {
          signalId: "system:materials-interfaces",
          label: "Materials and interfaces",
          weight: 3,
        },
        {
          signalId: "system:genes-populations",
          label: "Genes and populations",
          weight: 3,
        },
      ],
    );

    expect(getHubOrientationBalance(rankings)).toBe("tie");
    expect(rankings[0].score).toBe(rankings[1].score);
  });

  it("round-trips a completed adaptive journey without losing its result", () => {
    const answers = completeJourney(journeys[0].answers);
    const saved = createHubOrientationState(
      { screen: "results", answers },
      new Date("2026-10-13T20:00:00.000Z"),
    );
    const restored = restoreHubOrientationState(
      serializeHubOrientationState(saved),
    );

    expect(restored?.screen).toBe("results");
    expect(restored?.answers).toEqual(answers);
    expect(rankJourney(restored?.answers ?? {})[0].pathfinderId).toBe(
      "quantum-chemistry",
    );
  });
});
