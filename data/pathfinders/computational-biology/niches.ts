import type { Niche } from "@/lib/types";
import { biomolecularModelingDirections } from "@/data/pathfinders/computational-biology/niches-biomolecular-modeling";
import { biomedicalGenomicsDirections } from "@/data/pathfinders/computational-biology/niches-biomedical-genomics";
import { comparativeGenomicsDirections } from "@/data/pathfinders/computational-biology/niches-comparative-genomics";
import { geneExpressionDirections } from "@/data/pathfinders/computational-biology/niches-gene-expression";
import { geneRegulationDirections } from "@/data/pathfinders/computational-biology/niches-gene-regulation";
import { molecularEvolutionDirections } from "@/data/pathfinders/computational-biology/niches-molecular-evolution";
import { pathogenGenomicsDirections } from "@/data/pathfinders/computational-biology/niches-pathogen-genomics";
import { populationGenomicsDirections } from "@/data/pathfinders/computational-biology/niches-population-genomics";
import { proteinSequenceStructureDirections } from "@/data/pathfinders/computational-biology/niches-protein-sequence-structure";
import { singleCellSpatialDirections } from "@/data/pathfinders/computational-biology/niches-single-cell-spatial";
import { therapeuticDiscoveryDirections } from "@/data/pathfinders/computational-biology/niches-therapeutic-discovery";

export const computationalBiologyNiches: Niche[] = [
  ...comparativeGenomicsDirections,
  ...populationGenomicsDirections,
  ...molecularEvolutionDirections,
  ...pathogenGenomicsDirections,
  ...geneExpressionDirections,
  ...singleCellSpatialDirections,
  ...geneRegulationDirections,
  ...proteinSequenceStructureDirections,
  ...biomolecularModelingDirections,
  ...therapeuticDiscoveryDirections,
  ...biomedicalGenomicsDirections,
];
