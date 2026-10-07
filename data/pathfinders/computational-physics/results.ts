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

export const physicsAlternativesCopy = {
  eyebrow: "Keep adjacent physical questions visible",
  title: "Two nearby directions worth comparing",
  matchedReasonLabel: "Why it also fits",
  sampleReasonLabel: "Why it is worth sampling",
  chooseActionLabel: "Explore this physics direction",
  comparisonHeading: "Compare the physical emphasis",
  comparisonDescription:
    "Each comparison describes a different system, scale, model, or evidence type—not the difficulty, importance, or quality of either direction.",
  detailOpenLabel: "See questions, methods, and searches",
  detailCloseLabel: "Hide questions, methods, and searches",
} satisfies NonNullable<PathfinderResultsConfig["alternativesCopy"]>;

export const physicsComparisonPrinciples = [
  "Compare the central physical question, scale, evidence, governing model, and computational approach.",
  "Describe differences without ranking fields by difficulty, importance, mathematical sophistication, or student readiness.",
  "Keep neighboring directions open when the same model or evidence can support more than one physical interpretation.",
] as const;

export const physicsKeywordCopy = {
  heading: "Starter computational physics keywords",
  description:
    "Combine a physical system, the behavior or observable you want to study, and a computational method to make these terms more specific.",
  synonymsLabel: "Related phrases used in computational physics literature",
} as const;

export const physicsQueryGuidance = {
  orientation:
    "Use this first to learn the field’s vocabulary, governing models, common observables, and central physical questions.",
  focused:
    "Use this after orientation to connect a narrower physical system, mechanism or observable, and computational approach.",
  review:
    "Prioritize recent reviews or perspectives, then follow their references to original methods, simulations, and comparison studies.",
} as const;

export const physicsSearchRefinements = [
  {
    title: "Too many results?",
    text: "Add a physical system, regime, scale, observable, numerical method, or date range.",
  },
  {
    title: "Too few results?",
    text: "Remove the narrowest algorithm term, try a listed synonym, or search the broader area name.",
  },
  {
    title: "Results feel disconnected?",
    text: "Keep one physical-system term and one computational term, then inspect the vocabulary used by a recent review.",
  },
] as const;

export const physicsSearchCopy = {
  keywordsHeading: physicsKeywordCopy.heading,
  keywordsDescription: physicsKeywordCopy.description,
  synonymsLabel: physicsKeywordCopy.synonymsLabel,
  queriesHeading: "Three searches at different depths",
  queriesDescription:
    "Start broad enough to learn the field’s language, then move toward a physical system–observable–method combination and a recent review.",
} satisfies NonNullable<PathfinderResultsConfig["searchCopy"]>;

export const physicsSearchProviders = [
  {
    label: "Google Scholar",
    urlTemplate: "https://scholar.google.com/scholar?q={query}",
  },
  {
    label: "arXiv",
    urlTemplate: "https://arxiv.org/search/?query={query}&searchtype=all",
  },
  {
    label: "Semantic Scholar",
    urlTemplate: "https://www.semanticscholar.org/search?q={query}",
  },
] satisfies NonNullable<PathfinderResultsConfig["searchProviders"]>;

export const physicsExportCopy = {
  eyebrow: "Take your physics map with you",
  title: "Computational physics exploration profile",
  description:
    "Copy or download this consistent plain-text profile for workshop notes and a later literature-search prompt kit. It contains no personal information.",
  copyLabel: "Copy physics profile",
  downloadLabel: "Download physics profile",
} satisfies NonNullable<PathfinderResultsConfig["exportCopy"]>;

export const physicsActionsCopy = {
  eyebrow: "Your physics map can evolve",
  title: "Compare, revise, or begin again",
  nearbyLabel: "Explore a nearby physics path",
  reviewLabel: "Review my physics answers",
  restartLabel: "Restart physics pathfinder",
  returnOriginalLabel: "Return to my original physics suggestion",
} satisfies NonNullable<PathfinderResultsConfig["actionsCopy"]>;
