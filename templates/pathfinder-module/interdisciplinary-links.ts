import type { InterdisciplinaryLink } from "@/lib/interdisciplinary-links";

export const templateInterdisciplinaryLinks = [
  {
    id: "template-emergence-physics-networks",
    sourceNicheId: "collective-emergent-behavior",
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
  },
] satisfies readonly InterdisciplinaryLink[];
