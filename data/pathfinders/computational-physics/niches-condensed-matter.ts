import { definePhysicsNiche } from "@/data/pathfinders/computational-physics/niche-defaults";

export const condensedMatterDirections = [
  definePhysicsNiche({
    id: "lattice-spin-models",
    area: "Condensed matter and many-body physics",
    name: "Lattice, spin & magnetic models",
    shortDescription:
      "Use simplified interacting-particle models to explore magnetism, order, frustration, and collective phases.",
    explanation:
      "Lattice and spin models deliberately remove chemical detail so researchers can isolate how interactions and geometry produce collective behavior. Computation samples configurations, tracks phase changes, and tests whether finite simulations represent a much larger physical system.",
    questions: [
      "How do local interactions produce large-scale magnetic order?",
      "What new behavior appears when interactions cannot all be satisfied?",
      "How can a finite simulated lattice reveal a phase transition?",
    ],
    systems: [
      "Ising and related spin models",
      "Frustrated magnetic lattices",
      "Disordered magnetic systems",
      "Simplified quantum magnets",
    ],
    approaches: [
      {
        name: "Monte Carlo sampling",
        explanation:
          "Randomly proposed configurations are sampled according to their statistical weight to estimate equilibrium observables.",
      },
      {
        name: "Exact diagonalization",
        explanation:
          "Small quantum systems are represented as matrices whose eigenstates reveal energy levels and correlations.",
      },
      {
        name: "Finite-size scaling",
        explanation:
          "Results from several lattice sizes are compared to infer behavior beyond the finite simulated system.",
      },
    ],
    concepts: [
      "Interactions and collective order",
      "Thermal and quantum fluctuations",
      "Phase transitions",
      "Sampling and finite-size effects",
    ],
    preparation:
      "Begin with a small Ising model. Plot magnetization and fluctuations across temperature, check sampling convergence, and compare multiple lattice sizes before locating a transition.",
    keywords: [
      "computational spin models",
      "Ising model Monte Carlo",
      "lattice magnetism",
      "frustrated magnetism",
      "finite size scaling",
      "magnetic phase transition",
      "exact diagonalization",
    ],
    synonyms: [
      "numerical statistical magnetism",
      "lattice many-body modeling",
      "computational magnetic models",
    ],
    searches: {
      orientation: "computational lattice spin models magnetism overview",
      focused:
        "Ising Monte Carlo finite size scaling magnetic phase transition",
      review: "recent review numerical methods lattice spin systems",
    },
    comparisonLens:
      "Compared with quantum many-body phases, this direction often begins with transparent lattice variables and equilibrium sampling rather than highly entangled quantum states.",
    explorationFriendly: true,
  }),
  definePhysicsNiche({
    id: "quantum-many-body-phases",
    area: "Condensed matter and many-body physics",
    name: "Quantum many-body phases",
    shortDescription:
      "Investigate how interacting quantum particles produce collective phases, correlations, and emergent behavior.",
    explanation:
      "Quantum many-body systems become difficult because the possible combined states grow extremely quickly. Researchers choose numerical representations that preserve the correlations most relevant to a lattice, dimension, or phase and use multiple diagnostics to avoid mistaking a method’s limits for new physics.",
    questions: [
      "Which collective phase emerges as interaction strength or density changes?",
      "How far do quantum correlations extend through a system?",
      "Which numerical method can represent the relevant entanglement accurately?",
    ],
    systems: [
      "Interacting lattice particles",
      "Quantum magnets",
      "Low-dimensional electron models",
      "Ultracold atoms in optical lattices",
    ],
    approaches: [
      {
        name: "Tensor-network methods",
        explanation:
          "Structured state representations compress important entanglement, especially in low-dimensional systems.",
      },
      {
        name: "Quantum Monte Carlo",
        explanation:
          "Stochastic sampling estimates quantum observables for models where probability weights can be handled reliably.",
      },
      {
        name: "Correlation and entanglement diagnostics",
        explanation:
          "Correlation functions, gaps, and entanglement measures distinguish candidate phases and transitions.",
      },
    ],
    concepts: [
      "Many-particle quantum states",
      "Correlation and entanglement",
      "Quantum phase transitions",
      "Approximation limits and computational scaling",
    ],
    preparation:
      "Start with two or a few interacting quantum sites and calculate energies and correlations exactly. Then compare with an approximate many-body method as system size grows.",
    keywords: [
      "quantum many body simulation",
      "tensor network",
      "quantum Monte Carlo",
      "quantum phase transition",
      "entanglement entropy",
      "correlation function",
      "lattice Hamiltonian",
    ],
    synonyms: [
      "numerical many-body physics",
      "computational quantum matter",
      "interacting quantum lattice systems",
    ],
    searches: {
      orientation: "computational quantum many body physics overview",
      focused:
        "tensor network quantum phase transition correlation entanglement lattice",
      review: "recent review numerical methods quantum many body systems",
    },
    comparisonLens:
      "Compared with lattice and spin models, this direction puts stronger emphasis on quantum entanglement and the scaling challenges of representing a combined quantum state.",
  }),
];
