import type { SearchQueries } from "@/lib/types";

export const queryGuidance: Record<keyof SearchQueries, string> = {
  orientation:
    "Use this to learn the vocabulary and see the broad landscape before choosing a smaller topic.",
  focused:
    "Use this to find concrete examples connecting a system, property, or computational approach.",
  review:
    "Use this to look for an overview of methods, debates, and open problems; check the publication date and scope.",
};
