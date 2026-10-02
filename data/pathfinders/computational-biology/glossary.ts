import type { GlossaryItem } from "@/lib/pathfinder-definition";

export const biologyGlossary = [
  {
    term: "Bioinformatics",
    text: "Computational methods for organizing, comparing, and interpreting biological data such as sequences, structures, and measurements.",
  },
  {
    term: "Genome",
    text: "The complete genetic material of an organism or cell, including genes and other sequence regions.",
  },
  {
    term: "Transcriptomics",
    text: "The study of RNA molecules to understand which genes are active, where, and under what conditions.",
  },
  {
    term: "Genomic variant",
    text: "A difference in DNA sequence among individuals, cells, populations, or reference genomes.",
  },
  {
    term: "Sequence alignment",
    text: "Arranging related DNA, RNA, or protein sequences so similarities and differences can be compared.",
  },
  {
    term: "Phylogenetic tree",
    text: "A branching model of hypothesized evolutionary relationships supported by observed data and assumptions.",
  },
  {
    term: "Single-cell data",
    text: "Measurements collected separately from individual cells rather than averaged across a mixed sample.",
  },
  {
    term: "Biological network",
    text: "A model whose nodes represent biological entities and whose edges represent measured or proposed relationships.",
  },
  {
    term: "Molecular dynamics",
    text: "A simulation approach that follows atomic motion over time using a physical model and numerical integration.",
  },
  {
    term: "Docking",
    text: "A computational method for proposing how two molecules might fit together and ranking possible interaction poses.",
  },
  {
    term: "Model validation",
    text: "Testing a computational method against appropriate independent evidence, controls, or held-out data.",
  },
  {
    term: "Dataset shift",
    text: "A difference between the data used to build a model and the data where it is later applied.",
  },
] satisfies readonly GlossaryItem[];
