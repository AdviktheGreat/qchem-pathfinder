import type { InterdisciplinaryLink } from "@/lib/interdisciplinary-links";

export const templateInterdisciplinaryLinks = [
  {
    id: "template-emergence-physics-networks",
    sourceNicheId: "collective-emergent-behavior",
    connectionKinds: ["shared-question", "shared-method"],
    sharedQuestion:
      "Write one question a researcher from either field could genuinely investigate.",
    explorationStep:
      "Suggest one concrete review, comparison, or vocabulary-building action a beginner can take next.",
    targetPathfinderId: "computational-physics",
    targetPathfinderName: "Computational physics",
    targetNicheId: "network-emergent-dynamics",
    targetNicheName: "Network & emergent dynamics",
    bridge:
      "Explain the concrete question or method the two directions genuinely share.",
    distinction:
      "Explain where their systems, scales, evidence, or research goals meaningfully differ.",
    sharedKeywords: [
      "shared concept",
      "source and target method",
      "interdisciplinary review",
    ],
    searchSeeds: {
      orientation: ["source topic", "target topic"],
      focused: ["shared system", "shared method", "specific mechanism"],
      review: ["source target intersection"],
    },
  },
] satisfies readonly InterdisciplinaryLink[];
