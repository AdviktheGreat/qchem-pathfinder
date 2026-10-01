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
