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
    eyebrow: "A guided computational materials exploration",
    title: "Find a materials direction worth reading about.",
    description:
      "Start with the materials, properties, and technologies that catch your attention. We’ll connect that curiosity to the kinds of questions computational materials researchers investigate.",
    scopeNote:
      "You’ll leave with one promising sub-niche, two nearby alternatives, and practical language for beginning a literature search—not a final research question or a verdict about what you should study.",
    durationLabel: "About 10 minutes",
    privacyLabel: "Saved only in this browser",
    noScoreLabel: "Experience changes guidance, not access",
    privacyNote:
      "No account or personal information is requested. Your answers are stored in this browser so you can refresh and return; the pathfinder does not transmit them to a server.",
    promiseSteps: [
      {
        label: "Notice",
        text: "which materials, properties, and technologies hold your attention.",
      },
      {
        label: "Narrow",
        text: "toward a material family, scientific phenomenon, and modeling scale.",
      },
      {
        label: "Launch",
        text: "into the literature with useful vocabulary and search queries.",
      },
    ],
    branchingNote:
      "Your answers shape the follow-up questions and reading directions—not an ability score or a hidden personality label.",
  },
  contextLabels: {
    intro: "Materials orientation",
    results: "Materials exploration map",
    review: "Answer review",
  },
} satisfies PathfinderDefinition;
