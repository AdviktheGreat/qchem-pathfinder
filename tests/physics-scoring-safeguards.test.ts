import { describe, expect, it } from "vitest";
import {
  computationalPhysicsNiches,
  computationalPhysicsQuestions,
  physicsOpenExplorationIds,
  physicsRecommendationScoring,
} from "@/data/pathfinders/computational-physics";
import {
  aggregateSignals,
  getRecommendations,
  rankNiches,
} from "@/lib/recommendation";

const physicsContext = {
  questions: computationalPhysicsQuestions,
  niches: computationalPhysicsNiches,
  openExplorationIds: physicsOpenExplorationIds,
  scoring: physicsRecommendationScoring,
};

describe("computational physics scoring safeguards", () => {
  it("keeps every uncertainty answer free of scoring evidence", () => {
    for (const question of computationalPhysicsQuestions) {
      for (const option of question.options.filter(
        (candidate) => candidate.uncertainty,
      )) {
        expect(option.signals, `${question.id}:${option.id}`).toBeUndefined();
        expect(
          option.nicheBoosts,
          `${question.id}:${option.id}`,
        ).toBeUndefined();
      }
    }
  });

  it("excludes every calibration answer from signals and rankings", () => {
    const preferenceAnswers = {
      "physics-motivation": ["quantum-atoms"],
      "physics-question-kind": ["dynamics"],
      "physics-quantum-focus": ["noise-decoherence"],
    };
    const withCalibration = {
      ...preferenceAnswers,
      "physics-starting-point": ["comfortable"],
      "physics-math-comfort": ["comfortable"],
      "physics-statistics-comfort": ["comfortable"],
      "physics-coding-comfort": ["enjoy"],
      "physics-tools-comfort": ["independent"],
      "physics-explanation-style": ["quantitative"],
    };

    expect(aggregateSignals(withCalibration, physicsContext)).toEqual(
      aggregateSignals(preferenceAnswers, physicsContext),
    );
    expect(
      rankNiches(withCalibration, physicsContext).map(({ niche, score }) => [
        niche.id,
        score,
      ]),
    ).toEqual(
      rankNiches(preferenceAnswers, physicsContext).map(({ niche, score }) => [
        niche.id,
        score,
      ]),
    );
  });

  it("returns varied defaults when uncertainty provides no preference evidence", () => {
    const uncertainAnswers = Object.fromEntries(
      computationalPhysicsQuestions
        .filter((question) =>
          question.options.some((option) => option.uncertainty),
        )
        .map((question) => [
          question.id,
          [
            question.options.find((option) => option.uncertainty)?.id ??
              "unsure",
          ],
        ]),
    );
    const recommendations = getRecommendations(
      uncertainAnswers,
      undefined,
      physicsContext,
    );

    expect(recommendations.map((result) => result.niche.id)).toEqual(
      physicsOpenExplorationIds,
    );
    expect(recommendations.every((result) => result.score >= 0)).toBe(true);
    expect(
      recommendations.every((result) => result.preferenceEvidenceCount === 0),
    ).toBe(true);
  });

  it("preserves conflicting evidence as balanced, finite scores", () => {
    const results = rankNiches(
      {
        "physics-motivation": ["space-universe"],
        "physics-question-kind": ["theory"],
        "physics-scale": ["subatomic", "galactic-cosmic"],
        "physics-evidence": ["experimental", "distributions"],
        "physics-workflow": ["derive-scale", "statistics"],
      },
      physicsContext,
    );

    expect(results).toHaveLength(computationalPhysicsNiches.length);
    expect(results.every((result) => Number.isFinite(result.score))).toBe(true);
    expect(results.every((result) => result.score >= 0)).toBe(true);
    expect(
      results.some((result) => result.niche.id === "lattice-field-theory"),
    ).toBe(true);
    expect(
      results.some(
        (result) => result.niche.id === "cosmological-structure-formation",
      ),
    ).toBe(true);
  });
});
