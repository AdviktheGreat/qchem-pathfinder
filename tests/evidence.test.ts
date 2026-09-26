import { expect, it } from "vitest";
import { rankNiches } from "@/lib/recommendation";

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
