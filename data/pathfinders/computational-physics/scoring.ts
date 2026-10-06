export const physicsScoringWeights = {
  signal: {
    contextual: 1,
    supporting: 2,
    strong: 3,
  },
  directBoost: {
    nearby: 2,
    supporting: 3,
    strong: 5,
    primary: 6,
  },
  engine: {
    directBoostMultiplier: 6,
    openInterestMultiplier: 0.75,
    uncertaintyBonus: 0.35,
  },
} as const;

export const physicsRecommendationScoring = physicsScoringWeights.engine;

// Keeping the vocabulary grouped here makes new survey signals easy to audit
// before they influence recommendations.
export const physicsSignalGroups = {
  interest: [
    "interest:astrophysics",
    "interest:fluids",
    "interest:quantum",
    "interest:condensed",
    "interest:plasma",
    "interest:particle-nuclear",
    "interest:complex-systems",
    "interest:methods",
  ],
  context: ["context:applied", "context:fundamental"],
  researchQuestion: [
    "mode:explain",
    "mode:predict",
    "mode:dynamics",
    "mode:compare",
    "mode:infer",
    "mode:design",
    "mode:theory",
  ],
  physicalScale: [
    "scale:subatomic",
    "scale:quantum",
    "scale:many-body",
    "scale:continuum",
    "scale:stellar",
    "scale:cosmic",
  ],
  evidence: [
    "evidence:trajectories",
    "evidence:fields",
    "evidence:spectra",
    "evidence:distributions",
    "evidence:experimental",
    "evidence:integrated",
  ],
  workflow: [
    "style:visual",
    "style:interpretation",
    "style:statistical",
    "style:coding",
    "style:simulation",
    "style:modeling",
    "style:benchmarking",
    "style:data",
    "style:mathematical",
    "style:computational",
  ],
  topic: [
    "topic:orbital-dynamics",
    "topic:astrodynamics",
    "topic:stellar-evolution",
    "topic:compact-objects",
    "topic:cosmological-structure",
    "topic:galaxy-evolution",
    "topic:turbulence",
    "topic:multiphase-transport",
    "topic:geophysical-flows",
    "topic:climate-modeling",
    "topic:quantum-control",
    "topic:open-quantum",
    "topic:quantum-many-body",
    "topic:lattice-spin",
    "topic:magnetic-fusion",
    "topic:high-energy-density",
    "topic:space-weather",
    "topic:kinetic-reconnection",
    "topic:particle-events",
    "topic:detector-physics",
    "topic:nuclear-physics",
    "topic:lattice-field",
    "topic:nonlinear-chaos",
    "topic:network-dynamics",
    "topic:critical-phenomena",
    "topic:nonequilibrium",
    "topic:numerical-methods",
    "topic:physics-ml-inverse",
  ],
} as const;

export const physicsOpenExplorationIds = [
  "orbital-n-body-dynamics",
  "phase-transitions-critical-phenomena",
  "numerical-methods-hpc-uncertainty",
] as const;

export const physicsScoringPrinciples = [
  "Calibration answers change preparation guidance, never the worth of a direction.",
  "A targeted narrowing answer is stronger evidence than a broad theme or incidental workflow preference.",
  "Uncertainty answers add no scoring evidence, keeping several directions open.",
  "Conflicting preferences remain independent evidence and produce a stable, balanced ranking.",
] as const;
