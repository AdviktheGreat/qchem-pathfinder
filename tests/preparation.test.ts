import { expect, it } from "vitest";
import { getPreparationProfile, mergeConcepts } from "@/lib/preparation";
import { getRecommendations } from "@/lib/recommendation";
import { formatResearchProfile } from "@/lib/profile-export";
import { getPreparationSteps, getExplanationGuide } from "@/lib/preparation";

it("folds covered concepts into present umbrella topics without removing distinct concepts", () => {
  expect(
    mergeConcepts([
      "Electron density",
      "Molecular orbitals",
      "Orbitals and electron density",
      "Electron correlation",
    ]),
  ).toEqual(["Orbitals and electron density", "Electron correlation"]);
  expect(mergeConcepts(["Electron density", "Molecular orbitals"])).toEqual([
    "Electron density",
    "Molecular orbitals",
  ]);
});

it("offers concrete preparation for different experience levels", () => {
  const beginner = getPreparationSteps({
    "math-comfort": ["concept-first"],
    "coding-comfort": ["new"],
  });
  const experienced = getPreparationSteps({
    "math-comfort": ["comfortable"],
    "coding-comfort": ["enjoy"],
  });
  expect(beginner[0]).toContain("figure or energy diagram");
  expect(beginner[1]).toContain("facilitator");
  expect(experienced[1]).toContain("script");
  expect(getPreparationSteps({}).every(Boolean)).toBe(true);
});

it("adapts the entry explanation and initial context depth", () => {
  const conceptual = getExplanationGuide({
    "explanation-style": ["conceptual"],
  });
  expect(conceptual.text).toContain("molecular story");
  expect(conceptual.showContextInitially).toBe(true);
  const quantitative = getExplanationGuide({
    "explanation-style": ["quantitative"],
    "phase-one-memory": ["fresh"],
  });
  expect(quantitative.text).toContain("measurable property");
  expect(quantitative.showContextInitially).toBe(false);
});

it("exports the same personalized preparation shown in results", () => {
  const answers = { motivation: ["computing"], "coding-comfort": ["new"] };
  const niche = getRecommendations(answers)[0].niche;
  const preparation = getPreparationProfile(answers, niche);
  const exported = formatResearchProfile(answers);
  for (const text of [
    preparation.nicheNote,
    preparation.explanation.text,
    ...preparation.steps,
  ])
    expect(exported).toContain(text);
});

it("keeps niche-specific concepts even when all Phase 1 ideas are familiar", () => {
  const answers = {
    "concept-familiarity": [
      "orbitals",
      "energy",
      "bonding",
      "spectra",
      "methods",
    ],
  };
  const niche = getRecommendations(answers)[0].niche;
  const preparation = getPreparationProfile(answers, niche);
  expect(preparation.concepts).toEqual(niche.concepts);
  for (const concept of preparation.concepts)
    expect(formatResearchProfile(answers)).toContain(`- ${concept}`);
});
