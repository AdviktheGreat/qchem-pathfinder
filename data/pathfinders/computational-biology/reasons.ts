import type { ReasonRule } from "@/lib/types";

// Each explanation is gated by a scored signal, so results describe evidence
// from the student's answers rather than making generic personality claims.
export const biologyNicheReasons: Record<string, ReasonRule[]> = {
  "comparative-genomics-conservation": [
    {
      signal: "interest:genomics",
      category: "interest",
      text: "You were drawn to genome-scale questions and what sequences can reveal.",
    },
    {
      signal: "style:comparative",
      category: "style",
      text: "You prefer learning through careful comparisons between biological examples.",
    },
  ],
  "genome-annotation-function": [
    {
      signal: "topic:genome-annotation",
      category: "interest",
      text: "You wanted to turn an unfamiliar genome into testable ideas about biological function.",
    },
    {
      signal: "evidence:integrated",
      category: "style",
      text: "You value conclusions that combine several independent kinds of evidence.",
    },
  ],
  "population-genomics-history": [
    {
      signal: "interest:evolution",
      category: "interest",
      text: "You are interested in how biological variation records evolutionary history.",
    },
    {
      signal: "scale:population",
      category: "style",
      text: "You chose questions that compare patterns across populations rather than single molecules or cells.",
    },
  ],
  "adaptation-conservation-genomics": [
    {
      signal: "interest:ecology",
      category: "interest",
      text: "You want to connect genetic variation with organisms and their environments.",
    },
    {
      signal: "evidence:variation",
      category: "style",
      text: "You are comfortable treating variation as evidence to interpret rather than noise to remove.",
    },
  ],
  "phylogenetic-inference": [
    {
      signal: "topic:phylogenetics",
      category: "interest",
      text: "You chose reconstructing biological relationships as the question you would pursue first.",
    },
    {
      signal: "style:visual",
      category: "style",
      text: "Tree-shaped visual models match the way you like to inspect complex relationships.",
    },
  ],
  "molecular-evolution-selection": [
    {
      signal: "topic:molecular-evolution",
      category: "interest",
      text: "You were curious about where selection and other evolutionary processes leave sequence patterns.",
    },
    {
      signal: "style:statistics",
      category: "style",
      text: "You are open to using statistical models to compare competing explanations for sequence change.",
    },
  ],
  "pathogen-genomics-surveillance": [
    {
      signal: "topic:pathogen-genomics",
      category: "interest",
      text: "You selected changing pathogen populations as a biological process worth tracking.",
    },
    {
      signal: "evidence:temporal",
      category: "style",
      text: "You like evidence that reveals how a system changes over time.",
    },
  ],
  "differential-gene-expression": [
    {
      signal: "topic:gene-expression",
      category: "interest",
      text: "You want to understand how gene activity differs across biological conditions.",
    },
    {
      signal: "evidence:measurements",
      category: "style",
      text: "You prefer working from measured patterns across samples and checking how reliable they are.",
    },
  ],
  "time-course-transcriptomics": [
    {
      signal: "topic:time-course-expression",
      category: "interest",
      text: "You chose changing gene activity, not just a single snapshot, as the pattern to explain.",
    },
    {
      signal: "evidence:temporal",
      category: "style",
      text: "Time-ordered evidence fits your interest in sequences of biological change.",
    },
  ],
  "single-cell-transcriptomics": [
    {
      signal: "topic:single-cell",
      category: "interest",
      text: "You want to uncover cell types and states that disappear when samples are averaged together.",
    },
    {
      signal: "style:data",
      category: "style",
      text: "You are drawn to finding interpretable structure in large biological datasets.",
    },
  ],
  "spatial-omics": [
    {
      signal: "topic:spatial-omics",
      category: "interest",
      text: "You care about where molecular activity occurs inside a tissue or biological system.",
    },
    {
      signal: "style:visual",
      category: "style",
      text: "Maps and visual patterns are a natural entry point for how you investigate evidence.",
    },
  ],
  "regulatory-genomics": [
    {
      signal: "topic:regulatory-genomics",
      category: "interest",
      text: "You are interested in the genomic controls that help determine when genes are active.",
    },
    {
      signal: "evidence:integrated",
      category: "style",
      text: "You prefer building an explanation from several complementary measurements.",
    },
  ],
  "protein-sequence-function": [
    {
      signal: "topic:protein-sequence",
      category: "interest",
      text: "You chose the link between protein sequence and function as the relationship to investigate.",
    },
    {
      signal: "style:comparative",
      category: "style",
      text: "Comparing protein families fits your preference for learning through related examples.",
    },
  ],
  "protein-structure-prediction": [
    {
      signal: "topic:protein-structure",
      category: "interest",
      text: "You want to use three-dimensional structure to reason about protein function.",
    },
    {
      signal: "style:visual",
      category: "style",
      text: "Interactive molecular shapes match your preference for visual scientific models.",
    },
  ],
  "biomolecular-simulation-dynamics": [
    {
      signal: "topic:biomolecular-dynamics",
      category: "interest",
      text: "You were drawn to how biomolecules move and change rather than treating one structure as fixed.",
    },
    {
      signal: "style:simulation",
      category: "style",
      text: "You enjoy using computational models to follow a system through time.",
    },
  ],
  "virtual-screening-docking": [
    {
      signal: "interest:therapeutics",
      category: "interest",
      text: "You want to explore computational questions connected to therapeutic discovery.",
    },
    {
      signal: "style:benchmarking",
      category: "style",
      text: "You value controls and fair comparisons before trusting a ranked prediction.",
    },
  ],
  "variant-effect-prediction": [
    {
      signal: "topic:variant-effects",
      category: "interest",
      text: "You want to connect changes in DNA with possible changes in molecular function.",
    },
    {
      signal: "evidence:sequence",
      category: "style",
      text: "Sequence evidence is one of the data forms you most want to interpret.",
    },
  ],
  "cancer-genomics": [
    {
      signal: "topic:cancer-genomics",
      category: "interest",
      text: "You chose genomic change and diversity among tumor cells as a question to explore.",
    },
    {
      signal: "scale:cellular",
      category: "style",
      text: "You are interested in differences among cells and cell populations.",
    },
  ],
  "biological-network-modeling": [
    {
      signal: "interest:systems",
      category: "interest",
      text: "You want to understand how many interacting biological parts work together as a system.",
    },
    {
      signal: "evidence:networks",
      category: "style",
      text: "Connections and network structure are a compelling way for you to organize evidence.",
    },
  ],
  "metabolic-network-modeling": [
    {
      signal: "topic:metabolic-modeling",
      category: "interest",
      text: "You selected flows through metabolic pathways as the system you would model first.",
    },
    {
      signal: "style:modeling",
      category: "style",
      text: "You like models that make assumptions explicit and produce testable system-level predictions.",
    },
  ],
  "microbiome-metagenomics": [
    {
      signal: "interest:microbes",
      category: "interest",
      text: "You are curious about microbial communities and what their combined genetic material reveals.",
    },
    {
      signal: "evidence:sequence",
      category: "style",
      text: "You want to extract biological patterns from sequence-based evidence.",
    },
  ],
  "computational-ecology-biodiversity": [
    {
      signal: "topic:computational-ecology",
      category: "interest",
      text: "You want to investigate how organisms and biodiversity vary across environments.",
    },
    {
      signal: "evidence:spatial",
      category: "style",
      text: "Geographic and spatial patterns are evidence you would enjoy interpreting.",
    },
  ],
  "machine-learning-biological-prediction": [
    {
      signal: "topic:biological-ml",
      category: "interest",
      text: "You are interested in building predictions from biological examples while testing whether they generalize.",
    },
    {
      signal: "style:coding",
      category: "style",
      text: "A coding-centered workflow fits how you would like to explore a research question.",
    },
  ],
  "bioinformatics-method-benchmarking": [
    {
      signal: "interest:methods",
      category: "interest",
      text: "You are curious about how computational choices change the scientific conclusion.",
    },
    {
      signal: "style:benchmarking",
      category: "style",
      text: "You prefer fair, reproducible comparisons that make strengths and failure cases visible.",
    },
  ],
};
