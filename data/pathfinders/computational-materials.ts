import { fitLabelDescriptions } from "@/data/fit-labels";
import type { PathfinderDefinition } from "@/lib/pathfinder-definition";
import { computationalMaterialsQuestions } from "@/data/pathfinders/computational-materials/questions";
import {
  materialsCodingPreparation,
  materialsExperimentPreparation,
  materialsExplanationGuides,
  materialsMathPreparation,
  materialsToolPreparation,
  materialsWorkflowPreparation,
} from "@/data/pathfinders/computational-materials/preparation";
import {
  materialsOpenExplorationIds,
  materialsRecommendationScoring,
} from "@/data/pathfinders/computational-materials/scoring";
import { computationalMaterialsNiches } from "@/data/pathfinders/computational-materials/niches";
import { materialsConceptOverlaps } from "@/data/pathfinders/computational-materials/concept-overlaps";
import { materialsGlossary } from "@/data/pathfinders/computational-materials/glossary";
import {
  materialsPaperNoteTemplate,
  materialsPaperTypeGuide,
  materialsQueryGuidance,
  materialsReadingCopy,
  materialsSearchRefinements,
} from "@/data/pathfinders/computational-materials/reading-guidance";

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
    niches: computationalMaterialsNiches,
    openExplorationIds: materialsOpenExplorationIds,
    scoring: materialsRecommendationScoring,
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
      {
        questionId: "materials-workflow",
        advice: materialsWorkflowPreparation,
      },
      {
        questionId: "materials-experiment-connection",
        advice: materialsExperimentPreparation,
      },
    ],
    conceptOverlaps: materialsConceptOverlaps,
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
    glossary: materialsGlossary,
    fitLabelDescriptions,
    queryGuidance: materialsQueryGuidance,
    searchRefinements: materialsSearchRefinements,
    paperTypeGuide: materialsPaperTypeGuide,
    paperNoteTemplate: materialsPaperNoteTemplate,
    overview: {
      eyebrow: "Your materials research coordinates",
      title: "A clear map of what you want to investigate",
      description:
        "These coordinates summarize the choices shaping your directions. They describe today’s starting point, not a permanent label.",
      dimensions: [
        {
          label: "Material family",
          questionId: "materials-family",
          fallback: "Open across material families",
        },
        {
          label: "Research target",
          questionId: "materials-question-kind",
          fallback: "Several kinds of research question",
        },
        {
          label: "Phenomenon",
          questionId: "materials-phenomena",
          fallback: "Several material behaviors",
        },
        {
          label: "Modeling scale",
          questionId: "materials-scale",
          fallback: "Open across modeling scales",
        },
      ],
    },
    primaryCopy: {
      eyebrow: "Your computational materials map",
      title: "A promising materials direction to investigate",
      description:
        "Use this as a well-supported starting point for reading and comparison—not as a final topic or a limit on what you can study.",
      contextSummary: "Beginner-friendly scientific orientation",
    },
    directionDetailsCopy: {
      questionsHeading: "Questions materials researchers ask",
      systemsHeading: "Materials, applications, and contexts",
      systemsDescription:
        "These examples connect the direction to material families, devices, and real operating settings you may meet in the literature.",
      approachesHeading: "How researchers model this direction",
      approachesDescription:
        "Each method answers a different kind of question or works at a different scale. You do not need to master these tools before you begin reading.",
    },
    fitEvidenceCopy: {
      matchedHeading: "Why this materials direction matched",
      startingHeading: "Why this is a useful direction to sample",
      explanationSummary: "Trace the recommendation to your answers",
      interestHeading: "Interest fit",
      styleHeading: "Research-style fit",
      transparentNote:
        "Interest choices and research-style choices are scored separately. Familiarity only changes the preparation guidance below—it never lowers a direction’s value or blocks it.",
      openInitially: true,
    },
    preparationCopy: {
      eyebrow: "Preparation is a bridge, not a gate",
      title: "Build the background while you explore",
      description:
        "Your starting familiarity changes which refreshers may help—not whether you belong in this direction. Use these as optional supports for your first papers.",
      conceptsHeading: "Materials concepts worth revisiting",
      firstStepHeading: "A realistic first modeling step",
    },
    alternativesCopy: {
      eyebrow: "Keep adjacent materials questions visible",
      title: "Two nearby directions worth comparing",
      matchedReasonLabel: "Why it also fits",
      sampleReasonLabel: "Why it is worth sampling",
      chooseActionLabel: "Explore this materials direction",
      comparisonHeading: "Compare the research emphasis",
      comparisonDescription:
        "Each difference statement compares the scientific focus—not the difficulty, importance, or quality of the direction.",
      detailOpenLabel: "See questions, methods, and searches",
      detailCloseLabel: "Hide questions, methods, and searches",
    },
    searchCopy: {
      keywordsHeading: "Starter materials keywords",
      keywordsDescription:
        "Combine a material family, a target property, and a modeling method to make these terms more specific.",
      synonymsLabel: "Related phrases used in materials literature",
      queriesHeading: "Three searches at different depths",
      queriesDescription:
        "Start broad enough to learn the field’s language, then move toward a material–property–method combination and a recent review.",
    },
    readingCopy: materialsReadingCopy,
    searchProviders: [
      {
        label: "Google Scholar",
        urlTemplate: "https://scholar.google.com/scholar?q={query}",
      },
      {
        label: "Semantic Scholar",
        urlTemplate: "https://www.semanticscholar.org/search?q={query}",
      },
    ],
    exportCopy: {
      eyebrow: "Take your materials map with you",
      title: "Computational materials exploration profile",
      description:
        "Copy or download this consistent plain-text profile for workshop notes and a later literature-search prompt kit. It contains no personal information.",
      copyLabel: "Copy materials profile",
      downloadLabel: "Download materials profile",
    },
  },
  profile: {
    researchStyleLabels: {
      "materials-family": "Material family",
      "materials-phenomena": "Material behaviors",
      "materials-purpose-balance": "Fundamental or applied emphasis",
      "materials-scale": "Modeling scale",
      "materials-change-style": "Static or changing systems",
      "materials-experiment-connection": "Connection to experiments",
      "materials-workflow": "Preferred evidence and tools",
    },
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
