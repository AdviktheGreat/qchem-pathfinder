"use client";

import { useState } from "react";
import { ArrowLeft, Pencil } from "lucide-react";
import { getVisibleQuestions } from "@/lib/branching";
import { stageLabels } from "@/data/questions";
import type { AnswerMap, SurveyStage } from "@/lib/types";
import { isStillExploring } from "@/lib/review";

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
  const [onlyOpen, setOnlyOpen] = useState(false);
  const filtered = onlyOpen
    ? questions.filter((question) => isStillExploring(question, answers))
    : questions;
  const answeredCount = questions.filter(
    (question) => (answers[question.id]?.length ?? 0) > 0,
  ).length;
  const grouped = filtered.reduce<
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
        <h1 tabIndex={-1}>Review your answers.</h1>
        <p>
          <strong>
            {answeredCount} of {questions.length} visible questions answered.
          </strong>{" "}
          Change any answer, then update your directions. If your new choice
          opens a different branch, answer its follow-up questions first.
        </p>
      </div>
      <div className="review-groups">
        <label className="shortcut-toggle no-print">
          <input
            type="checkbox"
            checked={onlyOpen}
            onChange={(event) => setOnlyOpen(event.target.checked)}
          />
          Show only answers I’m still exploring
        </label>
        <p role="status">
          {onlyOpen
            ? `${filtered.length} open-ended answers shown. These are possibilities to revisit, not mistakes.`
            : "Showing all answers."}
        </p>
        {onlyOpen && filtered.length === 0 && (
          <p>
            No uncertainty choices to revisit. Uncheck the filter to review all
            answers.
          </p>
        )}
        {Object.entries(grouped).map(([stage, stageQuestions]) => {
          const stageAnswered = (stageQuestions ?? []).filter(
            (question) => (answers[question.id]?.length ?? 0) > 0,
          ).length;
          return (
            <section className="review-group" key={stage}>
              <h2>
                <span>{stageLabels[stage as SurveyStage]}</span>
                <span>
                  {stageAnswered}/{stageQuestions?.length ?? 0}
                </span>
              </h2>
              {stageQuestions?.map((question) => {
                const labels = (answers[question.id] ?? [])
                  .map(
                    (id) =>
                      question.options.find((option) => option.id === id)
                        ?.label,
                  )
                  .filter(Boolean);
                return (
                  <div className="review-row" key={question.id}>
                    <div>
                      <p>{question.title}</p>
                      <strong>{labels.join(", ") || "Not answered"}</strong>
                      {isStillExploring(question, answers) && (
                        <span className="review-open-label">
                          Still exploring
                        </span>
                      )}
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
          );
        })}
      </div>
    </section>
  );
}
