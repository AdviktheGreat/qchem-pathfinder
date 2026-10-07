import { computationalPhysicsPathfinder } from "@/data/pathfinders/computational-physics";
import { getVisibleQuestions } from "@/lib/branching";
import type { AnswerMap } from "@/lib/types";

export interface PhysicsStudentProfile {
  name: string;
  answers: AnswerMap;
  expectedPrimary: string;
}

const questions = computationalPhysicsPathfinder.survey.questions;

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

export const physicsStudentProfiles: PhysicsStudentProfile[] = [
  {
    name: "orbital dynamics explorer",
    answers: completeProfile({
      "physics-motivation": ["space-universe"],
      "physics-astrophysics-focus": ["natural-orbits"],
      "physics-astrophysics-evidence": ["orbital-architecture"],
      "physics-question-kind": ["dynamics"],
      "physics-evidence": ["trajectories-time"],
    }),
    expectedPrimary: "orbital-n-body-dynamics",
  },
  {
    name: "climate ensemble explorer",
    answers: completeProfile({
      "physics-motivation": ["fluids-weather"],
      "physics-fluids-focus": ["climate-coupling"],
      "physics-fluids-evidence": ["ensemble-feedbacks"],
      "physics-question-kind": ["predict"],
      "physics-workflow": ["statistics"],
    }),
    expectedPrimary: "climate-earth-system-modeling",
  },
  {
    name: "open quantum systems explorer",
    answers: completeProfile({
      "physics-motivation": ["quantum-atoms"],
      "physics-quantum-focus": ["noise-decoherence"],
      "physics-quantum-evidence": ["coherence-decay"],
      "physics-scale": ["quantum-atomic"],
    }),
    expectedPrimary: "open-quantum-systems",
  },
  {
    name: "critical phenomena explorer",
    answers: completeProfile({
      "physics-motivation": ["matter-collective"],
      "physics-condensed-focus": ["critical-change"],
      "physics-condensed-evidence": ["size-collapse"],
      "physics-scale": ["many-body"],
      "physics-workflow": ["statistics"],
    }),
    expectedPrimary: "phase-transitions-critical-phenomena",
  },
  {
    name: "kinetic reconnection explorer",
    answers: completeProfile({
      "physics-motivation": ["plasma-fusion"],
      "physics-plasma-focus": ["reconnection-region"],
      "physics-plasma-evidence": ["particle-distributions"],
      "physics-evidence": ["distributions"],
    }),
    expectedPrimary: "magnetic-reconnection-kinetic-plasma",
  },
  {
    name: "detector reconstruction explorer",
    answers: completeProfile({
      "physics-motivation": ["particles-nuclei"],
      "physics-particle-nuclear-focus": ["detector-signals"],
      "physics-particle-nuclear-evidence": ["response-resolution"],
      "physics-question-kind": ["infer"],
    }),
    expectedPrimary: "detector-response-reconstruction",
  },
  {
    name: "scientific machine learning explorer",
    answers: completeProfile({
      "physics-motivation": ["methods-computing"],
      "physics-methods-focus": ["infer-hidden"],
      "physics-methods-evidence": ["calibrated-uncertainty"],
      "physics-question-kind": ["infer"],
      "physics-workflow": ["code", "statistics"],
    }),
    expectedPrimary: "physics-informed-ml-inverse-problems",
  },
  {
    name: "highly uncertain explorer",
    answers: completeProfile({ "physics-motivation": ["open"] }, true),
    expectedPrimary: "orbital-n-body-dynamics",
  },
];
