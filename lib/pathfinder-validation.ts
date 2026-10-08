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
];

export function validatePathfinderDefinition(
  definition: PathfinderDefinition,
): PathfinderValidationResult {
  const issues = definitionRules.flatMap((rule) => rule(definition));
  return { valid: issues.length === 0, issues };
}
