import { definePhysicsNiche } from "@/data/pathfinders/computational-physics/niche-defaults";

export const orbitalDynamicsDirections = [
  definePhysicsNiche({
    id: "orbital-n-body-dynamics",
    area: "Gravity and astrophysics",
    name: "Orbital & N-body dynamics",
    shortDescription:
      "Simulate how gravity shapes the motion and long-term stability of interacting astronomical bodies.",
    explanation:
      "N-body models follow objects whose gravitational pulls continually change one another’s motion. Researchers use them to study stable orbits, resonances, close encounters, and chaotic evolution while checking whether numerical errors could imitate a physical effect.",
    questions: [
      "Which orbital arrangements remain stable over long times?",
      "How do resonances move, trap, or eject planets and smaller bodies?",
      "When does a close encounter make an orbit unpredictable?",
    ],
    systems: [
      "Exoplanet systems",
      "Asteroids and comets",
      "Star clusters",
      "Planet–moon systems",
    ],
    approaches: [
      {
        name: "N-body integration",
        explanation:
          "Numerical integrators advance positions and velocities while approximating the coupled gravitational equations of motion.",
      },
      {
        name: "Stability and resonance analysis",
        explanation:
          "Researchers track orbital elements, conserved quantities, and characteristic frequencies to identify stable and chaotic behavior.",
      },
      {
        name: "Ensemble simulation",
        explanation:
          "Many nearby initial conditions are compared because measured orbits have uncertainty and chaotic systems amplify small differences.",
      },
    ],
    concepts: [
      "Newtonian gravity and orbital motion",
      "Energy and angular momentum",
      "Numerical integration and time steps",
      "Resonance, stability, and chaos",
    ],
    preparation:
      "Begin with a two-body orbit, verify conservation of energy and angular momentum, then add a third body and compare how the result changes with the time step and initial conditions.",
    keywords: [
      "N-body simulation",
      "orbital dynamics",
      "celestial mechanics",
      "orbital resonance",
      "dynamical stability",
      "symplectic integrator",
      "chaotic orbit",
    ],
    synonyms: [
      "gravitational many-body dynamics",
      "computational celestial mechanics",
      "planetary dynamics",
    ],
    searches: {
      orientation: "computational orbital dynamics N-body simulation overview",
      focused:
        "N-body orbital resonance long-term stability symplectic integration",
      review: "recent review computational celestial mechanics N-body methods",
    },
    comparisonLens:
      "Compared with galactic dynamics, this direction often resolves individual orbits in planetary or compact stellar systems rather than modeling an entire galaxy’s structure.",
    explorationFriendly: true,
  }),
  definePhysicsNiche({
    id: "spacecraft-trajectory-dynamics",
    area: "Gravity and astrophysics",
    name: "Spacecraft trajectory & mission dynamics",
    shortDescription:
      "Use gravitational models and numerical optimization to understand possible paths through space.",
    explanation:
      "Trajectory dynamics asks how a spacecraft can move through the gravity of planets, moons, and the Sun while respecting physical and engineering constraints. The computational challenge is to search many possible paths, test sensitivity to imperfect conditions, and distinguish an elegant mathematical orbit from a robust mission design.",
    questions: [
      "How can a gravity assist change a spacecraft’s speed and direction?",
      "Which transfer path balances travel time, energy, and robustness?",
      "How sensitive is a trajectory to launch or navigation uncertainty?",
    ],
    systems: [
      "Earth–Moon transfers",
      "Interplanetary missions",
      "Small-body rendezvous",
      "Orbits near gravitational balance points",
    ],
    approaches: [
      {
        name: "Restricted multi-body models",
        explanation:
          "Simplified gravitational models reveal families of useful trajectories near planets, moons, and balance points.",
      },
      {
        name: "Trajectory optimization",
        explanation:
          "Search algorithms adjust timing and maneuvers to satisfy destination, fuel, duration, and safety constraints.",
      },
      {
        name: "Sensitivity analysis",
        explanation:
          "Perturbed initial conditions and model parameters show whether a proposed path remains feasible when inputs are uncertain.",
      },
    ],
    concepts: [
      "Orbital energy and velocity changes",
      "Reference frames",
      "Initial-value and boundary-value problems",
      "Optimization and sensitivity",
    ],
    preparation:
      "Start by comparing a circular orbit with a simple transfer orbit. Visualize the trajectory in one reference frame, calculate its energy, and then explore how a small timing change affects arrival.",
    keywords: [
      "spacecraft trajectory optimization",
      "orbital transfer",
      "gravity assist",
      "restricted three-body problem",
      "mission design",
      "Lagrange point orbit",
      "trajectory sensitivity",
    ],
    synonyms: [
      "astrodynamics",
      "space mission design",
      "computational trajectory design",
    ],
    searches: {
      orientation: "computational astrodynamics trajectory design overview",
      focused:
        "restricted three body trajectory optimization gravity assist mission design",
      review: "recent review spacecraft trajectory optimization methods",
    },
    comparisonLens:
      "Compared with orbital N-body dynamics, this direction places more emphasis on controlled paths, constraints, and optimization than on explaining naturally evolving systems.",
  }),
];
