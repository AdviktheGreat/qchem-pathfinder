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

export type LiteratureSourceKind =
  "review" | "perspective" | "research-article" | "preprint" | "other";

export type CitationVerification = "unverified" | "student-checked";

export type ReadingStatus =
  "saved" | "screening" | "reading" | "notes-complete";

export interface LiteratureSource {
  id: string;
  title: string;
  authors: string[];
  year?: number;
  venue?: string;
  doi?: string;
  url?: string;
  kind: LiteratureSourceKind;
  verification: CitationVerification;
  readingStatus: ReadingStatus;
  addedAt: string;
  updatedAt: string;
}

export interface LiteratureReadingNote {
  sourceId: string;
  researchPurpose: string;
  methods: string[];
  evidence: string[];
  reportedFindings: string[];
  reportedLimitations: string[];
  studentInterpretations: string[];
  openQuestions: string[];
  updatedAt: string;
}

export type LiteratureComparisonAxisId =
  | "purpose"
  | "systems"
  | "methods"
  | "evidence"
  | "findings"
  | "limitations"
  | "transferability";

export interface LiteratureComparisonEntry {
  axisId: LiteratureComparisonAxisId;
  observations: Record<string, string>;
  synthesis: string;
}

export interface LiteratureComparison {
  sourceIds: string[];
  entries: LiteratureComparisonEntry[];
  updatedAt: string;
}

export type VocabularyFamiliarity = "new-to-me" | "building" | "comfortable";

export interface LiteratureVocabularyNote {
  id: string;
  term: string;
  workingDefinition: string;
  familiarity: VocabularyFamiliarity;
  sourceIds: string[];
  relatedTerms: string[];
  questions: string[];
  createdAt: string;
  updatedAt: string;
}
