import { definePhysicsNiche } from "@/data/pathfinders/computational-physics/niche-defaults";

export const computationalMethodDirections = [
  definePhysicsNiche({
    id: "numerical-methods-hpc-uncertainty",
    area: "Computational methods",
    name: "Numerical methods, high-performance computing & uncertainty",
    shortDescription:
      "Develop and evaluate reliable algorithms for physical models that demand accuracy, scale, and transparent uncertainty.",
    explanation:
      "Every simulation depends on choices about representation, solvers, precision, parallel work, and stopping criteria. Researchers in computational methods ask how those choices affect accuracy and cost, then build verification and uncertainty analysis into the workflow instead of treating computation as a black box.",
    questions: [
      "Which algorithm solves a physical model accurately with practical resources?",
      "How should a calculation divide work across many processors or accelerators?",
      "How do discretization, parameters, and finite samples affect a conclusion?",
    ],
    systems: [
      "Differential-equation solvers",
      "Large particle and grid simulations",
      "Multiscale physical models",
      "Simulation ensembles on parallel computers",
    ],
    approaches: [
      {
        name: "Verification and convergence testing",
        explanation:
          "Known solutions, conservation laws, and systematic resolution changes test whether code solves the intended equations correctly.",
      },
      {
        name: "Parallel algorithm design",
        explanation:
          "Computation and data movement are organized across processors or accelerators, then measured for scaling and bottlenecks.",
      },
      {
        name: "Uncertainty quantification",
        explanation:
          "Parameter, model, sampling, and numerical uncertainties are estimated and propagated to quantities of interest.",
      },
    ],
    concepts: [
      "Discretization error and convergence",
      "Algorithm stability and computational cost",
      "Parallelism and performance scaling",
      "Verification, validation, and uncertainty",
    ],
    preparation:
      "Begin with one familiar physical equation and two numerical methods. Compare error and runtime as resolution changes, verify against a known result, and name each uncertainty source separately.",
    keywords: [
      "computational physics numerical methods",
      "high performance scientific computing",
      "simulation verification validation",
      "uncertainty quantification physics",
      "convergence analysis",
      "parallel numerical algorithms",
      "scientific computing benchmarks",
    ],
    synonyms: [
      "physics scientific computing",
      "numerical algorithm development",
      "reliable high-performance simulation",
    ],
    searches: {
      orientation:
        "computational physics numerical methods uncertainty overview",
      focused:
        "simulation convergence verification uncertainty parallel algorithm benchmark",
      review:
        "recent review numerical methods uncertainty high performance scientific computing",
    },
    comparisonLens:
      "Compared with scientific machine learning and inverse problems, this direction emphasizes trustworthy forward simulation, numerical analysis, and computational performance.",
    explorationFriendly: true,
  }),
  definePhysicsNiche({
    id: "physics-informed-ml-inverse-problems",
    area: "Computational methods",
    name: "Physics-informed machine learning & inverse problems",
    shortDescription:
      "Combine physical constraints with data-driven models to infer hidden quantities, accelerate calculations, or build useful surrogates.",
    explanation:
      "Scientific machine learning can learn patterns from simulations and measurements while physical equations, symmetries, or conservation laws guide what solutions are plausible. Researchers compare data-driven methods with conventional baselines and test whether performance holds outside the training examples.",
    questions: [
      "Can measurements reveal unknown parameters, forces, or initial conditions?",
      "Can a learned surrogate reproduce an expensive simulation within stated limits?",
      "Which physical constraints improve reliability beyond the training data?",
    ],
    systems: [
      "Inverse problems from noisy measurements",
      "Fast surrogates for physical simulations",
      "Reduced-order models",
      "Data-assisted differential-equation models",
    ],
    approaches: [
      {
        name: "Inverse modeling",
        explanation:
          "Optimization or probabilistic inference works backward from observations to estimate hidden physical inputs and uncertainty.",
      },
      {
        name: "Physics-guided learning",
        explanation:
          "Equations, invariances, constraints, or simulation structure are incorporated into a learned model or its training objective.",
      },
      {
        name: "Surrogate validation",
        explanation:
          "Fast learned approximations are tested against physical baselines, withheld regimes, conservation checks, and uncertainty measures.",
      },
    ],
    concepts: [
      "Forward and inverse problems",
      "Optimization and probabilistic inference",
      "Training, validation, and distribution shift",
      "Physical constraints and surrogate error",
    ],
    preparation:
      "Begin with a small forward model whose parameters can be recovered from synthetic noisy data. Compare a simple optimization baseline with a learned method and test both on conditions not used during fitting.",
    keywords: [
      "physics informed machine learning",
      "inverse problems physics",
      "scientific machine learning",
      "simulation surrogate model",
      "physics guided neural network",
      "parameter inference",
      "reduced order modeling",
    ],
    synonyms: [
      "physics-informed AI",
      "data-driven computational physics",
      "machine learning for physical systems",
    ],
    searches: {
      orientation:
        "physics informed machine learning inverse problems overview",
      focused:
        "physics guided surrogate model inverse parameter inference validation",
      review: "recent review scientific machine learning computational physics",
    },
    comparisonLens:
      "Compared with numerical methods and high-performance computing, this direction centers inference and learned approximations while still requiring physical and numerical validation.",
  }),
];
