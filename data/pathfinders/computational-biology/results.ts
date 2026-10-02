import type { PathfinderResultsConfig } from "@/lib/pathfinder-definition";

export const biologyResultsOverview = {
  eyebrow: "Your computational biology coordinates",
  title: "A clear map of the biology you want to investigate",
  description:
    "These coordinates summarize the choices shaping your directions today. They are a starting map, not a permanent label.",
  dimensions: [
    {
      label: "Biological motivation",
      questionId: "biology-motivation",
      fallback: "Open across biological themes",
    },
    {
      label: "Research question",
      questionId: "biology-question-kind",
      fallback: "Several kinds of research question",
    },
    {
      label: "Biological scale",
      questionId: "biology-scale",
      fallback: "Open across biological scales",
    },
    {
      label: "Evidence",
      questionId: "biology-evidence",
      fallback: "Several forms of biological evidence",
    },
  ],
} satisfies NonNullable<PathfinderResultsConfig["overview"]>;
