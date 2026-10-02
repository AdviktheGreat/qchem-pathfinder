import { defineBiologyNiche } from "@/data/pathfinders/computational-biology/niche-defaults";

export const pathogenGenomicsDirections = [
  defineBiologyNiche({
    id: "pathogen-genomics-surveillance",
    area: "Pathogen genomics",
    name: "Pathogen genomics & outbreak evolution",
    shortDescription:
      "Compare pathogen genomes to study transmission patterns, emerging variation, and evolutionary change.",
    explanation:
      "Pathogen genomics combines sequence data with collection time, location, and other carefully governed context to investigate how viruses, bacteria, or parasites are related and changing. Genomes can support hypotheses about an outbreak, but they do not reveal every transmission event by themselves. Sampling gaps, privacy, epidemiological evidence, and uncertainty must remain visible in any interpretation.",
    questions: [
      "Which sampled pathogen genomes belong to closely related lineages?",
      "When and where did important mutations or variants appear in the sampled data?",
      "How do missing samples and alternative transmission histories change the conclusion?",
    ],
    systems: [
      "Viral outbreak sequence datasets",
      "Antimicrobial-resistant bacterial lineages",
      "Foodborne pathogen surveillance",
      "Parasite populations sampled across regions",
    ],
    approaches: [
      {
        name: "Genomic variant and lineage analysis",
        explanation:
          "Sequence differences are identified and summarized to compare sampled pathogen lineages and track notable changes.",
      },
      {
        name: "Time-aware phylogenetics",
        explanation:
          "Evolutionary trees use sampling dates and sequence change to estimate relationships and possible timing, with uncertainty.",
      },
      {
        name: "Genomic epidemiology integration",
        explanation:
          "Genomic evidence is interpreted alongside de-identified temporal, geographic, and epidemiological information rather than in isolation.",
      },
    ],
    concepts: [
      "Pathogen genomes and genetic variants",
      "Phylogenetic trees and molecular clocks",
      "Transmission hypotheses and sampling bias",
      "Data privacy and responsible public-health interpretation",
    ],
    preparation:
      "Begin with a public, de-identified teaching dataset and ask one lineage or mutation question. Learn why genomic similarity does not prove direct transmission and document missing samples and metadata limits.",
    keywords: [
      "pathogen genomics",
      "genomic epidemiology",
      "outbreak phylogenetics",
      "pathogen surveillance",
      "lineage analysis",
      "molecular clock",
      "sampling bias",
    ],
    synonyms: [
      "genomic outbreak analysis",
      "molecular epidemiology",
      "pathogen genomic surveillance",
    ],
    searches: {
      orientation: "pathogen genomics genomic epidemiology overview",
      focused:
        "outbreak phylogenetics lineage analysis molecular clock sampling bias",
      review: "recent review pathogen genomic surveillance methods ethics",
    },
    comparisonLens:
      "Compared with general phylogenetics, this direction connects rapidly changing pathogen lineages to time-sensitive outbreak and surveillance evidence with stricter privacy and sampling concerns.",
  }),
];
