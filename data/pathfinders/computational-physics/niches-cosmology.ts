import { definePhysicsNiche } from "@/data/pathfinders/computational-physics/niche-defaults";

export const cosmologyDirections = [
  definePhysicsNiche({
    id: "cosmological-structure-formation",
    area: "Cosmology and galaxies",
    name: "Cosmological structure formation",
    shortDescription:
      "Simulate how small early-universe variations grow into the cosmic web of galaxies and clusters.",
    explanation:
      "Structure-formation models evolve dark matter, gas, gravity, and cosmic expansion across enormous volumes. Researchers compare simulated clustering with observations while separating robust large-scale predictions from effects introduced by resolution and simplified small-scale physics.",
    questions: [
      "How do early density variations grow into filaments, halos, and voids?",
      "Which observable patterns distinguish competing cosmological parameters?",
      "How do simulation volume and resolution affect predicted structure?",
    ],
    systems: [
      "Dark-matter halos",
      "Galaxy clusters",
      "The cosmic web",
      "Large astronomical survey volumes",
    ],
    approaches: [
      {
        name: "Cosmological N-body simulation",
        explanation:
          "Large particle ensembles approximate the gravitational growth of dark-matter structure in an expanding universe.",
      },
      {
        name: "Hydrodynamic cosmological simulation",
        explanation:
          "Gas dynamics and models of star and black-hole activity are added to connect matter structure with observable galaxies.",
      },
      {
        name: "Clustering statistics",
        explanation:
          "Correlation functions, power spectra, and halo counts summarize structure so simulations can be compared with surveys.",
      },
    ],
    concepts: [
      "Cosmic expansion",
      "Gravity and density perturbations",
      "Dark matter and baryonic matter",
      "Power spectra and spatial statistics",
    ],
    preparation:
      "Start with particles evolving under gravity in a small expanding box or analyze an existing simulation snapshot. Learn one clustering statistic and test how it changes with sample size and resolution.",
    keywords: [
      "cosmological simulation",
      "large-scale structure",
      "cosmic web",
      "dark matter N-body",
      "matter power spectrum",
      "halo mass function",
      "structure formation",
    ],
    synonyms: [
      "numerical cosmology",
      "cosmic structure simulation",
      "large-scale universe modeling",
    ],
    searches: {
      orientation: "cosmological structure formation simulation overview",
      focused: "dark matter N-body cosmic web matter power spectrum resolution",
      review: "recent review numerical cosmology large scale structure methods",
    },
    comparisonLens:
      "Compared with galaxy-formation modeling, this direction emphasizes the universe’s statistical large-scale structure more than the detailed internal history of individual galaxies.",
    explorationFriendly: true,
  }),
  definePhysicsNiche({
    id: "galaxy-formation-evolution",
    area: "Cosmology and galaxies",
    name: "Galaxy formation & evolution",
    shortDescription:
      "Model how gravity, gas, stars, and energetic feedback assemble and reshape galaxies over cosmic time.",
    explanation:
      "Galaxy simulations connect processes operating from stellar neighborhoods to dark-matter halos. Because many small-scale processes cannot be resolved directly, researchers compare alternative subgrid models and ask which conclusions remain consistent across numerical choices and observations.",
    questions: [
      "How do gas inflow and outflow regulate a galaxy’s growth?",
      "What produces different galaxy shapes and star-formation histories?",
      "Which predictions depend most strongly on unresolved feedback models?",
    ],
    systems: [
      "Disk and elliptical galaxies",
      "Dwarf galaxies",
      "Merging galaxies",
      "Galaxies inside clusters",
    ],
    approaches: [
      {
        name: "Galaxy-scale hydrodynamic simulation",
        explanation:
          "Gravity and gas flow are evolved while approximate models represent star formation and energetic feedback.",
      },
      {
        name: "Zoom-in simulation",
        explanation:
          "A selected halo or galaxy is simulated at high resolution within its larger cosmological environment.",
      },
      {
        name: "Synthetic observation",
        explanation:
          "Simulated stars and gas are converted into images or spectra so the same measurements used on real galaxies can be compared.",
      },
    ],
    concepts: [
      "Dark-matter halos",
      "Gas cooling and star formation",
      "Feedback and scale coupling",
      "Resolution and subgrid modeling",
    ],
    preparation:
      "Begin by analyzing a small public galaxy-simulation dataset or a simplified gas-in-a-potential model. Compare one observable across systems and document which modeled processes could influence it.",
    keywords: [
      "galaxy formation simulation",
      "galaxy evolution modeling",
      "hydrodynamic cosmology",
      "stellar feedback",
      "galaxy merger simulation",
      "zoom-in simulation",
      "synthetic galaxy observation",
    ],
    synonyms: [
      "computational galaxy evolution",
      "numerical galaxy formation",
      "galaxy assembly modeling",
    ],
    searches: {
      orientation: "computational galaxy formation evolution overview",
      focused:
        "zoom-in hydrodynamic galaxy simulation feedback synthetic observations",
      review: "recent review numerical simulations galaxy formation feedback",
    },
    comparisonLens:
      "Compared with cosmological structure formation, this direction gives more attention to gas, stars, feedback, and the histories of individual galaxies.",
  }),
];
