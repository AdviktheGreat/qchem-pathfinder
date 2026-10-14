import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useEffect, useRef } from "react";
import type { HubOrientationQuestion as Question } from "@/lib/hub-orientation";

export function HubOrientationQuestion({
  question,
  selectedOptionId,
  currentStep,
  totalSteps,
  onSelect,
  onBack,
  onContinue,
}: {
  question: Question;
  selectedOptionId?: string;
  currentStep: number;
  totalSteps: number;
  onSelect: (optionId: string) => void;
  onBack?: () => void;
  onContinue: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const guidanceId = `${question.id}-guidance`;

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [question.id]);

  return (
    <div className="hub-orientation-question">
      <div className="hub-orientation-progress">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>
          About {Math.max(1, Math.ceil((totalSteps - currentStep + 1) * 0.4))}{" "}
          min left
        </span>
        <div
          role="progressbar"
          aria-label="Pathfinder guide progress"
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-valuenow={currentStep}
          aria-valuetext={`Step ${currentStep} of ${totalSteps}`}
        >
          <span style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
        </div>
      </div>
      <div className="hub-orientation-question-copy">
        <p className="section-kicker">{question.kicker}</p>
        <h2 ref={headingRef} tabIndex={-1}>
          {question.title}
        </h2>
        <p id={guidanceId}>{question.guidance}</p>
      </div>
      <fieldset
        className="hub-orientation-options"
        aria-describedby={guidanceId}
      >
        <legend className="sr-only">{question.title}</legend>
        {question.options.map((option) => {
          const selected = selectedOptionId === option.id;
          return (
            <label
              className={`hub-orientation-option ${selected ? "is-selected" : ""}`}
              key={option.id}
            >
              <input
                type="radio"
                name={question.id}
                value={option.id}
                checked={selected}
                onChange={() => onSelect(option.id)}
              />
              <span>
                <strong>{option.label}</strong>
                <small>{option.description}</small>
              </span>
              <Check size={18} aria-hidden="true" />
            </label>
          );
        })}
      </fieldset>
      <div className="hub-orientation-question-actions">
        {onBack ? (
          <button className="secondary-button" type="button" onClick={onBack}>
            <ArrowLeft size={17} aria-hidden="true" /> Back
          </button>
        ) : (
          <span />
        )}
        <button
          className="primary-button"
          type="button"
          disabled={!selectedOptionId}
          onClick={onContinue}
        >
          Continue <ArrowRight size={17} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
