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
  {
    id: "physics-condensed-focus",
    stage: "narrowing",
    kicker: "Narrow the collective behavior",
    title: "Which many-particle phenomenon would you investigate first?",
    prompt:
      "Choose the behavior you want to explain; the model can begin simple even when the collective physics is rich.",
    type: "single",
    visibleWhen: {
      questionId: "physics-motivation",
      anyOf: ["matter-collective"],
    },
    options: [
      {
        id: "magnetic-order",
        label: "Magnetic order, frustration, and spin patterns",
        description:
          "Use lattice interactions to see how local choices create or prevent collective order.",
        signals: { "topic:lattice-spin": 3, "mode:explain": 2 },
      },
      {
        id: "quantum-phases",
        label: "Correlated quantum phases and entanglement",
        description:
          "Investigate phases that require a combined many-particle quantum description.",
        signals: { "topic:quantum-many-body": 3, "scale:many-body": 2 },
      },
      {
        id: "critical-change",
        label: "Phase transitions and critical behavior",
        description:
          "Study how fluctuations and correlations grow as a system changes phase.",
        signals: { "topic:critical-phenomena": 3, "style:statistical": 2 },
      },
      {
        id: "driven-collective",
        label: "Driven, relaxing, or self-organizing matter",
        description:
          "Follow systems that transport, dissipate, or reorganize away from equilibrium.",
        signals: { "topic:nonequilibrium": 3, "mode:dynamics": 2 },
      },
      physicsUnsureOption,
    ],
  },
  {
    id: "physics-condensed-evidence",
    stage: "narrowing",
    kicker: "Choose the collective evidence",
    title:
      "Which pattern would most convince you that a collective state is present?",
    prompt:
      "Pick the diagnostic you would want to understand and test across model choices or system sizes.",
    type: "single",
    visibleWhen: {
      questionId: "physics-motivation",
      anyOf: ["matter-collective"],
    },
    options: [
      {
        id: "spin-configurations",
        label: "Spin configurations and magnetic correlations",
        description:
          "Relate local patterns and correlation lengths to ordered or frustrated behavior.",
        signals: { "topic:lattice-spin": 3, "evidence:fields": 2 },
      },
      {
        id: "entanglement-gap",
        label: "Entanglement, energy gaps, and quantum correlations",
        description:
          "Use several quantum diagnostics to distinguish candidate many-body phases.",
        signals: { "topic:quantum-many-body": 3, "style:mathematical": 2 },
      },
      {
        id: "size-collapse",
        label: "Data collapse and trends across system size",
        description:
          "Infer large-system critical behavior from multiple finite simulations.",
        signals: { "topic:critical-phenomena": 3, "mode:compare": 2 },
      },
      {
        id: "relaxation-current",
        label: "Relaxation times, currents, and rare fluctuations",
        description:
          "Interpret trajectories and distributions in a driven or changing system.",
        signals: { "topic:nonequilibrium": 3, "evidence:trajectories": 2 },
      },
      physicsUnsureOption,
    ],
  },
  {
    id: "physics-plasma-focus",
    stage: "narrowing",
    kicker: "Narrow the plasma system",
    title: "Which plasma environment would you investigate first?",
    prompt:
      "Choose where you would most like to connect charged-particle behavior with fields, flows, and observations.",
    type: "single",
    visibleWhen: {
      questionId: "physics-motivation",
      anyOf: ["plasma-fusion"],
    },
    options: [
      {
        id: "magnetic-fusion",
        label: "A hot plasma confined by magnetic fields",
        description:
          "Study stability, turbulence, and transport in tokamak or stellarator-like systems.",
        signals: { "topic:magnetic-fusion": 3, "mode:predict": 2 },
      },
      {
        id: "laser-plasma",
        label: "A rapidly compressed or laser-driven plasma",
        description:
          "Follow shocks, radiation, instabilities, and extreme energy deposition over short times.",
        signals: { "topic:high-energy-density": 3, "mode:dynamics": 2 },
      },
      {
        id: "sun-earth",
        label: "Solar eruptions traveling through space toward planets",
        description:
          "Connect Sun-scale magnetic activity with the solar wind and planetary environments.",
        signals: { "topic:space-weather": 3, "scale:stellar": 2 },
      },
      {
        id: "reconnection-region",
        label: "A thin region where magnetic energy reaches particles",
        description:
          "Zoom into kinetic plasma behavior, reconnection, acceleration, and heating.",
        signals: { "topic:kinetic-reconnection": 3, "scale:many-body": 2 },
      },
      physicsUnsureOption,
    ],
  },
  {
    id: "physics-plasma-evidence",
    stage: "narrowing",
    kicker: "Choose the plasma evidence",
    title: "Which plasma evidence would you most like to interpret?",
    prompt:
      "Pick the diagnostic that would make you want to compare a model with a physical system.",
    type: "single",
    visibleWhen: {
      questionId: "physics-motivation",
      anyOf: ["plasma-fusion"],
    },
    options: [
      {
        id: "confinement-profiles",
        label: "Temperature, density, and confinement profiles",
        description:
          "Compare transport and instability predictions with diagnostics from a magnetic device.",
        signals: { "topic:magnetic-fusion": 3, "evidence:experimental": 2 },
      },
      {
        id: "shock-compression",
        label: "Shock position, compression, and energy flow",
        description:
          "Track conservation and instability growth in an extreme laser-driven target.",
        signals: { "topic:high-energy-density": 3, "evidence:fields": 2 },
      },
      {
        id: "spacecraft-series",
        label: "Spacecraft time series and global field maps",
        description:
          "Relate sparse local measurements to a system-scale space-weather model.",
        signals: { "topic:space-weather": 3, "evidence:integrated": 2 },
      },
      {
        id: "particle-distributions",
        label: "Particle energy and velocity distributions",
        description:
          "Use non-fluid evidence to identify acceleration and heating near reconnection.",
        signals: {
          "topic:kinetic-reconnection": 3,
          "evidence:distributions": 2,
        },
      },
      physicsUnsureOption,
    ],
  },
  {
    id: "physics-particle-nuclear-focus",
    stage: "narrowing",
    kicker: "Narrow the subatomic question",
    title: "Which subatomic problem would you investigate first?",
    prompt:
      "Choose the link in the chain that interests you most—from fundamental theory to a measurable instrument signal.",
    type: "single",
    visibleWhen: {
      questionId: "physics-motivation",
      anyOf: ["particles-nuclei"],
    },
    options: [
      {
        id: "collision-events",
        label: "What particles and patterns a high-energy collision produces",
        description:
          "Generate event ensembles and compare signal distributions with physical backgrounds.",
        signals: { "topic:particle-events": 3, "mode:predict": 2 },
      },
      {
        id: "detector-signals",
        label: "How a detector signal reveals the original event",
        description:
          "Model particle transport, instrument response, reconstruction, efficiency, and bias.",
        signals: { "topic:detector-physics": 3, "mode:infer": 2 },
      },
      {
        id: "nuclear-structure",
        label: "How protons and neutrons form nuclear states and reactions",
        description:
          "Connect quantum many-body approximations with energy levels, decays, and reaction probabilities.",
        signals: { "topic:nuclear-physics": 3, "scale:subatomic": 2 },
      },
      {
        id: "fields-on-lattice",
        label: "How strongly interacting quantum fields behave on a lattice",
        description:
          "Sample field configurations and approach continuum predictions through controlled limits.",
        signals: { "topic:lattice-field": 3, "mode:theory": 2 },
      },
      physicsUnsureOption,
    ],
  },
  {
    id: "physics-particle-nuclear-evidence",
    stage: "narrowing",
    kicker: "Choose the subatomic evidence",
    title: "Which evidence would you most like to turn into a physical claim?",
    prompt:
      "Pick the evidence type whose assumptions, uncertainty, and interpretation you would want to understand.",
    type: "single",
    visibleWhen: {
      questionId: "physics-motivation",
      anyOf: ["particles-nuclei"],
    },
    options: [
      {
        id: "event-distributions",
        label: "Distributions across many simulated collision events",
        description:
          "Separate rare signal patterns from expected background and sampling variation.",
        signals: { "topic:particle-events": 3, "evidence:distributions": 2 },
      },
      {
        id: "response-resolution",
        label: "Detector efficiency, resolution, and reconstruction error",
        description:
          "Trace a known simulated event through instrument response to a recovered estimate.",
        signals: { "topic:detector-physics": 3, "style:benchmarking": 2 },
      },
      {
        id: "levels-cross-sections",
        label: "Nuclear energy levels, decay rates, or reaction probabilities",
        description:
          "Compare many-body and reaction calculations with measured nuclear observables.",
        signals: { "topic:nuclear-physics": 3, "evidence:spectra": 2 },
      },
      {
        id: "correlation-continuum",
        label: "Field correlations extrapolated toward physical limits",
        description:
          "Test sampling, lattice spacing, and finite-volume effects before interpreting an observable.",
        signals: { "topic:lattice-field": 3, "mode:compare": 2 },
      },
      physicsUnsureOption,
    ],
  },
  {
    id: "physics-complex-focus",
    stage: "narrowing",
    kicker: "Narrow the complex behavior",
    title: "Which kind of complex pattern would you investigate first?",
    prompt:
      "Choose the mechanism you want to uncover rather than the application area where it happens.",
    type: "single",
    visibleWhen: {
      questionId: "physics-motivation",
      anyOf: ["complex-patterns"],
    },
    options: [
      {
        id: "chaotic-transition",
        label: "A simple system becoming oscillatory or chaotic",
        description:
          "Map bifurcations, attractors, and sensitivity as a control parameter changes.",
        signals: { "topic:nonlinear-chaos": 3, "mode:dynamics": 2 },
      },
      {
        id: "network-collective",
        label: "A network producing synchronization, spreading, or cascades",
        description:
          "Separate the effect of interaction structure from the local dynamical rule.",
        signals: { "topic:network-dynamics": 3, "mode:explain": 2 },
      },
      {
        id: "critical-emergence",
        label: "Many parts collectively changing phase",
        description:
          "Use fluctuations, correlations, and finite-size trends to identify critical behavior.",
        signals: { "topic:critical-phenomena": 3, "scale:many-body": 2 },
      },
      {
        id: "driven-fluctuations",
        label: "A driven system relaxing, transporting, or switching",
        description:
          "Study stochastic trajectories, currents, steady states, and rare events away from equilibrium.",
        signals: { "topic:nonequilibrium": 3, "style:statistical": 2 },
      },
      physicsUnsureOption,
    ],
  },
  {
    id: "physics-complex-evidence",
    stage: "narrowing",
    kicker: "Choose the complex-systems evidence",
    title: "Which result would you most enjoy learning to interpret?",
    prompt:
      "Pick an output that could distinguish a physical pattern from noise, finite size, or numerical error.",
    type: "single",
    visibleWhen: {
      questionId: "physics-motivation",
      anyOf: ["complex-patterns"],
    },
    options: [
      {
        id: "phase-attractor",
        label: "A phase portrait, attractor, or bifurcation diagram",
        description:
          "Use geometry and long-time trajectories to classify nonlinear behavior.",
        signals: { "topic:nonlinear-chaos": 3, "style:visual": 2 },
      },
      {
        id: "topology-outcome",
        label: "Outcomes compared across different network structures",
        description:
          "Test whether topology changes spreading, synchronization, robustness, or cascades.",
        signals: { "topic:network-dynamics": 3, "mode:compare": 2 },
      },
      {
        id: "critical-scaling",
        label: "Scaling across system sizes near a transition",
        description:
          "Infer large-system behavior without mistaking one finite simulation for a proof.",
        signals: { "topic:critical-phenomena": 3, "style:mathematical": 2 },
      },
      {
        id: "trajectory-ensemble",
        label: "An ensemble of noisy trajectories and rare transitions",
        description:
          "Compare individual histories with distributions, averages, and event probabilities.",
        signals: { "topic:nonequilibrium": 3, "evidence:distributions": 2 },
      },
      physicsUnsureOption,
    ],
  },
];
