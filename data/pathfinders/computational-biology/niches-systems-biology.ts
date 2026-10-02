import { defineBiologyNiche } from "@/data/pathfinders/computational-biology/niche-defaults";

export const systemsBiologyDirections = [
  defineBiologyNiche({
    id: "biological-network-modeling",
    area: "Systems biology",
    name: "Biological networks & pathway modeling",
    shortDescription:
      "Represent interacting genes, proteins, or cells as networks to study organization and system-level behavior.",
    explanation:
      "Network biology describes components as nodes and measured or predicted relationships as edges. Researchers use these representations to identify modules, compare conditions, prioritize influential components, and model signaling or regulation. A dense network diagram can look persuasive even when many edges are uncertain, so evidence type, direction, context, and null-model comparisons must remain visible.",
    questions: [
      "Which groups of interacting components form reproducible biological modules?",
      "How does network organization differ across cell types, conditions, or species?",
      "Which nodes or relationships remain important under alternative network definitions?",
    ],
    systems: [
      "Protein–protein interaction networks",
      "Gene regulatory and signaling pathways",
      "Cell–cell communication networks",
      "Trait- or disease-associated molecular networks",
    ],
    approaches: [
      {
        name: "Network construction and integration",
        explanation:
          "Curated interactions, experiments, expression, or predictions are combined with clear provenance for each edge.",
      },
      {
        name: "Graph and community analysis",
        explanation:
          "Graph measures and clustering methods identify modules, hubs, paths, and differences from suitable randomized networks.",
      },
      {
        name: "Dynamic pathway modeling",
        explanation:
          "Logic, differential equations, or probabilistic models represent how signals may propagate or change over time.",
      },
    ],
    concepts: [
      "Graphs, nodes, edges, and modules",
      "Biological pathways and interactions",
      "Evidence provenance and network uncertainty",
      "Static structure versus dynamic behavior",
    ],
    preparation:
      "Begin with one curated pathway or a small interaction network. Label what every edge means and where it came from before calculating centrality or proposing an influential component.",
    keywords: [
      "network biology",
      "systems biology",
      "biological pathway",
      "interaction network",
      "network module",
      "graph analysis",
      "signaling model",
    ],
    synonyms: [
      "biological network analysis",
      "computational systems biology",
      "pathway network modeling",
    ],
    searches: {
      orientation: "biological network systems biology overview",
      focused:
        "interaction network module graph analysis pathway modeling validation",
      review: "recent review network biology systems modeling methods",
    },
    comparisonLens:
      "Compared with regulatory genomics, this direction can include many kinds of biological relationships and emphasizes system-wide organization or dynamics.",
    explorationFriendly: true,
  }),
  defineBiologyNiche({
    id: "metabolic-network-modeling",
    area: "Systems biology",
    name: "Metabolic networks & constraint-based modeling",
    shortDescription:
      "Model connected biochemical reactions to investigate resource use, growth, and metabolic tradeoffs.",
    explanation:
      "Metabolic models organize biochemical reactions into a network and apply mass balance, reaction direction, and environmental constraints to explore possible system behavior. Rather than tracing every molecule through time, many methods calculate feasible reaction-flow patterns. Predictions depend strongly on network completeness and chosen objectives, so researchers compare alternatives and validate them with growth, uptake, or metabolite evidence.",
    questions: [
      "Which metabolic pathways can support growth or a target product under chosen conditions?",
      "Which reactions are predicted to become limiting after a gene or nutrient change?",
      "How do alternative objectives and network gaps change the predicted metabolic strategy?",
    ],
    systems: [
      "Microbial metabolism",
      "Plant and algal metabolic networks",
      "Engineered production strains",
      "Host–microbe metabolic interactions",
    ],
    approaches: [
      {
        name: "Genome-scale metabolic reconstruction",
        explanation:
          "Genomic annotations and biochemical databases are assembled into a connected, quality-checked reaction network.",
      },
      {
        name: "Flux balance analysis",
        explanation:
          "Linear constraints identify feasible reaction flows and test explicit assumptions about cellular objectives.",
      },
      {
        name: "Perturbation and validation analysis",
        explanation:
          "Gene knockouts, nutrient changes, and measured fluxes test where model predictions are robust or incomplete.",
      },
    ],
    concepts: [
      "Biochemical reactions and metabolic pathways",
      "Mass balance and reaction constraints",
      "Optimization objectives and alternative solutions",
      "Model reconstruction and experimental validation",
    ],
    preparation:
      "Begin with a small central-metabolism model and trace its reaction stoichiometry. Compare predictions under two nutrient conditions before using a genome-scale reconstruction.",
    keywords: [
      "metabolic network modeling",
      "flux balance analysis",
      "genome scale metabolic model",
      "constraint based modeling",
      "metabolic flux",
      "reaction network",
      "metabolic reconstruction",
    ],
    synonyms: [
      "constraint-based metabolic modeling",
      "computational metabolism",
      "metabolic flux modeling",
    ],
    searches: {
      orientation: "constraint based metabolic modeling overview",
      focused: "flux balance analysis genome scale metabolic model validation",
      review: "recent review constraint-based metabolic network modeling",
    },
    comparisonLens:
      "Compared with general network biology, this direction uses biochemical reaction stoichiometry and explicit physical constraints to define feasible system behavior.",
  }),
];
