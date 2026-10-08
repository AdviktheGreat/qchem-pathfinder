import type { SurveyQuestion } from "@/lib/types";
import {
  createTemplateUncertaintyOption,
  templateUnsureOption,
} from "@/templates/pathfinder-module/uncertainty-options";

export const templateAdaptiveQuestions: SurveyQuestion[] = [
  {
    id: "template-systems-scale",
    stage: "narrowing",
    kicker: "Narrow the system",
    title: "At which scale would you most like to study interactions?",
    type: "single",
    visibleWhen: { questionId: "template-motivation", anyOf: ["systems"] },
    options: [
      { id: "small", label: "A few interacting parts" },
      { id: "collective", label: "Many parts acting collectively" },
      { id: "multi-scale", label: "Connections across several scales" },
      templateUnsureOption,
    ],
  },
  {
    id: "template-systems-behavior",
    stage: "narrowing",
    kicker: "Narrow the behavior",
    title: "Which system behavior would be most satisfying to investigate?",
    type: "single",
    visibleWhen: { questionId: "template-motivation", anyOf: ["systems"] },
    options: [
      { id: "stability", label: "Stability and change over time" },
      { id: "emergence", label: "Unexpected collective behavior" },
      { id: "response", label: "Response to a controlled change" },
      templateUnsureOption,
    ],
  },
  {
    id: "template-data-evidence",
    stage: "narrowing",
    kicker: "Narrow the evidence",
    title: "Which kind of evidence would you most like to interpret?",
    type: "single",
    visibleWhen: { questionId: "template-motivation", anyOf: ["data"] },
    options: [
      { id: "measurements", label: "Measurements collected over time" },
      { id: "images", label: "Images, maps, or spatial patterns" },
      { id: "distributions", label: "Distributions and repeated samples" },
      templateUnsureOption,
    ],
  },
  {
    id: "template-data-goal",
    stage: "narrowing",
    kicker: "Narrow the analysis",
    title: "What would you want the evidence to help you do?",
    type: "single",
    visibleWhen: { questionId: "template-motivation", anyOf: ["data"] },
    options: [
      {
        id: "infer",
        label: "Infer something that cannot be observed directly",
      },
      { id: "classify", label: "Recognize meaningful categories or states" },
      { id: "forecast", label: "Forecast what may happen next" },
      templateUnsureOption,
    ],
  },
  {
    id: "template-methods-focus",
    stage: "narrowing",
    kicker: "Narrow the method",
    title: "Which computational-method question sounds most interesting?",
    type: "single",
    visibleWhen: { questionId: "template-motivation", anyOf: ["methods"] },
    options: [
      { id: "accuracy", label: "How accurate and reliable is the method?" },
      {
        id: "efficiency",
        label: "How can the calculation become more efficient?",
      },
      {
        id: "interpretability",
        label: "How can the result become easier to interpret?",
      },
      templateUnsureOption,
    ],
  },
  {
    id: "template-methods-comparison",
    stage: "narrowing",
    kicker: "Narrow the comparison",
    title: "What would you most want to compare?",
    type: "single",
    visibleWhen: { questionId: "template-motivation", anyOf: ["methods"] },
    options: [
      { id: "algorithms", label: "Two algorithms on the same problem" },
      { id: "resolution", label: "Different resolutions or approximations" },
      { id: "validation", label: "Model output and independent evidence" },
      templateUnsureOption,
    ],
  },
  {
    id: "template-open-context",
    stage: "narrowing",
    kicker: "Keep several doors open",
    title: "Which starting context might help you compare possibilities?",
    type: "single",
    visibleWhen: { questionId: "template-motivation", anyOf: ["open"] },
    options: [
      { id: "familiar", label: "A familiar real-world system" },
      {
        id: "surprising",
        label: "A surprising or counterintuitive phenomenon",
      },
      { id: "methods", label: "A comparison of computational methods" },
      createTemplateUncertaintyOption("I would like to keep all three open"),
    ],
  },
  {
    id: "template-open-sample",
    stage: "narrowing",
    kicker: "Choose a first sample",
    title: "What would make a first paper easiest to enter?",
    type: "single",
    visibleWhen: { questionId: "template-motivation", anyOf: ["open"] },
    options: [
      { id: "visual", label: "Clear figures and visual explanations" },
      { id: "question", label: "One concrete scientific question" },
      { id: "workflow", label: "A step-by-step computational workflow" },
      templateUnsureOption,
    ],
  },
];
