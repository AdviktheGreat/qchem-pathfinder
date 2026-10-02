import { defineBiologyNiche } from "@/data/pathfinders/computational-biology/niche-defaults";

export const ecologyMicrobiomeDirections = [
  defineBiologyNiche({
    id: "microbiome-metagenomics",
    area: "Microbiomes and environmental biology",
    name: "Microbiome & metagenomic analysis",
    shortDescription:
      "Study microbial communities from mixed DNA data to compare composition, function, and environmental context.",
    explanation:
      "Microbiome and metagenomic analyses examine DNA collected from communities containing many organisms. Researchers estimate which microbes and genes are present, compare communities, and reconstruct possible functions. Results depend on sampling, DNA extraction, reference databases, and compositional measurements, so an apparent abundance change does not automatically show that one microbe caused a biological outcome.",
    questions: [
      "Which organisms or functional genes are detected in a microbial community?",
      "How does community composition vary across environments, hosts, or time?",
      "Which findings remain after accounting for sequencing depth, contamination, and database bias?",
    ],
    systems: [
      "Soil and ocean microbial communities",
      "Plant-associated microbiomes",
      "Public human microbiome research datasets",
      "Built-environment and wastewater samples",
    ],
    approaches: [
      {
        name: "Taxonomic profiling",
        explanation:
          "Marker sequences or metagenomic reads are compared with references to estimate community membership and relative composition.",
      },
      {
        name: "Metagenomic assembly and binning",
        explanation:
          "Overlapping reads are assembled and grouped into candidate genomes from organisms that were not isolated individually.",
      },
      {
        name: "Functional and community comparison",
        explanation:
          "Genes, pathways, diversity, and abundance patterns are compared with methods suited to sparse compositional data.",
      },
    ],
    concepts: [
      "Microbial communities and ecological niches",
      "Mixed-community DNA sequencing",
      "Relative abundance and compositional data",
      "Reference bias, contamination, and sampling design",
    ],
    preparation:
      "Begin with a small public marker-gene dataset and a clear environmental comparison. Inspect sequencing depth and controls before interpreting diversity or naming particular microbes as drivers.",
    keywords: [
      "microbiome analysis",
      "metagenomics",
      "microbial community",
      "taxonomic profiling",
      "metagenome assembly",
      "community diversity",
      "compositional data",
    ],
    synonyms: [
      "microbial community genomics",
      "environmental metagenomics",
      "community sequence analysis",
    ],
    searches: {
      orientation: "microbiome metagenomic analysis overview",
      focused:
        "metagenomic taxonomic profiling community diversity compositional data bias",
      review: "recent review microbiome metagenomics computational methods",
    },
    comparisonLens:
      "Compared with pathogen genomics, this direction studies many interacting microbes in a mixed community rather than tracing one sampled pathogen lineage.",
    explorationFriendly: true,
  }),
  defineBiologyNiche({
    id: "computational-ecology-biodiversity",
    area: "Ecology and biodiversity",
    name: "Computational ecology & biodiversity modeling",
    shortDescription:
      "Combine species observations and environmental data to study distributions, communities, and ecological change.",
    explanation:
      "Computational ecology uses field observations, remote sensing, environmental measurements, and ecological models to investigate where species occur and how communities may change. Presence records are often incomplete and biased toward accessible places, while absence can be difficult to establish. Researchers make sampling assumptions explicit and distinguish association-based projections from certain predictions of future ecosystems.",
    questions: [
      "Which environmental features are associated with a species or community distribution?",
      "How are biodiversity patterns changing across space or time?",
      "How sensitive is a projection to sampling bias, climate scenarios, and model choice?",
    ],
    systems: [
      "Species occurrence and citizen-science records",
      "Forest, grassland, freshwater, and marine communities",
      "Migration and habitat-connectivity datasets",
      "Remote-sensing measures of ecological change",
    ],
    approaches: [
      {
        name: "Species-distribution modeling",
        explanation:
          "Occurrence records and environmental variables estimate habitat associations while correcting for sampling design where possible.",
      },
      {
        name: "Biodiversity and community analysis",
        explanation:
          "Diversity measures, occupancy models, and multivariate methods compare ecological communities across sites or time.",
      },
      {
        name: "Spatial and scenario modeling",
        explanation:
          "Geographic models evaluate connectivity or project associations under clearly stated environmental scenarios.",
      },
    ],
    concepts: [
      "Species distributions and ecological niches",
      "Biodiversity and community composition",
      "Spatial data and sampling bias",
      "Prediction, scenarios, and ecological uncertainty",
    ],
    preparation:
      "Begin with one species, a small region, and a documented occurrence dataset. Map sampling density and compare a simple environmental baseline before building a complex projection.",
    keywords: [
      "computational ecology",
      "species distribution model",
      "biodiversity modeling",
      "ecological niche model",
      "occupancy model",
      "spatial ecology",
      "sampling bias",
    ],
    synonyms: [
      "ecological informatics",
      "quantitative biodiversity analysis",
      "computational biodiversity science",
    ],
    searches: {
      orientation: "computational ecology biodiversity modeling overview",
      focused:
        "species distribution biodiversity spatial model sampling bias validation",
      review:
        "recent review computational ecology biodiversity modeling methods",
    },
    comparisonLens:
      "Compared with microbiome analysis, this direction usually works at organism, species, landscape, or ecosystem scales and integrates geographic environmental evidence.",
  }),
];
