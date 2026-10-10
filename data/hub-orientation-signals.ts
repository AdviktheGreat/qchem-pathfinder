import type { HubOrientationSignalDefinition } from "@/lib/hub-orientation";

export const hubMotivationSignals = [
  {
    id: "motivation:molecular-health",
    dimension: "motivation",
    label: "Molecules and health",
    description:
      "Understand molecular interactions that shape medicines, biomolecules, or health-related systems.",
  },
  {
    id: "motivation:energy-sustainability",
    dimension: "motivation",
    label: "Energy and sustainability",
    description:
      "Investigate how matter can capture, store, transform, or use energy more effectively.",
  },
  {
    id: "motivation:environment-earth",
    dimension: "motivation",
    label: "Environment and Earth",
    description:
      "Explore molecular or physical processes in atmospheres, oceans, climate, or environmental systems.",
  },
  {
    id: "motivation:materials-technology",
    dimension: "motivation",
    label: "Materials and technology",
    description:
      "Connect structure and behavior to useful electronic, structural, catalytic, or soft materials.",
  },
  {
    id: "motivation:living-systems",
    dimension: "motivation",
    label: "Living systems",
    description:
      "Use computation to understand biological molecules, cells, genomes, populations, or disease mechanisms.",
  },
  {
    id: "motivation:fundamental-rules",
    dimension: "motivation",
    label: "Fundamental rules",
    description:
      "Ask how underlying physical or chemical principles produce the behavior we observe.",
  },
  {
    id: "motivation:space-universe",
    dimension: "motivation",
    label: "Space and the universe",
    description:
      "Study matter, dynamics, or chemical processes in planets, stars, galaxies, or extreme environments.",
  },
  {
    id: "motivation:methods-computing",
    dimension: "motivation",
    label: "Methods and computing",
    description:
      "Improve algorithms, simulations, data methods, or approximations used to answer scientific questions.",
  },
] as const satisfies readonly HubOrientationSignalDefinition[];
