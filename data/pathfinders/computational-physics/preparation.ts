import type { PathfinderPreparationConfig } from "@/lib/pathfinder-definition";

export const physicsMathPreparation = {
  comfortable:
    "Translate each equation into a physical statement, check units and limiting cases, and connect parameters to quantities a simulation or experiment could measure.",
  "with-guidance":
    "Keep a notation and units guide, then work through one small model before reading a paper with coupled equations or numerical methods.",
  "concept-first":
    "Begin with the physical system, diagram, and expected trend; introduce equations only after each variable and relationship has a concrete meaning.",
  unsure:
    "Sample one visual explanation and one short equation-based example to discover which entry point makes the physical model clearest.",
} as const;

export const physicsCodingPreparation = {
  enjoy:
    "Reproduce one small simulation or analysis, then change a parameter, initial condition, or visualization and explain the physical consequence.",
  learning:
    "Start from a guided notebook, annotate what each block represents physically, and change one computational choice at a time.",
  new: "Use a prepared browser-based simulation or notebook first, keeping the model, inputs, outputs, and assumptions visible before writing code from scratch.",
  "tools-first":
    "Begin with an established simulator or analysis tool and record what its settings, defaults, and numerical limits mean physically.",
  unsure:
    "Try one short guided notebook and one interactive simulation; choose the route that keeps the physical question easiest to follow.",
} as const;

export const physicsExplanationGuides = {
  visual:
    "Start with a labeled trajectory, field map, phase portrait, distribution, or animation before tracing the calculation behind it.",
  conceptual:
    "Start with the physical system, mechanism, and competing explanations before introducing equations or algorithms.",
  quantitative:
    "Start with the governing relationship, units, scales, and a numerical prediction that can be checked.",
  workflow:
    "Start with a small worked example that follows assumptions and inputs through a solver to a physically interpreted output.",
  mixed:
    "Combine a physical story, one visual result, and a compact walkthrough of the mathematics and computation.",
  unsure:
    "Use a mixed explanation first, then notice whether the physical story, visual, equation, or workflow helps most.",
} as const;

export const physicsStatisticsPreparation = {
  comfortable:
    "Check sampling, distributions, uncertainty sources, correlations, and validation—not only an average or best-fit result.",
  learning:
    "Review distributions, fluctuations, uncertainty intervals, and held-out tests using one simulated physical dataset.",
  new: "Begin by comparing individual trajectories with an ensemble plot and ask what variation comes from physics, inputs, measurement, and finite sampling.",
  unsure:
    "Treat every summary statistic as a claim about variation; look for the underlying samples, assumptions, and a visual explanation.",
} as const;

export const physicsToolPreparation = {
  independent:
    "Keep a reproducible record of equations, code or software version, parameters, units, resolution, convergence checks, and random seeds.",
  guided:
    "Repeat a trusted workflow, then change one justified setting and compare both the numerical output and physical interpretation.",
  "basic-tools":
    "Build from tables and plots toward one numerical notebook, recording inputs, outputs, units, assumptions, and checks.",
  new: "Start with a tiny model and a guided interface that makes the physical assumptions, numerical settings, and output checks visible.",
  unsure:
    "Choose a workflow with a small example and a clear explanation of what every input, setting, and output represents physically.",
} as const;

export const physicsPreparationConfig = {
  mathQuestionId: "physics-math-comfort",
  codingQuestionId: "physics-coding-comfort",
  explanationQuestionId: "physics-explanation-style",
  mathAdvice: physicsMathPreparation,
  codingAdvice: physicsCodingPreparation,
  explanationGuides: physicsExplanationGuides,
  supplementalAdvice: [
    {
      questionId: "physics-statistics-comfort",
      advice: physicsStatisticsPreparation,
    },
    {
      questionId: "physics-tools-comfort",
      advice: physicsToolPreparation,
    },
  ],
  conceptOverlaps: [],
  knowledge: {
    memoryQuestionId: "physics-starting-point",
    conceptQuestionId: "physics-concept-familiarity",
    startingPointByAnswer: {
      new: "Begin with a concise map connecting physical systems, mathematical models, simulations, and evidence. New vocabulary is preparation—not a limit on what you can explore.",
      recognize:
        "Several ideas are recognizable. A short refresher on scales, conservation laws, model assumptions, and numerical evidence will make the literature easier to enter.",
      comfortable:
        "Core physics ideas feel available; build from them while checking unfamiliar models, approximations, and computational methods as needed.",
      unsure:
        "Your current familiarity is still taking shape. Use the first papers to build context while keeping every direction open.",
    },
    defaultStartingPoint:
      "Your current familiarity shapes preparation guidance, never which computational physics directions you may explore.",
    conceptReviewLabels: {
      "motion-energy": "Motion, forces, momentum, energy, and conservation",
      "waves-fields":
        "Waves, oscillations, electric fields, and magnetic fields",
      "thermal-statistical":
        "Temperature, probability, fluctuations, and many-particle behavior",
      quantum: "Quantum states, probabilities, and measurement",
      "models-simulations":
        "Models, approximations, numerical simulation, and validation",
    },
    mathFallback: "Still exploring how much mathematical detail feels useful",
    codingFallback: "Still exploring comfort with coding and simulation tools",
    explanationFallback: "Open to different explanation styles",
    contextReadyOptionId: "comfortable",
  },
} satisfies PathfinderPreparationConfig;
