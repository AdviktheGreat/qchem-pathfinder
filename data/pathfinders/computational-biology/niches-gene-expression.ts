import { defineBiologyNiche } from "@/data/pathfinders/computational-biology/niche-defaults";

export const geneExpressionDirections = [
  defineBiologyNiche({
    id: "differential-gene-expression",
    area: "Gene expression",
    name: "Differential gene expression & pathway interpretation",
    shortDescription:
      "Compare gene activity across conditions and connect coordinated changes to biological processes.",
    explanation:
      "Gene-expression studies measure which genes are more or less active across samples, tissues, treatments, or conditions. The analysis must separate biological differences from technical variation, summarize uncertainty across thousands of genes, and interpret coordinated patterns without turning a statistical association into a causal claim. Pathway analysis helps organize results but inherits biases from annotations and gene lists.",
    questions: [
      "Which genes show reproducible expression differences between conditions?",
      "Which pathways or biological processes are enriched among the changing genes?",
      "How much of the pattern could reflect batch effects, sample composition, or other confounders?",
    ],
    systems: [
      "Tissues under control and treatment conditions",
      "Developmental stages",
      "Stress responses in plants or microbes",
      "Public disease-expression datasets",
    ],
    approaches: [
      {
        name: "RNA-seq quality control and normalization",
        explanation:
          "Read counts and sample-level patterns are checked and adjusted so technical differences do not dominate comparisons.",
      },
      {
        name: "Differential-expression modeling",
        explanation:
          "Statistical models estimate expression changes, uncertainty, and evidence while accounting for multiple comparisons.",
      },
      {
        name: "Pathway and gene-set analysis",
        explanation:
          "Curated gene groups help identify biological themes that recur across many individually changing genes.",
      },
    ],
    concepts: [
      "Transcription and gene expression",
      "RNA sequencing counts and normalization",
      "Experimental design and confounding",
      "Multiple testing and pathway enrichment",
    ],
    preparation:
      "Begin with a small public dataset with clear sample labels. Visualize sample similarity, inspect quality, and interpret a short gene list before adding pathway analysis or more complex designs.",
    keywords: [
      "differential gene expression",
      "RNA-seq",
      "transcriptomics",
      "normalization",
      "pathway enrichment",
      "batch effect",
      "gene set analysis",
    ],
    synonyms: [
      "differential expression analysis",
      "bulk transcriptome analysis",
      "RNA sequencing comparison",
    ],
    searches: {
      orientation: "differential gene expression RNA-seq overview",
      focused:
        "RNA-seq normalization differential expression pathway enrichment batch effects",
      review: "recent review differential expression analysis RNA-seq methods",
    },
    comparisonLens:
      "Compared with single-cell analysis, this direction usually measures an average expression profile across a mixed sample and emphasizes condition-level comparisons.",
    explorationFriendly: true,
  }),
  defineBiologyNiche({
    id: "time-course-transcriptomics",
    area: "Gene expression",
    name: "Time-course transcriptomics & response dynamics",
    shortDescription:
      "Track changing gene activity to study the order and timing of biological responses.",
    explanation:
      "Time-course transcriptomics follows gene activity across several time points rather than comparing only a beginning and an end. Researchers look for early and late responses, coordinated trajectories, delays, and temporary changes. Because neighboring measurements are related and sampling may be sparse, the analysis must distinguish a plausible dynamic pattern from noise or an arbitrary smooth curve.",
    questions: [
      "Which genes respond early, late, transiently, or persistently?",
      "Which groups of genes follow similar trajectories across time?",
      "How sensitive are inferred response stages to sampling intervals and missing time points?",
    ],
    systems: [
      "Immune or stress responses",
      "Cell differentiation and development",
      "Drug or environmental perturbations",
      "Daily and seasonal biological rhythms",
    ],
    approaches: [
      {
        name: "Time-aware expression modeling",
        explanation:
          "Statistical models represent dependence across time and test whether expression trajectories differ between conditions.",
      },
      {
        name: "Trajectory clustering",
        explanation:
          "Genes with similar temporal patterns are grouped to reveal coordinated response programs.",
      },
      {
        name: "Dynamic pathway interpretation",
        explanation:
          "Pathway activity is summarized across time to compare the order and duration of biological processes.",
      },
    ],
    concepts: [
      "Gene-expression regulation",
      "Repeated measurements and temporal dependence",
      "Clustering and trajectory patterns",
      "Sampling frequency and biological timing",
    ],
    preparation:
      "Start with one well-sampled response and plot a handful of genes before clustering thousands. Ask which temporal features are directly observed and which depend on interpolation or model assumptions.",
    keywords: [
      "time-course transcriptomics",
      "temporal gene expression",
      "RNA-seq time series",
      "trajectory clustering",
      "dynamic response",
      "longitudinal expression",
      "gene expression kinetics",
    ],
    synonyms: [
      "gene expression time series",
      "dynamic transcriptomics",
      "longitudinal RNA-seq analysis",
    ],
    searches: {
      orientation: "time course transcriptomics analysis overview",
      focused:
        "RNA-seq time series trajectory clustering temporal differential expression",
      review: "recent review time-course transcriptomics methods",
    },
    comparisonLens:
      "Compared with standard differential expression, this direction makes timing and response shape central instead of treating each condition as one static profile.",
  }),
];
