import type { PathfinderProfileConfig } from "@/lib/pathfinder-definition";

export const computationalBiologyProfile = {
  researchStyleLabels: {
    "biology-scale": "Biological scale",
    "biology-evidence": "Preferred biological evidence",
    "biology-workflow": "Preferred workflow",
  },
  exportTitle: "COMPUTATIONAL BIOLOGY EXPLORATION PROFILE",
  filenamePrefix: "computational-biology-profile",
  motivationQuestionId: "biology-motivation",
  questionTypeQuestionId: "biology-question-kind",
} satisfies PathfinderProfileConfig;
