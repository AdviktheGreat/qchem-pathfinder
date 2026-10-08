import { describe, expect, it } from "vitest";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";
import {
  pathfinderModules,
  quantumChemistryModule,
} from "@/data/pathfinder-modules";
import type { AvailablePathfinderModuleManifest } from "@/lib/pathfinder-manifest";
import {
  validatePathfinderDefinition,
  validatePathfinderModuleManifest,
  validatePathfinderRegistry,
} from "@/lib/pathfinder-validation";
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

  it("validates actionable literature-search launchpads", () => {
    const definition = copyDefinition();
    const niche = definition.recommendations.niches[0];
    niche.keywords = ["duplicate", "duplicate"];
    niche.synonyms = [];
    niche.paperTypes = [];
    niche.searches.focused = niche.searches.orientation;

    const codes = validatePathfinderDefinition(definition).issues.map(
      (entry) => entry.code,
    );
    expect(codes).toContain("literature.invalid-keyword-count");
    expect(codes).toContain("literature.invalid-keywords");
    expect(codes).toContain("literature.too-few-synonyms");
    expect(codes).toContain("literature.too-few-paper-types");
    expect(codes).toContain("literature.duplicate-search-query");
  });

  it("connects affinities and explanations to registered signals", () => {
    const definition = copyDefinition();
    const niche = definition.recommendations.niches[0];
    niche.affinities["topic:unregistered"] = 2;
    niche.reasons = [
      {
        signal: "topic:unregistered",
        category: "style",
        text: " ",
      },
    ];

    const codes = validatePathfinderDefinition(definition).issues.map(
      (entry) => entry.code,
    );
    expect(codes).toContain("affinity.unknown-signal");
    expect(codes).toContain("reason.category-mismatch");
    expect(codes).toContain("reason.missing-copy");
  });

  it("validates direct boosts and open-exploration references", () => {
    const definition = copyDefinition();
    definition.survey.questions[5].options[0].nicheBoosts = {
      "missing-direction": 2,
    };
    definition.recommendations.openExplorationIds = [
      "missing-direction",
      "missing-direction",
    ];

    const codes = validatePathfinderDefinition(definition).issues.map(
      (entry) => entry.code,
    );
    expect(codes).toContain("reference.unknown-boost-direction");
    expect(codes).toContain("reference.invalid-open-directions");
    expect(codes).toContain("reference.unknown-open-direction");
  });

  it("validates preparation question and option mappings", () => {
    const definition = copyDefinition();
    definition.preparation.mathQuestionId = "missing-question";
    definition.preparation.codingAdvice = {
      ...definition.preparation.codingAdvice,
      "missing-option": "Advice",
    };
    definition.preparation.knowledge.contextReadyOptionId = "missing-option";
    definition.preparation.supplementalAdvice = [
      { questionId: "missing-question", advice: {} },
    ];

    const codes = validatePathfinderDefinition(definition).issues.map(
      (entry) => entry.code,
    );
    expect(codes).toContain("preparation.unknown-question");
    expect(codes).toContain("preparation.unknown-option");
    expect(codes).toContain("preparation.unknown-context-ready-option");
    expect(codes).toContain("preparation.unknown-supplement-question");
  });

  it("validates profile references and results resources", () => {
    const definition = copyDefinition();
    definition.profile.motivationQuestionId = "missing-question";
    definition.profile.filenamePrefix = "Invalid Filename";
    definition.results.glossary = [];
    definition.results.queryGuidance = {
      ...definition.results.queryGuidance,
      orientation: " ",
    };

    const codes = validatePathfinderDefinition(definition).issues.map(
      (entry) => entry.code,
    );
    expect(codes).toContain("profile.unknown-question");
    expect(codes).toContain("profile.invalid-filename-prefix");
    expect(codes).toContain("results.invalid-glossary");
    expect(codes).toContain("results.missing-query-guidance");
  });
});

describe("pathfinder module manifest validation", () => {
  it("accepts a complete available module", () => {
    expect(validatePathfinderModuleManifest(quantumChemistryModule)).toEqual({
      valid: true,
      issues: [],
    });
  });

  it("validates catalog and route-metadata copy", () => {
    const manifest: AvailablePathfinderModuleManifest = structuredClone(
      quantumChemistryModule,
    );
    manifest.catalog.description = " ";
    manifest.catalog.focusAreas = ["Molecules", "molecules"];
    manifest.metadata.openGraphDescription = " ";

    const codes = validatePathfinderModuleManifest(manifest).issues.map(
      (entry) => entry.code,
    );
    expect(codes).toContain("manifest.incomplete-catalog-copy");
    expect(codes).toContain("manifest.invalid-focus-areas");
    expect(codes).toContain("manifest.incomplete-metadata");
  });
});

describe("pathfinder registry validation", () => {
  it("accepts the complete canonical registry", () => {
    expect(validatePathfinderRegistry(pathfinderModules)).toEqual({
      valid: true,
      issues: [],
    });
  });

  it("reports cross-module identity, route, and storage collisions", () => {
    const result = validatePathfinderRegistry([
      quantumChemistryModule,
      structuredClone(quantumChemistryModule),
    ]);
    const codes = result.issues.map((entry) => entry.code);

    expect(codes).toContain("registry.duplicate-id");
    expect(codes).toContain("registry.duplicate-name");
    expect(codes).toContain("registry.duplicate-route");
    expect(codes).toContain("registry.duplicate-storage-key");
  });
});
