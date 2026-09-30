import { fitLabelDescriptions } from "@/data/fit-labels";
import {
  paperNoteTemplate,
  paperTypeGuide,
  queryGuidance,
} from "@/data/reading-guidance";
import type { PathfinderDefinition } from "@/lib/pathfinder-definition";
import { computationalMaterialsQuestions } from "@/data/pathfinders/computational-materials/questions";
import {
  materialsCodingPreparation,
  materialsExplanationGuides,
  materialsMathPreparation,
  materialsToolPreparation,
} from "@/data/pathfinders/computational-materials/preparation";

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
    questions: computationalMaterialsQuestions,
    stageLabels: {
      calibration: "Starting point",
      motivation: "What draws you in",
      narrowing: "Look a little closer",
      question: "Kinds of questions",
      style: "How you like to investigate",
    },
    branchQuestionId: "materials-motivation",
    calibrationQuestionIds: computationalMaterialsQuestions
      .filter((question) => question.stage === "calibration")
      .map((question) => question.id),
  },
  recommendations: {
    niches: [],
    openExplorationIds: [],
  },
  preparation: {
    mathQuestionId: "materials-math-comfort",
    codingQuestionId: "materials-coding-comfort",
    explanationQuestionId: "materials-explanation-style",
    mathAdvice: materialsMathPreparation,
    codingAdvice: materialsCodingPreparation,
    explanationGuides: materialsExplanationGuides,
    supplementalAdvice: [
      {
        questionId: "materials-tools-comfort",
        advice: materialsToolPreparation,
      },
    ],
    conceptOverlaps: [],
    knowledge: {
      memoryQuestionId: "materials-starting-point",
      conceptQuestionId: "materials-concept-familiarity",
      startingPointByAnswer: {
        new: "Begin with a concise map connecting atomic structure, bonding, and measurable material properties. New vocabulary is preparation—not a limit on what you can explore.",
        recognize:
          "Several ideas are recognizable. A short refresher on structures, phases, and property language will make the literature easier to enter.",
        comfortable:
          "Core materials ideas feel available; build from them while checking unfamiliar methods and details as needed.",
      },
      defaultStartingPoint:
        "Your current familiarity will shape preparation guidance, never which materials directions you are allowed to explore.",
      conceptReviewLabels: {
        "atomic-structure": "Atomic arrangements and material structure",
        bonding: "Bonding and how it influences material properties",
        crystals: "Crystal lattices, symmetry, and unit cells",
        phases: "Phases, energy, and material stability",
        properties: "Structure–property relationships",
      },
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
