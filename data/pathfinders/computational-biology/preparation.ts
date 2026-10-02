import type { PathfinderPreparationConfig } from "@/lib/pathfinder-definition";

export const biologyQuantitativePreparation = {
  comfortable:
    "Translate each equation or model parameter back into a biological meaning, assumption, and measurable quantity.",
  "with-guidance":
    "Keep a small notation guide and work through one model with named variables before reading a method-heavy paper.",
  "concept-first":
    "Begin with a diagram, concrete biological system, and plotted result; introduce the quantitative model after the question is clear.",
  unsure:
    "Sample one visual explanation and one short quantitative example to discover which entry point helps the biology make sense.",
} as const;

export const biologyCodingPreparation = {
  enjoy:
    "Reproduce one small public analysis, then change a parameter or visualization and explain what the change means biologically.",
  learning:
    "Start from a guided notebook with a small dataset, annotate each step, and change one choice at a time.",
  new: "Use a browser-based tool or prepared notebook first, keeping the inputs, outputs, and biological decision visible before writing code.",
  "tools-first":
    "Begin with an established sequence, structure, or data-analysis tool and record what its settings assume before automating the workflow.",
  unsure:
    "Try one short guided notebook and one established web tool; choose the route that keeps the scientific question clearest.",
} as const;

export const biologyExplanationGuides = {
  visual:
    "Start with a labeled biological diagram, structure, tree, network, or data visualization before tracing the analysis behind it.",
  conceptual:
    "Start with the biological system, the comparison being made, and what a result would support before introducing technical details.",
  quantitative:
    "Start with the measured pattern, its uncertainty, and the model used to distinguish signal from variation.",
  workflow:
    "Start with a small worked example that follows biological inputs through computational choices to an interpretable output.",
  mixed:
    "Combine a biological overview, one visual result, and a compact walkthrough of the computation that produced it.",
  unsure:
    "Use a mixed explanation at first, then notice whether the diagram, biological story, quantitative pattern, or workflow helps most.",
} as const;

export const biologyStatisticsPreparation = {
  comfortable:
    "Check the sampling design, uncertainty, effect size, and validation—not only whether a reported comparison is statistically significant.",
  learning:
    "Review distributions, variation, multiple comparisons, and held-out validation using one biological dataset with clear labels.",
  new: "Begin by comparing groups visually and asking what biological and technical variation could create the observed pattern.",
  unsure:
    "Treat every summary statistic as a claim about variation; look for a visual explanation and the samples behind it.",
} as const;

export const biologyToolPreparation = {
  independent:
    "Keep a reproducible record of data versions, parameters, software, and quality checks so another student could follow the analysis.",
  guided:
    "Repeat a trusted workflow, then change one justified setting and compare both the output and its biological interpretation.",
  "basic-tools":
    "Build from tables and plots toward one domain tool, recording the input format, output, assumptions, and limitations.",
  new: "Start with a small curated dataset and a guided interface that makes each input, output, and quality check visible.",
  unsure:
    "Choose a workflow with a tiny example dataset and a clear explanation of what every input and output represents.",
} as const;

export const biologyPreparationConfig = {
  mathQuestionId: "biology-quantitative-comfort",
  codingQuestionId: "biology-coding-comfort",
  explanationQuestionId: "biology-explanation-style",
  mathAdvice: biologyQuantitativePreparation,
  codingAdvice: biologyCodingPreparation,
  explanationGuides: biologyExplanationGuides,
  supplementalAdvice: [
    {
      questionId: "biology-statistics-comfort",
      advice: biologyStatisticsPreparation,
    },
    {
      questionId: "biology-tools-comfort",
      advice: biologyToolPreparation,
    },
  ],
  conceptOverlaps: [],
  knowledge: {
    memoryQuestionId: "biology-starting-point",
    conceptQuestionId: "biology-concept-familiarity",
    startingPointByAnswer: {
      new: "Begin with a concise map connecting genes, proteins, cells, evolution, and the evidence computational biologists use. New vocabulary is preparation—not a limit on what you can explore.",
      recognize:
        "Several ideas are recognizable. A short refresher on biological scales, data types, and evidence will make the literature easier to enter.",
      comfortable:
        "Core biology ideas feel available; build from them while checking unfamiliar datasets, assumptions, and methods as needed.",
      unsure:
        "Your current familiarity is still taking shape. Use the first papers to build context while keeping every direction open.",
    },
    defaultStartingPoint:
      "Your current familiarity shapes preparation guidance, never which computational biology directions you may explore.",
    conceptReviewLabels: {
      "genes-genomes": "Genes, DNA, and genome organization",
      proteins: "Protein sequence, structure, and function",
      cells: "Cells, gene activity, and cell types",
      evolution: "Evolution, inheritance, and biological variation",
      "biological-data": "Datasets, comparisons, uncertainty, and evidence",
    },
    mathFallback: "Still exploring how much quantitative detail feels useful",
    codingFallback: "Still exploring comfort with coding and data tools",
    explanationFallback: "Open to different explanation styles",
    contextReadyOptionId: "comfortable",
  },
} satisfies PathfinderPreparationConfig;
