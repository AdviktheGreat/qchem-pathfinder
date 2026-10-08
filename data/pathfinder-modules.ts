import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology/pathfinder";
import { computationalPhysicsPathfinder } from "@/data/pathfinders/computational-physics/pathfinder";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";
import { definePathfinderModule } from "@/lib/pathfinder-manifest";

export const quantumChemistryModule = definePathfinderModule({
  lifecycle: "available",
  definition: quantumChemistryPathfinder,
  catalog: {
    eyebrow: "Molecules, electrons, and computation",
    description:
      "Trace your interests from broad molecular questions toward a focused computational quantum chemistry direction.",
    outcome:
      "Leave with one promising sub-niche, two nearby alternatives, and a practical literature-search launchpad.",
    focusAreas: ["Molecules", "Electronic structure", "Computational methods"],
    duration: "About 10 minutes",
  },
  metadata: {
    description:
      "Narrow broad quantum chemistry interests into a promising research direction and a practical literature-search starting point.",
    openGraphDescription:
      "Explore molecular questions, electronic structure, computational methods, and research styles—then leave with a focused direction and literature-search launchpad.",
  },
});

export const computationalMaterialsModule = definePathfinderModule({
  lifecycle: "available",
  definition: computationalMaterialsPathfinder,
  catalog: {
    eyebrow: "Structure, properties, and useful materials",
    description:
      "Explore how modeling connects atoms and structures to batteries, catalysts, electronic materials, polymers, and other technologies.",
    outcome:
      "Narrow toward a materials family, scientific question, and modeling scale worth investigating.",
    focusAreas: ["Materials", "Structure–property links", "Simulation"],
    duration: "About 10 minutes",
  },
  metadata: {
    description:
      "Narrow broad computational materials interests into a promising research direction and a practical literature-search starting point.",
    openGraphDescription:
      "Explore materials, properties, modeling scales, and research styles—then leave with a focused direction and literature-search launchpad.",
  },
});

export const computationalBiologyModule = definePathfinderModule({
  lifecycle: "available",
  definition: computationalBiologyPathfinder,
  catalog: {
    eyebrow: "Molecules, living systems, and data",
    description:
      "Explore directions spanning molecular interactions, protein structure, drug discovery, biological data, and simulation.",
    outcome:
      "Narrow toward a biological scale, question type, and computational approach that fits your curiosity.",
    focusAreas: ["Biomolecules", "Health", "Biological data"],
    duration: "About 10 minutes",
  },
  metadata: {
    description:
      "Narrow broad computational biology interests into a promising research direction and a practical literature-search starting point.",
    openGraphDescription:
      "Explore biological scales, evidence, computational methods, and research styles—then leave with a focused direction and literature-search launchpad.",
  },
});

export const computationalPhysicsModule = definePathfinderModule({
  lifecycle: "available",
  definition: computationalPhysicsPathfinder,
  catalog: {
    eyebrow: "Physical laws, dynamic systems, and simulation",
    description:
      "Explore how computation helps physicists investigate motion, fields, matter, particles, fluids, and the universe.",
    outcome:
      "Narrow toward a physical system, research question, and computational approach worth investigating.",
    focusAreas: ["Physical systems", "Dynamics", "Numerical modeling"],
    duration: "About 10 minutes",
  },
  metadata: {
    description:
      "Narrow broad computational physics interests into a promising research direction and a practical literature-search starting point.",
    openGraphDescription:
      "Explore physical systems, scales, evidence, numerical methods, and research styles—then leave with a focused direction and literature-search launchpad.",
  },
});

export const pathfinderModules = [
  quantumChemistryModule,
  computationalMaterialsModule,
  computationalBiologyModule,
  computationalPhysicsModule,
] as const;
