import type { SurveyQuestion } from "@/lib/types";

const unsureOption = {
  id: "unsure",
  label: "I’m not sure yet",
  description:
    "Keep the possibilities open; this will shape context and preparation guidance, not limit your directions.",
  uncertainty: true,
} as const;

export const computationalBiologyQuestions: SurveyQuestion[] = [
  {
    id: "biology-starting-point",
    stage: "calibration",
    kicker: "Start where you are",
    title: "How familiar does computational biology feel right now?",
    prompt:
      "This changes the background guidance in your results—not which directions you are allowed to explore.",
    type: "single",
    options: [
      {
        id: "new",
        label: "Mostly new to me",
        description:
          "I’m curious, but I would want a clear map of the field’s main questions, data, and vocabulary.",
      },
      {
        id: "recognize",
        label: "I recognize parts of the landscape",
        description:
          "Some biological or data ideas sound familiar, even if I could not explain all of them yet.",
      },
      {
        id: "comfortable",
        label: "I could explain several core ideas",
        description:
          "I feel ready to build from concepts such as genes, proteins, cells, evolution, and biological data.",
      },
      unsureOption,
    ],
  },
  {
    id: "biology-concept-familiarity",
    stage: "calibration",
    kicker: "Concept check-in",
    title: "Which ideas feel familiar enough to use in a conversation?",
    prompt:
      "Choose up to five. Recognition is enough—this is a preparation check, not a quiz.",
    type: "multi",
    maxSelections: 5,
    definition: {
      term: "Biological data",
      text: "Recorded information about living systems, such as DNA sequences, gene activity measurements, protein structures, images, or observations of organisms and environments.",
    },
    options: [
      { id: "genes-genomes", label: "Genes, DNA, and genomes" },
      {
        id: "proteins",
        label: "How protein sequence and structure relate to function",
      },
      { id: "cells", label: "Cells, gene activity, and cell types" },
      {
        id: "evolution",
        label: "Evolution, inheritance, and variation",
      },
      {
        id: "biological-data",
        label: "Using datasets to compare biological patterns",
      },
      {
        ...unsureOption,
        label: "I’ve heard of these but couldn’t explain them",
      },
    ],
  },
  {
    id: "biology-quantitative-comfort",
    stage: "calibration",
    kicker: "Working language",
    title:
      "How do you feel when a biology explanation uses equations or quantitative models?",
    prompt:
      "Your answer changes the preparation advice and explanation style—not the directions you can explore.",
    type: "single",
    options: [
      {
        id: "comfortable",
        label: "Comfortable",
        description:
          "Equations, rates, probabilities, or models often help me understand a biological pattern.",
      },
      {
        id: "with-guidance",
        label: "Good with some guidance",
        description:
          "I can follow the math when the variables and biological meaning are introduced clearly.",
      },
      {
        id: "concept-first",
        label: "Show me the biological picture first",
        description:
          "I learn best from a concrete system, diagram, or trend before symbols and formulas.",
      },
      unsureOption,
    ],
  },
  {
    id: "biology-statistics-comfort",
    stage: "calibration",
    kicker: "Patterns and uncertainty",
    title: "What is your current relationship with statistics?",
    prompt:
      "Computational biologists use statistics to separate meaningful patterns from variation. Experience is helpful context, not a gate.",
    type: "single",
    options: [
      {
        id: "comfortable",
        label: "I’m comfortable interpreting statistical evidence",
        description:
          "I can reason about distributions, variation, uncertainty, or comparisons between groups.",
      },
      {
        id: "learning",
        label: "I’m learning the main ideas",
        description:
          "I can follow examples and would like more practice interpreting what a result supports.",
      },
      {
        id: "new",
        label: "Statistics is mostly new to me",
        description:
          "I would want visual explanations and a careful introduction to variation and uncertainty.",
      },
      unsureOption,
    ],
  },
  {
    id: "biology-coding-comfort",
    stage: "calibration",
    kicker: "Coding check-in",
    title: "What is your current relationship with coding?",
    prompt:
      "Coding experience changes the support suggested in your results; it does not decide which biological questions belong to you.",
    type: "single",
    options: [
      {
        id: "enjoy",
        label: "I enjoy writing or adapting code",
        description:
          "I would be happy working with scripts, notebooks, data tables, or visualization libraries.",
      },
      {
        id: "learning",
        label: "I’m learning",
        description:
          "I can work through examples and would like more practice changing or explaining code.",
      },
      {
        id: "new",
        label: "Mostly new to me",
        description:
          "I would want a guided notebook or a small, well-explained dataset as a starting point.",
      },
      {
        id: "tools-first",
        label: "I’d rather begin with established tools",
        description:
          "I’m open to learning code, but I want the biological question to remain central.",
      },
      unsureOption,
    ],
  },
  {
    id: "biology-tools-comfort",
    stage: "calibration",
    kicker: "Data-tool check-in",
    title: "Which computational workflow feels closest to your experience?",
    prompt:
      "A workflow might use a spreadsheet, notebook, sequence browser, structure viewer, command line, or analysis platform.",
    type: "single",
    options: [
      {
        id: "independent",
        label: "I’ve built or modified an analysis myself",
        description:
          "I have made choices about data, settings, code, or visualizations and checked the output.",
      },
      {
        id: "guided",
        label: "I’ve followed a guided notebook or workflow",
        description:
          "I can navigate a worked analysis even if I still need support making changes.",
      },
      {
        id: "basic-tools",
        label: "I’ve mainly used tables, charts, or web tools",
        description:
          "I can organize information and inspect results, but more technical workflows are new to me.",
      },
      {
        id: "new",
        label: "These tools are new to me",
        description:
          "I would want an explanation of the data, inputs, outputs, and scientific choices.",
      },
      unsureOption,
    ],
  },
  {
    id: "biology-explanation-style",
    stage: "calibration",
    kicker: "How ideas click",
    title: "Which explanation would you reach for first?",
    prompt:
      "Choose the doorway that would help you begin. Your results can still combine several explanation styles.",
    type: "single",
    options: [
      {
        id: "visual",
        label: "A biological diagram or visualization",
        description:
          "Show me a structure, pathway, cell map, evolutionary tree, or pattern in a dataset.",
      },
      {
        id: "conceptual",
        label: "A biological story in plain language",
        description:
          "Explain what the system does, what changes, and why the question matters before introducing the method.",
      },
      {
        id: "quantitative",
        label: "A quantitative pattern",
        description:
          "Show me measurements, uncertainty, trends, or model predictions across biological samples.",
      },
      {
        id: "workflow",
        label: "A worked data or code example",
        description:
          "Walk me from raw biological information through analysis choices to an interpretable result.",
      },
      {
        id: "mixed",
        label: "A mix of biological intuition and data",
        description:
          "Build the biological picture, then connect it to evidence, computation, and uncertainty.",
      },
      unsureOption,
    ],
  },
  {
    id: "biology-motivation",
    stage: "motivation",
    kicker: "Follow your attention",
    title: "Which biological doorway makes you most curious today?",
    prompt:
      "Choose what you would like to explore first. You are not committing to a career, project, or final research question.",
    type: "single",
    options: [
      {
        id: "health-disease",
        label: "Understand health and disease through biological data",
        description:
          "Explore how genetic variation, gene activity, cells, or biological pathways differ across conditions.",
        signals: { "interest:health": 3, "context:biomedical": 2 },
      },
      {
        id: "therapeutics",
        label: "Help discover or understand treatments",
        description:
          "Investigate potential targets, molecular interactions, drug response, or computational screening.",
        signals: { "interest:therapeutics": 3, "scale:molecular": 2 },
      },
      {
        id: "proteins",
        label: "Understand how proteins and other biomolecules work",
        description:
          "Connect sequence, three-dimensional structure, interactions, and motion to biological function.",
        signals: { "interest:proteins": 3, "scale:molecular": 2 },
      },
      {
        id: "genomes",
        label: "Read patterns written across genomes",
        description:
          "Compare DNA sequences, variation, gene organization, and function within or across species.",
        signals: { "interest:genomics": 3, "evidence:sequence": 2 },
      },
      {
        id: "evolution",
        label: "Reconstruct evolution and biological change",
        description:
          "Study relationships, adaptation, population history, or how organisms and pathogens change over time.",
        signals: { "interest:evolution": 3, "scale:population": 2 },
      },
      {
        id: "cells-systems",
        label: "Understand cells as changing systems",
        description:
          "Explore gene activity, cell types, pathways, networks, and how biological components influence one another.",
        signals: { "interest:cells": 3, "interest:systems": 2 },
      },
      {
        id: "microbes-ecosystems",
        label: "Explore microbes, communities, or ecosystems",
        description:
          "Investigate microbial communities, environmental DNA, biodiversity, and relationships across ecological scales.",
        signals: { "interest:ecology": 3, "interest:microbes": 2 },
      },
      {
        id: "data-methods",
        label: "Build better ways to learn from biological data",
        description:
          "Compare algorithms, create predictive models, integrate datasets, or make complex results easier to interpret.",
        signals: { "interest:methods": 3, "style:data": 2 },
      },
      {
        id: "open",
        label: "Show me several kinds of computational biology",
        description:
          "Keep multiple biological scales and question types visible while I discover what stands out.",
        uncertainty: true,
      },
    ],
  },
  {
    id: "biology-question-kind",
    stage: "question",
    kicker: "The question behind the project",
    title: "Which kind of research question sounds most satisfying?",
    prompt:
      "Choose the question you would be happiest spending time untangling, even if several appeal to you.",
    type: "single",
    options: [
      {
        id: "explain",
        label: "Explain why a biological pattern happens",
        description:
          "Connect observed differences to genes, molecules, pathways, evolution, or environmental context.",
        signals: { "mode:explain": 3, "style:interpretation": 2 },
      },
      {
        id: "predict",
        label: "Predict a biological property or outcome",
        description:
          "Use existing observations to estimate function, structure, classification, response, or future behavior.",
        signals: { "mode:predict": 3, "style:modeling": 2 },
      },
      {
        id: "compare",
        label: "Compare organisms, samples, conditions, or methods",
        description:
          "Look for meaningful similarities and differences while accounting for biological variation.",
        signals: { "mode:compare": 3, "style:comparative": 2 },
      },
      {
        id: "discover",
        label: "Find groups, features, or relationships in data",
        description:
          "Identify cell types, sequence families, communities, network connections, or previously hidden patterns.",
        signals: { "mode:discover": 3, "style:data": 2 },
      },
      {
        id: "dynamics",
        label: "Model how a biological system changes",
        description:
          "Study evolution, molecular motion, population change, signaling, metabolism, or another process over time.",
        signals: { "mode:dynamics": 3, "style:modeling": 2 },
      },
      {
        id: "design",
        label: "Design or improve a computational method",
        description:
          "Develop, adapt, or evaluate an algorithm, model, representation, or analysis workflow.",
        signals: { "mode:methods": 3, "interest:methods": 2 },
      },
      {
        id: "integrate",
        label: "Combine several kinds of biological evidence",
        description:
          "Connect sequences, expression, structures, phenotypes, images, or environmental measurements.",
        signals: { "mode:integrate": 3, "style:data": 2 },
      },
      unsureOption,
    ],
  },
  {
    id: "biology-scale",
    stage: "style",
    kicker: "Where to focus",
    title: "Which levels of living systems would you most like to investigate?",
    prompt:
      "Choose up to two. Many computational biology projects connect neighboring scales, so this is a preference rather than a boundary.",
    type: "multi",
    maxSelections: 2,
    options: [
      {
        id: "molecules",
        label: "Proteins, RNA, and molecular interactions",
        description:
          "Focus on sequence, structure, binding, motion, and molecular function.",
        signals: { "scale:molecular": 3 },
      },
      {
        id: "genes-genomes",
        label: "Genes, genomes, and inherited variation",
        description:
          "Focus on DNA sequence, gene organization, variation, and evolution.",
        signals: { "scale:genomic": 3 },
      },
      {
        id: "cells-tissues",
        label: "Cells, cell types, and tissues",
        description:
          "Focus on gene activity, cellular identity, communication, and spatial organization.",
        signals: { "scale:cellular": 3 },
      },
      {
        id: "organisms",
        label: "Whole organisms and traits",
        description:
          "Connect biological measurements to development, physiology, behavior, or observable traits.",
        signals: { "scale:organism": 3 },
      },
      {
        id: "populations-species",
        label: "Populations, species, and evolutionary lineages",
        description:
          "Study variation, ancestry, adaptation, transmission, and relationships through time.",
        signals: { "scale:population": 3 },
      },
      {
        id: "communities-ecosystems",
        label: "Communities and ecosystems",
        description:
          "Study interacting species, microbial communities, biodiversity, and environmental context.",
        signals: { "scale:ecosystem": 3 },
      },
      {
        id: "open",
        label: "I’d like to compare several scales",
        description:
          "Keep directions open across molecules, cells, organisms, and communities.",
        uncertainty: true,
      },
    ],
  },
  {
    id: "biology-evidence",
    stage: "style",
    kicker: "Evidence you want to inspect",
    title:
      "Which kinds of biological information would you most enjoy working with?",
    prompt:
      "Choose up to two. You do not need prior experience with a data type for it to be interesting.",
    type: "multi",
    maxSelections: 2,
    options: [
      {
        id: "sequences",
        label: "DNA, RNA, or protein sequences",
        description:
          "Compare letters, motifs, variation, similarity, ancestry, and possible function.",
        signals: { "evidence:sequence": 3 },
      },
      {
        id: "structures-images",
        label: "Molecular structures or biological images",
        description:
          "Reason from shapes, spatial organization, interactions, microscopy, or three-dimensional models.",
        signals: { "evidence:structure": 3, "style:visual": 1 },
      },
      {
        id: "measurements",
        label: "Tables of gene activity or other measurements",
        description:
          "Compare many features across samples, conditions, cells, or time points.",
        signals: { "evidence:measurements": 3, "style:data": 1 },
      },
      {
        id: "networks-pathways",
        label: "Networks and biological pathways",
        description:
          "Trace how genes, proteins, reactions, cells, or species may influence one another.",
        signals: { "evidence:networks": 3 },
      },
      {
        id: "trees-time",
        label: "Evolutionary trees or changing systems",
        description:
          "Follow ancestry, transmission, populations, molecules, or cellular processes through time.",
        signals: { "evidence:temporal": 3 },
      },
      {
        id: "mixed-sources",
        label: "Several connected sources of evidence",
        description:
          "Integrate different measurements to build a fuller view of one biological question.",
        signals: { "evidence:integrated": 3, "mode:integrate": 1 },
      },
      unsureOption,
    ],
  },
  {
    id: "biology-workflow",
    stage: "style",
    kicker: "How you like to investigate",
    title: "Which research activities sound most satisfying?",
    prompt:
      "Choose up to three. This helps distinguish nearby directions that study similar biology in different ways.",
    type: "multi",
    maxSelections: 3,
    options: [
      {
        id: "visualize",
        label: "Build or interpret clear visualizations",
        description:
          "Use plots, maps, networks, trees, or structures to make a biological pattern understandable.",
        signals: { "style:visual": 3, "style:interpretation": 1 },
      },
      {
        id: "statistics",
        label: "Separate meaningful patterns from variation",
        description:
          "Use careful comparisons, uncertainty, and statistical evidence to judge a claim.",
        signals: { "style:statistics": 3 },
      },
      {
        id: "code",
        label: "Write or adapt code for an analysis",
        description:
          "Automate repeated work, transform data, test ideas, or create a reproducible workflow.",
        signals: { "style:coding": 3 },
      },
      {
        id: "simulate",
        label: "Simulate how a biological system behaves",
        description:
          "Create a model, vary its assumptions, and examine how the predicted system changes.",
        signals: { "style:simulation": 3, "style:modeling": 1 },
      },
      {
        id: "compare-methods",
        label: "Compare methods and test their reliability",
        description:
          "Ask when an algorithm or model works, where it fails, and what evidence supports it.",
        signals: { "style:benchmarking": 3, "interest:methods": 1 },
      },
      {
        id: "interpret-literature",
        label: "Connect computational results to biological meaning",
        description:
          "Read across studies, inspect assumptions, and explain what an analysis does and does not show.",
        signals: { "style:interpretation": 3 },
      },
      unsureOption,
    ],
  },
];
