import type { PathfinderResultsConfig } from "@/lib/pathfinder-definition";

export const physicsResultsOverview = {
  eyebrow: "Your computational physics coordinates",
  title: "A clear map of the physics you want to investigate",
  description:
    "These coordinates summarize the choices shaping your directions today. They are a starting map, not a permanent label.",
  dimensions: [
    {
      label: "Physical motivation",
      questionId: "physics-motivation",
      fallback: "Open across physical systems",
    },
    {
      label: "Research question",
      questionId: "physics-question-kind",
      fallback: "Several kinds of research question",
    },
    {
      label: "Physical scale",
      questionId: "physics-scale",
      fallback: "Open across physical scales",
    },
    {
      label: "Evidence",
      questionId: "physics-evidence",
      fallback: "Several forms of physical evidence",
    },
  ],
} satisfies NonNullable<PathfinderResultsConfig["overview"]>;

export const physicsPrimaryCopy = {
  eyebrow: "Your computational physics map",
  title: "A promising physical direction to investigate",
  description:
    "Use this as a well-supported starting point for reading and comparison—not as a final research question, ability judgment, or limit on what you can study.",
  contextSummary: "Beginner-friendly scientific orientation",
} satisfies NonNullable<PathfinderResultsConfig["primaryCopy"]>;

export const physicsDirectionDetailsCopy = {
  questionsHeading: "Questions computational physicists ask",
  systemsHeading: "Physical systems and observable contexts",
  systemsDescription:
    "These examples connect the direction to particles, fields, matter, instruments, environments, and scales you may meet in the literature.",
  approachesHeading: "How researchers investigate this direction",
  approachesDescription:
    "Each approach represents the physical system through chosen assumptions and numerical approximations. You do not need to master the tools before you begin reading.",
} satisfies NonNullable<PathfinderResultsConfig["directionDetailsCopy"]>;

export const physicsFitEvidenceCopy = {
  matchedHeading: "Why this physics direction matched",
  startingHeading: "Why this is a useful direction to sample",
  explanationSummary: "Trace the recommendation to your answers",
  interestHeading: "Physical-interest fit",
  styleHeading: "Research-style fit",
  transparentNote:
    "Interest and research-style choices are scored separately. Familiarity, mathematics, coding, statistics, and tool experience only change preparation guidance—they never lower a direction’s value or block it.",
  openInitially: true,
} satisfies NonNullable<PathfinderResultsConfig["fitEvidenceCopy"]>;

export const physicsPreparationCopy = {
  eyebrow: "Preparation is a bridge, not a gate",
  title: "Build the background while you explore",
  description:
    "Your familiarity, mathematics, statistics, and coding experience change which supports may help—not whether you belong in a direction. Use these as optional companions to your first papers.",
  conceptsHeading: "Physics and computation concepts worth revisiting",
  firstStepHeading: "A realistic first computational step",
} satisfies NonNullable<PathfinderResultsConfig["preparationCopy"]>;
