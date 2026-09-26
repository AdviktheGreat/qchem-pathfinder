import type { SearchQueries } from "@/lib/types";

export const queryGuidance: Record<keyof SearchQueries, string> = {
  orientation:
    "Use this to learn the vocabulary and see the broad landscape before choosing a smaller topic.",
  focused:
    "Use this to find concrete examples connecting a system, property, or computational approach.",
  review:
    "Use this to look for an overview of methods, debates, and open problems; check the publication date and scope.",
};

export const searchRefinements = [
  {
    title: "Too many results?",
    text: "Add one specific system, property, or method. For example, narrow ‘noncovalent interactions’ to ‘noncovalent interactions hydrogen bonding energy decomposition’.",
  },
  {
    title: "Too few results?",
    text: "Remove one restrictive term or try a related phrase from ‘Also try’. For example, broaden ‘drug DNA stacking DFT solvation’ to ‘DNA stacking computational chemistry’.",
  },
  {
    title: "Results feel too technical?",
    text: "Try adding ‘tutorial’, ‘introduction’, or ‘review’. Search wording is a starting point; you can change it as you learn the field’s vocabulary.",
  },
] as const;

export const paperTypeGuide = [
  {
    term: "Review",
    text: "Brings together previous studies to explain a field or topic. Use it for vocabulary, context, and references to original work; check what it includes and leaves out.",
  },
  {
    term: "Perspective",
    text: "Offers an author’s interpretation of a field, its challenges, or future directions. Useful for debates and open problems, but not necessarily a comprehensive summary.",
  },
  {
    term: "Original research",
    text: "Reports a specific new investigation, with methods, results, and limitations. Read one after building enough context to understand what was tested.",
  },
] as const;

export const paperNoteTemplate = [
  "PAPER READING NOTE",
  "Source (title, authors, year, DOI or URL):",
  "Source checked against the actual paper:",
  "Paper type and scope:",
  "Molecular system or material studied:",
  "Question the authors investigated:",
  "Computational method and why it was used:",
  "Main finding (in my own words):",
  "Supporting figure, table, or page:",
  "Limitation or assumption:",
  "Unfamiliar terms to look up:",
  "What I want to understand next:",
].join("\n\n");
