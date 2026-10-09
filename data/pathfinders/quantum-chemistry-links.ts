import type { InterdisciplinaryLink } from "@/lib/interdisciplinary-links";

export const quantumChemistryInterdisciplinaryLinks = [
  {
    id: "qchem-charge-transfer-materials-photovoltaics",
    sourceNicheId: "charge-transfer",
    targetPathfinderId: "computational-materials",
    targetPathfinderName: "Computational materials",
    targetNicheId: "photovoltaic-materials",
    targetNicheName: "Photovoltaic materials",
    bridge:
      "Charge separation in a molecule becomes a materials question when packing, interfaces, transport, and device stability shape whether that charge can do useful work.",
    distinction:
      "Quantum chemistry centers the electronic change in molecular models; materials research follows that behavior into extended solids and interfaces.",
    sharedKeywords: [
      "photoinduced charge transfer",
      "photovoltaic materials",
      "charge separation",
    ],
  },
  {
    id: "qchem-catalysis-materials-surfaces",
    sourceNicheId: "computational-catalysis",
    targetPathfinderId: "computational-materials",
    targetPathfinderName: "Computational materials",
    targetNicheId: "heterogeneous-catalysis-surfaces",
    targetNicheName: "Heterogeneous catalysis & surfaces",
    bridge:
      "Both directions map adsorption, bond rearrangement, and energy barriers to explain why a catalyst favors one route.",
    distinction:
      "The chemistry path can emphasize molecular catalysts; the materials path makes a solid surface and its active sites the central system.",
    sharedKeywords: [
      "catalytic reaction pathway",
      "surface adsorption",
      "activation barrier",
    ],
  },
  {
    id: "qchem-biomolecular-electronics-biology-dynamics",
    sourceNicheId: "biomolecular-electronics",
    targetPathfinderId: "computational-biology",
    targetPathfinderName: "Computational biology",
    targetNicheId: "biomolecular-simulation-dynamics",
    targetNicheName: "Biomolecular simulation & conformational dynamics",
    bridge:
      "Electronic interactions help explain local binding, while biomolecular simulation asks how the larger protein, nucleic acid, or membrane changes shape over time.",
    distinction:
      "Quantum chemistry resolves electrons in smaller models; computational biology usually trades that detail for larger systems and longer motions.",
    sharedKeywords: [
      "biomolecular interactions",
      "conformational dynamics",
      "multiscale simulation",
    ],
  },
  {
    id: "qchem-ml-materials-high-throughput",
    sourceNicheId: "ml-property-prediction",
    targetPathfinderId: "computational-materials",
    targetPathfinderName: "Computational materials",
    targetNicheId: "high-throughput-materials-discovery",
    targetNicheName: "High-throughput materials discovery",
    bridge:
      "Both directions use computed data to screen many candidates and learn which structures are associated with useful properties.",
    distinction:
      "The quantum-chemistry direction often predicts molecular properties; the materials direction organizes automated searches across solids and compositions.",
    sharedKeywords: [
      "high-throughput screening",
      "materials discovery",
      "property prediction",
    ],
  },
  {
    id: "qchem-environment-physics-atmosphere",
    sourceNicheId: "environmental-chemistry",
    targetPathfinderId: "computational-physics",
    targetPathfinderName: "Computational physics",
    targetNicheId: "atmospheric-ocean-dynamics",
    targetNicheName: "Atmospheric & ocean dynamics",
    bridge:
      "Molecular reactions determine how a species changes, while atmospheric transport determines where it travels and which conditions it encounters.",
    distinction:
      "Quantum chemistry follows molecular energetics and reactivity; computational physics follows fluid motion across much larger scales.",
    sharedKeywords: [
      "atmospheric chemistry",
      "chemical transport",
      "multiscale atmosphere modeling",
    ],
  },
] satisfies readonly InterdisciplinaryLink[];
