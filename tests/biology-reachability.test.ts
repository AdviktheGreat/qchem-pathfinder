import { describe, expect, it } from "vitest";
import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology";
import { getVisibleQuestions } from "@/lib/branching";
import { getRecommendations } from "@/lib/recommendation";
import type { AnswerMap, Niche, SurveyOption } from "@/lib/types";

const definition = computationalBiologyPathfinder;
const questions = definition.survey.questions;
const context = {
  questions,
  niches: definition.recommendations.niches,
  openExplorationIds: definition.recommendations.openExplorationIds,
  scoring: definition.recommendations.scoring,
};

function supportFor(option: SurveyOption, niche: Niche): number {
  const signalSupport = Object.entries(option.signals ?? {}).reduce(
    (total, [signal, weight]) =>
      total + weight * (niche.affinities[signal] ?? 0),
    0,
  );
  return (
    (option.nicheBoosts?.[niche.id] ?? 0) *
      definition.recommendations.scoring.directBoostMultiplier +
    signalSupport
  );
}

function reachableProfile(niche: Niche): AnswerMap {
  const targeted = questions
    .flatMap((question) =>
      question.options.map((option) => ({ question, option })),
    )
    .filter(({ option }) => (option.nicheBoosts?.[niche.id] ?? 0) > 0)
    .sort(
      (left, right) =>
        supportFor(right.option, niche) - supportFor(left.option, niche),
    )[0];
  if (!targeted) throw new Error(`No targeted path for ${niche.id}`);

  const answers: AnswerMap = {};
  if (targeted.question.visibleWhen) {
    answers[targeted.question.visibleWhen.questionId] = [
      targeted.question.visibleWhen.anyOf[0],
    ];
  }

  while (true) {
    const next = getVisibleQuestions(answers, questions).find(
      (question) => !answers[question.id]?.length,
    );
    if (!next) return answers;

    const option =
      next.id === targeted.question.id
        ? targeted.option
        : [...next.options].sort(
            (left, right) => supportFor(right, niche) - supportFor(left, niche),
          )[0];
    answers[next.id] = [option.id];
  }
}

describe("computational biology direction reachability", () => {
  it.each(definition.recommendations.niches)(
    "reaches $name through a complete visible survey path",
    (niche) => {
      const answers = reachableProfile(niche);
      const visible = getVisibleQuestions(answers, questions);
      const visibleIds = new Set(visible.map((question) => question.id));

      expect(visible.every((question) => answers[question.id]?.length)).toBe(
        true,
      );
      expect(Object.keys(answers).every((id) => visibleIds.has(id))).toBe(true);
      expect(getRecommendations(answers, undefined, context)[0].niche.id).toBe(
        niche.id,
      );
    },
  );
});
