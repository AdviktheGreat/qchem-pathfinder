import { describe, expect, it } from "vitest";
import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology";
import {
  explainRecommendationContext,
  getFitLabel,
  getRecommendations,
  rankNiches,
} from "@/lib/recommendation";
import type { AnswerMap } from "@/lib/types";

const definition = computationalBiologyPathfinder;
const context = {
  questions: definition.survey.questions,
  niches: definition.recommendations.niches,
  openExplorationIds: definition.recommendations.openExplorationIds,
  scoring: definition.recommendations.scoring,
};

describe("balanced computational biology recommendations", () => {
  it("keeps uncertainty open, varied, and honest", () => {
    const answers: AnswerMap = {
      "biology-motivation": ["open"],
      "biology-question-kind": ["unsure"],
      "biology-scale": ["unsure"],
      "biology-evidence": ["unsure"],
      "biology-workflow": ["unsure"],
      "biology-data-method-focus": ["unsure"],
      "biology-data-method-evidence": ["unsure"],
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
      "biology-motivation": ["open"],
      "biology-question-kind": ["unsure"],
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
      "biology-motivation": ["data-methods"],
      "biology-data-method-focus": ["build-predictor"],
      "biology-data-method-evidence": ["generalization"],
      "biology-question-kind": ["compare"],
      "biology-scale": ["communities-ecosystems"],
      "biology-evidence": ["structures-images", "trees-time"],
      "biology-workflow": ["visualize", "interpret-literature"],
    };
    const results = getRecommendations(answers, undefined, context);

    expect(results[0].niche.id).toBe("machine-learning-biological-prediction");
    expect(new Set(results.map((result) => result.niche.id)).size).toBe(3);
    expect(results.every((result) => Number.isFinite(result.score))).toBe(true);
    expect(results[0].interestReasons.length).toBeGreaterThan(0);
    expect(results[0].styleReasons.length).toBeGreaterThan(0);
  });

  it("does not let confidence calibration alter the ranking", () => {
    const preferences: AnswerMap = {
      "biology-motivation": ["proteins"],
      "biology-protein-focus": ["simulate-motion"],
      "biology-protein-evidence": ["trajectory"],
    };
    const newStudent = rankNiches(
      {
        ...preferences,
        "biology-starting-point": ["new"],
        "biology-coding-comfort": ["new"],
        "biology-statistics-comfort": ["new"],
      },
      context,
    );
    const experiencedStudent = rankNiches(
      {
        ...preferences,
        "biology-starting-point": ["comfortable"],
        "biology-coding-comfort": ["enjoy"],
        "biology-statistics-comfort": ["comfortable"],
      },
      context,
    );

    expect(newStudent.map((result) => [result.niche.id, result.score])).toEqual(
      experiencedStudent.map((result) => [result.niche.id, result.score]),
    );
  });
});
