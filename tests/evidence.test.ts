import { expect, it } from "vitest";
import { getFitLabel, rankNiches } from "@/lib/recommendation";
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
