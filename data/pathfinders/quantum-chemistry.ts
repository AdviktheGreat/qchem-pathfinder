import { conceptOverlaps } from "@/data/concept-overlaps";
import { openExplorationIds } from "@/data/exploration";
import { fitLabelDescriptions } from "@/data/fit-labels";
import { glossary } from "@/data/glossary";
import { niches } from "@/data/niches";
import {
  codingPreparation,
  explanationGuides,
  knowledgePreparation,
  mathPreparation,
} from "@/data/preparation";
import { researchStyleLabels } from "@/data/profile";
import { questions, stageLabels } from "@/data/questions";
import {
  paperNoteTemplate,
  paperTypeGuide,
  queryGuidance,
  searchRefinements,
} from "@/data/reading-guidance";
import type { PathfinderDefinition } from "@/lib/pathfinder-definition";

export const quantumChemistryPathfinder = {
  identity: {
    id: "quantum-chemistry",
    name: "Quantum Chemistry Pathfinder",
    shortName: "Quantum chemistry",
    brandLabel: "Quantum Research Pathfinder",
    ariaLabel: "Quantum Research Pathfinder",
    route: "/pathfinders/quantum-chemistry",
    icon: "atom",
  },
  storage: {
    key: "quantum-pathfinder:progress",
    version: 1,
  },
  survey: {
    questions,
    stageLabels,
    branchQuestionId: "motivation",
    calibrationQuestionIds: questions
      .filter((question) => question.stage === "calibration")
      .map((question) => question.id),
  },
  recommendations: {
    niches,
    openExplorationIds,
  },
  interdisciplinaryLinks: [],
  preparation: {
    mathQuestionId: "math-comfort",
    codingQuestionId: "coding-comfort",
    explanationQuestionId: "explanation-style",
    mathAdvice: mathPreparation,
    codingAdvice: codingPreparation,
    explanationGuides,
    supplementalAdvice: [],
    conceptOverlaps,
    knowledge: knowledgePreparation,
  },
  results: {
    glossary,
    fitLabelDescriptions,
    queryGuidance,
    searchRefinements,
    paperTypeGuide,
    paperNoteTemplate,
  },
  profile: {
    researchStyleLabels,
    exportTitle: "QUANTUM RESEARCH EXPLORATION PROFILE",
    filenamePrefix: "quantum-research-profile",
    motivationQuestionId: "motivation",
    questionTypeQuestionId: "question-kind",
  },
  intro: {
    eyebrow: "A guided research exploration",
    title: "Find a quantum chemistry direction worth looking into.",
    description:
      "You know the broad landscape. In about ten minutes, we’ll help you identify one promising quantum chemistry direction—and two nearby paths worth keeping open.",
    durationLabel: "About 10 minutes",
    privacyLabel: "Answers stay on this device",
    noScoreLabel: "No scores or wrong answers",
    promiseSteps: [
      {
        label: "Notice",
        text: "what naturally holds your attention.",
      },
      {
        label: "Narrow",
        text: "with a few questions shaped by your choices.",
      },
      {
        label: "Launch",
        text: "into the literature with useful search terms.",
      },
    ],
    branchingNote:
      "Your answers shape the next questions, not a hidden personality label.",
  },
  contextLabels: {
    intro: "Research orientation",
    results: "Exploration map",
    review: "Answer review",
  },
} satisfies PathfinderDefinition;
