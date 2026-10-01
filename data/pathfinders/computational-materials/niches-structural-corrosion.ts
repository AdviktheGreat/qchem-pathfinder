import type { Niche } from "@/lib/types";
import { materialsNicheDefaults } from "@/data/pathfinders/computational-materials/niche-defaults";

export const structuralCorrosionDirections: Niche[] = [
  {
    ...materialsNicheDefaults,
    id: "structural-alloys-ceramics",
    area: "Structural materials",
    name: "Structural alloys & ceramics",
    shortDescription:
      "Connect composition, phases, defects, and microstructure to strength, toughness, and failure.",
    explanation:
      "Structural materials must survive force, temperature, fatigue, and sometimes extreme environments. Their response depends on features from atomic bonds and defects to grains, phases, and cracks. Computational work links these scales to explain deformation and guide compositions or microstructures with better performance.",
    questions: [
      "Which defects or interfaces control deformation and fracture?",
      "How do composition and heat treatment change the stable phases and microstructure?",
      "Can a model predict strength or failure under a realistic loading condition?",
    ],
    systems: [
      "Lightweight and high-temperature alloys",
      "Structural ceramics",
      "Grain boundaries and multiphase microstructures",
      "Composite and additively manufactured materials",
    ],
    approaches: [
      {
        name: "Atomistic deformation simulation",
        explanation:
          "DFT and molecular dynamics examine bonding, dislocations, grain boundaries, and crack behavior at small scales.",
      },
      {
        name: "Phase-field and microstructure modeling",
        explanation:
          "Continuum fields simulate how grains and phases form, evolve, and interact during processing or loading.",
      },
      {
        name: "Crystal plasticity and finite-element modeling",
        explanation:
          "Larger-scale models predict how orientation, microstructure, and geometry distribute deformation and stress.",
      },
    ],
    concepts: [
      "Bonding and elastic response",
      "Defects, dislocations, and grain boundaries",
      "Phase stability and microstructure",
      "Stress, strain, toughness, and fracture",
    ],
    preparation:
      "Begin with one mechanical response—such as elastic deformation or crack growth—and identify the structural scale responsible. More advanced continuum mechanics can follow after the physical mechanism is clear.",
    keywords: [
      "structural materials modeling",
      "alloy simulation",
      "ceramic mechanics",
      "dislocation",
      "grain boundary",
      "fracture",
      "microstructure",
    ],
    synonyms: [
      "computational mechanics of materials",
      "integrated computational materials engineering",
      "multiscale structural materials",
    ],
    searches: {
      orientation: "computational structural alloys ceramics modeling overview",
      focused:
        "atomistic microstructure deformation fracture alloy ceramic simulation",
      review: "recent review multiscale modeling structural alloys ceramics",
    },
    affinities: {
      "interest:structural": 3,
      "mode:explain": 3,
      "mode:predict": 2,
      "mode:design": 2,
      "mode:optimize": 3,
      "family:crystalline": 2,
      "family:composite": 3,
      "phenomenon:mechanical": 3,
      "purpose:applied": 3,
      "scale:microstructure": 3,
      "scale:multiscale": 3,
      "change:dynamic": 2,
      "medium:visual": 2,
      "medium:equations": 2,
    },
    reasons: [
      {
        signal: "interest:structural",
        category: "interest",
        text: "You chose materials that must remain strong, safe, and useful under demanding conditions.",
      },
      {
        signal: "mode:explain",
        category: "interest",
        text: "This direction explains larger-scale mechanical behavior through structure and defects.",
      },
      {
        signal: "phenomenon:mechanical",
        category: "style",
        text: "Strength, deformation, and failure were among the behaviors you wanted to investigate.",
      },
      {
        signal: "scale:multiscale",
        category: "style",
        text: "Structural performance naturally connects atomistic, microstructural, and component scales.",
      },
    ],
    comparisonLens:
      "Compared with corrosion modeling, this direction centers mechanical performance and failure; chemical degradation may be a boundary condition rather than the main mechanism.",
  },
  {
    ...materialsNicheDefaults,
    id: "corrosion-protective-interfaces",
    area: "Degradation and protection",
    name: "Corrosion & protective-interface modeling",
    shortDescription:
      "Investigate how reactive environments damage materials and how coatings or passive films interrupt that process.",
    explanation:
      "Corrosion begins through coupled chemical, electrochemical, and transport events at an interface. Water, oxygen, salts, stress, defects, and changing surface films can all matter. Computation isolates early reaction steps and transport pathways, then helps evaluate protective oxides, coatings, and interface designs.",
    questions: [
      "Which surface reaction or defect initiates material degradation?",
      "How do water, ions, and oxygen move through a protective layer?",
      "What makes a passive film or coating stable, adherent, and resistant to breakdown?",
    ],
    systems: [
      "Metal oxidation and aqueous corrosion",
      "Passive oxide films",
      "Protective coatings and inhibitor molecules",
      "Buried interfaces and environmentally assisted cracking",
    ],
    approaches: [
      {
        name: "Surface and interface DFT",
        explanation:
          "Electronic-structure calculations compare adsorption, reaction, adhesion, and defect processes at exposed or coated surfaces.",
      },
      {
        name: "Reactive molecular dynamics",
        explanation:
          "Bond-forming atomistic simulations explore oxidation, hydration, and film growth across larger structures and times.",
      },
      {
        name: "Transport and continuum corrosion models",
        explanation:
          "Diffusion, electrochemistry, and mechanics models connect local reactions to film breakdown and longer-term damage.",
      },
    ],
    concepts: [
      "Oxidation and reduction",
      "Surface reactions and adsorption",
      "Diffusion through interfaces",
      "Defects, stress, and protective films",
    ],
    preparation:
      "Start with one material–environment pair and the first proposed degradation event. Corrosion spans many timescales, so explicitly note which part of the process each model can and cannot represent.",
    keywords: [
      "computational corrosion",
      "protective coating",
      "passive film",
      "surface oxidation",
      "reactive molecular dynamics",
      "interface adhesion",
      "corrosion inhibitor",
    ],
    synonyms: [
      "materials degradation modeling",
      "corrosion interface simulation",
      "protective-film computation",
    ],
    searches: {
      orientation:
        "computational corrosion protective interfaces modeling overview",
      focused:
        "DFT reactive molecular dynamics oxide passive film corrosion interface",
      review:
        "recent review atomistic modeling corrosion protective coatings interfaces",
    },
    affinities: {
      "interest:structural": 3,
      "interest:environment": 2,
      "application:sustainability": 2,
      "mode:explain": 3,
      "mode:dynamics": 3,
      "mode:design": 2,
      "family:composite": 2,
      "phenomenon:surfaces": 3,
      "phenomenon:chemical-change": 3,
      "phenomenon:ions": 2,
      "purpose:applied": 3,
      "scale:surface": 3,
      "scale:multiscale": 2,
      "change:dynamic": 3,
      "connection:experiment": 2,
    },
    reasons: [
      {
        signal: "interest:structural",
        category: "interest",
        text: "You were interested in why useful materials lose performance and how to extend their lifetime.",
      },
      {
        signal: "mode:dynamics",
        category: "interest",
        text: "Corrosion is an evolving sequence of reactions, transport, and structural change.",
      },
      {
        signal: "phenomenon:surfaces",
        category: "style",
        text: "You wanted to investigate what happens where a material meets its environment.",
      },
      {
        signal: "phenomenon:chemical-change",
        category: "style",
        text: "Chemical transformation of a surface or protective layer is the central process here.",
      },
    ],
    comparisonLens:
      "Compared with structural-alloy modeling, this direction centers chemical and electrochemical degradation at surfaces and the interfaces designed to block it.",
  },
];
