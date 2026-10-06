import { definePhysicsNiche } from "@/data/pathfinders/computational-physics/niche-defaults";

export const fluidDynamicsDirections = [
  definePhysicsNiche({
    id: "turbulence-coherent-structures",
    area: "Fluids and transport",
    name: "Turbulence & coherent structures",
    shortDescription:
      "Study how irregular fluid motion transfers energy while still producing recognizable vortices, jets, and patterns.",
    explanation:
      "Turbulent flow spans a wide range of interacting sizes and times, making direct calculation difficult. Researchers use resolved and approximate simulations to measure transport, identify coherent structures, and determine which conclusions survive changes in resolution and modeling assumptions.",
    questions: [
      "How does energy move between large and small flow structures?",
      "Which vortices or jets organize an otherwise irregular flow?",
      "When does an approximate turbulence model reproduce the quantities that matter?",
    ],
    systems: [
      "Flow through pipes and channels",
      "Jets and wakes",
      "Mixing layers",
      "Idealized atmospheric and oceanic flows",
    ],
    approaches: [
      {
        name: "Direct and large-eddy simulation",
        explanation:
          "Flow structures are resolved to different scales while smaller motions may be represented by an explicit model.",
      },
      {
        name: "Flow-field analysis",
        explanation:
          "Velocity, vorticity, energy spectra, and correlations reveal structures and transfer across scales.",
      },
      {
        name: "Resolution and model comparison",
        explanation:
          "Researchers compare grids and turbulence closures to learn which predictions are numerically and physically robust.",
      },
    ],
    concepts: [
      "Conservation of mass and momentum",
      "Viscosity and Reynolds number",
      "Vorticity and energy transfer",
      "Resolution and turbulence closure",
    ],
    preparation:
      "Begin with a two-dimensional flow around an obstacle or a driven fluid box. Visualize velocity and vorticity, then change the grid and viscosity before making claims about turbulence.",
    keywords: [
      "computational turbulence",
      "coherent flow structures",
      "direct numerical simulation",
      "large eddy simulation",
      "vorticity dynamics",
      "energy cascade",
      "turbulence closure",
    ],
    synonyms: [
      "numerical turbulence",
      "turbulent-flow simulation",
      "computational fluid turbulence",
    ],
    searches: {
      orientation: "computational turbulence coherent structures overview",
      focused:
        "large eddy simulation vorticity energy cascade resolution study",
      review: "recent review numerical turbulence simulation methods",
    },
    comparisonLens:
      "Compared with transport and multiphase flow, this direction centers the multiscale organization of irregular motion rather than a particular transported substance or interface.",
    explorationFriendly: true,
  }),
  definePhysicsNiche({
    id: "transport-multiphase-flow",
    area: "Fluids and transport",
    name: "Transport & multiphase flow",
    shortDescription:
      "Model how fluids carry heat or material and interact with bubbles, droplets, particles, or boundaries.",
    explanation:
      "Transport problems couple fluid motion to temperature, concentration, or additional phases. Computational work tracks how interfaces move, which processes dominate mixing, and whether a simplified model preserves the conservation laws and scales needed for the application.",
    questions: [
      "How quickly does a flowing fluid transport heat or a dissolved substance?",
      "What controls the breakup, merging, or motion of bubbles and droplets?",
      "Which boundary or interface treatment best preserves physical behavior?",
    ],
    systems: [
      "Heat exchangers and cooling flows",
      "Bubbles and droplets",
      "Sediment or particle-laden flow",
      "Porous media",
    ],
    approaches: [
      {
        name: "Advection–diffusion modeling",
        explanation:
          "Transport equations combine motion by the fluid with spreading by diffusion or conduction.",
      },
      {
        name: "Interface-capturing simulation",
        explanation:
          "Numerical methods represent moving boundaries between fluids without explicitly following every interface point.",
      },
      {
        name: "Dimensionless and conservation analysis",
        explanation:
          "Ratios of physical effects and conservation checks help interpret regimes and detect unreliable calculations.",
      },
    ],
    concepts: [
      "Advection and diffusion",
      "Heat and mass transfer",
      "Surface tension and interfaces",
      "Dimensionless numbers and conservation",
    ],
    preparation:
      "Start with dye or heat transported through a simple velocity field. Compare advection and diffusion, check total material or energy, and only then add a moving interface or second phase.",
    keywords: [
      "computational transport phenomena",
      "multiphase flow simulation",
      "advection diffusion",
      "interface capturing",
      "heat transfer modeling",
      "particle laden flow",
      "porous media flow",
    ],
    synonyms: [
      "coupled flow and transport",
      "numerical multiphase flow",
      "computational heat and mass transfer",
    ],
    searches: {
      orientation: "computational transport multiphase flow overview",
      focused:
        "advection diffusion interface capturing multiphase flow conservation",
      review: "recent review numerical methods multiphase transport",
    },
    comparisonLens:
      "Compared with turbulence and coherent structures, this direction emphasizes what a flow carries and how phases or interfaces interact.",
  }),
];
