import { expect, it } from "vitest";
import { getPreparationSteps } from "@/lib/preparation";

it("offers concrete preparation for different experience levels", () => {
  const beginner = getPreparationSteps({
    "math-comfort": ["concept-first"],
    "coding-comfort": ["new"],
  });
  const experienced = getPreparationSteps({
    "math-comfort": ["comfortable"],
    "coding-comfort": ["enjoy"],
  });
  expect(beginner[0]).toContain("figure or energy diagram");
  expect(beginner[1]).toContain("facilitator");
  expect(experienced[1]).toContain("script");
  expect(getPreparationSteps({}).every(Boolean)).toBe(true);
});
