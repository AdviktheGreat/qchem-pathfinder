import type { SurveyQuestion } from "@/lib/types";
import {
  createPhysicsOpenOption,
  physicsUnsureOption,
} from "@/data/pathfinders/computational-physics/uncertainty-options";

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
  {
    id: "physics-motivation",
    stage: "motivation",
    kicker: "Follow your curiosity",
    title: "Which physical world would you most like to investigate?",
    prompt:
      "Choose the scenario that pulls you in today. This opens a route through the survey; it does not lock you into a field.",
    type: "single",
    options: [
      {
        id: "space-universe",
        label: "Stars, planets, galaxies, and gravity",
        description:
          "Model how structures form, objects move, signals travel, or extreme environments behave across space.",
        signals: { "interest:astrophysics": 3, "scale:cosmic": 2 },
      },
      {
        id: "fluids-weather",
        label: "Air, water, weather, and turbulent flow",
        description:
          "Explore how fluids move, mix, transport energy, and produce patterns from vortices to climate-scale circulation.",
        signals: { "interest:fluids": 3, "scale:continuum": 2 },
      },
      {
        id: "quantum-atoms",
        label: "Quantum behavior, atoms, and light",
        description:
          "Investigate states, measurement, wave-like behavior, information, or the interaction between matter and radiation.",
        signals: { "interest:quantum": 3, "scale:quantum": 2 },
      },
      {
        id: "matter-collective",
        label: "Materials, phases, and collective behavior",
        description:
          "Study how many interacting particles produce magnetism, superconductivity, unusual phases, or emergent patterns.",
        signals: { "interest:condensed": 3, "scale:many-body": 2 },
      },
      {
        id: "plasma-fusion",
        label: "Plasmas, fusion, and space weather",
        description:
          "Model charged matter, magnetic confinement, energetic particles, or the dynamics of the Sun and near-Earth space.",
        signals: { "interest:plasma": 3, "scale:continuum": 2 },
      },
      {
        id: "particles-nuclei",
        label: "Particles, nuclei, and detectors",
        description:
          "Examine fundamental interactions, nuclear structure, collisions, decays, or how detector signals reveal hidden events.",
        signals: {
          "interest:particle-nuclear": 3,
          "scale:subatomic": 2,
        },
      },
      {
        id: "complex-patterns",
        label: "Chaos, networks, and complex patterns",
        description:
          "Ask how simple rules create unpredictable motion, phase changes, collective behavior, or structure across many systems.",
        signals: { "interest:complex-systems": 3, "style:statistical": 2 },
      },
      {
        id: "methods-computing",
        label: "Algorithms, data, and better simulations",
        description:
          "Focus on how numerical methods, inverse problems, or scientific machine learning help physicists make reliable claims.",
        signals: { "interest:methods": 3, "style:computational": 2 },
      },
      createPhysicsOpenOption(
        "Show me several possibilities",
        "Keep multiple physical systems in play and use my later research-style answers to distinguish them.",
      ),
    ],
  },
  {
    id: "physics-question-kind",
    stage: "question",
    kicker: "The question behind the computation",
    title: "Which kind of research question sounds most satisfying?",
    prompt:
      "Imagine spending a few weeks on one project. Which goal would make the work feel worthwhile?",
    type: "single",
    options: [
      {
        id: "explain",
        label: "Explain why a physical pattern happens",
        description:
          "Use a model to uncover a mechanism, cause, or organizing principle behind an observation.",
        signals: { "mode:explain": 3, "style:interpretation": 2 },
      },
      {
        id: "predict",
        label: "Predict what a system will do",
        description:
          "Estimate an outcome, observable, stability limit, or response under new conditions.",
        signals: { "mode:predict": 3, "style:modeling": 2 },
      },
      {
        id: "dynamics",
        label: "Follow how a system changes over time",
        description:
          "Simulate motion, evolution, transport, relaxation, growth, or the onset of instability.",
        signals: { "mode:dynamics": 3, "style:simulation": 2 },
      },
      {
        id: "compare",
        label: "Compare models, algorithms, or approximations",
        description:
          "Test which computational choices are accurate, efficient, stable, or appropriate in different regimes.",
        signals: { "mode:compare": 3, "style:benchmarking": 2 },
      },
      {
        id: "infer",
        label: "Infer hidden physics from measurements or data",
        description:
          "Work backward from signals, images, observations, or noisy datasets to constrain a physical explanation.",
        signals: { "mode:infer": 3, "style:data": 2 },
      },
      {
        id: "design",
        label: "Design or optimize a physical system",
        description:
          "Search for shapes, settings, controls, or material behavior that achieve a useful outcome.",
        signals: { "mode:design": 3, "context:applied": 2 },
      },
      {
        id: "theory",
        label: "Probe a fundamental model or theoretical limit",
        description:
          "Explore the consequences of physical assumptions, symmetries, idealized systems, or extreme regimes.",
        signals: { "mode:theory": 3, "context:fundamental": 2 },
      },
      physicsUnsureOption,
    ],
  },
];
