import { definePhysicsNiche } from "@/data/pathfinders/computational-physics/niche-defaults";

export const complexSystemsDirections = [
  definePhysicsNiche({
    id: "nonlinear-dynamics-chaos",
    area: "Nonlinear and complex systems",
    name: "Nonlinear dynamics & chaos",
    shortDescription:
      "Investigate how feedback and sensitivity create oscillations, transitions, synchronization, and unpredictable motion.",
    explanation:
      "Nonlinear systems can change behavior abruptly even when their equations are compact. Researchers map long-term states, test sensitivity to initial conditions, and use geometric and statistical tools to distinguish deterministic chaos from noise or numerical error.",
    questions: [
      "When does a stable motion become oscillatory or chaotic?",
      "How quickly do nearby trajectories separate?",
      "Can coupled oscillators synchronize despite different starting states?",
    ],
    systems: [
      "Driven pendulums and oscillators",
      "Coupled oscillator networks",
      "Population and reaction models",
      "Low-dimensional models of complex physical systems",
    ],
    approaches: [
      {
        name: "Trajectory and phase-space analysis",
        explanation:
          "Time series are plotted in state space to reveal attractors, cycles, transitions, and accessible regions.",
      },
      {
        name: "Bifurcation analysis",
        explanation:
          "Control parameters are varied to locate qualitative changes in stable states and motion.",
      },
      {
        name: "Chaos diagnostics",
        explanation:
          "Lyapunov exponents, recurrence measures, and convergence checks help separate sensitive dynamics from numerical artifacts.",
      },
    ],
    concepts: [
      "Nonlinearity and feedback",
      "Phase space and attractors",
      "Bifurcations",
      "Sensitivity and deterministic chaos",
    ],
    preparation:
      "Begin with a logistic map or driven oscillator. Compare trajectories, draw a bifurcation diagram, and repeat with smaller numerical steps before interpreting sensitive behavior as physical chaos.",
    keywords: [
      "computational nonlinear dynamics",
      "chaos simulation",
      "bifurcation analysis",
      "Lyapunov exponent",
      "phase space attractor",
      "coupled oscillator synchronization",
      "sensitive dependence",
    ],
    synonyms: [
      "numerical chaos theory",
      "dynamical systems computation",
      "computational nonlinear systems",
    ],
    searches: {
      orientation: "computational nonlinear dynamics chaos overview",
      focused:
        "bifurcation diagram Lyapunov exponent coupled oscillator simulation",
      review: "recent review numerical methods nonlinear dynamical systems",
    },
    comparisonLens:
      "Compared with network and emergent dynamics, this direction often studies the geometry and stability of a small set of nonlinear state variables.",
    explorationFriendly: true,
  }),
  definePhysicsNiche({
    id: "network-emergent-dynamics",
    area: "Nonlinear and complex systems",
    name: "Network & emergent dynamics",
    shortDescription:
      "Model how interactions arranged in a network create spreading, synchronization, cascades, and collective patterns.",
    explanation:
      "Network models separate who interacts from the rules governing each interaction. Computational researchers compare topologies, simulate collective dynamics, and test whether an apparent pattern comes from local rules, network structure, finite size, or a chosen dataset.",
    questions: [
      "How does network structure change spreading or synchronization?",
      "Which nodes or links most strongly influence a collective outcome?",
      "When do local interactions create a sudden system-wide cascade?",
    ],
    systems: [
      "Coupled oscillator networks",
      "Transport and power-grid models",
      "Spatial and adaptive networks",
      "Idealized spreading and cascade systems",
    ],
    approaches: [
      {
        name: "Graph-based simulation",
        explanation:
          "States evolve on nodes and links under explicit interaction rules while network structure is varied or measured.",
      },
      {
        name: "Network statistics",
        explanation:
          "Degree, paths, communities, and centrality summarize structure and suggest mechanisms to test dynamically.",
      },
      {
        name: "Ensemble and intervention experiments",
        explanation:
          "Many network realizations and controlled link or node changes test whether a result is general and causal.",
      },
    ],
    concepts: [
      "Graphs, nodes, and links",
      "Local interaction and emergence",
      "Spreading, cascades, and synchronization",
      "Structural versus dynamical evidence",
    ],
    preparation:
      "Start with one simple process on several synthetic network types. Keep the dynamical rule fixed, vary the topology, and compare ensembles rather than relying on one visually striking network.",
    keywords: [
      "complex network dynamics",
      "network physics simulation",
      "emergent collective behavior",
      "cascade dynamics",
      "network synchronization",
      "spreading process",
      "graph dynamical system",
    ],
    synonyms: [
      "computational network science",
      "dynamics on networks",
      "complex-systems network modeling",
    ],
    searches: {
      orientation: "computational network dynamics emergence overview",
      focused:
        "network topology cascade synchronization ensemble simulation physics",
      review: "recent review dynamics on complex networks methods",
    },
    comparisonLens:
      "Compared with nonlinear dynamics and chaos, this direction emphasizes interaction topology and large collections of coupled units rather than a low-dimensional phase space.",
  }),
];
