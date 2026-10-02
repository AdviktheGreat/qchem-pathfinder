import { defineBiologyNiche } from "@/data/pathfinders/computational-biology/niche-defaults";

export const singleCellSpatialDirections = [
  defineBiologyNiche({
    id: "single-cell-transcriptomics",
    area: "Cellular genomics",
    name: "Single-cell transcriptomics & cell-state discovery",
    shortDescription:
      "Analyze gene activity one cell at a time to distinguish cell types, states, and transitions.",
    explanation:
      "Single-cell transcriptomics replaces one averaged tissue profile with thousands of sparse cell-level measurements. Researchers identify cell populations, compare states, and study possible transitions while accounting for technical noise, batch effects, and subjective analysis choices. A computational cluster is not automatically a new biological cell type; annotation requires markers, context, and independent evidence.",
    questions: [
      "Which reproducible cell populations or states are present in the samples?",
      "How do cell proportions or expression programs differ across conditions?",
      "Which apparent trajectories are supported by the data rather than imposed by the analysis?",
    ],
    systems: [
      "Developing tissues",
      "Immune-cell populations",
      "Tumor microenvironments",
      "Plant and microbial cell communities",
    ],
    approaches: [
      {
        name: "Single-cell quality control and normalization",
        explanation:
          "Low-quality cells, technical counts, and dataset-specific effects are identified before biological comparisons.",
      },
      {
        name: "Dimension reduction and clustering",
        explanation:
          "High-dimensional gene activity is summarized to reveal candidate groups while testing their stability across choices.",
      },
      {
        name: "Cell annotation and trajectory analysis",
        explanation:
          "Marker evidence labels cell populations, and ordered-state models investigate possible developmental or response paths.",
      },
    ],
    concepts: [
      "Cell types, states, and gene expression",
      "Sparse high-dimensional data",
      "Clustering, markers, and annotation",
      "Batch effects and biological replication",
    ],
    preparation:
      "Begin with a small public dataset and reproduce a documented cell atlas. Inspect quality and known markers before changing clustering settings or interpreting a new cell population.",
    keywords: [
      "single-cell RNA sequencing",
      "scRNA-seq",
      "cell type annotation",
      "cell state",
      "single-cell clustering",
      "trajectory inference",
      "batch correction",
    ],
    synonyms: [
      "single-cell transcriptomics",
      "cell atlas analysis",
      "single-cell gene expression analysis",
    ],
    searches: {
      orientation: "single-cell transcriptomics analysis overview",
      focused:
        "scRNA-seq clustering cell type annotation batch correction trajectory",
      review: "recent review single-cell RNA-seq analysis methods",
    },
    comparisonLens:
      "Compared with bulk differential expression, this direction resolves heterogeneous cells but introduces sparse measurements and cell-annotation choices.",
    explorationFriendly: true,
  }),
  defineBiologyNiche({
    id: "spatial-omics",
    area: "Cellular genomics",
    name: "Spatial omics & tissue organization",
    shortDescription:
      "Connect molecular measurements to their physical locations within tissues and biological structures.",
    explanation:
      "Spatial omics preserves information about where gene activity, proteins, or other molecular features occur inside a tissue. Researchers map cell neighborhoods, boundaries, gradients, and possible communication while balancing spatial resolution, measurement sensitivity, and image quality. Nearby cells may influence one another, but proximity alone does not prove a signaling relationship.",
    questions: [
      "Which molecular programs occur in particular tissue regions or boundaries?",
      "How are cell types and states arranged into reproducible neighborhoods?",
      "Which spatial associations remain after accounting for tissue structure and sampling resolution?",
    ],
    systems: [
      "Developing organs",
      "Brain and neural tissue",
      "Tumor and immune microenvironments",
      "Plant roots, leaves, and growth zones",
    ],
    approaches: [
      {
        name: "Spatial mapping and segmentation",
        explanation:
          "Molecular measurements are aligned to tissue coordinates, images, cells, or spatial capture regions.",
      },
      {
        name: "Spatial statistics",
        explanation:
          "Models test clustering, gradients, boundaries, and neighborhood enrichment while respecting spatial dependence.",
      },
      {
        name: "Spatial data integration",
        explanation:
          "Single-cell references, images, and spatial measurements are combined to infer cell identities and tissue organization.",
      },
    ],
    concepts: [
      "Tissue organization and cellular neighborhoods",
      "Coordinates, images, and spatial resolution",
      "Spatial dependence and statistical testing",
      "Cell annotation and multi-modal integration",
    ],
    preparation:
      "Start with one tissue section and compare the raw image, spatial coordinates, and a few known marker patterns. Learn what one measurement spot represents before interpreting neighborhoods or communication.",
    keywords: [
      "spatial transcriptomics",
      "spatial omics",
      "tissue organization",
      "cell neighborhood",
      "spatial statistics",
      "spatial gene expression",
      "tissue segmentation",
    ],
    synonyms: [
      "spatially resolved transcriptomics",
      "spatial molecular profiling",
      "computational spatial biology",
    ],
    searches: {
      orientation: "spatial omics computational analysis overview",
      focused:
        "spatial transcriptomics cell neighborhoods spatial statistics tissue",
      review: "recent review spatial transcriptomics analysis methods",
    },
    comparisonLens:
      "Compared with single-cell transcriptomics, this direction makes tissue location and neighborhood structure central, often with a tradeoff between spatial and molecular resolution.",
  }),
];
