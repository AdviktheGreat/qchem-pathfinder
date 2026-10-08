import type { PathfinderIntroCopy } from "@/lib/pathfinder-definition";

export const templatePathfinderIntro = {
  eyebrow: "A guided template-science exploration",
  title: "Find a scientific direction worth investigating.",
  description:
    "Begin with the systems and questions that hold your attention. This pathfinder will connect that curiosity to focused research directions and useful literature-search language.",
  scopeNote:
    "You will leave with one promising direction and two nearby alternatives—not a final research question, ability judgment, or permanent label.",
  durationLabel: "About 10 minutes",
  privacyLabel: "Saved only in this browser",
  noScoreLabel: "Experience changes guidance, not access",
  privacyNote:
    "Your answers stay in this browser. The pathfinder does not ask for personal information or transmit survey responses.",
  promiseSteps: [
    {
      label: "Notice",
      text: "which systems, phenomena, and unanswered questions catch your attention.",
    },
    {
      label: "Narrow",
      text: "toward a research style and scientific direction worth comparing.",
    },
    {
      label: "Launch",
      text: "into the literature with keywords, searches, and a first-paper plan.",
    },
  ],
  branchingNote:
    "Your broad interest changes the follow-up questions you see. There are no wrong answers, and uncertainty keeps several paths open.",
} satisfies PathfinderIntroCopy;
