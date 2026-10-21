import type { InterdisciplinaryLink } from "@/lib/interdisciplinary-links";

export const biologyInterdisciplinaryLinks = [
  {
    id: "biology-protein-structure-qchem-interactions",
    sourceNicheId: "protein-structure-prediction",
    connectionKinds: ["shared-system", "shared-question"],
    sharedQuestion:
      "Which molecular interactions stabilize a protein’s three-dimensional structure?",
    explorationStep:
      "Begin with a review of noncovalent interactions in protein stability and map each interaction to a structural example.",
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
    searchSeeds: {
      orientation: ["protein structure", "noncovalent interactions"],
      focused: [
        "protein noncovalent interactions",
        "hydrogen bonding",
        "structure stability",
      ],
      review: ["electronic interactions protein stability"],
    },
  },
  {
    id: "biology-docking-qchem-biomolecular-electronics",
    sourceNicheId: "virtual-screening-docking",
    connectionKinds: ["shared-method", "shared-question"],
    sharedQuestion:
      "Why does one proposed ligand pose bind more favorably than another?",
    explorationStep:
      "Find a docking-refinement review and compare how fast scoring and electronic interaction calculations evaluate a pose.",
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
    searchSeeds: {
      orientation: ["molecular docking", "quantum chemistry binding"],
      focused: [
        "drug protein binding",
        "docking pose refinement",
        "electronic interaction energy",
      ],
      review: ["quantum mechanical refinement docking"],
    },
  },
  {
    id: "biology-networks-physics-emergence",
    sourceNicheId: "biological-network-modeling",
    connectionKinds: ["shared-method", "shared-question"],
    sharedQuestion:
      "How do local biological connections produce stable, spreading, or synchronized system behavior?",
    explorationStep:
      "Use an introductory network-dynamics review to follow one biological feedback loop from local edges to system behavior.",
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
    searchSeeds: {
      orientation: ["biological networks", "network physics"],
      focused: [
        "biological network dynamics",
        "emergent behavior",
        "network simulation",
      ],
      review: ["network science systems biology"],
    },
  },
  {
    id: "biology-ml-materials-property-prediction",
    sourceNicheId: "machine-learning-biological-prediction",
    connectionKinds: ["shared-method", "shared-data"],
    sharedQuestion:
      "How can a model learn from scientific structures while remaining reliable on unfamiliar examples?",
    explorationStep:
      "Compare the evaluation sections of one biological and one materials prediction benchmark, especially their data splits.",
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
    searchSeeds: {
      orientation: ["biological prediction", "materials property prediction"],
      focused: [
        "scientific property prediction",
        "out-of-distribution generalization",
        "model uncertainty",
      ],
      review: ["generalization scientific machine learning"],
    },
  },
  {
    id: "biology-ecology-physics-nonequilibrium",
    sourceNicheId: "computational-ecology-biodiversity",
    connectionKinds: ["shared-question", "connected-scales"],
    sharedQuestion:
      "How do interactions among many changing populations create collective ecological behavior?",
    explorationStep:
      "Start with a perspective on statistical physics in ecology and identify one collective pattern tied to real observations.",
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
    searchSeeds: {
      orientation: ["computational ecology", "statistical physics"],
      focused: [
        "ecological dynamics",
        "nonequilibrium systems",
        "collective population behavior",
      ],
      review: ["statistical physics ecological dynamics"],
    },
  },
  {
    id: "biology-time-course-physics-nonlinear-dynamics",
    sourceNicheId: "time-course-transcriptomics",
    connectionKinds: ["shared-method", "shared-question", "shared-data"],
    sharedQuestion:
      "How do feedback and changing inputs create oscillations, transitions, or instability in gene-expression trajectories?",
    explorationStep:
      "Choose one time-course gene-expression study and map its trajectories onto ideas such as feedback, stability, and oscillation.",
    targetPathfinderId: "computational-physics",
    targetPathfinderName: "Computational physics",
    targetNicheId: "nonlinear-dynamics-chaos",
    targetNicheName: "Nonlinear dynamics & chaos",
    bridge:
      "Time-series and dynamical-system models can connect changing gene expression to feedback, stability, oscillation, and transitions between biological states.",
    distinction:
      "Transcriptomics keeps genes, pathways, experimental noise, and biological context explicit; nonlinear dynamics seeks general mechanisms that create temporal patterns.",
    sharedKeywords: [
      "gene expression dynamics",
      "nonlinear time series",
      "regulatory feedback",
    ],
    searchSeeds: {
      orientation: ["time-course transcriptomics", "nonlinear dynamics"],
      focused: [
        "gene expression dynamics",
        "nonlinear time series",
        "regulatory feedback",
      ],
      review: ["dynamical systems time-course gene expression"],
    },
  },
] satisfies readonly InterdisciplinaryLink[];
