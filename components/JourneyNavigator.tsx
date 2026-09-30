import { Check } from "lucide-react";
import type { AnswerMap, SurveyQuestion, SurveyStage } from "@/lib/types";
import { StageIcon } from "@/components/StageIcon";
import type { StageLabels } from "@/lib/pathfinder-definition";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";

const stageOrder: SurveyStage[] = [
  "calibration",
  "motivation",
  "narrowing",
  "question",
  "style",
];

export function JourneyNavigator({
  currentStage,
  questions,
  answers,
  stageLabels = quantumChemistryPathfinder.survey.stageLabels,
}: {
  currentStage: SurveyStage;
  questions: readonly SurveyQuestion[];
  answers: AnswerMap;
  stageLabels?: StageLabels;
}) {
  const currentStageIndex = stageOrder.indexOf(currentStage);

  return (
    <nav className="journey-nav" aria-label="Survey stages">
      <p className="journey-mobile-label">
        <StageIcon stage={currentStage} size={15} />
        <span>{stageLabels[currentStage]}</span>
        <strong>Stage {currentStageIndex + 1} of 5</strong>
      </p>
      <ol>
        {stageOrder.map((stage, index) => {
          const stageQuestions = questions.filter(
            (question) => question.stage === stage,
          );
          const completed =
            stageQuestions.length > 0 &&
            stageQuestions.every(
              (question) => (answers[question.id]?.length ?? 0) > 0,
            );
          const current = stage === currentStage;
          return (
            <li
              key={stage}
              className={
                completed ? "is-complete" : current ? "is-current" : ""
              }
              aria-current={current ? "step" : undefined}
            >
              <span className="journey-icon" aria-hidden="true">
                {completed ? (
                  <Check size={14} />
                ) : (
                  <StageIcon stage={stage} size={14} />
                )}
              </span>
              <span>
                <small>0{index + 1}</small>
                <strong>{stageLabels[stage]}</strong>
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
