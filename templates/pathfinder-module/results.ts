import { fitLabelDescriptions } from "@/data/fit-labels";
import type { PathfinderResultsConfig } from "@/lib/pathfinder-definition";
import { templateGlossary } from "@/templates/pathfinder-module/glossary";
import {
  templatePaperNote,
  templatePaperTypeGuide,
  templateReadingCopy,
} from "@/templates/pathfinder-module/reading-guidance";

export const templatePathfinderResults = {
  glossary: templateGlossary,
  fitLabelDescriptions,
  queryGuidance: {
    orientation:
      "Use this first to learn the direction’s vocabulary, common systems, methods, and central questions.",
    focused:
      "Combine one system, one behavior or observable, and one computational approach.",
    review:
      "Look for a recent review or perspective, then follow its references to original evidence.",
  },
  searchRefinements: [
    {
      title: "Too many results?",
      text: "Add a specific system, scale, observable, method, or date range.",
    },
    {
      title: "Too few results?",
      text: "Remove one constraint or replace a narrow phrase with a listed synonym.",
    },
  ],
  paperTypeGuide: templatePaperTypeGuide,
  paperNoteTemplate: templatePaperNote,
  overview: {
    eyebrow: "Your template-science coordinates",
    title: "A clear map of what you want to investigate",
    description:
      "These coordinates summarize the choices shaping your directions today. They are a starting map, not a permanent label.",
    dimensions: [
      {
        label: "Scientific motivation",
        questionId: "template-motivation",
        fallback: "Several motivations remain open",
      },
      {
        label: "Research question",
        questionId: "template-question-type",
        fallback: "Several question types remain open",
      },
      {
        label: "Working style",
        questionId: "template-work-style",
        fallback: "Several working styles remain open",
      },
    ],
  },
  primaryCopy: {
    eyebrow: "A promising place to begin",
    title: "Your primary exploration direction",
    description:
      "Treat this as a well-supported doorway into the literature, not a final research question or objective measurement of fit.",
    contextSummary:
      "Begin with the system, question, model, and evidence before implementation details.",
  },
  directionDetailsCopy: {
    questionsHeading: "Questions researchers ask",
    systemsHeading: "Representative systems and contexts",
    systemsDescription:
      "These examples show where the direction appears in research literature.",
    approachesHeading: "How researchers investigate this direction",
    approachesDescription:
      "Each approach makes assumptions and needs evidence that its output is trustworthy.",
  },
  fitEvidenceCopy: {
    matchedHeading: "Why this direction matches your current answers",
    startingHeading: "Why this is a useful direction to sample",
    explanationSummary: "Trace the recommendation to your answers",
    interestHeading: "Interest signals",
    styleHeading: "Ways of working",
    transparentNote:
      "Interest and research-style evidence are scored separately. Calibration only changes preparation guidance.",
  },
  preparationCopy: {
    eyebrow: "Preparation is a bridge, not a gate",
    title: "Build the background while you explore",
    description:
      "Use these supports beside your first papers; unfamiliar ideas do not disqualify a direction.",
    conceptsHeading: "Concepts worth revisiting",
    firstStepHeading: "A realistic first computational step",
  },
  alternativesCopy: {
    eyebrow: "Keep adjacent questions visible",
    title: "Two nearby directions worth comparing",
    matchedReasonLabel: "Why it may also fit",
    sampleReasonLabel: "Why it is worth sampling",
    chooseActionLabel: "Explore this as my primary direction",
    comparisonHeading: "How the emphasis changes",
    comparisonDescription:
      "Compare systems, questions, evidence, and methods—not importance or difficulty.",
    detailOpenLabel: "Expand direction",
    detailCloseLabel: "Collapse direction",
  },
  searchCopy: {
    keywordsHeading: "Starter keywords",
    keywordsDescription:
      "Combine a system, behavior or observable, and computational method.",
    synonymsLabel: "Related phrases used in the literature",
    queriesHeading: "Three searches at different depths",
    queriesDescription:
      "Start broad, narrow toward a concrete combination, then look for a recent review.",
  },
  readingCopy: templateReadingCopy,
  searchProviders: [
    {
      label: "Google Scholar",
      urlTemplate: "https://scholar.google.com/scholar?q={query}",
    },
    {
      label: "Semantic Scholar",
      urlTemplate: "https://www.semanticscholar.org/search?q={query}",
    },
  ],
  exportCopy: {
    eyebrow: "Keep the map",
    title: "Export your research exploration profile",
    description:
      "Copy or download a stable plain-text summary for notes, an instructor conversation, or a later literature-search prompt.",
    copyLabel: "Copy profile",
    downloadLabel: "Download profile",
  },
  actionsCopy: {
    eyebrow: "Keep exploring",
    title: "Choose your next move",
    nearbyLabel: "Explore a nearby path",
    reviewLabel: "Review my answers",
    restartLabel: "Restart",
    returnOriginalLabel: "Return to the original suggestion",
  },
} satisfies PathfinderResultsConfig;
