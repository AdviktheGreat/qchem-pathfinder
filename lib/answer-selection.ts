import type { SurveyQuestion } from "@/lib/types";

export function selectAnswer(
  question: SurveyQuestion,
  selected: string[],
  optionId: string,
): string[] {
  const option = question.options.find((item) => item.id === optionId);
  if (!option) return selected;
  if (question.type === "single") return [optionId];
  if (selected.includes(optionId))
    return selected.filter((id) => id !== optionId);
  if (option.uncertainty) return [optionId];
  const specific = selected.filter(
    (id) => !question.options.find((item) => item.id === id)?.uncertainty,
  );
  return specific.length < (question.maxSelections ?? Infinity)
    ? [...specific, optionId]
    : selected;
}
