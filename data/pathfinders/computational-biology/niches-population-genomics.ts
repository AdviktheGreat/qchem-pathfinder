import { defineBiologyNiche } from "@/data/pathfinders/computational-biology/niche-defaults";

export const populationGenomicsDirections = [
  defineBiologyNiche({
    id: "population-genomics-history",
    area: "Population genomics",
    name: "Population structure & genomic history",
    shortDescription:
      "Use variation across individuals to study ancestry, movement, relatedness, and population change.",
    explanation:
      "Individuals in a species carry many small genetic differences. Population genomics summarizes how those variants are shared, then uses explicit models to investigate relatedness, migration, mixing, and changes in population size. Sampling design matters: an apparent cluster may reflect geography, uneven data collection, or technical processing rather than a simple biological boundary.",
    questions: [
      "Which patterns of genetic variation distinguish or connect sampled populations?",
      "What histories of migration, mixing, or population-size change fit the data?",
      "How sensitive are the conclusions to sampling locations and model assumptions?",
    ],
    systems: [
      "Wild plant and animal populations",
      "Human population reference datasets",
      "Domesticated species and their wild relatives",
      "Island or fragmented populations",
    ],
    approaches: [
      {
        name: "Variant and allele-frequency analysis",
        explanation:
          "Researchers compare the frequencies and combinations of genetic variants across sampled individuals.",
      },
      {
        name: "Population structure modeling",
        explanation:
          "Dimension reduction and probabilistic models summarize relatedness while exposing continuous or mixed ancestry patterns.",
      },
      {
        name: "Demographic inference",
        explanation:
          "Simulations or likelihood-based models compare possible histories of population size, separation, and gene flow.",
      },
    ],
    concepts: [
      "Genetic variants and allele frequencies",
      "Inheritance and recombination",
      "Population sampling and structure",
      "Models of migration and demographic history",
    ],
    preparation:
      "Begin with a small, well-documented variant dataset and visualize relatedness before fitting a historical model. Learn how missing data and uneven sampling can change the pattern you see.",
    keywords: [
      "population genomics",
      "population structure",
      "genetic variation",
      "demographic inference",
      "gene flow",
      "admixture",
      "allele frequency",
    ],
    synonyms: [
      "population genetic structure",
      "genomic demography",
      "population history inference",
    ],
    searches: {
      orientation: "population genomics structure demographic history overview",
      focused:
        "genetic variation population structure admixture demographic inference",
      review: "recent review population genomics demographic inference methods",
    },
    comparisonLens:
      "Compared with comparative genomics, this direction focuses on variation and shared history among individuals and populations of the same or closely related species.",
    explorationFriendly: true,
  }),
  defineBiologyNiche({
    id: "adaptation-conservation-genomics",
    area: "Population genomics",
    name: "Adaptation & conservation genomics",
    shortDescription:
      "Investigate how genetic variation relates to environments, adaptation, and population resilience.",
    explanation:
      "Adaptation and conservation genomics examine whether particular genetic patterns track environmental pressures, traits, or population decline. The challenge is separating selection from ancestry, random change, and uneven sampling. Researchers combine population models with ecological context and avoid assuming that a statistical association alone identifies a beneficial variant or a complete conservation decision.",
    questions: [
      "Which genomic regions show evidence consistent with recent or local adaptation?",
      "How is genetic diversity distributed across threatened or fragmented populations?",
      "Do genotype–environment associations remain after accounting for population history?",
    ],
    systems: [
      "Species across temperature or elevation gradients",
      "Threatened and fragmented wildlife populations",
      "Crop wild relatives",
      "Populations responding to rapid environmental change",
    ],
    approaches: [
      {
        name: "Selection-scan statistics",
        explanation:
          "Patterns of variation, differentiation, or linkage are compared with neutral expectations to flag candidate regions.",
      },
      {
        name: "Landscape genomics",
        explanation:
          "Models relate genomic variation to environmental measurements while accounting for geography and shared ancestry.",
      },
      {
        name: "Genetic diversity and connectivity analysis",
        explanation:
          "Summary measures and network or migration models assess diversity, inbreeding, and movement among populations.",
      },
    ],
    concepts: [
      "Natural selection and genetic drift",
      "Population structure and confounding",
      "Genetic diversity and inbreeding",
      "Environmental association and validation",
    ],
    preparation:
      "Start by comparing one diversity measure across a few populations and mapping the sampling design. Treat candidate adaptive regions as hypotheses that need ecological or experimental support.",
    keywords: [
      "adaptation genomics",
      "conservation genomics",
      "selection scan",
      "landscape genomics",
      "genetic diversity",
      "genotype environment association",
      "population connectivity",
    ],
    synonyms: [
      "ecological genomics",
      "genomics of local adaptation",
      "population genomic conservation",
    ],
    searches: {
      orientation: "adaptation conservation genomics beginner overview",
      focused:
        "selection scan landscape genomics population structure environmental association",
      review: "recent review conservation genomics local adaptation methods",
    },
    comparisonLens:
      "Compared with general population-history inference, this direction connects genomic variation to environmental pressures, resilience, and conservation questions.",
  }),
];
