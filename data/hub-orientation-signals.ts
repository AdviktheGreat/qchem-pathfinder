import type { HubOrientationSignalDefinition } from "@/lib/hub-orientation";

export const hubMotivationSignals = [
  {
    id: "motivation:molecular-health",
    dimension: "motivation",
    label: "Molecules and health",
    description:
      "Understand molecular interactions that shape medicines, biomolecules, or health-related systems.",
  },
  {
    id: "motivation:energy-sustainability",
    dimension: "motivation",
    label: "Energy and sustainability",
    description:
      "Investigate how matter can capture, store, transform, or use energy more effectively.",
  },
  {
    id: "motivation:environment-earth",
    dimension: "motivation",
    label: "Environment and Earth",
    description:
      "Explore molecular or physical processes in atmospheres, oceans, climate, or environmental systems.",
  },
  {
    id: "motivation:materials-technology",
    dimension: "motivation",
    label: "Materials and technology",
    description:
      "Connect structure and behavior to useful electronic, structural, catalytic, or soft materials.",
  },
  {
    id: "motivation:living-systems",
    dimension: "motivation",
    label: "Living systems",
    description:
      "Use computation to understand biological molecules, cells, genomes, populations, or disease mechanisms.",
  },
  {
    id: "motivation:fundamental-rules",
    dimension: "motivation",
    label: "Fundamental rules",
    description:
      "Ask how underlying physical or chemical principles produce the behavior we observe.",
  },
  {
    id: "motivation:space-universe",
    dimension: "motivation",
    label: "Space and the universe",
    description:
      "Study matter, dynamics, or chemical processes in planets, stars, galaxies, or extreme environments.",
  },
  {
    id: "motivation:methods-computing",
    dimension: "motivation",
    label: "Methods and computing",
    description:
      "Improve algorithms, simulations, data methods, or approximations used to answer scientific questions.",
  },
] as const satisfies readonly HubOrientationSignalDefinition[];

export const hubSystemSignals = [
  {
    id: "system:molecules-electrons",
    dimension: "system",
    label: "Molecules and electrons",
    description:
      "Focus on molecular structure, bonding, reactions, spectra, or electron behavior.",
  },
  {
    id: "system:materials-interfaces",
    dimension: "system",
    label: "Materials and interfaces",
    description:
      "Study solids, surfaces, defects, polymers, devices, and the boundaries between materials.",
  },
  {
    id: "system:biomolecules-cells",
    dimension: "system",
    label: "Biomolecules and cells",
    description:
      "Investigate proteins, nucleic acids, membranes, molecular networks, or cellular behavior.",
  },
  {
    id: "system:genes-populations",
    dimension: "system",
    label: "Genes and populations",
    description:
      "Work with genomes, expression patterns, evolution, ecosystems, or population-level biological data.",
  },
  {
    id: "system:fluids-continuous-media",
    dimension: "system",
    label: "Fluids and continuous media",
    description:
      "Explore flows, turbulence, transport, climate, plasmas, or other systems described across space and time.",
  },
  {
    id: "system:particles-fields",
    dimension: "system",
    label: "Particles and fields",
    description:
      "Examine quantum systems, forces, waves, particles, fields, or the large-scale universe.",
  },
  {
    id: "system:networks-complex-systems",
    dimension: "system",
    label: "Networks and complex systems",
    description:
      "Ask how many interacting parts create collective, emergent, or nonlinear behavior.",
  },
  {
    id: "system:multiple-scales",
    dimension: "system",
    label: "Connections across scales",
    description:
      "Link small-scale mechanisms to larger structures, functions, or observable behavior.",
  },
] as const satisfies readonly HubOrientationSignalDefinition[];

export const hubQuestionSignals = [
  {
    id: "question:explain-mechanism",
    dimension: "question",
    label: "Explain why something happens",
    description:
      "Trace the mechanism, interaction, or physical principle behind an observed behavior.",
  },
  {
    id: "question:predict-behavior",
    dimension: "question",
    label: "Predict what a system will do",
    description:
      "Use a model to estimate properties, outcomes, trajectories, or responses before they are measured.",
  },
  {
    id: "question:design-optimize",
    dimension: "question",
    label: "Design or optimize something",
    description:
      "Search for structures, conditions, or parameters that improve a useful behavior.",
  },
  {
    id: "question:interpret-evidence",
    dimension: "question",
    label: "Interpret evidence",
    description:
      "Connect simulations or models to spectra, images, measurements, sequences, or other observations.",
  },
  {
    id: "question:compare-methods",
    dimension: "question",
    label: "Compare computational methods",
    description:
      "Test when models agree, where approximations fail, and which method suits a scientific task.",
  },
  {
    id: "question:follow-dynamics",
    dimension: "question",
    label: "Follow change over time",
    description:
      "Simulate reactions, motion, transport, evolution, or other time-dependent behavior.",
  },
  {
    id: "question:find-data-patterns",
    dimension: "question",
    label: "Find patterns in data",
    description:
      "Use statistics or machine learning to discover structure, relationships, or predictive signals.",
  },
  {
    id: "question:develop-theory",
    dimension: "question",
    label: "Develop fundamental models",
    description:
      "Build or evaluate mathematical descriptions of how a class of systems behaves.",
  },
] as const satisfies readonly HubOrientationSignalDefinition[];
