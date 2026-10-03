type OptionBoosts = Record<string, Record<string, number>>;

// The first key is a narrowing question, the second is one of its answers, and
// the final map names the directions that answer directly supports.
export const biologyNarrowingBoosts: Record<string, OptionBoosts> = {
  "biology-health-focus": {
    "variant-effects": { "variant-effect-prediction": 6 },
    "tumor-evolution": { "cancer-genomics": 6 },
    "gene-activity": { "differential-gene-expression": 6 },
    "cell-states": { "single-cell-transcriptomics": 6 },
  },
  "biology-health-evidence": {
    variants: { "variant-effect-prediction": 6 },
    expression: { "differential-gene-expression": 6 },
    "single-cell": { "single-cell-transcriptomics": 6 },
    networks: { "biological-network-modeling": 6 },
  },
  "biology-therapeutic-focus": {
    "screen-molecules": { "virtual-screening-docking": 6 },
    "target-structure": { "protein-structure-prediction": 6 },
    "binding-dynamics": { "biomolecular-simulation-dynamics": 6 },
    "response-data": { "machine-learning-biological-prediction": 6 },
  },
  "biology-therapeutic-evidence": {
    "known-binders": { "virtual-screening-docking": 6 },
    "experimental-structure": { "protein-structure-prediction": 6 },
    "repeated-simulation": { "biomolecular-simulation-dynamics": 6 },
    "independent-test-data": { "machine-learning-biological-prediction": 6 },
  },
  "biology-genome-focus": {
    "across-species": { "comparative-genomics-conservation": 6 },
    "within-populations": { "population-genomics-history": 6 },
    "annotate-genome": { "genome-annotation-function": 6 },
    "regulatory-regions": { "regulatory-genomics": 6 },
  },
  "biology-genome-evidence": {
    "conserved-changed-regions": { "comparative-genomics-conservation": 6 },
    "variant-frequencies": { "population-genomics-history": 6 },
    "unknown-genes": { "genome-annotation-function": 6 },
    "regulation-expression": { "regulatory-genomics": 6 },
  },
  "biology-evolution-focus": {
    relationships: { "phylogenetic-inference": 6 },
    "sequence-selection": { "molecular-evolution-selection": 6 },
    "population-history": {
      "population-genomics-history": 6,
      "adaptation-conservation-genomics": 5,
    },
    "pathogen-change": { "pathogen-genomics-surveillance": 6 },
  },
  "biology-evolution-evidence": {
    "tree-support": { "phylogenetic-inference": 6 },
    "rates-sites": { "molecular-evolution-selection": 6 },
    "variation-geography": {
      "adaptation-conservation-genomics": 6,
      "population-genomics-history": 3,
    },
    "dated-sequences": { "pathogen-genomics-surveillance": 6 },
  },
  "biology-cell-expression-focus": {
    "condition-comparison": { "differential-gene-expression": 6 },
    "time-course": { "time-course-transcriptomics": 6 },
    "single-cell": { "single-cell-transcriptomics": 6 },
    spatial: { "spatial-omics": 6 },
    regulation: { "regulatory-genomics": 6 },
  },
  "biology-cell-systems-focus": {
    "interaction-networks": { "biological-network-modeling": 6 },
    "metabolic-flows": { "metabolic-network-modeling": 6 },
    "regulatory-control": { "regulatory-genomics": 6 },
    "dynamic-response": { "time-course-transcriptomics": 6 },
  },
  "biology-protein-focus": {
    "sequence-function": { "protein-sequence-function": 6 },
    "predict-structure": { "protein-structure-prediction": 6 },
    "simulate-motion": { "biomolecular-simulation-dynamics": 6 },
    "binding-interactions": { "virtual-screening-docking": 6 },
  },
  "biology-protein-evidence": {
    "family-alignment": { "protein-sequence-function": 6 },
    "structure-confidence": { "protein-structure-prediction": 6 },
    trajectory: { "biomolecular-simulation-dynamics": 6 },
    "screening-controls": { "virtual-screening-docking": 6 },
  },
  "biology-ecology-focus": {
    "microbial-composition": { "microbiome-metagenomics": 6 },
    "metagenome-function": { "microbiome-metagenomics": 6 },
    "species-distribution": { "computational-ecology-biodiversity": 6 },
    "biodiversity-change": { "computational-ecology-biodiversity": 6 },
  },
  "biology-ecology-evidence": {
    "community-sequences": { "microbiome-metagenomics": 6 },
    "species-maps": { "computational-ecology-biodiversity": 6 },
    "community-table": { "microbiome-metagenomics": 6 },
    "ecological-time-series": { "computational-ecology-biodiversity": 6 },
  },
  "biology-data-method-focus": {
    "build-predictor": { "machine-learning-biological-prediction": 6 },
    "benchmark-tools": { "bioinformatics-method-benchmarking": 6 },
    "integrate-evidence": {
      "biological-network-modeling": 5,
      "regulatory-genomics": 3,
    },
    "make-pattern-visible": {
      "spatial-omics": 5,
      "single-cell-transcriptomics": 3,
    },
  },
  "biology-data-method-evidence": {
    generalization: { "machine-learning-biological-prediction": 6 },
    "fair-comparison": { "bioinformatics-method-benchmarking": 6 },
    "independent-evidence": {
      "bioinformatics-method-benchmarking": 3,
      "regulatory-genomics": 2,
    },
    "transparent-failures": { "bioinformatics-method-benchmarking": 6 },
  },
};
