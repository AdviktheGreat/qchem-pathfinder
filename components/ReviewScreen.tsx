import { ArrowLeft, Pencil } from "lucide-react";
import { getVisibleQuestions } from "@/lib/branching";
import { stageLabels } from "@/data/questions";
import type { AnswerMap, SurveyStage } from "@/lib/types";

export function ReviewScreen({
  answers,
  onEdit,
  onBack,
}: {
  answers: AnswerMap;
  onEdit: (id: string) => void;
  onBack: () => void;
}) {
  const questions = getVisibleQuestions(answers);
  const grouped = questions.reduce<
    Partial<Record<SurveyStage, typeof questions>>
  >((map, question) => {
    (map[question.stage] ??= []).push(question);
    return map;
  }, {});

  return (
    <section className="review-shell">
      <button className="text-button back-link" type="button" onClick={onBack}>
        <ArrowLeft size={16} /> Back to results
      </button>
      <div className="result-heading">
        <p className="eyebrow">Your trail so far</p>
        <h1>Review your answers.</h1>
        <p>
          Change any answer and the recommendation will update when you finish
          the path again.
        </p>
      </div>
      <div className="review-groups">
        {Object.entries(grouped).map(([stage, stageQuestions]) => (
          <section className="review-group" key={stage}>
            <h2>{stageLabels[stage as SurveyStage]}</h2>
            {stageQuestions?.map((question) => {
              const labels = (answers[question.id] ?? [])
                .map(
                  (id) =>
                    question.options.find((option) => option.id === id)?.label,
                )
                .filter(Boolean);
              return (
                <div className="review-row" key={question.id}>
                  <div>
                    <p>{question.title}</p>
                    <strong>{labels.join(", ") || "Not answered"}</strong>
                  </div>
                  <button
                    className="icon-button"
                    type="button"
                    onClick={() => onEdit(question.id)}
                    aria-label={`Edit: ${question.title}`}
                  >
                    <Pencil size={16} />
                  </button>
                </div>
              );
            })}
          </section>
        ))}
      </div>
    </section>
  );
}
