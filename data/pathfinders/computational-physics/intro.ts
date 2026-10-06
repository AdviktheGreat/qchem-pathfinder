import type { PathfinderIntroCopy } from "@/lib/pathfinder-definition";

export const computationalPhysicsIntro = {
  eyebrow: "A guided computational physics exploration",
  title: "Find a physical system worth investigating through computation.",
  description:
    "Start with the phenomena, scales, and questions that catch your attention. We’ll connect that curiosity to the ways computational physicists model nature.",
  scopeNote:
    "You’ll leave with one promising direction, two nearby alternatives, and practical language for beginning a literature search—not a final research question, physics grade, or judgment of mathematical ability.",
  durationLabel: "About 10 minutes",
  privacyLabel: "Saved only in this browser",
  noScoreLabel: "Experience changes guidance, not access",
  privacyNote:
    "No account or identifying details are requested. Your answers stay in this browser so you can refresh and return; the pathfinder does not transmit them to a server.",
  promiseSteps: [
    {
      label: "Notice",
      text: "which physical systems, scales, and unexplained behaviors hold your attention.",
    },
    {
      label: "Narrow",
      text: "toward a physical question and computational way of investigating it.",
    },
    {
      label: "Launch",
      text: "into the literature with useful vocabulary, model comparisons, and search language.",
    },
  ],
  branchingNote:
    "Your answers shape the follow-up questions and reading directions—not an ability score, fixed identity, or hidden personality label.",
} satisfies PathfinderIntroCopy;
