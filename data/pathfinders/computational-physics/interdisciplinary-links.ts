import type { InterdisciplinaryLink } from "@/lib/interdisciplinary-links";

export const physicsInterdisciplinaryLinks = [
  {
    id: "physics-quantum-control-qchem-excited-states",
    sourceNicheId: "quantum-dynamics-control",
    targetPathfinderId: "quantum-chemistry",
    targetPathfinderName: "Quantum chemistry",
    targetNicheId: "excited-states",
    targetNicheName: "Excited states & molecular photochemistry",
    bridge:
      "Light-driven molecular behavior is a quantum-dynamics problem when the timing, coherence, or control of state evolution becomes central.",
    distinction:
      "Molecular photochemistry emphasizes a chemical system and outcome; quantum control emphasizes how a Hamiltonian and external field steer dynamics.",
    sharedKeywords: [
      "excited-state dynamics",
      "quantum control",
      "light matter interaction",
    ],
  },
  {
    id: "physics-many-body-materials-quantum",
    sourceNicheId: "quantum-many-body-phases",
    targetPathfinderId: "computational-materials",
    targetPathfinderName: "Computational materials",
    targetNicheId: "two-dimensional-quantum-materials",
    targetNicheName: "Two-dimensional & quantum materials",
    bridge:
      "Collective quantum phases become materials questions when a real crystal, composition, defect, or measurable response supplies the setting.",
    distinction:
      "Many-body physics often begins from an idealized interaction model; materials modeling begins from a candidate material and its structure.",
    sharedKeywords: [
      "correlated quantum materials",
      "many-body phase",
      "two-dimensional materials",
    ],
  },
  {
    id: "physics-atmosphere-qchem-environment",
    sourceNicheId: "atmospheric-ocean-dynamics",
    targetPathfinderId: "quantum-chemistry",
    targetPathfinderName: "Quantum chemistry",
    targetNicheId: "environmental-chemistry",
    targetNicheName: "Atmospheric & environmental molecular chemistry",
    bridge:
      "Large-scale flows transport chemical species whose molecular reactions determine lifetimes, products, and observable signatures.",
    distinction:
      "Fluid dynamics resolves motion across regions and timescales; molecular chemistry resolves the transformations of individual species.",
    sharedKeywords: [
      "atmospheric chemical transport",
      "reaction kinetics",
      "multiscale atmosphere modeling",
    ],
  },
  {
    id: "physics-networks-biology-pathways",
    sourceNicheId: "network-emergent-dynamics",
    targetPathfinderId: "computational-biology",
    targetPathfinderName: "Computational biology",
    targetNicheId: "biological-network-modeling",
    targetNicheName: "Biological networks & pathway modeling",
    bridge:
      "Network ideas describe how interacting genes, proteins, cells, or populations create feedback and collective behavior.",
    distinction:
      "Physics looks for general organizing principles; biology keeps the identity, evidence, and function of the biological components explicit.",
    sharedKeywords: [
      "biological network dynamics",
      "emergent behavior",
      "pathway modeling",
    ],
  },
  {
    id: "physics-inverse-materials-method-evaluation",
    sourceNicheId: "physics-informed-ml-inverse-problems",
    targetPathfinderId: "computational-materials",
    targetPathfinderName: "Computational materials",
    targetNicheId: "method-potential-evaluation",
    targetNicheName: "Method & interatomic-potential evaluation",
    bridge:
      "Both directions test whether a computational model respects known behavior while remaining accurate and efficient on unseen cases.",
    distinction:
      "Physics-informed inverse methods infer hidden quantities from data; materials evaluation asks whether a potential or approximation is reliable for a defined task.",
    sharedKeywords: [
      "physics-informed machine learning",
      "interatomic potential validation",
      "model uncertainty",
    ],
  },
] satisfies readonly InterdisciplinaryLink[];
