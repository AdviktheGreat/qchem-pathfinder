import type { Niche } from "@/lib/types";
import { comparativeGenomicsDirections } from "@/data/pathfinders/computational-biology/niches-comparative-genomics";

export const computationalBiologyNiches: Niche[] = [
  ...comparativeGenomicsDirections,
];
