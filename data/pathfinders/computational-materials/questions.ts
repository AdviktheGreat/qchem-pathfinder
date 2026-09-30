import type { SurveyQuestion } from "@/lib/types";

const unsureOption = {
  id: "unsure",
  label: "I’m not sure yet",
  description:
    "Keep the possibilities open; this will only shape the context and preparation guidance you receive.",
  uncertainty: true,
} as const;

export const computationalMaterialsQuestions: SurveyQuestion[] = [
  {
    id: "materials-starting-point",
    stage: "calibration",
    kicker: "Start where you are",
    title: "How familiar does computational materials science feel right now?",
    prompt:
      "This changes the amount of background in your results—not which directions you are allowed to explore.",
    type: "single",
    options: [
      {
        id: "new",
        label: "Mostly new to me",
        description:
          "I’m interested, but I would want a clear map of the basic ideas and vocabulary.",
      },
      {
        id: "recognize",
        label: "I recognize parts of the landscape",
        description:
          "Some materials concepts sound familiar, even if I could not explain all of them yet.",
      },
      {
        id: "comfortable",
        label: "I could explain several core ideas",
        description:
          "I feel ready to build from concepts such as structure, stability, and material properties.",
      },
      unsureOption,
    ],
  },
  {
    id: "materials-concept-familiarity",
    stage: "calibration",
    kicker: "Concept check-in",
    title: "Which ideas feel familiar enough to use in a conversation?",
    prompt:
      "Choose up to five. Recognition is enough—this is a preparation check, not a quiz.",
    type: "multi",
    maxSelections: 5,
    definition: {
      term: "Crystal structure",
      text: "The organized arrangement of atoms in a crystalline material. A unit cell is a small repeating description of that arrangement.",
    },
    options: [
      {
        id: "atomic-structure",
        label: "How atoms are arranged in a material",
      },
      {
        id: "bonding",
        label: "How bonding helps shape material properties",
      },
      {
        id: "crystals",
        label: "Crystal lattices and unit cells",
      },
      {
        id: "phases",
        label: "Phases, energy, and material stability",
      },
      {
        id: "properties",
        label: "Links between structure and properties",
      },
      {
        id: "unsure",
        label: "I’ve heard of these but couldn’t explain them",
        uncertainty: true,
      },
    ],
  },
];
