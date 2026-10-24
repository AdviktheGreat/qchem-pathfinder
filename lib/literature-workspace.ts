export const LITERATURE_WORKSPACE_SCHEMA_VERSION = 1;

export type LiteratureWorkspaceStage =
  "sources" | "reading" | "comparison" | "synthesis";

export interface LiteratureWorkspaceOrigin {
  kind: "pathfinder-result" | "manual";
  moduleId?: string;
  moduleTitle?: string;
  directionId?: string;
  directionName?: string;
}

export interface LiteratureWorkspaceIdentity {
  id: string;
  title: string;
  stage: LiteratureWorkspaceStage;
  origin: LiteratureWorkspaceOrigin;
  createdAt: string;
  updatedAt: string;
}
