import { describe, expect, it } from "vitest";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology/pathfinder";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";
import {
  getNewPathfinderProgress,
  readPathfinderProgress,
} from "@/lib/pathfinder-progress-summary";

describe("pathfinder progress summaries", () => {
  it("uses the definition identity for a new pathfinder", () => {
    expect(getNewPathfinderProgress(computationalMaterialsPathfinder)).toEqual({
      label: "Ready when you are",
      detail: "No saved answers yet",
      cta: "Open computational materials",
      complete: false,
    });
  });

  it("reads progress with the matching definition and storage schema", () => {
    const raw = JSON.stringify({
      version: computationalMaterialsPathfinder.storage.version,
      savedAt: "2026-10-01T12:00:00.000Z",
      screen: "survey",
      currentQuestionId: "materials-starting-point",
      answers: { "materials-starting-point": ["recognize"] },
    });

    expect(
      readPathfinderProgress(computationalMaterialsPathfinder, raw),
    ).toMatchObject({
      label: "Exploration in progress",
      cta: "Continue computational materials",
      complete: false,
    });
  });

  it("does not interpret another pathfinder's storage record", () => {
    const raw = JSON.stringify({
      version: quantumChemistryPathfinder.storage.version,
      savedAt: "2026-10-01T12:00:00.000Z",
      screen: "survey",
      currentQuestionId: "phase-one-memory",
      answers: { "phase-one-memory": ["fresh"] },
    });

    expect(
      readPathfinderProgress(computationalMaterialsPathfinder, raw),
    ).toEqual(getNewPathfinderProgress(computationalMaterialsPathfinder));
  });

  it("summarizes biology progress through the shared definition registry", () => {
    const raw = JSON.stringify({
      version: computationalBiologyPathfinder.storage.version,
      savedAt: "2026-10-03T12:00:00.000Z",
      screen: "survey",
      currentQuestionId: "biology-question-kind",
      answers: {
        "biology-starting-point": ["recognize"],
        "biology-concept-familiarity": ["genes-genomes"],
        "biology-quantitative-comfort": ["with-guidance"],
        "biology-statistics-comfort": ["learning"],
        "biology-coding-comfort": ["learning"],
        "biology-tools-comfort": ["guided"],
        "biology-explanation-style": ["visual"],
        "biology-motivation": ["genomes"],
      },
    });

    expect(readPathfinderProgress(computationalBiologyPathfinder, raw)).toEqual(
      {
        label: "Exploration in progress",
        detail: "8 of 14 questions answered",
        cta: "Continue computational biology",
        complete: false,
      },
    );
  });
});
