import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { getVisibleQuestions } from "@/lib/branching";
import type { AnswerMap } from "@/lib/types";

export interface MaterialsStudentProfile {
  name: string;
  answers: AnswerMap;
  expectedPrimary: string;
}

const questions = computationalMaterialsPathfinder.survey.questions;

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

export const materialsStudentProfiles: MaterialsStudentProfile[] = [
  {
    name: "energy storage with chemistry-first preparation",
    answers: completeProfile({
      "materials-motivation": ["energy-storage"],
      "materials-energy-direction": ["battery-electrodes"],
      "materials-energy-process": ["cycling-stability"],
      "materials-coding-comfort": ["new"],
      "materials-workflow": ["experimental-evidence"],
      "materials-phenomena": ["ions", "chemical-change"],
    }),
    expectedPrimary: "battery-electrodes",
  },
  {
    name: "mathematically confident electronics explorer",
    answers: completeProfile({
      "materials-motivation": ["electronics"],
      "materials-electronic-direction": ["semiconductors"],
      "materials-electronic-phenomenon": ["bands-charge"],
      "materials-math-comfort": ["comfortable"],
      "materials-workflow": ["equations"],
      "materials-phenomena": ["electrons"],
    }),
    expectedPrimary: "semiconductor-electronic-materials",
  },
  {
    name: "visually oriented light and sensing explorer",
    answers: completeProfile({
      "materials-motivation": ["light-sensing"],
      "materials-electronic-direction": ["optoelectronics"],
      "materials-electronic-phenomenon": ["absorption-emission"],
      "materials-explanation-style": ["visual"],
      "materials-workflow": ["visual-models"],
      "materials-phenomena": ["optical"],
    }),
    expectedPrimary: "optoelectronic-photonic-materials",
  },
  {
    name: "surface-reaction and catalysis explorer",
    answers: completeProfile({
      "materials-motivation": ["catalysis"],
      "materials-surface-environment-direction": ["surface-catalysis"],
      "materials-surface-environment-process": ["adsorption-reaction"],
      "materials-question-kind": ["dynamics"],
      "materials-phenomena": ["surfaces", "chemical-change"],
    }),
    expectedPrimary: "heterogeneous-catalysis-surfaces",
  },
  {
    name: "soft materials and self-assembly explorer",
    answers: completeProfile({
      "materials-motivation": ["soft-health"],
      "materials-structural-soft-direction": ["polymers-soft"],
      "materials-structural-soft-behavior": ["assembly-response"],
      "materials-family": ["soft"],
      "materials-change-style": ["dynamic"],
    }),
    expectedPrimary: "polymers-soft-materials",
  },
  {
    name: "coding and machine-learning explorer",
    answers: completeProfile({
      "materials-motivation": ["data-discovery"],
      "materials-computation-direction": ["machine-learning"],
      "materials-computation-evidence": ["prediction-table"],
      "materials-coding-comfort": ["enjoy"],
      "materials-workflow": ["coding", "datasets"],
      "materials-question-kind": ["data-discovery"],
    }),
    expectedPrimary: "ml-property-prediction",
  },
  {
    name: "highly uncertain explorer",
    answers: completeProfile(
      {
        "materials-motivation": ["open"],
        "materials-purpose-balance": ["fundamental"],
        "materials-scale": ["atomic"],
        "materials-change-style": ["static"],
        "materials-experiment-connection": ["theory"],
      },
      true,
    ),
    expectedPrimary: "crystal-phase-stability",
  },
];
