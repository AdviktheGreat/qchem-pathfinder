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
  {
    id: "physics-coding-comfort",
    stage: "calibration",
    kicker: "Coding check-in",
    title: "What is your current relationship with coding?",
    prompt:
      "Coding experience changes the support suggested in your results; it does not decide which physical questions belong to you.",
    type: "single",
    options: [
      {
        id: "enjoy",
        label: "I enjoy writing or adapting code",
        description:
          "I would be happy working with scripts, notebooks, numerical libraries, or visualization tools.",
      },
      {
        id: "learning",
        label: "I’m learning",
        description:
          "I can work through examples and would like more practice changing, testing, or explaining code.",
      },
      {
        id: "new",
        label: "Mostly new to me",
        description:
          "I would want a guided notebook or a small, well-explained simulation as a starting point.",
      },
      {
        id: "tools-first",
        label: "I’d rather begin with established tools",
        description:
          "I’m open to learning code, but I want the physical question to remain central.",
      },
      physicsUnsureOption,
    ],
  },
  {
    id: "physics-tools-comfort",
    stage: "calibration",
    kicker: "Simulation-tool check-in",
    title: "Which computational workflow feels closest to your experience?",
    prompt:
      "A workflow might use a spreadsheet, notebook, plotting tool, simulation package, command line, or numerical library.",
    type: "single",
    options: [
      {
        id: "independent",
        label: "I’ve built or modified a simulation or analysis myself",
        description:
          "I have made choices about equations, settings, code, data, or visualizations and checked the output.",
      },
      {
        id: "guided",
        label: "I’ve followed a guided notebook or simulation",
        description:
          "I can navigate a worked computational activity even if I still need support making changes.",
      },
      {
        id: "basic-tools",
        label: "I’ve mainly used tables, graphs, or interactive tools",
        description:
          "I can organize values and inspect results, but more technical simulation workflows are new to me.",
      },
      {
        id: "new",
        label: "These tools are new to me",
        description:
          "I would want an explanation of the model, inputs, outputs, settings, and physical assumptions.",
      },
      physicsUnsureOption,
    ],
  },
  {
    id: "physics-explanation-style",
    stage: "calibration",
    kicker: "How ideas click",
    title: "What kind of explanation helps a new physics idea make sense?",
    prompt:
      "Choose the starting point you would find most inviting. Strong projects often combine several of these later.",
    type: "single",
    options: [
      {
        id: "visual",
        label: "A diagram, animation, or field map",
        description:
          "Let me see motion, spatial structure, or a changing pattern before we formalize it.",
      },
      {
        id: "conceptual",
        label: "A plain-language physical story",
        description:
          "Start with the mechanism, cause, or intuition and connect it to familiar situations.",
      },
      {
        id: "quantitative",
        label: "Equations, scaling, and numerical patterns",
        description:
          "Show how quantities relate, which limits matter, and what the mathematics predicts.",
      },
      {
        id: "workflow",
        label: "A worked simulation or code example",
        description:
          "Let me change an input, inspect the output, and learn what each computational step represents.",
      },
      {
        id: "mixed",
        label: "A balanced mix",
        description:
          "Combine physical intuition, visuals, mathematics, and computation without assuming one must come first.",
      },
      physicsUnsureOption,
    ],
  },
];
