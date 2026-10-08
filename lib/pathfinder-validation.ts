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
];

export function validatePathfinderDefinition(
  definition: PathfinderDefinition,
): PathfinderValidationResult {
  const issues = definitionRules.flatMap((rule) => rule(definition));
  return { valid: issues.length === 0, issues };
}
