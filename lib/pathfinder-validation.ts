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
];

export function validatePathfinderDefinition(
  definition: PathfinderDefinition,
): PathfinderValidationResult {
  const issues = definitionRules.flatMap((rule) => rule(definition));
  return { valid: issues.length === 0, issues };
}
