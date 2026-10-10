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
