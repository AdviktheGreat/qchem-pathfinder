import type { ReasonRule } from "@/lib/types";

// Each explanation is gated by a scored signal, so results describe evidence
// from the student's answers rather than making generic personality claims.
export const physicsNicheReasons: Record<string, ReasonRule[]> = {
  "orbital-n-body-dynamics": [
    {
      signal: "topic:orbital-dynamics",
      category: "interest",
      text: "You chose naturally evolving orbits, resonances, and gravitational stability as a system to investigate.",
    },
    {
      signal: "evidence:trajectories",
      category: "style",
      text: "Following trajectories through time matches the evidence you most want to interpret.",
    },
  ],
  "spacecraft-trajectory-dynamics": [
    {
      signal: "topic:astrodynamics",
      category: "interest",
      text: "You were drawn to controlled paths through multi-body gravitational environments.",
    },
    {
      signal: "style:mathematical",
      category: "style",
      text: "This direction rewards your interest in equations, constraints, and carefully tested limiting cases.",
    },
  ],
  "stellar-structure-evolution": [
    {
      signal: "topic:stellar-evolution",
      category: "interest",
      text: "You want to connect a star’s internal physics with how it changes across its lifetime.",
    },
    {
      signal: "evidence:spectra",
      category: "style",
      text: "You chose observable signals such as spectra or oscillations as evidence worth explaining.",
    },
  ],
  "supernova-compact-object-simulation": [
    {
      signal: "topic:compact-objects",
      category: "interest",
      text: "You selected extreme stellar collapse, explosions, or compact-object environments as your focus.",
    },
    {
      signal: "style:simulation",
      category: "style",
      text: "You enjoy following a coupled physical model as a rapidly changing system evolves.",
    },
  ],
  "cosmological-structure-formation": [
    {
      signal: "topic:cosmological-structure",
      category: "interest",
      text: "You want to explain how early variations grow into the universe’s large-scale structure.",
    },
    {
      signal: "style:statistical",
      category: "style",
      text: "Your interest in distributions and statistical patterns fits comparisons across enormous simulated volumes.",
    },
  ],
  "galaxy-formation-evolution": [
    {
      signal: "topic:galaxy-evolution",
      category: "interest",
      text: "You chose the assembly and changing histories of galaxies as the cosmic story to explore.",
    },
    {
      signal: "style:visual",
      category: "style",
      text: "Maps and synthetic images fit the way you like to turn complex output into a physical explanation.",
    },
  ],
  "turbulence-coherent-structures": [
    {
      signal: "topic:turbulence",
      category: "interest",
      text: "You were drawn to vortices, jets, irregular motion, and energy transfer across scales.",
    },
    {
      signal: "evidence:fields",
      category: "style",
      text: "Spatial field maps are one of the evidence types you most want to interpret.",
    },
  ],
  "transport-multiphase-flow": [
    {
      signal: "topic:multiphase-transport",
      category: "interest",
      text: "You want to understand what a flow carries and how particles, bubbles, droplets, or boundaries alter it.",
    },
    {
      signal: "style:simulation",
      category: "style",
      text: "Building and varying a time-evolving flow model matches your preferred research workflow.",
    },
  ],
  "atmospheric-ocean-dynamics": [
    {
      signal: "topic:geophysical-flows",
      category: "interest",
      text: "You chose weather, ocean circulation, or rotating and stratified flows as a system to investigate.",
    },
    {
      signal: "evidence:trajectories",
      category: "style",
      text: "Following currents and tracers through time fits the evidence you want to inspect.",
    },
  ],
  "climate-earth-system-modeling": [
    {
      signal: "topic:climate-modeling",
      category: "interest",
      text: "You want to study feedbacks and coupling across atmosphere, ocean, land, ice, and radiation.",
    },
    {
      signal: "style:statistical",
      category: "style",
      text: "Your interest in uncertainty and distributions fits reasoning across climate-model ensembles.",
    },
  ],
  "magnetic-confinement-fusion": [
    {
      signal: "topic:magnetic-fusion",
      category: "interest",
      text: "You selected the stability and transport of magnetically confined fusion plasma.",
    },
    {
      signal: "evidence:experimental",
      category: "style",
      text: "You value testing simulations against measurements from a physical experiment.",
    },
  ],
  "laser-driven-high-energy-density-plasma": [
    {
      signal: "topic:high-energy-density",
      category: "interest",
      text: "You were drawn to rapidly compressed, laser-driven matter and extreme plasma conditions.",
    },
    {
      signal: "evidence:fields",
      category: "style",
      text: "Inspecting spatial maps of shocks, density, temperature, and fields suits your evidence preference.",
    },
  ],
  "heliophysics-space-weather": [
    {
      signal: "topic:space-weather",
      category: "interest",
      text: "You want to connect solar activity with plasma moving through space and planetary environments.",
    },
    {
      signal: "evidence:integrated",
      category: "style",
      text: "You prefer combining several observation types with a system-scale model.",
    },
  ],
  "magnetic-reconnection-kinetic-plasma": [
    {
      signal: "topic:kinetic-reconnection",
      category: "interest",
      text: "You chose particle-scale magnetic energy conversion, acceleration, and heating as the key mechanism.",
    },
    {
      signal: "evidence:distributions",
      category: "style",
      text: "Particle velocity and energy distributions match the evidence you most want to interpret.",
    },
  ],
  "lattice-spin-models": [
    {
      signal: "topic:lattice-spin",
      category: "interest",
      text: "You want to learn how local spin interactions and geometry create collective order or frustration.",
    },
    {
      signal: "style:statistical",
      category: "style",
      text: "Sampling configurations and interpreting fluctuations fits your preferred research style.",
    },
  ],
  "quantum-many-body-phases": [
    {
      signal: "topic:quantum-many-body",
      category: "interest",
      text: "You selected correlated quantum particles and collective phases as the behavior to investigate.",
    },
    {
      signal: "style:mathematical",
      category: "style",
      text: "You are drawn to mathematical representations and diagnostics of correlation and entanglement.",
    },
  ],
  "quantum-dynamics-control": [
    {
      signal: "topic:quantum-control",
      category: "interest",
      text: "You want to follow and deliberately steer a quantum state through time.",
    },
    {
      signal: "evidence:trajectories",
      category: "style",
      text: "Time-dependent populations and fidelity provide the evolving evidence you prefer.",
    },
  ],
  "open-quantum-systems": [
    {
      signal: "topic:open-quantum",
      category: "interest",
      text: "You chose noise, decoherence, and system–environment interaction as the quantum question to explain.",
    },
    {
      signal: "style:modeling",
      category: "style",
      text: "You enjoy building an explicit model and examining how its assumptions change the outcome.",
    },
  ],
  "phase-transitions-critical-phenomena": [
    {
      signal: "topic:critical-phenomena",
      category: "interest",
      text: "You were drawn to collective phase changes, correlations, and critical behavior.",
    },
    {
      signal: "style:statistical",
      category: "style",
      text: "Your interest in fluctuations and finite-size trends fits this statistical workflow.",
    },
  ],
  "nonequilibrium-statistical-physics": [
    {
      signal: "topic:nonequilibrium",
      category: "interest",
      text: "You want to understand systems that relax, transport, or remain driven away from equilibrium.",
    },
    {
      signal: "evidence:trajectories",
      category: "style",
      text: "Comparing evolving trajectories with ensemble behavior matches your evidence preference.",
    },
  ],
  "nonlinear-dynamics-chaos": [
    {
      signal: "topic:nonlinear-chaos",
      category: "interest",
      text: "You chose bifurcations, sensitivity, synchronization, or chaotic motion as the pattern to explain.",
    },
    {
      signal: "style:visual",
      category: "style",
      text: "Phase portraits and bifurcation diagrams suit your preference for visual models.",
    },
  ],
  "network-emergent-dynamics": [
    {
      signal: "topic:network-dynamics",
      category: "interest",
      text: "You want to understand how interaction structure creates spreading, cascades, or synchronization.",
    },
    {
      signal: "evidence:integrated",
      category: "style",
      text: "You like comparing structural and dynamical evidence rather than relying on one network picture.",
    },
  ],
  "particle-collision-simulation": [
    {
      signal: "topic:particle-events",
      category: "interest",
      text: "You selected the particles and patterns produced by high-energy collisions.",
    },
    {
      signal: "style:statistical",
      category: "style",
      text: "Reasoning from distributions across many events fits your preferred style.",
    },
  ],
  "detector-response-reconstruction": [
    {
      signal: "topic:detector-physics",
      category: "interest",
      text: "You want to connect an instrument’s raw signal back to the physical event that produced it.",
    },
    {
      signal: "style:benchmarking",
      category: "style",
      text: "Efficiency, resolution, bias, and controlled tests match how you judge a method’s reliability.",
    },
  ],
  "nuclear-structure-reactions": [
    {
      signal: "topic:nuclear-physics",
      category: "interest",
      text: "You chose how protons and neutrons form nuclear states, decays, and reactions.",
    },
    {
      signal: "evidence:spectra",
      category: "style",
      text: "Energy levels and other spectral evidence fit what you most want to interpret.",
    },
  ],
  "lattice-field-theory": [
    {
      signal: "topic:lattice-field",
      category: "interest",
      text: "You were drawn to computing strongly interacting quantum fields through a spacetime lattice.",
    },
    {
      signal: "style:computational",
      category: "style",
      text: "You enjoy the computational challenge of sampling, scaling, and controlled numerical limits.",
    },
  ],
  "numerical-methods-hpc-uncertainty": [
    {
      signal: "topic:numerical-methods",
      category: "interest",
      text: "You chose solver reliability, computational scaling, or numerical uncertainty as the central research problem.",
    },
    {
      signal: "style:benchmarking",
      category: "style",
      text: "Convergence studies and fair performance comparisons match how you want to evaluate evidence.",
    },
  ],
  "physics-informed-ml-inverse-problems": [
    {
      signal: "topic:physics-ml-inverse",
      category: "interest",
      text: "You want to infer hidden physics or build a fast learned approximation without discarding physical constraints.",
    },
    {
      signal: "style:data",
      category: "style",
      text: "Working from data while testing generalization and uncertainty fits your preferred workflow.",
    },
  ],
};
