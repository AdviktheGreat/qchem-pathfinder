import { describe, expect, it } from "vitest";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import {
  aggregateSignals,
  type RecommendationContext,
} from "@/lib/recommendation";

const questions = computationalMaterialsPathfinder.survey.questions;
const context: RecommendationContext = {
  questions,
  niches: [],
  openExplorationIds: [],
};

function question(id: string) {
  return questions.find((candidate) => candidate.id === id)!;
}

describe("computational materials research question preferences", () => {
  const researchQuestion = question("materials-question-kind");

  it("offers distinct research moves in accessible language", () => {
    expect(researchQuestion).toMatchObject({
      stage: "question",
      type: "single",
    });
    expect(researchQuestion.options.map((option) => option.id)).toEqual([
      "explain",
      "predict",
      "compare",
      "design",
      "interpret",
      "optimize",
      "dynamics",
      "data-discovery",
      "theory",
      "unsure",
    ]);
    for (const option of researchQuestion.options) {
      expect(option.description?.length, option.id).toBeGreaterThan(40);
    }
  });

  it("records a strong question preference and useful supporting context", () => {
    expect(
      aggregateSignals(
        {
          "materials-question-kind": ["interpret"],
        },
        context,
      ),
    ).toEqual({
      "mode:interpret": 3,
      "connection:experiment": 2,
    });
  });

  it("keeps question types open when the student is unsure", () => {
    const unsure = researchQuestion.options.find(
      (option) => option.id === "unsure",
    );
    expect(unsure).toMatchObject({ uncertainty: true });
    expect(unsure?.signals).toBeUndefined();
    expect(unsure?.nicheBoosts).toBeUndefined();
    expect(
      aggregateSignals({ "materials-question-kind": ["unsure"] }, context),
    ).toEqual({});
  });
});

describe("computational materials family preferences", () => {
  const materialFamily = question("materials-family");

  it("offers distinct structural families without requiring prior expertise", () => {
    expect(materialFamily).toMatchObject({ stage: "style", type: "single" });
    expect(materialFamily.options.map((option) => option.id)).toEqual([
      "crystalline",
      "amorphous",
      "layered",
      "porous",
      "soft",
      "composite",
      "unsure",
    ]);
    expect(
      computationalMaterialsPathfinder.profile.researchStyleLabels[
        "materials-family"
      ],
    ).toBe("Material family");
  });

  it("records a strong family signal while leaving an open choice neutral", () => {
    expect(
      aggregateSignals({ "materials-family": ["layered"] }, context),
    ).toEqual({ "family:layered": 3 });

    const unsure = materialFamily.options.find(
      (option) => option.id === "unsure",
    );
    expect(unsure).toMatchObject({ uncertainty: true });
    expect(unsure?.signals).toBeUndefined();
    expect(
      aggregateSignals({ "materials-family": ["unsure"] }, context),
    ).toEqual({});
  });
});

describe("computational materials phenomenon preferences", () => {
  const phenomena = question("materials-phenomena");

  it("lets students combine up to two distinct kinds of material behavior", () => {
    expect(phenomena).toMatchObject({
      stage: "style",
      type: "multi",
      maxSelections: 2,
    });
    expect(phenomena.options.map((option) => option.id)).toEqual([
      "electrons",
      "ions",
      "thermal",
      "optical",
      "magnetic",
      "mechanical",
      "surfaces",
      "chemical-change",
      "unsure",
    ]);
    expect(
      computationalMaterialsPathfinder.profile.researchStyleLabels[
        "materials-phenomena"
      ],
    ).toBe("Material behaviors");
  });

  it("preserves both signals from a related pair", () => {
    expect(
      aggregateSignals(
        { "materials-phenomena": ["electrons", "optical"] },
        context,
      ),
    ).toEqual({
      "phenomenon:electrons": 3,
      "phenomenon:optical": 3,
    });
  });

  it("keeps the phenomenon open without adding evidence", () => {
    expect(
      aggregateSignals({ "materials-phenomena": ["unsure"] }, context),
    ).toEqual({});
    expect(
      phenomena.options.find((option) => option.id === "unsure"),
    ).toMatchObject({ uncertainty: true });
  });
});

describe("computational materials research style preferences", () => {
  const styleQuestionIds = [
    "materials-purpose-balance",
    "materials-scale",
    "materials-change-style",
    "materials-experiment-connection",
  ] as const;

  it("covers purpose, scale, change, and experimental connection", () => {
    expect(questions).toHaveLength(14);
    for (const id of styleQuestionIds) {
      expect(question(id)).toMatchObject({ stage: "style", type: "single" });
      expect(
        computationalMaterialsPathfinder.profile.researchStyleLabels[id],
      ).toBeTypeOf("string");
    }
  });

  it("combines compatible style evidence without collapsing its dimensions", () => {
    expect(
      aggregateSignals(
        {
          "materials-purpose-balance": ["bridge"],
          "materials-scale": ["atomic"],
          "materials-change-style": ["dynamic"],
          "materials-experiment-connection": ["interpret"],
        },
        context,
      ),
    ).toEqual({
      "purpose:fundamental": 2,
      "purpose:applied": 2,
      "scale:atomic": 3,
      "change:dynamic": 3,
      "connection:interpret": 3,
      "connection:experiment": 2,
    });
  });

  it("keeps every undecided style dimension neutral", () => {
    const uncertainAnswers = Object.fromEntries(
      styleQuestionIds.map((id) => [id, ["unsure"]]),
    );
    expect(aggregateSignals(uncertainAnswers, context)).toEqual({});

    for (const id of styleQuestionIds) {
      expect(
        question(id).options.find((option) => option.id === "unsure"),
      ).toMatchObject({ uncertainty: true });
    }
  });
});
