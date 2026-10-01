import { describe, expect, it } from "vitest";
import { computationalMaterialsQuestions as questions } from "@/data/pathfinders/computational-materials/questions";
import { getVisibleQuestions } from "@/lib/branching";

describe("adaptive computational materials questions", () => {
  it.each(["energy-storage", "energy-conversion"])(
    "shows two targeted energy follow-ups for %s",
    (motivation) => {
      const visible = getVisibleQuestions(
        { "materials-motivation": [motivation] },
        questions,
      );
      const narrowing = visible.filter(
        (question) => question.stage === "narrowing",
      );

      expect(narrowing.map((question) => question.id)).toEqual([
        "materials-energy-direction",
        "materials-energy-process",
      ]);
      expect(visible).toHaveLength(17);
    },
  );

  it("keeps energy follow-ups hidden for an unrelated motivation", () => {
    expect(
      getVisibleQuestions(
        { "materials-motivation": ["electronics"] },
        questions,
      ).map((question) => question.id),
    ).not.toContain("materials-energy-direction");
  });

  it("targets all five planned energy directions", () => {
    const direction = questions.find(
      (question) => question.id === "materials-energy-direction",
    )!;
    expect(direction.options.map((option) => option.id)).toEqual([
      "battery-electrodes",
      "solid-electrolytes",
      "photovoltaics",
      "hydrogen",
      "thermal",
      "unsure",
    ]);
  });

  it.each(["electronics", "light-sensing"])(
    "shows two targeted electronic follow-ups for %s",
    (motivation) => {
      const visible = getVisibleQuestions(
        { "materials-motivation": [motivation] },
        questions,
      );
      expect(
        visible
          .filter((question) => question.stage === "narrowing")
          .map((question) => question.id),
      ).toEqual([
        "materials-electronic-direction",
        "materials-electronic-phenomenon",
      ]);
      expect(visible).toHaveLength(17);
    },
  );

  it("keeps electronic follow-ups out of the energy branch", () => {
    const energyIds = getVisibleQuestions(
      { "materials-motivation": ["energy-storage"] },
      questions,
    ).map((question) => question.id);
    expect(energyIds).not.toContain("materials-electronic-direction");
    expect(energyIds).not.toContain("materials-electronic-phenomenon");
  });
});
