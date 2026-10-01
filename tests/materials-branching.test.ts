import { describe, expect, it } from "vitest";
import { computationalMaterialsQuestions as questions } from "@/data/pathfinders/computational-materials/questions";
import {
  getPlannedQuestionCount,
  getVisibleQuestions,
  pruneHiddenAnswers,
} from "@/lib/branching";

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

  it.each(["catalysis", "climate-environment"])(
    "shows two surface and environment follow-ups for %s",
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
        "materials-surface-environment-direction",
        "materials-surface-environment-process",
      ]);
      expect(visible).toHaveLength(17);
    },
  );

  it("covers catalysis, separation, storage, and environmental protection", () => {
    const direction = questions.find(
      (question) => question.id === "materials-surface-environment-direction",
    )!;
    expect(direction.options.map((option) => option.id)).toEqual([
      "surface-catalysis",
      "electrocatalysis",
      "separation",
      "molecular-storage",
      "protective-interfaces",
      "unsure",
    ]);
  });

  it.each(["structural", "soft-health"])(
    "shows two structural and soft-material follow-ups for %s",
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
        "materials-structural-soft-direction",
        "materials-structural-soft-behavior",
      ]);
      expect(visible).toHaveLength(17);
    },
  );

  it("distinguishes rigid, soft, biological, protective, and multiscale systems", () => {
    const direction = questions.find(
      (question) => question.id === "materials-structural-soft-direction",
    )!;
    expect(direction.options.map((option) => option.id)).toEqual([
      "alloys-ceramics",
      "polymers-soft",
      "biomaterials",
      "corrosion",
      "composites",
      "unsure",
    ]);
  });

  it.each(["fundamentals", "data-discovery", "open"])(
    "shows two computational and open-exploration follow-ups for %s",
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
        "materials-computation-direction",
        "materials-computation-evidence",
      ]);
      expect(visible).toHaveLength(17);
    },
  );

  it("provides a complete 17-question path for every broad motivation", () => {
    const motivation = questions.find(
      (question) => question.id === "materials-motivation",
    )!;

    for (const option of motivation.options) {
      const answers = { "materials-motivation": [option.id] };
      const visible = getVisibleQuestions(answers, questions);
      expect(visible, option.id).toHaveLength(17);
      expect(
        visible.filter((question) => question.stage === "narrowing"),
        option.id,
      ).toHaveLength(2);
    }
    expect(getPlannedQuestionCount({}, questions, "materials-motivation")).toBe(
      17,
    );
  });

  it("removes answers from a previous branch when motivation changes", () => {
    const changed = pruneHiddenAnswers(
      {
        "materials-motivation": ["electronics"],
        "materials-energy-direction": ["photovoltaics"],
        "materials-electronic-direction": ["semiconductors"],
      },
      questions,
    );
    expect(changed["materials-energy-direction"]).toBeUndefined();
    expect(changed["materials-electronic-direction"]).toEqual([
      "semiconductors",
    ]);
  });

  it("makes uncertain branch answers neutral and available everywhere", () => {
    const branchQuestions = questions.filter(
      (question) => question.stage === "narrowing",
    );
    expect(branchQuestions).toHaveLength(10);
    for (const branchQuestion of branchQuestions) {
      const unsure = branchQuestion.options.find(
        (option) => option.id === "unsure",
      );
      expect(unsure, branchQuestion.id).toMatchObject({ uncertainty: true });
      expect(unsure?.signals, branchQuestion.id).toBeUndefined();
      expect(unsure?.nicheBoosts, branchQuestion.id).toBeUndefined();
    }
  });
});
