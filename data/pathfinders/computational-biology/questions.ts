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
];
