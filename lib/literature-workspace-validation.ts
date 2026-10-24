import {
  LITERATURE_WORKSPACE_SCHEMA_VERSION,
  type LiteratureWorkspace,
} from "@/lib/literature-workspace";
import { LITERATURE_COMPARISON_AXES } from "@/lib/literature-workspace-comparison";

export interface LiteratureWorkspaceValidationIssue {
  code: string;
  path: string;
  message: string;
}

export interface LiteratureWorkspaceValidationResult {
  valid: boolean;
  issues: LiteratureWorkspaceValidationIssue[];
}

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isTimestamp(value: unknown): value is string {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

function isText(value: unknown): value is string {
  return typeof value === "string" && Boolean(value.trim());
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function issue(
  code: string,
  path: string,
  message: string,
): LiteratureWorkspaceValidationIssue {
  return { code, path, message };
}

function validateIdentity(value: unknown) {
  const issues: LiteratureWorkspaceValidationIssue[] = [];
  if (!isRecord(value))
    return [
      issue(
        "workspace.invalid-identity",
        "identity",
        "The workspace identity is missing or unreadable.",
      ),
    ];

  if (!isText(value.id))
    issues.push(
      issue(
        "workspace.missing-id",
        "identity.id",
        "The workspace needs an ID.",
      ),
    );
  if (!isText(value.title))
    issues.push(
      issue(
        "workspace.missing-title",
        "identity.title",
        "The workspace needs a title.",
      ),
    );
  if (
    typeof value.stage !== "string" ||
    !["sources", "reading", "comparison", "synthesis"].includes(value.stage)
  )
    issues.push(
      issue(
        "workspace.invalid-stage",
        "identity.stage",
        "The workspace stage is not recognized.",
      ),
    );
  if (!isTimestamp(value.createdAt) || !isTimestamp(value.updatedAt))
    issues.push(
      issue(
        "workspace.invalid-timestamps",
        "identity",
        "The workspace dates are missing or unreadable.",
      ),
    );

  const origin = value.origin;
  if (!isRecord(origin))
    issues.push(
      issue(
        "workspace.invalid-origin",
        "identity.origin",
        "The workspace origin is missing or unreadable.",
      ),
    );
  else if (!["manual", "pathfinder-result"].includes(String(origin.kind)))
    issues.push(
      issue(
        "workspace.invalid-origin-kind",
        "identity.origin.kind",
        "The workspace origin type is not recognized.",
      ),
    );
  else if (
    origin.kind === "pathfinder-result" &&
    !["moduleId", "moduleTitle", "directionId", "directionName"].every((key) =>
      isText(origin[key]),
    )
  )
    issues.push(
      issue(
        "workspace.incomplete-pathfinder-origin",
        "identity.origin",
        "A pathfinder-linked workspace needs its module and direction names and IDs.",
      ),
    );

  return issues;
}

function validateSources(value: unknown) {
  const issues: LiteratureWorkspaceValidationIssue[] = [];
  const ids = new Set<string>();
  if (!Array.isArray(value))
    return {
      ids,
      issues: [
        issue(
          "workspace.invalid-sources",
          "sources",
          "The saved source library is unreadable.",
        ),
      ],
    };

  value.forEach((source, index) => {
    const path = `sources[${index}]`;
    if (!isRecord(source)) {
      issues.push(
        issue(
          "workspace.invalid-source",
          path,
          "This source record is unreadable.",
        ),
      );
      return;
    }
    if (!isText(source.id))
      issues.push(
        issue(
          "workspace.missing-source-id",
          `${path}.id`,
          "The source needs an ID.",
        ),
      );
    else if (ids.has(source.id))
      issues.push(
        issue(
          "workspace.duplicate-source-id",
          `${path}.id`,
          `Source ID “${source.id}” appears more than once.`,
        ),
      );
    else ids.add(source.id);

    if (!isText(source.title))
      issues.push(
        issue(
          "workspace.missing-source-title",
          `${path}.title`,
          "Every source needs a title.",
        ),
      );
    if (!isStringArray(source.authors))
      issues.push(
        issue(
          "workspace.invalid-source-authors",
          `${path}.authors`,
          "Source authors must be stored as a list.",
        ),
      );
    if (
      source.year !== undefined &&
      (!Number.isInteger(source.year) ||
        Number(source.year) < 1800 ||
        Number(source.year) > new Date().getFullYear() + 1)
    )
      issues.push(
        issue(
          "workspace.invalid-source-year",
          `${path}.year`,
          "The publication year is outside the supported range.",
        ),
      );
    if (
      ![
        "review",
        "perspective",
        "research-article",
        "preprint",
        "other",
      ].includes(String(source.kind))
    )
      issues.push(
        issue(
          "workspace.invalid-source-kind",
          `${path}.kind`,
          "The source type is not recognized.",
        ),
      );
    if (
      !["unverified", "student-checked"].includes(String(source.verification))
    )
      issues.push(
        issue(
          "workspace.invalid-verification",
          `${path}.verification`,
          "The citation verification state is not recognized.",
        ),
      );
    if (
      !["saved", "screening", "reading", "notes-complete"].includes(
        String(source.readingStatus),
      )
    )
      issues.push(
        issue(
          "workspace.invalid-reading-status",
          `${path}.readingStatus`,
          "The reading status is not recognized.",
        ),
      );
    if (!isTimestamp(source.addedAt) || !isTimestamp(source.updatedAt))
      issues.push(
        issue(
          "workspace.invalid-source-timestamps",
          path,
          "The source dates are missing or unreadable.",
        ),
      );
  });

  return { ids, issues };
}

function validateReadingNotes(value: unknown, sourceIds: ReadonlySet<string>) {
  const issues: LiteratureWorkspaceValidationIssue[] = [];
  const notedSources = new Set<string>();
  if (!Array.isArray(value))
    return [
      issue(
        "workspace.invalid-reading-notes",
        "readingNotes",
        "The saved reading notes are unreadable.",
      ),
    ];

  value.forEach((note, index) => {
    const path = `readingNotes[${index}]`;
    if (!isRecord(note)) {
      issues.push(
        issue(
          "workspace.invalid-reading-note",
          path,
          "This reading note is unreadable.",
        ),
      );
      return;
    }
    if (!isText(note.sourceId) || !sourceIds.has(note.sourceId))
      issues.push(
        issue(
          "workspace.orphaned-reading-note",
          `${path}.sourceId`,
          "This reading note does not match a saved source.",
        ),
      );
    else if (notedSources.has(note.sourceId))
      issues.push(
        issue(
          "workspace.duplicate-reading-note",
          `${path}.sourceId`,
          "A source can have only one structured reading note.",
        ),
      );
    else notedSources.add(note.sourceId);

    if (typeof note.researchPurpose !== "string")
      issues.push(
        issue(
          "workspace.invalid-reading-purpose",
          `${path}.researchPurpose`,
          "The research-purpose note must be text.",
        ),
      );
    for (const key of [
      "methods",
      "evidence",
      "reportedFindings",
      "reportedLimitations",
      "studentInterpretations",
      "openQuestions",
    ])
      if (!isStringArray(note[key]))
        issues.push(
          issue(
            "workspace.invalid-reading-section",
            `${path}.${key}`,
            "Each reading-note section must be stored as a list.",
          ),
        );
    if (!isTimestamp(note.updatedAt))
      issues.push(
        issue(
          "workspace.invalid-reading-note-date",
          `${path}.updatedAt`,
          "The reading-note date is unreadable.",
        ),
      );
  });
  return issues;
}

function validateVocabulary(value: unknown, sourceIds: ReadonlySet<string>) {
  const issues: LiteratureWorkspaceValidationIssue[] = [];
  const ids = new Set<string>();
  if (!Array.isArray(value))
    return [
      issue(
        "workspace.invalid-vocabulary",
        "vocabulary",
        "The saved vocabulary notebook is unreadable.",
      ),
    ];

  value.forEach((note, index) => {
    const path = `vocabulary[${index}]`;
    if (!isRecord(note)) {
      issues.push(
        issue(
          "workspace.invalid-vocabulary-note",
          path,
          "This vocabulary note is unreadable.",
        ),
      );
      return;
    }
    if (!isText(note.id) || ids.has(note.id))
      issues.push(
        issue(
          "workspace.invalid-vocabulary-id",
          `${path}.id`,
          "Vocabulary-note IDs must be present and unique.",
        ),
      );
    else ids.add(note.id);
    if (!isText(note.term))
      issues.push(
        issue(
          "workspace.missing-vocabulary-term",
          `${path}.term`,
          "Every vocabulary note needs a term.",
        ),
      );
    if (typeof note.workingDefinition !== "string")
      issues.push(
        issue(
          "workspace.invalid-working-definition",
          `${path}.workingDefinition`,
          "The working definition must be text.",
        ),
      );
    if (
      !["new-to-me", "building", "comfortable"].includes(
        String(note.familiarity),
      )
    )
      issues.push(
        issue(
          "workspace.invalid-familiarity",
          `${path}.familiarity`,
          "The familiarity state is not recognized.",
        ),
      );
    if (
      !isStringArray(note.sourceIds) ||
      note.sourceIds.some((sourceId) => !sourceIds.has(sourceId))
    )
      issues.push(
        issue(
          "workspace.orphaned-vocabulary-link",
          `${path}.sourceIds`,
          "Vocabulary links must refer to saved sources.",
        ),
      );
    if (!isStringArray(note.relatedTerms) || !isStringArray(note.questions))
      issues.push(
        issue(
          "workspace.invalid-vocabulary-lists",
          path,
          "Related terms and vocabulary questions must be stored as lists.",
        ),
      );
    if (!isTimestamp(note.createdAt) || !isTimestamp(note.updatedAt))
      issues.push(
        issue(
          "workspace.invalid-vocabulary-timestamps",
          path,
          "The vocabulary-note dates are unreadable.",
        ),
      );
  });
  return issues;
}

function validateComparison(value: unknown, sourceIds: ReadonlySet<string>) {
  const issues: LiteratureWorkspaceValidationIssue[] = [];
  if (!isRecord(value))
    return [
      issue(
        "workspace.invalid-comparison",
        "comparison",
        "The saved comparison is unreadable.",
      ),
    ];

  const selected = isStringArray(value.sourceIds) ? value.sourceIds : [];
  if (
    !isStringArray(value.sourceIds) ||
    selected.length > 3 ||
    new Set(selected).size !== selected.length ||
    selected.some((id) => !sourceIds.has(id))
  )
    issues.push(
      issue(
        "workspace.invalid-comparison-sources",
        "comparison.sourceIds",
        "A comparison may select up to three unique saved sources.",
      ),
    );

  const usedAxes = new Set<string>();
  if (!Array.isArray(value.entries))
    issues.push(
      issue(
        "workspace.invalid-comparison-entries",
        "comparison.entries",
        "The comparison entries are unreadable.",
      ),
    );
  else
    value.entries.forEach((entry, index) => {
      const path = `comparison.entries[${index}]`;
      if (!isRecord(entry)) {
        issues.push(
          issue(
            "workspace.invalid-comparison-entry",
            path,
            "This comparison entry is unreadable.",
          ),
        );
        return;
      }
      if (
        typeof entry.axisId !== "string" ||
        !LITERATURE_COMPARISON_AXES.includes(
          entry.axisId as (typeof LITERATURE_COMPARISON_AXES)[number],
        ) ||
        usedAxes.has(entry.axisId)
      )
        issues.push(
          issue(
            "workspace.invalid-comparison-axis",
            `${path}.axisId`,
            "Comparison axes must be recognized and unique.",
          ),
        );
      else usedAxes.add(entry.axisId);

      if (!isRecord(entry.observations))
        issues.push(
          issue(
            "workspace.invalid-comparison-observations",
            `${path}.observations`,
            "Comparison observations are unreadable.",
          ),
        );
      else if (
        Object.entries(entry.observations).some(
          ([sourceId, observation]) =>
            !selected.includes(sourceId) || typeof observation !== "string",
        )
      )
        issues.push(
          issue(
            "workspace.orphaned-comparison-observation",
            `${path}.observations`,
            "Comparison observations must refer to selected sources.",
          ),
        );
      if (typeof entry.synthesis !== "string")
        issues.push(
          issue(
            "workspace.invalid-comparison-synthesis",
            `${path}.synthesis`,
            "The comparison synthesis must be text.",
          ),
        );
    });

  if (!isTimestamp(value.updatedAt))
    issues.push(
      issue(
        "workspace.invalid-comparison-date",
        "comparison.updatedAt",
        "The comparison date is unreadable.",
      ),
    );
  return issues;
}

export function validateLiteratureWorkspace(
  value: unknown,
): LiteratureWorkspaceValidationResult {
  if (!isRecord(value))
    return {
      valid: false,
      issues: [
        issue(
          "workspace.invalid-root",
          "workspace",
          "The literature workspace is unreadable.",
        ),
      ],
    };

  const issues: LiteratureWorkspaceValidationIssue[] = [];
  if (value.schemaVersion !== LITERATURE_WORKSPACE_SCHEMA_VERSION)
    issues.push(
      issue(
        "workspace.unsupported-version",
        "schemaVersion",
        "This workspace was saved by an unsupported version.",
      ),
    );
  issues.push(...validateIdentity(value.identity));
  const sourceValidation = validateSources(value.sources);
  issues.push(...sourceValidation.issues);
  issues.push(
    ...validateReadingNotes(value.readingNotes, sourceValidation.ids),
  );
  issues.push(...validateVocabulary(value.vocabulary, sourceValidation.ids));
  issues.push(...validateComparison(value.comparison, sourceValidation.ids));

  return { valid: issues.length === 0, issues };
}

export function isLiteratureWorkspace(
  value: unknown,
): value is LiteratureWorkspace {
  return validateLiteratureWorkspace(value).valid;
}
