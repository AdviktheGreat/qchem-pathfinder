import type {
  LiteratureComparisonAxisId,
  LiteratureComparisonEntry,
  LiteratureWorkspace,
} from "@/lib/literature-workspace";

export const LITERATURE_COMPARISON_AXES: readonly LiteratureComparisonAxisId[] =
  [
    "purpose",
    "systems",
    "methods",
    "evidence",
    "findings",
    "limitations",
    "transferability",
  ];

function touch(
  workspace: LiteratureWorkspace,
  date: Date,
): LiteratureWorkspace["identity"] {
  return { ...workspace.identity, updatedAt: date.toISOString() };
}

function cleanEntry(entry: LiteratureComparisonEntry) {
  return (
    Boolean(entry.synthesis.trim()) ||
    Object.values(entry.observations).some((value) => value.trim())
  );
}

function updateEntry(
  workspace: LiteratureWorkspace,
  axisId: LiteratureComparisonAxisId,
  update: (entry: LiteratureComparisonEntry) => LiteratureComparisonEntry,
  date: Date,
): LiteratureWorkspace {
  if (!LITERATURE_COMPARISON_AXES.includes(axisId))
    throw new Error(`Unknown comparison axis “${axisId}”.`);

  const existing = workspace.comparison.entries.find(
    (entry) => entry.axisId === axisId,
  ) ?? { axisId, observations: {}, synthesis: "" };
  const updated = update(existing);
  const entries = workspace.comparison.entries.filter(
    (entry) => entry.axisId !== axisId,
  );
  if (cleanEntry(updated)) entries.push(updated);

  return {
    ...workspace,
    identity: touch(workspace, date),
    comparison: {
      ...workspace.comparison,
      entries,
      updatedAt: date.toISOString(),
    },
  };
}

export function setLiteratureComparisonSources(
  workspace: LiteratureWorkspace,
  sourceIds: readonly string[],
  date = new Date(),
): LiteratureWorkspace {
  const knownSourceIds = new Set(workspace.sources.map((source) => source.id));
  const selected = [...new Set(sourceIds)].filter((id) =>
    knownSourceIds.has(id),
  );
  if (selected.length > 3)
    throw new Error(
      "A literature comparison can include at most three papers.",
    );

  return {
    ...workspace,
    identity: touch(workspace, date),
    comparison: {
      sourceIds: selected,
      entries: workspace.comparison.entries
        .map((entry) => ({
          ...entry,
          observations: Object.fromEntries(
            Object.entries(entry.observations).filter(([sourceId]) =>
              selected.includes(sourceId),
            ),
          ),
        }))
        .filter(cleanEntry),
      updatedAt: date.toISOString(),
    },
  };
}

export function setLiteratureComparisonObservation(
  workspace: LiteratureWorkspace,
  axisId: LiteratureComparisonAxisId,
  sourceId: string,
  observation: string,
  date = new Date(),
): LiteratureWorkspace {
  if (!workspace.comparison.sourceIds.includes(sourceId))
    throw new Error(`Source “${sourceId}” is not selected for comparison.`);

  return updateEntry(
    workspace,
    axisId,
    (entry) => {
      const observations = Object.fromEntries(
        Object.entries(entry.observations).filter(([id]) => id !== sourceId),
      );
      if (observation.trim()) observations[sourceId] = observation.trim();
      return { ...entry, observations };
    },
    date,
  );
}

export function setLiteratureComparisonSynthesis(
  workspace: LiteratureWorkspace,
  axisId: LiteratureComparisonAxisId,
  synthesis: string,
  date = new Date(),
): LiteratureWorkspace {
  return updateEntry(
    workspace,
    axisId,
    (entry) => ({ ...entry, synthesis: synthesis.trim() }),
    date,
  );
}
