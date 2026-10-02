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

export const biologyFitEvidenceCopy = {
  matchedHeading: "Why this biology direction matched",
  startingHeading: "Why this is a useful direction to sample",
  explanationSummary: "Trace the recommendation to your answers",
  interestHeading: "Biological interest fit",
  styleHeading: "Research-style fit",
  transparentNote:
    "Interest and research-style choices are scored separately. Familiarity, coding experience, and statistical comfort only change preparation guidance—they never lower a direction’s value or block it.",
  openInitially: true,
} satisfies NonNullable<PathfinderResultsConfig["fitEvidenceCopy"]>;

export const biologyPreparationCopy = {
  eyebrow: "Preparation is a bridge, not a gate",
  title: "Build the background while you explore",
  description:
    "Your familiarity, statistics, and coding experience change which supports may help—not whether you belong in a direction. Use these as optional companions to your first papers.",
  conceptsHeading: "Biology and data concepts worth revisiting",
  firstStepHeading: "A realistic first computational step",
} satisfies NonNullable<PathfinderResultsConfig["preparationCopy"]>;

export const biologyAlternativesCopy = {
  eyebrow: "Keep adjacent biological questions visible",
  title: "Two nearby directions worth comparing",
  matchedReasonLabel: "Why it also fits",
  sampleReasonLabel: "Why it is worth sampling",
  chooseActionLabel: "Explore this biology direction",
  comparisonHeading: "Compare the biological emphasis",
  comparisonDescription:
    "Each comparison describes a different scientific focus—not the difficulty, importance, or quality of either direction.",
  detailOpenLabel: "See questions, methods, and searches",
  detailCloseLabel: "Hide questions, methods, and searches",
} satisfies NonNullable<PathfinderResultsConfig["alternativesCopy"]>;
