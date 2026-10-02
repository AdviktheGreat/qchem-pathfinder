import { defineBiologyNiche } from "@/data/pathfinders/computational-biology/niche-defaults";

export const biomolecularModelingDirections = [
  defineBiologyNiche({
    id: "biomolecular-simulation-dynamics",
    area: "Biomolecular modeling",
    name: "Biomolecular simulation & conformational dynamics",
    shortDescription:
      "Simulate how proteins, RNA, membranes, and molecular complexes move and interact over time.",
    explanation:
      "Biomolecules are not rigid structures. Molecular simulations model how atoms move, how conformations interconvert, and how water, membranes, or binding partners reshape those motions. The result is a sampled model of possible behavior over limited times and conditions—not a complete movie of the cell. Researchers test convergence, compare replicas, and connect simulated patterns to experiments when possible.",
    questions: [
      "Which conformations does a biomolecule visit under the simulated conditions?",
      "How does a mutation, ligand, membrane, or RNA interaction alter those motions?",
      "Which conclusions remain stable across repeated simulations and alternative model choices?",
    ],
    systems: [
      "Enzymes and receptors",
      "RNA folds and RNA–protein complexes",
      "Membrane proteins and lipid bilayers",
      "Protein assemblies and interaction interfaces",
    ],
    approaches: [
      {
        name: "Molecular dynamics",
        explanation:
          "Numerical integration follows atomic motion under an approximate physical model over many small time steps.",
      },
      {
        name: "Conformational and trajectory analysis",
        explanation:
          "Distances, contacts, flexibility, clusters, and collective motions summarize large simulation trajectories.",
      },
      {
        name: "Enhanced sampling and free-energy methods",
        explanation:
          "Specialized methods encourage rare transitions or compare the relative favorability of molecular states.",
      },
    ],
    concepts: [
      "Molecular structure and noncovalent interactions",
      "Force fields and approximate energy models",
      "Conformations, trajectories, and statistical sampling",
      "Simulation convergence and experimental comparison",
    ],
    preparation:
      "Begin by visualizing a short prepared trajectory and measuring one interpretable feature such as a distance or flexibility profile. Learn the model’s timescale and assumptions before setting up a new simulation.",
    keywords: [
      "biomolecular simulation",
      "molecular dynamics",
      "protein dynamics",
      "RNA simulation",
      "conformational ensemble",
      "trajectory analysis",
      "free energy",
    ],
    synonyms: [
      "biomolecular molecular dynamics",
      "computational molecular biophysics",
      "conformational dynamics modeling",
    ],
    searches: {
      orientation: "biomolecular molecular dynamics simulation overview",
      focused:
        "protein RNA molecular dynamics conformational ensemble trajectory analysis",
      review: "recent review biomolecular simulation sampling validation",
    },
    comparisonLens:
      "Compared with structure prediction, this direction begins from a structural model and asks how an ensemble of molecular states changes over time.",
  }),
];
