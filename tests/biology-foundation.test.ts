import { describe, expect, it } from "vitest";
import {
  computationalBiologyFoundation,
  COMPUTATIONAL_BIOLOGY_STORAGE_KEY,
} from "@/data/pathfinders/computational-biology";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";
import { getPathfinder } from "@/data/pathfinders";

const { identity, intro, storage, survey } = computationalBiologyFoundation;

describe("computational biology Phase 1 foundation", () => {
  it("defines a distinct, internally consistent pathfinder identity", () => {
    expect(identity).toEqual({
      id: "computational-biology",
      name: "Computational Biology Pathfinder",
      shortName: "Computational biology",
      brandLabel: "Biology Research Pathfinder",
      ariaLabel: "Computational Biology Research Pathfinder",
      route: "/pathfinders/computational-biology",
      icon: "biology",
    });

    const catalogEntry = getPathfinder(identity.id);
    expect(catalogEntry?.name).toBe(identity.name);
    expect(catalogEntry?.shortName).toBe(identity.shortName);
    expect(catalogEntry?.status).toBe("available");
    expect(catalogEntry?.href).toBe(identity.route);
  });

  it("keeps biology progress isolated from the existing pathfinders", () => {
    expect(storage.key).toBe(COMPUTATIONAL_BIOLOGY_STORAGE_KEY);
    expect(storage.version).toBe(1);
    expect(storage.key).not.toBe(quantumChemistryPathfinder.storage.key);
    expect(storage.key).not.toBe(computationalMaterialsPathfinder.storage.key);
  });

  it("keeps twelve common questions ahead of targeted adaptive follow-ups", () => {
    const commonQuestions = survey.questions.filter(
      (question) => !question.visibleWhen,
    );
    expect(commonQuestions).toHaveLength(12);
    expect(new Set(survey.questions.map((question) => question.id)).size).toBe(
      survey.questions.length,
    );
    expect(survey.branchQuestionId).toBe("biology-motivation");
    expect(survey.questions.some((question) => question.visibleWhen)).toBe(
      true,
    );

    for (const question of survey.questions) {
      expect(question.options.length, question.id).toBeGreaterThanOrEqual(4);
      expect(
        new Set(question.options.map((option) => option.id)).size,
        question.id,
      ).toBe(question.options.length);
      if (question.type === "multi")
        expect(question.maxSelections, question.id).toBeGreaterThan(0);
    }
  });

  it("keeps calibration evidence out of recommendation scoring", () => {
    expect(survey.calibrationQuestionIds).toHaveLength(7);

    for (const question of survey.questions.filter(
      (candidate) => candidate.stage === "calibration",
    )) {
      expect(survey.calibrationQuestionIds).toContain(question.id);
      for (const option of question.options) {
        expect(option.signals, `${question.id}:${option.id}`).toBeUndefined();
        expect(
          option.nicheBoosts,
          `${question.id}:${option.id}`,
        ).toBeUndefined();
      }
    }
  });

  it("offers one non-scoring uncertainty choice in every question", () => {
    for (const question of survey.questions) {
      const uncertaintyOptions = question.options.filter(
        (option) => option.uncertainty,
      );
      expect(uncertaintyOptions, question.id).toHaveLength(1);
      expect(uncertaintyOptions[0].signals, question.id).toBeUndefined();
      expect(uncertaintyOptions[0].nicheBoosts, question.id).toBeUndefined();
    }
  });

  it("states the exploratory, private, and non-clinical boundaries", () => {
    expect(intro.scopeNote).toContain("not a final research question");
    expect(intro.scopeNote).toContain("medical recommendation");
    expect(intro.privacyNote).toContain("does not transmit");
    expect(intro.noScoreLabel).toContain("not access");
  });
});
