import { definePhysicsNiche } from "@/data/pathfinders/computational-physics/niche-defaults";

export const geophysicalFlowDirections = [
  definePhysicsNiche({
    id: "atmospheric-ocean-dynamics",
    area: "Earth and planetary flows",
    name: "Atmospheric & ocean dynamics",
    shortDescription:
      "Model rotating, stratified fluids to understand weather systems, currents, waves, and large-scale transport.",
    explanation:
      "Atmospheres and oceans are fluids shaped by rotation, density differences, heating, and boundaries. Researchers simulate selected processes or coupled circulation, then use observations and conservation laws to judge which patterns are physically meaningful.",
    questions: [
      "How do rotation and stratification organize large-scale currents and storms?",
      "What controls the transport of heat, momentum, or tracers?",
      "Which features are predictable, and over what timescale?",
    ],
    systems: [
      "Jet streams and weather systems",
      "Ocean currents and eddies",
      "Atmospheric and ocean waves",
      "Idealized rotating fluid experiments",
    ],
    approaches: [
      {
        name: "Geophysical fluid simulation",
        explanation:
          "Rotating and stratified fluid equations are solved at a chosen scale to study circulation and instability.",
      },
      {
        name: "Tracer and budget analysis",
        explanation:
          "Heat, moisture, salt, or idealized tracers reveal transport while energy and momentum budgets test interpretation.",
      },
      {
        name: "Data assimilation and comparison",
        explanation:
          "Models and measurements are combined or compared to estimate evolving states and identify systematic differences.",
      },
    ],
    concepts: [
      "Rotation and the Coriolis effect",
      "Density stratification and buoyancy",
      "Waves, instabilities, and circulation",
      "Transport budgets and predictability",
    ],
    preparation:
      "Begin with an idealized rotating or stratified flow rather than a full weather model. Follow one tracer or energy budget and compare the simulated pattern with a simple physical prediction.",
    keywords: [
      "geophysical fluid dynamics",
      "atmospheric circulation modeling",
      "ocean circulation simulation",
      "rotating stratified flow",
      "baroclinic instability",
      "tracer transport",
      "data assimilation",
    ],
    synonyms: [
      "computational atmosphere-ocean dynamics",
      "numerical geophysical flow",
      "weather and ocean fluid modeling",
    ],
    searches: {
      orientation: "computational atmospheric ocean dynamics overview",
      focused:
        "rotating stratified flow circulation tracer transport simulation",
      review: "recent review numerical geophysical fluid dynamics methods",
    },
    comparisonLens:
      "Compared with climate-system modeling, this direction often isolates the fluid mechanisms behind circulation, waves, and weather-scale structures.",
    explorationFriendly: true,
  }),
  definePhysicsNiche({
    id: "climate-earth-system-modeling",
    area: "Earth and planetary flows",
    name: "Climate & Earth-system modeling",
    shortDescription:
      "Investigate interactions among atmosphere, ocean, land, ice, and radiation across long timescales.",
    explanation:
      "Earth-system models couple physical components that exchange energy, water, momentum, and carbon. Computational researchers examine mechanisms, compare ensembles, and attribute uncertainty to internal variability, model structure, parameters, and future inputs rather than treating one run as a forecast.",
    questions: [
      "Which feedbacks amplify or reduce a change in Earth’s energy balance?",
      "How do ocean, atmosphere, land, and ice responses interact?",
      "How much of a projected pattern comes from variability versus modeling choices?",
    ],
    systems: [
      "Global climate models",
      "Cloud and radiation processes",
      "Sea ice and polar feedbacks",
      "Regional climate ensembles",
    ],
    approaches: [
      {
        name: "Coupled component modeling",
        explanation:
          "Atmosphere, ocean, land, and ice calculations exchange fluxes while operating at practical spatial and temporal resolution.",
      },
      {
        name: "Ensemble experiments",
        explanation:
          "Many runs with varied initial conditions, parameters, or scenarios separate robust responses from uncertain spread.",
      },
      {
        name: "Feedback and attribution analysis",
        explanation:
          "Energy budgets and controlled experiments estimate which processes contribute to a simulated change.",
      },
    ],
    concepts: [
      "Energy balance and radiative transfer",
      "Feedbacks and coupled systems",
      "Internal variability",
      "Ensembles and sources of uncertainty",
    ],
    preparation:
      "Start with a zero- or one-dimensional energy-balance model or analyze a small public ensemble. Separate the physical response, internal variability, and assumptions before drawing conclusions.",
    keywords: [
      "Earth system modeling",
      "climate model ensemble",
      "climate feedback",
      "energy balance model",
      "coupled climate model",
      "internal variability",
      "climate uncertainty",
    ],
    synonyms: [
      "computational climate physics",
      "Earth-system simulation",
      "numerical climate modeling",
    ],
    searches: {
      orientation: "computational climate Earth system modeling overview",
      focused:
        "climate ensemble feedback energy balance internal variability modeling",
      review: "recent review Earth system model uncertainty feedbacks",
    },
    comparisonLens:
      "Compared with atmospheric and ocean dynamics, this direction emphasizes long-timescale coupling, feedbacks, and ensemble uncertainty across the Earth system.",
  }),
];
