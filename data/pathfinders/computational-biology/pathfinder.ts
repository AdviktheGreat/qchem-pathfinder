import { fitLabelDescriptions } from "@/data/fit-labels";
import { computationalBiologyFoundation } from "@/data/pathfinders/computational-biology/foundation";
import { biologyGlossary } from "@/data/pathfinders/computational-biology/glossary";
import { computationalBiologyNiches } from "@/data/pathfinders/computational-biology/niches";
import { biologyPreparationConfig } from "@/data/pathfinders/computational-biology/preparation";
import { computationalBiologyProfile } from "@/data/pathfinders/computational-biology/profile";
import {
  biologyPaperNoteTemplate,
  biologyPaperTypeGuide,
  biologyReadingCopy,
} from "@/data/pathfinders/computational-biology/reading-guidance";
import {
  biologyActionsCopy,
  biologyAlternativesCopy,
  biologyDirectionDetailsCopy,
  biologyFitEvidenceCopy,
  biologyPreparationCopy,
  biologyPrimaryCopy,
  biologyQueryGuidance,
  biologyResultsOverview,
  biologySearchCopy,
  biologySearchProviders,
  biologySearchRefinements,
  biologyExportCopy,
} from "@/data/pathfinders/computational-biology/results";
import {
  biologyOpenExplorationIds,
  biologyRecommendationScoring,
} from "@/data/pathfinders/computational-biology/scoring";
import type { PathfinderDefinition } from "@/lib/pathfinder-definition";

export const computationalBiologyPathfinder = {
  ...computationalBiologyFoundation,
  recommendations: {
    niches: computationalBiologyNiches,
    openExplorationIds: biologyOpenExplorationIds,
    scoring: biologyRecommendationScoring,
  },
  preparation: biologyPreparationConfig,
  results: {
    glossary: biologyGlossary,
    fitLabelDescriptions,
    queryGuidance: biologyQueryGuidance,
    searchRefinements: biologySearchRefinements,
    paperTypeGuide: biologyPaperTypeGuide,
    paperNoteTemplate: biologyPaperNoteTemplate,
    overview: biologyResultsOverview,
    primaryCopy: biologyPrimaryCopy,
    directionDetailsCopy: biologyDirectionDetailsCopy,
    fitEvidenceCopy: biologyFitEvidenceCopy,
    preparationCopy: biologyPreparationCopy,
    alternativesCopy: biologyAlternativesCopy,
    searchCopy: biologySearchCopy,
    readingCopy: biologyReadingCopy,
    searchProviders: biologySearchProviders,
    exportCopy: biologyExportCopy,
    actionsCopy: biologyActionsCopy,
  },
  profile: computationalBiologyProfile,
  contextLabels: {
    intro: "Biology orientation",
    results: "Biology exploration map",
    review: "Answer review",
  },
} satisfies PathfinderDefinition;
