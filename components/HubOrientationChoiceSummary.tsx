import type { HubOrientationWorkshopChoice } from "@/lib/hub-orientation";

export function HubOrientationChoiceSummary({
  choices,
}: {
  choices: readonly HubOrientationWorkshopChoice[];
}) {
  if (choices.length === 0) return null;

  return (
    <details className="hub-orientation-choice-summary">
      <summary>
        Review the choices behind this map
        <span>{choices.length} decisions</span>
      </summary>
      <div>
        <p>
          These are preferences, not test answers. Revise any choice that no
          longer sounds like you.
        </p>
        <dl>
          {choices.map((choice) => (
            <div key={choice.questionId}>
              <dt>{choice.question}</dt>
              <dd>
                {choice.answer}
                {choice.uncertain ? <span>Kept open</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </details>
  );
}
