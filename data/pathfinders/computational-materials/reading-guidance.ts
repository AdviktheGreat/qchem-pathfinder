import type {
  PaperTypeGuideEntry,
  SearchRefinement,
} from "@/lib/pathfinder-definition";
import type { SearchQueries } from "@/lib/types";

export const materialsQueryGuidance: Record<keyof SearchQueries, string> = {
  orientation:
    "Use this to learn the direction’s main material families, properties, and modeling vocabulary before narrowing the scope.",
  focused:
    "Use this to find studies that connect a particular material, target property, and computational method.",
  review:
    "Use this to find a recent map of established methods, unresolved limitations, and active materials questions; check its date and scope.",
};

export const materialsSearchRefinements: readonly SearchRefinement[] = [
  {
    title: "Too many results?",
    text: "Add one material family, target property, or modeling method—for example, narrow ‘battery materials modeling’ to ‘solid electrolyte lithium diffusion molecular dynamics’.",
  },
  {
    title: "Too few results?",
    text: "Remove one restrictive term or substitute a related phrase. Try the broader material class before a specific composition or device architecture.",
  },
  {
    title: "Results feel too technical?",
    text: "Add ‘tutorial’, ‘introduction’, ‘review’, or ‘perspective’. Keep a short vocabulary list and revise the search as you learn the field’s language.",
  },
];

export const materialsPaperTypeGuide: readonly PaperTypeGuideEntry[] = [
  {
    term: "Review",
    text: "Synthesizes many studies around a material class, property, or method. Use it to build vocabulary and locate influential original work, while checking what systems its scope excludes.",
  },
  {
    term: "Perspective",
    text: "Explains an author’s view of major challenges and promising directions. It is useful for open questions, but it is selective rather than a complete survey.",
  },
  {
    term: "Benchmark or validation study",
    text: "Compares predictions with higher-level calculations, experiments, or reference datasets. Use it to understand where a computational approach is reliable and where it can fail.",
  },
  {
    term: "Original research",
    text: "Reports a specific new calculation, model, dataset, or experiment–simulation comparison. Read it after you can identify the material, property, method, and validation evidence.",
  },
];

export const materialsPaperNoteTemplate = [
  "MATERIALS PAPER READING NOTE",
  "Source (title, authors, year, DOI or URL):",
  "Source checked against the actual paper:",
  "Paper type and scope:",
  "Material, structure, and conditions studied:",
  "Property or phenomenon investigated:",
  "Modeling scale and computational method:",
  "How the calculation or model was validated:",
  "Main finding (in my own words):",
  "Supporting figure, table, or page:",
  "Limitation or assumption:",
  "Unfamiliar terms to look up:",
  "What I want to understand next:",
].join("\n\n");

export const materialsReadingCopy = {
  heading: "Begin with a recent review or perspective",
  description:
    "It can introduce the material families, property language, common modeling scales, and major debates before you tackle a narrow original study. Then follow its references to the work behind important claims.",
  citationWarning:
    "Search engines and AI tools can return incomplete or incorrect citations. Verify the title, authors, year, journal, and DOI or URL against the real source—and read that source before relying on it.",
  checklist: [
    "Identify the material, target property, modeling scale, and validation evidence.",
    "Scan headings, figures, and the conclusion before reading the methods closely.",
    "Record repeated methods, assumptions, limitations, and open questions.",
  ],
} as const;
