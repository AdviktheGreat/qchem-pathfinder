import type { Niche } from "@/lib/types";
import { materialsNicheDefaults } from "@/data/pathfinders/computational-materials/niche-defaults";

export const catalysisDirections: Niche[] = [
  {
    ...materialsNicheDefaults,
    id: "heterogeneous-catalysis-surfaces",
    area: "Catalysis and surfaces",
    name: "Heterogeneous catalysis & surfaces",
    shortDescription:
      "Map adsorption and reaction steps on solid surfaces to explain catalytic activity and selectivity.",
    explanation:
      "A heterogeneous catalyst provides surface sites where molecules attach, rearrange, react, and leave. The useful site may be a terrace, edge, defect, alloy ensemble, or supported particle. Computation compares these local environments and their reaction barriers to explain why a surface favors one pathway over another.",
    questions: [
      "Which surface site binds each reaction intermediate most usefully?",
      "What elementary step creates the largest kinetic bottleneck?",
      "How do defects, facets, or alloy composition change activity and selectivity?",
    ],
    systems: [
      "Metal and alloy catalysts",
      "Oxide and carbide surfaces",
      "Supported nanoparticles",
      "Gas-phase and liquid-phase surface reactions",
    ],
    approaches: [
      {
        name: "Periodic DFT surface calculations",
        explanation:
          "A repeating slab model estimates adsorption structures, energies, and electronic changes at a solid surface.",
      },
      {
        name: "Reaction-pathway analysis",
        explanation:
          "Transition-state calculations compare elementary surface steps and identify plausible catalytic cycles.",
      },
      {
        name: "Microkinetic modeling",
        explanation:
          "A network of calculated steps predicts rates, surface coverages, and which assumptions control overall behavior.",
      },
    ],
    concepts: [
      "Adsorption and surface sites",
      "Reaction energies and activation barriers",
      "Catalytic cycles and selectivity",
      "Surface structure and electronic bonding",
    ],
    preparation:
      "Begin with one surface, a small set of adsorbates, and a proposed reaction sequence. Surface notation and kinetics can be learned alongside visual structures and a simple energy diagram.",
    keywords: [
      "heterogeneous catalysis",
      "surface adsorption",
      "active site",
      "periodic DFT",
      "reaction pathway",
      "microkinetic modeling",
      "catalyst selectivity",
    ],
    synonyms: [
      "surface catalysis modeling",
      "solid catalyst simulation",
      "first-principles catalysis",
    ],
    searches: {
      orientation: "computational heterogeneous catalysis surfaces overview",
      focused:
        "periodic DFT adsorption reaction pathway active site catalyst surface",
      review:
        "recent review computational heterogeneous catalysis surface modeling",
    },
    affinities: {
      "interest:catalysis": 3,
      "mode:explain": 3,
      "mode:compare": 2,
      "mode:optimize": 3,
      "mode:dynamics": 2,
      "family:crystalline": 2,
      "family:porous": 1,
      "phenomenon:surfaces": 3,
      "phenomenon:chemical-change": 3,
      "purpose:applied": 2,
      "scale:surface": 3,
      "change:dynamic": 3,
      "medium:visual": 2,
      "style:compare": 2,
    },
    reasons: [
      {
        signal: "interest:catalysis",
        category: "interest",
        text: "You were drawn to materials that make chemical transformations more efficient.",
      },
      {
        signal: "mode:explain",
        category: "interest",
        text: "This direction explains catalytic performance through sites, intermediates, and elementary steps.",
      },
      {
        signal: "phenomenon:surfaces",
        category: "style",
        text: "Surfaces and interfaces were among the material behaviors you most wanted to understand.",
      },
      {
        signal: "phenomenon:chemical-change",
        category: "style",
        text: "Bond-making and bond-breaking on a material are central evidence here.",
      },
    ],
    comparisonLens:
      "Compared with electrocatalysis, this direction does not require an applied electrode potential or an explicitly electrochemical interface as the central control variable.",
  },
  {
    ...materialsNicheDefaults,
    id: "electrocatalysis",
    area: "Catalysis and electrochemistry",
    name: "Electrocatalyst modeling",
    shortDescription:
      "Study reactions at charged electrode interfaces where voltage, solvent, and ions shape catalytic behavior.",
    explanation:
      "Electrocatalysis couples surface chemistry to electron transfer under an applied potential. The reacting interface can change with voltage, solvent, ions, and adsorbed species, making its environment part of the mechanism. Computation helps compare active sites, reaction steps, stability, and potential-dependent trends.",
    questions: [
      "Which surface state and active site are present at an operating potential?",
      "How do electron and proton transfers change the preferred reaction pathway?",
      "Which material balances activity, selectivity, and electrochemical stability?",
    ],
    systems: [
      "Water-splitting catalysts",
      "Carbon-dioxide reduction electrodes",
      "Fuel-cell reaction catalysts",
      "Metal, oxide, and single-atom electrocatalysts",
    ],
    approaches: [
      {
        name: "Potential-dependent DFT modeling",
        explanation:
          "Electronic-structure calculations estimate reaction energies while accounting approximately or explicitly for electrode potential.",
      },
      {
        name: "Solvated interface simulation",
        explanation:
          "Implicit or molecular solvent models examine water, ions, electric fields, and interfacial structure around the active site.",
      },
      {
        name: "Reaction-network and activity analysis",
        explanation:
          "Calculated intermediates and barriers are organized into selectivity maps, activity trends, or microkinetic models.",
      },
    ],
    concepts: [
      "Electrode potential and electron transfer",
      "Surface adsorption and reaction pathways",
      "Solvation and interfacial electric fields",
      "Activity, selectivity, and stability",
    ],
    preparation:
      "Begin with one familiar electrochemical reaction and a simplified free-energy diagram. Potential and solvation models involve approximations, so learning what each model includes is part of the research question.",
    keywords: [
      "electrocatalysis",
      "electrode interface",
      "applied potential",
      "proton coupled electron transfer",
      "electrochemical DFT",
      "activity descriptor",
      "selectivity",
    ],
    synonyms: [
      "computational electrochemistry",
      "electrocatalyst simulation",
      "potential-dependent surface modeling",
    ],
    searches: {
      orientation: "computational electrocatalysis modeling overview",
      focused:
        "potential dependent DFT solvent interface electrocatalyst reaction pathway",
      review:
        "recent review computational electrocatalysis electrode interface methods",
    },
    affinities: {
      "interest:catalysis": 3,
      "interest:energy-conversion": 2,
      "application:energy": 2,
      "mode:explain": 2,
      "mode:design": 3,
      "mode:optimize": 3,
      "phenomenon:surfaces": 3,
      "phenomenon:chemical-change": 3,
      "phenomenon:electrons": 2,
      "purpose:applied": 3,
      "scale:surface": 3,
      "change:dynamic": 2,
      "connection:experiment": 2,
      "evidence:experiment": 2,
    },
    reasons: [
      {
        signal: "interest:catalysis",
        category: "interest",
        text: "You wanted to understand or improve a material that helps reactions proceed.",
      },
      {
        signal: "mode:optimize",
        category: "interest",
        text: "Electrocatalyst design balances activity, product selectivity, and stability under voltage.",
      },
      {
        signal: "phenomenon:surfaces",
        category: "style",
        text: "You chose interfaces as a material environment you would like to investigate.",
      },
      {
        signal: "connection:experiment",
        category: "style",
        text: "Calculated trends in this field are often compared with voltage-dependent measurements.",
      },
    ],
    comparisonLens:
      "Compared with heterogeneous surface catalysis, this direction centers a charged electrode, applied potential, electron transfer, and an electrochemical environment.",
  },
];
