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
];
