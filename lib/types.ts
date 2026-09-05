export type SurveyStage =
  "calibration" | "motivation" | "narrowing" | "question" | "style";

export type AnswerMap = Record<string, string[]>;

export interface VisibilityRule {
  questionId: string;
  anyOf: string[];
}

export interface SurveyOption {
  id: string;
  label: string;
  description?: string;
  signals?: Record<string, number>;
  nicheBoosts?: Record<string, number>;
  uncertainty?: boolean;
}

export interface SurveyQuestion {
  id: string;
  stage: SurveyStage;
  kicker: string;
  title: string;
  prompt?: string;
  type: "single" | "multi";
  maxSelections?: number;
  options: SurveyOption[];
  visibleWhen?: VisibilityRule;
  definition?: { term: string; text: string };
}

export interface SearchQueries {
  orientation: string;
  focused: string;
  review: string;
}

export interface ReasonRule {
  signal: string;
  category: "interest" | "style";
  text: string;
}

export interface Niche {
  id: string;
  area: string;
  name: string;
  shortDescription: string;
  explanation: string;
  questions: string[];
  systems: string[];
  approaches: { name: string; explanation: string }[];
  concepts: string[];
  preparation: string;
  keywords: string[];
  synonyms: string[];
  searches: SearchQueries;
  paperTypes: string[];
  affinities: Record<string, number>;
  reasons: ReasonRule[];
  comparisonLens: string;
  explorationFriendly?: boolean;
}

export interface RankedNiche {
  niche: Niche;
  score: number;
  interestScore: number;
  styleScore: number;
  directScore: number;
  interestReasons: string[];
  styleReasons: string[];
}

export interface KnowledgeProfile {
  startingPoint: string;
  mathComfort: string;
  codingComfort: string;
  explanationPreference: string;
  conceptsToRevisit: string[];
}

export interface PersistedSurveyState {
  version: number;
  screen: "intro" | "survey" | "results" | "review";
  answers: AnswerMap;
  currentQuestionId?: string;
  primaryOverride?: string;
  savedAt: string;
}
