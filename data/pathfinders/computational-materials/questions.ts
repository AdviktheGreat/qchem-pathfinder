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
  {
    id: "materials-math-comfort",
    stage: "calibration",
    kicker: "Working language",
    title: "How do you feel when a materials explanation uses equations?",
    prompt:
      "Your answer changes the preparation advice and explanation style—not the directions you can explore.",
    type: "single",
    options: [
      {
        id: "comfortable",
        label: "Comfortable",
        description:
          "Equations and quantitative relationships often help me understand a material property.",
      },
      {
        id: "with-guidance",
        label: "Good with some guidance",
        description:
          "I can follow the math when the variables, units, and physical meaning are introduced clearly.",
      },
      {
        id: "concept-first",
        label: "Show me the physical picture first",
        description:
          "I learn best from structures, diagrams, or trends before symbols.",
      },
      unsureOption,
    ],
  },
  {
    id: "materials-coding-comfort",
    stage: "calibration",
    kicker: "Coding check-in",
    title: "What is your current relationship with coding?",
    prompt:
      "Coding experience is useful preparation information, not a gate to computational materials research.",
    type: "single",
    options: [
      {
        id: "enjoy",
        label: "I enjoy writing or adapting code",
        description:
          "I would be happy working with scripts, notebooks, or data-processing tools.",
      },
      {
        id: "learning",
        label: "I’m learning",
        description:
          "I can work through examples and would like more practice.",
      },
      {
        id: "new",
        label: "Mostly new to me",
        description:
          "I would want a guided notebook or worked example as a starting point.",
      },
      {
        id: "tools-first",
        label: "I’d rather begin with established tools",
        description:
          "I’m open to coding, but I want the materials question to remain central.",
      },
      unsureOption,
    ],
  },
  {
    id: "materials-tools-comfort",
    stage: "calibration",
    kicker: "Simulation check-in",
    title: "How much experience do you have with computational science tools?",
    prompt:
      "A tool could be a prepared notebook, structure viewer, simulation program, or scientific-data platform.",
    type: "single",
    options: [
      {
        id: "independent",
        label: "I’ve set up or modified a calculation myself",
        description:
          "I have made choices about inputs, settings, or analysis and examined the output.",
      },
      {
        id: "guided",
        label: "I’ve followed a guided computational activity",
        description:
          "I can navigate a worked workflow even if I still need support.",
      },
      {
        id: "observed",
        label: "I’ve seen these tools used",
        description:
          "I recognize parts of a computational workflow but have not run much myself.",
      },
      {
        id: "new",
        label: "These tools are new to me",
        description:
          "I would want an explanation of the inputs, outputs, and scientific choices.",
      },
      unsureOption,
    ],
  },
  {
    id: "materials-explanation-style",
    stage: "calibration",
    kicker: "How ideas click",
    title: "Which explanation would you reach for first?",
    type: "single",
    options: [
      {
        id: "visual",
        label: "A structure or visual model",
        description:
          "Show me how atoms, layers, defects, or phases are arranged.",
      },
      {
        id: "quantitative",
        label: "A quantitative pattern",
        description:
          "Show me a property, units, trend, or equation across materials.",
      },
      {
        id: "comparison",
        label: "A side-by-side comparison",
        description:
          "Help me understand why two materials or methods behave differently.",
      },
      {
        id: "mixed",
        label: "A mix of pictures and numbers",
        description:
          "Build intuition, then connect the structure to the quantitative result.",
      },
      unsureOption,
    ],
  },
];
