import { fitLabelDescriptions } from "@/data/fit-labels";
import { computationalPhysicsFoundation } from "@/data/pathfinders/computational-physics/foundation";
import { physicsGlossary } from "@/data/pathfinders/computational-physics/glossary";
import { computationalPhysicsNiches } from "@/data/pathfinders/computational-physics/niches";
import { physicsPreparationConfig } from "@/data/pathfinders/computational-physics/preparation";
import { computationalPhysicsProfile } from "@/data/pathfinders/computational-physics/profile";
import {
  physicsPaperNoteTemplate,
  physicsPaperTypeGuide,
  physicsReadingCopy,
} from "@/data/pathfinders/computational-physics/reading-guidance";
import {
  physicsActionsCopy,
  physicsAlternativesCopy,
  physicsDirectionDetailsCopy,
  physicsExportCopy,
  physicsFitEvidenceCopy,
  physicsPreparationCopy,
  physicsPrimaryCopy,
  physicsQueryGuidance,
  physicsResultsOverview,
  physicsSearchCopy,
  physicsSearchProviders,
  physicsSearchRefinements,
} from "@/data/pathfinders/computational-physics/results";
import {
  physicsOpenExplorationIds,
  physicsRecommendationScoring,
} from "@/data/pathfinders/computational-physics/scoring";
import type { PathfinderDefinition } from "@/lib/pathfinder-definition";

export const computationalPhysicsPathfinder = {
  ...computationalPhysicsFoundation,
  recommendations: {
    niches: computationalPhysicsNiches,
    openExplorationIds: physicsOpenExplorationIds,
    scoring: physicsRecommendationScoring,
  },
  preparation: physicsPreparationConfig,
  results: {
    glossary: physicsGlossary,
    fitLabelDescriptions,
    queryGuidance: physicsQueryGuidance,
    searchRefinements: physicsSearchRefinements,
    paperTypeGuide: physicsPaperTypeGuide,
    paperNoteTemplate: physicsPaperNoteTemplate,
    overview: physicsResultsOverview,
    primaryCopy: physicsPrimaryCopy,
    directionDetailsCopy: physicsDirectionDetailsCopy,
    fitEvidenceCopy: physicsFitEvidenceCopy,
    preparationCopy: physicsPreparationCopy,
    alternativesCopy: physicsAlternativesCopy,
    searchCopy: physicsSearchCopy,
    readingCopy: physicsReadingCopy,
    searchProviders: physicsSearchProviders,
    exportCopy: physicsExportCopy,
    actionsCopy: physicsActionsCopy,
  },
  profile: computationalPhysicsProfile,
  contextLabels: {
    intro: "Physics orientation",
    results: "Physics exploration map",
    review: "Answer review",
  },
} satisfies PathfinderDefinition;
