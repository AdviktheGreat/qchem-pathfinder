import {
  LITERATURE_WORKSPACE_SCHEMA_VERSION,
  type LiteratureWorkspace,
  type LiteratureWorkspaceOrigin,
} from "@/lib/literature-workspace";

export interface CreateLiteratureWorkspaceInput {
  id: string;
  title: string;
  origin?: LiteratureWorkspaceOrigin;
  date?: Date;
}

export function createLiteratureWorkspace({
  id,
  title,
  origin = { kind: "manual" },
  date = new Date(),
}: CreateLiteratureWorkspaceInput): LiteratureWorkspace {
  const timestamp = date.toISOString();

  return {
    schemaVersion: LITERATURE_WORKSPACE_SCHEMA_VERSION,
    identity: {
      id,
      title: title.trim() || "Untitled literature exploration",
      stage: "sources",
      origin,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    sources: [],
    readingNotes: [],
    vocabulary: [],
    comparison: {
      sourceIds: [],
      entries: [],
      updatedAt: timestamp,
    },
  };
}
