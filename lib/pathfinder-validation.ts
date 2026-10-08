import type { PathfinderDefinition } from "@/lib/pathfinder-definition";

export interface PathfinderValidationIssue {
  code: string;
  path: string;
  message: string;
}

export interface PathfinderValidationResult {
  valid: boolean;
  issues: PathfinderValidationIssue[];
}

type DefinitionRule = (
  definition: PathfinderDefinition,
) => PathfinderValidationIssue[];

function issue(
  code: string,
  path: string,
  message: string,
): PathfinderValidationIssue {
  return { code, path, message };
}

function validateIdentityAndStorage(
  definition: PathfinderDefinition,
): PathfinderValidationIssue[] {
  const issues: PathfinderValidationIssue[] = [];
  const { identity, storage } = definition;
  const textFields = [
    ["identity.name", identity.name],
    ["identity.shortName", identity.shortName],
    ["identity.brandLabel", identity.brandLabel],
    ["identity.ariaLabel", identity.ariaLabel],
  ] as const;

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(identity.id))
    issues.push(
      issue(
        "identity.invalid-id",
        "identity.id",
        "Use a stable lowercase, hyphen-separated pathfinder ID.",
      ),
    );
  if (identity.route !== `/pathfinders/${identity.id}`)
    issues.push(
      issue(
        "identity.route-mismatch",
        "identity.route",
        "The route must be derived from the pathfinder ID.",
      ),
    );
  for (const [path, value] of textFields) {
    if (!value.trim())
      issues.push(
        issue(
          "identity.missing-label",
          path,
          "Pathfinder identity labels cannot be empty.",
        ),
      );
  }
  if (!/^[a-z0-9-]+:progress$/.test(storage.key))
    issues.push(
      issue(
        "storage.invalid-key",
        "storage.key",
        "Use a subject-specific local progress namespace ending in :progress.",
      ),
    );
  if (!Number.isInteger(storage.version) || storage.version < 1)
    issues.push(
      issue(
        "storage.invalid-version",
        "storage.version",
        "The storage version must be a positive integer.",
      ),
    );

  return issues;
}

function validateSurveyStructure(
  definition: PathfinderDefinition,
): PathfinderValidationIssue[] {
  const issues: PathfinderValidationIssue[] = [];
  const questionIds = new Set<string>();

  if (definition.survey.questions.length === 0)
    issues.push(
      issue(
        "survey.empty",
        "survey.questions",
        "A pathfinder must contain at least one survey question.",
      ),
    );

  definition.survey.questions.forEach((question, questionIndex) => {
    const path = `survey.questions[${questionIndex}]`;
    if (questionIds.has(question.id))
      issues.push(
        issue(
          "survey.duplicate-question-id",
          `${path}.id`,
          `Question ID “${question.id}” is repeated.`,
        ),
      );
    questionIds.add(question.id);

    if (
      !question.id.trim() ||
      !question.kicker.trim() ||
      !question.title.trim()
    )
      issues.push(
        issue(
          "survey.incomplete-question-copy",
          path,
          "Every question needs a non-empty ID, kicker, and title.",
        ),
      );
    if (question.options.length < 2)
      issues.push(
        issue(
          "survey.too-few-options",
          `${path}.options`,
          "Every question needs at least two meaningful choices.",
        ),
      );

    const optionIds = new Set<string>();
    question.options.forEach((option, optionIndex) => {
      const optionPath = `${path}.options[${optionIndex}]`;
      if (optionIds.has(option.id))
        issues.push(
          issue(
            "survey.duplicate-option-id",
            `${optionPath}.id`,
            `Option ID “${option.id}” is repeated within question “${question.id}”.`,
          ),
        );
      optionIds.add(option.id);
      if (!option.id.trim() || !option.label.trim())
        issues.push(
          issue(
            "survey.incomplete-option-copy",
            optionPath,
            "Every option needs a non-empty ID and label.",
          ),
        );
    });

    if (
      question.type === "multi" &&
      question.maxSelections !== undefined &&
      (!Number.isInteger(question.maxSelections) ||
        question.maxSelections < 1 ||
        question.maxSelections > question.options.length)
    )
      issues.push(
        issue(
          "survey.invalid-selection-limit",
          `${path}.maxSelections`,
          "A multi-select limit must be a positive integer no larger than its option count.",
        ),
      );
  });

  return issues;
}

