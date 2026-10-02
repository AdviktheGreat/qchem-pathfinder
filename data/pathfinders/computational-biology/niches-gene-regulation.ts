import { defineBiologyNiche } from "@/data/pathfinders/computational-biology/niche-defaults";

export const geneRegulationDirections = [
  defineBiologyNiche({
    id: "regulatory-genomics",
    area: "Gene regulation",
    name: "Regulatory genomics & gene-control networks",
    shortDescription:
      "Study how regulatory DNA, proteins, and chromatin help control when and where genes are active.",
    explanation:
      "Regulatory genomics connects gene activity to promoters, enhancers, transcription factors, chromatin state, and three-dimensional genome organization. Researchers integrate several noisy evidence sources to propose control relationships and test whether they recur across cell types or conditions. A predicted binding site or correlation is evidence for a hypothesis, not proof that one regulator directly controls a gene.",
    questions: [
      "Which regulatory regions are active in a particular cell type or condition?",
      "Which transcription factors may help explain a coordinated expression program?",
      "How do regulatory relationships change across development, perturbation, or disease models?",
    ],
    systems: [
      "Developmental gene-control programs",
      "Cell-type-specific regulatory elements",
      "Stress and immune responses",
      "Regulatory variation associated with traits",
    ],
    approaches: [
      {
        name: "Regulatory-element and motif analysis",
        explanation:
          "Sequence patterns and chromatin measurements identify candidate regions and proteins involved in gene control.",
      },
      {
        name: "Chromatin and accessibility integration",
        explanation:
          "Several genomic assays are compared to locate accessible, modified, or interacting regions near regulated genes.",
      },
      {
        name: "Gene regulatory network inference",
        explanation:
          "Models combine expression and regulator evidence to propose directed relationships that can be tested independently.",
      },
    ],
    concepts: [
      "Transcription and gene regulation",
      "Promoters, enhancers, and transcription factors",
      "Chromatin accessibility and epigenomic evidence",
      "Correlation, prediction, and causal validation",
    ],
    preparation:
      "Begin with one well-studied transcription factor and a small set of candidate target genes. Compare sequence, accessibility, and expression evidence before attempting a large regulatory network.",
    keywords: [
      "regulatory genomics",
      "gene regulatory network",
      "transcription factor",
      "enhancer",
      "chromatin accessibility",
      "motif analysis",
      "epigenomics",
    ],
    synonyms: [
      "gene regulation analysis",
      "computational regulatory biology",
      "transcriptional network inference",
    ],
    searches: {
      orientation: "regulatory genomics gene regulation overview",
      focused:
        "chromatin accessibility transcription factor motif gene regulatory network inference",
      review: "recent review computational regulatory genomics methods",
    },
    comparisonLens:
      "Compared with differential-expression analysis, this direction focuses on the regulatory elements and relationships that could generate an expression pattern.",
  }),
];
