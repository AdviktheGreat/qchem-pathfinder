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
