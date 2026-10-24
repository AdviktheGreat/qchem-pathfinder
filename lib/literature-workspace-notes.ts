import type {
  LiteratureReadingNote,
  LiteratureVocabularyNote,
  LiteratureWorkspace,
} from "@/lib/literature-workspace";

export type ReadingNoteContent = Omit<
  LiteratureReadingNote,
  "sourceId" | "updatedAt"
>;
export type NewVocabularyNote = Omit<
  LiteratureVocabularyNote,
  "createdAt" | "updatedAt"
>;

function cleanTextList(values: readonly string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function touch(
  workspace: LiteratureWorkspace,
  date: Date,
): LiteratureWorkspace["identity"] {
  return { ...workspace.identity, updatedAt: date.toISOString() };
}

function normalizeReadingContent(
  content: ReadingNoteContent,
): ReadingNoteContent {
  return {
    researchPurpose: content.researchPurpose.trim(),
    methods: cleanTextList(content.methods),
    evidence: cleanTextList(content.evidence),
    reportedFindings: cleanTextList(content.reportedFindings),
    reportedLimitations: cleanTextList(content.reportedLimitations),
    studentInterpretations: cleanTextList(content.studentInterpretations),
    openQuestions: cleanTextList(content.openQuestions),
  };
}

function normalizeVocabularyNote(
  note: LiteratureVocabularyNote,
  validSourceIds: ReadonlySet<string>,
): LiteratureVocabularyNote {
  return {
    ...note,
    term: note.term.trim(),
    workingDefinition: note.workingDefinition.trim(),
    sourceIds: [...new Set(note.sourceIds)].filter((id) =>
      validSourceIds.has(id),
    ),
    relatedTerms: cleanTextList(note.relatedTerms),
    questions: cleanTextList(note.questions),
  };
}

export function upsertLiteratureReadingNote(
  workspace: LiteratureWorkspace,
  sourceId: string,
  content: ReadingNoteContent,
  date = new Date(),
): LiteratureWorkspace {
  if (!workspace.sources.some((source) => source.id === sourceId))
    throw new Error(`Cannot add notes for unknown source “${sourceId}”.`);

  const note: LiteratureReadingNote = {
    sourceId,
    ...normalizeReadingContent(content),
    updatedAt: date.toISOString(),
  };
  const existingIndex = workspace.readingNotes.findIndex(
    (candidate) => candidate.sourceId === sourceId,
  );
  const readingNotes = [...workspace.readingNotes];
  if (existingIndex === -1) readingNotes.push(note);
  else readingNotes[existingIndex] = note;

  return {
    ...workspace,
    identity: touch(workspace, date),
    readingNotes,
  };
}

export function addLiteratureVocabularyNote(
  workspace: LiteratureWorkspace,
  input: NewVocabularyNote,
  date = new Date(),
): LiteratureWorkspace {
  if (workspace.vocabulary.some((note) => note.id === input.id))
    throw new Error(`A vocabulary note with ID “${input.id}” already exists.`);

  const timestamp = date.toISOString();
  const validSourceIds = new Set(workspace.sources.map((source) => source.id));
  return {
    ...workspace,
    identity: touch(workspace, date),
    vocabulary: [
      ...workspace.vocabulary,
      normalizeVocabularyNote(
        { ...input, createdAt: timestamp, updatedAt: timestamp },
        validSourceIds,
      ),
    ],
  };
}

export function updateLiteratureVocabularyNote(
  workspace: LiteratureWorkspace,
  noteId: string,
  changes: Partial<NewVocabularyNote>,
  date = new Date(),
): LiteratureWorkspace {
  if (!workspace.vocabulary.some((note) => note.id === noteId))
    return workspace;

  const validSourceIds = new Set(workspace.sources.map((source) => source.id));
  return {
    ...workspace,
    identity: touch(workspace, date),
    vocabulary: workspace.vocabulary.map((note) =>
      note.id === noteId
        ? normalizeVocabularyNote(
            {
              ...note,
              ...changes,
              id: note.id,
              createdAt: note.createdAt,
              updatedAt: date.toISOString(),
            },
            validSourceIds,
          )
        : note,
    ),
  };
}

export function removeLiteratureVocabularyNote(
  workspace: LiteratureWorkspace,
  noteId: string,
  date = new Date(),
): LiteratureWorkspace {
  if (!workspace.vocabulary.some((note) => note.id === noteId))
    return workspace;

  return {
    ...workspace,
    identity: touch(workspace, date),
    vocabulary: workspace.vocabulary.filter((note) => note.id !== noteId),
  };
}
