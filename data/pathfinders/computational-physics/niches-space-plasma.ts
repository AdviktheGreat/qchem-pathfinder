import { definePhysicsNiche } from "@/data/pathfinders/computational-physics/niche-defaults";

export const spacePlasmaDirections = [
  definePhysicsNiche({
    id: "heliophysics-space-weather",
    area: "Space plasma physics",
    name: "Heliophysics & space weather",
    shortDescription:
      "Model how solar plasma and magnetic disturbances travel through space and interact with planetary environments.",
    explanation:
      "Space weather links magnetic activity on the Sun to the solar wind, Earth’s magnetic environment, and technological effects. Researchers combine plasma models with spacecraft and ground observations while confronting sparse measurements and multiscale dynamics.",
    questions: [
      "How does a solar eruption propagate and change before reaching Earth?",
      "What controls energy transfer into a planetary magnetic environment?",
      "Which observations most improve a space-weather model’s forecast?",
    ],
    systems: [
      "Solar wind",
      "Coronal mass ejections",
      "Earth’s magnetosphere",
      "Auroral and radiation-belt regions",
    ],
    approaches: [
      {
        name: "Global magnetohydrodynamic modeling",
        explanation:
          "A conducting-fluid model follows large-scale plasma and magnetic-field evolution from the Sun to planetary space.",
      },
      {
        name: "Particle and hybrid simulation",
        explanation:
          "Selected particle species are represented kinetically when fluid models cannot capture acceleration or small-scale behavior.",
      },
      {
        name: "Observation-constrained modeling",
        explanation:
          "Spacecraft measurements and remote images initialize, test, or update simulations despite incomplete spatial coverage.",
      },
    ],
    concepts: [
      "Solar magnetic activity",
      "Magnetized plasma flow",
      "Magnetic reconnection",
      "Particles, fields, and sparse observations",
    ],
    preparation:
      "Begin with solar-wind pressure against a simple planetary magnetic field or analyze a public spacecraft time series. Identify the spatial assumptions behind any inference from a single measurement point.",
    keywords: [
      "space weather modeling",
      "heliophysics simulation",
      "solar wind magnetosphere",
      "coronal mass ejection propagation",
      "magnetic reconnection",
      "radiation belt modeling",
      "global MHD magnetosphere",
    ],
    synonyms: [
      "computational space plasma physics",
      "Sun-Earth system modeling",
      "numerical heliophysics",
    ],
    searches: {
      orientation: "computational heliophysics space weather overview",
      focused: "solar wind magnetosphere global MHD space weather simulation",
      review: "recent review space weather numerical modeling methods",
    },
    comparisonLens:
      "Compared with magnetic reconnection and kinetic plasma physics, this direction emphasizes system-scale Sun-to-planet evolution and observation-informed prediction.",
    explorationFriendly: true,
  }),
  definePhysicsNiche({
    id: "magnetic-reconnection-kinetic-plasma",
    area: "Space plasma physics",
    name: "Magnetic reconnection & kinetic plasma",
    shortDescription:
      "Investigate how magnetic energy is rapidly converted into particle motion, heat, and flows in collisionless plasmas.",
    explanation:
      "Magnetic reconnection occurs when field topology changes in a thin region where individual particle behavior matters. Simulations reveal processes that fluid models smooth over and help researchers connect microscopic dynamics with larger solar, planetary, and laboratory events.",
    questions: [
      "What initiates fast magnetic reconnection in a collisionless plasma?",
      "How are particles accelerated and heated near a reconnection region?",
      "How do kinetic effects change a larger-scale plasma event?",
    ],
    systems: [
      "Earth’s magnetotail",
      "Solar flares",
      "Laboratory reconnection experiments",
      "Collisionless plasma current sheets",
    ],
    approaches: [
      {
        name: "Particle-in-cell simulation",
        explanation:
          "Computational particles move through self-consistent electromagnetic fields, capturing non-fluid distributions and acceleration.",
      },
      {
        name: "Hybrid plasma modeling",
        explanation:
          "Some species are treated as particles and others as fluids to retain key kinetic effects at lower computational cost.",
      },
      {
        name: "Distribution-function analysis",
        explanation:
          "Velocity distributions, energy spectra, and field–particle relationships reveal how energy reaches different particle populations.",
      },
    ],
    concepts: [
      "Electromagnetic fields and charged particles",
      "Plasma distributions",
      "Magnetic topology and reconnection",
      "Kinetic versus fluid descriptions",
    ],
    preparation:
      "Begin by tracing charged particles in prescribed electric and magnetic fields. Then examine a small reconnection simulation and compare particle distributions inside and outside the active region.",
    keywords: [
      "magnetic reconnection simulation",
      "collisionless plasma",
      "particle in cell plasma",
      "kinetic plasma physics",
      "particle acceleration",
      "current sheet",
      "field particle interaction",
    ],
    synonyms: [
      "kinetic reconnection modeling",
      "collisionless reconnection simulation",
      "computational plasma kinetics",
    ],
    searches: {
      orientation: "magnetic reconnection kinetic plasma simulation overview",
      focused:
        "particle in cell collisionless reconnection particle acceleration",
      review: "recent review kinetic simulations magnetic reconnection",
    },
    comparisonLens:
      "Compared with heliophysics and space weather, this direction zooms into particle-scale energy conversion rather than modeling the entire Sun–planet system.",
  }),
];
