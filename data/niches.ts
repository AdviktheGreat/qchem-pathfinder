import type { Niche } from "@/lib/types";

const starterPaperTypes = [
  "A recent review or perspective for the field map",
  "A methods or tutorial paper for vocabulary and workflow",
  "One recent application paper to see the method in action",
];

const defaults = {
  paperTypes: starterPaperTypes,
  explorationFriendly: false,
};

export const niches: Niche[] = [
  {
    ...defaults,
    id: "reaction-mechanisms",
    area: "Reactivity",
    name: "Reaction mechanisms & transition states",
    shortDescription:
      "Map the hidden sequence of bond changes that turns reactants into products.",
    explanation:
      "A reaction equation shows the start and finish. Mechanism research asks what happens between them: which bonds shift first, which short-lived structures appear, and which high-energy bottleneck controls the route. A transition state is the fleeting highest-energy arrangement along one elementary step—not a molecule you can bottle, but a structure computations can help locate.",
    questions: [
      "Which sequence of elementary steps is most plausible?",
      "What is the rate-limiting energy barrier?",
      "How does changing a substituent reshape the pathway?",
    ],
    systems: [
      "Organic rearrangements",
      "Small-molecule reactions",
      "Thermal decomposition",
      "Pericyclic reactions",
    ],
    approaches: [
      {
        name: "DFT pathway calculations",
        explanation:
          "Density functional theory (DFT) estimates electronic energies at practical cost so structures and barriers can be compared.",
      },
      {
        name: "Transition-state search",
        explanation:
          "An optimization that looks for the saddle point connecting two stable structures.",
      },
      {
        name: "Intrinsic reaction coordinate",
        explanation:
          "A calculation that checks which reactant and product a proposed transition state actually connects.",
      },
    ],
    concepts: [
      "Potential-energy surfaces",
      "Bonding and molecular orbitals",
      "Thermodynamics versus kinetics",
      "Geometry optimization",
    ],
    preparation:
      "A friendly starting project can focus a small reaction with a few proposed steps. Coding helps with organizing calculations, but chemical reasoning is the center of the work.",
    keywords: [
      "reaction mechanism",
      "transition state",
      "activation barrier",
      "potential energy surface",
      "DFT",
      "reaction coordinate",
      "elementary step",
    ],
    synonyms: [
      "mechanistic computational chemistry",
      "energy profile",
      "saddle-point calculation",
    ],
    searches: {
      orientation:
        "computational reaction mechanisms transition states beginner overview",
      focused:
        "DFT reaction pathway activation barriers small molecule mechanism",
      review:
        "recent review computational reaction mechanism transition state methods",
    },
    affinities: {
      "interest:reactions": 3,
      "mode:pathway": 3,
      "mode:explain": 2,
      "state:changing": 3,
      "goal:interpret": 2,
      "medium:visual": 1,
      "style:chemistry": 2,
      "scale:molecule": 1,
    },
    reasons: [
      {
        signal: "interest:reactions",
        category: "interest",
        text: "You were drawn to what happens between reactants and products.",
      },
      {
        signal: "mode:pathway",
        category: "interest",
        text: "You chose questions about which route a reaction takes.",
      },
      {
        signal: "state:changing",
        category: "style",
        text: "You prefer a molecular story unfolding over a single still structure.",
      },
      {
        signal: "style:chemistry",
        category: "style",
        text: "This direction keeps chemical reasoning central while using computation as a lens.",
      },
    ],
    comparisonLens:
      "It emphasizes reconstructing a full reaction route more than optimizing a catalyst or explaining product selectivity.",
  },
  {
    ...defaults,
    id: "computational-catalysis",
    area: "Reactivity",
    name: "Computational catalysis",
    shortDescription:
      "Explain how a catalyst changes a reaction pathway and how it might be improved.",
    explanation:
      "Catalysts create lower-energy routes without being consumed overall. Computational catalysis examines how a catalyst binds reactants, reshapes transition states, and releases products. The goal is often both explanatory and practical: understand the catalytic cycle, then learn which molecular changes could improve activity or selectivity.",
    questions: [
      "Which step controls the catalytic cycle?",
      "Why does one catalyst lower the barrier more effectively?",
      "What structural change could improve activity or selectivity?",
    ],
    systems: [
      "Metal complexes",
      "Organocatalysts",
      "Enzyme-inspired catalysts",
      "Small catalyst models",
    ],
    approaches: [
      {
        name: "DFT energy profiles",
        explanation:
          "Calculations compare intermediates and transition states across a catalytic cycle.",
      },
      {
        name: "Activation-strain or energy decomposition",
        explanation:
          "Analysis separates geometric distortion from stabilizing interactions.",
      },
      {
        name: "Descriptor comparison",
        explanation:
          "A small set of computed properties is related to catalytic performance.",
      },
    ],
    concepts: [
      "Transition states",
      "Coordination and bonding",
      "Kinetics",
      "Potential-energy surfaces",
    ],
    preparation:
      "Begin with a reduced catalyst model and one key step rather than an entire industrial cycle. Comfort reading mechanisms matters more initially than advanced coding.",
    keywords: [
      "computational catalysis",
      "catalytic cycle",
      "DFT catalyst",
      "activation barrier",
      "transition state",
      "reaction mechanism",
      "catalyst design",
    ],
    synonyms: [
      "in silico catalysis",
      "theoretical catalysis",
      "computational catalyst design",
    ],
    searches: {
      orientation: "computational catalysis DFT catalytic cycles introduction",
      focused:
        "DFT key transition state catalyst structure activity relationship",
      review: "recent review computational catalyst design reaction mechanisms",
    },
    affinities: {
      "interest:reactions": 3,
      "interest:materials": 1,
      "mode:design": 3,
      "mode:pathway": 2,
      "purpose:applied": 2,
      "state:changing": 3,
      "goal:interpret": 1,
      "scale:molecule": 1,
      "style:chemistry": 2,
    },
    reasons: [
      {
        signal: "interest:reactions",
        category: "interest",
        text: "Catalytic bond-making and bond-breaking match your interest in reactions.",
      },
      {
        signal: "mode:design",
        category: "interest",
        text: "You liked questions that could lead to a better design.",
      },
      {
        signal: "purpose:applied",
        category: "style",
        text: "This field connects molecular explanation to practical chemical performance.",
      },
      {
        signal: "state:changing",
        category: "style",
        text: "Catalytic cycles reward thinking in connected molecular steps.",
      },
    ],
    comparisonLens:
      "It centers the catalyst and its design, rather than treating the reaction pathway or product competition alone.",
  },
  {
    ...defaults,
    id: "selectivity-pathways",
    area: "Reactivity",
    name: "Selectivity & competing pathways",
    shortDescription:
      "Compare rival reaction routes to explain why one product wins.",
    explanation:
      "Many reactions could make several products, yet one route often dominates. This niche compares competing transition states and the small energy differences between them. It is a precise way to connect molecular shape, noncovalent contacts, solvent, and reaction conditions to an experimentally observed outcome.",
    questions: [
      "Why is one product favored over another?",
      "Which interaction stabilizes the winning transition state?",
      "Could a solvent or substituent reverse the selectivity?",
    ],
    systems: [
      "Stereoselective organic reactions",
      "Regioselective additions",
      "Competing rearrangements",
      "Catalyst-controlled reactions",
    ],
    approaches: [
      {
        name: "Competing transition-state models",
        explanation:
          "Candidate pathways are optimized and compared on the same energy scale.",
      },
      {
        name: "Conformational searching",
        explanation:
          "Multiple molecular shapes are sampled so a hidden low-energy pathway is not missed.",
      },
      {
        name: "Interaction analysis",
        explanation:
          "Computed electron-density or energy components help explain small selectivity differences.",
      },
    ],
    concepts: [
      "Transition states",
      "Conformations",
      "Intermolecular forces",
      "Free-energy differences",
    ],
    preparation:
      "Start with a published reaction that has two clearly defined outcomes. The main challenge is careful comparison, not large amounts of code.",
    keywords: [
      "reaction selectivity",
      "competing pathways",
      "transition state model",
      "stereoselectivity",
      "regioselectivity",
      "DFT",
      "conformational search",
    ],
    synonyms: [
      "selectivity prediction",
      "competing transition states",
      "stereochemical outcome",
    ],
    searches: {
      orientation:
        "computational explanation reaction selectivity transition state models",
      focused:
        "DFT competing pathways stereoselectivity conformational analysis",
      review:
        "recent review computational prediction organic reaction selectivity",
    },
    affinities: {
      "interest:reactions": 3,
      "mode:compare": 3,
      "mode:pathway": 2,
      "goal:interpret": 2,
      "state:changing": 2,
      "medium:visual": 1,
      "style:chemistry": 2,
    },
    reasons: [
      {
        signal: "interest:reactions",
        category: "interest",
        text: "You are curious about why reactions follow particular routes.",
      },
      {
        signal: "mode:compare",
        category: "interest",
        text: "This work is built around disciplined comparison of close alternatives.",
      },
      {
        signal: "goal:interpret",
        category: "style",
        text: "The payoff is a chemical explanation for an observed outcome.",
      },
      {
        signal: "medium:visual",
        category: "style",
        text: "Three-dimensional transition-state pictures are central evidence here.",
      },
    ],
    comparisonLens:
      "It focuses on close competition between products, while broader mechanism work maps the whole sequence of steps.",
  },
  {
    ...defaults,
    id: "noncovalent-interactions",
    area: "Molecular interactions",
    name: "Noncovalent molecular interactions",
    shortDescription:
      "Study the subtle attractions that let molecules recognize, assemble, and bind.",
    explanation:
      "Molecules influence one another without forming new covalent bonds. Hydrogen bonding, dispersion, electrostatics, and other noncovalent interactions help control recognition, packing, and molecular shape. Computation can separate these contributions and test which structural details make an interaction stronger or more selective.",
    questions: [
      "Which interaction holds a molecular pair together?",
      "How does geometry change binding strength?",
      "When do dispersion or electrostatics dominate?",
    ],
    systems: [
      "Hydrogen-bonded pairs",
      "Aromatic stacking",
      "Host–guest complexes",
      "Small biomolecular models",
    ],
    approaches: [
      {
        name: "Interaction-energy calculations",
        explanation:
          "The energy of a complex is compared with its separated partners.",
      },
      {
        name: "Energy decomposition",
        explanation:
          "Binding is interpreted as contributions such as electrostatics, polarization, and dispersion.",
      },
      {
        name: "Electron-density analysis",
        explanation:
          "Maps and topological tools reveal where interactions reshape electron density.",
      },
    ],
    concepts: [
      "Intermolecular forces",
      "Electron density",
      "Molecular orbitals",
      "Geometry optimization",
    ],
    preparation:
      "Small molecular pairs make excellent first systems. You can begin visually and conceptually, then add quantitative analysis as your confidence grows.",
    keywords: [
      "noncovalent interactions",
      "molecular recognition",
      "hydrogen bonding",
      "dispersion interaction",
      "binding energy",
      "energy decomposition",
      "electron density",
    ],
    synonyms: [
      "intermolecular interactions",
      "weak interactions",
      "supramolecular binding",
    ],
    searches: {
      orientation:
        "noncovalent interactions computational chemistry beginner overview",
      focused:
        "DFT energy decomposition hydrogen bonding molecular recognition",
      review: "recent review computational methods noncovalent interactions",
    },
    affinities: {
      "interest:medicine": 3,
      "interest:materials": 1,
      "mode:explain": 3,
      "mode:compare": 2,
      "state:static": 3,
      "scale:molecule": 3,
      "goal:interpret": 2,
      "medium:visual": 2,
      "style:chemistry": 2,
    },
    reasons: [
      {
        signal: "interest:medicine",
        category: "interest",
        text: "Molecular recognition is one bridge between quantum chemistry and biological systems.",
      },
      {
        signal: "mode:explain",
        category: "interest",
        text: "You wanted to explain why a molecular arrangement holds together.",
      },
      {
        signal: "state:static",
        category: "style",
        text: "This niche supports careful study of structures and interaction snapshots.",
      },
      {
        signal: "medium:visual",
        category: "style",
        text: "Interaction maps and molecular geometries make the evidence tangible.",
      },
    ],
    comparisonLens:
      "It isolates how molecules attract one another, while solvation focuses on how a surrounding medium changes those interactions.",
    explorationFriendly: true,
  },
  {
    ...defaults,
    id: "solvation-effects",
    area: "Molecular environment",
    name: "Solvation & solvent effects",
    shortDescription:
      "Explore how a molecular environment changes structure, energy, and reactivity.",
    explanation:
      "A molecule rarely behaves in complete isolation. Water or another solvent can stabilize charge, reorganize around a solute, change a preferred shape, or even redirect a reaction. Solvation research compares ways of representing that environment—from a smooth dielectric background to explicit surrounding solvent molecules.",
    questions: [
      "How does solvent change relative stability?",
      "When are explicit solvent molecules necessary?",
      "Why does a reaction behave differently in two liquids?",
    ],
    systems: [
      "Ions in water",
      "Drug-like molecules",
      "Solution-phase reactions",
      "Solvated chromophores",
    ],
    approaches: [
      {
        name: "Continuum solvation",
        explanation:
          "The solvent is approximated as a polarizable surrounding medium.",
      },
      {
        name: "Explicit solvent clusters",
        explanation:
          "Individual solvent molecules are included around the solute.",
      },
      {
        name: "Molecular dynamics sampling",
        explanation:
          "Many changing solvent arrangements are sampled before quantum calculations are analyzed.",
      },
    ],
    concepts: [
      "Polarity and electrostatics",
      "Intermolecular forces",
      "Free energy",
      "Conformational sampling",
    ],
    preparation:
      "A useful beginner comparison might test one molecule in two solvents or compare implicit and explicit models. Sampling adds complexity, so keep the first system small.",
    keywords: [
      "solvation effects",
      "solvent model",
      "implicit solvent",
      "explicit solvent",
      "aqueous chemistry",
      "continuum solvation",
      "solution phase DFT",
    ],
    synonyms: [
      "solvent influence",
      "solution-phase quantum chemistry",
      "hydration effects",
    ],
    searches: {
      orientation:
        "solvation models computational chemistry overview implicit explicit",
      focused: "DFT solvent effects explicit versus continuum small molecules",
      review: "recent review quantum chemistry solvation models solution phase",
    },
    affinities: {
      "interest:medicine": 2,
      "interest:environment": 3,
      "mode:compare": 2,
      "mode:explain": 2,
      "state:static": 1,
      "state:changing": 1,
      "scale:molecule": 2,
      "purpose:mixed": 2,
      "goal:interpret": 2,
    },
    reasons: [
      {
        signal: "interest:environment",
        category: "interest",
        text: "You were interested in molecules behaving within air or water rather than in isolation.",
      },
      {
        signal: "interest:medicine",
        category: "interest",
        text: "Solvent and hydration can strongly shape biologically relevant molecular interactions.",
      },
      {
        signal: "mode:compare",
        category: "style",
        text: "This direction rewards controlled comparisons between environments and models.",
      },
      {
        signal: "purpose:mixed",
        category: "style",
        text: "It connects fundamental intermolecular physics to realistic chemical settings.",
      },
    ],
    comparisonLens:
      "It makes the surrounding environment the main variable, rather than focusing only on the isolated molecule or molecular pair.",
    explorationFriendly: true,
  },
  {
    ...defaults,
    id: "conformations-stability",
    area: "Molecular structure",
    name: "Molecular conformations & stability",
    shortDescription:
      "Discover which three-dimensional shapes a flexible molecule prefers and why.",
    explanation:
      "Many molecules can twist into several conformations without breaking bonds. Small energy differences decide which shapes are populated, but interactions within the molecule and with its surroundings can reorder them. This niche combines visual structure, careful searching, and thermodynamic reasoning.",
    questions: [
      "What are the important low-energy conformers?",
      "Which intramolecular interaction stabilizes a shape?",
      "How do temperature or solvent change the conformational ensemble?",
    ],
    systems: [
      "Flexible organic molecules",
      "Drug-like molecules",
      "Small peptides",
      "Molecular switches",
    ],
    approaches: [
      {
        name: "Conformer search",
        explanation:
          "Software proposes many plausible shapes so important structures are not missed.",
      },
      {
        name: "Geometry optimization",
        explanation:
          "Each candidate shape relaxes toward a nearby energy minimum.",
      },
      {
        name: "Free-energy comparison",
        explanation:
          "Energy and temperature-dependent contributions estimate relative populations.",
      },
    ],
    concepts: [
      "Molecular geometry",
      "Potential energy",
      "Intramolecular forces",
      "Entropy and populations",
    ],
    preparation:
      "Choose a molecule flexible enough to be interesting but small enough to search thoroughly. This is a visually approachable entry to computational work.",
    keywords: [
      "molecular conformations",
      "conformational search",
      "relative stability",
      "conformer population",
      "geometry optimization",
      "free energy",
      "intramolecular interaction",
    ],
    synonyms: [
      "conformational landscape",
      "rotamer stability",
      "structural ensemble",
    ],
    searches: {
      orientation:
        "computational conformational analysis molecular stability overview",
      focused: "DFT conformer search relative free energies flexible molecule",
      review: "recent review computational conformer generation energy ranking",
    },
    affinities: {
      "interest:medicine": 2,
      "interest:fundamentals": 2,
      "mode:compare": 3,
      "mode:explain": 2,
      "state:static": 3,
      "scale:molecule": 3,
      "medium:visual": 2,
      "style:chemistry": 1,
    },
    reasons: [
      {
        signal: "mode:compare",
        category: "interest",
        text: "You enjoy comparing close molecular alternatives and finding the pattern.",
      },
      {
        signal: "interest:medicine",
        category: "interest",
        text: "Molecular shape is often central to interactions in health-related chemistry.",
      },
      {
        signal: "state:static",
        category: "style",
        text: "You preferred detailed structural snapshots.",
      },
      {
        signal: "medium:visual",
        category: "style",
        text: "Three-dimensional models are a primary reasoning tool in conformational work.",
      },
    ],
    comparisonLens:
      "It asks which shapes one flexible molecule prefers, rather than how separate molecules bind or a solvent responds.",
    explorationFriendly: true,
  },
  {
    ...defaults,
    id: "biomolecular-electronics",
    area: "Molecular health",
    name: "Electronic contributions to biomolecular binding",
    shortDescription:
      "Use quantum chemistry to inspect how electron distribution shapes drug–protein or drug–DNA recognition.",
    explanation:
      "Biological binding is often modeled at large scales, but a carefully chosen small region can reveal electronic effects that simpler force fields blur. This niche studies polarization, charge redistribution, hydrogen bonding, and aromatic interactions in representative fragments of drug–protein or drug–DNA systems.",
    questions: [
      "How does binding redistribute electron density?",
      "Which local interaction contributes most to recognition?",
      "When does a quantum description change the binding picture?",
    ],
    systems: [
      "Drug–amino-acid fragments",
      "DNA base pairs and ligands",
      "Enzyme active-site clusters",
      "Hydrogen-bond networks",
    ],
    approaches: [
      {
        name: "Cluster-model DFT",
        explanation:
          "A chemically important region is cut into a manageable quantum-mechanical model.",
      },
      {
        name: "Energy decomposition",
        explanation:
          "Interaction energy is separated into physically meaningful contributions.",
      },
      {
        name: "QM/MM",
        explanation:
          "A small region uses quantum mechanics while the larger biological environment uses a simpler molecular model.",
      },
    ],
    concepts: [
      "Electron density",
      "Noncovalent interactions",
      "Molecular orbitals",
      "Electrostatics and polarization",
    ],
    preparation:
      "Start with a small, clearly justified fragment rather than a whole protein. Structural biology vocabulary may be new, but it can be learned alongside the chemistry.",
    keywords: [
      "quantum chemistry biomolecular binding",
      "drug protein interaction",
      "drug DNA interaction",
      "electron density",
      "QM/MM",
      "energy decomposition",
      "binding polarization",
    ],
    synonyms: [
      "quantum biochemistry",
      "electronic effects in molecular recognition",
      "QM cluster model",
    ],
    searches: {
      orientation:
        "quantum chemistry biomolecular binding interactions overview",
      focused:
        "DFT electronic contributions drug protein binding cluster model",
      review:
        "recent review quantum mechanical methods biomolecular recognition",
    },
    affinities: {
      "interest:medicine": 4,
      "mode:explain": 3,
      "purpose:applied": 2,
      "scale:molecule": 3,
      "state:ground": 2,
      "goal:interpret": 3,
      "medium:visual": 1,
      "style:chemistry": 2,
    },
    reasons: [
      {
        signal: "interest:medicine",
        category: "interest",
        text: "You chose molecular health as the real-world setting you most want to understand.",
      },
      {
        signal: "mode:explain",
        category: "interest",
        text: "This niche asks why a local biological interaction works at the electronic level.",
      },
      {
        signal: "goal:interpret",
        category: "style",
        text: "The goal is a defensible molecular explanation, not just a binding score.",
      },
      {
        signal: "scale:molecule",
        category: "style",
        text: "It focuses attention on a small, chemically important molecular region.",
      },
    ],
    comparisonLens:
      "It puts a biologically meaningful binding site at the center, whereas general noncovalent research may use simpler model complexes.",
  },
  {
    ...defaults,
    id: "excited-states",
    area: "Light & electrons",
    name: "Excited states & molecular photochemistry",
    shortDescription:
      "Follow what molecules do after light promotes their electrons to higher energy.",
    explanation:
      "Absorbing light can create an excited state: a temporary higher-energy arrangement of electrons. From there, a molecule may emit light, change shape, transfer charge, release heat, or react. Computational photochemistry maps these possibilities and the points where electronic states interact.",
    questions: [
      "Which excited state is created by a wavelength of light?",
      "How can the molecule relax or react?",
      "Which structural motion controls an excited-state pathway?",
    ],
    systems: [
      "Organic chromophores",
      "Photoactive switches",
      "Fluorescent molecules",
      "Atmospheric photochemistry models",
    ],
    approaches: [
      {
        name: "Time-dependent DFT",
        explanation:
          "TD-DFT is a practical extension of DFT used to estimate electronic excitations and absorption.",
      },
      {
        name: "Excited-state optimization",
        explanation:
          "The molecular structure is relaxed on a higher-energy electronic surface.",
      },
      {
        name: "State and orbital analysis",
        explanation:
          "Electron-density changes help characterize what kind of excitation occurred.",
      },
    ],
    concepts: [
      "Electronic states",
      "Molecular orbitals",
      "Absorption and emission",
      "Potential-energy surfaces",
    ],
    preparation:
      "Begin with a small chromophore and one observable such as absorption energy. Excited-state calculations require extra care, so method limits should be part of the project.",
    keywords: [
      "excited states",
      "photochemistry",
      "TD-DFT",
      "chromophore",
      "photoexcitation",
      "nonradiative decay",
      "excited-state dynamics",
    ],
    synonyms: [
      "computational photochemistry",
      "photoinduced processes",
      "electronic excitation",
    ],
    searches: {
      orientation:
        "computational excited states photochemistry beginner overview",
      focused: "TD-DFT organic chromophore excited state relaxation pathway",
      review:
        "recent review computational photochemistry excited state methods",
    },
    affinities: {
      "interest:light": 4,
      "interest:energy": 2,
      "mode:explain": 2,
      "mode:pathway": 2,
      "state:excited": 4,
      "state:changing": 3,
      "medium:visual": 2,
      "purpose:mixed": 2,
    },
    reasons: [
      {
        signal: "interest:light",
        category: "interest",
        text: "You were curious about what light can do to a molecule.",
      },
      {
        signal: "interest:energy",
        category: "interest",
        text: "Excited states are the first step in many molecular solar-energy processes.",
      },
      {
        signal: "state:excited",
        category: "style",
        text: "You explicitly preferred molecules after an energy boost.",
      },
      {
        signal: "state:changing",
        category: "style",
        text: "Photochemistry follows a branching molecular story through time.",
      },
    ],
    comparisonLens:
      "It follows the molecule’s higher-energy behavior, while spectroscopy focuses more on interpreting the signal that reveals it.",
  },
  {
    ...defaults,
    id: "computational-spectroscopy",
    area: "Light & measurement",
    name: "Computational spectroscopy",
    shortDescription:
      "Connect calculated molecular motion and electronic transitions to experimental spectral fingerprints.",
    explanation:
      "Spectra turn molecular energy differences into observable peaks. Computational spectroscopy predicts those signals and helps assign which vibration or electronic transition produced each feature. It creates a bridge between molecular models and experimental evidence without requiring the student to run the experiment.",
    questions: [
      "Which molecular motion produces this peak?",
      "Can a calculated spectrum identify an unknown structure?",
      "Why does a solvent or substituent shift the signal?",
    ],
    systems: [
      "Small organic molecules",
      "Atmospheric trace species",
      "Dyes and chromophores",
      "Astrochemical molecules",
    ],
    approaches: [
      {
        name: "Vibrational frequency calculations",
        explanation:
          "Computed molecular motions are used to predict infrared or Raman signals.",
      },
      {
        name: "TD-DFT spectra",
        explanation:
          "Electronic excitations are calculated to model ultraviolet–visible absorption.",
      },
      {
        name: "Spectral broadening and assignment",
        explanation:
          "Discrete calculated transitions are turned into a spectrum and matched to features.",
      },
    ],
    concepts: [
      "Quantized energy levels",
      "Molecular vibrations",
      "Electronic transitions",
      "Light absorption",
    ],
    preparation:
      "Choose one type of spectrum and a small molecule with available experimental context. The first skill is learning to connect peaks to molecular motions or states.",
    keywords: [
      "computational spectroscopy",
      "spectral assignment",
      "vibrational frequencies",
      "UV-visible spectrum",
      "infrared spectrum",
      "TD-DFT",
      "simulated spectrum",
    ],
    synonyms: [
      "theoretical spectroscopy",
      "in silico spectra",
      "spectroscopic simulation",
    ],
    searches: {
      orientation:
        "computational spectroscopy quantum chemistry spectral assignment overview",
      focused: "DFT calculated spectrum peak assignment small molecule",
      review:
        "recent review computational vibrational electronic spectroscopy methods",
    },
    affinities: {
      "interest:light": 4,
      "interest:environment": 1,
      "interest:space": 2,
      "mode:spectra": 4,
      "mode:compare": 1,
      "goal:interpret": 3,
      "medium:visual": 2,
      "state:excited": 2,
      "purpose:mixed": 2,
    },
    reasons: [
      {
        signal: "interest:light",
        category: "interest",
        text: "Light and molecular fingerprints were a clear source of curiosity.",
      },
      {
        signal: "mode:spectra",
        category: "interest",
        text: "You chose the question of what a spectrum can tell us.",
      },
      {
        signal: "goal:interpret",
        category: "style",
        text: "This field turns calculated evidence into an explanation of an observation.",
      },
      {
        signal: "medium:visual",
        category: "style",
        text: "Spectral plots and animated vibrations suit a visual reasoning style.",
      },
    ],
    comparisonLens:
      "It treats spectra as the main evidence, whereas photochemistry centers what the excited molecule does after absorption.",
  },
  {
    ...defaults,
    id: "charge-transfer",
    area: "Light & electrons",
    name: "Molecular charge transfer",
    shortDescription:
      "Track how electron density moves within or between molecules after a stimulus.",
    explanation:
      "In a charge-transfer state, absorbing light or forming an interaction shifts electron density from a donor region toward an acceptor. That movement powers many solar-energy, sensing, and biological processes. Computation helps show where the electron and the corresponding ‘hole’ go, and what molecular structure controls the transfer.",
    questions: [
      "Where does electron density move after excitation?",
      "How far and how strongly are charge-separated states stabilized?",
      "Which molecular change improves or suppresses transfer?",
    ],
    systems: [
      "Donor–acceptor dyes",
      "Molecular solar-cell models",
      "Charge-transfer complexes",
      "Photosensitizers",
    ],
    approaches: [
      {
        name: "Difference-density analysis",
        explanation:
          "Electron density before and after excitation is subtracted to visualize where charge moved.",
      },
      {
        name: "Charge-transfer descriptors",
        explanation:
          "Computed measures summarize transfer distance and amount.",
      },
      {
        name: "Range-separated DFT",
        explanation:
          "Special density functionals can better describe excitations spanning larger distances.",
      },
    ],
    concepts: [
      "Electron density",
      "Molecular orbitals",
      "Excited states",
      "Electrostatics",
    ],
    preparation:
      "A small donor–acceptor molecule with a clear structural series is ideal. Be ready to learn why ordinary excited-state methods can struggle with long-range transfer.",
    keywords: [
      "charge transfer",
      "donor acceptor molecule",
      "difference density",
      "charge-transfer excitation",
      "TD-DFT",
      "electron hole analysis",
      "range-separated functional",
    ],
    synonyms: [
      "photoinduced electron transfer",
      "intramolecular charge transfer",
      "CT state",
    ],
    searches: {
      orientation: "molecular charge transfer computational chemistry overview",
      focused:
        "TD-DFT donor acceptor charge transfer difference density analysis",
      review: "recent review computational methods charge transfer excitations",
    },
    affinities: {
      "interest:light": 3,
      "interest:energy": 4,
      "interest:materials": 2,
      "mode:explain": 2,
      "mode:design": 2,
      "state:excited": 4,
      "state:changing": 2,
      "medium:visual": 3,
      "goal:interpret": 1,
      "goal:predict": 1,
    },
    reasons: [
      {
        signal: "interest:energy",
        category: "interest",
        text: "Moving charge is a central molecular step in converting light into useful energy.",
      },
      {
        signal: "interest:light",
        category: "interest",
        text: "You wanted to follow what happens to electrons after light absorption.",
      },
      {
        signal: "state:excited",
        category: "style",
        text: "Charge-transfer states live in the excited-state landscape you preferred.",
      },
      {
        signal: "medium:visual",
        category: "style",
        text: "Difference-density maps make electron movement visually interpretable.",
      },
    ],
    comparisonLens:
      "It isolates electron movement as the central event, while broader photochemistry includes all excited-state routes and outcomes.",
  },
  {
    ...defaults,
    id: "organic-electronics",
    area: "Molecular materials",
    name: "Organic electronic & optoelectronic materials",
    shortDescription:
      "Connect molecular structure and packing to how organic materials absorb light or transport charge.",
    explanation:
      "Organic molecules can serve as the active parts of solar cells, LEDs, sensors, and flexible electronics. Their performance depends on both the electronic structure of each molecular building block and how many molecules pack together. Computation helps connect structural changes to color, energy levels, and charge transport.",
    questions: [
      "How does a structural change tune absorption or emission?",
      "How does molecular packing affect charge transport?",
      "Which candidate has promising electronic properties?",
    ],
    systems: [
      "Organic dyes",
      "Conjugated oligomers",
      "OLED emitters",
      "Organic semiconductor dimers",
    ],
    approaches: [
      {
        name: "Frontier-orbital and energy-level analysis",
        explanation:
          "Electron energies and orbital shapes are compared across molecular designs.",
      },
      {
        name: "TD-DFT",
        explanation:
          "Electronic excitations are estimated to connect structure with color and light response.",
      },
      {
        name: "Dimer and packing models",
        explanation:
          "Small groups of molecules approximate key interactions in a material.",
      },
    ],
    concepts: [
      "Conjugation",
      "Molecular orbitals",
      "Excited states",
      "Intermolecular packing",
    ],
    preparation:
      "Begin with a short, related series of molecules and one property. Real devices are multiscale, so state clearly what a molecular model can and cannot capture.",
    keywords: [
      "organic electronics",
      "optoelectronic materials",
      "organic semiconductor",
      "molecular packing",
      "charge transport",
      "TD-DFT",
      "structure property relationship",
    ],
    synonyms: [
      "molecular electronics",
      "organic optoelectronics",
      "conjugated materials",
    ],
    searches: {
      orientation:
        "computational chemistry organic electronic materials overview",
      focused:
        "DFT molecular structure optical electronic properties organic semiconductor",
      review:
        "recent review computational design organic optoelectronic materials",
    },
    affinities: {
      "interest:materials": 4,
      "interest:energy": 3,
      "interest:light": 2,
      "mode:design": 3,
      "mode:predict": 2,
      "scale:material": 4,
      "purpose:applied": 3,
      "goal:predict": 2,
      "state:excited": 2,
    },
    reasons: [
      {
        signal: "interest:materials",
        category: "interest",
        text: "You wanted to understand materials that conduct, glow, or sense.",
      },
      {
        signal: "mode:design",
        category: "interest",
        text: "You were motivated by turning insight into a better molecular design.",
      },
      {
        signal: "scale:material",
        category: "style",
        text: "This niche connects individual molecules to collective material behavior.",
      },
      {
        signal: "purpose:applied",
        category: "style",
        text: "It offers a visible bridge from quantum chemistry to devices and technology.",
      },
    ],
    comparisonLens:
      "It links molecular behavior to material performance, while charge-transfer work can stay focused on a single donor–acceptor event.",
  },
  {
    ...defaults,
    id: "energy-chemistry",
    area: "Energy & sustainability",
    name: "Molecular design for energy conversion",
    shortDescription:
      "Compare molecules that capture, store, or transform energy and identify useful design patterns.",
    explanation:
      "Energy conversion starts with molecular-level events: light absorption, electron or proton movement, and bond formation. This direction uses quantum chemistry to compare candidate chromophores, redox molecules, or small catalytic motifs. It is broad enough for exploration but focused on a chosen molecular property and a clear sustainable-energy context.",
    questions: [
      "Which structural feature improves light capture or redox behavior?",
      "What energy loss limits a molecular design?",
      "Can a computed descriptor rank a small candidate series?",
    ],
    systems: [
      "Solar-energy chromophores",
      "Redox-active organic molecules",
      "Hydrogen-evolution motifs",
      "Molecular energy-storage candidates",
    ],
    approaches: [
      {
        name: "DFT property calculations",
        explanation:
          "Ground-state energies and electron-removal or addition tendencies are compared.",
      },
      {
        name: "TD-DFT screening",
        explanation:
          "Absorption wavelengths and excited states help compare light-harvesting candidates.",
      },
      {
        name: "Structure–property analysis",
        explanation:
          "Chemical changes are connected to a targeted energy-related property.",
      },
    ],
    concepts: [
      "Redox chemistry",
      "Molecular orbitals",
      "Light absorption",
      "Thermodynamics",
    ],
    preparation:
      "Choose one energy process and a small family of molecules; ‘energy chemistry’ becomes manageable only after the target property is explicit.",
    keywords: [
      "molecular energy conversion",
      "solar energy molecules",
      "redox properties",
      "photocatalyst screening",
      "DFT",
      "chromophore design",
      "sustainable chemistry",
    ],
    synonyms: [
      "molecular solar fuels",
      "energy-related molecular design",
      "computational energy chemistry",
    ],
    searches: {
      orientation: "quantum chemistry molecular energy conversion overview",
      focused:
        "DFT structure property molecular candidates solar energy conversion",
      review:
        "recent perspective computational molecular design sustainable energy",
    },
    affinities: {
      "interest:energy": 4,
      "interest:materials": 1,
      "mode:design": 3,
      "mode:predict": 2,
      "purpose:applied": 4,
      "goal:predict": 2,
      "scale:molecule": 2,
      "scale:material": 1,
    },
    reasons: [
      {
        signal: "interest:energy",
        category: "interest",
        text: "Energy and sustainability were your strongest real-world motivation.",
      },
      {
        signal: "mode:design",
        category: "interest",
        text: "You liked questions that compare and improve candidate molecules.",
      },
      {
        signal: "purpose:applied",
        category: "style",
        text: "This direction keeps a practical energy goal visible throughout the chemistry.",
      },
      {
        signal: "goal:predict",
        category: "style",
        text: "Computed properties can support useful, testable comparisons across candidates.",
      },
    ],
    comparisonLens:
      "It starts from an energy goal and candidate comparison, rather than focusing only on excited-state physics or bulk material behavior.",
  },
  {
    ...defaults,
    id: "environmental-chemistry",
    area: "Environment",
    name: "Atmospheric & environmental molecular chemistry",
    shortDescription:
      "Use molecular calculations to understand the formation, transformation, and detection of environmental species.",
    explanation:
      "Environmental behavior emerges from molecular reactions, sunlight, temperature, and surroundings. This niche applies quantum chemistry to focused questions such as why a pollutant persists, which atmospheric pathway is feasible, or what spectral signal could reveal a trace species.",
    questions: [
      "Which atmospheric reaction pathway is energetically plausible?",
      "How does sunlight change a pollutant molecule?",
      "Which computed signal could help identify an environmental species?",
    ],
    systems: [
      "Atmospheric radicals",
      "Small pollutants",
      "Greenhouse-gas transformations",
      "Aqueous environmental molecules",
    ],
    approaches: [
      {
        name: "Reaction energetics",
        explanation:
          "Energies and barriers are computed for environmentally relevant pathways.",
      },
      {
        name: "Photochemical calculations",
        explanation:
          "Excited states reveal which processes sunlight can initiate.",
      },
      {
        name: "Spectral prediction",
        explanation:
          "Calculated signatures support detection or assignment of trace species.",
      },
    ],
    concepts: [
      "Reaction energetics",
      "Radicals",
      "Excited states",
      "Molecular spectroscopy",
    ],
    preparation:
      "Tie the project to one molecule and one environmental process. Real environments are complex, so a good first study is explicit about which factors are simplified.",
    keywords: [
      "atmospheric quantum chemistry",
      "environmental computational chemistry",
      "pollutant degradation",
      "atmospheric reaction",
      "photochemistry",
      "radical chemistry",
      "spectral detection",
    ],
    synonyms: [
      "computational atmospheric chemistry",
      "molecular environmental fate",
      "theoretical environmental chemistry",
    ],
    searches: {
      orientation:
        "quantum chemistry atmospheric environmental molecules overview",
      focused:
        "DFT mechanism atmospheric pollutant transformation small molecule",
      review:
        "recent review computational chemistry atmospheric reaction mechanisms",
    },
    affinities: {
      "interest:environment": 4,
      "purpose:applied": 3,
      "mode:explain": 2,
      "mode:pathway": 2,
      "mode:spectra": 1,
      "state:changing": 2,
      "scale:molecule": 2,
      "purpose:mixed": 1,
    },
    reasons: [
      {
        signal: "interest:environment",
        category: "interest",
        text: "You chose the molecular fate of species in air or water as your doorway.",
      },
      {
        signal: "mode:pathway",
        category: "interest",
        text: "Environmental fate often depends on identifying a plausible reaction route.",
      },
      {
        signal: "purpose:applied",
        category: "style",
        text: "The molecular question stays connected to a clear environmental consequence.",
      },
      {
        signal: "state:changing",
        category: "style",
        text: "This work follows how molecules transform under realistic influences.",
      },
    ],
    comparisonLens:
      "It is anchored in an environmental setting, while mechanism, solvation, or spectroscopy research may study the same tools without that context.",
  },
  {
    ...defaults,
    id: "astrochemical-systems",
    area: "Chemistry beyond Earth",
    name: "Quantum chemistry in astrochemical systems",
    shortDescription:
      "Predict how unusual molecules form, survive, and signal their presence in space-like conditions.",
    explanation:
      "Space hosts chemistry at very low temperatures, under radiation, and on icy dust grains. Laboratory data can be scarce, so quantum calculations help predict molecular stability, reaction routes, and spectral fingerprints that astronomers can search for. The work blends fundamental chemistry with a vivid physical setting.",
    questions: [
      "Could a proposed interstellar molecule be stable?",
      "What low-temperature pathway might form it?",
      "What rotational or vibrational signature would reveal it?",
    ],
    systems: [
      "Interstellar organic molecules",
      "Molecular ions",
      "Ice-grain reaction models",
      "Planetary-atmosphere species",
    ],
    approaches: [
      {
        name: "High-accuracy electronic structure",
        explanation:
          "Reliable energies and structures are computed for small unusual species.",
      },
      {
        name: "Reaction-pathway calculations",
        explanation:
          "Low-barrier or barrierless routes are tested under space-like conditions.",
      },
      {
        name: "Spectral prediction",
        explanation:
          "Calculated frequencies help connect molecules to astronomical observations.",
      },
    ],
    concepts: [
      "Molecular stability",
      "Spectroscopy",
      "Reaction barriers",
      "Ions and radicals",
    ],
    preparation:
      "Pick a small molecule and one question—existence, formation, or detection. The unfamiliar setting is exciting, but avoid trying to model an entire cloud or planet.",
    keywords: [
      "astrochemistry quantum chemistry",
      "interstellar molecule",
      "molecular formation pathway",
      "spectral prediction",
      "ice grain chemistry",
      "low temperature reaction",
      "molecular ion",
    ],
    synonyms: [
      "computational astrochemistry",
      "interstellar chemistry",
      "theoretical molecular astrophysics",
    ],
    searches: {
      orientation:
        "computational quantum chemistry astrochemical molecules overview",
      focused:
        "ab initio formation pathway spectral prediction interstellar molecule",
      review: "recent review quantum chemical calculations astrochemistry",
    },
    affinities: {
      "interest:space": 5,
      "interest:fundamentals": 1,
      "mode:predict": 2,
      "mode:pathway": 2,
      "mode:spectra": 2,
      "purpose:mixed": 2,
      "scale:molecule": 3,
      "state:ground": 1,
      "goal:predict": 2,
    },
    reasons: [
      {
        signal: "interest:space",
        category: "interest",
        text: "You were most energized by chemistry in space and extreme environments.",
      },
      {
        signal: "mode:predict",
        category: "interest",
        text: "Computation can predict molecules and signals before complete experimental data exist.",
      },
      {
        signal: "scale:molecule",
        category: "style",
        text: "Small, unusual molecular systems can sit at the center of the project.",
      },
      {
        signal: "purpose:mixed",
        category: "style",
        text: "This direction combines fundamental molecular rules with astronomical discovery.",
      },
    ],
    comparisonLens:
      "It uses familiar quantum tools under space-like conditions, making formation and detection beyond Earth the organizing question.",
  },
  {
    ...defaults,
    id: "method-benchmarking",
    area: "Computational methods",
    name: "Benchmarking computational methods",
    shortDescription:
      "Test which computational approximations are reliable for a clearly defined chemical task.",
    explanation:
      "Every practical quantum-chemistry calculation makes approximations. Benchmarking compares methods against trusted reference data or carefully chosen experiments, measures the error, and asks when the ranking changes. Strong studies do more than announce a winner: they explain tradeoffs among accuracy, cost, and chemical system.",
    questions: [
      "Which method predicts this property most reliably?",
      "Does a method fail systematically for a chemical class?",
      "How much accuracy is gained for the extra computational cost?",
    ],
    systems: [
      "Small benchmark molecule sets",
      "Reaction barriers",
      "Noncovalent complexes",
      "Excitation energies",
    ],
    approaches: [
      {
        name: "Reference-data comparison",
        explanation:
          "Predictions are evaluated against higher-level calculations or suitable experiments.",
      },
      {
        name: "Error statistics",
        explanation:
          "Measures such as mean absolute error summarize performance without hiding outliers.",
      },
      {
        name: "Cost–accuracy analysis",
        explanation:
          "Runtime and resource needs are compared alongside scientific accuracy.",
      },
    ],
    concepts: [
      "Basis sets",
      "DFT and wave-function methods",
      "Error and uncertainty",
      "Fair comparisons",
    ],
    preparation:
      "Keep the dataset small, curated, and chemically coherent. Spreadsheet or scripting skills help, but the key skill is designing a fair comparison.",
    keywords: [
      "quantum chemistry benchmark",
      "method comparison",
      "DFT functional performance",
      "basis set",
      "mean absolute error",
      "reference data",
      "cost accuracy",
    ],
    synonyms: [
      "benchmark study",
      "method assessment",
      "computational protocol validation",
    ],
    searches: {
      orientation: "quantum chemistry benchmarking methods introduction",
      focused: "DFT functional benchmark small molecular property dataset",
      review:
        "recent perspective best practices computational chemistry benchmarking",
    },
    affinities: {
      "interest:computing": 4,
      "interest:fundamentals": 2,
      "mode:compare": 4,
      "mode:data": 2,
      "purpose:fundamental": 2,
      "goal:predict": 1,
      "medium:data": 3,
      "medium:equations": 2,
      "style:mixed-computing": 2,
      "style:coding": 1,
    },
    reasons: [
      {
        signal: "interest:computing",
        category: "interest",
        text: "You were curious about how computational tools earn our trust.",
      },
      {
        signal: "mode:compare",
        category: "interest",
        text: "Systematic comparison is the central research move in benchmarking.",
      },
      {
        signal: "medium:data",
        category: "style",
        text: "You chose datasets and plots as evidence you would enjoy working with.",
      },
      {
        signal: "medium:equations",
        category: "style",
        text: "Quantitative error patterns fit your comfort with numerical reasoning.",
      },
    ],
    comparisonLens:
      "It evaluates existing methods on a defined task, while approximation research asks more deeply how a method is constructed or improved.",
    explorationFriendly: true,
  },
  {
    ...defaults,
    id: "ml-property-prediction",
    area: "Data & algorithms",
    name: "Machine learning for molecular-property prediction",
    shortDescription:
      "Train and evaluate data-driven models that estimate molecular properties across many examples.",
    explanation:
      "Quantum calculations can generate valuable molecular data but may be too slow for huge candidate libraries. Machine learning (ML) looks for patterns linking molecular representations to properties such as energy, solubility, or absorption. A responsible project also examines data quality, uncertainty, and where the model fails.",
    questions: [
      "Which molecular representation predicts the property best?",
      "How well does the model generalize to unfamiliar molecules?",
      "What chemical patterns appear in the largest errors?",
    ],
    systems: [
      "Small organic-molecule datasets",
      "Calculated energies",
      "Optical-property libraries",
      "Solubility or redox datasets",
    ],
    approaches: [
      {
        name: "Molecular descriptors",
        explanation:
          "Molecules are converted into numerical features a model can use.",
      },
      {
        name: "Regression and validation",
        explanation:
          "A model learns from training examples and is evaluated on held-out data.",
      },
      {
        name: "Error and applicability analysis",
        explanation:
          "Outliers and uncertainty are studied to define when predictions are trustworthy.",
      },
    ],
    concepts: [
      "Molecular properties",
      "Descriptors",
      "Train/test separation",
      "Error and uncertainty",
    ],
    preparation:
      "Comfort with Python is helpful, but a small guided dataset is enough to begin. Keep the chemistry question visible so the project does not become a generic coding exercise.",
    keywords: [
      "molecular property prediction",
      "machine learning chemistry",
      "molecular descriptors",
      "QSAR",
      "graph neural network",
      "model validation",
      "chemical space",
    ],
    synonyms: ["cheminformatics", "QSPR", "data-driven molecular modeling"],
    searches: {
      orientation:
        "machine learning molecular property prediction beginner overview",
      focused:
        "molecular descriptors regression property prediction validation small dataset",
      review:
        "recent review machine learning molecular property prediction uncertainty",
    },
    affinities: {
      "interest:computing": 5,
      "mode:data": 4,
      "mode:predict": 3,
      "purpose:applied": 2,
      "goal:predict": 3,
      "medium:data": 4,
      "style:coding": 4,
      "scale:material": 1,
    },
    reasons: [
      {
        signal: "interest:computing",
        category: "interest",
        text: "Coding, algorithms, and molecular data were a strong source of curiosity.",
      },
      {
        signal: "mode:data",
        category: "interest",
        text: "You wanted to learn from patterns across many examples.",
      },
      {
        signal: "style:coding",
        category: "style",
        text: "This is the most coding-centered path in the map.",
      },
      {
        signal: "medium:data",
        category: "style",
        text: "Datasets, plots, and validation results are the everyday evidence here.",
      },
    ],
    comparisonLens:
      "It predicts across many molecules using learned patterns, while benchmarking compares physics-based methods and their errors.",
  },
  {
    ...defaults,
    id: "computational-approximations",
    area: "Computational methods",
    name: "Evaluating computational approximations",
    shortDescription:
      "Investigate why practical quantum methods work, where they fail, and how approximations shape results.",
    explanation:
      "The exact electronic Schrödinger equation is impractical for most real molecules. Computational chemistry therefore depends on approximations: choices about electron correlation, exchange, basis sets, and numerical shortcuts. This niche connects the mathematical structure of a method to recognizable chemical successes and failures.",
    questions: [
      "Which assumption causes a method to fail for this system?",
      "What accuracy is lost by a faster approximation?",
      "Can a targeted correction improve the result?",
    ],
    systems: [
      "Small challenging molecules",
      "Bond-breaking examples",
      "Noncovalent test cases",
      "Charge-transfer systems",
    ],
    approaches: [
      {
        name: "Controlled method hierarchy",
        explanation:
          "Related approximations are compared one change at a time.",
      },
      {
        name: "Error diagnosis",
        explanation:
          "Chemical patterns in the errors are connected back to missing physics.",
      },
      {
        name: "Reference calculations",
        explanation:
          "Higher-accuracy methods on small systems provide a comparison point.",
      },
    ],
    concepts: [
      "Electron correlation",
      "Exchange",
      "Basis sets",
      "Accuracy versus cost",
    ],
    preparation:
      "This is theory-rich but can start from concrete examples. Build vocabulary around one approximation rather than trying to learn all electronic-structure theory at once.",
    keywords: [
      "electronic structure approximation",
      "DFT limitations",
      "electron correlation",
      "basis set effects",
      "self interaction error",
      "method accuracy",
      "computational cost",
    ],
    synonyms: [
      "method development",
      "electronic-structure approximations",
      "theoretical method assessment",
    ],
    searches: {
      orientation:
        "approximations in electronic structure methods beginner overview",
      focused:
        "DFT approximation failure small molecule electronic structure analysis",
      review:
        "recent perspective limitations improvements density functional theory",
    },
    affinities: {
      "interest:fundamentals": 4,
      "interest:computing": 3,
      "mode:theory": 4,
      "mode:compare": 2,
      "purpose:fundamental": 4,
      "goal:interpret": 2,
      "medium:equations": 3,
      "style:coding": 1,
      "style:mixed-computing": 2,
    },
    reasons: [
      {
        signal: "interest:fundamentals",
        category: "interest",
        text: "You wanted to look beneath the calculation at the rules and assumptions.",
      },
      {
        signal: "mode:theory",
        category: "interest",
        text: "Questions about deeper theoretical structure appealed to you.",
      },
      {
        signal: "purpose:fundamental",
        category: "style",
        text: "Understanding the method itself can be the main scientific result.",
      },
      {
        signal: "medium:equations",
        category: "style",
        text: "Your comfort with quantitative reasoning supports this theory-rich path.",
      },
    ],
    comparisonLens:
      "It diagnoses and interprets approximations themselves, while benchmarking focuses on measuring performance for a task.",
  },
  {
    ...defaults,
    id: "fundamental-electronic-structure",
    area: "Molecular fundamentals",
    name: "Fundamental electronic structure & bonding",
    shortDescription:
      "Use quantum models to examine how electron distribution gives rise to bonding, structure, and molecular properties.",
    explanation:
      "Electronic structure is the arrangement and behavior of electrons in a molecule. It underlies familiar ideas such as bonds, lone pairs, aromaticity, polarity, and reactivity—but different analysis tools can tell different stories. This niche asks how well our chemical pictures connect to the underlying wavefunction or electron density.",
    questions: [
      "How does electron density reveal a bond or its absence?",
      "Why do two bonding models describe the same molecule differently?",
      "How does electronic structure change across a related molecular series?",
    ],
    systems: [
      "Unusual bonding motifs",
      "Small aromatic molecules",
      "Hypervalent compounds",
      "Simple radical or ionic species",
    ],
    approaches: [
      {
        name: "Orbital analysis",
        explanation:
          "Molecular orbitals provide one interpretable view of electron arrangement and interactions.",
      },
      {
        name: "Electron-density analysis",
        explanation:
          "The computed density is mapped and partitioned to examine bonds, charge, and polarization.",
      },
      {
        name: "Bonding descriptors",
        explanation:
          "Multiple quantitative measures are compared instead of treating any single picture as final truth.",
      },
    ],
    concepts: [
      "Orbitals and electron density",
      "Chemical bonding",
      "Wavefunctions",
      "Energy and stability",
    ],
    preparation:
      "Start with a small molecule and one contested or surprising bonding question. The theory can deepen gradually; visual electron-density tools provide an accessible entry.",
    keywords: [
      "electronic structure",
      "chemical bonding analysis",
      "electron density",
      "molecular orbitals",
      "bond order",
      "aromaticity",
      "quantum chemical topology",
    ],
    synonyms: [
      "theoretical bonding analysis",
      "electron-density interpretation",
      "fundamental quantum chemistry",
    ],
    searches: {
      orientation:
        "electronic structure chemical bonding analysis beginner overview",
      focused: "DFT electron density orbital analysis bonding small molecule",
      review:
        "recent perspective quantum chemical concepts bonding electron density",
    },
    affinities: {
      "interest:fundamentals": 5,
      "mode:theory": 4,
      "mode:explain": 3,
      "purpose:fundamental": 4,
      "scale:molecule": 3,
      "state:ground": 2,
      "goal:interpret": 3,
      "medium:visual": 1,
      "medium:equations": 2,
    },
    reasons: [
      {
        signal: "interest:fundamentals",
        category: "interest",
        text: "You were drawn to the underlying rules behind molecular behavior.",
      },
      {
        signal: "mode:theory",
        category: "interest",
        text: "Your preferred question asks what the deeper model can explain.",
      },
      {
        signal: "purpose:fundamental",
        category: "style",
        text: "Here, clearer understanding is a valuable outcome by itself.",
      },
      {
        signal: "goal:interpret",
        category: "style",
        text: "The work turns abstract electronic information into careful chemical meaning.",
      },
    ],
    comparisonLens:
      "It focuses on interpreting electrons and bonds in molecules, rather than evaluating the computational approximation used to calculate them.",
    explorationFriendly: true,
  },
];

export const nicheById = Object.fromEntries(
  niches.map((niche) => [niche.id, niche]),
);
