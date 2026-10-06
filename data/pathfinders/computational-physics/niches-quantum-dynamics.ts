import { definePhysicsNiche } from "@/data/pathfinders/computational-physics/niche-defaults";

export const quantumDynamicsDirections = [
  definePhysicsNiche({
    id: "quantum-dynamics-control",
    area: "Quantum and atomic physics",
    name: "Quantum dynamics & control",
    shortDescription:
      "Simulate how quantum states evolve and how carefully shaped fields can prepare, move, or protect them.",
    explanation:
      "Quantum-dynamics models follow probability amplitudes and phases rather than classical trajectories. Researchers compare time-propagation methods, design control pulses, and test how noise or modeling approximations alter the outcome.",
    questions: [
      "How does a quantum state respond to a changing external field?",
      "Which control pulse reaches a target state reliably?",
      "How do noise and parameter uncertainty limit a control strategy?",
    ],
    systems: [
      "Few-level quantum systems",
      "Trapped atoms and ions",
      "Superconducting circuits",
      "Quantum sensors",
    ],
    approaches: [
      {
        name: "Time-dependent state propagation",
        explanation:
          "Numerical algorithms advance a wavefunction or state vector under a changing Hamiltonian.",
      },
      {
        name: "Optimal control",
        explanation:
          "Optimization adjusts pulse shapes or control settings to reach a target while respecting physical constraints.",
      },
      {
        name: "Robustness analysis",
        explanation:
          "Noise, imperfect parameters, and alternative models are sampled to test whether a proposed protocol remains effective.",
      },
    ],
    concepts: [
      "Quantum states and measurement",
      "Time evolution and Hamiltonians",
      "Superposition and phase",
      "Control, noise, and fidelity",
    ],
    preparation:
      "Begin with a two-level system under a simple pulse. Visualize state populations and phase, reduce the time step to check convergence, and then add one realistic source of noise.",
    keywords: [
      "quantum dynamics simulation",
      "quantum optimal control",
      "time dependent Schrödinger equation",
      "state preparation",
      "quantum control pulse",
      "quantum fidelity",
      "robust quantum control",
    ],
    synonyms: [
      "time-dependent quantum simulation",
      "coherent quantum control",
      "computational quantum control",
    ],
    searches: {
      orientation: "computational quantum dynamics control overview",
      focused: "two level quantum optimal control pulse robustness simulation",
      review: "recent review numerical quantum optimal control methods",
    },
    comparisonLens:
      "Compared with open quantum systems, this direction often begins with intentionally driven coherent evolution and treats environmental effects as a limit on control.",
    explorationFriendly: true,
  }),
  definePhysicsNiche({
    id: "open-quantum-systems",
    area: "Quantum and atomic physics",
    name: "Open quantum systems",
    shortDescription:
      "Model quantum systems that exchange energy or information with an environment and therefore lose ideal coherence.",
    explanation:
      "No experimental quantum system is perfectly isolated. Open-system models describe relaxation, dephasing, measurement, and driven steady states while making explicit assumptions about what the environment remembers and how strongly it couples to the system.",
    questions: [
      "How quickly does an environment erase quantum coherence?",
      "When is a memoryless noise model a useful approximation?",
      "Can driving and dissipation create a stable non-equilibrium quantum state?",
    ],
    systems: [
      "Qubits coupled to noise",
      "Atoms interacting with light and surroundings",
      "Cavity quantum systems",
      "Small driven-dissipative lattices",
    ],
    approaches: [
      {
        name: "Master-equation simulation",
        explanation:
          "A density matrix evolves under coherent dynamics plus approximate environmental relaxation and dephasing terms.",
      },
      {
        name: "Quantum trajectories",
        explanation:
          "Stochastic pure-state histories provide an alternative picture of measurement and dissipation whose average reproduces open-system behavior.",
      },
      {
        name: "Steady-state and parameter analysis",
        explanation:
          "Solvers and scans identify long-time states and how observables change with driving, coupling, and noise rates.",
      },
    ],
    concepts: [
      "Density matrices",
      "Decoherence and relaxation",
      "System–environment coupling",
      "Stochastic dynamics and steady states",
    ],
    preparation:
      "Start with a two-level system undergoing one relaxation or dephasing process. Compare closed and open evolution, check trace and positivity, and state the environmental approximation clearly.",
    keywords: [
      "open quantum systems",
      "Lindblad master equation",
      "quantum decoherence",
      "quantum trajectories",
      "driven dissipative system",
      "density matrix simulation",
      "quantum noise modeling",
    ],
    synonyms: [
      "dissipative quantum dynamics",
      "quantum system environment modeling",
      "non-unitary quantum simulation",
    ],
    searches: {
      orientation: "computational open quantum systems overview",
      focused:
        "Lindblad master equation quantum trajectories decoherence simulation",
      review: "recent review numerical methods open quantum dynamics",
    },
    comparisonLens:
      "Compared with quantum dynamics and control, this direction makes environmental coupling, decoherence, and irreversible-looking behavior the central physical question.",
  }),
];
