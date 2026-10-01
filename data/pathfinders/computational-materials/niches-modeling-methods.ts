import type { Niche } from "@/lib/types";
import { materialsNicheDefaults } from "@/data/pathfinders/computational-materials/niche-defaults";

export const modelingMethodDirections: Niche[] = [
  {
    ...materialsNicheDefaults,
    id: "multiscale-materials-modeling",
    area: "Modeling across scales",
    name: "Multiscale materials modeling",
    shortDescription:
      "Connect atomic mechanisms, microstructure, and component behavior without pretending one model covers every scale.",
    explanation:
      "Material performance can begin with electronic bonding, pass through defects and grains, and appear as a component-scale response. Multiscale research decides what information should move between models at different length and time scales. The key challenge is preserving the mechanism and uncertainty while simplifying enough to make larger systems tractable.",
    questions: [
      "Which atomistic information is essential for the next modeling scale?",
      "How should a microstructure model represent defects, phases, or interfaces?",
      "Where does a scale-bridging approximation stop being reliable?",
    ],
    systems: [
      "Polycrystalline structural materials",
      "Composite and hierarchical materials",
      "Battery and fuel-cell components",
      "Soft materials and device-scale transport",
    ],
    approaches: [
      {
        name: "Sequential scale bridging",
        explanation:
          "Parameters or mechanisms from electronic and atomistic calculations inform larger microstructure or continuum models.",
      },
      {
        name: "Concurrent multiscale simulation",
        explanation:
          "Different resolutions operate together so a detailed region can interact with a larger simplified environment.",
      },
      {
        name: "Phase-field and finite-element modeling",
        explanation:
          "Continuum methods follow evolving microstructure, transport, stress, or device response over larger scales.",
      },
    ],
    concepts: [
      "Length and time scales",
      "Coarse-graining and effective properties",
      "Microstructure–property relationships",
      "Model assumptions and uncertainty transfer",
    ],
    preparation:
      "Start with two clearly defined scales and one quantity passed between them. A focused comparison is more instructive than attempting a fully coupled model before understanding each component.",
    keywords: [
      "multiscale materials modeling",
      "scale bridging",
      "atomistic to continuum",
      "phase field",
      "finite element",
      "coarse graining",
      "microstructure modeling",
    ],
    synonyms: [
      "hierarchical materials simulation",
      "integrated multiscale modeling",
      "cross-scale materials computation",
    ],
    searches: {
      orientation: "multiscale computational materials modeling overview",
      focused:
        "atomistic continuum scale bridging microstructure material simulation",
      review:
        "recent review multiscale materials modeling methods applications",
    },
    affinities: {
      "interest:fundamentals": 2,
      "interest:data-discovery": 1,
      "mode:explain": 3,
      "mode:predict": 3,
      "mode:compare": 2,
      "mode:theory": 2,
      "family:composite": 3,
      "phenomenon:mechanical": 2,
      "phenomenon:thermal": 2,
      "purpose:fundamental": 2,
      "purpose:applied": 2,
      "scale:microstructure": 3,
      "scale:device": 2,
      "scale:multiscale": 3,
      "medium:equations": 2,
      "style:coding": 2,
    },
    reasons: [
      {
        signal: "mode:explain",
        category: "interest",
        text: "You wanted to explain larger behavior through the mechanisms that produce it.",
      },
      {
        signal: "mode:predict",
        category: "interest",
        text: "Cross-scale models aim to predict performance while preserving smaller-scale physics.",
      },
      {
        signal: "scale:multiscale",
        category: "style",
        text: "You explicitly preferred connecting atomic, microstructural, and device scales.",
      },
      {
        signal: "family:composite",
        category: "style",
        text: "Composite and interfacial materials often require information from several structural levels.",
      },
    ],
    comparisonLens:
      "Compared with method evaluation, this direction uses several models to connect physical scales; its main target is the material system rather than benchmarking the models themselves.",
  },
  {
    ...materialsNicheDefaults,
    id: "method-potential-evaluation",
    area: "Computational methods",
    name: "Method & interatomic-potential evaluation",
    shortDescription:
      "Test when computational approximations are reliable enough for a particular materials question.",
    explanation:
      "Every computational materials result depends on approximations. Researchers compare electronic-structure methods, force fields, machine-learned interatomic potentials, numerical settings, and reference data to learn which errors matter for a target property. The goal is not one universally best method, but evidence about fitness for purpose.",
    questions: [
      "Which method reproduces the reference properties that matter for the intended use?",
      "How does accuracy change across compositions, structures, defects, and conditions?",
      "What computational cost and uncertainty are acceptable for the larger workflow?",
    ],
    systems: [
      "DFT functional and basis-set comparisons",
      "Classical force fields",
      "Machine-learned interatomic potentials",
      "Reference datasets spanning defects, phases, and surfaces",
    ],
    approaches: [
      {
        name: "Benchmark dataset design",
        explanation:
          "A representative set of structures and properties tests the cases a method is expected to handle.",
      },
      {
        name: "Error and sensitivity analysis",
        explanation:
          "Comparisons separate systematic bias, numerical settings, uncertainty, and outlier behavior rather than reporting one average score.",
      },
      {
        name: "Potential validation in simulation",
        explanation:
          "A force field or learned potential is tested on physical behavior beyond the data used to fit it, including stability and dynamics.",
      },
    ],
    concepts: [
      "Approximation and numerical convergence",
      "Reference data and transferability",
      "Error metrics and uncertainty",
      "Accuracy–cost tradeoffs",
    ],
    preparation:
      "Begin with one property, two or three methods, and a trusted reference. Keep the scientific use case visible so a small numerical error is not confused with a meaningful physical improvement.",
    keywords: [
      "materials method benchmarking",
      "interatomic potential validation",
      "DFT functional comparison",
      "force field evaluation",
      "machine learned potential",
      "transferability",
      "uncertainty quantification",
    ],
    synonyms: [
      "computational materials benchmarking",
      "potential validation",
      "method fitness for purpose",
    ],
    searches: {
      orientation:
        "computational materials method benchmarking potential validation overview",
      focused:
        "DFT functional interatomic potential accuracy transferability benchmark materials",
      review:
        "recent review benchmarking machine learned interatomic potentials materials",
    },
    affinities: {
      "interest:fundamentals": 2,
      "interest:data-discovery": 2,
      "mode:compare": 3,
      "mode:predict": 2,
      "mode:theory": 3,
      "purpose:fundamental": 3,
      "connection:theory": 3,
      "medium:equations": 2,
      "medium:data": 3,
      "style:coding": 3,
      "style:compare": 3,
      "style:data": 2,
    },
    reasons: [
      {
        signal: "mode:compare",
        category: "interest",
        text: "You chose comparing computational methods as a research question you would enjoy.",
      },
      {
        signal: "mode:theory",
        category: "interest",
        text: "This direction probes the assumptions and limits behind computational descriptions of materials.",
      },
      {
        signal: "style:compare",
        category: "style",
        text: "Careful side-by-side comparisons are the central evidence in method evaluation.",
      },
      {
        signal: "medium:data",
        category: "style",
        text: "Error distributions and benchmark tables match your interest in working with datasets.",
      },
    ],
    comparisonLens:
      "Compared with multiscale modeling, this direction makes accuracy, transferability, uncertainty, and computational cost of the methods themselves the research target.",
    explorationFriendly: true,
  },
];
