import { definePhysicsNiche } from "@/data/pathfinders/computational-physics/niche-defaults";

export const particleDetectorDirections = [
  definePhysicsNiche({
    id: "particle-collision-simulation",
    area: "Particle and nuclear physics",
    name: "Particle collisions & event simulation",
    shortDescription:
      "Model particle interactions and the complex showers of observable particles produced in high-energy collisions.",
    explanation:
      "Collision simulations connect theoretical interaction probabilities with the particles a detector could observe. Researchers combine calculations at different scales, generate many random events, and compare distributions rather than expecting one simulated event to reproduce one measured collision.",
    questions: [
      "Which measurable event patterns distinguish a process from its backgrounds?",
      "How do theoretical and simulation approximations change a predicted distribution?",
      "How many events are needed to resolve a rare signal?",
    ],
    systems: [
      "Collider particle events",
      "Particle decay chains",
      "Jets and particle showers",
      "Neutrino interaction samples",
    ],
    approaches: [
      {
        name: "Monte Carlo event generation",
        explanation:
          "Random sampling produces many possible collision and decay outcomes according to calculated probabilities.",
      },
      {
        name: "Particle-shower modeling",
        explanation:
          "Approximate branching processes connect a high-energy interaction to sprays of lower-energy observable particles.",
      },
      {
        name: "Distribution and uncertainty comparison",
        explanation:
          "Histograms and statistical tests compare simulated signals and backgrounds while tracking theory and sampling uncertainty.",
      },
    ],
    concepts: [
      "Particles, interactions, and decays",
      "Probability and cross sections",
      "Monte Carlo event samples",
      "Signal, background, and uncertainty",
    ],
    preparation:
      "Begin with a simple two-body decay or public event sample. Verify conservation laws, compare simulated distributions with analytic expectations, and keep statistical uncertainty visible.",
    keywords: [
      "particle collision simulation",
      "Monte Carlo event generator",
      "particle shower modeling",
      "high energy physics simulation",
      "signal background analysis",
      "event kinematics",
      "collision uncertainty",
    ],
    synonyms: [
      "computational particle phenomenology",
      "high-energy event simulation",
      "collider Monte Carlo modeling",
    ],
    searches: {
      orientation: "particle collision Monte Carlo simulation overview",
      focused:
        "event generator particle shower signal background distribution analysis",
      review: "recent review Monte Carlo methods particle collision physics",
    },
    comparisonLens:
      "Compared with detector response and reconstruction, this direction centers the underlying interaction and generated particles before instrument effects are applied.",
    explorationFriendly: true,
  }),
  definePhysicsNiche({
    id: "detector-response-reconstruction",
    area: "Particle and nuclear physics",
    name: "Detector response & event reconstruction",
    shortDescription:
      "Simulate how particles produce instrument signals and infer the most likely physical event from incomplete measurements.",
    explanation:
      "Detectors do not observe particles directly; they record energy deposits, timing, light, charge, or tracks. Computational physicists model this response and develop reconstruction methods while measuring efficiency, resolution, bias, and uncertainty.",
    questions: [
      "How does a particle’s path and energy become a detector signal?",
      "Which reconstruction method best recovers the original event?",
      "Where do detector inefficiency and calibration create bias?",
    ],
    systems: [
      "Tracking detectors",
      "Calorimeters",
      "Neutrino detectors",
      "Cosmic-ray and gamma-ray instruments",
    ],
    approaches: [
      {
        name: "Particle-transport simulation",
        explanation:
          "Particles are propagated through detector materials while interactions and energy deposits are sampled.",
      },
      {
        name: "Signal and track reconstruction",
        explanation:
          "Algorithms combine noisy detector readouts into candidate trajectories, energies, vertices, or event types.",
      },
      {
        name: "Efficiency and resolution studies",
        explanation:
          "Known simulated events test what is detected, how accurately properties are recovered, and where biases appear.",
      },
    ],
    concepts: [
      "Particle–matter interaction",
      "Measurement resolution and calibration",
      "Inverse problems",
      "Efficiency, bias, and validation",
    ],
    preparation:
      "Start with a simplified detector geometry or public reconstructed dataset. Trace one physical quantity from truth to signal to estimate and measure both efficiency and error.",
    keywords: [
      "detector simulation",
      "particle transport modeling",
      "event reconstruction",
      "track reconstruction",
      "detector response",
      "reconstruction efficiency",
      "detector resolution",
    ],
    synonyms: [
      "computational detector physics",
      "instrument-response simulation",
      "particle-event reconstruction",
    ],
    searches: {
      orientation:
        "computational particle detector simulation reconstruction overview",
      focused:
        "particle transport detector response event reconstruction efficiency resolution",
      review: "recent review detector simulation event reconstruction methods",
    },
    comparisonLens:
      "Compared with particle collision simulation, this direction focuses on how an instrument transforms a physical event into data and how that transformation is inverted.",
  }),
];
