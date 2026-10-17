export type HubOrientationDimension =
  "motivation" | "system" | "question" | "working-style";

export type HubOrientationAffinityStrength = 1 | 2 | 3;

export interface HubOrientationSignalDefinition {
  id: string;
  dimension: HubOrientationDimension;
  label: string;
  description: string;
}

export interface HubOrientationAffinity {
  signalId: string;
  strength: HubOrientationAffinityStrength;
  reason: string;
}

export interface HubOrientationProfile {
  summary: string;
  boundary: string;
  affinities: readonly HubOrientationAffinity[];
}

export interface HubOrientationEvidence {
  signalId: string;
  label: string;
  weight: number;
  uncertainty?: boolean;
}

export interface HubOrientationReason {
  signalId: string;
  dimension: HubOrientationDimension;
  answerLabel: string;
  text: string;
  contribution: number;
}

export interface HubOrientationRanking {
  pathfinderId: string;
  score: number;
  reasons: readonly HubOrientationReason[];
}

export interface HubOrientationOption {
  id: string;
  label: string;
  description: string;
  evidence: readonly HubOrientationEvidence[];
  uncertainty?: boolean;
}

export interface HubOrientationQuestion {
  id: string;
  kicker: string;
  title: string;
  guidance: string;
  options: readonly HubOrientationOption[];
  visibleWhen?: {
    anyOf: readonly {
      questionId: string;
      optionIds: readonly string[];
    }[];
  };
}

export type HubOrientationAnswers = Readonly<Record<string, string>>;

export interface HubOrientationWorkshopChoice {
  questionId: string;
  question: string;
  answer: string;
  uncertain: boolean;
}

export interface HubOrientationWorkshopDirection {
  pathfinderId: string;
  name: string;
  summary: string;
  boundary: string;
  reasons: readonly string[];
}

export interface HubOrientationWorkshopMap {
  title: "Research Pathfinder workshop map";
  generatedOn: string;
  result: "suggested" | "open";
  primary?: HubOrientationWorkshopDirection;
  alternative?: HubOrientationWorkshopDirection;
  choices: readonly HubOrientationWorkshopChoice[];
  note: string;
}
