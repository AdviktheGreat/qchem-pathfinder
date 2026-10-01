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
];
