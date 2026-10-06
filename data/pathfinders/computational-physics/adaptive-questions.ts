import { physicsUnsureOption } from "@/data/pathfinders/computational-physics/uncertainty-options";
import type { SurveyQuestion } from "@/lib/types";

export const computationalPhysicsAdaptiveQuestions: SurveyQuestion[] = [
  {
    id: "physics-astrophysics-focus",
    stage: "narrowing",
    kicker: "Narrow the cosmic system",
    title: "Which space-based system would you investigate first?",
    prompt:
      "Choose the physical system that makes you most curious; a later question will distinguish the kind of evidence you want to use.",
    type: "single",
    visibleWhen: {
      questionId: "physics-motivation",
      anyOf: ["space-universe"],
    },
    options: [
      {
        id: "natural-orbits",
        label: "Planets, moons, asteroids, or star clusters in motion",
        description:
          "Follow gravitational interactions, resonances, close encounters, and long-term stability.",
        signals: { "topic:orbital-dynamics": 3, "mode:dynamics": 2 },
      },
      {
        id: "mission-trajectories",
        label: "Spacecraft paths shaped by several gravitating bodies",
        description:
          "Search for transfers, gravity assists, and robust trajectories under practical constraints.",
        signals: { "topic:astrodynamics": 3, "mode:design": 2 },
      },
      {
        id: "stellar-lifecycles",
        label: "How stars change across their lifetimes",
        description:
          "Connect gravity, pressure, energy generation, and composition to observable stellar evolution.",
        signals: { "topic:stellar-evolution": 3, "scale:stellar": 2 },
      },
      {
        id: "extreme-stars",
        label: "Exploding stars, neutron stars, or black-hole environments",
        description:
          "Study rapid, extreme events where gravity, fluids, radiation, and magnetic fields interact.",
        signals: { "topic:compact-objects": 3, "mode:dynamics": 2 },
      },
      physicsUnsureOption,
    ],
  },
  {
    id: "physics-astrophysics-evidence",
    stage: "narrowing",
    kicker: "Choose the cosmic evidence",
    title: "Which cosmic pattern would you most like a simulation to explain?",
    prompt:
      "Pick the output or observation you would want to connect back to a physical model.",
    type: "single",
    visibleWhen: {
      questionId: "physics-motivation",
      anyOf: ["space-universe"],
    },
    options: [
      {
        id: "orbital-architecture",
        label: "The arrangement and stability of an orbital system",
        description:
          "Compare trajectories, conserved quantities, and nearby initial conditions over long times.",
        signals: { "topic:orbital-dynamics": 3, "evidence:trajectories": 2 },
      },
      {
        id: "stellar-observables",
        label: "A star’s brightness, temperature, composition, or oscillations",
        description:
          "Use observations to constrain internal structure, age, and uncertain stellar physics.",
        signals: { "topic:stellar-evolution": 3, "evidence:spectra": 2 },
      },
      {
        id: "cosmic-web",
        label: "The web of halos, clusters, filaments, and voids",
        description:
          "Summarize enormous simulated volumes with clustering and spatial statistics.",
        signals: { "topic:cosmological-structure": 3, "scale:cosmic": 2 },
      },
      {
        id: "galaxy-histories",
        label: "How individual galaxies assemble and change",
        description:
          "Connect gas, stars, feedback, mergers, and dark-matter environments to galaxy observations.",
        signals: { "topic:galaxy-evolution": 3, "mode:explain": 2 },
      },
      physicsUnsureOption,
    ],
  },
];
