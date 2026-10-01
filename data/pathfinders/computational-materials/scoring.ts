export const materialsScoringWeights = {
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

export const materialsRecommendationScoring = materialsScoringWeights.engine;

export const materialsSignalGroups = {
  interest: [
    "interest:energy-storage",
    "interest:energy-conversion",
    "interest:electronics",
    "interest:light",
    "interest:environment",
    "interest:catalysis",
    "interest:structural",
    "interest:soft-materials",
    "interest:fundamentals",
    "interest:data-discovery",
    "interest:open",
  ],
  application: [
    "application:energy",
    "application:sustainability",
    "application:health",
  ],
  researchQuestion: [
    "mode:explain",
    "mode:predict",
    "mode:compare",
    "mode:design",
    "mode:interpret",
    "mode:optimize",
    "mode:dynamics",
    "mode:data-discovery",
    "mode:theory",
  ],
  materialFamily: [
    "family:crystalline",
    "family:amorphous",
    "family:layered",
    "family:porous",
    "family:soft",
    "family:composite",
  ],
  phenomenon: [
    "phenomenon:electrons",
    "phenomenon:ions",
    "phenomenon:thermal",
    "phenomenon:optical",
    "phenomenon:magnetic",
    "phenomenon:mechanical",
    "phenomenon:surfaces",
    "phenomenon:chemical-change",
  ],
  researchStyle: [
    "purpose:fundamental",
    "purpose:applied",
    "scale:atomic",
    "scale:surface",
    "scale:microstructure",
    "scale:device",
    "scale:multiscale",
    "change:static",
    "change:dynamic",
    "connection:interpret",
    "connection:predict",
    "connection:feedback-loop",
    "connection:experiment",
    "connection:theory",
  ],
  workflow: [
    "medium:visual",
    "medium:equations",
    "medium:data",
    "style:coding",
    "style:compare",
    "style:data",
    "evidence:experiment",
  ],
} as const;

// These defaults deliberately span structure, application, and methods so an
// uncertain student receives genuinely different starting points.
export const materialsOpenExplorationIds = [
  "crystal-phase-stability",
  "porous-separation-storage",
  "method-potential-evaluation",
] as const;

export const materialsScoringPrinciples = [
  "Calibration answers only change preparation guidance; they never lower a direction’s score.",
  "A selected narrowing answer is stronger evidence than a broad motivation or incidental workflow preference.",
  "Uncertainty options contribute no signal or direct boost, preserving several possibilities.",
  "Conflicting preferences remain independent evidence and produce a deterministic ranked comparison.",
] as const;
