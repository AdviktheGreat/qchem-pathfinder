import { fitLabelDescriptions } from "@/data/fit-labels";
import {
  paperNoteTemplate,
  paperTypeGuide,
  queryGuidance,
} from "@/data/reading-guidance";
import type { PathfinderDefinition } from "@/lib/pathfinder-definition";

const preparationFallbacks = {
  unsure:
    "Begin with one guided example and notice which explanation helps you connect a material’s structure to its properties.",
};

export const computationalMaterialsPathfinder = {
  identity: {
    id: "computational-materials",
    name: "Computational Materials Pathfinder",
    shortName: "Computational materials",
    brandLabel: "Materials Research Pathfinder",
    ariaLabel: "Computational Materials Research Pathfinder",
    route: "/pathfinders/computational-materials",
    icon: "material",
  },
  storage: {
    key: "computational-materials-pathfinder:progress",
    version: 1,
  },
  survey: {
    questions: [],
    stageLabels: {
      calibration: "Starting point",
      motivation: "What draws you in",
      narrowing: "Look a little closer",
      question: "Kinds of questions",
      style: "How you like to investigate",
    },
    branchQuestionId: "materials-motivation",
    calibrationQuestionIds: [],
  },
  recommendations: {
    niches: [],
    openExplorationIds: [],
  },
  preparation: {
    mathQuestionId: "materials-math-comfort",
    codingQuestionId: "materials-coding-comfort",
    explanationQuestionId: "materials-explanation-style",
    mathAdvice: preparationFallbacks,
    codingAdvice: preparationFallbacks,
    explanationGuides: preparationFallbacks,
    conceptOverlaps: [],
    knowledge: {
      memoryQuestionId: "materials-starting-point",
      conceptQuestionId: "materials-concept-familiarity",
      startingPointByAnswer: {},
      defaultStartingPoint:
        "Your current familiarity will shape preparation guidance, never which materials directions you are allowed to explore.",
      conceptReviewLabels: {},
      mathFallback: "Still exploring how much mathematical detail feels useful",
      codingFallback: "Still exploring comfort with computational tools",
      explanationFallback: "Open to different explanation styles",
      contextReadyOptionId: "comfortable",
    },
  },
  results: {
    glossary: [],
    fitLabelDescriptions,
    queryGuidance,
    searchRefinements: [],
    paperTypeGuide,
    paperNoteTemplate,
  },
  profile: {
    researchStyleLabels: {},
    exportTitle: "COMPUTATIONAL MATERIALS EXPLORATION PROFILE",
    filenamePrefix: "computational-materials-profile",
    motivationQuestionId: "materials-motivation",
    questionTypeQuestionId: "materials-question-kind",
  },
  intro: {
    eyebrow: "A guided materials research exploration",
    title: "Find a computational materials direction worth exploring.",
    description:
      "Connect the materials and technologies that interest you with the scientific questions and modeling approaches used to study them.",
    durationLabel: "About 10 minutes",
    privacyLabel: "Answers stay on this device",
    noScoreLabel: "No scores or wrong answers",
  },
  contextLabels: {
    intro: "Materials orientation",
    results: "Materials exploration map",
    review: "Answer review",
  },
} satisfies PathfinderDefinition;
