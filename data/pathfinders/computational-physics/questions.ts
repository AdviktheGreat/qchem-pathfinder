import type { SurveyQuestion } from "@/lib/types";
import { physicsUnsureOption } from "@/data/pathfinders/computational-physics/uncertainty-options";

export const computationalPhysicsQuestions: SurveyQuestion[] = [
  {
    id: "physics-starting-point",
    stage: "calibration",
    kicker: "Start where you are",
    title: "How familiar does computational physics feel right now?",
    prompt:
      "This changes the background guidance in your results—not which directions you are allowed to explore.",
    type: "single",
    options: [
      {
        id: "new",
        label: "Mostly new to me",
        description:
          "I’m curious, but I would want a clear map of the field’s main systems, questions, and modeling ideas.",
      },
      {
        id: "recognize",
        label: "I recognize parts of the landscape",
        description:
          "Some physics or simulation ideas sound familiar, even if I could not explain all of them yet.",
      },
      {
        id: "comfortable",
        label: "I could explain several core ideas",
        description:
          "I feel ready to build from concepts such as forces, energy, waves, fields, probability, and models.",
      },
      physicsUnsureOption,
    ],
  },
  {
    id: "physics-concept-familiarity",
    stage: "calibration",
    kicker: "Concept check-in",
    title: "Which ideas feel familiar enough to use in a conversation?",
    prompt:
      "Choose up to five. Recognition is enough—this is a preparation check, not a quiz.",
    type: "multi",
    maxSelections: 5,
    definition: {
      term: "Computational model",
      text: "A mathematical description of a physical system translated into calculations that a computer can carry out.",
    },
    options: [
      {
        id: "motion-energy",
        label: "Motion, forces, momentum, and energy",
      },
      {
        id: "waves-fields",
        label: "Waves, electric or magnetic fields, and oscillations",
      },
      {
        id: "thermal-statistical",
        label: "Temperature, probability, and many-particle behavior",
      },
      {
        id: "quantum",
        label: "Quantum states, probabilities, and measurement",
      },
      {
        id: "models-simulations",
        label: "Models, approximations, and numerical simulations",
      },
      {
        ...physicsUnsureOption,
        label: "I’ve heard of these but couldn’t explain them",
      },
    ],
  },
];
