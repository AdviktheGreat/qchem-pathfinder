export type PathfinderStatus = "available" | "coming-soon";

export interface PathfinderCatalogEntry {
  id: string;
  name: string;
  shortName: string;
  eyebrow: string;
  description: string;
  outcome: string;
  focusAreas: string[];
  duration: string;
  status: PathfinderStatus;
  href?: string;
}

export const pathfinders: PathfinderCatalogEntry[] = [
  {
    id: "quantum-chemistry",
    name: "Quantum Chemistry Pathfinder",
    shortName: "Quantum chemistry",
    eyebrow: "Molecules, electrons, and computation",
    description:
      "Trace your interests from broad molecular questions toward a focused computational quantum chemistry direction.",
    outcome:
      "Leave with one promising sub-niche, two nearby alternatives, and a practical literature-search launchpad.",
    focusAreas: ["Molecules", "Electronic structure", "Computational methods"],
    duration: "About 10 minutes",
    status: "available",
    href: "/pathfinders/quantum-chemistry",
  },
  {
    id: "computational-materials",
    name: "Computational Materials Pathfinder",
    shortName: "Computational materials",
    eyebrow: "Structure, properties, and useful materials",
    description:
      "Explore how modeling connects atoms and structures to batteries, catalysts, electronic materials, polymers, and other technologies.",
    outcome:
      "Narrow toward a materials family, scientific question, and modeling scale worth investigating.",
    focusAreas: ["Materials", "Structure–property links", "Simulation"],
    duration: "About 10 minutes",
    status: "available",
    href: "/pathfinders/computational-materials",
  },
  {
    id: "computational-biology",
    name: "Computational Biology Pathfinder",
    shortName: "Computational biology",
    eyebrow: "Molecules, living systems, and data",
    description:
      "Explore directions spanning molecular interactions, protein structure, drug discovery, biological data, and simulation.",
    outcome:
      "Narrow toward a biological scale, question type, and computational approach that fits your curiosity.",
    focusAreas: ["Biomolecules", "Health", "Biological data"],
    duration: "About 10 minutes",
    status: "available",
    href: "/pathfinders/computational-biology",
  },
];

export function getPathfinder(id: string): PathfinderCatalogEntry | undefined {
  return pathfinders.find((pathfinder) => pathfinder.id === id);
}
