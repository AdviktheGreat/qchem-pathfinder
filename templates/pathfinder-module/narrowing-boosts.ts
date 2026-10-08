import { templateScoringWeights } from "@/templates/pathfinder-module/scoring";

const { directBoost } = templateScoringWeights;

export const templateNarrowingBoosts = {
  systemsScale: {
    small: { "interacting-system-dynamics": directBoost.primary },
    collective: { "collective-emergent-behavior": directBoost.primary },
    "multi-scale": {
      "interacting-system-dynamics": directBoost.supporting,
      "collective-emergent-behavior": directBoost.supporting,
    },
  },
  systemsBehavior: {
    stability: { "interacting-system-dynamics": directBoost.primary },
    emergence: { "collective-emergent-behavior": directBoost.primary },
    response: { "interacting-system-dynamics": directBoost.strong },
  },
  dataEvidence: {
    measurements: { "data-driven-forecasting": directBoost.strong },
    images: { "evidence-pattern-inference": directBoost.primary },
    distributions: { "evidence-pattern-inference": directBoost.strong },
  },
  dataGoal: {
    infer: { "evidence-pattern-inference": directBoost.primary },
    classify: { "evidence-pattern-inference": directBoost.strong },
    forecast: { "data-driven-forecasting": directBoost.primary },
  },
  methodsFocus: {
    accuracy: { "computational-method-evaluation": directBoost.primary },
    efficiency: { "efficient-scientific-computing": directBoost.primary },
    interpretability: {
      "computational-method-evaluation": directBoost.strong,
    },
  },
  methodsComparison: {
    algorithms: { "efficient-scientific-computing": directBoost.strong },
    resolution: { "efficient-scientific-computing": directBoost.strong },
    validation: { "computational-method-evaluation": directBoost.primary },
  },
  openContext: {
    familiar: { "interacting-system-dynamics": directBoost.nearby },
    surprising: { "collective-emergent-behavior": directBoost.nearby },
    methods: { "computational-method-evaluation": directBoost.nearby },
  },
  openSample: {
    visual: { "evidence-pattern-inference": directBoost.nearby },
    question: { "interacting-system-dynamics": directBoost.nearby },
    workflow: { "efficient-scientific-computing": directBoost.nearby },
  },
} as const;
