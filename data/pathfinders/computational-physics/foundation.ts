import { computationalPhysicsIdentity } from "@/data/pathfinders/computational-physics/identity";
import { computationalPhysicsIntro } from "@/data/pathfinders/computational-physics/intro";
import { computationalPhysicsQuestions } from "@/data/pathfinders/computational-physics/questions";
import { computationalPhysicsStorage } from "@/data/pathfinders/computational-physics/storage";
import type {
  PathfinderDefinition,
  PathfinderSurveyConfig,
} from "@/lib/pathfinder-definition";

export const computationalPhysicsSurvey = {
  questions: computationalPhysicsQuestions,
  stageLabels: {
    calibration: "Starting point",
    motivation: "What draws you in",
    narrowing: "Look a little closer",
    question: "Kinds of questions",
    style: "How you like to investigate",
  },
  branchQuestionId: "physics-motivation",
  calibrationQuestionIds: computationalPhysicsQuestions
    .filter((question) => question.stage === "calibration")
    .map((question) => question.id),
} satisfies PathfinderSurveyConfig;

export const computationalPhysicsFoundation = {
  identity: computationalPhysicsIdentity,
  storage: computationalPhysicsStorage,
  survey: computationalPhysicsSurvey,
  intro: computationalPhysicsIntro,
} satisfies Pick<
  PathfinderDefinition,
  "identity" | "storage" | "survey" | "intro"
>;
