import type { LiteratureWorkspace } from "@/lib/literature-workspace";
import {
  validateLiteratureWorkspace,
  type LiteratureWorkspaceValidationIssue,
} from "@/lib/literature-workspace-validation";

export const LITERATURE_WORKSPACE_BACKUP_FORMAT =
  "research-pathfinder-literature-workspace";
export const LITERATURE_WORKSPACE_BACKUP_VERSION = 1;

interface LiteratureWorkspaceBackup {
  format: typeof LITERATURE_WORKSPACE_BACKUP_FORMAT;
  formatVersion: typeof LITERATURE_WORKSPACE_BACKUP_VERSION;
  exportedAt: string;
  workspace: LiteratureWorkspace;
}

export interface LiteratureWorkspaceImportResult {
  workspace: LiteratureWorkspace | null;
  issues: LiteratureWorkspaceValidationIssue[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function createLiteratureWorkspaceBackup(
  workspace: LiteratureWorkspace,
  date = new Date(),
): string {
  const validation = validateLiteratureWorkspace(workspace);
  if (!validation.valid)
    throw new Error(
      `Cannot export an invalid literature workspace: ${validation.issues[0]?.message ?? "unknown validation issue"}`,
    );

  const backup: LiteratureWorkspaceBackup = {
    format: LITERATURE_WORKSPACE_BACKUP_FORMAT,
    formatVersion: LITERATURE_WORKSPACE_BACKUP_VERSION,
    exportedAt: date.toISOString(),
    workspace,
  };
  return JSON.stringify(backup, null, 2);
}

export function importLiteratureWorkspaceBackup(
  raw: string,
): LiteratureWorkspaceImportResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {
      workspace: null,
      issues: [
        {
          code: "workspace-backup.invalid-json",
          path: "backup",
          message: "This backup is not valid JSON.",
        },
      ],
    };
  }

  if (
    !isRecord(parsed) ||
    parsed.format !== LITERATURE_WORKSPACE_BACKUP_FORMAT ||
    parsed.formatVersion !== LITERATURE_WORKSPACE_BACKUP_VERSION ||
    typeof parsed.exportedAt !== "string" ||
    !Number.isFinite(Date.parse(parsed.exportedAt))
  )
    return {
      workspace: null,
      issues: [
        {
          code: "workspace-backup.unsupported-envelope",
          path: "backup",
          message:
            "This file is not a supported Research Pathfinder literature-workspace backup.",
        },
      ],
    };

  const validation = validateLiteratureWorkspace(parsed.workspace);
  if (!validation.valid) return { workspace: null, issues: validation.issues };

  return {
    workspace: parsed.workspace as LiteratureWorkspace,
    issues: [],
  };
}
