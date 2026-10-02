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
];
