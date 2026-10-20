import type { InterdisciplinaryLink } from "@/lib/interdisciplinary-links";

export const materialsInterdisciplinaryLinks = [
  {
    id: "materials-photovoltaics-qchem-charge-transfer",
    sourceNicheId: "photovoltaic-materials",
    connectionKinds: ["shared-question", "connected-scales"],
    sharedQuestion:
      "Which electronic processes initiate charge separation in a photovoltaic material?",
    explorationStep:
      "Read a recent photovoltaic review and mark where its explanation moves from molecular excitation to material-scale transport.",
    targetPathfinderId: "quantum-chemistry",
    targetPathfinderName: "Quantum chemistry",
    targetNicheId: "charge-transfer",
    targetNicheName: "Molecular charge transfer",
    bridge:
      "Photovoltaic performance begins with light-driven electron movement, so molecular charge-transfer models can clarify the first electronic step.",
    distinction:
      "Materials research includes interfaces, transport, defects, and stability; quantum chemistry can isolate the electronic transition in a smaller model.",
    sharedKeywords: [
      "photoinduced charge transfer",
      "photovoltaic absorber",
      "charge separation",
    ],
  },
  {
    id: "materials-electrocatalysis-qchem-catalysis",
    sourceNicheId: "electrocatalysis",
    connectionKinds: ["shared-question", "shared-method"],
    sharedQuestion:
      "How do electrode potential, interfaces, and electronic structure reshape catalytic pathways?",
    explorationStep:
      "Compare a computed electrocatalytic mechanism at two potentials and identify which steps need molecular electronic detail.",
    targetPathfinderId: "quantum-chemistry",
    targetPathfinderName: "Quantum chemistry",
    targetNicheId: "computational-catalysis",
    targetNicheName: "Computational catalysis",
    bridge:
      "Both directions compare reaction intermediates and barriers to explain catalytic activity and selectivity.",
    distinction:
      "Electrocatalysis adds electrode potential, interfaces, and charge transfer; molecular catalysis can focus more tightly on a catalyst’s electronic structure and mechanism.",
    sharedKeywords: [
      "electrocatalytic mechanism",
      "reaction free energy",
      "catalyst electronic structure",
    ],
  },
  {
    id: "materials-biomaterials-biology-dynamics",
    sourceNicheId: "computational-biomaterials",
    connectionKinds: ["shared-system", "connected-scales"],
    sharedQuestion:
      "How does a material surface change the structure and motion of nearby biomolecules?",
    explorationStep:
      "Find a simulation review of protein–material interfaces and list the surface and biomolecular properties it tracks.",
    targetPathfinderId: "computational-biology",
    targetPathfinderName: "Computational biology",
    targetNicheId: "biomolecular-simulation-dynamics",
    targetNicheName: "Biomolecular simulation & conformational dynamics",
    bridge:
      "A biomaterial’s performance often depends on how proteins, membranes, or other biomolecules reorganize at its surface.",
    distinction:
      "The materials direction centers the designed material and interface; the biology direction centers the biomolecule’s motion and function.",
    sharedKeywords: [
      "biomaterial protein interface",
      "molecular dynamics",
      "surface biocompatibility",
    ],
  },
  {
    id: "materials-quantum-physics-many-body",
    sourceNicheId: "two-dimensional-quantum-materials",
    connectionKinds: ["shared-system", "connected-scales"],
    sharedQuestion:
      "How do interactions among electrons create measurable phases in a real two-dimensional material?",
    explorationStep:
      "Choose one two-dimensional material review that connects a model Hamiltonian to an experimentally measurable phase.",
    targetPathfinderId: "computational-physics",
    targetPathfinderName: "Computational physics",
    targetNicheId: "quantum-many-body-phases",
    targetNicheName: "Quantum many-body phases",
    bridge:
      "Two-dimensional materials can host collective quantum phases that emerge from interactions among many electrons.",
    distinction:
      "Materials modeling emphasizes a particular compound and measurable property; many-body physics emphasizes the collective model and emergent phase.",
    sharedKeywords: [
      "two-dimensional quantum materials",
      "many-body phase",
      "electronic correlations",
    ],
  },
  {
    id: "materials-ml-biology-prediction",
    sourceNicheId: "ml-property-prediction",
    connectionKinds: ["shared-method", "shared-data"],
    sharedQuestion:
      "How can scientific machine learning predict useful properties while remaining reliable beyond its training data?",
    explorationStep:
      "Read one property-prediction benchmark and check its data split, uncertainty method, and out-of-distribution tests.",
    targetPathfinderId: "computational-biology",
    targetPathfinderName: "Computational biology",
    targetNicheId: "machine-learning-biological-prediction",
    targetNicheName: "Machine learning for biological prediction",
    bridge:
      "Both directions build models from structured scientific data and must test generalization, uncertainty, and dataset bias.",
    distinction:
      "Materials models learn from compositions and structures; biological models often learn from sequences, molecular structures, images, or measurements.",
    sharedKeywords: [
      "scientific machine learning",
      "property prediction",
      "model uncertainty",
    ],
  },
] satisfies readonly InterdisciplinaryLink[];
