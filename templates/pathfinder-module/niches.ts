import type { Niche } from "@/lib/types";

const starterPaperTypes = [
  "A recent review or perspective for the scientific landscape",
  "A tutorial or methods paper for the computational workflow",
  "One recent application paper with explicit assumptions and limitations",
];

type TemplateNicheInput = Omit<Niche, "paperTypes" | "explorationFriendly"> & {
  explorationFriendly?: boolean;
};

function defineTemplateNiche(input: TemplateNicheInput): Niche {
  return {
    ...input,
    paperTypes: [...starterPaperTypes],
    explorationFriendly: input.explorationFriendly ?? true,
  };
}

export const templatePathfinderNiches: Niche[] = [
  defineTemplateNiche({
    id: "interacting-system-dynamics",
    area: "Dynamic systems",
    name: "Dynamics of interacting systems",
    shortDescription:
      "Model how a small set of interacting parts changes, responds, and remains stable over time.",
    explanation:
      "Researchers translate interactions into a mathematical model, simulate its evolution, and test whether observed stability or change is physical rather than a numerical artifact.",
    questions: [
      "Which initial conditions produce stable or changing behavior?",
      "How does a controlled perturbation alter the system’s trajectory?",
      "Which simplified interactions preserve the behavior of interest?",
    ],
    systems: [
      "Coupled oscillators",
      "Interacting agents",
      "Small networks",
      "Feedback systems",
    ],
    approaches: [
      {
        name: "Time evolution",
        explanation: "Advance a model step by step and track state variables.",
      },
      {
        name: "Stability analysis",
        explanation: "Test how small perturbations grow or fade.",
      },
      {
        name: "Parameter sweeps",
        explanation: "Compare behavior across controlled model settings.",
      },
    ],
    concepts: [
      "State variables",
      "Feedback",
      "Stability",
      "Numerical integration",
    ],
    preparation:
      "Begin with one transparent model, identify every variable and assumption, and verify the behavior with a smaller time step or independent calculation.",
    keywords: [
      "dynamical system",
      "coupled model",
      "stability analysis",
      "time evolution",
      "parameter sweep",
    ],
    synonyms: [
      "interaction dynamics",
      "coupled-system simulation",
      "time-dependent modeling",
    ],
    searches: {
      orientation:
        "computational modeling interacting dynamical systems overview",
      focused: "coupled system stability numerical simulation parameter sweep",
      review: "interacting dynamical systems computational review perspective",
    },
    affinities: {
      "interest:systems": 3,
      "mode:explain": 3,
      "mode:predict": 2,
      "style:visual": 2,
      "style:mathematical": 2,
    },
    reasons: [
      {
        signal: "interest:systems",
        category: "interest",
        text: "You were drawn to interacting systems.",
      },
      {
        signal: "style:visual",
        category: "style",
        text: "Trajectories and state diagrams support visual reasoning.",
      },
    ],
    comparisonLens:
      "This direction emphasizes the evolution of a defined system; collective-emergence work shifts attention toward behavior created by many interacting parts.",
  }),
  defineTemplateNiche({
    id: "collective-emergent-behavior",
    area: "Complex systems",
    name: "Collective and emergent behavior",
    shortDescription:
      "Investigate how many simple interactions combine into patterns that are not obvious from one part alone.",
    explanation:
      "Computational experiments let researchers vary local rules, population size, and connectivity to determine which ingredients create a collective pattern and whether it persists across scales.",
    questions: [
      "Which local interactions are necessary for a collective pattern?",
      "When does the system switch between different large-scale states?",
      "How robust is the pattern to noise or missing connections?",
    ],
    systems: [
      "Agent populations",
      "Networked systems",
      "Collective motion",
      "Pattern-forming models",
    ],
    approaches: [
      {
        name: "Agent-based modeling",
        explanation: "Simulate many parts following explicit local rules.",
      },
      {
        name: "Network analysis",
        explanation: "Relate connectivity to collective outcomes.",
      },
      {
        name: "Scaling analysis",
        explanation: "Compare patterns as system size or resolution changes.",
      },
    ],
    concepts: ["Emergence", "Networks", "Collective states", "Scaling"],
    preparation:
      "Start with a small rule-based model, visualize individual and collective behavior, and separate a robust pattern from one caused by a particular size or random seed.",
    keywords: [
      "emergent behavior",
      "complex systems",
      "agent-based model",
      "collective dynamics",
      "network simulation",
    ],
    synonyms: [
      "collective phenomena",
      "self-organization",
      "many-agent dynamics",
    ],
    searches: {
      orientation:
        "computational collective emergent behavior complex systems overview",
      focused: "agent based model collective pattern scaling network dynamics",
      review: "emergent behavior computational complex systems review",
    },
    affinities: {
      "interest:systems": 3,
      "mode:explain": 3,
      "mode:compare": 2,
      "style:visual": 3,
      "style:computational": 2,
    },
    reasons: [
      {
        signal: "interest:systems",
        category: "interest",
        text: "You wanted to understand system-level behavior.",
      },
      {
        signal: "style:visual",
        category: "style",
        text: "Collective patterns are often explored through visual simulation.",
      },
    ],
    comparisonLens:
      "This direction centers patterns created by many parts; interacting-system dynamics can focus more narrowly on trajectories and stability in a smaller defined system.",
  }),
  defineTemplateNiche({
    id: "evidence-pattern-inference",
    area: "Data and inference",
    name: "Pattern discovery and scientific inference",
    shortDescription:
      "Use measurements, images, or distributions to infer structure that cannot be observed directly.",
    explanation:
      "Researchers connect a dataset to a scientific claim by choosing representations, comparing plausible explanations, and reporting uncertainty rather than treating a visible pattern as proof.",
    questions: [
      "Which features distinguish meaningful structure from noise?",
      "What hidden state best explains the available evidence?",
      "How sensitive is the conclusion to sampling or preprocessing choices?",
    ],
    systems: [
      "Image collections",
      "Repeated measurements",
      "Spatial maps",
      "Experimental datasets",
    ],
    approaches: [
      {
        name: "Feature analysis",
        explanation:
          "Represent evidence with interpretable measurable features.",
      },
      {
        name: "Statistical inference",
        explanation: "Compare explanations while quantifying uncertainty.",
      },
      {
        name: "Validation splits",
        explanation:
          "Test whether a pattern generalizes beyond the data used to find it.",
      },
    ],
    concepts: ["Sampling", "Uncertainty", "Features", "Validation"],
    preparation:
      "Begin with a small documented dataset, visualize missingness and variation, and state what the evidence can and cannot establish before fitting a complex model.",
    keywords: [
      "scientific inference",
      "pattern discovery",
      "feature analysis",
      "uncertainty quantification",
      "data validation",
    ],
    synonyms: [
      "evidence-based inference",
      "data pattern analysis",
      "latent structure inference",
    ],
    searches: {
      orientation:
        "computational scientific inference pattern discovery overview",
      focused: "measurement image feature analysis uncertainty validation",
      review: "scientific data inference computational review perspective",
    },
    affinities: {
      "interest:data": 3,
      "mode:explain": 2,
      "mode:compare": 2,
      "style:visual": 3,
      "style:computational": 2,
    },
    reasons: [
      {
        signal: "interest:data",
        category: "interest",
        text: "You were interested in learning from evidence.",
      },
      {
        signal: "style:visual",
        category: "style",
        text: "You may enjoy inspecting figures and spatial patterns.",
      },
    ],
    comparisonLens:
      "This direction emphasizes interpreting existing evidence; forecasting shifts the goal toward predicting observations not yet seen.",
  }),
  defineTemplateNiche({
    id: "data-driven-forecasting",
    area: "Data and prediction",
    name: "Data-driven forecasting",
    shortDescription:
      "Build and test models that predict how a measured system may behave under future conditions.",
    explanation:
      "Forecasting research uses ordered or repeated observations to estimate future outcomes, while testing baselines, distribution shifts, and uncertainty so predictive performance is not overstated.",
    questions: [
      "Which past measurements contain useful predictive information?",
      "How far ahead does a forecast remain reliable?",
      "When does a change in conditions invalidate the model?",
    ],
    systems: [
      "Sensor records",
      "Environmental series",
      "Population measurements",
      "Laboratory time series",
    ],
    approaches: [
      {
        name: "Baseline modeling",
        explanation:
          "Compare new forecasts with simple transparent alternatives.",
      },
      {
        name: "Time-aware validation",
        explanation:
          "Test on later observations without leaking future information.",
      },
      {
        name: "Uncertainty intervals",
        explanation: "Communicate a range of plausible predictions.",
      },
    ],
    concepts: [
      "Time series",
      "Generalization",
      "Distribution shift",
      "Predictive uncertainty",
    ],
    preparation:
      "Start with a clearly ordered dataset, construct a simple baseline, and keep future observations out of every fitting and tuning decision.",
    keywords: [
      "scientific forecasting",
      "time series model",
      "predictive uncertainty",
      "temporal validation",
      "distribution shift",
    ],
    synonyms: [
      "data-driven prediction",
      "time-dependent forecasting",
      "predictive modeling",
    ],
    searches: {
      orientation: "data driven scientific forecasting computational overview",
      focused:
        "time series prediction temporal validation uncertainty scientific data",
      review: "scientific forecasting predictive modeling review perspective",
    },
    affinities: {
      "interest:data": 3,
      "mode:predict": 3,
      "mode:compare": 2,
      "style:computational": 3,
      "style:mathematical": 2,
    },
    reasons: [
      {
        signal: "interest:data",
        category: "interest",
        text: "You wanted evidence to reveal what may happen next.",
      },
      {
        signal: "style:computational",
        category: "style",
        text: "Forecasting rewards iterative work with code and datasets.",
      },
    ],
    comparisonLens:
      "This direction evaluates prediction on future-like data; pattern inference may focus more on explaining structure in observations already collected.",
  }),
  defineTemplateNiche({
    id: "computational-method-evaluation",
    area: "Computational methods",
    name: "Evaluation of computational methods",
    shortDescription:
      "Determine when a computational approximation is accurate, interpretable, and trustworthy for a scientific task.",
    explanation:
      "Method evaluation compares algorithms against reference cases or independent evidence, isolates sources of error, and describes the regime where a conclusion remains dependable.",
    questions: [
      "Which approximation controls the largest source of error?",
      "Does apparent agreement persist across representative cases?",
      "What validation evidence supports using the method elsewhere?",
    ],
    systems: [
      "Reference benchmarks",
      "Simulated test cases",
      "Measured datasets",
      "Competing model families",
    ],
    approaches: [
      {
        name: "Benchmarking",
        explanation:
          "Compare methods on a controlled and representative test set.",
      },
      {
        name: "Error analysis",
        explanation: "Trace disagreement to assumptions or numerical choices.",
      },
      {
        name: "Sensitivity testing",
        explanation: "Vary inputs and settings to test robustness.",
      },
    ],
    concepts: ["Approximation", "Benchmark", "Validation", "Sensitivity"],
    preparation:
      "Begin with one small reference problem, define the comparison metric before running methods, and inspect failures rather than reporting only an average score.",
    keywords: [
      "computational benchmark",
      "method validation",
      "error analysis",
      "model comparison",
      "sensitivity analysis",
    ],
    synonyms: [
      "method assessment",
      "algorithm evaluation",
      "computational validation",
    ],
    searches: {
      orientation:
        "computational scientific method evaluation benchmarking overview",
      focused:
        "algorithm benchmark validation error sensitivity scientific model",
      review: "computational method validation benchmarking review",
    },
    affinities: {
      "interest:methods": 3,
      "mode:compare": 3,
      "mode:explain": 2,
      "style:mathematical": 3,
      "style:computational": 2,
    },
    reasons: [
      {
        signal: "interest:methods",
        category: "interest",
        text: "You were interested in how computational methods earn trust.",
      },
      {
        signal: "style:mathematical",
        category: "style",
        text: "Method comparison benefits from quantitative error reasoning.",
      },
    ],
    comparisonLens:
      "This direction centers evidence for accuracy and validity; efficient scientific computing centers runtime, scale, and computational resources.",
  }),
  defineTemplateNiche({
    id: "efficient-scientific-computing",
    area: "Computational methods",
    name: "Efficient scientific computing",
    shortDescription:
      "Improve algorithms and workflows so larger or more detailed scientific calculations become practical.",
    explanation:
      "Researchers study how runtime, memory, resolution, and parallel work affect a calculation while checking that efficiency gains do not erase the scientific behavior the model was meant to preserve.",
    questions: [
      "Which part of a workflow limits the achievable scale?",
      "How does computational cost grow with problem size?",
      "Which approximation saves resources without changing the conclusion?",
    ],
    systems: [
      "Large simulations",
      "Parameter ensembles",
      "Numerical solvers",
      "Parallel workflows",
    ],
    approaches: [
      {
        name: "Performance profiling",
        explanation: "Measure where time and memory are actually spent.",
      },
      {
        name: "Scaling experiments",
        explanation: "Track cost as the problem or resource count grows.",
      },
      {
        name: "Algorithm comparison",
        explanation: "Compare accuracy and cost on the same scientific task.",
      },
    ],
    concepts: [
      "Computational complexity",
      "Resolution",
      "Parallelism",
      "Accuracy–cost tradeoff",
    ],
    preparation:
      "Begin with a small reproducible calculation, measure its cost and accuracy, and change one algorithmic or resolution choice at a time.",
    keywords: [
      "scientific computing",
      "algorithm efficiency",
      "performance scaling",
      "numerical solver",
      "high performance computing",
    ],
    synonyms: [
      "computational performance",
      "scalable simulation",
      "efficient numerical methods",
    ],
    searches: {
      orientation: "efficient scientific computing numerical methods overview",
      focused: "simulation algorithm performance scaling accuracy cost",
      review: "scalable scientific computing numerical algorithms review",
    },
    affinities: {
      "interest:methods": 3,
      "mode:compare": 3,
      "mode:predict": 2,
      "style:computational": 3,
      "style:mathematical": 2,
    },
    reasons: [
      {
        signal: "interest:methods",
        category: "interest",
        text: "You were drawn to improving computational methods.",
      },
      {
        signal: "style:computational",
        category: "style",
        text: "This direction involves hands-on algorithm and workflow experiments.",
      },
    ],
    comparisonLens:
      "This direction emphasizes cost and scale while preserving a scientific result; method evaluation emphasizes accuracy, robustness, and validation evidence.",
  }),
];

export const templateOpenExplorationIds = [
  "interacting-system-dynamics",
  "evidence-pattern-inference",
  "computational-method-evaluation",
] as const;
