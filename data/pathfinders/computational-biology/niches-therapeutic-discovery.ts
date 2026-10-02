import { defineBiologyNiche } from "@/data/pathfinders/computational-biology/niche-defaults";

export const therapeuticDiscoveryDirections = [
  defineBiologyNiche({
    id: "virtual-screening-docking",
    area: "Computational therapeutic discovery",
    name: "Molecular docking & virtual screening",
    shortDescription:
      "Prioritize molecules computationally by modeling possible binding poses and screening evidence.",
    explanation:
      "Virtual screening uses computational models to rank molecules that might interact with a biological target. Docking proposes binding poses and approximate scores, but those scores are not measured affinities or proof that a compound will work in a cell, organism, or patient. Researchers use controls, known binders, alternative methods, chemical filters, and experiments to test whether a screening signal is meaningful.",
    questions: [
      "Which molecules receive plausible poses and favorable scores in a defined target site?",
      "Does the workflow recover known binders and reject appropriate controls?",
      "Which ranked candidates remain credible after inspecting chemistry, uncertainty, and alternative poses?",
    ],
    systems: [
      "Enzyme active sites",
      "Receptor binding pockets",
      "Protein–protein interaction surfaces",
      "Focused libraries of small molecules or fragments",
    ],
    approaches: [
      {
        name: "Molecular docking",
        explanation:
          "Search algorithms place candidate molecules in a target site and score approximate interaction geometries.",
      },
      {
        name: "Ligand-based virtual screening",
        explanation:
          "Chemical fingerprints, shapes, or learned representations compare candidates with molecules that have known activity.",
      },
      {
        name: "Rescoring and validation",
        explanation:
          "Consensus methods, decoys, known controls, and more detailed calculations test whether an initial ranking is robust.",
      },
    ],
    concepts: [
      "Protein structure and binding sites",
      "Noncovalent molecular interactions",
      "Chemical representations and molecular similarity",
      "Screening metrics, controls, and experimental validation",
    ],
    preparation:
      "Begin by redocking a known ligand into a well-characterized target and inspect the pose rather than trusting the score alone. Use only public teaching data and treat every ranked molecule as a hypothesis requiring experimental evidence.",
    keywords: [
      "molecular docking",
      "virtual screening",
      "protein ligand binding",
      "docking validation",
      "ligand-based screening",
      "binding pose",
      "screening benchmark",
    ],
    synonyms: [
      "in silico compound screening",
      "structure-based virtual screening",
      "computational ligand screening",
    ],
    searches: {
      orientation: "molecular docking virtual screening overview limitations",
      focused:
        "structure based virtual screening docking validation decoy benchmark",
      review: "recent review molecular docking virtual screening validation",
    },
    comparisonLens:
      "Compared with biomolecular simulation, this direction prioritizes screening many candidate molecules; dynamics may later refine a small number of poses.",
  }),
];
