import { expect, it } from "vitest";
import { getVisibleQuestions } from "@/lib/branching";
import { getRecommendations } from "@/lib/recommendation";
import { studentProfiles } from "./fixtures/student-profiles";

it.each(studentProfiles)(
  "has a complete valid path for $name",
  ({ answers, expected }) => {
    const visible = getVisibleQuestions(answers);
    expect(visible).toHaveLength(16);
    expect(Object.keys(answers).sort()).toEqual(
      visible.map((q) => q.id).sort(),
    );
    for (const question of visible) {
      const selected = answers[question.id];
      expect(selected.length).toBeGreaterThan(0);
      for (const id of selected)
        expect(
          question.options.some((o) => o.id === id),
          `${question.id}: ${id}`,
        ).toBe(true);
    }
    expect(getRecommendations(answers)[0].niche.id).toBe(expected);
  },
);
