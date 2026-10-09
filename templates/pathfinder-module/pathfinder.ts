import type { PathfinderDefinition } from "@/lib/pathfinder-definition";
import {
  templatePathfinderIdentity,
  templatePathfinderStorage,
} from "@/templates/pathfinder-module/identity";
import { templatePathfinderIntro } from "@/templates/pathfinder-module/intro";
import {
  templateOpenExplorationIds,
  templatePathfinderNiches,
} from "@/templates/pathfinder-module/niches";
import { templatePreparation } from "@/templates/pathfinder-module/preparation";
import { templatePathfinderProfile } from "@/templates/pathfinder-module/profile";
import {
  templateBranchQuestionId,
  templateCalibrationQuestionIds,
  templatePathfinderQuestions,
  templateStageLabels,
} from "@/templates/pathfinder-module/questions";
import { templatePathfinderResults } from "@/templates/pathfinder-module/results";
import { templateRecommendationScoring } from "@/templates/pathfinder-module/scoring";

export const templatePathfinderDefinition = {
  identity: templatePathfinderIdentity,
  storage: templatePathfinderStorage,
  intro: templatePathfinderIntro,
  survey: {
    questions: templatePathfinderQuestions,
    stageLabels: templateStageLabels,
    branchQuestionId: templateBranchQuestionId,
    calibrationQuestionIds: templateCalibrationQuestionIds,
  },
  recommendations: {
    niches: templatePathfinderNiches,
    openExplorationIds: templateOpenExplorationIds,
    scoring: templateRecommendationScoring,
  },
  interdisciplinaryLinks: [],
  preparation: templatePreparation,
  results: templatePathfinderResults,
  profile: templatePathfinderProfile,
  contextLabels: {
    intro: "Template-science orientation",
    results: "Template-science exploration map",
    review: "Answer review",
  },
} satisfies PathfinderDefinition;