function validateBranching(
  definition: PathfinderDefinition,
): PathfinderValidationIssue[] {
  const issues: PathfinderValidationIssue[] = [];
  const questions = definition.survey.questions;
  const questionIndex = new Map(
    questions.map((question, index) => [question.id, index]),
  );
  const branchQuestion = questions.find(
    (question) => question.id === definition.survey.branchQuestionId,
  );

  if (!branchQuestion)
    issues.push(
      issue(
        "branching.missing-branch-question",
        "survey.branchQuestionId",
        "The branch question ID must refer to a real survey question.",
      ),
    );
  else if (branchQuestion.visibleWhen)
    issues.push(
      issue(
        "branching.hidden-branch-question",
        "survey.branchQuestionId",
        "The question that opens adaptive branches must always be visible.",
      ),
    );

  questions.forEach((question, index) => {
    if (!question.visibleWhen) return;
    const path = `survey.questions[${index}].visibleWhen`;
    const sourceIndex = questionIndex.get(question.visibleWhen.questionId);
    const sourceQuestion =
      sourceIndex === undefined ? undefined : questions[sourceIndex];

    if (sourceIndex === undefined || !sourceQuestion) {
      issues.push(
        issue(
          "branching.unknown-source-question",
          `${path}.questionId`,
          `Visibility refers to unknown question “${question.visibleWhen.questionId}”.`,
        ),
      );
      return;
    }
    if (sourceIndex >= index)
      issues.push(
        issue(
          "branching.forward-reference",
          `${path}.questionId`,
          "A branch can depend only on an earlier question.",
        ),
      );
    if (question.visibleWhen.anyOf.length === 0)
      issues.push(
        issue(
          "branching.empty-trigger",
          `${path}.anyOf`,
          "A visibility rule must name at least one triggering option.",
        ),
      );

    const sourceOptionIds = new Set(
      sourceQuestion.options.map((option) => option.id),
    );
    for (const optionId of question.visibleWhen.anyOf) {
      if (!sourceOptionIds.has(optionId))
        issues.push(
          issue(
            "branching.unknown-trigger-option",
            `${path}.anyOf`,
            `Visibility refers to unknown option “${optionId}” on question “${sourceQuestion.id}”.`,
          ),
        );
    }
  });

  return issues;
}

function validateCalibrationAndUncertainty(
  definition: PathfinderDefinition,
): PathfinderValidationIssue[] {
  const issues: PathfinderValidationIssue[] = [];
  const configuredCalibrationIds = new Set(
    definition.survey.calibrationQuestionIds,
  );

  definition.survey.questions.forEach((question, questionIndex) => {
    const path = `survey.questions[${questionIndex}]`;
    const isCalibration = question.stage === "calibration";
    if (isCalibration && !configuredCalibrationIds.has(question.id))
      issues.push(
        issue(
          "calibration.missing-question-id",
          "survey.calibrationQuestionIds",
          `Calibration question “${question.id}” is not registered as calibration.`,
        ),
      );
    if (!isCalibration && configuredCalibrationIds.has(question.id))
      issues.push(
        issue(
          "calibration.non-calibration-question",
          "survey.calibrationQuestionIds",
          `Question “${question.id}” is registered as calibration but belongs to stage “${question.stage}”.`,
        ),
      );

    const uncertaintyOptions = question.options.filter(
      (option) => option.uncertainty,
    );
    if (
      (isCalibration && uncertaintyOptions.length !== 1) ||
      uncertaintyOptions.length > 1
    )
      issues.push(
        issue(
          "uncertainty.invalid-count",
          `${path}.options`,
          "Calibration questions need one honest uncertainty option, and no question may define more than one.",
        ),
      );

    question.options.forEach((option, optionIndex) => {
      const hasScoringEvidence =
        Object.keys(option.signals ?? {}).length > 0 ||
        Object.keys(option.nicheBoosts ?? {}).length > 0;
      if (option.uncertainty && hasScoringEvidence)
        issues.push(
          issue(
            "uncertainty.scoring-evidence",
            `${path}.options[${optionIndex}]`,
            "Uncertainty choices must keep possibilities open and cannot contribute scoring evidence.",
          ),
        );
      if (isCalibration && Object.keys(option.nicheBoosts ?? {}).length > 0)
        issues.push(
          issue(
            "calibration.scoring-evidence",
            `${path}.options[${optionIndex}]`,
            "Starting-point calibration cannot directly boost a recommendation.",
          ),
        );
    });
  });

  for (const questionId of configuredCalibrationIds) {
    if (
      !definition.survey.questions.some(
        (question) => question.id === questionId,
      )
    )
      issues.push(
        issue(
          "calibration.unknown-question-id",
          "survey.calibrationQuestionIds",
          `Calibration refers to unknown question “${questionId}”.`,
        ),
      );
  }

  return issues;
}

