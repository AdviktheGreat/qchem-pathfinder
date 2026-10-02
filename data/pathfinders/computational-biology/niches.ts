import type { Niche } from "@/lib/types";
import { comparativeGenomicsDirections } from "@/data/pathfinders/computational-biology/niches-comparative-genomics";
import { molecularEvolutionDirections } from "@/data/pathfinders/computational-biology/niches-molecular-evolution";
import { populationGenomicsDirections } from "@/data/pathfinders/computational-biology/niches-population-genomics";

export const computationalBiologyNiches: Niche[] = [
  ...comparativeGenomicsDirections,
  ...populationGenomicsDirections,
  ...molecularEvolutionDirections,
];
