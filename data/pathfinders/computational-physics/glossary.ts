import type { GlossaryItem } from "@/lib/pathfinder-definition";

export const physicsGlossary = [
  {
    term: "Computational model",
    text: "A mathematical description of a physical system translated into calculations that a computer can carry out.",
  },
  {
    term: "Numerical simulation",
    text: "A calculation that follows an approximate mathematical model to explore how a physical system behaves under chosen conditions.",
  },
  {
    term: "Approximation",
    text: "A deliberate simplification that makes a physical question tractable while introducing assumptions and limits that researchers must track.",
  },
  {
    term: "Initial condition",
    text: "The state of a modeled system at the starting time, such as the initial positions, velocities, temperature, or field values.",
  },
  {
    term: "Boundary condition",
    text: "A rule describing what happens at the edges of a modeled region, such as a fixed temperature, a reflecting wall, or a repeating domain.",
  },
  {
    term: "Discretization",
    text: "Representing a continuous space, time, or equation with a finite collection of points, cells, steps, or basis functions that can be computed.",
  },
  {
    term: "Differential equation",
    text: "An equation connecting a physical quantity to how it changes across time, space, or another variable.",
  },
  {
    term: "Field",
    text: "A physical quantity assigned throughout space and time, such as temperature, pressure, electric field, or fluid velocity.",
  },
  {
    term: "Quantum state",
    text: "The mathematical description used to predict possible measurement outcomes and their probabilities for a quantum system.",
  },
  {
    term: "Statistical ensemble",
    text: "A collection of possible system states used to reason about average behavior, fluctuations, and probabilities in many-particle systems.",
  },
  {
    term: "Convergence",
    text: "Evidence that a numerical result approaches a stable value as the time step, grid, sample size, or another computational setting is refined.",
  },
  {
    term: "Validation",
    text: "Checking whether a model reproduces relevant observations, experiments, trusted calculations, or known limiting cases for its intended use.",
  },
  {
    term: "Uncertainty quantification",
    text: "Estimating how uncertain inputs, measurements, assumptions, and numerical choices affect a model’s conclusions.",
  },
] satisfies readonly GlossaryItem[];
