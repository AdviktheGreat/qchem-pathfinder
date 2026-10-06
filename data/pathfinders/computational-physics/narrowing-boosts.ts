type OptionBoosts = Record<string, Record<string, number>>;

// The first key is a narrowing question, the second is one of its answers, and
// the final map names the directions that answer directly supports.
export const physicsNarrowingBoosts: Record<string, OptionBoosts> = {
  "physics-astrophysics-focus": {
    "natural-orbits": { "orbital-n-body-dynamics": 6 },
    "mission-trajectories": { "spacecraft-trajectory-dynamics": 6 },
    "stellar-lifecycles": { "stellar-structure-evolution": 6 },
    "extreme-stars": { "supernova-compact-object-simulation": 6 },
  },
  "physics-astrophysics-evidence": {
    "orbital-architecture": { "orbital-n-body-dynamics": 6 },
    "stellar-observables": { "stellar-structure-evolution": 6 },
    "cosmic-web": { "cosmological-structure-formation": 6 },
    "galaxy-histories": { "galaxy-formation-evolution": 6 },
  },
  "physics-fluids-focus": {
    "turbulent-structures": { "turbulence-coherent-structures": 6 },
    "transport-interfaces": { "transport-multiphase-flow": 6 },
    "weather-ocean": { "atmospheric-ocean-dynamics": 6 },
    "climate-coupling": { "climate-earth-system-modeling": 6 },
  },
  "physics-fluids-evidence": {
    "vorticity-spectrum": { "turbulence-coherent-structures": 6 },
    "conservation-transport": { "transport-multiphase-flow": 6 },
    "circulation-tracers": { "atmospheric-ocean-dynamics": 6 },
    "ensemble-feedbacks": { "climate-earth-system-modeling": 6 },
  },
  "physics-quantum-focus": {
    "driven-control": { "quantum-dynamics-control": 6 },
    "noise-decoherence": { "open-quantum-systems": 6 },
    "interacting-quantum": { "quantum-many-body-phases": 6 },
    "quantum-magnetism": { "lattice-spin-models": 6 },
  },
  "physics-quantum-evidence": {
    "state-populations": { "quantum-dynamics-control": 6 },
    "coherence-decay": { "open-quantum-systems": 6 },
    "correlations-entanglement": { "quantum-many-body-phases": 6 },
    "magnetization-fluctuations": { "lattice-spin-models": 6 },
  },
  "physics-condensed-focus": {
    "magnetic-order": { "lattice-spin-models": 6 },
    "quantum-phases": { "quantum-many-body-phases": 6 },
    "critical-change": { "phase-transitions-critical-phenomena": 6 },
    "driven-collective": { "nonequilibrium-statistical-physics": 6 },
  },
  "physics-condensed-evidence": {
    "spin-configurations": { "lattice-spin-models": 6 },
    "entanglement-gap": { "quantum-many-body-phases": 6 },
    "size-collapse": { "phase-transitions-critical-phenomena": 6 },
    "relaxation-current": { "nonequilibrium-statistical-physics": 6 },
  },
  "physics-plasma-focus": {
    "magnetic-fusion": { "magnetic-confinement-fusion": 6 },
    "laser-plasma": { "laser-driven-high-energy-density-plasma": 6 },
    "sun-earth": { "heliophysics-space-weather": 6 },
    "reconnection-region": { "magnetic-reconnection-kinetic-plasma": 6 },
  },
  "physics-plasma-evidence": {
    "confinement-profiles": { "magnetic-confinement-fusion": 6 },
    "shock-compression": { "laser-driven-high-energy-density-plasma": 6 },
    "spacecraft-series": { "heliophysics-space-weather": 6 },
    "particle-distributions": {
      "magnetic-reconnection-kinetic-plasma": 6,
    },
  },
  "physics-particle-nuclear-focus": {
    "collision-events": { "particle-collision-simulation": 6 },
    "detector-signals": { "detector-response-reconstruction": 6 },
    "nuclear-structure": { "nuclear-structure-reactions": 6 },
    "fields-on-lattice": { "lattice-field-theory": 6 },
  },
  "physics-particle-nuclear-evidence": {
    "event-distributions": { "particle-collision-simulation": 6 },
    "response-resolution": { "detector-response-reconstruction": 6 },
    "levels-cross-sections": { "nuclear-structure-reactions": 6 },
    "correlation-continuum": { "lattice-field-theory": 6 },
  },
  "physics-complex-focus": {
    "chaotic-transition": { "nonlinear-dynamics-chaos": 6 },
    "network-collective": { "network-emergent-dynamics": 6 },
    "critical-emergence": { "phase-transitions-critical-phenomena": 6 },
    "driven-fluctuations": { "nonequilibrium-statistical-physics": 6 },
  },
  "physics-complex-evidence": {
    "phase-attractor": { "nonlinear-dynamics-chaos": 6 },
    "topology-outcome": { "network-emergent-dynamics": 6 },
    "critical-scaling": { "phase-transitions-critical-phenomena": 6 },
    "trajectory-ensemble": { "nonequilibrium-statistical-physics": 6 },
  },
  "physics-methods-focus": {
    "solver-accuracy": { "numerical-methods-hpc-uncertainty": 6 },
    "parallel-scale": { "numerical-methods-hpc-uncertainty": 6 },
    "infer-hidden": { "physics-informed-ml-inverse-problems": 6 },
    "fast-surrogate": { "physics-informed-ml-inverse-problems": 6 },
  },
  "physics-methods-evidence": {
    "convergence-known-case": { "numerical-methods-hpc-uncertainty": 6 },
    "scaling-reproducible": { "numerical-methods-hpc-uncertainty": 6 },
    "calibrated-uncertainty": { "physics-informed-ml-inverse-problems": 6 },
    "outside-training": { "physics-informed-ml-inverse-problems": 6 },
  },
  "physics-open-system": {
    "cosmic-motion": {
      "orbital-n-body-dynamics": 6,
      "cosmological-structure-formation": 3,
    },
    "flowing-fields": {
      "turbulence-coherent-structures": 5,
      "heliophysics-space-weather": 3,
    },
    "quantum-collective": {
      "phase-transitions-critical-phenomena": 6,
      "quantum-dynamics-control": 3,
    },
    "subatomic-signals": {
      "particle-collision-simulation": 6,
      "nuclear-structure-reactions": 3,
    },
  },
  "physics-open-method": {
    "evolve-system": {
      "nonlinear-dynamics-chaos": 6,
      "orbital-n-body-dynamics": 3,
    },
    "infer-cause": {
      "detector-response-reconstruction": 6,
      "physics-informed-ml-inverse-problems": 3,
    },
    "compare-reliability": {
      "numerical-methods-hpc-uncertainty": 6,
      "lattice-field-theory": 3,
    },
    "visualize-mechanism": {
      "galaxy-formation-evolution": 6,
      "turbulence-coherent-structures": 3,
    },
  },
};
