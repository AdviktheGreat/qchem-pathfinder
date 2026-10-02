export const biologyScoringWeights = {
  signal: {
    contextual: 1,
    supporting: 2,
    strong: 3,
  },
  directBoost: {
    nearby: 2,
    supporting: 3,
    strong: 5,
    primary: 6,
  },
  engine: {
    directBoostMultiplier: 6,
    openInterestMultiplier: 0.75,
    uncertaintyBonus: 0.35,
  },
} as const;

export const biologyRecommendationScoring = biologyScoringWeights.engine;

// Keeping the vocabulary grouped here makes new survey signals easy to audit
// before they influence recommendations.
export const biologySignalGroups = {
  interest: [
    "interest:health",
    "interest:therapeutics",
    "interest:proteins",
    "interest:genomics",
    "interest:evolution",
    "interest:cells",
    "interest:systems",
    "interest:ecology",
    "interest:microbes",
    "interest:methods",
  ],
  context: ["context:biomedical"],
  researchQuestion: [
    "mode:explain",
    "mode:predict",
    "mode:compare",
    "mode:discover",
    "mode:dynamics",
    "mode:methods",
    "mode:integrate",
  ],
  biologicalScale: [
    "scale:molecular",
    "scale:genomic",
    "scale:cellular",
    "scale:organism",
    "scale:population",
    "scale:ecosystem",
  ],
  evidence: [
    "evidence:sequence",
    "evidence:structure",
    "evidence:measurements",
    "evidence:networks",
    "evidence:temporal",
    "evidence:integrated",
    "evidence:variation",
    "evidence:spatial",
  ],
  workflow: [
    "style:visual",
    "style:interpretation",
    "style:statistics",
    "style:coding",
    "style:simulation",
    "style:modeling",
    "style:benchmarking",
    "style:comparative",
    "style:data",
  ],
  topic: [
    "topic:variant-effects",
    "topic:cancer-genomics",
    "topic:gene-expression",
    "topic:single-cell",
    "topic:networks",
    "topic:virtual-screening",
    "topic:protein-structure",
    "topic:biomolecular-dynamics",
    "topic:biological-ml",
    "topic:comparative-genomics",
    "topic:population-genomics",
    "topic:genome-annotation",
    "topic:regulatory-genomics",
    "topic:phylogenetics",
    "topic:molecular-evolution",
    "topic:pathogen-genomics",
    "topic:time-course-expression",
    "topic:spatial-omics",
    "topic:protein-sequence",
    "topic:metabolic-modeling",
    "topic:microbiome",
    "topic:computational-ecology",
    "topic:method-benchmarking",
  ],
} as const;

// These deliberately span genomes, cells, and methods so an uncertain student
// starts with meaningfully different possibilities rather than near-duplicates.
export const biologyOpenExplorationIds = [
  "comparative-genomics-conservation",
  "single-cell-transcriptomics",
  "bioinformatics-method-benchmarking",
] as const;

export const biologyScoringPrinciples = [
  "Calibration answers change preparation guidance, never the worth of a direction.",
  "A targeted narrowing answer is stronger evidence than a broad theme or incidental workflow preference.",
  "Uncertainty answers add no scoring evidence, keeping several directions open.",
  "Conflicting preferences remain independent evidence and produce a stable, balanced ranking.",
] as const;
