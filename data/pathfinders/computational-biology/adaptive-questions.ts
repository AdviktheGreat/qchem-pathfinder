import { biologyUnsureOption } from "@/data/pathfinders/computational-biology/uncertainty-options";
import { biologyNarrowingBoosts } from "@/data/pathfinders/computational-biology/narrowing-boosts";
import type { SurveyQuestion } from "@/lib/types";

const computationalBiologyAdaptiveQuestionContent: SurveyQuestion[] = [
  {
    id: "biology-health-focus",
    stage: "narrowing",
    kicker: "Narrow the health question",
    title: "Which kind of biological difference would you investigate first?",
    prompt:
      "Choose a research lens, not a personal-health interpretation. All examples use public or appropriately governed research data.",
    type: "single",
    visibleWhen: {
      questionId: "biology-motivation",
      anyOf: ["health-disease"],
    },
    options: [
      {
        id: "variant-effects",
        label: "How genetic variants may change molecular function",
        description:
          "Connect DNA changes to proteins, splicing, regulation, and experimentally measured effects.",
        signals: {
          "topic:variant-effects": 3,
          "evidence:sequence": 2,
        },
      },
      {
        id: "tumor-evolution",
        label: "How tumor cell populations differ and evolve",
        description:
          "Study mutations, genomic alterations, and mixtures of cells in de-identified research datasets.",
        signals: {
          "topic:cancer-genomics": 3,
          "scale:cellular": 2,
        },
      },
      {
        id: "gene-activity",
        label: "How gene activity changes across conditions",
        description:
          "Compare expression programs, pathways, tissues, or responses while accounting for variation.",
        signals: {
          "topic:gene-expression": 3,
          "evidence:measurements": 2,
        },
      },
      {
        id: "cell-states",
        label: "Which cell types or states make samples different",
        description:
          "Resolve cellular heterogeneity rather than treating a tissue as one average profile.",
        signals: {
          "topic:single-cell": 3,
          "scale:cellular": 2,
        },
      },
      biologyUnsureOption,
    ],
  },
  {
    id: "biology-health-evidence",
    stage: "narrowing",
    kicker: "Choose the evidence",
    title: "Which evidence would you most like to interpret?",
    prompt:
      "The same health-related question can be approached with several data types. Pick the evidence you would want to understand first.",
    type: "single",
    visibleWhen: {
      questionId: "biology-motivation",
      anyOf: ["health-disease"],
    },
    options: [
      {
        id: "variants",
        label: "DNA variants and genomic annotations",
        description:
          "Compare changes in sequence with conservation, gene context, and functional measurements.",
        signals: {
          "evidence:sequence": 3,
          "topic:variant-effects": 2,
        },
      },
      {
        id: "expression",
        label: "Gene-expression measurements across samples",
        description:
          "Look for reproducible differences, coordinated pathways, and possible confounders.",
        signals: {
          "evidence:measurements": 3,
          "topic:gene-expression": 2,
        },
      },
      {
        id: "single-cell",
        label: "Cell-level measurements and cellular mixtures",
        description:
          "Identify cell populations, states, and changes in their proportions or programs.",
        signals: {
          "topic:single-cell": 3,
          "scale:cellular": 2,
        },
      },
      {
        id: "networks",
        label: "Pathways and interaction networks",
        description:
          "Connect many molecular changes into an interpretable system while tracking edge evidence.",
        signals: {
          "topic:networks": 3,
          "evidence:networks": 2,
        },
      },
      biologyUnsureOption,
    ],
  },
  {
    id: "biology-therapeutic-focus",
    stage: "narrowing",
    kicker: "Narrow the discovery question",
    title:
      "Which part of computational therapeutic discovery would you inspect first?",
    prompt:
      "These are research workflows for generating and testing hypotheses, not evidence that a candidate treatment is safe or effective.",
    type: "single",
    visibleWhen: {
      questionId: "biology-motivation",
      anyOf: ["therapeutics"],
    },
    options: [
      {
        id: "screen-molecules",
        label: "Screen molecules against a biological target",
        description:
          "Compare candidate poses and rankings while checking controls and scoring limitations.",
        signals: {
          "topic:virtual-screening": 3,
          "mode:predict": 2,
        },
      },
      {
        id: "target-structure",
        label: "Understand the target’s structure and binding site",
        description:
          "Assess structural confidence, functional regions, and plausible interaction surfaces.",
        signals: {
          "topic:protein-structure": 3,
          "evidence:structure": 2,
        },
      },
      {
        id: "binding-dynamics",
        label: "Explore molecular motion and binding stability",
        description:
          "Study how conformations, water, membranes, or mutations change an interaction over time.",
        signals: {
          "topic:biomolecular-dynamics": 3,
          "style:simulation": 2,
        },
      },
      {
        id: "response-data",
        label: "Learn patterns from compound-response data",
        description:
          "Build and evaluate predictions while checking dataset shift, uncertainty, and biological relevance.",
        signals: {
          "topic:biological-ml": 3,
          "style:data": 2,
        },
      },
      biologyUnsureOption,
    ],
  },
  {
    id: "biology-therapeutic-evidence",
    stage: "narrowing",
    kicker: "Choose the validation lens",
    title:
      "Which kind of evidence would make a computational result convincing?",
    prompt:
      "No single result is enough. Choose the evidence you would most like to compare with the computational model.",
    type: "single",
    visibleWhen: {
      questionId: "biology-motivation",
      anyOf: ["therapeutics"],
    },
    options: [
      {
        id: "known-binders",
        label: "Known binders, non-binders, and screening controls",
        description:
          "Test whether a virtual-screening workflow separates useful controls before ranking new candidates.",
        signals: {
          "topic:virtual-screening": 3,
          "style:benchmarking": 2,
        },
      },
      {
        id: "experimental-structure",
        label: "An experimental or independently supported structure",
        description:
          "Compare predicted geometry, binding regions, and confidence with structural evidence.",
        signals: {
          "topic:protein-structure": 3,
          "evidence:structure": 2,
        },
      },
      {
        id: "repeated-simulation",
        label: "Repeated simulations and stable molecular patterns",
        description:
          "Ask whether a dynamic conclusion remains consistent across replicas and model choices.",
        signals: {
          "topic:biomolecular-dynamics": 3,
          "style:simulation": 2,
        },
      },
      {
        id: "independent-test-data",
        label: "Independent activity data and calibrated prediction error",
        description:
          "Evaluate whether a model generalizes beyond compounds related to its training examples.",
        signals: {
          "topic:biological-ml": 3,
          "style:statistics": 2,
        },
      },
      biologyUnsureOption,
    ],
  },
  {
    id: "biology-genome-focus",
    stage: "narrowing",
    kicker: "Narrow the genome question",
    title: "Which genome-scale comparison would you make first?",
    prompt:
      "Choose the comparison that would make you most curious to inspect the sequences and their biological context.",
    type: "single",
    visibleWhen: {
      questionId: "biology-motivation",
      anyOf: ["genomes"],
    },
    options: [
      {
        id: "across-species",
        label: "Compare genomes across species",
        description:
          "Look for conserved regions, rearrangements, gene-family changes, and lineage-specific features.",
        signals: {
          "topic:comparative-genomics": 3,
          "mode:compare": 2,
        },
      },
      {
        id: "within-populations",
        label: "Compare variation among populations",
        description:
          "Study ancestry, migration, genetic diversity, and adaptation within a species.",
        signals: {
          "topic:population-genomics": 3,
          "scale:population": 2,
        },
      },
      {
        id: "annotate-genome",
        label: "Find genes and possible functions in a genome",
        description:
          "Combine sequence signals, known domains, expression, and database evidence.",
        signals: {
          "topic:genome-annotation": 3,
          "mode:discover": 2,
        },
      },
      {
        id: "regulatory-regions",
        label: "Find regions that may control gene activity",
        description:
          "Connect regulatory sequence, chromatin, and expression evidence without assuming correlation proves control.",
        signals: {
          "topic:regulatory-genomics": 3,
          "evidence:sequence": 2,
        },
      },
      biologyUnsureOption,
    ],
  },
  {
    id: "biology-genome-evidence",
    stage: "narrowing",
    kicker: "Choose the genomic evidence",
    title: "Which pattern in genomic data would you most like to explain?",
    prompt:
      "Pick a pattern you would want to turn into a careful biological interpretation.",
    type: "single",
    visibleWhen: {
      questionId: "biology-motivation",
      anyOf: ["genomes"],
    },
    options: [
      {
        id: "conserved-changed-regions",
        label: "Regions conserved or changed across species",
        description:
          "Use alignments and gene-family context to distinguish shared and lineage-specific biology.",
        signals: {
          "topic:comparative-genomics": 3,
          "evidence:sequence": 2,
        },
      },
      {
        id: "variant-frequencies",
        label: "Variant frequencies and shared ancestry",
        description:
          "Compare patterns across individuals while tracking sampling and population structure.",
        signals: {
          "topic:population-genomics": 3,
          "evidence:variation": 2,
        },
      },
      {
        id: "unknown-genes",
        label: "Uncharacterized genes and protein domains",
        description:
          "Rank possible functions from several evidence sources and preserve uncertain annotations.",
        signals: {
          "topic:genome-annotation": 3,
          "mode:discover": 2,
        },
      },
      {
        id: "regulation-expression",
        label: "Regulatory features connected to gene activity",
        description:
          "Integrate sequence, accessibility, transcription-factor, and expression measurements.",
        signals: {
          "topic:regulatory-genomics": 3,
          "mode:integrate": 2,
        },
      },
      biologyUnsureOption,
    ],
  },
  {
    id: "biology-evolution-focus",
    stage: "narrowing",
    kicker: "Narrow the evolutionary question",
    title: "Which evolutionary story would you most like to reconstruct?",
    prompt:
      "Choose the scale and kind of change that you would most enjoy turning into an evidence-based history.",
    type: "single",
    visibleWhen: {
      questionId: "biology-motivation",
      anyOf: ["evolution"],
    },
    options: [
      {
        id: "relationships",
        label: "Relationships among genes, species, or samples",
        description:
          "Build and compare evolutionary trees while keeping uncertain branches visible.",
        signals: {
          "topic:phylogenetics": 3,
          "mode:compare": 2,
        },
      },
      {
        id: "sequence-selection",
        label: "How selection and constraint shaped a sequence",
        description:
          "Compare rates and kinds of change across positions, genes, or lineages.",
        signals: {
          "topic:molecular-evolution": 3,
          "evidence:sequence": 2,
        },
      },
      {
        id: "population-history",
        label: "How populations separated, mixed, or changed size",
        description:
          "Use shared genetic variation to compare possible demographic histories.",
        signals: {
          "topic:population-genomics": 3,
          "scale:population": 2,
        },
      },
      {
        id: "pathogen-change",
        label: "How a pathogen lineage changed during an outbreak",
        description:
          "Combine sequences with time and de-identified context while respecting sampling gaps.",
        signals: {
          "topic:pathogen-genomics": 3,
          "evidence:temporal": 2,
        },
      },
      biologyUnsureOption,
    ],
  },
  {
    id: "biology-evolution-evidence",
    stage: "narrowing",
    kicker: "Choose the evolutionary evidence",
    title: "Which evidence pattern would you most like to test?",
    prompt:
      "Different patterns support different claims. Pick the one you would want to examine most carefully.",
    type: "single",
    visibleWhen: {
      questionId: "biology-motivation",
      anyOf: ["evolution"],
    },
    options: [
      {
        id: "tree-support",
        label: "Competing trees and branch support",
        description:
          "Ask which relationships remain stable across alignments, models, and resampled data.",
        signals: {
          "topic:phylogenetics": 3,
          "style:benchmarking": 2,
        },
      },
      {
        id: "rates-sites",
        label: "Conserved positions and changing evolutionary rates",
        description:
          "Look for constraint or shifts while checking alternative models and recombination.",
        signals: {
          "topic:molecular-evolution": 3,
          "evidence:sequence": 2,
        },
      },
      {
        id: "variation-geography",
        label: "Genetic variation across places or populations",
        description:
          "Relate ancestry and migration patterns to a documented sampling design.",
        signals: {
          "topic:population-genomics": 3,
          "evidence:variation": 2,
        },
      },
      {
        id: "dated-sequences",
        label: "Sequences collected across an outbreak timeline",
        description:
          "Estimate lineage relationships and timing without claiming that genomes reveal every transmission event.",
        signals: {
          "topic:pathogen-genomics": 3,
          "evidence:temporal": 2,
        },
      },
      biologyUnsureOption,
    ],
  },
  {
    id: "biology-cell-expression-focus",
    stage: "narrowing",
    kicker: "Choose the cellular view",
    title: "Which view of gene activity and cells would you investigate first?",
    prompt:
      "Choose the resolution that would make the biological system most interesting to you.",
    type: "single",
    visibleWhen: {
      questionId: "biology-motivation",
      anyOf: ["cells-systems"],
    },
    options: [
      {
        id: "condition-comparison",
        label: "Compare average gene activity across conditions",
        description:
          "Look for reproducible expression differences and pathway themes in bulk samples.",
        signals: {
          "topic:gene-expression": 3,
          "mode:compare": 2,
        },
      },
      {
        id: "time-course",
        label: "Follow gene activity through a response or transition",
        description:
          "Distinguish early, late, temporary, and sustained expression patterns.",
        signals: {
          "topic:time-course-expression": 3,
          "evidence:temporal": 2,
        },
      },
      {
        id: "single-cell",
        label: "Resolve cell types, states, and transitions",
        description:
          "Study cell-level heterogeneity rather than averaging a mixed tissue.",
        signals: {
          "topic:single-cell": 3,
          "scale:cellular": 2,
        },
      },
      {
        id: "spatial",
        label: "Map molecular patterns inside a tissue",
        description:
          "Connect gene activity to physical locations, boundaries, and cellular neighborhoods.",
        signals: {
          "topic:spatial-omics": 3,
          "style:visual": 2,
        },
      },
      {
        id: "regulation",
        label: "Investigate how gene activity is controlled",
        description:
          "Connect regulatory regions, transcription factors, chromatin, and expression evidence.",
        signals: {
          "topic:regulatory-genomics": 3,
          "mode:explain": 2,
        },
      },
      biologyUnsureOption,
    ],
  },
  {
    id: "biology-protein-focus",
    stage: "narrowing",
    kicker: "Narrow the biomolecular question",
    title: "Which protein or biomolecular question would you explore first?",
    prompt:
      "Choose the scientific move that most catches your attention. Nearby sequence, structure, and dynamics directions will remain visible.",
    type: "single",
    visibleWhen: {
      questionId: "biology-motivation",
      anyOf: ["proteins"],
    },
    options: [
      {
        id: "sequence-function",
        label: "Infer function from sequence families and conserved regions",
        description:
          "Compare domains, motifs, and evolutionary patterns while preserving uncertain annotations.",
        signals: {
          "topic:protein-sequence": 3,
          "evidence:sequence": 2,
        },
      },
      {
        id: "predict-structure",
        label: "Predict and assess a three-dimensional structure",
        description:
          "Inspect model confidence, domains, possible sites, and agreement with independent evidence.",
        signals: {
          "topic:protein-structure": 3,
          "evidence:structure": 2,
        },
      },
      {
        id: "simulate-motion",
        label: "Simulate molecular motion and changing conformations",
        description:
          "Study how proteins, RNA, membranes, or complexes move under modeled conditions.",
        signals: {
          "topic:biomolecular-dynamics": 3,
          "style:simulation": 2,
        },
      },
      {
        id: "binding-interactions",
        label: "Investigate molecular binding and interaction interfaces",
        description:
          "Compare plausible partners or poses while treating scores as hypotheses rather than measured affinity.",
        signals: {
          "topic:virtual-screening": 3,
          "scale:molecular": 2,
        },
      },
      biologyUnsureOption,
    ],
  },
  {
    id: "biology-protein-evidence",
    stage: "narrowing",
    kicker: "Choose the molecular evidence",
    title: "Which evidence would you most enjoy interpreting?",
    prompt:
      "Pick the evidence you would want to connect to a molecular explanation before choosing a specific system.",
    type: "single",
    visibleWhen: {
      questionId: "biology-motivation",
      anyOf: ["proteins"],
    },
    options: [
      {
        id: "family-alignment",
        label: "A protein-family alignment and domain annotations",
        description:
          "Use conservation and subfamily differences to form function hypotheses.",
        signals: {
          "topic:protein-sequence": 3,
          "mode:compare": 2,
        },
      },
      {
        id: "structure-confidence",
        label: "A predicted structure with confidence information",
        description:
          "Distinguish reliable regions from uncertain loops, domains, interfaces, or alternative states.",
        signals: {
          "topic:protein-structure": 3,
          "style:visual": 2,
        },
      },
      {
        id: "trajectory",
        label: "A molecular-simulation trajectory",
        description:
          "Summarize conformations and contacts while checking replicas, sampling, and model assumptions.",
        signals: {
          "topic:biomolecular-dynamics": 3,
          "evidence:temporal": 2,
        },
      },
      {
        id: "screening-controls",
        label: "Candidate poses compared with known controls",
        description:
          "Evaluate whether a docking or screening workflow recovers known evidence before ranking new molecules.",
        signals: {
          "topic:virtual-screening": 3,
          "style:benchmarking": 2,
        },
      },
      biologyUnsureOption,
    ],
  },
  {
    id: "biology-cell-systems-focus",
    stage: "narrowing",
    kicker: "Choose the system behavior",
    title:
      "Which relationship inside a living system would you most like to model?",
    prompt:
      "Pick the kind of connection or change that you would want to turn into a testable computational model.",
    type: "single",
    visibleWhen: {
      questionId: "biology-motivation",
      anyOf: ["cells-systems"],
    },
    options: [
      {
        id: "interaction-networks",
        label: "Interactions among genes, proteins, or cells",
        description:
          "Build a network while recording what each edge means and how strongly it is supported.",
        signals: {
          "topic:networks": 3,
          "evidence:networks": 2,
        },
      },
      {
        id: "metabolic-flows",
        label: "How resources flow through metabolic reactions",
        description:
          "Use biochemical constraints to compare feasible pathways, growth, or production tradeoffs.",
        signals: {
          "topic:metabolic-modeling": 3,
          "style:modeling": 2,
        },
      },
      {
        id: "regulatory-control",
        label: "How regulatory elements and factors control genes",
        description:
          "Integrate sequence, chromatin, and expression evidence into testable control relationships.",
        signals: {
          "topic:regulatory-genomics": 3,
          "mode:explain": 2,
        },
      },
      {
        id: "dynamic-response",
        label: "How a cellular response unfolds over time",
        description:
          "Compare early, late, temporary, and sustained activity across a perturbation or transition.",
        signals: {
          "topic:time-course-expression": 3,
          "mode:dynamics": 2,
        },
      },
      biologyUnsureOption,
    ],
  },
  {
    id: "biology-ecology-focus",
    stage: "narrowing",
    kicker: "Narrow the living community",
    title: "Which ecological scale would you explore first?",
    prompt:
      "Choose the system whose patterns you would most like to connect to environmental evidence.",
    type: "single",
    visibleWhen: {
      questionId: "biology-motivation",
      anyOf: ["microbes-ecosystems"],
    },
    options: [
      {
        id: "microbial-composition",
        label: "Which microbes make up a community",
        description:
          "Compare community membership and relative composition while checking sampling and contamination.",
        signals: {
          "topic:microbiome": 3,
          "scale:ecosystem": 2,
        },
      },
      {
        id: "metagenome-function",
        label: "Which genes and functions occur in mixed-community DNA",
        description:
          "Assemble or profile environmental sequences to investigate possible community capabilities.",
        signals: {
          "topic:microbiome": 3,
          "evidence:sequence": 2,
        },
      },
      {
        id: "species-distribution",
        label: "Where species occur and which environments they track",
        description:
          "Relate occurrence records to geography and environment while mapping sampling bias.",
        signals: {
          "topic:computational-ecology": 3,
          "evidence:spatial": 2,
        },
      },
      {
        id: "biodiversity-change",
        label: "How biodiversity changes across places or time",
        description:
          "Compare communities, occupancy, connectivity, or ecological scenarios with explicit uncertainty.",
        signals: {
          "topic:computational-ecology": 3,
          "evidence:temporal": 2,
        },
      },
      biologyUnsureOption,
    ],
  },
  {
    id: "biology-ecology-evidence",
    stage: "narrowing",
    kicker: "Choose the ecological evidence",
    title:
      "Which dataset would you most like to turn into an ecological explanation?",
    prompt:
      "Pick the evidence type you would want to inspect before choosing a particular organism or environment.",
    type: "single",
    visibleWhen: {
      questionId: "biology-motivation",
      anyOf: ["microbes-ecosystems"],
    },
    options: [
      {
        id: "community-sequences",
        label: "DNA sequences from a microbial community",
        description:
          "Profile taxa or genes while tracking reference bias and compositional measurements.",
        signals: {
          "topic:microbiome": 3,
          "evidence:sequence": 2,
        },
      },
      {
        id: "species-maps",
        label: "Species observations and environmental maps",
        description:
          "Model distributions while making uneven sampling and geographic coverage visible.",
        signals: {
          "topic:computational-ecology": 3,
          "evidence:spatial": 2,
        },
      },
      {
        id: "community-table",
        label: "A table of communities across sites or conditions",
        description:
          "Compare diversity and composition while respecting sparse, relative-abundance data.",
        signals: {
          "topic:microbiome": 3,
          "evidence:measurements": 2,
        },
      },
      {
        id: "ecological-time-series",
        label: "Repeated observations of ecological change",
        description:
          "Study seasonal, disturbance, migration, or long-term patterns without overstating a projection.",
        signals: {
          "topic:computational-ecology": 3,
          "evidence:temporal": 2,
        },
      },
      biologyUnsureOption,
    ],
  },
  {
    id: "biology-data-method-focus",
    stage: "narrowing",
    kicker: "Narrow the computational contribution",
    title: "Which data or methods challenge would you take on first?",
    prompt:
      "Choose the computational contribution you would most like to understand. The biology remains part of every option.",
    type: "single",
    visibleWhen: {
      questionId: "biology-motivation",
      anyOf: ["data-methods", "open"],
    },
    options: [
      {
        id: "build-predictor",
        label: "Build a model that predicts a biological property",
        description:
          "Choose representations, compare baselines, and test whether predictions generalize.",
        signals: {
          "topic:biological-ml": 3,
          "mode:predict": 2,
        },
      },
      {
        id: "benchmark-tools",
        label: "Compare computational methods fairly",
        description:
          "Design datasets and metrics that reveal accuracy, robustness, runtime, and failure modes.",
        signals: {
          "topic:method-benchmarking": 3,
          "style:benchmarking": 2,
        },
      },
      {
        id: "integrate-evidence",
        label: "Connect several kinds of biological evidence",
        description:
          "Combine sequence, expression, structure, networks, or environmental context with traceable assumptions.",
        signals: {
          "mode:integrate": 3,
          "evidence:integrated": 2,
        },
      },
      {
        id: "make-pattern-visible",
        label: "Make a complex biological pattern understandable",
        description:
          "Use careful visualizations, maps, trees, structures, or networks to support interpretation.",
        signals: {
          "style:visual": 3,
          "style:interpretation": 2,
        },
      },
      biologyUnsureOption,
    ],
  },
  {
    id: "biology-data-method-evidence",
    stage: "narrowing",
    kicker: "Choose the standard of evidence",
    title: "What would make a computational biology method trustworthy to you?",
    prompt:
      "Pick the test you would most want to see before relying on a model or workflow.",
    type: "single",
    visibleWhen: {
      questionId: "biology-motivation",
      anyOf: ["data-methods", "open"],
    },
    options: [
      {
        id: "generalization",
        label: "It works on genuinely new biological data",
        description:
          "Use independent groups or contexts to expose leakage, shortcuts, and dataset shift.",
        signals: {
          "topic:biological-ml": 3,
          "style:statistics": 2,
        },
      },
      {
        id: "fair-comparison",
        label: "It wins a fair, reproducible comparison",
        description:
          "Hold inputs and tuning rules consistent while examining several relevant metrics.",
        signals: {
          "topic:method-benchmarking": 3,
          "style:benchmarking": 2,
        },
      },
      {
        id: "independent-evidence",
        label: "Its result agrees with independent biological evidence",
        description:
          "Compare the computational claim with experiments, curated knowledge, or another measurement type.",
        signals: {
          "mode:integrate": 3,
          "style:interpretation": 2,
        },
      },
      {
        id: "transparent-failures",
        label: "Its uncertainty and failure cases are visible",
        description:
          "Inspect errors, calibration, missing data, and contexts where the method should not be trusted.",
        signals: {
          "topic:method-benchmarking": 3,
          "style:statistics": 2,
        },
      },
      biologyUnsureOption,
    ],
  },
];

export const computationalBiologyAdaptiveQuestions: SurveyQuestion[] =
  computationalBiologyAdaptiveQuestionContent.map((question) => ({
    ...question,
    options: question.options.map((option) => ({
      ...option,
      nicheBoosts: biologyNarrowingBoosts[question.id]?.[option.id],
    })),
  }));
