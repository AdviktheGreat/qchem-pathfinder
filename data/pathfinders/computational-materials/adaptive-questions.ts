import type { SurveyQuestion } from "@/lib/types";

const energyMotivations = ["energy-storage", "energy-conversion"];

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
];
