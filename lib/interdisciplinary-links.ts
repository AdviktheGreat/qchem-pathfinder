export interface InterdisciplinaryLink {
  id: string;
  sourceNicheId: string;
  targetPathfinderId: string;
  targetPathfinderName: string;
  targetNicheId: string;
  targetNicheName: string;
  bridge: string;
  distinction: string;
  sharedKeywords: readonly string[];
}
