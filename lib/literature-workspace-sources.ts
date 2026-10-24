import type {
  LiteratureSource,
  LiteratureWorkspace,
} from "@/lib/literature-workspace";

export type NewLiteratureSource = Omit<
  LiteratureSource,
  "addedAt" | "updatedAt"
>;

function cleanTextList(values: readonly string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function normalizeSource(source: LiteratureSource): LiteratureSource {
  return {
    ...source,
    title: source.title.trim(),
    authors: cleanTextList(source.authors),
    venue: source.venue?.trim() || undefined,
    doi: source.doi?.trim() || undefined,
    url: source.url?.trim() || undefined,
  };
}

function touch(
  workspace: LiteratureWorkspace,
  date: Date,
): LiteratureWorkspace["identity"] {
  return { ...workspace.identity, updatedAt: date.toISOString() };
}

export function addLiteratureSource(
  workspace: LiteratureWorkspace,
  source: NewLiteratureSource,
  date = new Date(),
): LiteratureWorkspace {
  if (workspace.sources.some((candidate) => candidate.id === source.id))
    throw new Error(`A source with ID “${source.id}” already exists.`);

  const timestamp = date.toISOString();
  return {
    ...workspace,
    identity: touch(workspace, date),
    sources: [
      ...workspace.sources,
      normalizeSource({ ...source, addedAt: timestamp, updatedAt: timestamp }),
    ],
  };
}

export function updateLiteratureSource(
  workspace: LiteratureWorkspace,
  sourceId: string,
  changes: Partial<NewLiteratureSource>,
  date = new Date(),
): LiteratureWorkspace {
  if (!workspace.sources.some((source) => source.id === sourceId))
    return workspace;

  return {
    ...workspace,
    identity: touch(workspace, date),
    sources: workspace.sources.map((source) =>
      source.id === sourceId
        ? normalizeSource({
            ...source,
            ...changes,
            id: source.id,
            addedAt: source.addedAt,
            updatedAt: date.toISOString(),
          })
        : source,
    ),
  };
}

export function removeLiteratureSource(
  workspace: LiteratureWorkspace,
  sourceId: string,
  date = new Date(),
): LiteratureWorkspace {
  if (!workspace.sources.some((source) => source.id === sourceId))
    return workspace;

  const comparisonSourceIds = workspace.comparison.sourceIds.filter(
    (id) => id !== sourceId,
  );

  return {
    ...workspace,
    identity: touch(workspace, date),
    sources: workspace.sources.filter((source) => source.id !== sourceId),
    readingNotes: workspace.readingNotes.filter(
      (note) => note.sourceId !== sourceId,
    ),
    vocabulary: workspace.vocabulary.map((note) => ({
      ...note,
      sourceIds: note.sourceIds.filter((id) => id !== sourceId),
    })),
    comparison: {
      ...workspace.comparison,
      sourceIds: comparisonSourceIds,
      entries: workspace.comparison.entries.map((entry) => ({
        ...entry,
        observations: Object.fromEntries(
          Object.entries(entry.observations).filter(([id]) => id !== sourceId),
        ),
      })),
      updatedAt: date.toISOString(),
    },
  };
}
