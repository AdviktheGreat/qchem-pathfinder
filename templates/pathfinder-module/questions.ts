import type { StageLabels } from "@/lib/pathfinder-definition";
import type { SurveyQuestion } from "@/lib/types";
import { templateAdaptiveQuestions } from "@/templates/pathfinder-module/adaptive-questions";

export const templateStageLabels = {
  calibration: "Starting point",
  motivation: "What draws you in",
  narrowing: "Narrow the neighborhood",
  question: "Questions you want to ask",
  style: "How you want to investigate",
} satisfies StageLabels;

export const templateCalibrationQuestionIds = [
  "template-starting-point",
  "template-concepts",
  "template-math-comfort",
  "template-coding-comfort",
  "template-explanation-style",
] as const;

export const templateBranchQuestionId = "template-motivation";

export const templatePathfinderQuestions: SurveyQuestion[] = [
  {
    id: "template-starting-point",
    stage: "calibration",
    kicker: "Start where you are",
    title: "How familiar does this research area feel right now?",
    prompt:
      "This changes preparation guidance—not which directions you are allowed to explore.",
    type: "single",
    options: [
      {
        id: "new",
        label: "Mostly new to me",
        description: "I would like a clear map of the main ideas and methods.",
      },
      {
        id: "recognize",
        label: "I recognize parts of it",
        description:
          "Some ideas sound familiar, even if I could not explain them yet.",
      },
      {
        id: "comfortable",
        label: "I could explain several core ideas",
        description: "I feel ready to build from introductory concepts.",
      },
      {
        id: "unsure",
        label: "I’m not sure yet",
        uncertainty: true,
      },
    ],
  },
  {
    id: "template-concepts",
    stage: "calibration",
    kicker: "Concept check-in",
    title: "Which ideas feel familiar enough to use in a conversation?",
    prompt: "Recognition is enough. This is preparation context, not a quiz.",
    type: "multi",
    maxSelections: 3,
    options: [
      { id: "systems", label: "Systems, structures, and interactions" },
      { id: "models", label: "Models, assumptions, and approximations" },
      { id: "evidence", label: "Data, evidence, and uncertainty" },
      {
        id: "unsure",
        label: "I’ve heard of these but couldn’t explain them",
        uncertainty: true,
      },
    ],
  },
  {
    id: "template-math-comfort",
    stage: "calibration",
    kicker: "Mathematical language",
    title: "How do you feel when an explanation uses equations?",
    prompt:
      "Mathematical comfort changes suggested support, never the value of a direction.",
    type: "single",
    options: [
      { id: "comfortable", label: "Equations often help me understand" },
      { id: "guided", label: "I’m comfortable with some guidance" },
      { id: "concept-first", label: "Show me the physical picture first" },
      { id: "unsure", label: "I’m not sure yet", uncertainty: true },
    ],
  },
  {
    id: "template-coding-comfort",
    stage: "calibration",
    kicker: "Coding check-in",
    title: "What is your current relationship with coding?",
    prompt:
      "Coding experience changes the recommended first step, not which questions belong to you.",
    type: "single",
    options: [
      { id: "enjoy", label: "I enjoy writing or adapting code" },
      { id: "learning", label: "I’m learning through examples" },
      { id: "new", label: "Coding is mostly new to me" },
      { id: "unsure", label: "I’m not sure yet", uncertainty: true },
    ],
  },
  {
    id: "template-explanation-style",
    stage: "calibration",
    kicker: "Explanation style",
    title: "Which kind of explanation helps you begin?",
    type: "single",
    options: [
      { id: "conceptual", label: "A conceptual story and concrete example" },
      { id: "quantitative", label: "A quantitative pattern or equation" },
      { id: "mixed", label: "A mix of concepts, visuals, and equations" },
      { id: "unsure", label: "I’m not sure yet", uncertainty: true },
    ],
  },
  {
    id: templateBranchQuestionId,
    stage: "motivation",
    kicker: "Follow your curiosity",
    title: "Which scientific doorway sounds most interesting today?",
    prompt:
      "Choose the scenario you would most like to understand; the next questions will adapt to it.",
    type: "single",
    options: [
      {
        id: "systems",
        label: "How interacting parts create system behavior",
      },
      {
        id: "data",
        label: "How evidence can reveal a hidden pattern",
      },
      {
        id: "methods",
        label: "How models and computational methods can be improved",
      },
      {
        id: "open",
        label: "Show me several possibilities",
        uncertainty: true,
      },
    ],
  },
  ...templateAdaptiveQuestions,
  {
    id: "template-question-type",
    stage: "question",
    kicker: "The question itself",
    title: "What kind of research question would you most like to ask?",
    type: "single",
    options: [
      { id: "explain", label: "Explain why a behavior occurs" },
      { id: "predict", label: "Predict an outcome or property" },
      { id: "compare", label: "Compare models, systems, or methods" },
      { id: "unsure", label: "I’m not sure yet", uncertainty: true },
    ],
  },
  {
    id: "template-work-style",
    stage: "style",
    kicker: "Working style",
    title: "Which research material would you most enjoy working with?",
    type: "single",
    options: [
      { id: "visual", label: "Visual models and diagrams" },
      { id: "equations", label: "Equations and mathematical patterns" },
      { id: "code-data", label: "Code, simulations, and datasets" },
      { id: "unsure", label: "I’m not sure yet", uncertainty: true },
    ],
  },
];
