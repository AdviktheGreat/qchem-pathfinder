import type { LiteratureWorkspace } from "@/lib/literature-workspace";
import {
  validateLiteratureWorkspace,
  type LiteratureWorkspaceValidationIssue,
} from "@/lib/literature-workspace-validation";

export const LITERATURE_WORKSPACE_STORAGE_PREFIX =
  "research-pathfinder:literature-workspace:";

export type LiteratureWorkspaceStorageHealth = "available" | "unavailable";

export interface LiteratureWorkspaceStorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface LiteratureWorkspaceRestoreResult {
  workspace: LiteratureWorkspace | null;
  issues: LiteratureWorkspaceValidationIssue[];
  notice?: string;
}

export function getLiteratureWorkspaceStorageKey(workspaceId: string): string {
  return `${LITERATURE_WORKSPACE_STORAGE_PREFIX}${encodeURIComponent(workspaceId)}`;
}

export function serializeLiteratureWorkspace(
  workspace: LiteratureWorkspace,
): string {
  return JSON.stringify(workspace);
}

export function restoreLiteratureWorkspace(
  raw: string | null,
): LiteratureWorkspaceRestoreResult {
  if (!raw) return { workspace: null, issues: [] };

  try {
    const parsed: unknown = JSON.parse(raw);
    const validation = validateLiteratureWorkspace(parsed);
    if (!validation.valid)
      return {
        workspace: null,
        issues: validation.issues,
        notice:
          "This saved literature workspace could not be restored safely. Its original browser record was not changed.",
      };
    return { workspace: parsed as LiteratureWorkspace, issues: [] };
  } catch {
    return {
      workspace: null,
      issues: [
        {
          code: "workspace.invalid-json",
          path: "workspace",
          message: "The saved literature workspace is not valid JSON.",
        },
      ],
      notice:
        "This saved literature workspace could not be restored safely. Its original browser record was not changed.",
    };
  }
}

export function readLiteratureWorkspaceStorage(
  storage: Pick<LiteratureWorkspaceStorageLike, "getItem">,
  workspaceId: string,
): LiteratureWorkspaceRestoreResult & {
  health: LiteratureWorkspaceStorageHealth;
} {
  try {
    return {
      health: "available",
      ...restoreLiteratureWorkspace(
        storage.getItem(getLiteratureWorkspaceStorageKey(workspaceId)),
      ),
    };
  } catch {
    return {
      health: "unavailable",
      workspace: null,
      issues: [],
      notice:
        "Browser storage is unavailable, so this workspace can be used only for this visit.",
    };
  }
}

export function writeLiteratureWorkspaceStorage(
  storage: Pick<LiteratureWorkspaceStorageLike, "setItem">,
  workspace: LiteratureWorkspace,
): LiteratureWorkspaceStorageHealth {
  const validation = validateLiteratureWorkspace(workspace);
  if (!validation.valid)
    throw new Error(
      `Refusing to save an invalid literature workspace: ${validation.issues[0]?.message ?? "unknown validation issue"}`,
    );

  try {
    storage.setItem(
      getLiteratureWorkspaceStorageKey(workspace.identity.id),
      serializeLiteratureWorkspace(workspace),
    );
    return "available";
  } catch {
    return "unavailable";
  }
}

export function clearLiteratureWorkspaceStorage(
  storage: Pick<LiteratureWorkspaceStorageLike, "removeItem">,
  workspaceId: string,
): LiteratureWorkspaceStorageHealth {
  try {
    storage.removeItem(getLiteratureWorkspaceStorageKey(workspaceId));
    return "available";
  } catch {
    return "unavailable";
  }
}
