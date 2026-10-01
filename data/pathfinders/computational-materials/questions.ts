import type { SurveyQuestion } from "@/lib/types";

const unsureOption = {
  id: "unsure",
  label: "I’m not sure yet",
  description:
    "Keep the possibilities open; this will only shape the context and preparation guidance you receive.",
  uncertainty: true,
} as const;

export const computationalMaterialsQuestions: SurveyQuestion[] = [
  {
    id: "materials-starting-point",
    stage: "calibration",
    kicker: "Start where you are",
    title: "How familiar does computational materials science feel right now?",
    prompt:
      "This changes the amount of background in your results—not which directions you are allowed to explore.",
    type: "single",
    options: [
      {
        id: "new",
        label: "Mostly new to me",
        description:
          "I’m interested, but I would want a clear map of the basic ideas and vocabulary.",
      },
      {
        id: "recognize",
        label: "I recognize parts of the landscape",
        description:
          "Some materials concepts sound familiar, even if I could not explain all of them yet.",
      },
      {
        id: "comfortable",
        label: "I could explain several core ideas",
        description:
          "I feel ready to build from concepts such as structure, stability, and material properties.",
      },
      unsureOption,
    ],
  },
  {
    id: "materials-concept-familiarity",
    stage: "calibration",
    kicker: "Concept check-in",
    title: "Which ideas feel familiar enough to use in a conversation?",
    prompt:
      "Choose up to five. Recognition is enough—this is a preparation check, not a quiz.",
    type: "multi",
    maxSelections: 5,
    definition: {
      term: "Crystal structure",
      text: "The organized arrangement of atoms in a crystalline material. A unit cell is a small repeating description of that arrangement.",
    },
    options: [
      {
        id: "atomic-structure",
        label: "How atoms are arranged in a material",
      },
      {
        id: "bonding",
        label: "How bonding helps shape material properties",
      },
      {
        id: "crystals",
        label: "Crystal lattices and unit cells",
      },
      {
        id: "phases",
        label: "Phases, energy, and material stability",
      },
      {
        id: "properties",
        label: "Links between structure and properties",
      },
      {
        id: "unsure",
        label: "I’ve heard of these but couldn’t explain them",
        uncertainty: true,
      },
    ],
  },
  {
    id: "materials-math-comfort",
    stage: "calibration",
    kicker: "Working language",
    title: "How do you feel when a materials explanation uses equations?",
    prompt:
      "Your answer changes the preparation advice and explanation style—not the directions you can explore.",
    type: "single",
    options: [
      {
        id: "comfortable",
        label: "Comfortable",
        description:
          "Equations and quantitative relationships often help me understand a material property.",
      },
      {
        id: "with-guidance",
        label: "Good with some guidance",
        description:
          "I can follow the math when the variables, units, and physical meaning are introduced clearly.",
      },
      {
        id: "concept-first",
        label: "Show me the physical picture first",
        description:
          "I learn best from structures, diagrams, or trends before symbols.",
      },
      unsureOption,
    ],
  },
  {
    id: "materials-coding-comfort",
    stage: "calibration",
    kicker: "Coding check-in",
    title: "What is your current relationship with coding?",
    prompt:
      "Coding experience is useful preparation information, not a gate to computational materials research.",
    type: "single",
    options: [
      {
        id: "enjoy",
        label: "I enjoy writing or adapting code",
        description:
          "I would be happy working with scripts, notebooks, or data-processing tools.",
      },
      {
        id: "learning",
        label: "I’m learning",
        description:
          "I can work through examples and would like more practice.",
      },
      {
        id: "new",
        label: "Mostly new to me",
        description:
          "I would want a guided notebook or worked example as a starting point.",
      },
      {
        id: "tools-first",
        label: "I’d rather begin with established tools",
        description:
          "I’m open to coding, but I want the materials question to remain central.",
      },
      unsureOption,
    ],
  },
  {
    id: "materials-tools-comfort",
    stage: "calibration",
    kicker: "Simulation check-in",
    title: "How much experience do you have with computational science tools?",
    prompt:
      "A tool could be a prepared notebook, structure viewer, simulation program, or scientific-data platform.",
    type: "single",
    options: [
      {
        id: "independent",
        label: "I’ve set up or modified a calculation myself",
        description:
          "I have made choices about inputs, settings, or analysis and examined the output.",
      },
      {
        id: "guided",
        label: "I’ve followed a guided computational activity",
        description:
          "I can navigate a worked workflow even if I still need support.",
      },
      {
        id: "observed",
        label: "I’ve seen these tools used",
        description:
          "I recognize parts of a computational workflow but have not run much myself.",
      },
      {
        id: "new",
        label: "These tools are new to me",
        description:
          "I would want an explanation of the inputs, outputs, and scientific choices.",
      },
      unsureOption,
    ],
  },
  {
    id: "materials-explanation-style",
    stage: "calibration",
    kicker: "How ideas click",
    title: "Which explanation would you reach for first?",
    type: "single",
    options: [
      {
        id: "visual",
        label: "A structure or visual model",
        description:
          "Show me how atoms, layers, defects, or phases are arranged.",
      },
      {
        id: "quantitative",
        label: "A quantitative pattern",
        description:
          "Show me a property, units, trend, or equation across materials.",
      },
      {
        id: "comparison",
        label: "A side-by-side comparison",
        description:
          "Help me understand why two materials or methods behave differently.",
      },
      {
        id: "mixed",
        label: "A mix of pictures and numbers",
        description:
          "Build intuition, then connect the structure to the quantitative result.",
      },
      unsureOption,
    ],
  },
  {
    id: "materials-motivation",
    stage: "motivation",
    kicker: "Follow your attention",
    title: "Which materials challenge makes you most curious today?",
    prompt:
      "Choose the doorway you would like to explore first. You are not committing to a career, project, or final research question.",
    type: "single",
    options: [
      {
        id: "energy-storage",
        label: "Store energy more effectively",
        description:
          "Why battery electrodes, solid electrolytes, or ion-storage materials gain, lose, or retain performance.",
        signals: {
          "interest:energy-storage": 3,
          "application:energy": 2,
        },
      },
      {
        id: "energy-conversion",
        label: "Convert energy into a useful form",
        description:
          "Materials for solar energy, hydrogen, waste heat, or other energy-conversion technologies.",
        signals: {
          "interest:energy-conversion": 3,
          "application:energy": 2,
        },
      },
      {
        id: "electronics",
        label: "Build better electronic or computing materials",
        description:
          "How semiconductors, magnetic materials, or low-dimensional systems carry and control information.",
        signals: {
          "interest:electronics": 3,
          "phenomenon:electrons": 2,
        },
      },
      {
        id: "light-sensing",
        label: "Control light or detect the world",
        description:
          "Materials that absorb, emit, guide, or respond to light in displays, sensors, and photonic devices.",
        signals: {
          "interest:light": 3,
          "phenomenon:optical": 2,
        },
      },
      {
        id: "climate-environment",
        label: "Address a climate or environmental problem",
        description:
          "Materials for gas capture, separations, cleaner water, lower-energy processes, or environmental resilience.",
        signals: {
          "interest:environment": 3,
          "application:sustainability": 2,
        },
      },
      {
        id: "catalysis",
        label: "Make chemical transformations more efficient",
        description:
          "How surfaces and active sites help reactions proceed, and why one catalyst performs differently from another.",
        signals: {
          "interest:catalysis": 3,
          "scale:surface": 2,
        },
      },
      {
        id: "structural",
        label: "Make materials stronger, safer, or longer-lasting",
        description:
          "How alloys, ceramics, defects, interfaces, or corrosion influence performance under real conditions.",
        signals: {
          "interest:structural": 3,
          "phenomenon:mechanical": 2,
        },
      },
      {
        id: "soft-health",
        label: "Explore soft materials or materials for health",
        description:
          "Polymers, flexible materials, interfaces with biology, and structures that respond to their surroundings.",
        signals: {
          "interest:soft-materials": 3,
          "application:health": 2,
        },
      },
      {
        id: "fundamentals",
        label: "Understand surprising material behavior",
        description:
          "Why phases form, defects matter, atoms move, or quantum behavior produces unusual properties.",
        signals: {
          "interest:fundamentals": 3,
          "purpose:fundamental": 2,
        },
      },
      {
        id: "data-discovery",
        label: "Discover materials with data and computation",
        description:
          "Use high-throughput calculations, databases, or machine learning to search a large design space.",
        signals: {
          "interest:data-discovery": 3,
          "style:data": 2,
        },
      },
      {
        id: "open",
        label: "Show me several possibilities",
        description:
          "I want to compare a varied set of materials questions before choosing what to read about first.",
        signals: { "interest:open": 3 },
      },
    ],
  },
  {
    id: "materials-question-kind",
    stage: "question",
    kicker: "Choose the question shape",
    title:
      "What kind of materials question would you most like to investigate?",
    prompt:
      "Pick the research move that sounds most satisfying right now. You can still explore directions that use several of these moves together.",
    type: "single",
    options: [
      {
        id: "explain",
        label: "Explain why a material behaves that way",
        description:
          "Connect atomic structure, bonding, or defects to a property that researchers observe.",
        signals: { "mode:explain": 3 },
      },
      {
        id: "predict",
        label: "Predict a property or behavior",
        description:
          "Estimate how a material will conduct, absorb light, store ions, or remain stable before it is tested.",
        signals: { "mode:predict": 3 },
      },
      {
        id: "compare",
        label: "Compare materials or computational methods",
        description:
          "Work out why alternatives give different results and which comparison is most informative.",
        signals: { "mode:compare": 3 },
      },
      {
        id: "design",
        label: "Design a material with a useful property",
        description:
          "Use patterns in structure and composition to propose a promising material or modification.",
        signals: { "mode:design": 3 },
      },
      {
        id: "interpret",
        label: "Interpret an experimental observation",
        description:
          "Use calculations to explain a spectrum, image, trend, or measurement that is difficult to read on its own.",
        signals: {
          "mode:interpret": 3,
          "connection:experiment": 2,
        },
      },
      {
        id: "optimize",
        label: "Optimize performance under constraints",
        description:
          "Balance competing goals such as activity, stability, cost, safety, or manufacturability.",
        signals: { "mode:optimize": 3 },
      },
      {
        id: "dynamics",
        label: "Model how a material changes",
        description:
          "Follow atoms, charges, phases, or defects as they move or transform over time.",
        signals: { "mode:dynamics": 3 },
      },
      {
        id: "data-discovery",
        label: "Discover patterns in a large dataset",
        description:
          "Use databases, screening, or machine learning to identify trends and promising candidates.",
        signals: {
          "mode:data-discovery": 3,
          "style:data": 2,
        },
      },
      {
        id: "theory",
        label: "Test a fundamental model or theory",
        description:
          "Examine the assumptions behind a computational description of matter and where it succeeds or fails.",
        signals: {
          "mode:theory": 3,
          "purpose:fundamental": 2,
        },
      },
      {
        id: "unsure",
        label: "I’d like to sample a few question types",
        description:
          "Keep several research approaches open until the examples make the differences clearer.",
        uncertainty: true,
      },
    ],
  },
  {
    id: "materials-family",
    stage: "style",
    kicker: "Choose a material world",
    title: "Which family of materials would you most like to look at first?",
    prompt:
      "A material family describes a broad kind of structure. Choosing one helps narrow the examples without locking you into it.",
    type: "single",
    options: [
      {
        id: "crystalline",
        label: "Crystals and ordered solids",
        description:
          "Materials with repeating atomic arrangements, such as semiconductors, salts, ceramics, and many metals.",
        signals: { "family:crystalline": 3 },
      },
      {
        id: "amorphous",
        label: "Glasses and disordered solids",
        description:
          "Materials without long-range crystalline order, where local structure and disorder shape behavior.",
        signals: { "family:amorphous": 3 },
      },
      {
        id: "layered",
        label: "Layered and two-dimensional materials",
        description:
          "Thin sheets and stacked structures whose surfaces, edges, and layer interactions create unusual properties.",
        signals: { "family:layered": 3 },
      },
      {
        id: "porous",
        label: "Porous frameworks and surfaces",
        description:
          "Materials with cavities or accessible surfaces that can capture molecules, separate mixtures, or host reactions.",
        signals: { "family:porous": 3 },
      },
      {
        id: "soft",
        label: "Polymers and soft materials",
        description:
          "Flexible, responsive, or self-organizing materials whose shape and surroundings strongly affect their behavior.",
        signals: { "family:soft": 3 },
      },
      {
        id: "composite",
        label: "Composites and interfaces",
        description:
          "Combined materials where boundaries between components can control strength, transport, or electronic behavior.",
        signals: { "family:composite": 3 },
      },
      {
        id: "unsure",
        label: "I’m open to several material families",
        description:
          "Keep examples from different structures in view and let the scientific question guide the next choice.",
        uncertainty: true,
      },
    ],
  },
  {
    id: "materials-phenomena",
    stage: "style",
    kicker: "Follow the behavior",
    title: "Which material behaviors would you most like to understand?",
    prompt:
      "Choose up to two. Many materials problems connect several of these, so a pair can be especially useful.",
    type: "multi",
    maxSelections: 2,
    options: [
      {
        id: "electrons",
        label: "Electrons and electrical behavior",
        description:
          "How charge moves, becomes localized, or produces conducting, insulating, and electronic properties.",
        signals: { "phenomenon:electrons": 3 },
      },
      {
        id: "ions",
        label: "Ions and mass transport",
        description:
          "How charged atoms or molecules move through a solid, liquid, interface, or porous structure.",
        signals: { "phenomenon:ions": 3 },
      },
      {
        id: "thermal",
        label: "Heat and thermal behavior",
        description:
          "How a material stores, conducts, releases, or converts thermal energy across different conditions.",
        signals: { "phenomenon:thermal": 3 },
      },
      {
        id: "optical",
        label: "Light and optical response",
        description:
          "How materials absorb, emit, transmit, or manipulate light through their electronic and structural features.",
        signals: { "phenomenon:optical": 3 },
      },
      {
        id: "magnetic",
        label: "Magnetism and spin",
        description:
          "How magnetic moments and electron spin organize, interact, and respond to external conditions.",
        signals: { "phenomenon:magnetic": 3 },
      },
      {
        id: "mechanical",
        label: "Strength and mechanical response",
        description:
          "How materials deform, fracture, recover, or withstand forces because of their structure and defects.",
        signals: { "phenomenon:mechanical": 3 },
      },
      {
        id: "surfaces",
        label: "Surfaces and interfaces",
        description:
          "How boundaries between materials or their surroundings change stability, transport, and reactivity.",
        signals: { "phenomenon:surfaces": 3 },
      },
      {
        id: "chemical-change",
        label: "Chemical change inside or on a material",
        description:
          "How bonds break and form during catalysis, corrosion, degradation, charging, or phase transformation.",
        signals: { "phenomenon:chemical-change": 3 },
      },
      {
        id: "unsure",
        label: "I’m not sure which behavior yet",
        description:
          "Leave the phenomenon open and use later examples to see which kind of change holds your attention.",
        uncertainty: true,
      },
    ],
  },
  {
    id: "materials-purpose-balance",
    stage: "style",
    kicker: "Set the purpose",
    title: "How would you like the research to connect to practical use?",
    prompt:
      "Fundamental and applied work support each other. This choice only describes where you would like to begin.",
    type: "single",
    options: [
      {
        id: "fundamental",
        label: "Start with a fundamental puzzle",
        description:
          "Understand the physical principles behind a material behavior, even when an application is not immediate.",
        signals: { "purpose:fundamental": 3 },
      },
      {
        id: "applied",
        label: "Start with a practical challenge",
        description:
          "Investigate a material because it could improve a technology, process, device, or environmental outcome.",
        signals: { "purpose:applied": 3 },
      },
      {
        id: "bridge",
        label: "Connect mechanism to application",
        description:
          "Use fundamental understanding to explain or improve performance in a recognizable real-world setting.",
        signals: {
          "purpose:fundamental": 2,
          "purpose:applied": 2,
        },
      },
      unsureOption,
    ],
  },
  {
    id: "materials-scale",
    stage: "style",
    kicker: "Choose the scale",
    title: "At what scale would you most enjoy building an explanation?",
    prompt:
      "Researchers often connect these scales, but choosing a starting lens helps distinguish nearby directions.",
    type: "single",
    options: [
      {
        id: "atomic",
        label: "Atoms, electrons, and individual defects",
        description:
          "Focus closely on bonding, charge, local arrangements, or one structural imperfection at a time.",
        signals: { "scale:atomic": 3 },
      },
      {
        id: "microstructure",
        label: "Grains, phases, pores, and microstructure",
        description:
          "Study how many local features combine into patterns that shape a material’s larger-scale behavior.",
        signals: { "scale:microstructure": 3 },
      },
      {
        id: "device",
        label: "Interfaces, devices, and operating conditions",
        description:
          "Connect material behavior to electrodes, junctions, components, or realistic environments.",
        signals: { "scale:device": 3 },
      },
      {
        id: "multiscale",
        label: "Connect several scales",
        description:
          "Trace how atomic-level choices influence microstructure and eventually affect a usable system.",
        signals: { "scale:multiscale": 3 },
      },
      unsureOption,
    ],
  },
  {
    id: "materials-change-style",
    stage: "style",
    kicker: "Still picture or process",
    title: "Would you rather study a material’s state or how it changes?",
    prompt:
      "A stable structure can still contain motion, and a changing process often begins with a static description.",
    type: "single",
    options: [
      {
        id: "static",
        label: "A structure or stable state",
        description:
          "Compare energies, arrangements, electronic states, or properties under a defined set of conditions.",
        signals: { "change:static": 3 },
      },
      {
        id: "dynamic",
        label: "Motion, transformation, or response over time",
        description:
          "Follow diffusion, reactions, phase changes, deformation, or responses to an external stimulus.",
        signals: { "change:dynamic": 3 },
      },
      {
        id: "both",
        label: "Connect stable states to the path between them",
        description:
          "Understand both the structures a system favors and the route it takes as conditions change.",
        signals: {
          "change:static": 2,
          "change:dynamic": 2,
        },
      },
      unsureOption,
    ],
  },
  {
    id: "materials-experiment-connection",
    stage: "style",
    kicker: "Connect calculation and evidence",
    title: "How would you like computation to relate to experiments?",
    prompt:
      "Computational projects can explain existing evidence, make testable predictions, or examine ideas that are difficult to isolate experimentally.",
    type: "single",
    options: [
      {
        id: "interpret",
        label: "Explain a measurement",
        description:
          "Use simulations or calculated properties to help interpret spectra, images, curves, or observed trends.",
        signals: {
          "connection:interpret": 3,
          "connection:experiment": 2,
        },
      },
      {
        id: "predict",
        label: "Make a prediction an experiment could test",
        description:
          "Estimate a property, candidate, or condition before the corresponding measurement is available.",
        signals: {
          "connection:predict": 3,
          "connection:experiment": 1,
        },
      },
      {
        id: "feedback-loop",
        label: "Move back and forth between both",
        description:
          "Let experiments refine a model, then use the improved model to suggest the next experiment.",
        signals: {
          "connection:feedback-loop": 3,
          "connection:experiment": 2,
        },
      },
      {
        id: "theory",
        label: "Probe a model or inaccessible condition",
        description:
          "Use computation to isolate a principle or explore a system that is difficult to create or measure directly.",
        signals: {
          "connection:theory": 3,
          "purpose:fundamental": 1,
        },
      },
      unsureOption,
    ],
  },
];
