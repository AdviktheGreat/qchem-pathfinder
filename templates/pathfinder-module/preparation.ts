import type { PathfinderPreparationConfig } from "@/lib/pathfinder-definition";

export const templatePreparation = {
  mathQuestionId: "template-math-comfort",
  codingQuestionId: "template-coding-comfort",
  explanationQuestionId: "template-explanation-style",
  mathAdvice: {
    comfortable:
      "Use equations to identify variables, assumptions, limiting cases, and quantities that can be checked.",
    guided:
      "Begin with a worked example that defines every symbol and connects each mathematical step to the system.",
    "concept-first":
      "Start from a diagram or concrete behavior, then add only the equations needed to explain what changes.",
    unsure:
      "Sample one visual explanation and one short equation-based example to discover which entry point helps most.",
  },
  codingAdvice: {
    enjoy:
      "Reproduce a small reference calculation, then change one input and explain why the output responds.",
    learning:
      "Use a guided notebook with a small dataset or model and annotate what each block contributes.",
    new: "Begin with an interactive model or a fully explained notebook before writing a workflow from scratch.",
    unsure:
      "Try one interactive tool and one short guided notebook, keeping the scientific question central.",
  },
  explanationGuides: {
    conceptual:
      "Orient yourself with the system, the main behavior, and one concrete example before technical details.",
    quantitative:
      "Look first for variables, a graph or equation, and the evidence connecting a calculation to a claim.",
    mixed:
      "Pair a conceptual explanation with one figure and one compact quantitative example.",
    unsure:
      "Use a mixed explanation first, then notice whether the story, visual, equation, or workflow helps most.",
  },
  supplementalAdvice: [],
  conceptOverlaps: [
    {
      umbrella: "Models, assumptions, and approximations",
      covered: ["Computational models", "Scientific approximations"],
    },
  ],
  knowledge: {
    memoryQuestionId: "template-starting-point",
    conceptQuestionId: "template-concepts",
    startingPointByAnswer: {
      new: "Begin with a concise map of the field’s systems, questions, evidence, and computational approaches.",
      recognize:
        "Connect familiar ideas to the specific models, evidence, and limitations used in your recommended direction.",
      comfortable:
        "Move from core concepts toward comparing assumptions, validation evidence, and open research questions.",
      unsure:
        "Start with a broad orientation and treat unfamiliar vocabulary as preparation—not a limit on what you can explore.",
    },
    defaultStartingPoint:
      "Begin with a broad orientation and one concrete research example.",
    conceptReviewLabels: {
      systems: "Systems, structures, and interactions",
      models: "Models, assumptions, and approximations",
      evidence: "Data, evidence, and uncertainty",
    },
    mathFallback:
      "Connect each equation to a variable, unit, assumption, and visible system behavior.",
    codingFallback:
      "Begin with a small reproducible example and change one input at a time.",
    explanationFallback:
      "Pair a conceptual overview with one figure and one quantitative example.",
    contextReadyOptionId: "comfortable",
  },
} satisfies PathfinderPreparationConfig;
