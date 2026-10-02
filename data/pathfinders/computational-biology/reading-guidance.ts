import type { PaperTypeGuideEntry } from "@/lib/pathfinder-definition";

export const biologyPaperTypeGuide: readonly PaperTypeGuideEntry[] = [
  {
    term: "Review",
    text: "Synthesizes many studies around a biological question, data type, or method. Use it to build vocabulary and locate original work, while checking which organisms, samples, and datasets its scope excludes.",
  },
  {
    term: "Perspective",
    text: "Explains an author’s view of major challenges and promising directions. It can reveal open questions, but it is selective rather than a complete survey.",
  },
  {
    term: "Methods or benchmark paper",
    text: "Introduces or compares a computational workflow. Inspect its test data, baselines, validation, limitations, and whether the evaluation resembles the biology you care about.",
  },
  {
    term: "Original application study",
    text: "Uses data and computation to make a specific biological claim. Read it after you can identify the samples, comparison, method, controls, uncertainty, and independent evidence.",
  },
];

export const biologyPaperNoteTemplate = [
  "COMPUTATIONAL BIOLOGY PAPER READING NOTE",
  "Source (title, authors, year, DOI or URL):",
  "Source checked against the actual paper:",
  "Paper type and scope:",
  "Biological system, samples, and dataset:",
  "Question or comparison:",
  "Computational method and important assumptions:",
  "Controls, validation, and uncertainty:",
  "Main finding (in my own words):",
  "Supporting figure, table, or page:",
  "Limitation or possible alternative explanation:",
  "Unfamiliar terms to look up:",
  "What I want to understand next:",
].join("\n\n");

export const biologyReadingCopy = {
  heading: "Begin with a recent review or perspective",
  description:
    "It can introduce the biological vocabulary, common datasets, analysis choices, and major debates before you tackle a narrow study. Then follow its references to the original evidence behind important claims.",
  citationWarning:
    "Search engines and AI tools can return incomplete, incorrect, or invented citations. Verify the title, authors, year, journal, and DOI or URL against the real source—and read that source before relying on it.",
  checklist: [
    "Identify the biological system, samples, comparison, data type, and computational method.",
    "Scan figures, captions, results, and limitations before reading every method detail.",
    "Record validation evidence, possible confounders, uncertainty, and open questions.",
  ],
} as const;
