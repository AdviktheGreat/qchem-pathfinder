"use client";

import { useEffect, useMemo, useRef } from "react";
import { ArrowLeft, ArrowRight, BookOpenText, Check, Info } from "lucide-react";
import {
  getPreviousQuestionId,
  getVisibleQuestions,
  getPlannedQuestionCount,
} from "@/lib/branching";
import { stageLabels, questionById } from "@/data/questions";
import type { AnswerMap } from "@/lib/types";
import { selectAnswer } from "@/lib/answer-selection";

interface SurveyScreenProps {
  answers: AnswerMap;
  currentQuestionId: string;
  onAnswer: (questionId: string, optionIds: string[]) => void;
  onQuestionChange: (questionId: string) => void;
  onComplete: () => void;
  onPause?: () => void;
  shortcutsEnabled?: boolean;
  onShortcutsChange?: (enabled: boolean) => void;
}

export function SurveyScreen({
  answers,
  currentQuestionId,
  onAnswer,
  onQuestionChange,
  onComplete,
  onPause,
  shortcutsEnabled = false,
  onShortcutsChange,
}: SurveyScreenProps) {
  const visible = getVisibleQuestions(answers);
  const total = getPlannedQuestionCount(answers);
  const question = questionById[currentQuestionId] ?? visible[0];
  const index = Math.max(
    0,
    visible.findIndex((item) => item.id === question.id),
  );
  const selected = useMemo(
    () => answers[question.id] ?? [],
    [answers, question.id],
  );
  const selectionLimitReached =
    question.type === "multi" &&
    selected.length >= (question.maxSelections ?? Infinity);
  const progress = Math.round(((index + 1) / total) * 100);
  const isLast = index === visible.length - 1;
  const estimatedMinutes = Math.max(1, Math.ceil((total - index - 1) * 0.6));
  const headingRef = useRef<HTMLHeadingElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [question.id]);

  useEffect(() => {
    function chooseWithLetter(event: KeyboardEvent) {
      if (
        !shortcutsEnabled ||
        event.repeat ||
        event.isComposing ||
        event.defaultPrevented
      )
        return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement;
      if (
        target instanceof HTMLElement &&
        target.closest(
          "input, textarea, select, [contenteditable]:not([contenteditable='false'])",
        )
      )
        return;
      if (!/^[a-z]$/i.test(event.key)) return;
      const optionIndex = event.key.toUpperCase().charCodeAt(0) - 65;
      const option = question.options[optionIndex];
      if (!option || optionIndex < 0) return;

      event.preventDefault();
      onAnswer(question.id, selectAnswer(question, selected, option.id));
    }

    window.addEventListener("keydown", chooseWithLetter);
    return () => window.removeEventListener("keydown", chooseWithLetter);
  }, [onAnswer, question, selected, shortcutsEnabled]);

  function toggle(optionId: string) {
    onAnswer(question.id, selectAnswer(question, selected, optionId));
  }

  function next() {
    const refreshed = getVisibleQuestions(answers);
    const currentIndex = refreshed.findIndex((item) => item.id === question.id);
    const nextQuestion = refreshed[currentIndex + 1];
    if (nextQuestion) onQuestionChange(nextQuestion.id);
    else onComplete();
  }

  const previousId = getPreviousQuestionId(answers, question.id);
  const branchSource = question.visibleWhen
    ? questionById[question.visibleWhen.questionId]
    : undefined;
  const branchChoice = branchSource?.options.find((option) =>
    answers[branchSource.id]?.includes(option.id),
  );

  return (
    <section className="survey-shell" aria-labelledby="question-title">
      <div
        className="progress-wrap"
        aria-label={`Question ${index + 1} of ${total}`}
      >
        <div className="progress-meta">
          <span>{stageLabels[question.stage]}</span>
          <span>
            {index + 1} / {total} ·{" "}
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
          aria-valuetext={`Question ${index + 1} of ${total}`}
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
          {branchChoice && (
            <p className="question-prompt">
              You chose “{branchChoice.label}”. These follow-up questions help
              distinguish nearby directions within that interest.
            </p>
          )}
          {question.definition && (
            <details key={question.id} className="definition-card">
              <summary>
                <Info size={16} /> About{" "}
                {question.definition.term.toLowerCase()}
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
                !option.uncertainty &&
                !active &&
                selected.length >= (question.maxSelections ?? Infinity);
              return (
                <button
                  key={option.id}
                  ref={(node) => {
                    optionRefs.current[optionIndex] = node;
                  }}
                  className={`choice-card ${active ? "is-selected" : ""}`}
                  type="button"
                  role={question.type === "single" ? "radio" : "checkbox"}
                  aria-checked={active}
                  tabIndex={
                    question.type === "single"
                      ? active || (!selected.length && optionIndex === 0)
                        ? 0
                        : -1
                      : 0
                  }
                  disabled={limitReached}
                  onClick={() => toggle(option.id)}
                  onKeyDown={(event) => {
                    if (
                      question.type !== "single" ||
                      event.altKey ||
                      event.ctrlKey ||
                      event.metaKey
                    )
                      return;
                    const count = question.options.length;
                    let nextIndex: number;
                    if (event.key === "ArrowRight" || event.key === "ArrowDown")
                      nextIndex = (optionIndex + 1) % count;
                    else if (
                      event.key === "ArrowLeft" ||
                      event.key === "ArrowUp"
                    )
                      nextIndex = (optionIndex - 1 + count) % count;
                    else if (event.key === "Home") nextIndex = 0;
                    else if (event.key === "End") nextIndex = count - 1;
                    else return;
                    event.preventDefault();
                    onAnswer(question.id, [question.options[nextIndex].id]);
                    optionRefs.current[nextIndex]?.focus();
                  }}
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
          <p
            id="selection-guidance"
            className="selection-hint"
            aria-live="polite"
          >
            {selected.length === 0 && (
              <span>
                Choose an answer—or “
                {question.options.find((option) => option.uncertainty)?.label ??
                  "I’m not sure yet"}
                ”—to continue.{" "}
              </span>
            )}
            {question.type === "multi"
              ? selectionLimitReached
                ? `Maximum reached (${selected.length}) · Deselect one to choose another`
                : `Choose up to ${question.maxSelections} · ${selected.length} selected`
              : "Choose the answer closest to how you feel today."}
            <span className="keyboard-hint">
              {shortcutsEnabled
                ? `Press A–${String.fromCharCode(64 + question.options.length)} to choose`
                : question.type === "single"
                  ? "Tab to the choices; use arrow keys to select"
                  : "Tab between choices; press Space to toggle"}
            </span>
          </p>
          <label className="shortcut-toggle">
            <input
              type="checkbox"
              checked={shortcutsEnabled}
              onChange={(event) => onShortcutsChange?.(event.target.checked)}
            />
            Enable letter-key answer shortcuts
          </label>
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
          aria-describedby="selection-guidance"
          onClick={next}
        >
          {isLast ? "See my directions" : "Continue"} <ArrowRight size={17} />
        </button>
      </div>
      {onPause && (
        <button
          className="text-button pause-action"
          type="button"
          onClick={onPause}
        >
          Pause and return home
        </button>
      )}
    </section>
  );
}
