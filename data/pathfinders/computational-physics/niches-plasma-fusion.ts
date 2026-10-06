import { definePhysicsNiche } from "@/data/pathfinders/computational-physics/niche-defaults";

export const plasmaFusionDirections = [
  definePhysicsNiche({
    id: "magnetic-confinement-fusion",
    area: "Plasma and fusion",
    name: "Magnetic-confinement fusion",
    shortDescription:
      "Model how hot charged particles move, transport energy, and develop instabilities inside magnetic confinement devices.",
    explanation:
      "A fusion plasma must remain hot and confined even though particles, fields, waves, and turbulence interact across many scales. Researchers use models of different fidelity to understand transport and stability, then compare simulations with diagnostics from experiments.",
    questions: [
      "Which instabilities limit plasma pressure or confinement?",
      "How does small-scale turbulence transport heat and particles?",
      "Which magnetic configurations make a plasma more stable or controllable?",
    ],
    systems: [
      "Tokamak plasmas",
      "Stellarator plasmas",
      "Magnetic-field configurations",
      "Plasma edge and exhaust regions",
    ],
    approaches: [
      {
        name: "Magnetohydrodynamic stability modeling",
        explanation:
          "A conducting-fluid approximation captures large-scale plasma motion and magnetic instabilities.",
      },
      {
        name: "Kinetic and gyrokinetic simulation",
        explanation:
          "Particle distributions and reduced charged-particle motion model effects that a fluid description misses.",
      },
      {
        name: "Simulation–diagnostic comparison",
        explanation:
          "Synthetic measurements allow modeled density, temperature, and fluctuations to be compared with experimental instruments.",
      },
    ],
    concepts: [
      "Charged-particle motion",
      "Magnetic confinement",
      "Plasma waves and instabilities",
      "Transport and multiscale modeling",
    ],
    preparation:
      "Begin with a charged particle moving in a simple magnetic field or an idealized fluid instability. Identify what the model averages over before interpreting a full-device plasma simulation.",
    keywords: [
      "magnetic confinement fusion",
      "tokamak simulation",
      "stellarator modeling",
      "plasma turbulence",
      "gyrokinetic simulation",
      "MHD stability",
      "plasma transport",
    ],
    synonyms: [
      "computational fusion plasma physics",
      "magnetically confined plasma modeling",
      "fusion confinement simulation",
    ],
    searches: {
      orientation: "computational magnetic confinement fusion overview",
      focused: "tokamak gyrokinetic plasma turbulence transport simulation",
      review: "recent review magnetic confinement plasma simulation methods",
    },
    comparisonLens:
      "Compared with laser-driven fusion, this direction focuses on sustained confinement by magnetic geometry rather than rapid compression by intense energy pulses.",
    explorationFriendly: true,
  }),
  definePhysicsNiche({
    id: "laser-driven-high-energy-density-plasma",
    area: "Plasma and fusion",
    name: "Laser-driven & high-energy-density plasma",
    shortDescription:
      "Simulate rapidly compressed, intensely heated matter where plasma, radiation, shocks, and particles interact.",
    explanation:
      "High-energy-density experiments create extreme states for very short times. Computational models connect laser or particle energy deposition to shocks, compression, heating, and possible fusion while tracking approximations in radiation, material response, and unresolved kinetic effects.",
    questions: [
      "How uniformly does a target compress under an intense energy pulse?",
      "Which instabilities disrupt a shock or compressed fuel layer?",
      "How do radiation and energetic particles redistribute energy?",
    ],
    systems: [
      "Inertial-confinement fusion targets",
      "Laser-produced plasmas",
      "Strong shocks in dense matter",
      "Laboratory astrophysics experiments",
    ],
    approaches: [
      {
        name: "Radiation-hydrodynamic simulation",
        explanation:
          "Fluid compression and heating are coupled to models of radiation transport and energy deposition.",
      },
      {
        name: "Particle-in-cell modeling",
        explanation:
          "Computational particles and electromagnetic fields capture kinetic effects in intense laser–plasma interactions.",
      },
      {
        name: "Instability and sensitivity studies",
        explanation:
          "Target imperfections and uncertain inputs are varied to identify which features most strongly affect compression or yield.",
      },
    ],
    concepts: [
      "Shock compression",
      "Laser–matter interaction",
      "Radiation transport",
      "Hydrodynamic and kinetic instabilities",
    ],
    preparation:
      "Start with a one-dimensional shock or energy-deposition model. Check mass and energy conservation and compare fluid and kinetic descriptions before studying a full fusion target.",
    keywords: [
      "high energy density plasma",
      "inertial confinement fusion simulation",
      "laser plasma interaction",
      "radiation hydrodynamics",
      "particle in cell",
      "shock compression",
      "Rayleigh Taylor instability",
    ],
    synonyms: [
      "computational high-energy-density physics",
      "laser-plasma simulation",
      "inertial fusion modeling",
    ],
    searches: {
      orientation: "computational high energy density plasma overview",
      focused:
        "laser plasma radiation hydrodynamics shock compression instability simulation",
      review: "recent review inertial confinement fusion numerical modeling",
    },
    comparisonLens:
      "Compared with magnetic-confinement fusion, this direction emphasizes rapid compression, shocks, radiation, and short-lived extreme states.",
  }),
];
