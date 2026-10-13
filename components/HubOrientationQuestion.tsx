import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { HubOrientationQuestion as Question } from "@/lib/hub-orientation";

export function HubOrientationQuestion({
  question,
  selectedOptionId,
  onSelect,
  onBack,
  onContinue,
}: {
  question: Question;
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
  onBack?: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="hub-orientation-question">
      <div className="hub-orientation-question-copy">
        <p className="section-kicker">{question.kicker}</p>
        <h2>{question.title}</h2>
        <p>{question.guidance}</p>
      </div>
      <fieldset className="hub-orientation-options">
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
