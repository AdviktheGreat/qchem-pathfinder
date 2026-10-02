import { defineBiologyNiche } from "@/data/pathfinders/computational-biology/niche-defaults";

export const proteinSequenceStructureDirections = [
  defineBiologyNiche({
    id: "protein-sequence-function",
    area: "Protein bioinformatics",
    name: "Protein sequence, families & function inference",
    shortDescription:
      "Use sequence patterns and evolutionary relationships to investigate protein roles and functional regions.",
    explanation:
      "Protein bioinformatics compares amino-acid sequences to find families, conserved domains, motifs, and residues that may matter for function. Similar sequences often share aspects of ancestry and molecular role, but function can diverge after duplication or a few important changes. Researchers combine sequence evidence with structure, experiments, and biological context rather than assigning a precise function from one match.",
    questions: [
      "Which protein family or conserved domains best describe an unfamiliar sequence?",
      "Which residues are unusually conserved and may contribute to structure or activity?",
      "Where do closely related proteins show evidence of functional divergence?",
    ],
    systems: [
      "Enzyme and receptor families",
      "Microbial proteins of unknown function",
      "Signaling and regulatory proteins",
      "Disease-associated protein variants",
    ],
    approaches: [
      {
        name: "Sequence alignment and profile search",
        explanation:
          "Pairwise and family-profile methods find related proteins and align conserved positions across diverse sequences.",
      },
      {
        name: "Domain and motif annotation",
        explanation:
          "Curated models identify recurring structural or functional regions within a protein sequence.",
      },
      {
        name: "Sequence conservation analysis",
        explanation:
          "Evolutionary patterns highlight constrained residues and changes that may distinguish subfamilies.",
      },
    ],
    concepts: [
      "Amino-acid sequence and protein function",
      "Homology, domains, and protein families",
      "Multiple sequence alignment",
      "Conservation and functional divergence",
    ],
    preparation:
      "Begin with one known protein and a small family alignment. Locate annotated domains and conserved residues, then check whether experimental or structural evidence supports the proposed function.",
    keywords: [
      "protein sequence analysis",
      "protein family",
      "functional annotation",
      "conserved domain",
      "sequence motif",
      "multiple sequence alignment",
      "protein homology",
    ],
    synonyms: [
      "protein function inference",
      "comparative protein sequence analysis",
      "protein family annotation",
    ],
    searches: {
      orientation: "protein sequence function analysis overview",
      focused:
        "protein family profile search conserved domain motif functional annotation",
      review:
        "recent review computational protein function prediction sequence",
    },
    comparisonLens:
      "Compared with structure prediction, this direction begins with evolutionary and sequence-family evidence rather than constructing a three-dimensional model.",
    explorationFriendly: true,
  }),
  defineBiologyNiche({
    id: "protein-structure-prediction",
    area: "Structural bioinformatics",
    name: "Protein structure prediction & assessment",
    shortDescription:
      "Predict three-dimensional protein structures and judge which parts of a model are reliable enough to interpret.",
    explanation:
      "A protein’s amino-acid sequence constrains how it can fold, but a predicted structure is still a model with uneven confidence. Structural bioinformatics uses evolutionary patterns, learned models, templates, and physical checks to propose three-dimensional arrangements. Researchers examine local confidence, alternative conformations, complexes, and experimental agreement before drawing functional conclusions from a predicted shape.",
    questions: [
      "Which parts of a predicted structure are well supported and which remain uncertain?",
      "Does the model reveal plausible domains, active sites, or interaction surfaces?",
      "How does the prediction compare with templates, experiments, or alternative models?",
    ],
    systems: [
      "Proteins without experimental structures",
      "Multi-domain proteins",
      "Protein complexes and interaction interfaces",
      "Variant-containing protein models",
    ],
    approaches: [
      {
        name: "Template-based modeling",
        explanation:
          "A known structure from a related protein guides a model when sequence and domain relationships are credible.",
      },
      {
        name: "Machine-learning structure prediction",
        explanation:
          "Learned models combine sequence and evolutionary context to predict coordinates, contacts, and confidence.",
      },
      {
        name: "Structure validation and comparison",
        explanation:
          "Geometry, confidence, experimental information, and alternative structures are checked before biological interpretation.",
      },
    ],
    concepts: [
      "Protein sequence and folding",
      "Secondary, tertiary, and quaternary structure",
      "Structural templates and learned representations",
      "Model confidence and experimental validation",
    ],
    preparation:
      "Begin with a small protein that has both a prediction and an experimental structure. Compare them visually and by confidence region before interpreting an unfamiliar target.",
    keywords: [
      "protein structure prediction",
      "structural bioinformatics",
      "protein folding",
      "homology modeling",
      "structure confidence",
      "protein complex prediction",
      "structure validation",
    ],
    synonyms: [
      "computational protein structure modeling",
      "three-dimensional protein prediction",
      "in silico protein modeling",
    ],
    searches: {
      orientation: "protein structure prediction assessment overview",
      focused:
        "protein structure prediction confidence validation experimental comparison",
      review: "recent review protein structure prediction model assessment",
    },
    comparisonLens:
      "Compared with biomolecular simulation, this direction prioritizes constructing and assessing a structure before modeling how it moves over time.",
  }),
];
