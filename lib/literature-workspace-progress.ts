import { LITERATURE_COMPARISON_AXES } from "@/lib/literature-workspace-comparison";
import type { LiteratureWorkspace } from "@/lib/literature-workspace";

export type LiteratureWorkspaceNextStep =
  | "add-source"
  | "verify-citations"
  | "read-source"
  | "add-comparison-source"
  | "select-comparison"
  | "compare-papers"
  | "prepare-synthesis";

export interface LiteratureWorkspaceProgress {
  sourceCount: number;
  verifiedSourceCount: number;
  notedSourceCount: number;
  vocabularyCount: number;
  selectedComparisonCount: number;
  completedComparisonAxes: number;
  totalComparisonAxes: number;
  milestones: {
    hasSources: boolean;
    hasVerifiedCitation: boolean;
    hasReadingNotes: boolean;
    canCompare: boolean;
    comparisonStarted: boolean;
  };
  nextStep: LiteratureWorkspaceNextStep;
}

function completedComparisonAxes(workspace: LiteratureWorkspace): number {
  const selected = workspace.comparison.sourceIds;
  if (selected.length < 2) return 0;

  return workspace.comparison.entries.filter(
    (entry) =>
      entry.synthesis.trim() &&
      selected.every((sourceId) => entry.observations[sourceId]?.trim()),
  ).length;
}

function getNextStep(
  workspace: LiteratureWorkspace,
  completedAxes: number,
): LiteratureWorkspaceNextStep {
  if (!workspace.sources.length) return "add-source";
  if (workspace.sources.some((source) => source.verification === "unverified"))
    return "verify-citations";
  if (workspace.readingNotes.length < workspace.sources.length)
    return "read-source";
  if (workspace.sources.length < 2) return "add-comparison-source";
  if (workspace.comparison.sourceIds.length < 2) return "select-comparison";
  if (completedAxes < LITERATURE_COMPARISON_AXES.length)
    return "compare-papers";
  return "prepare-synthesis";
}

export function getLiteratureWorkspaceProgress(
  workspace: LiteratureWorkspace,
): LiteratureWorkspaceProgress {
  const completedAxes = completedComparisonAxes(workspace);
  const verifiedSourceCount = workspace.sources.filter(
    (source) => source.verification === "student-checked",
  ).length;

  return {
    sourceCount: workspace.sources.length,
    verifiedSourceCount,
    notedSourceCount: workspace.readingNotes.length,
    vocabularyCount: workspace.vocabulary.length,
    selectedComparisonCount: workspace.comparison.sourceIds.length,
    completedComparisonAxes: completedAxes,
    totalComparisonAxes: LITERATURE_COMPARISON_AXES.length,
    milestones: {
      hasSources: workspace.sources.length > 0,
      hasVerifiedCitation: verifiedSourceCount > 0,
      hasReadingNotes: workspace.readingNotes.length > 0,
      canCompare: workspace.sources.length >= 2,
      comparisonStarted:
        workspace.comparison.sourceIds.length >= 2 &&
        workspace.comparison.entries.length > 0,
    },
    nextStep: getNextStep(workspace, completedAxes),
  };
}
