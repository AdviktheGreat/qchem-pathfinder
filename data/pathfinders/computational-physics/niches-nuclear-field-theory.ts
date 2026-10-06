import { definePhysicsNiche } from "@/data/pathfinders/computational-physics/niche-defaults";

export const nuclearFieldTheoryDirections = [
  definePhysicsNiche({
    id: "nuclear-structure-reactions",
    area: "Nuclear and field computation",
    name: "Nuclear structure & reactions",
    shortDescription:
      "Model how protons and neutrons organize inside nuclei and rearrange during reactions or decays.",
    explanation:
      "Nuclear systems combine strong interactions, quantum many-body behavior, and a wide range of relevant energies. Researchers choose approximations suited to particular nuclei or reactions, compare them with measured levels and probabilities, and quantify how model choices affect predictions.",
    questions: [
      "How do nuclear interactions produce observed energy levels and shapes?",
      "Which reaction pathways dominate under a chosen energy or environment?",
      "How uncertain is a prediction for a nucleus that is difficult to measure?",
    ],
    systems: [
      "Light and medium-mass nuclei",
      "Exotic neutron-rich nuclei",
      "Nuclear decays",
      "Low-energy nuclear reactions",
    ],
    approaches: [
      {
        name: "Nuclear many-body calculation",
        explanation:
          "Basis expansions, configuration methods, or density-based approximations estimate quantum states and observables.",
      },
      {
        name: "Reaction modeling",
        explanation:
          "Scattering and reaction frameworks calculate probabilities for transfer, breakup, capture, or decay processes.",
      },
      {
        name: "Uncertainty and calibration analysis",
        explanation:
          "Interaction parameters and approximation errors are tested against measurements and propagated to predictions.",
      },
    ],
    concepts: [
      "Quantum states and angular momentum",
      "Proton–neutron interactions",
      "Energy levels, decay, and scattering",
      "Many-body approximations and uncertainty",
    ],
    preparation:
      "Begin with a simple bound-state or scattering model and reproduce a known energy or probability. Vary the interaction or basis size before extending the calculation to a less measured system.",
    keywords: [
      "computational nuclear structure",
      "nuclear reaction modeling",
      "nuclear many body methods",
      "nuclear shell model",
      "nuclear density functional",
      "reaction cross section",
      "nuclear theory uncertainty",
    ],
    synonyms: [
      "numerical nuclear physics",
      "computational nuclear theory",
      "nuclear many-body computation",
    ],
    searches: {
      orientation: "computational nuclear structure reactions overview",
      focused: "nuclear many body reaction modeling uncertainty quantification",
      review: "recent review computational methods nuclear structure reactions",
    },
    comparisonLens:
      "Compared with lattice field theory, this direction usually begins with nuclei and effective interactions rather than discretizing a fundamental quantum field theory in spacetime.",
    explorationFriendly: true,
  }),
  definePhysicsNiche({
    id: "lattice-field-theory",
    area: "Nuclear and field computation",
    name: "Lattice field theory",
    shortDescription:
      "Discretize quantum fields on a spacetime lattice to calculate strongly interacting phenomena from a field theory.",
    explanation:
      "Some quantum field theories cannot be treated reliably with a small correction around a simple solution. Lattice methods turn fields into finite variables on a grid, sample important configurations, and extrapolate carefully toward larger volumes, finer spacing, and physical parameters.",
    questions: [
      "Which particle properties emerge from a strongly interacting field theory?",
      "How do finite lattice spacing and volume affect an observable?",
      "What computation is required to approach physical masses or temperatures?",
    ],
    systems: [
      "Strong-interaction field configurations",
      "Hadron masses and matrix elements",
      "Finite-temperature field theory",
      "Simplified lattice gauge models",
    ],
    approaches: [
      {
        name: "Lattice discretization",
        explanation:
          "Continuous spacetime fields are represented on a finite grid with an action designed to recover the target theory in a limit.",
      },
      {
        name: "Monte Carlo field sampling",
        explanation:
          "Field configurations are generated according to their statistical weight so ensemble averages approximate observables.",
      },
      {
        name: "Continuum and volume extrapolation",
        explanation:
          "Calculations at multiple grid spacings and volumes estimate and remove leading discretization and finite-size effects.",
      },
    ],
    concepts: [
      "Quantum fields and symmetries",
      "Spacetime discretization",
      "Monte Carlo path-integral sampling",
      "Continuum and finite-volume limits",
    ],
    preparation:
      "Begin with a small classical lattice field or simplified gauge model. Measure a correlation function, test sampling convergence, and compare several lattice sizes before approaching full quantum field calculations.",
    keywords: [
      "lattice field theory",
      "lattice gauge theory",
      "lattice QCD computation",
      "Monte Carlo gauge fields",
      "continuum extrapolation",
      "finite volume effects",
      "field correlation function",
    ],
    synonyms: [
      "computational lattice gauge theory",
      "numerical quantum field theory",
      "spacetime-lattice simulation",
    ],
    searches: {
      orientation: "computational lattice field theory overview",
      focused:
        "lattice gauge Monte Carlo continuum extrapolation finite volume",
      review: "recent review numerical lattice field theory methods",
    },
    comparisonLens:
      "Compared with nuclear structure and reaction modeling, this direction places the underlying quantum fields and continuum-limit calculation at the center.",
  }),
];
