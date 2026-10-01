import type { SurveyQuestion } from "@/lib/types";

const unsureOption = {
  id: "unsure",
  label: "I’m not sure yet",
  description:
    "Keep the possibilities open; this will shape context and preparation guidance, not limit your directions.",
  uncertainty: true,
} as const;

export const computationalBiologyQuestions: SurveyQuestion[] = [
  {
    id: "biology-starting-point",
    stage: "calibration",
    kicker: "Start where you are",
    title: "How familiar does computational biology feel right now?",
    prompt:
      "This changes the background guidance in your results—not which directions you are allowed to explore.",
    type: "single",
    options: [
      {
        id: "new",
        label: "Mostly new to me",
        description:
          "I’m curious, but I would want a clear map of the field’s main questions, data, and vocabulary.",
      },
      {
        id: "recognize",
        label: "I recognize parts of the landscape",
        description:
          "Some biological or data ideas sound familiar, even if I could not explain all of them yet.",
      },
      {
        id: "comfortable",
        label: "I could explain several core ideas",
        description:
          "I feel ready to build from concepts such as genes, proteins, cells, evolution, and biological data.",
      },
      unsureOption,
    ],
  },
  {
    id: "biology-concept-familiarity",
    stage: "calibration",
    kicker: "Concept check-in",
    title: "Which ideas feel familiar enough to use in a conversation?",
    prompt:
      "Choose up to five. Recognition is enough—this is a preparation check, not a quiz.",
    type: "multi",
    maxSelections: 5,
    definition: {
      term: "Biological data",
      text: "Recorded information about living systems, such as DNA sequences, gene activity measurements, protein structures, images, or observations of organisms and environments.",
    },
    options: [
      { id: "genes-genomes", label: "Genes, DNA, and genomes" },
      {
        id: "proteins",
        label: "How protein sequence and structure relate to function",
      },
      { id: "cells", label: "Cells, gene activity, and cell types" },
      {
        id: "evolution",
        label: "Evolution, inheritance, and variation",
      },
      {
        id: "biological-data",
        label: "Using datasets to compare biological patterns",
      },
      {
        ...unsureOption,
        label: "I’ve heard of these but couldn’t explain them",
      },
    ],
  },
  {
    id: "biology-quantitative-comfort",
    stage: "calibration",
    kicker: "Working language",
    title:
      "How do you feel when a biology explanation uses equations or quantitative models?",
    prompt:
      "Your answer changes the preparation advice and explanation style—not the directions you can explore.",
    type: "single",
    options: [
      {
        id: "comfortable",
        label: "Comfortable",
        description:
          "Equations, rates, probabilities, or models often help me understand a biological pattern.",
      },
      {
        id: "with-guidance",
        label: "Good with some guidance",
        description:
          "I can follow the math when the variables and biological meaning are introduced clearly.",
      },
      {
        id: "concept-first",
        label: "Show me the biological picture first",
        description:
          "I learn best from a concrete system, diagram, or trend before symbols and formulas.",
      },
      unsureOption,
    ],
  },
  {
    id: "biology-statistics-comfort",
    stage: "calibration",
    kicker: "Patterns and uncertainty",
    title: "What is your current relationship with statistics?",
    prompt:
      "Computational biologists use statistics to separate meaningful patterns from variation. Experience is helpful context, not a gate.",
    type: "single",
    options: [
      {
        id: "comfortable",
        label: "I’m comfortable interpreting statistical evidence",
        description:
          "I can reason about distributions, variation, uncertainty, or comparisons between groups.",
      },
      {
        id: "learning",
        label: "I’m learning the main ideas",
        description:
          "I can follow examples and would like more practice interpreting what a result supports.",
      },
      {
        id: "new",
        label: "Statistics is mostly new to me",
        description:
          "I would want visual explanations and a careful introduction to variation and uncertainty.",
      },
      unsureOption,
    ],
  },
  {
    id: "biology-coding-comfort",
    stage: "calibration",
    kicker: "Coding check-in",
    title: "What is your current relationship with coding?",
    prompt:
      "Coding experience changes the support suggested in your results; it does not decide which biological questions belong to you.",
    type: "single",
    options: [
      {
        id: "enjoy",
        label: "I enjoy writing or adapting code",
        description:
          "I would be happy working with scripts, notebooks, data tables, or visualization libraries.",
      },
      {
        id: "learning",
        label: "I’m learning",
        description:
          "I can work through examples and would like more practice changing or explaining code.",
      },
      {
        id: "new",
        label: "Mostly new to me",
        description:
          "I would want a guided notebook or a small, well-explained dataset as a starting point.",
      },
      {
        id: "tools-first",
        label: "I’d rather begin with established tools",
        description:
          "I’m open to learning code, but I want the biological question to remain central.",
      },
      unsureOption,
    ],
  },
  {
    id: "biology-tools-comfort",
    stage: "calibration",
    kicker: "Data-tool check-in",
    title: "Which computational workflow feels closest to your experience?",
    prompt:
      "A workflow might use a spreadsheet, notebook, sequence browser, structure viewer, command line, or analysis platform.",
    type: "single",
    options: [
      {
        id: "independent",
        label: "I’ve built or modified an analysis myself",
        description:
          "I have made choices about data, settings, code, or visualizations and checked the output.",
      },
      {
        id: "guided",
        label: "I’ve followed a guided notebook or workflow",
        description:
          "I can navigate a worked analysis even if I still need support making changes.",
      },
      {
        id: "basic-tools",
        label: "I’ve mainly used tables, charts, or web tools",
        description:
          "I can organize information and inspect results, but more technical workflows are new to me.",
      },
      {
        id: "new",
        label: "These tools are new to me",
        description:
          "I would want an explanation of the data, inputs, outputs, and scientific choices.",
      },
      unsureOption,
    ],
  },
  {
    id: "biology-explanation-style",
    stage: "calibration",
    kicker: "How ideas click",
    title: "Which explanation would you reach for first?",
    prompt:
      "Choose the doorway that would help you begin. Your results can still combine several explanation styles.",
    type: "single",
    options: [
      {
        id: "visual",
        label: "A biological diagram or visualization",
        description:
          "Show me a structure, pathway, cell map, evolutionary tree, or pattern in a dataset.",
      },
      {
        id: "conceptual",
        label: "A biological story in plain language",
        description:
          "Explain what the system does, what changes, and why the question matters before introducing the method.",
      },
      {
        id: "quantitative",
        label: "A quantitative pattern",
        description:
          "Show me measurements, uncertainty, trends, or model predictions across biological samples.",
      },
      {
        id: "workflow",
        label: "A worked data or code example",
        description:
          "Walk me from raw biological information through analysis choices to an interpretable result.",
      },
      {
        id: "mixed",
        label: "A mix of biological intuition and data",
        description:
          "Build the biological picture, then connect it to evidence, computation, and uncertainty.",
      },
      unsureOption,
    ],
  },
];
