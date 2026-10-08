import type { GlossaryItem } from "@/lib/pathfinder-definition";

export const templateGlossary = [
  {
    term: "Computational model",
    text: "A mathematical or rule-based representation translated into calculations that a computer can carry out.",
  },
  {
    term: "Approximation",
    text: "A deliberate simplification that makes a problem manageable while preserving the behavior relevant to a stated question.",
  },
  {
    term: "Parameter",
    text: "A chosen value that controls part of a model and can be varied to study how the result changes.",
  },
  {
    term: "Validation",
    text: "Evidence that a model or method represents the intended real or reference behavior well enough for a particular use.",
  },
  {
    term: "Sensitivity analysis",
    text: "A structured test of how assumptions, inputs, or computational settings influence a conclusion.",
  },
  {
    term: "Uncertainty",
    text: "The range of plausible values or conclusions remaining because evidence, models, and numerical calculations are imperfect.",
  },
] satisfies readonly GlossaryItem[];
