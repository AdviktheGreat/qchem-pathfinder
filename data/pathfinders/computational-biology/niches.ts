import type { Niche } from "@/lib/types";
import { comparativeGenomicsDirections } from "@/data/pathfinders/computational-biology/niches-comparative-genomics";
import { geneExpressionDirections } from "@/data/pathfinders/computational-biology/niches-gene-expression";
import { molecularEvolutionDirections } from "@/data/pathfinders/computational-biology/niches-molecular-evolution";
import { pathogenGenomicsDirections } from "@/data/pathfinders/computational-biology/niches-pathogen-genomics";
import { populationGenomicsDirections } from "@/data/pathfinders/computational-biology/niches-population-genomics";
import { singleCellSpatialDirections } from "@/data/pathfinders/computational-biology/niches-single-cell-spatial";

export const computationalBiologyNiches: Niche[] = [
  ...comparativeGenomicsDirections,
  ...populationGenomicsDirections,
  ...molecularEvolutionDirections,
  ...pathogenGenomicsDirections,
  ...geneExpressionDirections,
  ...singleCellSpatialDirections,
];
