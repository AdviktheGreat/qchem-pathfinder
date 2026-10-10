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
  orientation: {
    summary:
      "A strong starting point for connecting atomic structure, microstructure, interfaces, and processing to the properties and performance of useful materials.",
    boundary:
      "It keeps collective material behavior and structure–property relationships central, even when it borrows molecular, biological, or physical methods.",
    affinities: [
      {
        signalId: "motivation:materials-technology",
        strength: 3,
        reason:
          "Computational materials research directly connects modeled structure to technological performance.",
      },
      {
        signalId: "motivation:energy-sustainability",
        strength: 3,
        reason:
          "Batteries, photovoltaics, catalysts, storage, and durable materials are major application families.",
      },
      {
        signalId: "motivation:environment-earth",
        strength: 2,
        reason:
          "Materials modeling can address corrosion, separations, resource use, and environmentally relevant interfaces.",
      },
      {
        signalId: "motivation:methods-computing",
        strength: 1,
        reason:
          "Materials questions often motivate multiscale, high-throughput, and data-driven computational workflows.",
      },
      {
        signalId: "system:materials-interfaces",
        strength: 3,
        reason:
          "Solids, surfaces, defects, polymers, and interfaces are central materials systems.",
      },
      {
        signalId: "system:multiple-scales",
        strength: 3,
        reason:
          "The field regularly links atoms and defects to microstructure, devices, and bulk performance.",
      },
      {
        signalId: "system:molecules-electrons",
        strength: 1,
        reason:
          "Atomic and electronic descriptions can explain small-scale origins of material properties.",
      },
      {
        signalId: "question:design-optimize",
        strength: 3,
        reason:
          "Many projects seek structures, compositions, or processing conditions with improved performance.",
      },
      {
        signalId: "question:predict-behavior",
        strength: 3,
        reason:
          "Models predict properties, stability, transport, and performance before costly experiments.",
      },
      {
        signalId: "question:explain-mechanism",
        strength: 2,
        reason:
          "Structure–property reasoning explains why defects, interfaces, and arrangements change behavior.",
      },
      {
        signalId: "question:interpret-evidence",
        strength: 2,
        reason:
          "Simulations help connect microscopy, diffraction, spectroscopy, and performance measurements to structure.",
      },
      {
        signalId: "question:find-data-patterns",
        strength: 2,
        reason:
          "Materials informatics can screen candidates and find relationships across large property datasets.",
      },
      {
        signalId: "working-style:visual-models",
        strength: 3,
        reason:
          "Crystal structures, defects, interfaces, and evolving microstructures are highly visual research objects.",
      },
      {
        signalId: "working-style:numerical-simulation",
        strength: 3,
        reason:
          "Simulation links material models to behavior across conditions, time, and length scales.",
      },
      {
        signalId: "working-style:coding-algorithms",
        strength: 2,
        reason:
          "Automated workflows and specialized simulation tools are common in materials projects.",
      },
      {
        signalId: "working-style:data-statistics",
        strength: 2,
        reason:
          "Property databases and high-throughput calculations support statistical and machine-learning approaches.",
      },
      {
        signalId: "working-style:mixed-toolkit",
        strength: 3,
        reason:
          "Materials research often combines physical models, computation, data, visualization, and application constraints.",
      },
    ],
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
