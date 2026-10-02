import { defineBiologyNiche } from "@/data/pathfinders/computational-biology/niche-defaults";

export const biologicalMachineLearningDirections = [
  defineBiologyNiche({
    id: "machine-learning-biological-prediction",
    area: "Biological machine learning",
    name: "Machine learning for biological prediction",
    shortDescription:
      "Build and evaluate models that predict biological properties from sequences, structures, images, or measurements.",
    explanation:
      "Biological machine learning learns patterns from labeled examples to predict properties such as molecular function, cell identity, phenotype, or ecological class. The central scientific work includes defining a meaningful target, choosing a representation, preventing information leakage, comparing simple baselines, and testing new biological contexts. High accuracy on a familiar dataset does not guarantee useful or fair generalization.",
    questions: [
      "Which representation preserves the biological information needed for the prediction?",
      "Does the model outperform simple baselines on genuinely independent data?",
      "Where is performance uncertain, biased, or dependent on shortcuts in the dataset?",
    ],
    systems: [
      "DNA and protein sequence datasets",
      "Cellular imaging and expression data",
      "Molecular property and interaction datasets",
      "Ecological and phenotype observations",
    ],
    approaches: [
      {
        name: "Feature-based statistical learning",
        explanation:
          "Interpretable biological descriptors are used with regression or classification models and clear baselines.",
      },
      {
        name: "Deep and representation learning",
        explanation:
          "Neural models learn representations from sequences, graphs, images, or other high-dimensional biological inputs.",
      },
      {
        name: "Generalization and uncertainty analysis",
        explanation:
          "Biologically informed splits, subgroup checks, calibration, and error analysis test when a model can be trusted.",
      },
    ],
    concepts: [
      "Biological features and representations",
      "Training, validation, and independent test data",
      "Data leakage, confounding, and dataset shift",
      "Prediction error, calibration, and uncertainty",
    ],
    preparation:
      "Begin with a documented dataset, a simple baseline, and a split that separates related biological groups. Inspect errors before increasing model complexity, and avoid sensitive personal data in a beginner project.",
    keywords: [
      "machine learning biology",
      "biological prediction",
      "bioinformatics machine learning",
      "biological representation learning",
      "model generalization",
      "prediction uncertainty",
      "data leakage",
    ],
    synonyms: [
      "machine learning for bioinformatics",
      "predictive computational biology",
      "biological data science prediction",
    ],
    searches: {
      orientation:
        "machine learning computational biology overview limitations",
      focused:
        "biological prediction machine learning generalization data leakage uncertainty",
      review: "recent review machine learning biological prediction evaluation",
    },
    comparisonLens:
      "Compared with method benchmarking, this direction centers building a predictive model for a biological target, while benchmarking can compare many analysis tools without creating a new predictor.",
  }),
  defineBiologyNiche({
    id: "bioinformatics-method-benchmarking",
    area: "Biological machine learning",
    name: "Bioinformatics methods & benchmark design",
    shortDescription:
      "Compare computational methods fairly and investigate which tools work for which biological questions.",
    explanation:
      "Bioinformatics benchmarking evaluates algorithms, workflows, or models against simulated data, curated references, experiments, or carefully defined proxy tasks. A fair benchmark must avoid favoring one tool through parameter choices, data overlap, or a narrow metric. Researchers examine accuracy, calibration, runtime, robustness, usability, and failure modes so students can learn why no single method is best for every biological setting.",
    questions: [
      "Which datasets and metrics represent the biological task fairly?",
      "How do methods behave when data quality, sample size, or assumptions change?",
      "Do performance differences remain under consistent tuning and independent evaluation?",
    ],
    systems: [
      "Sequence alignment and annotation tools",
      "Single-cell analysis workflows",
      "Variant and structure predictors",
      "Network, ecology, and metagenomic methods",
    ],
    approaches: [
      {
        name: "Reference and simulated benchmark design",
        explanation:
          "Datasets with known or independently supported answers are selected while documenting where the reference remains imperfect.",
      },
      {
        name: "Multi-metric evaluation",
        explanation:
          "Accuracy, sensitivity, calibration, runtime, memory, and robustness reveal tradeoffs hidden by one summary score.",
      },
      {
        name: "Reproducible workflow comparison",
        explanation:
          "Versioned software, shared inputs, parameter records, and repeated runs make comparisons inspectable and repeatable.",
      },
    ],
    concepts: [
      "Algorithms, workflows, and biological assumptions",
      "Reference standards and simulated truth",
      "Evaluation metrics and tradeoffs",
      "Reproducibility, software versions, and parameter fairness",
    ],
    preparation:
      "Begin by comparing two accessible tools on one small public dataset with a predeclared metric. Record versions and parameters, inspect disagreements, and resist declaring a universal winner.",
    keywords: [
      "bioinformatics benchmarking",
      "method comparison",
      "benchmark dataset",
      "workflow evaluation",
      "reproducible bioinformatics",
      "performance metric",
      "robustness analysis",
    ],
    synonyms: [
      "computational biology method evaluation",
      "bioinformatics tool comparison",
      "algorithm benchmark study",
    ],
    searches: {
      orientation: "bioinformatics method benchmarking overview",
      focused:
        "bioinformatics benchmark design independent dataset metric reproducibility",
      review: "recent review bioinformatics benchmarking best practices",
    },
    comparisonLens:
      "Compared with biological prediction, this direction asks how to evaluate and choose among computational tools, emphasizing fair evidence and reproducibility over one application target.",
    explorationFriendly: true,
  }),
];
