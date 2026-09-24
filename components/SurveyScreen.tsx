"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, BookOpenText, Check, Info } from "lucide-react";
import { getPreviousQuestionId, getVisibleQuestions } from "@/lib/branching";
import { stageLabels, questionById } from "@/data/questions";
import type { AnswerMap } from "@/lib/types";

interface SurveyScreenProps {
  answers: AnswerMap;
  currentQuestionId: string;
  onAnswer: (questionId: string, optionIds: string[]) => void;
  onQuestionChange: (questionId: string) => void;
  onComplete: () => void;
}

export function SurveyScreen({
  answers,
  currentQuestionId,
  onAnswer,
  onQuestionChange,
  onComplete,
}: SurveyScreenProps) {
  const visible = getVisibleQuestions(answers);
  const question = questionById[currentQuestionId] ?? visible[0];
  const index = Math.max(
    0,
    visible.findIndex((item) => item.id === question.id),
  );
  const selected = answers[question.id] ?? [];
  const progress = Math.round(((index + 1) / visible.length) * 100);
  const isLast = index === visible.length - 1;
  const estimatedMinutes = Math.max(
    1,
    Math.ceil((visible.length - index - 1) * 0.6),
  );
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [question.id]);

  useEffect(() => {
    function chooseWithLetter(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      const optionIndex = event.key.toUpperCase().charCodeAt(0) - 65;
      const option = question.options[optionIndex];
      if (!option || optionIndex < 0) return;

      const active = selected.includes(option.id);
      const limitReached =
        question.type === "multi" &&
        !active &&
        selected.length >= (question.maxSelections ?? Infinity);
      if (limitReached) return;

      event.preventDefault();
      if (question.type === "single") onAnswer(question.id, [option.id]);
      else if (active)
        onAnswer(
          question.id,
          selected.filter((id) => id !== option.id),
        );
      else onAnswer(question.id, [...selected, option.id]);
    }

    window.addEventListener("keydown", chooseWithLetter);
    return () => window.removeEventListener("keydown", chooseWithLetter);
  }, [onAnswer, question, selected]);

  function toggle(optionId: string) {
    if (question.type === "single") {
      onAnswer(question.id, [optionId]);
      return;
    }
    const exists = selected.includes(optionId);
    if (exists)
      onAnswer(
        question.id,
        selected.filter((id) => id !== optionId),
      );
    else if ((question.maxSelections ?? Infinity) > selected.length)
      onAnswer(question.id, [...selected, optionId]);
  }

  function next() {
    const refreshed = getVisibleQuestions(answers);
    const currentIndex = refreshed.findIndex((item) => item.id === question.id);
    const nextQuestion = refreshed[currentIndex + 1];
    if (nextQuestion) onQuestionChange(nextQuestion.id);
    else onComplete();
  }

  const previousId = getPreviousQuestionId(answers, question.id);

  return (
    <section className="survey-shell" aria-labelledby="question-title">
      <p className="sr-only" aria-live="polite">
        Question {index + 1}: {question.title}
      </p>
      <div
        className="progress-wrap"
        aria-label={`Question ${index + 1} of ${visible.length}`}
      >
        <div className="progress-meta">
          <span>{stageLabels[question.stage]}</span>
          <span>
            {index + 1} / {visible.length} ·{" "}
            {isLast ? "Final question" : `~${estimatedMinutes} min left`}
          </span>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Survey progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-valuetext={`Question ${index + 1} of ${visible.length}`}
        >
          <span aria-hidden="true" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="question-layout">
        <div className="question-copy">
          <p className="eyebrow">
            <BookOpenText size={15} /> {question.kicker}
          </p>
          <h1 id="question-title" ref={headingRef} tabIndex={-1}>
            {question.title}
          </h1>
          {question.prompt && (
            <p className="question-prompt">{question.prompt}</p>
          )}
          {question.definition && (
            <details className="definition-card">
              <summary>
                <Info size={16} /> What is an{" "}
                {question.definition.term.toLowerCase()}?
              </summary>
              <p>{question.definition.text}</p>
            </details>
          )}
        </div>

        <div className="answer-panel">
          <div
            className="choice-grid"
            role={question.type === "single" ? "radiogroup" : "group"}
            aria-label={question.title}
          >
            {question.options.map((option, optionIndex) => {
              const active = selected.includes(option.id);
              const limitReached =
                question.type === "multi" &&
                !active &&
                selected.length >= (question.maxSelections ?? Infinity);
              return (
                <button
                  key={option.id}
                  className={`choice-card ${active ? "is-selected" : ""}`}
                  type="button"
                  role={question.type === "single" ? "radio" : "checkbox"}
                  aria-checked={active}
                  disabled={limitReached}
                  onClick={() => toggle(option.id)}
                >
                  <span className="choice-index" aria-hidden="true">
                    {String.fromCharCode(65 + optionIndex)}
                  </span>
                  <span className="choice-text">
                    <strong>{option.label}</strong>
                    {option.description && <small>{option.description}</small>}
                  </span>
                  <span className="choice-check" aria-hidden="true">
                    <Check size={15} />
                  </span>
                </button>
              );
            })}
          </div>
          <p className="selection-hint" aria-live="polite">
            {question.type === "multi"
              ? `Choose up to ${question.maxSelections} · ${selected.length} selected`
              : "Choose the answer closest to how you feel today."}
            <span className="keyboard-hint">
              Keyboard: press A–
              {String.fromCharCode(64 + question.options.length)} to choose
            </span>
          </p>
        </div>
      </div>

      <div className="survey-controls">
        <button
          className="secondary-button"
          type="button"
          disabled={!previousId}
          onClick={() => previousId && onQuestionChange(previousId)}
        >
          <ArrowLeft size={17} /> Back
        </button>
        <button
          className="primary-button"
          type="button"
          disabled={selected.length === 0}
          onClick={next}
        >
          {isLast ? "See my directions" : "Continue"} <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}
