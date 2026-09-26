import { expect, it } from "vitest";
import {
  explainRecommendationContext,
  getFitLabel,
  getRecommendations,
  rankNiches,
} from "@/lib/recommendation";
import type { AnswerMap } from "@/lib/types";

it("separates exploration defaults from expressed preferences", () => {
  const open = rankNiches({ motivation: ["balanced"] })[0];
  expect(open.explorationBonus).toBeGreaterThan(0);
  expect(open.preferenceEvidenceCount).toBe(0);
  expect(open.score).toBe(open.explorationBonus);
  const focused = rankNiches({
    motivation: ["reactions"],
    "reactions-focus": ["steps"],
  })[0];
  expect(focused.preferenceEvidenceCount).toBe(2);
  expect(focused.score).toBe(
    focused.interestScore + focused.styleScore + focused.explorationBonus,
  );
});

it("offers distinct entry points when no preferences are expressed", () => {
  const results = getRecommendations({ motivation: ["balanced"] });
  expect(results.map((result) => result.niche.id)).toEqual([
    "noncovalent-interactions",
    "computational-spectroscopy",
    "method-benchmarking",
  ]);
  expect(
    results.every(
      (result) => getFitLabel(result, results[0].score) === "Starting point",
    ),
  ).toBe(true);
});

it("reserves strong fit for multiple supporting preferences", () => {
  for (const answers of [{}, { motivation: ["balanced"] }] as AnswerMap[]) {
    const results = rankNiches(answers);
    expect(getFitLabel(results[0], results[0].score)).toBe("Starting point");
  }
  const single = rankNiches({ motivation: ["reactions"] })[0];
  expect(getFitLabel(single, single.score)).toBe("Worth exploring");
  const supported = rankNiches({
    motivation: ["reactions"],
    "reactions-focus": ["steps"],
  })[0];
  expect(getFitLabel(supported, supported.score)).toBe("Strong fit");
});

it("explains defaults without claiming a discovered interest", () => {
  expect(
    explainRecommendationContext(
      rankNiches({ motivation: ["balanced"] }).slice(0, 3),
    ),
  ).toContain("interests are still open");
  expect(
    explainRecommendationContext(
      rankNiches({ motivation: ["reactions"] }).slice(0, 3),
    ),
  ).toContain("beginning to emerge");
});
