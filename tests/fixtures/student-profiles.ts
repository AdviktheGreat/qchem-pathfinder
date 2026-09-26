import { getVisibleQuestions } from "@/lib/branching";
import type { AnswerMap } from "@/lib/types";

// Neutral defaults complete a real visible path without inventing preferences.
export function completeAnswers(preferences: AnswerMap): AnswerMap {
  const answers: AnswerMap = { motivation: ["balanced"], ...preferences };
  for (const question of getVisibleQuestions(answers)) {
    if (!answers[question.id]) {
      const neutral = question.options.find((option) => option.uncertainty);
      if (!neutral) throw new Error(`No neutral option: ${question.id}`);
      answers[question.id] = [neutral.id];
    }
  }
  return answers;
}

export const studentProfiles = [
  {
    name: "medicine-focused, chemistry-heavy, limited coding",
    expected: "biomolecular-electronics",
    answers: completeAnswers({
      motivation: ["medicine"],
      "medicine-focus": ["electrons"],
      "medicine-system": ["drug-dna"],
      "question-kind": ["explain"],
      "purpose-balance": ["applied"],
      "system-scale": ["molecule"],
      "change-style": ["static"],
      "electronic-state": ["ground"],
      "interpret-predict": ["interpret"],
      "evidence-style": ["visuals"],
      "coding-comfort": ["new"],
      "explanation-style": ["conceptual"],
      "work-balance": ["chemistry"],
    }),
  },
  {
    name: "materials and energy focused, mathematically confident",
    expected: "organic-electronics",
    answers: completeAnswers({
      motivation: ["energy"],
      "energy-focus": ["device"],
      "energy-challenge": ["structure"],
      "question-kind": ["design"],
      "purpose-balance": ["applied"],
      "system-scale": ["material"],
      "electronic-state": ["excited"],
      "interpret-predict": ["predict"],
      "evidence-style": ["equations"],
      "math-comfort": ["comfortable"],
    }),
  },
  {
    name: "photochemistry and spectroscopy focused, visually oriented",
    expected: "computational-spectroscopy",
    answers: completeAnswers({
      motivation: ["light"],
      "light-focus": ["signature"],
      "light-evidence": ["peaks"],
      "question-kind": ["spectrum"],
      "electronic-state": ["excited"],
      "evidence-style": ["visuals"],
      "interpret-predict": ["interpret"],
    }),
  },
  {
    name: "reaction-mechanism focused",
    expected: "reaction-mechanisms",
    answers: completeAnswers({
      motivation: ["reactions"],
      "reactions-focus": ["steps"],
      "reactions-view": ["map"],
      "question-kind": ["pathway"],
      "change-style": ["changing"],
      "evidence-style": ["visuals"],
    }),
  },
  {
    name: "coding and ML focused",
    expected: "ml-property-prediction",
    answers: completeAnswers({
      motivation: ["computing"],
      "computing-focus": ["learn"],
      "computing-priority": ["predict"],
      "question-kind": ["data"],
      "interpret-predict": ["predict"],
      "evidence-style": ["datasets"],
      "coding-comfort": ["enjoy"],
      "purpose-balance": ["applied"],
      "work-balance": ["coding"],
    }),
  },
  {
    name: "highly uncertain",
    expected: "noncovalent-interactions",
    answers: completeAnswers({}),
  },
];
