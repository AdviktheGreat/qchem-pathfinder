import type { SurveyQuestion } from "@/lib/types";

const energyMotivations = ["energy-storage", "energy-conversion"];
const electronicMotivations = ["electronics", "light-sensing"];

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
];