function validateScoringWeights(
  definition: PathfinderDefinition,
): PathfinderValidationIssue[] {
  const issues: PathfinderValidationIssue[] = [];
  const signalPattern = /^[a-z][a-z0-9-]*:[a-z0-9][a-z0-9-]*$/;

  definition.survey.questions.forEach((question, questionIndex) => {
    question.options.forEach((option, optionIndex) => {
      const optionPath = `survey.questions[${questionIndex}].options[${optionIndex}]`;
      for (const [signal, weight] of Object.entries(option.signals ?? {})) {
        if (!signalPattern.test(signal))
          issues.push(
            issue(
              "scoring.invalid-signal-name",
              `${optionPath}.signals.${signal}`,
              "Signal names must use a lowercase namespace:value format.",
            ),
          );
        if (!Number.isFinite(weight) || weight <= 0)
          issues.push(
            issue(
              "scoring.invalid-signal-weight",
              `${optionPath}.signals.${signal}`,
              "Signal weights must be finite positive numbers.",
            ),
          );
      }
      for (const [nicheId, weight] of Object.entries(
        option.nicheBoosts ?? {},
      )) {
        if (!Number.isFinite(weight) || weight <= 0)
          issues.push(
            issue(
              "scoring.invalid-boost-weight",
              `${optionPath}.nicheBoosts.${nicheId}`,
              "Direct recommendation boosts must be finite positive numbers.",
            ),
          );
      }
    });
  });

  if (definition.recommendations.scoring) {
    for (const [name, value] of Object.entries(
      definition.recommendations.scoring,
    )) {
      if (!Number.isFinite(value) || value < 0)
        issues.push(
          issue(
            "scoring.invalid-config-weight",
            `recommendations.scoring.${name}`,
            "Scoring configuration weights must be finite, non-negative numbers.",
          ),
        );
    }
    if (definition.recommendations.scoring.directBoostMultiplier === 0)
      issues.push(
        issue(
          "scoring.disabled-direct-boosts",
          "recommendations.scoring.directBoostMultiplier",
          "Direct narrowing choices need a positive multiplier.",
        ),
      );
  }

  return issues;
}

function validateTaxonomyRecords(
  definition: PathfinderDefinition,
): PathfinderValidationIssue[] {
  const issues: PathfinderValidationIssue[] = [];
  const ids = new Set<string>();
  const names = new Set<string>();

  if (definition.recommendations.niches.length < 3)
    issues.push(
      issue(
        "taxonomy.too-few-directions",
        "recommendations.niches",
        "A result experience needs a primary direction and at least two nearby alternatives.",
      ),
    );

  definition.recommendations.niches.forEach((niche, nicheIndex) => {
    const path = `recommendations.niches[${nicheIndex}]`;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(niche.id))
      issues.push(
        issue(
          "taxonomy.invalid-id",
          `${path}.id`,
          "Direction IDs must be lowercase and hyphen-separated.",
        ),
      );
    if (ids.has(niche.id))
      issues.push(
        issue(
          "taxonomy.duplicate-id",
          `${path}.id`,
          `Direction ID “${niche.id}” is repeated.`,
        ),
      );
    if (names.has(niche.name))
      issues.push(
        issue(
          "taxonomy.duplicate-name",
          `${path}.name`,
          `Direction name “${niche.name}” is repeated.`,
        ),
      );
    ids.add(niche.id);
    names.add(niche.name);

    const requiredText = [
      niche.area,
      niche.name,
      niche.shortDescription,
      niche.explanation,
      niche.preparation,
      niche.comparisonLens,
    ];
    if (requiredText.some((value) => !value.trim()))
      issues.push(
        issue(
          "taxonomy.incomplete-copy",
          path,
          "Every direction needs complete names, explanations, preparation, and comparison copy.",
        ),
      );
    if (
      niche.questions.length === 0 ||
      niche.systems.length === 0 ||
      niche.approaches.length === 0 ||
      niche.concepts.length === 0
    )
      issues.push(
        issue(
          "taxonomy.incomplete-details",
          path,
          "Every direction needs research questions, systems, approaches, and concepts to revisit.",
        ),
      );
    if (
      niche.approaches.some(
        (approach) => !approach.name.trim() || !approach.explanation.trim(),
      )
    )
      issues.push(
        issue(
          "taxonomy.incomplete-approach",
          `${path}.approaches`,
          "Each computational approach needs a name and beginner-friendly explanation.",
        ),
      );
  });

  return issues;
}

