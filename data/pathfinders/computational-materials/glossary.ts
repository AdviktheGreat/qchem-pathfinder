import type { GlossaryItem } from "@/lib/pathfinder-definition";

export const materialsGlossary: GlossaryItem[] = [
  {
    term: "DFT",
    text: "Density functional theory estimates electronic energies and properties from electron density. Practical DFT calculations use approximations whose reliability depends on the material and property.",
  },
  {
    term: "Molecular dynamics",
    text: "A simulation that advances atoms through time using calculated forces, producing a trajectory that can reveal motion, diffusion, structural change, and temperature-dependent behavior.",
  },
  {
    term: "Monte Carlo method",
    text: "A family of methods that samples possible configurations using probability rather than following one time trajectory; it is often used for equilibrium, adsorption, and phase behavior.",
  },
  {
    term: "Electronic band structure",
    text: "The allowed electron energies across a periodic material. Its pattern helps explain conductivity, optical transitions, and how charge carriers respond.",
  },
  {
    term: "Phonon",
    text: "A quantized collective vibration of atoms in a solid. Phonons help describe structural stability, heat transport, and interactions between a lattice and electrons.",
  },
  {
    term: "Phase-field modeling",
    text: "A continuum approach that represents phases or microstructural features with smoothly varying fields and follows how they evolve across larger length and time scales.",
  },
  {
    term: "Interatomic potential",
    text: "A mathematical model of atomic energy and forces used in atomistic simulation. It may be physically designed, fitted to data, or learned with machine learning.",
  },
  {
    term: "Finite-element method",
    text: "A continuum method that divides a larger object or device into small connected regions, then solves equations for quantities such as stress, heat, or electric potential across them.",
  },
  {
    term: "Machine learning",
    text: "A family of data-driven methods that learns patterns from examples. In materials research it can predict properties, screen candidates, or approximate costly simulations, but its reliability depends on the training data and validation.",
  },
];
