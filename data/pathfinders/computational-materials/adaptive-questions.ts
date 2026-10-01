import type { SurveyQuestion } from "@/lib/types";

const energyMotivations = ["energy-storage", "energy-conversion"];
const electronicMotivations = ["electronics", "light-sensing"];
const surfaceEnvironmentMotivations = ["catalysis", "climate-environment"];
const structuralSoftMotivations = ["structural", "soft-health"];
const computationalOpenMotivations = ["fundamentals", "data-discovery", "open"];

export const computationalMaterialsAdaptiveQuestions: SurveyQuestion[] = [
  {
    id: "materials-energy-direction",
    stage: "narrowing",
    kicker: "Narrow the energy system",
    title: "Which energy-material challenge would you explore first?",
    prompt:
      "Choose the system you would most like to understand. The next question will focus on what happens inside it.",
    type: "single",
    visibleWhen: {
      questionId: "materials-motivation",
      anyOf: energyMotivations,
    },
    options: [
      {
        id: "battery-electrodes",
        label: "Battery electrodes",
        description:
          "How electrode structures store charge, change during cycling, and gain or lose performance.",
        nicheBoosts: { "battery-electrodes": 6 },
      },
      {
        id: "solid-electrolytes",
        label: "Solid electrolytes and ion transport",
        description:
          "How ions move through a solid and which structures make that motion easier, safer, or more selective.",
        nicheBoosts: { "solid-electrolytes-ion-transport": 6 },
      },
      {
        id: "photovoltaics",
        label: "Solar-energy materials",
        description:
          "How a material absorbs light, separates charge, and turns incoming sunlight into useful electrical energy.",
        nicheBoosts: { "photovoltaic-materials": 6 },
      },
      {
        id: "hydrogen",
        label: "Hydrogen production or storage",
        description:
          "How materials help create, bind, release, or safely contain hydrogen for an energy system.",
        nicheBoosts: { "hydrogen-storage-materials": 6 },
      },
      {
        id: "thermal",
        label: "Heat-management or thermoelectric materials",
        description:
          "How materials carry heat or convert a temperature difference into electrical energy.",
        nicheBoosts: { "thermoelectric-materials": 6 },
      },
      {
        id: "unsure",
        label: "Show me several energy systems",
        description:
          "Keep several technologies open while the scientific differences become clearer.",
        uncertainty: true,
      },
    ],
  },
  {
    id: "materials-energy-process",
    stage: "narrowing",
    kicker: "Find the bottleneck",
    title: "Which process inside an energy material sounds most interesting?",
    prompt:
      "A single technology can involve several of these processes. Pick the one you would most want to explain or improve.",
    type: "single",
    visibleWhen: {
      questionId: "materials-motivation",
      anyOf: energyMotivations,
    },
    options: [
      {
        id: "cycling-stability",
        label: "Structural change during repeated use",
        description:
          "Track how phases, defects, or interfaces evolve as a material charges, discharges, heats, or cools.",
        nicheBoosts: {
          "battery-electrodes": 5,
          "defects-disorder-diffusion": 2,
        },
      },
      {
        id: "ion-motion",
        label: "Ion motion through a material",
        description:
          "Identify the pathways and energy barriers that control how quickly charged atoms can move.",
        nicheBoosts: {
          "solid-electrolytes-ion-transport": 5,
          "defects-disorder-diffusion": 2,
        },
      },
      {
        id: "light-charge",
        label: "Light absorption and charge separation",
        description:
          "Follow how absorbed light creates mobile charge and where useful energy is lost.",
        nicheBoosts: {
          "photovoltaic-materials": 5,
          "optoelectronic-photonic-materials": 2,
        },
      },
      {
        id: "surface-reactions",
        label: "Surface reactions and hydrogen binding",
        description:
          "Study how active sites form hydrogen or how a storage material holds and releases it.",
        nicheBoosts: {
          "hydrogen-storage-materials": 5,
          electrocatalysis: 2,
        },
      },
      {
        id: "heat-charge-coupling",
        label: "Coupled heat and electrical transport",
        description:
          "Understand why moving charge and moving heat support or compete with each other.",
        nicheBoosts: { "thermoelectric-materials": 5 },
      },
      {
        id: "unsure",
        label: "I’m not sure which process yet",
        description:
          "Leave the bottleneck open and compare examples from several energy technologies.",
        uncertainty: true,
      },
    ],
  },
  {
    id: "materials-electronic-direction",
    stage: "narrowing",
    kicker: "Narrow the electronic system",
    title: "Which electronic-material world would you enter first?",
    prompt:
      "Choose the family of behavior that most catches your attention; neighboring directions will remain available in your results.",
    type: "single",
    visibleWhen: {
      questionId: "materials-motivation",
      anyOf: electronicMotivations,
    },
    options: [
      {
        id: "semiconductors",
        label: "Semiconductors and electronic devices",
        description:
          "How composition, crystal structure, and defects control conductivity and electronic performance.",
        nicheBoosts: { "semiconductor-electronic-materials": 6 },
      },
      {
        id: "optoelectronics",
        label: "Optoelectronic and photonic materials",
        description:
          "How materials create, detect, guide, or control light in emitters, sensors, displays, and photonic systems.",
        nicheBoosts: { "optoelectronic-photonic-materials": 6 },
      },
      {
        id: "magnetism",
        label: "Magnetic and spintronic materials",
        description:
          "How magnetic order and electron spin could store, sense, or transmit information.",
        nicheBoosts: { "magnetic-spintronic-materials": 6 },
      },
      {
        id: "two-dimensional",
        label: "Two-dimensional and layered materials",
        description:
          "How very thin layers, their edges, and the way they stack produce unusual electronic behavior.",
        nicheBoosts: { "two-dimensional-quantum-materials": 6 },
      },
      {
        id: "quantum",
        label: "Quantum materials and collective behavior",
        description:
          "How interactions among many electrons produce behavior that cannot be explained one particle at a time.",
        nicheBoosts: { "two-dimensional-quantum-materials": 6 },
      },
      {
        id: "unsure",
        label: "Show me several electronic-material directions",
        description:
          "Keep multiple material families open until their characteristic questions are easier to compare.",
        uncertainty: true,
      },
    ],
  },
  {
    id: "materials-electronic-phenomenon",
    stage: "narrowing",
    kicker: "Choose the electronic behavior",
    title: "Which microscopic story would you most like to follow?",
    prompt:
      "The same material can involve several stories. Pick the one you would most enjoy turning into an explanation.",
    type: "single",
    visibleWhen: {
      questionId: "materials-motivation",
      anyOf: electronicMotivations,
    },
    options: [
      {
        id: "bands-charge",
        label: "Energy bands and moving charge",
        description:
          "Connect electronic states, charge carriers, and defects to conductivity or device behavior.",
        nicheBoosts: { "semiconductor-electronic-materials": 5 },
      },
      {
        id: "absorption-emission",
        label: "Light absorption and emission",
        description:
          "Explain which electronic transitions create a color, optical signal, or useful light response.",
        nicheBoosts: {
          "optoelectronic-photonic-materials": 5,
          "photovoltaic-materials": 2,
        },
      },
      {
        id: "spin-order",
        label: "Spin and magnetic order",
        description:
          "Study how electron spins align, compete, and respond to structure or an applied field.",
        nicheBoosts: { "magnetic-spintronic-materials": 5 },
      },
      {
        id: "confinement-stacking",
        label: "Confinement, layers, and stacking",
        description:
          "Explore how reducing dimensionality or combining layers changes the allowed electronic states.",
        nicheBoosts: { "two-dimensional-quantum-materials": 5 },
      },
      {
        id: "collective-effects",
        label: "Collective quantum effects",
        description:
          "Investigate behavior that emerges when many electrons, spins, or lattice vibrations interact strongly.",
        nicheBoosts: {
          "two-dimensional-quantum-materials": 4,
          "magnetic-spintronic-materials": 3,
        },
      },
      {
        id: "unsure",
        label: "I’m not sure which electronic story yet",
        description:
          "Leave the microscopic behavior open and compare a few visual examples first.",
        uncertainty: true,
      },
    ],
  },
  {
    id: "materials-surface-environment-direction",
    stage: "narrowing",
    kicker: "Narrow the surface system",
    title:
      "Which surface or environmental materials problem would you enter first?",
    prompt:
      "These directions all depend on how a material interacts with molecules or its surroundings, but they ask different questions.",
    type: "single",
    visibleWhen: {
      questionId: "materials-motivation",
      anyOf: surfaceEnvironmentMotivations,
    },
    options: [
      {
        id: "surface-catalysis",
        label: "Catalysis on solid surfaces",
        description:
          "How molecules bind, react, and leave active sites on a catalyst’s surface.",
        nicheBoosts: { "heterogeneous-catalysis-surfaces": 6 },
      },
      {
        id: "electrocatalysis",
        label: "Electrocatalysis at an electrode",
        description:
          "How voltage, charge, solvent, and surface structure work together during a chemical reaction.",
        nicheBoosts: { electrocatalysis: 6 },
      },
      {
        id: "separation",
        label: "Selective capture and separation",
        description:
          "How pores and chemical environments distinguish one gas, ion, or contaminant from another.",
        nicheBoosts: { "porous-separation-storage": 6 },
      },
      {
        id: "molecular-storage",
        label: "Store gases or small molecules",
        description:
          "How a porous or reactive material can hold useful molecules and release them under controlled conditions.",
        nicheBoosts: {
          "porous-separation-storage": 5,
          "hydrogen-storage-materials": 3,
        },
      },
      {
        id: "protective-interfaces",
        label: "Protect a material in a harsh environment",
        description:
          "How coatings, oxide layers, or interfaces slow corrosion and environmental degradation.",
        nicheBoosts: { "corrosion-protective-interfaces": 6 },
      },
      {
        id: "unsure",
        label: "Show me several surface and environment problems",
        description:
          "Keep catalysis, capture, storage, and protection open until their workflows are easier to compare.",
        uncertainty: true,
      },
    ],
  },
  {
    id: "materials-surface-environment-process",
    stage: "narrowing",
    kicker: "Choose the interaction",
    title: "Which material–environment interaction sounds most interesting?",
    prompt:
      "Focus on the event you would most like a simulation to reveal at the atomic or molecular level.",
    type: "single",
    visibleWhen: {
      questionId: "materials-motivation",
      anyOf: surfaceEnvironmentMotivations,
    },
    options: [
      {
        id: "adsorption-reaction",
        label: "Adsorption and reaction at an active site",
        description:
          "Compare where molecules attach, how bonds change, and which surface arrangement lowers a reaction barrier.",
        nicheBoosts: { "heterogeneous-catalysis-surfaces": 5 },
      },
      {
        id: "charge-transfer-interface",
        label: "Charge transfer at an electrode interface",
        description:
          "Follow electrons, ions, and nearby solvent as an electrochemical reaction proceeds.",
        nicheBoosts: { electrocatalysis: 5 },
      },
      {
        id: "selective-passage",
        label: "Selective binding or passage through pores",
        description:
          "Explain why a framework captures or transports one molecular species more readily than another.",
        nicheBoosts: { "porous-separation-storage": 5 },
      },
      {
        id: "binding-release",
        label: "Reversible storage and release",
        description:
          "Balance strong molecular binding with the ability to recover a stored gas when it is needed.",
        nicheBoosts: {
          "hydrogen-storage-materials": 5,
          "porous-separation-storage": 2,
        },
      },
      {
        id: "degradation-barrier",
        label: "Degradation and protective barriers",
        description:
          "Study how water, oxygen, salt, or heat reaches a material and begins to damage it.",
        nicheBoosts: { "corrosion-protective-interfaces": 5 },
      },
      {
        id: "unsure",
        label: "I’m not sure which interaction yet",
        description:
          "Keep several interface processes in view and compare their molecular pictures first.",
        uncertainty: true,
      },
    ],
  },
  {
    id: "materials-structural-soft-direction",
    stage: "narrowing",
    kicker: "Narrow the material family",
    title: "Which structural or soft-material system would you explore first?",
    prompt:
      "Choose the kind of material whose response you would most like to connect back to its structure.",
    type: "single",
    visibleWhen: {
      questionId: "materials-motivation",
      anyOf: structuralSoftMotivations,
    },
    options: [
      {
        id: "alloys-ceramics",
        label: "Alloys and ceramics",
        description:
          "How composition, grains, phases, and defects influence strength, toughness, and performance at high temperature.",
        nicheBoosts: { "structural-alloys-ceramics": 6 },
      },
      {
        id: "polymers-soft",
        label: "Polymers and responsive soft materials",
        description:
          "How flexible chains and weak interactions create elasticity, self-assembly, swelling, or response to the environment.",
        nicheBoosts: { "polymers-soft-materials": 6 },
      },
      {
        id: "biomaterials",
        label: "Materials that interact with biology",
        description:
          "How a surface, scaffold, membrane, or soft material behaves near cells, proteins, or biological fluids.",
        nicheBoosts: { "computational-biomaterials": 6 },
      },
      {
        id: "corrosion",
        label: "Corrosion and protective coatings",
        description:
          "How chemical environments begin degradation and how an interface or coating can slow it.",
        nicheBoosts: { "corrosion-protective-interfaces": 6 },
      },
      {
        id: "composites",
        label: "Composites and connected interfaces",
        description:
          "How different components share load or transport through a material with structure at several scales.",
        nicheBoosts: {
          "multiscale-materials-modeling": 5,
          "structural-alloys-ceramics": 2,
        },
      },
      {
        id: "unsure",
        label: "Show me several structural and soft materials",
        description:
          "Keep several material families open until their characteristic motions and properties feel more distinct.",
        uncertainty: true,
      },
    ],
  },
  {
    id: "materials-structural-soft-behavior",
    stage: "narrowing",
    kicker: "Choose the response",
    title: "Which kind of material response would you most like to model?",
    prompt:
      "Think about the change or evidence you would want to watch in a simulation, plot, or structural model.",
    type: "single",
    visibleWhen: {
      questionId: "materials-motivation",
      anyOf: structuralSoftMotivations,
    },
    options: [
      {
        id: "deformation-fracture",
        label: "Deformation, strength, and fracture",
        description:
          "Connect defects and microstructure to where a rigid material bends, yields, cracks, or fails.",
        nicheBoosts: { "structural-alloys-ceramics": 5 },
      },
      {
        id: "assembly-response",
        label: "Self-assembly and flexible response",
        description:
          "Follow how soft building blocks organize or change shape with temperature, solvent, force, or concentration.",
        nicheBoosts: { "polymers-soft-materials": 5 },
      },
      {
        id: "bio-interface",
        label: "Behavior at a biological interface",
        description:
          "Explore how water, ions, proteins, or membranes respond to a material’s chemistry and shape.",
        nicheBoosts: { "computational-biomaterials": 5 },
      },
      {
        id: "environmental-damage",
        label: "Environmental damage and protection",
        description:
          "Track the first chemical or structural steps in corrosion, oxidation, or coating failure.",
        nicheBoosts: { "corrosion-protective-interfaces": 5 },
      },
      {
        id: "cross-scale",
        label: "How small features create large-scale behavior",
        description:
          "Link atom-level or microscopic structure to the response of a component, composite, or device.",
        nicheBoosts: { "multiscale-materials-modeling": 5 },
      },
      {
        id: "unsure",
        label: "I’m not sure which response yet",
        description:
          "Leave the response open and compare static structures, motions, and mechanical evidence first.",
        uncertainty: true,
      },
    ],
  },
  {
    id: "materials-computation-direction",
    stage: "narrowing",
    kicker: "Narrow the computational lens",
    title: "Which role for computation sounds most interesting?",
    prompt:
      "Choose a starting role, from examining one model carefully to searching thousands of candidate materials.",
    type: "single",
    visibleWhen: {
      questionId: "materials-motivation",
      anyOf: computationalOpenMotivations,
    },
    options: [
      {
        id: "fundamental-theory",
        label: "Explain a fundamental material behavior",
        description:
          "Use an electronic or atomistic model to understand why a structure, phase, or property emerges.",
        nicheBoosts: {
          "crystal-phase-stability": 4,
          "two-dimensional-quantum-materials": 3,
        },
      },
      {
        id: "method-comparison",
        label: "Compare methods or approximations",
        description:
          "Test how modeling choices change a prediction and identify which method is reliable enough for the question.",
        nicheBoosts: { "method-potential-evaluation": 6 },
      },
      {
        id: "high-throughput",
        label: "Screen many candidate materials",
        description:
          "Run a consistent computational workflow across a large search space to find promising candidates and trends.",
        nicheBoosts: { "high-throughput-materials-discovery": 6 },
      },
      {
        id: "machine-learning",
        label: "Learn material-property patterns from data",
        description:
          "Build or evaluate a model that predicts properties from composition, structure, or calculated descriptors.",
        nicheBoosts: { "ml-property-prediction": 6 },
      },
      {
        id: "multiscale",
        label: "Connect models across several scales",
        description:
          "Link atom-level information to microstructure, devices, or larger-scale material performance.",
        nicheBoosts: { "multiscale-materials-modeling": 6 },
      },
      {
        id: "unsure",
        label: "Let me compare several computational roles",
        description:
          "Keep theory, data, screening, and multiscale work open while you see what each workflow produces.",
        uncertainty: true,
      },
    ],
  },
  {
    id: "materials-computation-evidence",
    stage: "narrowing",
    kicker: "Choose the evidence",
    title: "What kind of computational evidence would you like to examine?",
    prompt:
      "There is no assumed skill level here. Pick the output that seems most likely to spark a useful question.",
    type: "single",
    visibleWhen: {
      questionId: "materials-motivation",
      anyOf: computationalOpenMotivations,
    },
    options: [
      {
        id: "energy-landscape",
        label: "An energy landscape of structures and phases",
        description:
          "Compare which arrangements are stable and how temperature, pressure, or composition could change the answer.",
        nicheBoosts: { "crystal-phase-stability": 5 },
      },
      {
        id: "motion-defects",
        label: "Atomic motion, defects, and disorder",
        description:
          "Watch how imperfections and local rearrangements control diffusion or long-term material behavior.",
        nicheBoosts: { "defects-disorder-diffusion": 5 },
      },
      {
        id: "prediction-table",
        label: "A table of predicted properties",
        description:
          "Compare many materials, identify patterns, and decide which candidates deserve closer study.",
        nicheBoosts: {
          "high-throughput-materials-discovery": 4,
          "ml-property-prediction": 3,
        },
      },
      {
        id: "model-errors",
        label: "Where two models agree or fail",
        description:
          "Analyze errors, tradeoffs, and reference data to understand which approximation can be trusted.",
        nicheBoosts: { "method-potential-evaluation": 5 },
      },
      {
        id: "scale-connection",
        label: "A link from atoms to larger-scale performance",
        description:
          "Trace how local structure passes information into a microstructure, component, or device model.",
        nicheBoosts: { "multiscale-materials-modeling": 5 },
      },
      {
        id: "unsure",
        label: "Surprise me with varied examples",
        description:
          "Keep the evidence format open so the results can offer scientifically different starting points.",
        uncertainty: true,
      },
    ],
  },
];
