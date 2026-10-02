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

export const biologyPrimaryCopy = {
  eyebrow: "Your computational biology map",
  title: "A promising biological direction to investigate",
  description:
    "Use this as a well-supported starting point for reading and comparison—not as a final topic, a diagnosis, or a limit on what you can study.",
  contextSummary: "Beginner-friendly scientific orientation",
} satisfies NonNullable<PathfinderResultsConfig["primaryCopy"]>;

export const biologyDirectionDetailsCopy = {
  questionsHeading: "Questions computational biologists ask",
  systemsHeading: "Biological systems, datasets, and contexts",
  systemsDescription:
    "These examples connect the direction to organisms, molecules, cells, environments, and research datasets you may meet in the literature.",
  approachesHeading: "How researchers investigate this direction",
  approachesDescription:
    "Each approach answers a different kind of biological question. You do not need to master the tools before you begin reading.",
} satisfies NonNullable<PathfinderResultsConfig["directionDetailsCopy"]>;
