import type { PathfinderProfileConfig } from "@/lib/pathfinder-definition";

export const computationalPhysicsProfile = {
  researchStyleLabels: {
    "physics-scale": "Physical scale",
    "physics-evidence": "Preferred physical evidence",
    "physics-workflow": "Preferred workflow",
  },
  exportTitle: "COMPUTATIONAL PHYSICS EXPLORATION PROFILE",
  filenamePrefix: "computational-physics-profile",
  motivationQuestionId: "physics-motivation",
  questionTypeQuestionId: "physics-question-kind",
} satisfies PathfinderProfileConfig;
