import type { RecommendationScoringConfig } from "@/lib/recommendation";

export const templateScoringWeights = {
  signal: {
    supporting: 1,
    meaningful: 2,
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

export const templateRecommendationScoring =
  templateScoringWeights.engine satisfies RecommendationScoringConfig;

// Keep the vocabulary grouped so a reviewer can audit every preference signal
// before it influences a recommendation.
export const templateSignalGroups = {
  interest: ["interest:systems", "interest:data", "interest:methods"],
  researchQuestion: ["mode:explain", "mode:predict", "mode:compare"],
  workflow: ["style:visual", "style:mathematical", "style:computational"],
  narrowing: [
    "scale:small",
    "scale:collective",
    "scale:multi",
    "evidence:measurements",
    "evidence:images",
    "evidence:distributions",
    "method:accuracy",
    "method:efficiency",
    "method:interpretability",
  ],
} as const;
