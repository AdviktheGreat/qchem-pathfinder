import { describe, expect, it } from "vitest";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { getRecommendationEvidence, rankNiches } from "@/lib/recommendation";
import type { AnswerMap, SurveyOption } from "@/lib/types";

const definition = computationalMaterialsPathfinder;
const questions = definition.survey.questions;
const niches = definition.recommendations.niches;
const context = {
  questions,
  niches,
  openExplorationIds: definition.recommendations.openExplorationIds,
  scoring: definition.recommendations.scoring,
};

function optionForSignal(signal: string) {
  for (const question of questions) {
    const option = question.options.find(
      (candidate) => (candidate.signals?.[signal] ?? 0) > 0,
    );
    if (option) return { question, option };
  }
}

function answersFor(
  questionId: string,
  option: SurveyOption,
  visibleWhen?: { questionId: string; anyOf: string[] },
): AnswerMap {
  return {
    ...(visibleWhen
      ? { [visibleWhen.questionId]: [visibleWhen.anyOf[0]] }
      : {}),
    [questionId]: [option.id],
  };
}

describe("computational materials recommendation explanations", () => {
  it("gives every direction answer-derived interest and style reasons", () => {
    for (const niche of niches) {
      for (const category of ["interest", "style"] as const) {
        const reason = niche.reasons.find(
          (candidate) => candidate.category === category,
        );
        expect(reason, `${niche.id}:${category}`).toBeDefined();
        expect(niche.affinities[reason!.signal], niche.id).toBeGreaterThan(0);

        const source = optionForSignal(reason!.signal);
        expect(source, `${niche.id}:${reason!.signal}`).toBeDefined();
        const result = rankNiches(
          answersFor(
            source!.question.id,
            source!.option,
            source!.question.visibleWhen,
          ),
          context,
        ).find((candidate) => candidate.niche.id === niche.id)!;
        const generated =
          category === "interest"
            ? result.interestReasons
            : result.styleReasons;
        expect(generated, `${niche.id}:${category}`).toContain(reason!.text);
        expect(new Set(generated).size).toBe(generated.length);
      }
    }
  });

  it("provides a specific comparison lens for every direction", () => {
    for (const niche of niches) {
      expect(niche.comparisonLens.length, niche.id).toBeGreaterThan(90);
      expect(niche.comparisonLens, niche.id).toMatch(/^Compared with /);
    }
    expect(new Set(niches.map((niche) => niche.comparisonLens))).toHaveLength(
      niches.length,
    );
  });

  it("uses the configured direct-evidence weight in traceable evidence", () => {
    const answers = {
      "materials-motivation": ["catalysis"],
      "materials-surface-environment-direction": ["electrocatalysis"],
    };
    const result = rankNiches(answers, context).find(
      (candidate) => candidate.niche.id === "electrocatalysis",
    )!;
    const evidence = getRecommendationEvidence(answers, result, 4, context);
    expect(evidence[0]).toMatchObject({
      label: "Electrocatalysis at an electrode",
      kind: "Interest",
      strength: 36,
    });
  });
});
