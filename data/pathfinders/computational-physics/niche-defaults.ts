import type { Niche } from "@/lib/types";

export const physicsStarterPaperTypes = [
  "A recent review or perspective for the physical landscape and open questions",
  "A tutorial or methods paper for the model and numerical workflow",
  "One recent application paper with clearly described assumptions and validation",
] as const;

type PhysicsNicheContent = Omit<
  Niche,
  "affinities" | "explorationFriendly" | "paperTypes" | "reasons"
> &
  Partial<
    Pick<Niche, "affinities" | "explorationFriendly" | "paperTypes" | "reasons">
  >;

export function definePhysicsNiche(content: PhysicsNicheContent): Niche {
  return {
    affinities: {},
    explorationFriendly: false,
    paperTypes: [...physicsStarterPaperTypes],
    reasons: [],
    ...content,
  };
}
