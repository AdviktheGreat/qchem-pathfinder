import { describe, expect, it } from "vitest";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";
import { validatePathfinderDefinition } from "@/lib/pathfinder-validation";
import type { PathfinderDefinition } from "@/lib/pathfinder-definition";

function copyDefinition(): PathfinderDefinition {
  return structuredClone(quantumChemistryPathfinder);
}

describe("pathfinder definition validation", () => {
  it("returns a stable result for a valid definition", () => {
    expect(validatePathfinderDefinition(copyDefinition())).toEqual({
      valid: true,
      issues: [],
    });
  });

  it("reports definitions that cannot cross the server-to-client boundary", () => {
    const definition = copyDefinition();
    const cyclicDefinition = definition as PathfinderDefinition & {
      cycle?: PathfinderDefinition;
    };
    cyclicDefinition.cycle = cyclicDefinition;

    expect(validatePathfinderDefinition(cyclicDefinition)).toEqual({
      valid: false,
      issues: [
        expect.objectContaining({
          code: "definition.not-serializable",
          path: "$",
        }),
      ],
    });
  });

  it("validates stable identity, route, and storage fields", () => {
    const definition = copyDefinition();
    definition.identity.id = "Invalid ID";
    definition.identity.route = "/another-route";
    definition.identity.brandLabel = " ";
    definition.storage.key = "shared-progress";
    definition.storage.version = 0;

    const result = validatePathfinderDefinition(definition);
    expect(result.valid).toBe(false);
    expect(result.issues.map((entry) => entry.code)).toEqual([
      "identity.invalid-id",
      "identity.route-mismatch",
      "identity.missing-label",
      "storage.invalid-key",
      "storage.invalid-version",
    ]);
  });

  it("validates question, option, and selection structure", () => {
    const definition = copyDefinition();
    const firstQuestion = definition.survey.questions[0];
    definition.survey.questions = [
      ...definition.survey.questions,
      structuredClone(firstQuestion),
    ];
    firstQuestion.options[1].id = firstQuestion.options[0].id;
    firstQuestion.type = "multi";
    firstQuestion.maxSelections = firstQuestion.options.length + 1;

    const codes = validatePathfinderDefinition(definition).issues.map(
      (entry) => entry.code,
    );
    expect(codes).toContain("survey.duplicate-question-id");
    expect(codes).toContain("survey.duplicate-option-id");
    expect(codes).toContain("survey.invalid-selection-limit");
  });

  it("validates adaptive branch references and ordering", () => {
    const definition = copyDefinition();
    definition.survey.branchQuestionId = "missing-question";
    const firstQuestion = definition.survey.questions[0];
    firstQuestion.visibleWhen = {
      questionId: definition.survey.questions[1].id,
      anyOf: ["missing-option"],
    };

    const codes = validatePathfinderDefinition(definition).issues.map(
      (entry) => entry.code,
    );
    expect(codes).toContain("branching.missing-branch-question");
    expect(codes).toContain("branching.forward-reference");
    expect(codes).toContain("branching.unknown-trigger-option");
  });

  it("keeps calibration and uncertainty choices out of scoring", () => {
    const definition = copyDefinition();
    const calibrationQuestion = definition.survey.questions.find(
      (question) => question.stage === "calibration",
    )!;
    const uncertaintyOption = calibrationQuestion.options.find(
      (option) => option.uncertainty,
    )!;
    uncertaintyOption.signals = { "interest:invalid": 1 };
    calibrationQuestion.options[0].nicheBoosts = {
      "reaction-mechanisms": 1,
    };
    definition.survey.calibrationQuestionIds = [];

    const codes = validatePathfinderDefinition(definition).issues.map(
      (entry) => entry.code,
    );
    expect(codes).toContain("calibration.missing-question-id");
    expect(codes).toContain("calibration.scoring-evidence");
    expect(codes).toContain("uncertainty.scoring-evidence");
  });

  it("validates signal names and finite positive weights", () => {
    const definition = copyDefinition();
    const option = definition.survey.questions[5].options[0];
    option.signals = { "Invalid signal": -2 };
    option.nicheBoosts = { "reaction-mechanisms": Number.NaN };
    definition.recommendations.scoring = {
      directBoostMultiplier: 0,
      openInterestMultiplier: -1,
      uncertaintyBonus: 0.35,
    };

    const codes = validatePathfinderDefinition(definition).issues.map(
      (entry) => entry.code,
    );
    expect(codes).toContain("scoring.invalid-signal-name");
    expect(codes).toContain("scoring.invalid-signal-weight");
    expect(codes).toContain("scoring.invalid-boost-weight");
    expect(codes).toContain("scoring.invalid-config-weight");
    expect(codes).toContain("scoring.disabled-direct-boosts");
  });

  it("validates unique and complete taxonomy records", () => {
    const definition = copyDefinition();
    const firstNiche = definition.recommendations.niches[0];
    const secondNiche = definition.recommendations.niches[1];
    secondNiche.id = firstNiche.id;
    secondNiche.name = firstNiche.name;
    secondNiche.explanation = " ";
    secondNiche.systems = [];

    const codes = validatePathfinderDefinition(definition).issues.map(
      (entry) => entry.code,
    );
    expect(codes).toContain("taxonomy.duplicate-id");
    expect(codes).toContain("taxonomy.duplicate-name");
    expect(codes).toContain("taxonomy.incomplete-copy");
    expect(codes).toContain("taxonomy.incomplete-details");
  });
});
