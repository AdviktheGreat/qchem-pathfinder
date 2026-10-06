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
  {
    id: "physics-math-comfort",
    stage: "calibration",
    kicker: "Mathematical language",
    title:
      "How do you feel when a physics explanation uses equations or changing quantities?",
    prompt:
      "Your answer changes the preparation advice and explanation style—not the directions you can explore.",
    type: "single",
    options: [
      {
        id: "comfortable",
        label: "Comfortable",
        description:
          "Equations, functions, rates of change, or vectors often help me understand a physical system.",
      },
      {
        id: "with-guidance",
        label: "Good with some guidance",
        description:
          "I can follow the mathematics when the variables, units, and physical meaning are introduced clearly.",
      },
      {
        id: "concept-first",
        label: "Show me the physical picture first",
        description:
          "I learn best from a concrete system, diagram, or graph before symbols and equations.",
      },
      physicsUnsureOption,
    ],
  },
  {
    id: "physics-statistics-comfort",
    stage: "calibration",
    kicker: "Probability and uncertainty",
    title: "What is your current relationship with statistical reasoning?",
    prompt:
      "Computational physicists use probability, distributions, and uncertainty in many different ways. Experience is helpful context, not a gate.",
    type: "single",
    options: [
      {
        id: "comfortable",
        label: "I’m comfortable interpreting statistical evidence",
        description:
          "I can reason about distributions, averages, fluctuations, uncertainty, or repeated samples.",
      },
      {
        id: "learning",
        label: "I’m learning the main ideas",
        description:
          "I can follow examples and would like more practice connecting statistical patterns to physical claims.",
      },
      {
        id: "new",
        label: "Statistical reasoning is mostly new to me",
        description:
          "I would want visual explanations and a careful introduction to probability, variation, and uncertainty.",
      },
      physicsUnsureOption,
    ],
  },
];
