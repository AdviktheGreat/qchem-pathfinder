export const materialsMathPreparation: Record<string, string> = {
  comfortable:
    "When a paper introduces a property equation, check the variables, units, and physical assumptions before interpreting the trend.",
  "with-guidance":
    "Choose one materials equation from a review and annotate every symbol and unit beside a worked example.",
  "concept-first":
    "Begin with a structure image or property plot. Describe the pattern in words before connecting it to an equation.",
  unsure:
    "Try one visual explanation beside one short equation and notice which representation makes the material behavior clearer.",
};

export const materialsCodingPreparation: Record<string, string> = {
  enjoy:
    "Try reproducing a small materials plot or table with a short script, checking units and labels against the source.",
  learning:
    "Use a guided notebook with a small materials dataset. Change one input and explain what changes in the output.",
  new: "Begin with a worked calculation or prepared notebook; understand the scientific inputs and outputs before writing code from scratch.",
  "tools-first":
    "Start with an established interface or prepared workflow, keeping coding as a supporting skill while you learn what the calculation means.",
  unsure:
    "Sample a short prepared notebook and a point-and-click materials tool before deciding how much coding you want to use.",
};

export const materialsToolPreparation: Record<string, string> = {
  independent:
    "Document one small calculation completely: structure source, settings, outputs, units, and checks you performed.",
  guided:
    "Repeat a guided calculation, then change one scientifically meaningful setting and compare the result.",
  observed:
    "Begin by tracing a published workflow from its material structure and assumptions to its final plot or property.",
  new: "Use a facilitator-provided example to learn what goes into a simulation, what comes out, and which choices can change the answer.",
  unsure:
    "Look through one short simulation workflow and identify its input structure, method, and output before choosing a tool to learn.",
};

export const materialsExplanationGuides: Record<string, string> = {
  visual:
    "Begin with a structure, unit-cell image, or property map. Explain what differs between the materials before adding mathematical detail.",
  quantitative:
    "Begin with a measurable property and its units, then compare a trend across two material structures or compositions.",
  comparison:
    "Begin with two contrasting materials or methods and ask which structural or computational choice explains the difference.",
  mixed:
    "Pair a material structure with a plot or equation, then connect the atomic-scale picture to the measured or predicted property.",
  unsure:
    "Try a structure image, a small property table, and a short explanation together; notice which part helps the idea click.",
};

export const materialsWorkflowPreparation: Record<string, string> = {
  "visual-models":
    "Choose one structure viewer and practice connecting a visible feature—such as a pore, defect, layer, or interface—to a reported property.",
  equations:
    "Take one central model equation from a review and annotate its variables, units, assumptions, and the material behavior each term represents.",
  datasets:
    "Inspect a small materials dataset for units, missing values, provenance, and outliers before looking for a scientific trend.",
  coding:
    "Reproduce one published materials plot or analysis in a notebook and record every transformation from source data to figure.",
  comparisons:
    "Build a comparison table that changes one material, method, or condition at a time and records which conclusion remains stable.",
  "experimental-evidence":
    "Pair one calculated output with the experimental plot it is meant to explain, noting resolution, conditions, and uncertainties on both sides.",
  unsure:
    "Sample a structure model, a short notebook, and an experimental plot before deciding which working style to practice first.",
};

export const materialsExperimentPreparation: Record<string, string> = {
  interpret:
    "Start with one measured feature and ask exactly which calculated quantity can be compared with it—and which parts require an indirect interpretation.",
  predict:
    "Write the testable prediction, expected units, operating conditions, and an outcome that would challenge the model before searching for confirming evidence.",
  "feedback-loop":
    "Sketch a calculation–measurement loop: what the experiment constrains, what the model predicts next, and how disagreement would update either side.",
  theory:
    "State which idealization makes the question tractable and identify one real-world effect the first model intentionally leaves out.",
  unsure:
    "Compare one paper that interprets an existing measurement with one that makes a testable prediction, then note which role feels more engaging.",
};
