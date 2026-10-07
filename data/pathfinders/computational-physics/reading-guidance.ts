import type { PaperTypeGuideEntry } from "@/lib/pathfinder-definition";

export const physicsPaperTypeGuide: readonly PaperTypeGuideEntry[] = [
  {
    term: "Review",
    text: "Synthesizes many studies around a physical system, model, or method. Use it to build vocabulary and locate original work, while checking which scales, regimes, and approximations its scope excludes.",
  },
  {
    term: "Perspective",
    text: "Explains an author’s view of major challenges and promising directions. It can reveal open questions, but it is selective rather than a complete field map.",
  },
  {
    term: "Methods or benchmark paper",
    text: "Introduces or compares a computational approach. Inspect its test problems, convergence, baselines, computational cost, uncertainty, and whether the evaluation resembles the physics you care about.",
  },
  {
    term: "Original simulation or application study",
    text: "Uses computation to make a specific physical claim. Read it after you can identify the model, initial and boundary conditions, numerical settings, validation, uncertainty, and observable evidence.",
  },
];

export const physicsPaperNoteTemplate = [
  "COMPUTATIONAL PHYSICS PAPER READING NOTE",
  "Source (title, authors, year, DOI or URL):",
  "Source checked against the actual paper:",
  "Paper type and scope:",
  "Physical system, scale, and regime:",
  "Research question or prediction:",
  "Governing model and important approximations:",
  "Computational method, resolution, and settings:",
  "Verification, validation, and uncertainty:",
  "Main finding (in my own words):",
  "Supporting figure, table, equation, or page:",
  "Limitation or possible alternative explanation:",
  "Unfamiliar terms to look up:",
  "What I want to understand next:",
].join("\n\n");

export const physicsReadingCopy = {
  heading: "Begin with a recent review or perspective",
  description:
    "It can introduce the physical vocabulary, governing models, numerical choices, observables, and major debates before you tackle a narrow study. Then follow its references to the original evidence behind important claims.",
  citationWarning:
    "Search engines and AI tools can return incomplete, incorrect, or invented citations. Verify the title, authors, year, journal or archive, and DOI or URL against the real source—and read that source before relying on it.",
  checklist: [
    "Identify the physical system, scale, regime, governing model, and computational method.",
    "Scan figures, captions, equations, results, and limitations before reading every implementation detail.",
    "Record resolution and convergence checks, validation evidence, uncertainty, assumptions, and open questions.",
  ],
} as const;
