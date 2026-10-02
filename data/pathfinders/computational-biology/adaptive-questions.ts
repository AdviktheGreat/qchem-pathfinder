import { biologyUnsureOption } from "@/data/pathfinders/computational-biology/uncertainty-options";
import type { SurveyQuestion } from "@/lib/types";

export const computationalBiologyAdaptiveQuestions: SurveyQuestion[] = [
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
];
