import { definePhysicsNiche } from "@/data/pathfinders/computational-physics/niche-defaults";

export const statisticalMechanicsDirections = [
  definePhysicsNiche({
    id: "phase-transitions-critical-phenomena",
    area: "Statistical and nonlinear physics",
    name: "Phase transitions & critical phenomena",
    shortDescription:
      "Explore how many interacting parts collectively switch phases and develop fluctuations across many scales.",
    explanation:
      "Near a continuous phase transition, a system can show large fluctuations and patterns that look related across different sizes. Researchers use simulation and finite-size scaling to connect a manageable computational system with idealized large-system behavior.",
    questions: [
      "How does an order parameter change across a phase transition?",
      "Which fluctuation patterns signal a critical point?",
      "Do different microscopic models share the same large-scale behavior?",
    ],
    systems: [
      "Magnetic lattice models",
      "Percolation networks",
      "Binary mixtures",
      "Collective ordering models",
    ],
    approaches: [
      {
        name: "Monte Carlo simulation",
        explanation:
          "Random sampling estimates equilibrium configurations and fluctuations across temperature or another control parameter.",
      },
      {
        name: "Finite-size scaling",
        explanation:
          "Measurements from several system sizes are rescaled to estimate transition points and critical behavior.",
      },
      {
        name: "Histogram and fluctuation analysis",
        explanation:
          "Order-parameter distributions, susceptibilities, and correlation lengths help distinguish crossover from transition behavior.",
      },
    ],
    concepts: [
      "Order parameters",
      "Fluctuations and correlations",
      "Critical points",
      "Universality and finite-size effects",
    ],
    preparation:
      "Begin with a small lattice or percolation model. Measure an order parameter across a control variable, examine fluctuations, and repeat for several sizes before estimating a transition.",
    keywords: [
      "computational phase transitions",
      "critical phenomena simulation",
      "finite size scaling",
      "order parameter",
      "critical exponent",
      "correlation length",
      "Monte Carlo statistical physics",
    ],
    synonyms: [
      "numerical critical phenomena",
      "computational phase-transition physics",
      "statistical mechanics of criticality",
    ],
    searches: {
      orientation:
        "computational phase transitions critical phenomena overview",
      focused:
        "Monte Carlo finite size scaling order parameter critical exponent",
      review: "recent review numerical methods critical phenomena",
    },
    comparisonLens:
      "Compared with non-equilibrium statistical physics, this direction often studies equilibrium phases and critical points rather than sustained currents, driving, or relaxation far from equilibrium.",
    explorationFriendly: true,
  }),
  definePhysicsNiche({
    id: "nonequilibrium-statistical-physics",
    area: "Statistical and nonlinear physics",
    name: "Non-equilibrium statistical physics",
    shortDescription:
      "Study collective systems that evolve, transport, relax, or remain driven away from equilibrium.",
    explanation:
      "Many physical systems carry currents, consume energy, age, or reorganize without settling into an equilibrium distribution. Computational researchers model microscopic rules and stochastic events, then search for robust macroscopic laws, timescales, and fluctuation patterns.",
    questions: [
      "How does a system relax after a sudden change?",
      "What steady patterns emerge under continuous driving?",
      "How do rare fluctuations control transport or switching events?",
    ],
    systems: [
      "Diffusion and transport models",
      "Driven lattice gases",
      "Glassy relaxation",
      "Active particles and self-organizing matter",
    ],
    approaches: [
      {
        name: "Stochastic simulation",
        explanation:
          "Random events are generated according to physical rates to follow noisy trajectories and evolving distributions.",
      },
      {
        name: "Kinetic and master-equation modeling",
        explanation:
          "Equations for state probabilities or populations describe transitions, transport, and relaxation.",
      },
      {
        name: "Time-correlation and rare-event analysis",
        explanation:
          "Trajectories are analyzed for relaxation times, currents, fluctuations, and infrequent but influential transitions.",
      },
    ],
    concepts: [
      "Stochastic processes",
      "Relaxation and steady states",
      "Transport and currents",
      "Fluctuation and rare events",
    ],
    preparation:
      "Start with a random walk, diffusion process, or small kinetic model. Compare ensemble averages with individual trajectories and confirm that the simulation reproduces a known limiting case.",
    keywords: [
      "nonequilibrium statistical mechanics",
      "stochastic simulation physics",
      "driven dissipative system",
      "kinetic Monte Carlo",
      "relaxation dynamics",
      "fluctuation theorem",
      "active matter simulation",
    ],
    synonyms: [
      "non-equilibrium statistical physics",
      "computational stochastic dynamics",
      "driven many-particle systems",
    ],
    searches: {
      orientation: "computational nonequilibrium statistical physics overview",
      focused:
        "stochastic simulation driven system relaxation transport fluctuations",
      review: "recent review numerical nonequilibrium statistical mechanics",
    },
    comparisonLens:
      "Compared with phase transitions and critical phenomena, this direction centers time evolution, transport, and driven states that need not have an equilibrium description.",
  }),
];
