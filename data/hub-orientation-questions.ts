import type { HubOrientationQuestion } from "@/lib/hub-orientation";

export const hubOrientationQuestions: readonly HubOrientationQuestion[] = [
  {
    id: "broad-curiosity",
    kicker: "Question 1 · Broad curiosity",
    title: "Which scientific neighborhood would you most like to peek into?",
    guidance:
      "Choose the scene that makes you want to ask one more question. You do not need prior experience in it.",
    options: [
      {
        id: "molecular-health",
        label: "How molecules shape medicines and health",
        description:
          "Interactions among drugs, proteins, DNA, membranes, and their surroundings.",
        evidence: [
          {
            signalId: "motivation:molecular-health",
            label: "Molecules and health",
            weight: 3,
          },
        ],
      },
      {
        id: "energy-sustainability",
        label: "How matter captures, stores, or transforms energy",
        description:
          "Batteries, solar energy, catalysts, transport, and sustainable technologies.",
        evidence: [
          {
            signalId: "motivation:energy-sustainability",
            label: "Energy and sustainability",
            weight: 3,
          },
        ],
      },
      {
        id: "environment-earth",
        label: "How environmental and Earth systems change",
        description:
          "Atmospheres, oceans, climate, pollutants, and processes across scales.",
        evidence: [
          {
            signalId: "motivation:environment-earth",
            label: "Environment and Earth",
            weight: 3,
          },
        ],
      },
      {
        id: "materials-technology",
        label: "How new materials gain useful properties",
        description:
          "Electronic, structural, catalytic, energy, and soft materials.",
        evidence: [
          {
            signalId: "motivation:materials-technology",
            label: "Materials and technology",
            weight: 3,
          },
        ],
      },
      {
        id: "living-systems",
        label: "How living systems store information and function",
        description:
          "Biomolecules, cells, genomes, evolution, and biological networks.",
        evidence: [
          {
            signalId: "motivation:living-systems",
            label: "Living systems",
            weight: 3,
          },
        ],
      },
      {
        id: "fundamental-rules",
        label: "How fundamental rules create observable behavior",
        description:
          "Underlying chemical and physical principles, from electrons to complex systems.",
        evidence: [
          {
            signalId: "motivation:fundamental-rules",
            label: "Fundamental rules",
            weight: 3,
          },
        ],
      },
      {
        id: "space-universe",
        label: "How matter behaves in space and extreme environments",
        description:
          "Planets, interstellar chemistry, stars, galaxies, and the universe.",
        evidence: [
          {
            signalId: "motivation:space-universe",
            label: "Space and the universe",
            weight: 3,
          },
        ],
      },
      {
        id: "methods-computing",
        label: "How better computation can unlock science",
        description:
          "Algorithms, simulations, machine learning, and careful method evaluation.",
        evidence: [
          {
            signalId: "motivation:methods-computing",
            label: "Methods and computing",
            weight: 3,
          },
        ],
      },
    ],
  },
];
