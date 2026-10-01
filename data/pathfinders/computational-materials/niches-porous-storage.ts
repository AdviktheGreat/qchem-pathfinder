import type { Niche } from "@/lib/types";
import { materialsNicheDefaults } from "@/data/pathfinders/computational-materials/niche-defaults";

export const porousStorageDirections: Niche[] = [
  {
    ...materialsNicheDefaults,
    id: "porous-separation-storage",
    area: "Porous and environmental materials",
    name: "Porous materials for separation & storage",
    shortDescription:
      "Model how pores recognize, transport, capture, and release selected molecules from mixtures.",
    explanation:
      "Porous crystals and membranes contain internal spaces whose size, shape, flexibility, and chemical environment control molecular access. Computation can predict adsorption, selectivity, diffusion, and capacity while showing which pore features distinguish one gas, ion, or contaminant from another.",
    questions: [
      "Why does a pore bind one molecular species more strongly than another?",
      "How quickly can molecules enter, cross, and leave the material?",
      "Which pore chemistry balances selectivity, capacity, and easy regeneration?",
    ],
    systems: [
      "Metal–organic and covalent organic frameworks",
      "Zeolites and porous oxides",
      "Nanoporous membranes",
      "Gas-capture and water-purification materials",
    ],
    approaches: [
      {
        name: "Grand-canonical Monte Carlo",
        explanation:
          "Statistical sampling predicts how many molecules occupy a pore at different pressures and compositions.",
      },
      {
        name: "Molecular dynamics",
        explanation:
          "Time-dependent simulations reveal diffusion, pore flexibility, and transport through a membrane or framework.",
      },
      {
        name: "Electronic-structure binding analysis",
        explanation:
          "DFT examines specific adsorption sites and chemical interactions that simpler force fields may miss.",
      },
    ],
    concepts: [
      "Intermolecular interactions and adsorption",
      "Pore size, topology, and accessible volume",
      "Diffusion and molecular transport",
      "Selectivity and thermodynamic equilibrium",
    ],
    preparation:
      "Begin with two molecular guests in one well-characterized framework. Structure images and adsorption curves provide an accessible entry before statistical mechanics or force-field details.",
    keywords: [
      "porous materials",
      "molecular adsorption",
      "gas separation",
      "metal organic framework",
      "selectivity",
      "grand canonical Monte Carlo",
      "molecular diffusion",
    ],
    synonyms: [
      "nanoporous materials modeling",
      "adsorptive separation",
      "framework materials simulation",
    ],
    searches: {
      orientation:
        "computational porous materials adsorption separation overview",
      focused:
        "molecular simulation adsorption selectivity diffusion porous framework",
      review:
        "recent review computational screening porous materials gas separation",
    },
    affinities: {
      "interest:environment": 3,
      "interest:data-discovery": 2,
      "application:sustainability": 3,
      "mode:predict": 3,
      "mode:compare": 2,
      "mode:design": 3,
      "mode:optimize": 3,
      "family:porous": 3,
      "phenomenon:surfaces": 2,
      "phenomenon:ions": 1,
      "purpose:applied": 3,
      "scale:atomic": 2,
      "scale:multiscale": 2,
      "medium:data": 2,
      "style:coding": 2,
    },
    reasons: [
      {
        signal: "interest:environment",
        category: "interest",
        text: "You were drawn to materials for capture, separation, cleaner water, or environmental resilience.",
      },
      {
        signal: "mode:design",
        category: "interest",
        text: "Porous-material design connects tunable pore chemistry to a target molecular separation.",
      },
      {
        signal: "family:porous",
        category: "style",
        text: "Pores and accessible internal surfaces were the material world you chose to explore.",
      },
      {
        signal: "medium:data",
        category: "style",
        text: "Adsorption and screening studies produce comparative datasets well suited to trend finding.",
      },
    ],
    comparisonLens:
      "Compared with hydrogen storage, this direction centers selective capture or transport across many possible molecular mixtures rather than one fuel molecule’s storage cycle.",
    explorationFriendly: true,
  },
  {
    ...materialsNicheDefaults,
    id: "hydrogen-storage-materials",
    area: "Energy storage",
    name: "Hydrogen-storage materials",
    shortDescription:
      "Balance hydrogen capacity, binding strength, transport, safety, and reversible release in candidate materials.",
    explanation:
      "Hydrogen can be stored by weak adsorption in pores or through stronger chemical bonding in hydrides and related compounds. A useful material must hold enough hydrogen under realistic conditions yet release it without excessive heat or slow kinetics. Computation compares structures, binding, phase changes, and transport across these competing requirements.",
    questions: [
      "Where and how strongly does hydrogen bind in the candidate material?",
      "What temperature and pressure favor storage or release?",
      "Which structural changes or kinetic barriers limit reversible cycling?",
    ],
    systems: [
      "Metal and complex hydrides",
      "Porous frameworks and carbons",
      "Hydrogen-binding alloys",
      "Catalyzed and nanostructured storage materials",
    ],
    approaches: [
      {
        name: "DFT binding and phase calculations",
        explanation:
          "Electronic energies compare hydrogen sites, chemical bonding, reaction steps, and competing hydride phases.",
      },
      {
        name: "Adsorption simulation",
        explanation:
          "Monte Carlo methods estimate pressure- and temperature-dependent hydrogen uptake in porous structures.",
      },
      {
        name: "Transport and reaction-path modeling",
        explanation:
          "Atomistic dynamics and barrier calculations examine diffusion, nucleation, and the release pathway.",
      },
    ],
    concepts: [
      "Physical adsorption versus chemical storage",
      "Binding energy and reversible release",
      "Phase stability and thermodynamics",
      "Diffusion and kinetic barriers",
    ],
    preparation:
      "Start by comparing weak adsorption with hydride formation and identify what ‘reversible’ means for each. Pressure, temperature, and energy units deserve careful attention before comparing reported capacities.",
    keywords: [
      "hydrogen storage materials",
      "metal hydride",
      "hydrogen adsorption",
      "binding energy",
      "reversible storage",
      "desorption",
      "hydrogen diffusion",
    ],
    synonyms: [
      "solid-state hydrogen storage",
      "hydride materials modeling",
      "adsorptive hydrogen storage",
    ],
    searches: {
      orientation: "computational hydrogen storage materials beginner overview",
      focused:
        "DFT hydrogen binding hydride stability reversible storage material",
      review: "recent review computational modeling hydrogen storage materials",
    },
    affinities: {
      "interest:energy-storage": 3,
      "interest:energy-conversion": 2,
      "application:energy": 3,
      "mode:predict": 2,
      "mode:design": 3,
      "mode:optimize": 3,
      "mode:dynamics": 2,
      "family:porous": 2,
      "family:crystalline": 2,
      "phenomenon:chemical-change": 2,
      "phenomenon:ions": 1,
      "purpose:applied": 3,
      "change:dynamic": 2,
      "scale:atomic": 2,
      "scale:device": 2,
    },
    reasons: [
      {
        signal: "interest:energy-storage",
        category: "interest",
        text: "You wanted to understand materials that store an energy carrier effectively and reversibly.",
      },
      {
        signal: "mode:optimize",
        category: "interest",
        text: "Hydrogen storage requires balancing capacity, release conditions, kinetics, and safety.",
      },
      {
        signal: "family:porous",
        category: "style",
        text: "Porous hosts offer one important route for physically adsorbing hydrogen.",
      },
      {
        signal: "change:dynamic",
        category: "style",
        text: "Storage and release involve transport and structural change rather than one static state.",
      },
    ],
    comparisonLens:
      "Compared with general porous separation, this direction evaluates hydrogen-specific capacity, release conditions, phase changes, and cycling constraints.",
  },
];
