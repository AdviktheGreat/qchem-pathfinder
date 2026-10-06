import { physicsUnsureOption } from "@/data/pathfinders/computational-physics/uncertainty-options";
import type { SurveyQuestion } from "@/lib/types";

export const computationalPhysicsAdaptiveQuestions: SurveyQuestion[] = [
  {
    id: "physics-astrophysics-focus",
    stage: "narrowing",
    kicker: "Narrow the cosmic system",
    title: "Which space-based system would you investigate first?",
    prompt:
      "Choose the physical system that makes you most curious; a later question will distinguish the kind of evidence you want to use.",
    type: "single",
    visibleWhen: {
      questionId: "physics-motivation",
      anyOf: ["space-universe"],
    },
    options: [
      {
        id: "natural-orbits",
        label: "Planets, moons, asteroids, or star clusters in motion",
        description:
          "Follow gravitational interactions, resonances, close encounters, and long-term stability.",
        signals: { "topic:orbital-dynamics": 3, "mode:dynamics": 2 },
      },
      {
        id: "mission-trajectories",
        label: "Spacecraft paths shaped by several gravitating bodies",
        description:
          "Search for transfers, gravity assists, and robust trajectories under practical constraints.",
        signals: { "topic:astrodynamics": 3, "mode:design": 2 },
      },
      {
        id: "stellar-lifecycles",
        label: "How stars change across their lifetimes",
        description:
          "Connect gravity, pressure, energy generation, and composition to observable stellar evolution.",
        signals: { "topic:stellar-evolution": 3, "scale:stellar": 2 },
      },
      {
        id: "extreme-stars",
        label: "Exploding stars, neutron stars, or black-hole environments",
        description:
          "Study rapid, extreme events where gravity, fluids, radiation, and magnetic fields interact.",
        signals: { "topic:compact-objects": 3, "mode:dynamics": 2 },
      },
      physicsUnsureOption,
    ],
  },
  {
    id: "physics-astrophysics-evidence",
    stage: "narrowing",
    kicker: "Choose the cosmic evidence",
    title: "Which cosmic pattern would you most like a simulation to explain?",
    prompt:
      "Pick the output or observation you would want to connect back to a physical model.",
    type: "single",
    visibleWhen: {
      questionId: "physics-motivation",
      anyOf: ["space-universe"],
    },
    options: [
      {
        id: "orbital-architecture",
        label: "The arrangement and stability of an orbital system",
        description:
          "Compare trajectories, conserved quantities, and nearby initial conditions over long times.",
        signals: { "topic:orbital-dynamics": 3, "evidence:trajectories": 2 },
      },
      {
        id: "stellar-observables",
        label: "A star’s brightness, temperature, composition, or oscillations",
        description:
          "Use observations to constrain internal structure, age, and uncertain stellar physics.",
        signals: { "topic:stellar-evolution": 3, "evidence:spectra": 2 },
      },
      {
        id: "cosmic-web",
        label: "The web of halos, clusters, filaments, and voids",
        description:
          "Summarize enormous simulated volumes with clustering and spatial statistics.",
        signals: { "topic:cosmological-structure": 3, "scale:cosmic": 2 },
      },
      {
        id: "galaxy-histories",
        label: "How individual galaxies assemble and change",
        description:
          "Connect gas, stars, feedback, mergers, and dark-matter environments to galaxy observations.",
        signals: { "topic:galaxy-evolution": 3, "mode:explain": 2 },
      },
      physicsUnsureOption,
    ],
  },
  {
    id: "physics-fluids-focus",
    stage: "narrowing",
    kicker: "Narrow the flow",
    title: "Which moving-fluid problem would you investigate first?",
    prompt:
      "Choose the system where you would most enjoy connecting visible patterns to governing physics.",
    type: "single",
    visibleWhen: {
      questionId: "physics-motivation",
      anyOf: ["fluids-weather"],
    },
    options: [
      {
        id: "turbulent-structures",
        label: "Vortices, jets, wakes, and turbulent structures",
        description:
          "Ask how irregular motion organizes and transfers energy across scales.",
        signals: { "topic:turbulence": 3, "evidence:fields": 2 },
      },
      {
        id: "transport-interfaces",
        label: "Heat, material, bubbles, droplets, or particles in flow",
        description:
          "Study what a fluid carries and how interfaces or additional phases change transport.",
        signals: { "topic:multiphase-transport": 3, "mode:predict": 2 },
      },
      {
        id: "weather-ocean",
        label: "Weather systems, ocean currents, and rotating flows",
        description:
          "Connect rotation, stratification, waves, and instability to large-scale circulation.",
        signals: { "topic:geophysical-flows": 3, "scale:continuum": 2 },
      },
      {
        id: "climate-coupling",
        label: "Long-term interactions across the climate system",
        description:
          "Explore feedbacks among atmosphere, ocean, land, ice, and radiation with ensembles.",
        signals: { "topic:climate-modeling": 3, "evidence:integrated": 2 },
      },
      physicsUnsureOption,
    ],
  },
  {
    id: "physics-fluids-evidence",
    stage: "narrowing",
    kicker: "Choose the flow evidence",
    title: "What would you most want to inspect in a fluid simulation?",
    prompt:
      "Different outputs reveal different mechanisms. Choose the evidence you would want to learn to interpret first.",
    type: "single",
    visibleWhen: {
      questionId: "physics-motivation",
      anyOf: ["fluids-weather"],
    },
    options: [
      {
        id: "vorticity-spectrum",
        label: "Vorticity maps and energy across scales",
        description:
          "Use spatial structures and spectra to understand turbulent organization and transfer.",
        signals: { "topic:turbulence": 3, "style:statistical": 2 },
      },
      {
        id: "conservation-transport",
        label: "Heat or material budgets through a system",
        description:
          "Track conservation, fluxes, and the balance between advection and diffusion.",
        signals: { "topic:multiphase-transport": 3, "mode:explain": 2 },
      },
      {
        id: "circulation-tracers",
        label: "Circulation patterns and moving tracers",
        description:
          "Follow currents, waves, and transported quantities in a rotating or stratified fluid.",
        signals: { "topic:geophysical-flows": 3, "evidence:trajectories": 2 },
      },
      {
        id: "ensemble-feedbacks",
        label: "Ensemble spread and physical feedbacks",
        description:
          "Separate robust response, internal variability, and assumptions across climate-model runs.",
        signals: { "topic:climate-modeling": 3, "style:statistical": 2 },
      },
      physicsUnsureOption,
    ],
  },
  {
    id: "physics-quantum-focus",
    stage: "narrowing",
    kicker: "Narrow the quantum system",
    title: "Which quantum behavior would you investigate first?",
    prompt:
      "Choose a physical question, not a test of prior quantum knowledge. Each can be approached from a small, teachable model.",
    type: "single",
    visibleWhen: {
      questionId: "physics-motivation",
      anyOf: ["quantum-atoms"],
    },
    options: [
      {
        id: "driven-control",
        label: "Steer a quantum state with a changing field",
        description:
          "Follow coherent time evolution and design pulses that prepare or move a state.",
        signals: { "topic:quantum-control": 3, "mode:design": 2 },
      },
      {
        id: "noise-decoherence",
        label: "Understand noise, decoherence, and environmental coupling",
        description:
          "Model how an imperfectly isolated quantum system relaxes or loses coherence.",
        signals: { "topic:open-quantum": 3, "mode:explain": 2 },
      },
      {
        id: "interacting-quantum",
        label: "Explore collective phases of interacting quantum particles",
        description:
          "Ask how correlation and entanglement produce behavior absent from one particle alone.",
        signals: { "topic:quantum-many-body": 3, "scale:many-body": 2 },
      },
      {
        id: "quantum-magnetism",
        label: "Use lattice and spin models to study quantum magnetism",
        description:
          "Connect local interactions and geometry with ordering, frustration, and fluctuations.",
        signals: { "topic:lattice-spin": 3, "mode:theory": 2 },
      },
      physicsUnsureOption,
    ],
  },
  {
    id: "physics-quantum-evidence",
    stage: "narrowing",
    kicker: "Choose the quantum evidence",
    title: "Which quantum output would you most like to interpret?",
    prompt:
      "Pick the evidence that would help you decide whether a model explains the behavior you care about.",
    type: "single",
    visibleWhen: {
      questionId: "physics-motivation",
      anyOf: ["quantum-atoms"],
    },
    options: [
      {
        id: "state-populations",
        label: "State populations and fidelity changing over time",
        description:
          "Judge whether a driven protocol reaches its target and remains robust to imperfect settings.",
        signals: { "topic:quantum-control": 3, "evidence:trajectories": 2 },
      },
      {
        id: "coherence-decay",
        label: "Coherence, relaxation, and noisy quantum trajectories",
        description:
          "Compare ideal evolution with environmental models and stochastic histories.",
        signals: { "topic:open-quantum": 3, "evidence:distributions": 2 },
      },
      {
        id: "correlations-entanglement",
        label: "Correlations and entanglement across a quantum system",
        description:
          "Use collective diagnostics to distinguish phases and many-body behavior.",
        signals: { "topic:quantum-many-body": 3, "style:mathematical": 2 },
      },
      {
        id: "magnetization-fluctuations",
        label: "Magnetization, fluctuations, and finite-size patterns",
        description:
          "Compare lattice sizes and sampling behavior to interpret collective order.",
        signals: { "topic:lattice-spin": 3, "style:statistical": 2 },
      },
      physicsUnsureOption,
    ],
  },
];