function validateLiteratureLaunchpads(
  definition: PathfinderDefinition,
): PathfinderValidationIssue[] {
  const issues: PathfinderValidationIssue[] = [];

  definition.recommendations.niches.forEach((niche, nicheIndex) => {
    const path = `recommendations.niches[${nicheIndex}]`;
    if (niche.keywords.length < 5 || niche.keywords.length > 8)
      issues.push(
        issue(
          "literature.invalid-keyword-count",
          `${path}.keywords`,
          "Each direction needs five to eight focused starter keywords.",
        ),
      );
    if (niche.synonyms.length < 2)
      issues.push(
        issue(
          "literature.too-few-synonyms",
          `${path}.synonyms`,
          "Each direction needs at least two related phrases for broader searching.",
        ),
      );
    if (niche.paperTypes.length < 2)
      issues.push(
        issue(
          "literature.too-few-paper-types",
          `${path}.paperTypes`,
          "Each direction needs at least two useful paper types for a beginner.",
        ),
      );

    const keywordKeys = niche.keywords.map((keyword) =>
      keyword.trim().toLocaleLowerCase(),
    );
    if (
      keywordKeys.some((keyword) => !keyword) ||
      new Set(keywordKeys).size !== keywordKeys.length
    )
      issues.push(
        issue(
          "literature.invalid-keywords",
          `${path}.keywords`,
          "Starter keywords must be non-empty and unique within a direction.",
        ),
      );

    const queries = Object.values(niche.searches).map((query) => query.trim());
    if (queries.some((query) => !query))
      issues.push(
        issue(
          "literature.missing-search-query",
          `${path}.searches`,
          "Orientation, focused, and review searches must all be present.",
        ),
      );
    if (new Set(queries).size !== queries.length)
      issues.push(
        issue(
          "literature.duplicate-search-query",
          `${path}.searches`,
          "The three search queries should narrow the topic in distinct ways.",
        ),
      );
  });

  return issues;
}

function expectedReasonCategory(signal: string): "interest" | "style" {
  return signal.startsWith("interest:") ||
    signal.startsWith("mode:") ||
    signal.startsWith("topic:") ||
    signal.startsWith("context:")
    ? "interest"
    : "style";
}

