import type { Niche } from "@/lib/types";

export const biologyStarterPaperTypes = [
  "A recent review or perspective for the biological and computational landscape",
  "A tutorial or methods paper for the data and analysis workflow",
  "One recent application paper with clearly described data and validation",
] as const;

type BiologyNicheContent = Omit<
  Niche,
  "affinities" | "explorationFriendly" | "paperTypes" | "reasons"
> &
  Partial<
    Pick<Niche, "affinities" | "explorationFriendly" | "paperTypes" | "reasons">
  >;

export function defineBiologyNiche(content: BiologyNicheContent): Niche {
  return {
    affinities: {},
    explorationFriendly: false,
    paperTypes: [...biologyStarterPaperTypes],
    reasons: [],
    ...content,
  };
}
