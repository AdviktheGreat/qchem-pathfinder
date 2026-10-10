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
  orientation: {
    summary:
      "A strong starting point for questions centered on molecules, electrons, bonding, reactions, spectra, and the computational methods used to describe them.",
    boundary:
      "It usually keeps the molecule or electronic structure at the center; materials, biological, and larger physical behavior become neighboring lenses rather than the main scale.",
    affinities: [
      {
        signalId: "motivation:fundamental-rules",
        strength: 3,
        reason:
          "Quantum chemistry connects observable molecular behavior to electronic structure and fundamental chemical principles.",
      },
      {
        signalId: "motivation:molecular-health",
        strength: 2,
        reason:
          "Molecular interactions, solvation, and electronic effects can illuminate health-related chemical systems.",
      },
      {
        signalId: "motivation:methods-computing",
        strength: 2,
        reason:
          "The field continually evaluates computational approximations for molecular questions.",
      },
      {
        signalId: "motivation:space-universe",
        strength: 1,
        reason:
          "Molecular calculations can investigate astrochemical species and chemistry in extreme environments.",
      },
      {
        signalId: "system:molecules-electrons",
        strength: 3,
        reason:
          "Molecules and their electrons are the central systems in quantum chemistry.",
      },
      {
        signalId: "system:biomolecules-cells",
        strength: 1,
        reason:
          "Quantum chemistry can isolate electronic and molecular contributions within biomolecular systems.",
      },
      {
        signalId: "system:materials-interfaces",
        strength: 1,
        reason:
          "Molecular and electronic models can provide a small-scale lens on materials and interfaces.",
      },
      {
        signalId: "question:explain-mechanism",
        strength: 3,
        reason:
          "Electronic structure and energy landscapes help explain bonding, reactivity, and molecular interactions.",
      },
      {
        signalId: "question:predict-behavior",
        strength: 2,
        reason:
          "Calculations predict molecular structures, energies, properties, and responses.",
      },
      {
        signalId: "question:interpret-evidence",
        strength: 3,
        reason:
          "Computed spectra and electronic properties can help interpret experimental measurements.",
      },
      {
        signalId: "question:compare-methods",
        strength: 3,
        reason:
          "Benchmarking approximations is a central way to judge reliable molecular calculations.",
      },
      {
        signalId: "question:develop-theory",
        strength: 3,
        reason:
          "The field develops and tests mathematical approximations to molecular quantum mechanics.",
      },
      {
        signalId: "working-style:chemical-mechanisms",
        strength: 3,
        reason:
          "Structures, orbitals, interactions, and reaction pathways are common reasoning tools.",
      },
      {
        signalId: "working-style:visual-models",
        strength: 2,
        reason:
          "Molecular geometries, orbitals, densities, and energy diagrams make abstract calculations visible.",
      },
      {
        signalId: "working-style:mathematical-models",
        strength: 2,
        reason:
          "Quantum chemistry connects chemical intuition to mathematical models of electrons and nuclei.",
      },
      {
        signalId: "working-style:method-comparison",
        strength: 3,
        reason:
          "Accuracy, cost, and approximation choice matter throughout molecular computation.",
      },
      {
        signalId: "working-style:mixed-toolkit",
        strength: 2,
        reason:
          "Projects often combine chemical interpretation, computation, visualization, and literature evidence.",
      },
    ],
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
