import type { HubOrientationQuestion } from "@/lib/hub-orientation";

export const hubOrientationQuestions: readonly HubOrientationQuestion[] = [
  {
    id: "broad-curiosity",
    kicker: "Question 1 · Broad curiosity",
    title: "Which scientific neighborhood would you most like to peek into?",
    guidance:
      "Choose the scene that makes you want to ask one more question. You do not need prior experience in it.",
    options: [
      {
        id: "molecular-health",
        label: "How molecules shape medicines and health",
        description:
          "Interactions among drugs, proteins, DNA, membranes, and their surroundings.",
        evidence: [
          {
            signalId: "motivation:molecular-health",
            label: "Molecules and health",
            weight: 3,
          },
        ],
      },
      {
        id: "energy-sustainability",
        label: "How matter captures, stores, or transforms energy",
        description:
          "Batteries, solar energy, catalysts, transport, and sustainable technologies.",
        evidence: [
          {
            signalId: "motivation:energy-sustainability",
            label: "Energy and sustainability",
            weight: 3,
          },
        ],
      },
      {
        id: "environment-earth",
        label: "How environmental and Earth systems change",
        description:
          "Atmospheres, oceans, climate, pollutants, and processes across scales.",
        evidence: [
          {
            signalId: "motivation:environment-earth",
            label: "Environment and Earth",
            weight: 3,
          },
        ],
      },
      {
        id: "materials-technology",
        label: "How new materials gain useful properties",
        description:
          "Electronic, structural, catalytic, energy, and soft materials.",
        evidence: [
          {
            signalId: "motivation:materials-technology",
            label: "Materials and technology",
            weight: 3,
          },
        ],
      },
      {
        id: "living-systems",
        label: "How living systems store information and function",
        description:
          "Biomolecules, cells, genomes, evolution, and biological networks.",
        evidence: [
          {
            signalId: "motivation:living-systems",
            label: "Living systems",
            weight: 3,
          },
        ],
      },
      {
        id: "fundamental-rules",
        label: "How fundamental rules create observable behavior",
        description:
          "Underlying chemical and physical principles, from electrons to complex systems.",
        evidence: [
          {
            signalId: "motivation:fundamental-rules",
            label: "Fundamental rules",
            weight: 3,
          },
        ],
      },
      {
        id: "space-universe",
        label: "How matter behaves in space and extreme environments",
        description:
          "Planets, interstellar chemistry, stars, galaxies, and the universe.",
        evidence: [
          {
            signalId: "motivation:space-universe",
            label: "Space and the universe",
            weight: 3,
          },
        ],
      },
      {
        id: "methods-computing",
        label: "How better computation can unlock science",
        description:
          "Algorithms, simulations, machine learning, and careful method evaluation.",
        evidence: [
          {
            signalId: "motivation:methods-computing",
            label: "Methods and computing",
            weight: 3,
          },
        ],
      },
    ],
  },
  {
    id: "preferred-system",
    kicker: "Question 2 · Research systems",
    title: "Which kind of system would you most enjoy zooming in on?",
    guidance:
      "Think about the object you would like to visualize, model, or collect evidence about—not what seems most impressive.",
    options: [
      {
        id: "molecules-electrons",
        label: "Molecules and electrons",
        description:
          "Structures, bonds, reactions, spectra, and charge behavior.",
        evidence: [
          {
            signalId: "system:molecules-electrons",
            label: "Molecules and electrons",
            weight: 3,
          },
        ],
      },
      {
        id: "materials-interfaces",
        label: "Materials and interfaces",
        description: "Solids, surfaces, defects, polymers, and devices.",
        evidence: [
          {
            signalId: "system:materials-interfaces",
            label: "Materials and interfaces",
            weight: 3,
          },
        ],
      },
      {
        id: "biomolecules-cells",
        label: "Biomolecules and cells",
        description:
          "Proteins, DNA, membranes, pathways, and cellular behavior.",
        evidence: [
          {
            signalId: "system:biomolecules-cells",
            label: "Biomolecules and cells",
            weight: 3,
          },
        ],
      },
      {
        id: "genes-populations",
        label: "Genes and populations",
        description:
          "Genomes, expression, evolution, ecosystems, and variation.",
        evidence: [
          {
            signalId: "system:genes-populations",
            label: "Genes and populations",
            weight: 3,
          },
        ],
      },
      {
        id: "fluids-continuous-media",
        label: "Fluids and continuous media",
        description: "Flows, turbulence, transport, atmospheres, and plasmas.",
        evidence: [
          {
            signalId: "system:fluids-continuous-media",
            label: "Fluids and continuous media",
            weight: 3,
          },
        ],
      },
      {
        id: "particles-fields",
        label: "Particles, waves, and fields",
        description:
          "Quantum systems, forces, radiation, matter, and the universe.",
        evidence: [
          {
            signalId: "system:particles-fields",
            label: "Particles and fields",
            weight: 3,
          },
        ],
      },
      {
        id: "networks-complex-systems",
        label: "Networks and complex systems",
        description:
          "Many interacting parts producing collective or nonlinear behavior.",
        evidence: [
          {
            signalId: "system:networks-complex-systems",
            label: "Networks and complex systems",
            weight: 3,
          },
        ],
      },
      {
        id: "multiple-scales",
        label: "Connections across several scales",
        description:
          "How small mechanisms build toward larger structure and function.",
        evidence: [
          {
            signalId: "system:multiple-scales",
            label: "Connections across scales",
            weight: 3,
          },
        ],
      },
    ],
  },
  {
    id: "question-style",
    kicker: "Question 3 · Research questions",
    title: "Which kind of research question sounds most satisfying?",
    guidance:
      "Imagine spending an afternoon making progress on one of these—not already knowing how to solve it.",
    options: [
      {
        id: "explain-mechanism",
        label: "Explain why something happens",
        description: "Trace a mechanism, interaction, or governing principle.",
        evidence: [
          {
            signalId: "question:explain-mechanism",
            label: "Explain why something happens",
            weight: 3,
          },
        ],
      },
      {
        id: "predict-behavior",
        label: "Predict what a system will do",
        description: "Estimate a property, response, trajectory, or outcome.",
        evidence: [
          {
            signalId: "question:predict-behavior",
            label: "Predict what a system will do",
            weight: 3,
          },
        ],
      },
      {
        id: "design-optimize",
        label: "Design or optimize something",
        description:
          "Search for a structure, condition, or parameter that works better.",
        evidence: [
          {
            signalId: "question:design-optimize",
            label: "Design or optimize something",
            weight: 3,
          },
        ],
      },
      {
        id: "interpret-evidence",
        label: "Interpret experimental or observed evidence",
        description:
          "Connect a model to measurements, images, spectra, or sequences.",
        evidence: [
          {
            signalId: "question:interpret-evidence",
            label: "Interpret evidence",
            weight: 3,
          },
        ],
      },
      {
        id: "compare-methods",
        label: "Compare computational methods",
        description: "Find where models agree, fail, or suit different tasks.",
        evidence: [
          {
            signalId: "question:compare-methods",
            label: "Compare computational methods",
            weight: 3,
          },
        ],
      },
      {
        id: "follow-dynamics",
        label: "Follow how a system changes over time",
        description:
          "Simulate motion, reaction, transport, evolution, or instability.",
        evidence: [
          {
            signalId: "question:follow-dynamics",
            label: "Follow change over time",
            weight: 3,
          },
        ],
      },
      {
        id: "find-data-patterns",
        label: "Find patterns hidden in data",
        description:
          "Use statistics or machine learning to discover relationships.",
        evidence: [
          {
            signalId: "question:find-data-patterns",
            label: "Find patterns in data",
            weight: 3,
          },
        ],
      },
      {
        id: "develop-theory",
        label: "Develop a fundamental model",
        description: "Build or test a mathematical description of a system.",
        evidence: [
          {
            signalId: "question:develop-theory",
            label: "Develop fundamental models",
            weight: 3,
          },
        ],
      },
    ],
  },
  {
    id: "working-style",
    kicker: "Question 4 · Working style",
    title: "Which set of tools would you be happiest learning to use?",
    guidance:
      "Choose the style that sounds rewarding, even if it is new to you. This is about curiosity, not current skill.",
    options: [
      {
        id: "chemical-mechanisms",
        label: "Chemical structures and mechanisms",
        description:
          "Reason with bonds, interactions, structures, and reaction steps.",
        evidence: [
          {
            signalId: "working-style:chemical-mechanisms",
            label: "Chemical structures and mechanisms",
            weight: 3,
          },
        ],
      },
      {
        id: "visual-models",
        label: "Visual models",
        description:
          "Learn through structures, trajectories, fields, and networks.",
        evidence: [
          {
            signalId: "working-style:visual-models",
            label: "Visual models",
            weight: 3,
          },
        ],
      },
      {
        id: "mathematical-models",
        label: "Mathematical models",
        description:
          "Turn assumptions into equations and analyze their consequences.",
        evidence: [
          {
            signalId: "working-style:mathematical-models",
            label: "Mathematical models",
            weight: 3,
          },
        ],
      },
      {
        id: "numerical-simulation",
        label: "Numerical simulation",
        description:
          "Run a model across conditions, scales, or time and inspect what changes.",
        evidence: [
          {
            signalId: "working-style:numerical-simulation",
            label: "Numerical simulation",
            weight: 3,
          },
        ],
      },
      {
        id: "coding-algorithms",
        label: "Coding and algorithms",
        description:
          "Build or adapt computational workflows and scientific software.",
        evidence: [
          {
            signalId: "working-style:coding-algorithms",
            label: "Coding and algorithms",
            weight: 3,
          },
        ],
      },
      {
        id: "data-statistics",
        label: "Data and statistics",
        description:
          "Measure patterns, uncertainty, and predictive relationships.",
        evidence: [
          {
            signalId: "working-style:data-statistics",
            label: "Data and statistics",
            weight: 3,
          },
        ],
      },
      {
        id: "method-comparison",
        label: "Careful method comparison",
        description: "Compare assumptions, accuracy, cost, and reliability.",
        evidence: [
          {
            signalId: "working-style:method-comparison",
            label: "Careful method comparison",
            weight: 3,
          },
        ],
      },
      {
        id: "mixed-toolkit",
        label: "A mixed scientific toolkit",
        description:
          "Move among concepts, code, mathematics, visualization, and data.",
        evidence: [
          {
            signalId: "working-style:mixed-toolkit",
            label: "A mixed scientific toolkit",
            weight: 3,
          },
        ],
      },
    ],
  },
  {
    id: "application-balance",
    kicker: "Question 5 · Research purpose",
    title: "What would make a project feel especially meaningful to you?",
    guidance:
      "Both kinds of work matter and often overlap. Choose the emphasis you would want at the beginning.",
    options: [
      {
        id: "practical-applications",
        label: "A connection to a concrete real-world goal",
        description:
          "I would like to see how the work could inform technology, health, energy, or the environment.",
        evidence: [
          {
            signalId: "motivation:practical-applications",
            label: "Practical applications",
            weight: 3,
          },
        ],
      },
      {
        id: "fundamental-understanding",
        label: "A deeper explanation of how nature works",
        description:
          "I would enjoy a project even when its main payoff is clearer fundamental understanding.",
        evidence: [
          {
            signalId: "motivation:fundamental-rules",
            label: "Fundamental understanding",
            weight: 3,
          },
        ],
      },
      {
        id: "balanced-purpose",
        label: "A balance of both",
        description:
          "I like fundamental insight and a possible application, without needing either to dominate.",
        evidence: [
          {
            signalId: "motivation:practical-applications",
            label: "Balanced practical and fundamental purpose",
            weight: 1,
          },
          {
            signalId: "motivation:fundamental-rules",
            label: "Balanced practical and fundamental purpose",
            weight: 1,
          },
        ],
      },
    ],
  },
];
