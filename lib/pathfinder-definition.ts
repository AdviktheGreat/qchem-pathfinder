import type {
  Niche,
  SearchQueries,
  SurveyQuestion,
  SurveyStage,
} from "@/lib/types";
import type { RecommendationScoringConfig } from "@/lib/recommendation";

export type PathfinderIcon = "atom" | "material";

export type StageLabels = Record<SurveyStage, string>;

export interface PathfinderIdentity {
  id: string;
  name: string;
  shortName: string;
  brandLabel: string;
  ariaLabel: string;
  route: string;
  icon: PathfinderIcon;
}

export interface PathfinderStorageConfig {
  key: string;
  version: number;
}

export interface PathfinderSurveyConfig {
  questions: readonly SurveyQuestion[];
  stageLabels: StageLabels;
  branchQuestionId: string;
  calibrationQuestionIds: readonly string[];
}

export interface PathfinderRecommendationConfig {
  niches: readonly Niche[];
  openExplorationIds: readonly string[];
  scoring?: RecommendationScoringConfig;
}

export interface ConceptOverlap {
  umbrella: string;
  covered: readonly string[];
}

export interface PathfinderPreparationConfig {
  mathQuestionId: string;
  codingQuestionId: string;
  explanationQuestionId: string;
  mathAdvice: Readonly<Record<string, string>>;
  codingAdvice: Readonly<Record<string, string>>;
  explanationGuides: Readonly<Record<string, string>>;
  supplementalAdvice: readonly {
    questionId: string;
    advice: Readonly<Record<string, string>>;
  }[];
  conceptOverlaps: readonly ConceptOverlap[];
  knowledge: {
    memoryQuestionId: string;
    conceptQuestionId: string;
    startingPointByAnswer: Readonly<Record<string, string>>;
    defaultStartingPoint: string;
    conceptReviewLabels: Readonly<Record<string, string>>;
    mathFallback: string;
    codingFallback: string;
    explanationFallback: string;
    contextReadyOptionId: string;
  };
}

export interface GlossaryItem {
  term: string;
  text: string;
}

export interface FitLabelDescription {
  label: string;
  description: string;
}

export interface SearchRefinement {
  title: string;
  text: string;
}

export interface PaperTypeGuideEntry {
  term: string;
  text: string;
}

export interface PathfinderResultsConfig {
  glossary: readonly GlossaryItem[];
  fitLabelDescriptions: readonly FitLabelDescription[];
  queryGuidance: Readonly<Record<keyof SearchQueries, string>>;
  searchRefinements: readonly SearchRefinement[];
  paperTypeGuide: readonly PaperTypeGuideEntry[];
  paperNoteTemplate: string;
  overview?: {
    eyebrow: string;
    title: string;
    description: string;
    dimensions: readonly {
      label: string;
      questionId: string;
      fallback: string;
    }[];
  };
  primaryCopy?: {
    eyebrow: string;
    title: string;
    description: string;
    contextSummary: string;
  };
}

export interface PathfinderProfileConfig {
  researchStyleLabels: Readonly<Record<string, string>>;
  exportTitle: string;
  filenamePrefix: string;
  motivationQuestionId: string;
  questionTypeQuestionId: string;
}

export interface PathfinderIntroCopy {
  eyebrow: string;
  title: string;
  description: string;
  scopeNote?: string;
  durationLabel: string;
  privacyLabel: string;
  noScoreLabel: string;
  privacyNote?: string;
  promiseSteps: readonly [
    { label: string; text: string },
    { label: string; text: string },
    { label: string; text: string },
  ];
  branchingNote: string;
}

export interface PathfinderContextLabels {
  intro: string;
  results: string;
  review: string;
}

export interface PathfinderDefinition {
  identity: PathfinderIdentity;
  storage: PathfinderStorageConfig;
  survey: PathfinderSurveyConfig;
  recommendations: PathfinderRecommendationConfig;
  preparation: PathfinderPreparationConfig;
  results: PathfinderResultsConfig;
  profile: PathfinderProfileConfig;
  intro: PathfinderIntroCopy;
  contextLabels: PathfinderContextLabels;
}
