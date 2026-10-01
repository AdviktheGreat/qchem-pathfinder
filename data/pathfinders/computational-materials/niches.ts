import type { Niche } from "@/lib/types";

const materialsStarterPaperTypes = [
  "A recent review or perspective for the field map",
  "A tutorial or methods paper for the computational workflow",
  "One recent application paper that compares calculation with evidence",
];

const materialsNicheDefaults = {
  paperTypes: materialsStarterPaperTypes,
  explorationFriendly: false,
};

export const computationalMaterialsNiches: Niche[] = [
  {
    ...materialsNicheDefaults,
    id: "crystal-phase-stability",
    area: "Structure and stability",
    name: "Crystal structure & phase stability",
    shortDescription:
      "Compare atomic arrangements to understand which material phases form and remain stable.",
    explanation:
      "The same chemical composition can sometimes arrange its atoms in several crystal structures, each with different properties. This direction uses energy, temperature, pressure, and vibrational behavior to compare those phases and explain when one arrangement becomes more favorable than another.",
    questions: [
      "Which crystal structure is most stable under a chosen set of conditions?",
      "How could temperature, pressure, or composition change the preferred phase?",
      "Does a proposed structure remain stable when its atoms are slightly displaced?",
    ],
    systems: [
      "Competing crystal polymorphs",
      "Alloys and ordered compounds",
      "High-pressure phases",
      "Ceramic and energy materials",
    ],
    approaches: [
      {
        name: "DFT energy comparison",
        explanation:
          "Density functional theory (DFT) estimates electronic energies so candidate structures can be relaxed and compared consistently.",
      },
      {
        name: "Crystal-structure search",
        explanation:
          "A systematic or algorithmic search proposes atomic arrangements that could be stable for a composition.",
      },
      {
        name: "Phonon and free-energy analysis",
        explanation:
          "Calculated atomic vibrations test structural stability and help include temperature in phase comparisons.",
      },
    ],
    concepts: [
      "Crystal lattices and unit cells",
      "Potential energy and structural relaxation",
      "Thermodynamic stability",
      "Bonding and electronic structure",
    ],
    preparation:
      "Begin with two or three known structures of a simple material and learn how energy differences are interpreted. Symmetry and thermodynamics can be added gradually; no prior structure-prediction experience is expected.",
    keywords: [
      "crystal structure",
      "phase stability",
      "polymorph",
      "formation energy",
      "DFT",
      "phonon stability",
      "free energy",
    ],
    synonyms: [
      "solid-state phase stability",
      "crystal polymorphism",
      "first-principles thermodynamics",
    ],
    searches: {
      orientation:
        "computational crystal structure phase stability beginner overview",
      focused: "DFT formation energy phonon stability competing crystal phases",
      review:
        "recent review first principles crystal phase stability prediction",
    },
    affinities: {
      "interest:fundamentals": 3,
      "mode:explain": 2,
      "mode:predict": 3,
      "mode:compare": 3,
      "mode:theory": 2,
      "family:crystalline": 3,
      "purpose:fundamental": 2,
      "scale:atomic": 3,
      "change:static": 3,
      "medium:visual": 2,
      "medium:equations": 2,
    },
    reasons: [
      {
        signal: "interest:fundamentals",
        category: "interest",
        text: "You were drawn to the underlying reasons that materials adopt particular structures.",
      },
      {
        signal: "mode:compare",
        category: "interest",
        text: "This direction makes careful comparisons among candidate structures and phases.",
      },
      {
        signal: "family:crystalline",
        category: "style",
        text: "You chose ordered crystals as a material family you would like to inspect.",
      },
      {
        signal: "change:static",
        category: "style",
        text: "You preferred building an explanation from structures and stable states.",
      },
    ],
    comparisonLens:
      "Compared with defects and diffusion, this direction emphasizes which ideal or competing phase is stable before focusing on local imperfections or motion.",
    explorationFriendly: true,
  },
  {
    ...materialsNicheDefaults,
    id: "defects-disorder-diffusion",
    area: "Structure and dynamics",
    name: "Defects, disorder & diffusion",
    shortDescription:
      "Study how imperfections and atomic motion reshape transport, stability, and material performance.",
    explanation:
      "Real materials are never perfectly ordered. Missing atoms, substitutions, disordered regions, and migrating ions can determine conductivity, strength, aging, and failure. This direction connects those local features to the paths atoms take and to the larger properties researchers measure.",
    questions: [
      "Which defects are easiest to form under particular conditions?",
      "What atomic pathway controls diffusion through the material?",
      "How does disorder change a measurable electronic, ionic, or mechanical property?",
    ],
    systems: [
      "Vacancies and impurities in crystals",
      "Disordered alloys and glasses",
      "Ion-conducting solids",
      "Defect-rich interfaces",
    ],
    approaches: [
      {
        name: "Defect formation calculations",
        explanation:
          "Electronic-structure calculations compare the energetic cost and charge state of specific imperfections.",
      },
      {
        name: "Molecular dynamics",
        explanation:
          "A simulation follows atomic motion over time to reveal diffusion, rearrangement, and temperature-dependent behavior.",
      },
      {
        name: "Migration-path analysis",
        explanation:
          "A pathway calculation estimates the energy barrier an atom or ion must cross between neighboring sites.",
      },
    ],
    concepts: [
      "Crystal defects and local structure",
      "Energy barriers and diffusion",
      "Temperature and atomic motion",
      "Structure–property relationships",
    ],
    preparation:
      "A manageable starting point is one vacancy or migrating ion in a known structure. Visualizing sites and energy barriers builds intuition before larger simulations or detailed defect thermodynamics.",
    keywords: [
      "point defects",
      "disorder",
      "atomic diffusion",
      "migration barrier",
      "vacancy",
      "molecular dynamics",
      "defect formation energy",
    ],
    synonyms: [
      "defect chemistry",
      "ionic migration",
      "disordered materials modeling",
    ],
    searches: {
      orientation:
        "computational materials defects disorder diffusion overview",
      focused:
        "DFT defect formation energy migration barrier solid state diffusion",
      review: "recent review atomistic modeling defects diffusion materials",
    },
    affinities: {
      "interest:fundamentals": 2,
      "mode:explain": 3,
      "mode:predict": 2,
      "mode:dynamics": 3,
      "family:crystalline": 2,
      "family:amorphous": 2,
      "phenomenon:ions": 3,
      "phenomenon:mechanical": 2,
      "scale:atomic": 3,
      "scale:microstructure": 2,
      "change:dynamic": 3,
      "medium:visual": 2,
    },
    reasons: [
      {
        signal: "mode:dynamics",
        category: "interest",
        text: "You wanted to model how a material changes rather than only its final structure.",
      },
      {
        signal: "mode:explain",
        category: "interest",
        text: "This direction explains macroscopic behavior through specific atomic imperfections.",
      },
      {
        signal: "phenomenon:ions",
        category: "style",
        text: "You were interested in how ions and atoms move through materials.",
      },
      {
        signal: "change:dynamic",
        category: "style",
        text: "Atomic motion and evolving local structure are central evidence here.",
      },
    ],
    comparisonLens:
      "Compared with phase-stability modeling, this direction starts from imperfections, disorder, or atomic movement within and between structures.",
  },
  {
    ...materialsNicheDefaults,
    id: "battery-electrodes",
    area: "Energy storage",
    name: "Battery electrode materials",
    shortDescription:
      "Model how electrode structures store charge, transform during cycling, and retain performance.",
    explanation:
      "An electrode repeatedly accepts and releases ions and electrons. Its atomic arrangement, composition, defects, and interfaces can all change during that process. Computational work helps connect those changes to voltage, capacity, rate capability, degradation, and safety without assuming that one material property tells the whole story.",
    questions: [
      "Where can ions be stored in an electrode structure, and at what voltage?",
      "Which structural or chemical changes occur as the electrode is cycled?",
      "How could composition or defects improve capacity without sacrificing stability?",
    ],
    systems: [
      "Lithium-ion cathodes",
      "Sodium-ion electrode materials",
      "Silicon and alloy anodes",
      "Intercalation and conversion compounds",
    ],
    approaches: [
      {
        name: "First-principles voltage calculations",
        explanation:
          "DFT energies for different ion contents estimate insertion preferences, phase stability, and average voltage.",
      },
      {
        name: "Ion-migration pathways",
        explanation:
          "Barrier calculations identify likely routes and bottlenecks for ions moving through an electrode.",
      },
      {
        name: "Configurational and atomistic modeling",
        explanation:
          "Sampling methods and molecular dynamics explore disorder, temperature, interfaces, and structural evolution beyond one ideal unit cell.",
      },
    ],
    concepts: [
      "Redox and charge balance",
      "Crystal structure and insertion sites",
      "Energy, voltage, and phase stability",
      "Diffusion and kinetic barriers",
    ],
    preparation:
      "Start with one well-studied electrode family and connect its structure to ion sites and voltage. Electrochemistry vocabulary is useful, but it can be learned alongside a small set of calculated structures.",
    keywords: [
      "battery electrode",
      "intercalation",
      "voltage profile",
      "ion diffusion",
      "cycling stability",
      "cathode materials",
      "first-principles battery modeling",
    ],
    synonyms: [
      "computational battery materials",
      "electrode materials modeling",
      "ion-insertion materials",
    ],
    searches: {
      orientation:
        "computational battery electrode materials modeling overview",
      focused: "DFT ion insertion voltage phase stability electrode material",
      review:
        "recent review first principles modeling battery electrode materials",
    },
    affinities: {
      "interest:energy-storage": 3,
      "application:energy": 3,
      "mode:predict": 2,
      "mode:design": 3,
      "mode:optimize": 3,
      "mode:dynamics": 2,
      "family:crystalline": 2,
      "phenomenon:ions": 3,
      "phenomenon:electrons": 2,
      "purpose:applied": 3,
      "scale:atomic": 2,
      "scale:device": 2,
      "change:dynamic": 3,
      "connection:predict": 2,
    },
    reasons: [
      {
        signal: "interest:energy-storage",
        category: "interest",
        text: "You chose energy storage as the materials challenge that most held your attention.",
      },
      {
        signal: "mode:optimize",
        category: "interest",
        text: "Battery electrodes involve balancing capacity, rate, stability, safety, and cost rather than maximizing one number.",
      },
      {
        signal: "phenomenon:ions",
        category: "style",
        text: "You wanted to understand how ions move through and occupy a material.",
      },
      {
        signal: "change:dynamic",
        category: "style",
        text: "Electrode structures can evolve during cycling, matching your interest in changing systems.",
      },
    ],
    comparisonLens:
      "Compared with solid electrolytes, this direction emphasizes charge-storing electrode phases, voltage, capacity, and structural change during cycling.",
  },
  {
    ...materialsNicheDefaults,
    id: "solid-electrolytes-ion-transport",
    area: "Energy storage and transport",
    name: "Solid electrolytes & ion transport",
    shortDescription:
      "Investigate atomic pathways that let ions move rapidly and safely through solid materials.",
    explanation:
      "A solid electrolyte must let particular ions travel while blocking electrons and remaining stable beside electrode materials. Researchers model available sites, migration barriers, defects, disorder, grain boundaries, and interfaces to understand why some structures conduct ions well and where resistance or degradation begins.",
    questions: [
      "Which connected pathway allows an ion to cross the structure?",
      "How do defects, disorder, or grain boundaries change ionic conductivity?",
      "Is the electrolyte stable against the neighboring electrode materials?",
    ],
    systems: [
      "Lithium and sodium solid electrolytes",
      "Ceramic ion conductors",
      "Polymer and composite electrolytes",
      "Electrode–electrolyte interfaces",
    ],
    approaches: [
      {
        name: "Migration-barrier calculations",
        explanation:
          "A sequence of atomic images estimates the energetic bottleneck between neighboring ion sites.",
      },
      {
        name: "Molecular dynamics",
        explanation:
          "Time-dependent atomistic simulations reveal collective motion and estimate diffusion as temperature changes.",
      },
      {
        name: "Interface and defect modeling",
        explanation:
          "Models of vacancies, grain boundaries, and electrode contacts test how realistic imperfections help or hinder transport.",
      },
    ],
    concepts: [
      "Ionic conductivity and diffusion",
      "Defects and charge neutrality",
      "Energy barriers",
      "Interfaces and electrochemical stability",
    ],
    preparation:
      "Begin by visualizing the ion sites and one migration pathway in a crystalline conductor. Diffusion statistics and interface chemistry can follow once the physical picture is secure.",
    keywords: [
      "solid electrolyte",
      "ionic conductivity",
      "ion transport",
      "migration barrier",
      "molecular dynamics",
      "grain boundary",
      "electrochemical stability",
    ],
    synonyms: [
      "solid-state ionics",
      "superionic conductor modeling",
      "solid electrolyte simulation",
    ],
    searches: {
      orientation: "computational solid electrolytes ion transport overview",
      focused:
        "ion migration barriers molecular dynamics solid electrolyte conductivity",
      review:
        "recent review computational modeling solid electrolytes ion transport",
    },
    affinities: {
      "interest:energy-storage": 3,
      "application:energy": 3,
      "mode:explain": 2,
      "mode:predict": 3,
      "mode:dynamics": 3,
      "family:crystalline": 2,
      "family:composite": 2,
      "phenomenon:ions": 3,
      "purpose:applied": 3,
      "scale:atomic": 3,
      "scale:microstructure": 2,
      "change:dynamic": 3,
      "medium:visual": 2,
    },
    reasons: [
      {
        signal: "interest:energy-storage",
        category: "interest",
        text: "You were drawn to the materials that make energy storage work safely and repeatedly.",
      },
      {
        signal: "mode:dynamics",
        category: "interest",
        text: "This direction follows ion motion and changing local environments over time.",
      },
      {
        signal: "phenomenon:ions",
        category: "style",
        text: "Ion transport was one of the material behaviors you most wanted to investigate.",
      },
      {
        signal: "scale:microstructure",
        category: "style",
        text: "Grain boundaries and connected pathways link atomic motion to microstructure in this field.",
      },
    ],
    comparisonLens:
      "Compared with battery-electrode modeling, this direction focuses on transporting ions through an electronically insulating medium and across its interfaces.",
  },
];
