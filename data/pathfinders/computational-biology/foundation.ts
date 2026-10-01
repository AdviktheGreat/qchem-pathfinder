import { computationalBiologyIdentity } from "@/data/pathfinders/computational-biology/identity";
import { computationalBiologyIntro } from "@/data/pathfinders/computational-biology/intro";
import { computationalBiologyQuestions } from "@/data/pathfinders/computational-biology/questions";
import { computationalBiologyStorage } from "@/data/pathfinders/computational-biology/storage";
import type {
  PathfinderDefinition,
  PathfinderSurveyConfig,
} from "@/lib/pathfinder-definition";

export const computationalBiologySurvey = {
  questions: computationalBiologyQuestions,
  stageLabels: {
    calibration: "Starting point",
    motivation: "What draws you in",
    narrowing: "Look a little closer",
    question: "Kinds of questions",
    style: "How you like to investigate",
  },
  branchQuestionId: "biology-motivation",
  calibrationQuestionIds: computationalBiologyQuestions
    .filter((question) => question.stage === "calibration")
    .map((question) => question.id),
} satisfies PathfinderSurveyConfig;

export const computationalBiologyFoundation = {
  identity: computationalBiologyIdentity,
  storage: computationalBiologyStorage,
  survey: computationalBiologySurvey,
  intro: computationalBiologyIntro,
} satisfies Pick<
  PathfinderDefinition,
  "identity" | "storage" | "survey" | "intro"
>;
