import type { SurveyQuestion } from "@/lib/types";

const uncertain = {
  id: "unsure",
  label: "I’m not sure yet",
  description:
    "Keep the possibilities open; this will not count against any direction.",
  uncertainty: true,
} as const;

export const stageLabels = {
  calibration: "Starting point",
  motivation: "What draws you in",
  narrowing: "Look a little closer",
  question: "Kinds of questions",
  style: "How you like to investigate",
} as const;

export const questions: SurveyQuestion[] = [
  {
    id: "phase-one-memory",
    stage: "calibration",
    kicker: "Start where you are",
    title: "How does Phase 1 feel in your memory right now?",
    prompt:
      "This changes the amount of context in your results—not which fields you are allowed to explore.",
    type: "single",
    options: [
      {
        id: "fresh",
        label: "The big picture feels fresh",
        description: "I could explain several main ideas in my own words.",
      },
      {
        id: "recognize",
        label: "I recognize more than I can explain",
        description: "The ideas look familiar, but I would want a refresher.",
      },
      {
        id: "fuzzy",
        label: "It feels a little fuzzy",
        description:
          "I remember pieces and would benefit from a clear starting map.",
      },
      uncertain,
    ],
  },
  {
    id: "concept-familiarity",
    stage: "calibration",
    kicker: "Concept check-in",
    title: "Which ideas feel familiar enough to use in a conversation?",
    prompt: "Choose up to four. Recognition is enough—this is not a quiz.",
    type: "multi",
    maxSelections: 4,
    options: [
      { id: "orbitals", label: "Orbitals & electron density" },
      { id: "energy", label: "Potential energy & stability" },
      { id: "bonding", label: "Bonding & molecular shape" },
      { id: "spectra", label: "Light absorption & spectra" },
      { id: "methods", label: "Computational methods such as DFT" },
      {
        id: "uncertain",
        label: "I’ve heard of these but couldn’t explain them",
        uncertainty: true,
      },
    ],
  },
  {
    id: "math-comfort",
    stage: "calibration",
    kicker: "Working language",
    title: "How do you feel when a scientific explanation uses equations?",
    type: "single",
    options: [
      {
        id: "comfortable",
        label: "Comfortable",
        description: "Equations often help me see the structure of an idea.",
        signals: { "medium:equations": 1 },
      },
      {
        id: "with-guidance",
        label: "Good with some guidance",
        description:
          "I can follow the math when each piece is introduced clearly.",
        signals: { "medium:mixed": 1 },
      },
      {
        id: "concept-first",
        label: "Concepts first, please",
        description:
          "I learn best from a picture or explanation before symbols.",
        signals: { "medium:visual": 1 },
      },
      uncertain,
    ],
  },
  {
    id: "coding-comfort",
    stage: "calibration",
    kicker: "Tool check-in",
    title:
      "What is your current relationship with coding or computational tools?",
    type: "single",
    options: [
      {
        id: "enjoy",
        label: "I enjoy using them",
        description: "I’m happy writing or adapting code.",
        signals: { "style:coding": 1 },
      },
      {
        id: "learning",
        label: "I’m learning",
        description: "I can work through examples and want more practice.",
        signals: { "style:mixed-computing": 1 },
      },
      {
        id: "new",
        label: "Mostly new to me",
        description: "I would want a guided introduction to the tools.",
      },
      {
        id: "chemistry",
        label: "I’d rather keep chemistry central",
        description: "I’m open to software, but not as the main attraction.",
        signals: { "style:chemistry": 1 },
      },
      uncertain,
    ],
  },
  {
    id: "explanation-style",
    stage: "calibration",
    kicker: "How ideas click",
    title: "Which explanation would you reach for first?",
    type: "single",
    options: [
      {
        id: "conceptual",
        label: "A clear mental model",
        description: "Tell me what is happening and why it matters.",
        signals: { "mode:explain": 1, "medium:visual": 1 },
      },
      {
        id: "quantitative",
        label: "A quantitative pattern",
        description: "Show me the variables, trend, or equation.",
        signals: { "mode:predict": 1, "medium:equations": 1 },
      },
      {
        id: "mixed",
        label: "A mix of both",
        description: "Build intuition, then connect it to the numbers.",
        signals: { "medium:mixed": 1 },
      },
      uncertain,
    ],
  },
  {
    id: "motivation",
    stage: "motivation",
    kicker: "Follow your attention",
    title: "Which doorway makes you most curious today?",
    prompt:
      "You are choosing what to explore first, not committing to a career or final project.",
    type: "single",
    options: [
      {
        id: "medicine",
        label: "Molecules in health",
        description:
          "How drugs, proteins, DNA, and their surroundings interact.",
        signals: { "interest:medicine": 3, "scale:molecule": 1 },
      },
      {
        id: "energy",
        label: "Energy & sustainability",
        description:
          "Capturing light, moving charge, or improving energy materials.",
        signals: { "interest:energy": 3 },
      },
      {
        id: "environment",
        label: "Air, water & environment",
        description:
          "The molecular fate of pollutants and atmospheric species.",
        signals: { "interest:environment": 3 },
      },
      {
        id: "materials",
        label: "Materials with new abilities",
        description:
          "Molecules and solids designed to conduct, glow, sense, or store.",
        signals: { "interest:materials": 3, "scale:material": 1 },
      },
      {
        id: "reactions",
        label: "Why reactions take one path",
        description:
          "Mechanisms, catalysts, barriers, and chemical selectivity.",
        signals: { "interest:reactions": 3, "state:changing": 1 },
      },
      {
        id: "light",
        label: "Light, color & spectra",
        description: "What light can reveal—and change—about molecules.",
        signals: { "interest:light": 3, "state:excited": 1 },
      },
      {
        id: "fundamentals",
        label: "The rules behind molecules",
        description: "Electronic structure, bonding, and why methods work.",
        signals: { "interest:fundamentals": 3 },
      },
      {
        id: "computing",
        label: "Computing, data & ML",
        description:
          "Algorithms that predict molecular behavior or test chemical models.",
        signals: { "interest:computing": 3, "style:coding": 1 },
      },
      {
        id: "space",
        label: "Chemistry beyond Earth",
        description:
          "Molecules in interstellar clouds, atmospheres, and extreme conditions.",
        signals: { "interest:space": 3 },
      },
      {
        id: "balanced",
        label: "Show me several possibilities",
        description: "I want to sample the landscape before narrowing.",
        signals: { "interest:open": 3 },
      },
    ],
  },

  // Each student sees only the two follow-ups attached to their chosen doorway.
  {
    id: "medicine-focus",
    stage: "narrowing",
    kicker: "Inside molecular health",
    title:
      "What part of a molecular health story would you most want to zoom into?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["medicine"] },
    options: [
      {
        id: "binding",
        label: "How molecules recognize and hold each other",
        nicheBoosts: {
          "noncovalent-interactions": 6,
          "biomolecular-electronics": 3,
        },
      },
      {
        id: "surroundings",
        label: "How water or a solvent changes an interaction",
        nicheBoosts: { "solvation-effects": 6, "noncovalent-interactions": 2 },
      },
      {
        id: "shape",
        label: "Which molecular shapes are stable",
        nicheBoosts: {
          "conformations-stability": 6,
          "biomolecular-electronics": 2,
        },
      },
      {
        id: "electrons",
        label: "How electronic structure contributes to binding",
        nicheBoosts: {
          "biomolecular-electronics": 6,
          "fundamental-electronic-structure": 2,
        },
      },
      uncertain,
    ],
  },
  {
    id: "medicine-system",
    stage: "narrowing",
    kicker: "Choose a scene",
    title: "Which system sounds most interesting to investigate?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["medicine"] },
    options: [
      {
        id: "drug-protein",
        label: "A drug approaching a protein pocket",
        nicheBoosts: {
          "biomolecular-electronics": 4,
          "noncovalent-interactions": 3,
        },
      },
      {
        id: "drug-dna",
        label: "A small molecule interacting with DNA",
        nicheBoosts: { "biomolecular-electronics": 5 },
      },
      {
        id: "water-shell",
        label: "Water reorganizing around a molecule",
        nicheBoosts: { "solvation-effects": 5 },
      },
      {
        id: "flexible",
        label: "A flexible molecule switching shapes",
        nicheBoosts: { "conformations-stability": 5 },
      },
      uncertain,
    ],
  },
  {
    id: "energy-focus",
    stage: "narrowing",
    kicker: "Inside energy chemistry",
    title: "Which part of an energy system would you want to understand?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["energy"] },
    options: [
      {
        id: "capture",
        label: "How a molecule captures light",
        nicheBoosts: { "excited-states": 5, "energy-chemistry": 3 },
      },
      {
        id: "charge",
        label: "How charge moves after light absorption",
        nicheBoosts: { "charge-transfer": 6, "organic-electronics": 2 },
      },
      {
        id: "device",
        label: "How molecular design changes a device material",
        nicheBoosts: { "organic-electronics": 6, "energy-chemistry": 2 },
      },
      {
        id: "fuel",
        label: "How molecular reactions store or release energy",
        nicheBoosts: { "energy-chemistry": 6, "computational-catalysis": 2 },
      },
      uncertain,
    ],
  },
  {
    id: "energy-challenge",
    stage: "narrowing",
    kicker: "Choose a challenge",
    title: "Which research challenge sounds most satisfying?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["energy"] },
    options: [
      {
        id: "loss",
        label: "Finding where useful energy is lost",
        nicheBoosts: { "excited-states": 4, "charge-transfer": 3 },
      },
      {
        id: "screen",
        label: "Screening many candidate molecules",
        nicheBoosts: { "energy-chemistry": 4, "ml-property-prediction": 3 },
      },
      {
        id: "structure",
        label: "Connecting atomic structure to performance",
        nicheBoosts: { "organic-electronics": 5 },
      },
      {
        id: "compare",
        label: "Testing which calculation is trustworthy",
        nicheBoosts: { "method-benchmarking": 5, "energy-chemistry": 2 },
      },
      uncertain,
    ],
  },
  {
    id: "environment-focus",
    stage: "narrowing",
    kicker: "Inside environmental chemistry",
    title: "Where would you place your molecular magnifying glass?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["environment"] },
    options: [
      {
        id: "air",
        label: "Reactive molecules in the atmosphere",
        nicheBoosts: { "environmental-chemistry": 6 },
      },
      {
        id: "water",
        label: "A pollutant dissolved in water",
        nicheBoosts: { "solvation-effects": 5, "environmental-chemistry": 3 },
      },
      {
        id: "sunlight",
        label: "Sunlight transforming an environmental molecule",
        nicheBoosts: { "environmental-chemistry": 4, "excited-states": 3 },
      },
      {
        id: "trace",
        label: "Detecting a trace molecule from its spectrum",
        nicheBoosts: {
          "computational-spectroscopy": 5,
          "environmental-chemistry": 3,
        },
      },
      uncertain,
    ],
  },
  {
    id: "environment-question",
    stage: "narrowing",
    kicker: "Follow its fate",
    title: "What would you most want to learn about that molecule?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["environment"] },
    options: [
      {
        id: "react",
        label: "What it reacts with and how fast",
        nicheBoosts: { "environmental-chemistry": 5, "reaction-mechanisms": 2 },
      },
      {
        id: "persist",
        label: "Why it persists or breaks down",
        nicheBoosts: {
          "environmental-chemistry": 5,
          "selectivity-pathways": 2,
        },
      },
      {
        id: "surroundings",
        label: "How its surroundings change its behavior",
        nicheBoosts: { "solvation-effects": 4, "noncovalent-interactions": 2 },
      },
      {
        id: "signal",
        label: "How we could recognize it computationally",
        nicheBoosts: { "computational-spectroscopy": 5 },
      },
      uncertain,
    ],
  },
  {
    id: "materials-focus",
    stage: "narrowing",
    kicker: "Inside molecular materials",
    title: "Which ability would you want a material to have?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["materials"] },
    options: [
      {
        id: "glow",
        label: "Absorb or emit useful colors",
        nicheBoosts: { "organic-electronics": 5, "excited-states": 3 },
      },
      {
        id: "conduct",
        label: "Move electrical charge efficiently",
        nicheBoosts: { "organic-electronics": 5, "charge-transfer": 4 },
      },
      {
        id: "sense",
        label: "Change detectably around another molecule",
        nicheBoosts: {
          "noncovalent-interactions": 3,
          "organic-electronics": 4,
        },
      },
      {
        id: "catalyze",
        label: "Help a reaction happen more easily",
        nicheBoosts: { "computational-catalysis": 5 },
      },
      uncertain,
    ],
  },
  {
    id: "materials-scale",
    stage: "narrowing",
    kicker: "Pick a design lens",
    title: "What part of material design feels most interesting?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["materials"] },
    options: [
      {
        id: "building-block",
        label: "Designing the molecular building block",
        nicheBoosts: { "organic-electronics": 5, "conformations-stability": 2 },
      },
      {
        id: "packing",
        label: "How many molecules arrange together",
        nicheBoosts: {
          "organic-electronics": 4,
          "noncovalent-interactions": 3,
        },
      },
      {
        id: "property",
        label: "Predicting a measurable property",
        nicheBoosts: { "ml-property-prediction": 4, "organic-electronics": 3 },
      },
      {
        id: "method",
        label: "Checking whether the simulation is accurate",
        nicheBoosts: { "method-benchmarking": 5 },
      },
      uncertain,
    ],
  },
  {
    id: "reactions-focus",
    stage: "narrowing",
    kicker: "Inside a reaction",
    title: "Which puzzle would you put under the microscope?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["reactions"] },
    options: [
      {
        id: "steps",
        label: "The hidden sequence of bond changes",
        nicheBoosts: { "reaction-mechanisms": 6 },
      },
      {
        id: "catalyst",
        label: "How a catalyst lowers the difficult step",
        nicheBoosts: { "computational-catalysis": 6 },
      },
      {
        id: "outcome",
        label: "Why one product forms instead of another",
        nicheBoosts: { "selectivity-pathways": 6 },
      },
      {
        id: "solvent",
        label: "How the solvent changes the route",
        nicheBoosts: { "solvation-effects": 4, "reaction-mechanisms": 3 },
      },
      uncertain,
    ],
  },
  {
    id: "reactions-view",
    stage: "narrowing",
    kicker: "Choose your evidence",
    title: "Which result would feel most satisfying to produce?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["reactions"] },
    options: [
      {
        id: "map",
        label: "An energy map of the complete pathway",
        nicheBoosts: { "reaction-mechanisms": 5 },
      },
      {
        id: "bottleneck",
        label: "A picture of the key transition state",
        nicheBoosts: { "computational-catalysis": 4, "reaction-mechanisms": 3 },
      },
      {
        id: "compare",
        label: "A comparison of competing pathways",
        nicheBoosts: { "selectivity-pathways": 5 },
      },
      {
        id: "rule",
        label: "A design rule for a better catalyst",
        nicheBoosts: {
          "computational-catalysis": 5,
          "selectivity-pathways": 2,
        },
      },
      uncertain,
    ],
  },
  {
    id: "light-focus",
    stage: "narrowing",
    kicker: "Inside light–molecule interactions",
    title: "What happens after light meets a molecule?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["light"] },
    options: [
      {
        id: "signature",
        label: "It leaves a spectral fingerprint",
        nicheBoosts: { "computational-spectroscopy": 6 },
      },
      {
        id: "react",
        label: "It enters a new state and reacts",
        nicheBoosts: { "excited-states": 6 },
      },
      {
        id: "charge",
        label: "It moves charge across the molecule",
        nicheBoosts: { "charge-transfer": 6 },
      },
      {
        id: "device",
        label: "It changes how a material performs",
        nicheBoosts: { "organic-electronics": 5, "excited-states": 2 },
      },
      uncertain,
    ],
  },
  {
    id: "light-evidence",
    stage: "narrowing",
    kicker: "Choose an observation",
    title: "Which output would you be most excited to interpret?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["light"] },
    options: [
      {
        id: "peaks",
        label: "A pattern of peaks in a spectrum",
        nicheBoosts: { "computational-spectroscopy": 5 },
      },
      {
        id: "orbitals",
        label: "An animation of changing electron density",
        nicheBoosts: { "excited-states": 4, "charge-transfer": 3 },
      },
      {
        id: "lifetimes",
        label: "A map of possible relaxation routes",
        nicheBoosts: { "excited-states": 5 },
      },
      {
        id: "trend",
        label: "A color or efficiency trend across molecules",
        nicheBoosts: {
          "organic-electronics": 4,
          "computational-spectroscopy": 2,
        },
      },
      uncertain,
    ],
  },
  {
    id: "fundamentals-focus",
    stage: "narrowing",
    kicker: "Inside molecular fundamentals",
    title: "Which foundation would you most like to understand better?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["fundamentals"] },
    options: [
      {
        id: "bonding",
        label: "Where bonding pictures come from",
        nicheBoosts: { "fundamental-electronic-structure": 6 },
      },
      {
        id: "approximation",
        label: "How a useful approximation is built",
        nicheBoosts: { "computational-approximations": 6 },
      },
      {
        id: "accuracy",
        label: "Why methods disagree on the same molecule",
        nicheBoosts: { "method-benchmarking": 6 },
      },
      {
        id: "shape",
        label: "Why one molecular shape is most stable",
        nicheBoosts: {
          "conformations-stability": 5,
          "fundamental-electronic-structure": 2,
        },
      },
      uncertain,
    ],
  },
  {
    id: "fundamentals-work",
    stage: "narrowing",
    kicker: "Choose a theory task",
    title: "What kind of theoretical work sounds appealing?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["fundamentals"] },
    options: [
      {
        id: "picture",
        label: "Building a clearer picture of electrons and bonds",
        nicheBoosts: { "fundamental-electronic-structure": 5 },
      },
      {
        id: "test",
        label: "Testing methods against reliable reference data",
        nicheBoosts: { "method-benchmarking": 5 },
      },
      {
        id: "improve",
        label: "Understanding how an approximation could improve",
        nicheBoosts: { "computational-approximations": 5 },
      },
      {
        id: "edge",
        label: "Finding cases where simple models break down",
        nicheBoosts: {
          "computational-approximations": 4,
          "fundamental-electronic-structure": 3,
        },
      },
      uncertain,
    ],
  },
  {
    id: "computing-focus",
    stage: "narrowing",
    kicker: "Inside molecular computing",
    title: "Which computing role would you most like to try?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["computing"] },
    options: [
      {
        id: "learn",
        label: "Train a model to predict molecular properties",
        nicheBoosts: { "ml-property-prediction": 6 },
      },
      {
        id: "benchmark",
        label: "Compare quantum-chemistry methods fairly",
        nicheBoosts: { "method-benchmarking": 6 },
      },
      {
        id: "approximation",
        label: "Study a faster or smarter approximation",
        nicheBoosts: { "computational-approximations": 6 },
      },
      {
        id: "workflow",
        label: "Build a repeatable computational workflow",
        nicheBoosts: { "ml-property-prediction": 3, "method-benchmarking": 3 },
      },
      uncertain,
    ],
  },
  {
    id: "computing-priority",
    stage: "narrowing",
    kicker: "Choose a priority",
    title: "What should a good computational result do best?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["computing"] },
    options: [
      {
        id: "predict",
        label: "Predict new cases quickly",
        nicheBoosts: { "ml-property-prediction": 5 },
      },
      {
        id: "explain",
        label: "Reveal why a model succeeds or fails",
        nicheBoosts: {
          "computational-approximations": 4,
          "method-benchmarking": 2,
        },
      },
      {
        id: "trust",
        label: "Measure uncertainty and reliability",
        nicheBoosts: { "method-benchmarking": 5, "ml-property-prediction": 2 },
      },
      {
        id: "efficient",
        label: "Trade a little accuracy for much lower cost",
        nicheBoosts: { "computational-approximations": 5 },
      },
      uncertain,
    ],
  },
  {
    id: "space-focus",
    stage: "narrowing",
    kicker: "Inside chemistry beyond Earth",
    title: "Which distant chemistry scene would you visit first?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["space"] },
    options: [
      {
        id: "cloud",
        label: "Molecules forming in an interstellar cloud",
        nicheBoosts: { "astrochemical-systems": 6 },
      },
      {
        id: "atmosphere",
        label: "Unusual chemistry in a planet’s atmosphere",
        nicheBoosts: {
          "astrochemical-systems": 4,
          "environmental-chemistry": 3,
        },
      },
      {
        id: "ice",
        label: "Reactions on a cold grain of ice",
        nicheBoosts: { "astrochemical-systems": 5, "reaction-mechanisms": 2 },
      },
      {
        id: "signal",
        label: "A spectral signal from a distant molecule",
        nicheBoosts: {
          "computational-spectroscopy": 4,
          "astrochemical-systems": 4,
        },
      },
      uncertain,
    ],
  },
  {
    id: "space-question",
    stage: "narrowing",
    kicker: "Choose a mystery",
    title: "Which mystery would keep you reading?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["space"] },
    options: [
      {
        id: "exist",
        label: "Could this molecule exist under extreme conditions?",
        nicheBoosts: {
          "astrochemical-systems": 5,
          "conformations-stability": 2,
        },
      },
      {
        id: "form",
        label: "What reaction pathway could form it?",
        nicheBoosts: { "astrochemical-systems": 4, "reaction-mechanisms": 3 },
      },
      {
        id: "detect",
        label: "What would its spectrum look like?",
        nicheBoosts: {
          "computational-spectroscopy": 5,
          "astrochemical-systems": 2,
        },
      },
      {
        id: "light",
        label: "How would radiation change it?",
        nicheBoosts: { "excited-states": 4, "astrochemical-systems": 3 },
      },
      uncertain,
    ],
  },
  {
    id: "balanced-focus",
    stage: "narrowing",
    kicker: "Sample the landscape",
    title: "Which kind of scientific object would you enjoy exploring first?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["balanced"] },
    options: [
      {
        id: "interaction",
        label: "Two molecules meeting",
        nicheBoosts: { "noncovalent-interactions": 5, "solvation-effects": 2 },
      },
      {
        id: "reaction",
        label: "A molecule changing bonds",
        nicheBoosts: { "reaction-mechanisms": 5 },
      },
      {
        id: "light",
        label: "A molecule interacting with light",
        nicheBoosts: { "excited-states": 4, "computational-spectroscopy": 3 },
      },
      {
        id: "dataset",
        label: "A pattern across many molecules",
        nicheBoosts: { "method-benchmarking": 3, "ml-property-prediction": 4 },
      },
      uncertain,
    ],
  },
  {
    id: "balanced-lens",
    stage: "narrowing",
    kicker: "Choose a lens",
    title: "Which sentence sounds most like your kind of curiosity?",
    type: "single",
    visibleWhen: { questionId: "motivation", anyOf: ["balanced"] },
    options: [
      {
        id: "why",
        label: "I want a deep explanation of why",
        nicheBoosts: {
          "fundamental-electronic-structure": 4,
          "computational-approximations": 2,
        },
      },
      {
        id: "use",
        label: "I want a connection to a real application",
        nicheBoosts: { "energy-chemistry": 3, "environmental-chemistry": 3 },
      },
      {
        id: "compare",
        label: "I want to compare options and spot a pattern",
        nicheBoosts: { "method-benchmarking": 4, "selectivity-pathways": 2 },
      },
      {
        id: "surprise",
        label: "I want the path most likely to surprise me",
        signals: { "interest:open": 2 },
      },
      uncertain,
    ],
  },

  {
    id: "question-kind",
    stage: "question",
    kicker: "The question on your whiteboard",
    title: "Which opening phrase sounds most inviting?",
    type: "single",
    options: [
      {
        id: "explain",
        label: "“Why does this happen?”",
        signals: { "mode:explain": 3 },
      },
      {
        id: "predict",
        label: "“Can we predict what it will do?”",
        signals: { "mode:predict": 3 },
      },
      {
        id: "compare",
        label: "“How do these molecules or methods differ?”",
        signals: { "mode:compare": 3 },
      },
      {
        id: "design",
        label: "“How could we improve or design it?”",
        signals: { "mode:design": 3 },
      },
      {
        id: "spectrum",
        label: "“What does this spectrum tell us?”",
        signals: { "mode:spectra": 3 },
      },
      {
        id: "pathway",
        label: "“Which path does this reaction take?”",
        signals: { "mode:pathway": 3 },
      },
      {
        id: "data",
        label: "“What can we learn from many examples?”",
        signals: { "mode:data": 3 },
      },
      {
        id: "theory",
        label: "“What are the deeper rules?”",
        signals: { "mode:theory": 3 },
      },
      uncertain,
    ],
  },
  {
    id: "purpose-balance",
    stage: "style",
    kicker: "Research compass",
    title: "Where would you place yourself today?",
    prompt: "Both ends are valuable; many real projects live between them.",
    type: "single",
    options: [
      {
        id: "fundamental",
        label: "Mostly fundamental",
        description: "Understanding the underlying rules is the main reward.",
        signals: { "purpose:fundamental": 2 },
      },
      {
        id: "middle",
        label: "A bridge between both",
        description: "I like insight that can connect to a use.",
        signals: { "purpose:mixed": 2 },
      },
      {
        id: "applied",
        label: "Mostly applied",
        description: "A useful material, process, or prediction motivates me.",
        signals: { "purpose:applied": 2 },
      },
      uncertain,
    ],
  },
  {
    id: "system-scale",
    stage: "style",
    kicker: "Scale of attention",
    title: "What would you rather have at the center of your screen?",
    type: "single",
    options: [
      {
        id: "molecule",
        label: "One molecule or a small pair",
        signals: { "scale:molecule": 2 },
      },
      {
        id: "material",
        label: "A material or many-molecule system",
        signals: { "scale:material": 2 },
      },
      {
        id: "both",
        label: "The link between molecule and material",
        signals: { "scale:molecule": 1, "scale:material": 1 },
      },
      uncertain,
    ],
  },
  {
    id: "change-style",
    stage: "style",
    kicker: "Still frame or story",
    title: "Which scientific view sounds better?",
    type: "single",
    options: [
      {
        id: "static",
        label: "A detailed still frame",
        description: "Structure, stability, or an interaction at one point.",
        signals: { "state:static": 2 },
      },
      {
        id: "changing",
        label: "A molecular story unfolding",
        description: "A reaction, transfer, or changing state.",
        signals: { "state:changing": 2 },
      },
      {
        id: "both",
        label: "Still frames connected into a story",
        signals: { "state:static": 1, "state:changing": 1 },
      },
      uncertain,
    ],
  },
  {
    id: "electronic-state",
    stage: "style",
    kicker: "Energy state",
    title: "Would you rather study molecules at rest or after an energy boost?",
    definition: {
      term: "Excited state",
      text: "A temporary higher-energy arrangement of electrons, often created when a molecule absorbs light.",
    },
    type: "single",
    options: [
      {
        id: "ground",
        label: "Mostly at rest (ground state)",
        signals: { "state:ground": 2 },
      },
      {
        id: "excited",
        label: "After absorbing energy (excited state)",
        signals: { "state:excited": 3 },
      },
      {
        id: "connection",
        label: "The connection between them",
        signals: { "state:ground": 1, "state:excited": 1 },
      },
      uncertain,
    ],
  },
  {
    id: "interpret-predict",
    stage: "style",
    kicker: "What counts as a satisfying result?",
    title: "Which outcome would you rather bring to a group discussion?",
    type: "single",
    options: [
      {
        id: "interpret",
        label: "A convincing explanation",
        description: "A model that makes an observation understandable.",
        signals: { "goal:interpret": 2 },
      },
      {
        id: "predict",
        label: "A useful prediction",
        description: "A number or trend that works for a new case.",
        signals: { "goal:predict": 2 },
      },
      {
        id: "both",
        label: "A prediction we can explain",
        signals: { "goal:interpret": 1, "goal:predict": 1 },
      },
      uncertain,
    ],
  },
  {
    id: "evidence-style",
    stage: "style",
    kicker: "Your ideal workspace",
    title: "Which kind of evidence would you most enjoy working with?",
    prompt: "Choose up to two.",
    type: "multi",
    maxSelections: 2,
    options: [
      {
        id: "visuals",
        label: "Molecular pictures & visual models",
        signals: { "medium:visual": 2 },
      },
      {
        id: "equations",
        label: "Equations & quantitative trends",
        signals: { "medium:equations": 2 },
      },
      {
        id: "datasets",
        label: "Datasets & plots",
        signals: { "medium:data": 2 },
      },
      {
        id: "mechanisms",
        label: "Mechanisms & energy diagrams",
        signals: { "medium:mechanism": 2 },
      },
      {
        id: "comparisons",
        label: "Side-by-side comparisons",
        signals: { "medium:comparison": 2 },
      },
      { id: "not-sure", label: "I’d like to try several", uncertainty: true },
    ],
  },
  {
    id: "work-balance",
    stage: "style",
    kicker: "Day-to-day flavor",
    title: "What balance would you prefer for a first research exploration?",
    type: "single",
    options: [
      {
        id: "chemistry",
        label: "Chemistry-heavy",
        description:
          "Use established tools to focus on molecules and interpretation.",
        signals: { "style:chemistry": 3 },
      },
      {
        id: "mixed",
        label: "A real mix",
        description:
          "Some scripting, some calculations, and plenty of chemistry.",
        signals: { "style:mixed-computing": 3 },
      },
      {
        id: "coding",
        label: "Coding-heavy",
        description:
          "Data, automation, or methods are a central part of the question.",
        signals: { "style:coding": 3 },
      },
      uncertain,
    ],
  },
];

export const questionById = Object.fromEntries(
  questions.map((question) => [question.id, question]),
);
