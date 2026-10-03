import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology";
import { getVisibleQuestions } from "@/lib/branching";
import type { AnswerMap } from "@/lib/types";

export interface BiologyStudentProfile {
  name: string;
  answers: AnswerMap;
  expectedPrimary: string;
}

const questions = computationalBiologyPathfinder.survey.questions;

function completeProfile(
  focusedAnswers: AnswerMap,
  preferUncertainty = false,
): AnswerMap {
  const answers: AnswerMap = { ...focusedAnswers };

  while (true) {
    const next = getVisibleQuestions(answers, questions).find(
      (question) => !answers[question.id]?.length,
    );
    if (!next) return answers;
    const fallback = preferUncertainty
      ? (next.options.find((option) => option.uncertainty) ?? next.options[0])
      : (next.options.find((option) => !option.uncertainty) ?? next.options[0]);
    answers[next.id] = [fallback.id];
  }
}

export const biologyStudentProfiles: BiologyStudentProfile[] = [
  {
    name: "health-focused variant interpretation explorer",
    answers: completeProfile({
      "biology-motivation": ["health-disease"],
      "biology-health-focus": ["variant-effects"],
      "biology-health-evidence": ["variants"],
      "biology-coding-comfort": ["new"],
      "biology-scale": ["genes-genomes"],
    }),
    expectedPrimary: "variant-effect-prediction",
  },
  {
    name: "protein structure and therapeutic discovery explorer",
    answers: completeProfile({
      "biology-motivation": ["therapeutics"],
      "biology-therapeutic-focus": ["target-structure"],
      "biology-therapeutic-evidence": ["experimental-structure"],
      "biology-evidence": ["structures-images"],
      "biology-workflow": ["visualize"],
    }),
    expectedPrimary: "protein-structure-prediction",
  },
  {
    name: "comparative genomics explorer",
    answers: completeProfile({
      "biology-motivation": ["genomes"],
      "biology-genome-focus": ["across-species"],
      "biology-genome-evidence": ["conserved-changed-regions"],
      "biology-question-kind": ["compare"],
      "biology-evidence": ["sequences"],
    }),
    expectedPrimary: "comparative-genomics-conservation",
  },
  {
    name: "spatial and visually oriented cell explorer",
    answers: completeProfile({
      "biology-motivation": ["cells-systems"],
      "biology-cell-expression-focus": ["spatial"],
      "biology-scale": ["cells-tissues"],
      "biology-evidence": ["structures-images"],
      "biology-explanation-style": ["visual"],
    }),
    expectedPrimary: "spatial-omics",
  },
  {
    name: "microbiome community explorer",
    answers: completeProfile({
      "biology-motivation": ["microbes-ecosystems"],
      "biology-ecology-focus": ["microbial-composition"],
      "biology-ecology-evidence": ["community-sequences"],
      "biology-scale": ["communities-ecosystems"],
      "biology-evidence": ["sequences"],
    }),
    expectedPrimary: "microbiome-metagenomics",
  },
  {
    name: "coding and machine-learning explorer",
    answers: completeProfile({
      "biology-motivation": ["data-methods"],
      "biology-data-method-focus": ["build-predictor"],
      "biology-data-method-evidence": ["generalization"],
      "biology-coding-comfort": ["enjoy"],
      "biology-question-kind": ["predict"],
      "biology-workflow": ["code"],
    }),
    expectedPrimary: "machine-learning-biological-prediction",
  },
  {
    name: "highly uncertain explorer",
    answers: completeProfile({ "biology-motivation": ["open"] }, true),
    expectedPrimary: "comparative-genomics-conservation",
  },
];
