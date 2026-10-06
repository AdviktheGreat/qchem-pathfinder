import { definePhysicsNiche } from "@/data/pathfinders/computational-physics/niche-defaults";

export const stellarAstrophysicsDirections = [
  definePhysicsNiche({
    id: "stellar-structure-evolution",
    area: "Stars and compact objects",
    name: "Stellar structure & evolution",
    shortDescription:
      "Model how a star’s interior balances gravity, pressure, energy generation, and transport across its lifetime.",
    explanation:
      "Stellar-evolution calculations connect local physics inside a star to changes that unfold over millions or billions of years. Researchers solve coupled structure and composition equations, compare predicted tracks with observations, and study how uncertain inputs alter a star’s fate.",
    questions: [
      "How do mass and composition change a star’s lifetime and final state?",
      "Which physical inputs most strongly shift a predicted stellar track?",
      "How can observed brightness and temperature constrain a star’s age?",
    ],
    systems: [
      "Sun-like stars",
      "Massive stars",
      "White dwarfs",
      "Stars in clusters",
    ],
    approaches: [
      {
        name: "One-dimensional evolution models",
        explanation:
          "Coupled equations for pressure, temperature, luminosity, and composition are advanced through a star’s changing structure.",
      },
      {
        name: "Parameter studies",
        explanation:
          "Model grids vary mass, composition, mixing, and other uncertain inputs to reveal their effects on observable predictions.",
      },
      {
        name: "Observation–model comparison",
        explanation:
          "Predicted luminosities, temperatures, oscillations, or element abundances are tested against astronomical measurements.",
      },
    ],
    concepts: [
      "Hydrostatic balance",
      "Energy generation and transport",
      "Thermodynamics and equations of state",
      "Stellar lifecycles and nucleosynthesis",
    ],
    preparation:
      "Begin with hydrostatic balance and a simple polytropic star before exploring a public stellar-evolution model grid. Track which assumptions control one observable rather than attempting a complete star immediately.",
    keywords: [
      "stellar evolution modeling",
      "stellar structure equations",
      "hydrostatic equilibrium",
      "stellar nucleosynthesis",
      "evolutionary tracks",
      "stellar model grid",
      "asteroseismology modeling",
    ],
    synonyms: [
      "computational stellar evolution",
      "stellar interior modeling",
      "star evolution simulation",
    ],
    searches: {
      orientation: "computational stellar structure evolution overview",
      focused:
        "stellar evolution model grid mass metallicity evolutionary tracks",
      review: "recent review stellar evolution modeling uncertainties",
    },
    comparisonLens:
      "Compared with supernova and compact-object dynamics, this direction often follows a star’s comparatively gradual internal evolution rather than a violent multidimensional event.",
    explorationFriendly: true,
  }),
  definePhysicsNiche({
    id: "supernova-compact-object-simulation",
    area: "Stars and compact objects",
    name: "Supernova & compact-object simulation",
    shortDescription:
      "Investigate extreme stellar collapse, explosions, neutron stars, and black-hole environments through multiphysics models.",
    explanation:
      "Extreme stellar events combine gravity, fluid motion, radiation, magnetic fields, nuclear reactions, and sometimes relativistic effects. Computational researchers isolate pieces of this coupled problem, test how an explosion or merger begins, and connect simulated signals to telescopes and detectors.",
    questions: [
      "Which physical processes help a collapsing stellar core produce an explosion?",
      "How do magnetic fields shape matter around a neutron star or black hole?",
      "What observable light, particles, or waves should an extreme event produce?",
    ],
    systems: [
      "Core-collapse supernovae",
      "Neutron stars",
      "Black-hole accretion flows",
      "Compact-object mergers",
    ],
    approaches: [
      {
        name: "Radiation hydrodynamics",
        explanation:
          "Fluid equations are coupled to energy and particle transport to model hot, dense, rapidly changing matter.",
      },
      {
        name: "Magnetohydrodynamic simulation",
        explanation:
          "Magnetic fields and conducting fluid motion are evolved together to study jets, disks, and instabilities.",
      },
      {
        name: "Synthetic observables",
        explanation:
          "Simulated matter and fields are translated into predicted light curves, spectra, neutrino signals, or gravitational-wave features.",
      },
    ],
    concepts: [
      "Gravity in strong fields",
      "Compressible fluid dynamics",
      "Radiation and particle transport",
      "Shock waves and magnetic fields",
    ],
    preparation:
      "Choose one physical ingredient—such as shock propagation or accretion-disk motion—and study a simplified model first. Use conservation checks and resolution tests before interpreting an extreme-system visualization.",
    keywords: [
      "core collapse simulation",
      "compact object modeling",
      "supernova hydrodynamics",
      "neutron star simulation",
      "black hole accretion",
      "radiation magnetohydrodynamics",
      "synthetic observables",
    ],
    synonyms: [
      "computational high-energy astrophysics",
      "compact-object astrophysics simulation",
      "stellar explosion modeling",
    ],
    searches: {
      orientation: "computational supernova compact object simulation overview",
      focused:
        "core collapse supernova radiation hydrodynamics synthetic observables",
      review: "recent review numerical simulations compact object astrophysics",
    },
    comparisonLens:
      "Compared with stellar structure and evolution, this direction emphasizes rapid, multidimensional, strongly coupled dynamics under extreme conditions.",
  }),
];
