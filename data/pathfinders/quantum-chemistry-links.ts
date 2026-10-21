import type { InterdisciplinaryLink } from "@/lib/interdisciplinary-links";

export const quantumChemistryInterdisciplinaryLinks = [
  {
    id: "qchem-charge-transfer-materials-photovoltaics",
    sourceNicheId: "charge-transfer",
    connectionKinds: ["shared-question", "connected-scales"],
    sharedQuestion:
      "How do molecular charge-transfer events become useful charge separation and transport in a photovoltaic material?",
    explorationStep:
      "Begin with a recent review that follows photoinduced charge transfer from a molecular absorber into a photovoltaic interface.",
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
    searchSeeds: {
      orientation: ["molecular charge transfer", "photovoltaic materials"],
      focused: [
        "photoinduced charge transfer",
        "photovoltaic interface",
        "charge separation",
      ],
      review: ["molecular charge transfer photovoltaics"],
    },
  },
  {
    id: "qchem-catalysis-materials-surfaces",
    sourceNicheId: "computational-catalysis",
    connectionKinds: ["shared-question", "shared-system"],
    sharedQuestion:
      "How do active sites change activation barriers and favor one reaction pathway over another?",
    explorationStep:
      "Compare one molecular-catalyst free-energy diagram with one surface-catalysis pathway and note which assumptions change.",
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
    searchSeeds: {
      orientation: ["computational catalysis", "heterogeneous catalysis"],
      focused: [
        "catalytic reaction pathway",
        "surface adsorption",
        "activation barrier",
      ],
      review: ["molecular and surface catalysis"],
    },
  },
  {
    id: "qchem-biomolecular-electronics-biology-dynamics",
    sourceNicheId: "biomolecular-electronics",
    connectionKinds: ["shared-system", "connected-scales"],
    sharedQuestion:
      "How do electronic interactions and molecular motion work together to stabilize biomolecular binding?",
    explorationStep:
      "Look for a beginner-friendly QM/MM or multiscale simulation review that separates electronic and conformational effects.",
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
    searchSeeds: {
      orientation: ["electronic binding interactions", "biomolecular dynamics"],
      focused: [
        "biomolecular interactions",
        "conformational dynamics",
        "multiscale simulation",
      ],
      review: ["multiscale biomolecular binding"],
    },
  },
  {
    id: "qchem-ml-materials-high-throughput",
    sourceNicheId: "ml-property-prediction",
    connectionKinds: ["shared-method", "shared-data"],
    sharedQuestion:
      "How can computed structures and properties help screen promising molecules or materials?",
    explorationStep:
      "Inspect one recent screening benchmark and record how it represents structures, splits data, and checks uncertainty.",
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
    searchSeeds: {
      orientation: ["molecular property prediction", "materials discovery"],
      focused: [
        "high-throughput screening",
        "materials discovery",
        "property prediction",
      ],
      review: ["machine learning molecular materials screening"],
    },
  },
  {
    id: "qchem-environment-physics-atmosphere",
    sourceNicheId: "environmental-chemistry",
    connectionKinds: ["shared-system", "connected-scales"],
    sharedQuestion:
      "How do molecular reactions and atmospheric transport together control the fate of a chemical species?",
    explorationStep:
      "Start with a chemistry–transport modeling review and trace one species from molecular reaction to regional movement.",
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
    searchSeeds: {
      orientation: ["atmospheric chemistry", "atmospheric transport"],
      focused: [
        "atmospheric chemistry",
        "chemical transport",
        "multiscale atmosphere modeling",
      ],
      review: ["multiscale atmospheric chemistry transport"],
    },
  },
  {
    id: "qchem-spectroscopy-materials-optoelectronics",
    sourceNicheId: "computational-spectroscopy",
    connectionKinds: ["shared-method", "shared-application"],
    sharedQuestion:
      "How can computed molecular spectra help explain how an optoelectronic material absorbs and emits light?",
    explorationStep:
      "Compare a molecular spectrum calculation with a recent optoelectronic-materials review and match their absorption or emission language.",
    targetPathfinderId: "computational-materials",
    targetPathfinderName: "Computational materials",
    targetNicheId: "optoelectronic-photonic-materials",
    targetNicheName: "Optoelectronic & photonic materials",
    bridge:
      "Calculated transitions and spectra connect molecular electronic structure to the absorption and emission features used to characterize optoelectronic materials.",
    distinction:
      "Quantum chemistry assigns transitions in molecular models; materials research also follows packing, extended structure, interfaces, and device-scale optical behavior.",
    sharedKeywords: [
      "computed absorption spectra",
      "optoelectronic materials",
      "excited-state transitions",
    ],
    searchSeeds: {
      orientation: ["computational spectroscopy", "optoelectronic materials"],
      focused: [
        "computed absorption spectra",
        "optoelectronic materials",
        "excited-state transitions",
      ],
      review: ["molecular spectroscopy optoelectronic materials"],
    },
  },
  {
    id: "qchem-astrochemistry-physics-stellar-evolution",
    sourceNicheId: "astrochemical-systems",
    connectionKinds: ["shared-system", "connected-scales"],
    sharedQuestion:
      "How do stellar temperature, density, radiation, and time shape which molecules can form and survive?",
    explorationStep:
      "Read an overview of molecules in stellar environments and separate the molecular inputs from the stellar conditions supplied by the larger model.",
    targetPathfinderId: "computational-physics",
    targetPathfinderName: "Computational physics",
    targetNicheId: "stellar-structure-evolution",
    targetNicheName: "Stellar structure & evolution",
    bridge:
      "Quantum chemistry supplies molecular spectra, reaction energetics, and stability data, while stellar models supply the evolving physical conditions in which that chemistry occurs.",
    distinction:
      "Astrochemical calculations center individual species and reactions; stellar modeling centers the structure and evolution of an entire star.",
    sharedKeywords: [
      "stellar molecular chemistry",
      "astrochemical reaction networks",
      "stellar evolution",
    ],
    searchSeeds: {
      orientation: ["quantum astrochemistry", "stellar astrophysics"],
      focused: [
        "stellar molecular chemistry",
        "astrochemical reaction networks",
        "stellar evolution",
      ],
      review: ["molecular chemistry stellar environments"],
    },
  },
] satisfies readonly InterdisciplinaryLink[];
