import { describe, expect, it } from "vitest";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import {
  explainRecommendationContext,
  getFitLabel,
  getRecommendations,
  rankNiches,
} from "@/lib/recommendation";
import type { AnswerMap } from "@/lib/types";

const definition = computationalMaterialsPathfinder;
const context = {
  questions: definition.survey.questions,
  niches: definition.recommendations.niches,
  openExplorationIds: definition.recommendations.openExplorationIds,
  scoring: definition.recommendations.scoring,
};

describe("balanced computational materials recommendations", () => {
  it("keeps uncertainty open, varied, and honest", () => {
    const answers: AnswerMap = {
      "materials-motivation": ["open"],
      "materials-question-kind": ["unsure"],
      "materials-family": ["unsure"],
      "materials-phenomena": ["unsure"],
      "materials-workflow": ["unsure"],
      "materials-computation-direction": ["unsure"],
      "materials-computation-evidence": ["unsure"],
    };
    const results = getRecommendations(answers, undefined, context);

    expect(results.map((result) => result.niche.id)).toEqual(
      definition.recommendations.openExplorationIds,
    );
    expect(new Set(results.map((result) => result.niche.area)).size).toBe(3);
    expect(
      results.map((result) => getFitLabel(result, results[0].score)),
    ).toEqual(["Starting point", "Starting point", "Starting point"]);
    expect(explainRecommendationContext(results)).toContain(
      "varied starting places",
    );
  });

  it("resolves tied evidence in stable taxonomy order", () => {
    const answers = {
      "materials-motivation": ["open"],
      "materials-question-kind": ["unsure"],
    };
    const first = rankNiches(answers, context);
    const second = rankNiches(answers, context);
    const topScore = first[0].score;

    expect(first.map((result) => result.niche.id)).toEqual(
      second.map((result) => result.niche.id),
    );
    expect(
      first.filter((result) => result.score === topScore).length,
    ).toBeGreaterThan(2);
  });

  it("lets a strong narrowing choice outweigh mixed secondary styles", () => {
    const answers: AnswerMap = {
      "materials-motivation": ["data-discovery"],
      "materials-computation-direction": ["machine-learning"],
      "materials-computation-evidence": ["prediction-table"],
      "materials-family": ["soft"],
      "materials-phenomena": ["optical", "mechanical"],
      "materials-purpose-balance": ["fundamental"],
      "materials-change-style": ["dynamic"],
      "materials-workflow": ["visual-models", "equations"],
    };
    const results = getRecommendations(answers, undefined, context);

    expect(results[0].niche.id).toBe("ml-property-prediction");
    expect(new Set(results.map((result) => result.niche.id)).size).toBe(3);
    expect(results.every((result) => Number.isFinite(result.score))).toBe(true);
    expect(results[0].interestReasons.length).toBeGreaterThan(0);
    expect(results[0].styleReasons.length).toBeGreaterThan(0);
  });

  it("does not let confidence calibration alter the ranking", () => {
    const preferences: AnswerMap = {
      "materials-motivation": ["catalysis"],
      "materials-surface-environment-direction": ["electrocatalysis"],
      "materials-surface-environment-process": ["charge-transfer-interface"],
    };
    const newStudent = rankNiches(
      {
        ...preferences,
        "materials-starting-point": ["new"],
        "materials-coding-comfort": ["new"],
      },
      context,
    );
    const experiencedStudent = rankNiches(
      {
        ...preferences,
        "materials-starting-point": ["comfortable"],
        "materials-coding-comfort": ["enjoy"],
      },
      context,
    );

    expect(newStudent.map((result) => [result.niche.id, result.score])).toEqual(
      experiencedStudent.map((result) => [result.niche.id, result.score]),
    );
  });
});
