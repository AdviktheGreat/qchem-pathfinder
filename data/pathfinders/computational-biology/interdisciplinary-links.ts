import type { InterdisciplinaryLink } from "@/lib/interdisciplinary-links";

export const biologyInterdisciplinaryLinks = [
  {
    id: "biology-protein-structure-qchem-interactions",
    sourceNicheId: "protein-structure-prediction",
    targetPathfinderId: "quantum-chemistry",
    targetPathfinderName: "Quantum chemistry",
    targetNicheId: "noncovalent-interactions",
    targetNicheName: "Noncovalent molecular interactions",
    bridge:
      "Protein structures are stabilized by hydrogen bonding, electrostatics, dispersion, and solvent-mediated interactions.",
    distinction:
      "Structure prediction asks for the whole fold; quantum chemistry can isolate and explain a smaller interaction with greater electronic detail.",
    sharedKeywords: [
      "protein noncovalent interactions",
      "hydrogen bonding",
      "structure stability",
    ],
  },
  {
    id: "biology-docking-qchem-biomolecular-electronics",
    sourceNicheId: "virtual-screening-docking",
    targetPathfinderId: "quantum-chemistry",
    targetPathfinderName: "Quantum chemistry",
    targetNicheId: "biomolecular-electronics",
    targetNicheName: "Electronic contributions to biomolecular binding",
    bridge:
      "Docking proposes binding poses quickly, while electronic calculations can examine why a promising pose is stabilized.",
    distinction:
      "Virtual screening prioritizes many candidates; quantum chemistry studies fewer complexes with more detailed electronic models.",
    sharedKeywords: [
      "drug protein binding",
      "docking pose refinement",
      "electronic interaction energy",
    ],
  },
  {
    id: "biology-networks-physics-emergence",
    sourceNicheId: "biological-network-modeling",
    targetPathfinderId: "computational-physics",
    targetPathfinderName: "Computational physics",
    targetNicheId: "network-emergent-dynamics",
    targetNicheName: "Network & emergent dynamics",
    bridge:
      "Both directions ask how local connections create system-level behavior such as stability, spreading, feedback, or synchronization.",
    distinction:
      "Biological modeling keeps genes, proteins, or cells central; computational physics often studies which behaviors follow from a more general network model.",
    sharedKeywords: [
      "biological network dynamics",
      "emergent behavior",
      "network simulation",
    ],
  },
  {
    id: "biology-ml-materials-property-prediction",
    sourceNicheId: "machine-learning-biological-prediction",
    targetPathfinderId: "computational-materials",
    targetPathfinderName: "Computational materials",
    targetNicheId: "ml-property-prediction",
    targetNicheName: "Machine learning for property prediction",
    bridge:
      "Both fields turn scientific structures into model inputs and test whether predictions generalize beyond the training data.",
    distinction:
      "Biological models often learn from sequences and measurements; materials models often learn from composition and atomic structure.",
    sharedKeywords: [
      "scientific property prediction",
      "out-of-distribution generalization",
      "model uncertainty",
    ],
  },
  {
    id: "biology-ecology-physics-nonequilibrium",
    sourceNicheId: "computational-ecology-biodiversity",
    targetPathfinderId: "computational-physics",
    targetPathfinderName: "Computational physics",
    targetNicheId: "nonequilibrium-statistical-physics",
    targetNicheName: "Non-equilibrium statistical physics",
    bridge:
      "Populations and communities are changing, interacting systems that can display transitions, fluctuations, transport, and recovery.",
    distinction:
      "Computational ecology retains species, habitats, and observations; statistical physics seeks general collective patterns across many interacting units.",
    sharedKeywords: [
      "ecological dynamics",
      "nonequilibrium systems",
      "collective population behavior",
    ],
  },
] satisfies readonly InterdisciplinaryLink[];