function validateAffinitiesAndReasons(
  definition: PathfinderDefinition,
): PathfinderValidationIssue[] {
  const issues: PathfinderValidationIssue[] = [];
  const registeredSignals = new Set(
    definition.survey.questions.flatMap((question) =>
      question.options.flatMap((option) => Object.keys(option.signals ?? {})),
    ),
  );

  definition.recommendations.niches.forEach((niche, nicheIndex) => {
    const path = `recommendations.niches[${nicheIndex}]`;
    for (const [signal, weight] of Object.entries(niche.affinities)) {
      if (!registeredSignals.has(signal))
        issues.push(
          issue(
            "affinity.unknown-signal",
            `${path}.affinities.${signal}`,
            `Affinity signal “${signal}” is not produced by any survey option.`,
          ),
        );
      if (!Number.isFinite(weight) || weight <= 0)
        issues.push(
          issue(
            "affinity.invalid-weight",
            `${path}.affinities.${signal}`,
            "Affinity weights must be finite positive numbers.",
          ),
        );
    }

    niche.reasons.forEach((reason, reasonIndex) => {
      const reasonPath = `${path}.reasons[${reasonIndex}]`;
      if ((niche.affinities[reason.signal] ?? 0) <= 0)
        issues.push(
          issue(
            "reason.unscored-signal",
            `${reasonPath}.signal`,
            `Reason signal “${reason.signal}” must have a positive affinity on this direction.`,
          ),
        );
      if (reason.category !== expectedReasonCategory(reason.signal))
        issues.push(
          issue(
            "reason.category-mismatch",
            `${reasonPath}.category`,
            `Reason category does not match the scoring category for “${reason.signal}”.`,
          ),
        );
      if (!reason.text.trim())
        issues.push(
          issue(
            "reason.missing-copy",
            `${reasonPath}.text`,
            "Recommendation reasons need clear student-facing copy.",
          ),
        );
    });
  });

  return issues;
}

function validateDirectionReferences(
  definition: PathfinderDefinition,
): PathfinderValidationIssue[] {
  const issues: PathfinderValidationIssue[] = [];
  const nicheIds = new Set(
    definition.recommendations.niches.map((niche) => niche.id),
  );
  const boostedIds = new Set<string>();

  definition.survey.questions.forEach((question, questionIndex) => {
    question.options.forEach((option, optionIndex) => {
      for (const nicheId of Object.keys(option.nicheBoosts ?? {})) {
        boostedIds.add(nicheId);
        if (!nicheIds.has(nicheId))
          issues.push(
            issue(
              "reference.unknown-boost-direction",
              `survey.questions[${questionIndex}].options[${optionIndex}].nicheBoosts.${nicheId}`,
              `Direct boost refers to unknown direction “${nicheId}”.`,
            ),
          );
      }
    });
  });

  for (const nicheId of nicheIds) {
    if (!boostedIds.has(nicheId))
      issues.push(
        issue(
          "reference.unboosted-direction",
          `recommendations.niches.${nicheId}`,
          `Direction “${nicheId}” needs at least one targeted survey choice.`,
        ),
      );
  }

  const openIds = definition.recommendations.openExplorationIds;
  if (openIds.length !== 3 || new Set(openIds).size !== openIds.length)
    issues.push(
      issue(
        "reference.invalid-open-directions",
        "recommendations.openExplorationIds",
        "Open exploration must provide three distinct starting directions.",
      ),
    );
  for (const nicheId of openIds) {
    const niche = definition.recommendations.niches.find(
      (candidate) => candidate.id === nicheId,
    );
    if (!niche)
      issues.push(
        issue(
          "reference.unknown-open-direction",
          "recommendations.openExplorationIds",
          `Open exploration refers to unknown direction “${nicheId}”.`,
        ),
      );
    else if (!niche.explorationFriendly)
      issues.push(
        issue(
          "reference.closed-open-direction",
          `recommendations.niches.${nicheId}.explorationFriendly`,
          "Open-exploration defaults must be marked exploration-friendly.",
        ),
      );
  }

  return issues;
}

function validateSerializableDefinition(
  definition: PathfinderDefinition,
): PathfinderValidationIssue[] {
  try {
    const serialized = JSON.stringify(definition);
    if (serialized !== undefined) return [];
  } catch {
    // Report one stable issue below rather than exposing engine-specific errors.
  }

  return [
    {
      code: "definition.not-serializable",
      path: "$",
      message:
        "The pathfinder definition must be serializable before it crosses the App Router server-to-client boundary.",
    },
  ];
}

const definitionRules: readonly DefinitionRule[] = [
  validateSerializableDefinition,
  validateIdentityAndStorage,
  validateSurveyStructure,
  validateBranching,
  validateCalibrationAndUncertainty,
  validateScoringWeights,
  validateTaxonomyRecords,
  validateLiteratureLaunchpads,
  validateAffinitiesAndReasons,
  validateDirectionReferences,
];

export function validatePathfinderDefinition(
  definition: PathfinderDefinition,
): PathfinderValidationResult {
  const issues = definitionRules.flatMap((rule) => rule(definition));
  return { valid: issues.length === 0, issues };
}
