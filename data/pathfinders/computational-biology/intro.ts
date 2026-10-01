import type { PathfinderIntroCopy } from "@/lib/pathfinder-definition";

export const computationalBiologyIntro = {
  eyebrow: "A guided computational biology exploration",
  title: "Find a biological question worth investigating with data.",
  description:
    "Start with the living systems, patterns, and problems that catch your attention. We’ll connect that curiosity to the questions computational biologists study.",
  scopeNote:
    "You’ll leave with one promising direction, two nearby alternatives, and practical language for beginning a literature search—not a final research question, ability score, or medical recommendation.",
  durationLabel: "About 10 minutes",
  privacyLabel: "Saved only in this browser",
  noScoreLabel: "Experience changes guidance, not access",
  privacyNote:
    "No account, personal health information, or identifying details are requested. Your answers stay in this browser so you can refresh and return; the pathfinder does not transmit them to a server.",
  promiseSteps: [
    {
      label: "Notice",
      text: "which living systems, biological patterns, and real-world questions hold your attention.",
    },
    {
      label: "Narrow",
      text: "toward a biological scale, research question, and computational way of investigating it.",
    },
    {
      label: "Launch",
      text: "into the literature with useful vocabulary, comparisons, and search language.",
    },
  ],
  branchingNote:
    "Your answers shape the follow-up questions and reading directions—not an ability score, diagnosis, or hidden personality label.",
} satisfies PathfinderIntroCopy;
