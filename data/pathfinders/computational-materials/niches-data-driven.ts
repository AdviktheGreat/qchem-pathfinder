import type { Niche } from "@/lib/types";
import { materialsNicheDefaults } from "@/data/pathfinders/computational-materials/niche-defaults";

export const dataDrivenDirections: Niche[] = [
  {
    ...materialsNicheDefaults,
    id: "ml-property-prediction",
    area: "Data-driven materials research",
    name: "Machine learning for property prediction",
    shortDescription:
      "Train and evaluate models that predict material properties from composition, structure, or descriptors.",
    explanation:
      "Machine-learning models can approximate relationships between a material’s representation and a target property after learning from examples. The scientific challenge is not only accuracy: researchers must examine data quality, leakage, uncertainty, generalization, physical plausibility, and which materials lie outside the model’s experience.",
    questions: [
      "Which representation captures the material information needed for the property?",
      "Does the model generalize to genuinely new chemistry or structures?",
      "Where is the prediction uncertain, biased, or physically implausible?",
    ],
    systems: [
      "Crystal-property datasets",
      "Molecular and polymer materials",
      "Composition-based alloy datasets",
      "Experimental and computed materials databases",
    ],
    approaches: [
      {
        name: "Feature-based regression and classification",
        explanation:
          "Interpretable descriptors connect composition or structure to a property using statistical learning methods.",
      },
      {
        name: "Graph and neural-network models",
        explanation:
          "Learned representations use atomic connectivity and geometry to predict energies, properties, or categories.",
      },
      {
        name: "Uncertainty and validation analysis",
        explanation:
          "Careful splits, baselines, error inspection, and uncertainty estimates test when a model can be trusted.",
      },
    ],
    concepts: [
      "Material representations and descriptors",
      "Training, validation, and test data",
      "Prediction error and uncertainty",
      "Correlation versus physical explanation",
    ],
    preparation:
      "Begin with a small documented dataset, a simple baseline, and a clear train/test split. Coding is central, but understanding the target property and inspecting errors matter more than using the most complex model.",
    keywords: [
      "materials machine learning",
      "property prediction",
      "materials descriptors",
      "graph neural network",
      "model uncertainty",
      "materials informatics",
      "generalization",
    ],
    synonyms: [
      "machine learning for materials",
      "data-driven property modeling",
      "materials informatics prediction",
    ],
    searches: {
      orientation:
        "machine learning materials property prediction beginner overview",
      focused:
        "materials descriptors graph neural network property prediction uncertainty",
      review:
        "recent review machine learning materials property prediction validation",
    },
    affinities: {
      "interest:data-discovery": 3,
      "mode:predict": 3,
      "mode:compare": 2,
      "mode:data-discovery": 3,
      "mode:optimize": 2,
      "purpose:applied": 2,
      "scale:multiscale": 2,
      "connection:predict": 3,
      "medium:data": 3,
      "style:data": 3,
      "style:coding": 3,
      "style:compare": 2,
    },
    reasons: [
      {
        signal: "interest:data-discovery",
        category: "interest",
        text: "You were drawn to discovering material patterns with data and computation.",
      },
      {
        signal: "mode:data-discovery",
        category: "interest",
        text: "You chose learning from a large dataset as the research move that sounded most satisfying.",
      },
      {
        signal: "style:coding",
        category: "style",
        text: "You would enjoy building reproducible analyses with code and notebooks.",
      },
      {
        signal: "medium:data",
        category: "style",
        text: "Tables, distributions, and error patterns are central forms of evidence in this direction.",
      },
    ],
    comparisonLens:
      "Compared with high-throughput discovery, this direction centers learning and validating a predictive model; the training data may come from calculations, experiments, or both.",
  },
  {
    ...materialsNicheDefaults,
    id: "high-throughput-materials-discovery",
    area: "Data-driven materials research",
    name: "High-throughput materials discovery",
    shortDescription:
      "Automate consistent calculations across large candidate spaces to screen trends and promising materials.",
    explanation:
      "High-throughput research applies a defined computational workflow to hundreds or thousands of candidate compositions and structures. It turns physics-based calculations into comparable datasets, then uses filters and decision rules to identify candidates. Workflow reliability, failed calculations, database bias, and follow-up validation are part of the science.",
    questions: [
      "Which computable properties provide a useful screening funnel for the goal?",
      "How should failed, unstable, duplicate, or uncertain candidates be handled?",
      "Which shortlisted materials remain promising under stricter calculations or experiments?",
    ],
    systems: [
      "Inorganic crystal databases",
      "Alloy and composition spaces",
      "Porous-framework libraries",
      "Energy, electronic, and catalytic material candidates",
    ],
    approaches: [
      {
        name: "Automated first-principles workflows",
        explanation:
          "Standardized structure preparation, DFT calculations, and quality checks produce comparable material properties at scale.",
      },
      {
        name: "Database and screening pipelines",
        explanation:
          "Reproducible filters combine stability, performance, abundance, and other criteria into a transparent candidate funnel.",
      },
      {
        name: "Active learning and staged refinement",
        explanation:
          "Fast models prioritize informative candidates, while more expensive calculations refine the most promising or uncertain cases.",
      },
    ],
    concepts: [
      "Computational workflows and provenance",
      "Screening criteria and tradeoffs",
      "Thermodynamic stability",
      "Data quality and validation",
    ],
    preparation:
      "Begin by reproducing a small screening funnel on a few dozen records and documenting every exclusion. Automation is useful only when inputs, failures, units, and scientific assumptions remain visible.",
    keywords: [
      "high throughput materials screening",
      "materials discovery",
      "automated DFT",
      "materials database",
      "screening descriptor",
      "workflow provenance",
      "candidate ranking",
    ],
    synonyms: [
      "computational materials screening",
      "virtual materials discovery",
      "high-throughput first-principles calculations",
    ],
    searches: {
      orientation: "high throughput computational materials discovery overview",
      focused:
        "automated DFT workflow screening criteria materials database discovery",
      review:
        "recent review high throughput first principles materials discovery",
    },
    affinities: {
      "interest:data-discovery": 3,
      "mode:predict": 2,
      "mode:compare": 3,
      "mode:design": 2,
      "mode:data-discovery": 3,
      "mode:optimize": 2,
      "purpose:applied": 2,
      "connection:predict": 2,
      "medium:data": 3,
      "style:data": 3,
      "style:coding": 3,
      "style:compare": 3,
    },
    reasons: [
      {
        signal: "interest:data-discovery",
        category: "interest",
        text: "You wanted computation to help search a broad materials design space.",
      },
      {
        signal: "mode:compare",
        category: "interest",
        text: "High-throughput screening makes consistent comparisons across many candidates.",
      },
      {
        signal: "style:coding",
        category: "style",
        text: "Automated, reproducible workflows align with your interest in coding and computational tools.",
      },
      {
        signal: "style:compare",
        category: "style",
        text: "Side-by-side property and stability comparisons are the central evidence in a screening funnel.",
      },
    ],
    comparisonLens:
      "Compared with machine-learning prediction, this direction centers generating and filtering a large, consistent set of physics-based calculations, though ML may help prioritize candidates.",
  },
];
