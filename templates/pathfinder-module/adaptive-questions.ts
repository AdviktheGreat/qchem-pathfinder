import type { SurveyQuestion } from "@/lib/types";
import {
  createTemplateUncertaintyOption,
  templateUnsureOption,
} from "@/templates/pathfinder-module/uncertainty-options";
import { templateNarrowingBoosts } from "@/templates/pathfinder-module/narrowing-boosts";

export const templateAdaptiveQuestions: SurveyQuestion[] = [
  {
    id: "template-systems-scale",
    stage: "narrowing",
    kicker: "Narrow the system",
    title: "At which scale would you most like to study interactions?",
    type: "single",
    visibleWhen: { questionId: "template-motivation", anyOf: ["systems"] },
    options: [
      {
        id: "small",
        label: "A few interacting parts",
        nicheBoosts: templateNarrowingBoosts.systemsScale.small,
      },
      {
        id: "collective",
        label: "Many parts acting collectively",
        nicheBoosts: templateNarrowingBoosts.systemsScale.collective,
      },
      {
        id: "multi-scale",
        label: "Connections across several scales",
        nicheBoosts: templateNarrowingBoosts.systemsScale["multi-scale"],
      },
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
      {
        id: "stability",
        label: "Stability and change over time",
        nicheBoosts: templateNarrowingBoosts.systemsBehavior.stability,
      },
      {
        id: "emergence",
        label: "Unexpected collective behavior",
        nicheBoosts: templateNarrowingBoosts.systemsBehavior.emergence,
      },
      {
        id: "response",
        label: "Response to a controlled change",
        nicheBoosts: templateNarrowingBoosts.systemsBehavior.response,
      },
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
      {
        id: "measurements",
        label: "Measurements collected over time",
        nicheBoosts: templateNarrowingBoosts.dataEvidence.measurements,
      },
      {
        id: "images",
        label: "Images, maps, or spatial patterns",
        nicheBoosts: templateNarrowingBoosts.dataEvidence.images,
      },
      {
        id: "distributions",
        label: "Distributions and repeated samples",
        nicheBoosts: templateNarrowingBoosts.dataEvidence.distributions,
      },
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
        nicheBoosts: templateNarrowingBoosts.dataGoal.infer,
      },
      {
        id: "classify",
        label: "Recognize meaningful categories or states",
        nicheBoosts: templateNarrowingBoosts.dataGoal.classify,
      },
      {
        id: "forecast",
        label: "Forecast what may happen next",
        nicheBoosts: templateNarrowingBoosts.dataGoal.forecast,
      },
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
      {
        id: "accuracy",
        label: "How accurate and reliable is the method?",
        nicheBoosts: templateNarrowingBoosts.methodsFocus.accuracy,
      },
      {
        id: "efficiency",
        label: "How can the calculation become more efficient?",
        nicheBoosts: templateNarrowingBoosts.methodsFocus.efficiency,
      },
      {
        id: "interpretability",
        label: "How can the result become easier to interpret?",
        nicheBoosts: templateNarrowingBoosts.methodsFocus.interpretability,
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
      {
        id: "algorithms",
        label: "Two algorithms on the same problem",
        nicheBoosts: templateNarrowingBoosts.methodsComparison.algorithms,
      },
      {
        id: "resolution",
        label: "Different resolutions or approximations",
        nicheBoosts: templateNarrowingBoosts.methodsComparison.resolution,
      },
      {
        id: "validation",
        label: "Model output and independent evidence",
        nicheBoosts: templateNarrowingBoosts.methodsComparison.validation,
      },
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
      {
        id: "familiar",
        label: "A familiar real-world system",
        nicheBoosts: templateNarrowingBoosts.openContext.familiar,
      },
      {
        id: "surprising",
        label: "A surprising or counterintuitive phenomenon",
        nicheBoosts: templateNarrowingBoosts.openContext.surprising,
      },
      {
        id: "methods",
        label: "A comparison of computational methods",
        nicheBoosts: templateNarrowingBoosts.openContext.methods,
      },
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
      {
        id: "visual",
        label: "Clear figures and visual explanations",
        nicheBoosts: templateNarrowingBoosts.openSample.visual,
      },
      {
        id: "question",
        label: "One concrete scientific question",
        nicheBoosts: templateNarrowingBoosts.openSample.question,
      },
      {
        id: "workflow",
        label: "A step-by-step computational workflow",
        nicheBoosts: templateNarrowingBoosts.openSample.workflow,
      },
      templateUnsureOption,
    ],
  },
];
