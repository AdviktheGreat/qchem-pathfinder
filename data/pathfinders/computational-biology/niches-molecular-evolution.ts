import { defineBiologyNiche } from "@/data/pathfinders/computational-biology/niche-defaults";

export const molecularEvolutionDirections = [
  defineBiologyNiche({
    id: "phylogenetic-inference",
    area: "Molecular evolution",
    name: "Phylogenetic inference & evolutionary relationships",
    shortDescription:
      "Use sequence data and evolutionary models to reconstruct relationships among genes, species, or samples.",
    explanation:
      "Phylogenetics uses observed sequence differences to compare possible histories of descent. A tree is an evidence-based model, not a direct photograph of evolution: results depend on the sequences chosen, the alignment, the model of change, and whether different genes support different histories. Researchers therefore examine uncertainty and competing explanations rather than reading every branch as equally certain.",
    questions: [
      "Which evolutionary tree is best supported by the selected sequences and model?",
      "How uncertain are particular branches or relationships?",
      "Do different genes, genomic regions, or methods support conflicting histories?",
    ],
    systems: [
      "Species and population relationships",
      "Viral and bacterial lineages",
      "Gene-family histories",
      "Ancient and modern DNA sequences",
    ],
    approaches: [
      {
        name: "Multiple sequence alignment",
        explanation:
          "Related positions are arranged into columns so their patterns of similarity and change can be modeled.",
      },
      {
        name: "Tree inference",
        explanation:
          "Likelihood, Bayesian, or distance methods compare possible tree structures under an explicit model of sequence evolution.",
      },
      {
        name: "Support and sensitivity analysis",
        explanation:
          "Resampling, posterior probabilities, and alternative datasets reveal which relationships are stable and which remain uncertain.",
      },
    ],
    concepts: [
      "Common ancestry and evolutionary trees",
      "Sequence alignment and homologous positions",
      "Models of sequence change",
      "Uncertainty and conflicting gene histories",
    ],
    preparation:
      "Begin with a short alignment and a small set of known related sequences. Compare two trees, learn what branch support means, and inspect how alignment or model choices change the result.",
    keywords: [
      "phylogenetic inference",
      "molecular phylogeny",
      "sequence alignment",
      "evolutionary tree",
      "branch support",
      "substitution model",
      "gene tree",
    ],
    synonyms: [
      "molecular systematics",
      "evolutionary tree reconstruction",
      "phylogenetic analysis",
    ],
    searches: {
      orientation: "phylogenetic inference molecular evolution overview",
      focused:
        "multiple sequence alignment substitution model tree inference branch support",
      review: "recent review phylogenetic inference methods uncertainty",
    },
    comparisonLens:
      "Compared with comparative genomics, this direction centers reconstructing branching relationships and their uncertainty rather than cataloging genome-wide similarities and changes.",
    explorationFriendly: true,
  }),
  defineBiologyNiche({
    id: "molecular-evolution-selection",
    area: "Molecular evolution",
    name: "Molecular evolution & selection",
    shortDescription:
      "Model how DNA and protein sequences change to investigate constraint, adaptation, and functional shifts.",
    explanation:
      "Molecular-evolution research asks why some sequence positions remain nearly unchanged while others vary or change rapidly. Models compare different kinds of substitutions across genes, sites, or branches to identify patterns consistent with functional constraint or selection. These signals require careful interpretation because mutation, population history, recombination, and model mismatch can produce similar-looking patterns.",
    questions: [
      "Which parts of a gene or protein are under unusually strong evolutionary constraint?",
      "Did the pattern of sequence change shift along a particular lineage or after duplication?",
      "Is an apparent selection signal robust to recombination and alternative evolutionary models?",
    ],
    systems: [
      "Protein-coding gene families",
      "Host–pathogen interaction genes",
      "Duplicated genes with diverging functions",
      "Conserved noncoding genomic elements",
    ],
    approaches: [
      {
        name: "Substitution-rate modeling",
        explanation:
          "Models compare rates and types of sequence change to estimate constraint or shifts in evolutionary pressure.",
      },
      {
        name: "Site and branch tests",
        explanation:
          "Statistical tests ask whether particular sequence positions or evolutionary lineages show distinct patterns of change.",
      },
      {
        name: "Ancestral sequence reconstruction",
        explanation:
          "Probabilistic methods estimate likely past sequences so functional changes can be placed along an evolutionary history.",
      },
    ],
    concepts: [
      "Mutation, substitution, and natural selection",
      "Protein-coding sequence and codons",
      "Functional constraint",
      "Likelihood models and alternative hypotheses",
    ],
    preparation:
      "Start with one aligned gene family and learn the difference between mutation, substitution, and selection. Treat statistical selection signals as hypotheses to compare with structural or experimental evidence.",
    keywords: [
      "molecular evolution",
      "natural selection",
      "evolutionary constraint",
      "substitution rate",
      "positive selection",
      "ancestral sequence reconstruction",
      "codon model",
    ],
    synonyms: [
      "sequence evolution",
      "comparative molecular evolution",
      "evolutionary rate analysis",
    ],
    searches: {
      orientation: "molecular evolution selection sequence analysis overview",
      focused:
        "codon model branch site test evolutionary constraint gene family",
      review: "recent review molecular evolution selection detection methods",
    },
    comparisonLens:
      "Compared with phylogenetic inference, this direction uses an evolutionary history to study rates, constraints, and possible functional shifts within sequences.",
  }),
];
