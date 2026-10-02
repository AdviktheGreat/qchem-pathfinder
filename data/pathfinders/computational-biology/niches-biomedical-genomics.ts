import { defineBiologyNiche } from "@/data/pathfinders/computational-biology/niche-defaults";

export const biomedicalGenomicsDirections = [
  defineBiologyNiche({
    id: "variant-effect-prediction",
    area: "Biomedical genomics",
    name: "Genetic variant-effect prediction",
    shortDescription:
      "Estimate how DNA or protein changes may influence molecular function using several evidence sources.",
    explanation:
      "Variant-effect prediction prioritizes genetic changes that may alter a gene, protein, or regulatory region. Models combine conservation, sequence context, structure, annotations, and experimental measurements, but a prediction is not a diagnosis or proof of biological impact. Researchers evaluate calibration, population bias, uncertain labels, and performance on genuinely unseen variants before using a score as scientific evidence.",
    questions: [
      "Which sequence, structural, or regulatory features make a variant potentially important?",
      "How well does a predictor generalize across genes, populations, and variant classes?",
      "Where do computational predictions disagree with experiments or expert-curated evidence?",
    ],
    systems: [
      "Protein-coding substitutions",
      "Splice-region variants",
      "Regulatory and noncoding variants",
      "Publicly curated functional-assay datasets",
    ],
    approaches: [
      {
        name: "Conservation and annotation scoring",
        explanation:
          "Evolutionary constraint and known genomic features provide interpretable evidence about potentially important positions.",
      },
      {
        name: "Structure- and sequence-based prediction",
        explanation:
          "Models estimate how a change could affect protein stability, interactions, splicing, or regulatory sequence patterns.",
      },
      {
        name: "Calibration and benchmark analysis",
        explanation:
          "Independent datasets, subgroup checks, and reliability curves test whether scores mean the same thing across contexts.",
      },
    ],
    concepts: [
      "Genetic variants and molecular function",
      "Evolutionary conservation",
      "Classification, calibration, and uncertainty",
      "Population representation and evidence bias",
    ],
    preparation:
      "Begin with a public benchmark of experimentally measured variants, not personal genomic data. Compare a simple conservation baseline with one predictor and document false positives, false negatives, and uncertain labels.",
    keywords: [
      "variant effect prediction",
      "variant pathogenicity score",
      "missense variant",
      "functional genomics",
      "prediction calibration",
      "variant benchmark",
      "genomic annotation",
    ],
    synonyms: [
      "genetic variant impact prediction",
      "functional variant prioritization",
      "computational variant interpretation",
    ],
    searches: {
      orientation: "genetic variant effect prediction overview limitations",
      focused:
        "variant effect predictor benchmark calibration population bias functional assay",
      review:
        "recent review computational variant effect prediction evaluation",
    },
    comparisonLens:
      "Compared with cancer genomics, this direction centers the possible molecular effect of individual variants across many biological contexts rather than the evolving genomic landscape of tumors.",
  }),
  defineBiologyNiche({
    id: "cancer-genomics",
    area: "Biomedical genomics",
    name: "Cancer genomics & tumor evolution",
    shortDescription:
      "Analyze genomic changes and cellular mixtures to investigate how tumors differ, develop, and evolve.",
    explanation:
      "Cancer genomics studies mutations, copy-number changes, expression programs, and cellular subpopulations in tumor research data. Computational analyses distinguish likely biological signals from normal variation and technical noise, then investigate how tumor populations may have changed. Results are research interpretations, not individual diagnoses or treatment recommendations, and sensitive human data require strong privacy and consent protections.",
    questions: [
      "Which genomic alterations recur more often than expected across a tumor cohort?",
      "What evidence suggests distinct tumor cell populations or evolutionary branches?",
      "How do purity, sampling location, and technical processing affect the inferred pattern?",
    ],
    systems: [
      "Public tumor sequencing cohorts",
      "Matched tumor and non-tumor samples",
      "Longitudinal research samples",
      "Tumor single-cell datasets",
    ],
    approaches: [
      {
        name: "Somatic variant and copy-number analysis",
        explanation:
          "Genomic changes found in tumor research samples are identified, filtered, and compared across samples or cohorts.",
      },
      {
        name: "Mutational signature analysis",
        explanation:
          "Patterns of mutation types are decomposed into candidate processes while uncertainty and overlapping signatures are assessed.",
      },
      {
        name: "Tumor heterogeneity and evolution modeling",
        explanation:
          "Variant frequencies or single-cell profiles are used to propose cellular subpopulations and possible histories of change.",
      },
    ],
    concepts: [
      "Somatic mutation and genome instability",
      "Tumor heterogeneity and clonal evolution",
      "Sample purity, mixtures, and technical noise",
      "Human-data privacy and responsible interpretation",
    ],
    preparation:
      "Begin with a de-identified public teaching dataset and one alteration type. Learn the quality controls and cohort design before comparing tumor subgroups or inferring evolutionary histories.",
    keywords: [
      "cancer genomics",
      "somatic mutation",
      "tumor evolution",
      "clonal heterogeneity",
      "copy number alteration",
      "mutational signature",
      "tumor sequencing",
    ],
    synonyms: [
      "computational cancer genomics",
      "tumor genome analysis",
      "cancer genome evolution",
    ],
    searches: {
      orientation: "computational cancer genomics tumor evolution overview",
      focused:
        "somatic mutation copy number clonal heterogeneity tumor evolution analysis",
      review:
        "recent review cancer genomics tumor evolution computational methods",
    },
    comparisonLens:
      "Compared with general variant-effect prediction, this direction studies combinations of genomic changes, mixed cell populations, and evolution within tumor research datasets.",
  }),
];
