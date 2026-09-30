export const mathPreparation: Record<string, string> = {
  comfortable:
    "When reading a quantitative result, check the variables, units, and assumptions before interpreting the equation.",
  "with-guidance":
    "Choose one equation from a review and annotate each symbol and unit with a worked example.",
  "concept-first":
    "Start with a figure or energy diagram. Describe the trend in words before connecting it to an equation.",
  unsure:
    "Try reading one figure and one short equation with a guide; notice which explanation helps you most.",
};

export const codingPreparation: Record<string, string> = {
  enjoy:
    "Try reproducing a small published plot or data table with a short script, checking units and inputs.",
  learning:
    "Use a guided notebook with a small dataset. Change one input and explain what changes in the output.",
  new: "Begin by reading a worked calculation or a small results table with your facilitator; learn the software steps after the chemistry is clear.",
  chemistry:
    "Use established tools and a worked example to interpret molecular results; scripting can remain a supporting skill.",
  unsure:
    "Sample a worked software example with your facilitator before deciding how much coding you want to try.",
};

export const explanationGuides: Record<string, string> = {
  conceptual:
    "Begin with the molecular story: sketch the system and explain what changes, what stays the same, and why it matters.",
  quantitative:
    "Begin with a measurable property: identify its units and compare a trend across two molecular examples.",
  mixed:
    "Pair a molecular picture with a plot or equation. Explain how the visual story connects to the numbers.",
  unsure:
    "Try a molecular picture alongside a small data table. You can choose how much mathematical detail to explore as you read.",
};

export const knowledgePreparation = {
  memoryQuestionId: "phase-one-memory",
  conceptQuestionId: "concept-familiarity",
  startingPointByAnswer: {
    fresh:
      "The Phase 1 big picture feels available; build from it while checking details as needed.",
    recognize:
      "Many Phase 1 ideas are recognizable; a short vocabulary refresh will make the literature easier to enter.",
  },
  defaultStartingPoint:
    "Begin with a concise concept map and definitions. Knowledge gaps are preparation notes, not limits on what you can explore.",
  conceptReviewLabels: {
    orbitals: "Orbitals and electron density",
    energy: "Potential energy, stability, and energy profiles",
    bonding: "Bonding and molecular geometry",
    spectra: "Light absorption and molecular spectra",
    methods: "What DFT approximates and why methods differ",
  },
  mathFallback: "Still exploring how much mathematical detail feels useful",
  codingFallback: "Still exploring comfort with computational tools",
  explanationFallback: "Open to different explanation styles",
  contextReadyOptionId: "fresh",
} as const;
