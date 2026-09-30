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
];

export function getPathfinder(id: string): PathfinderCatalogEntry | undefined {
  return pathfinders.find((pathfinder) => pathfinder.id === id);
}
