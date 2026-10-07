import { describe, expect, it } from "vitest";
import {
  computationalPhysicsFoundation,
  COMPUTATIONAL_PHYSICS_STORAGE_KEY,
  physicsGlossary,
} from "@/data/pathfinders/computational-physics";
import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { getPathfinder } from "@/data/pathfinders";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";
import { getPlannedQuestionCount, getVisibleQuestions } from "@/lib/branching";

const { identity, intro, storage, survey } = computationalPhysicsFoundation;

describe("computational physics Phase 1 foundation", () => {
  it("defines a distinct identity with a released catalog route", () => {
    expect(identity).toEqual({
      id: "computational-physics",
      name: "Computational Physics Pathfinder",
      shortName: "Computational physics",
      brandLabel: "Physics Research Pathfinder",
      ariaLabel: "Computational Physics Research Pathfinder",
      route: "/pathfinders/computational-physics",
      icon: "physics",
    });

    const catalogEntry = getPathfinder(identity.id);
    expect(catalogEntry?.name).toBe(identity.name);
    expect(catalogEntry?.shortName).toBe(identity.shortName);
    expect(catalogEntry?.status).toBe("available");
    expect(catalogEntry?.href).toBe(identity.route);
  });

  it("keeps physics progress isolated from every released pathfinder", () => {
    expect(storage.key).toBe(COMPUTATIONAL_PHYSICS_STORAGE_KEY);
    expect(storage.version).toBe(1);
    expect(storage.key).not.toBe(quantumChemistryPathfinder.storage.key);
    expect(storage.key).not.toBe(computationalMaterialsPathfinder.storage.key);
    expect(storage.key).not.toBe(computationalBiologyPathfinder.storage.key);
  });

  it("provides a complete twelve-question common path", () => {
    const commonQuestions = survey.questions.filter(
      (question) => !question.visibleWhen,
    );
    expect(commonQuestions).toHaveLength(12);
    expect(survey.questions.some((question) => question.visibleWhen)).toBe(
      true,
    );
    expect(new Set(survey.questions.map((question) => question.id)).size).toBe(
      survey.questions.length,
    );
    expect(survey.branchQuestionId).toBe("physics-motivation");
    expect(getVisibleQuestions({}, survey.questions)).toHaveLength(12);
    expect(
      getPlannedQuestionCount({}, survey.questions, survey.branchQuestionId),
    ).toBe(14);

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

  it("keeps all seven calibration questions out of recommendation scoring", () => {
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

  it("offers exactly one neutral uncertainty choice in every question", () => {
    for (const question of survey.questions) {
      const uncertaintyOptions = question.options.filter(
        (option) => option.uncertainty,
      );
      expect(uncertaintyOptions, question.id).toHaveLength(1);
      expect(uncertaintyOptions[0].signals, question.id).toBeUndefined();
      expect(uncertaintyOptions[0].nicheBoosts, question.id).toBeUndefined();
    }
  });

  it("offers a broad motivation set without treating openness as a signal", () => {
    const motivation = survey.questions.find(
      (question) => question.id === survey.branchQuestionId,
    );
    expect(motivation?.options).toHaveLength(9);
    expect(motivation?.options.filter((option) => option.signals)).toHaveLength(
      8,
    );
    expect(
      motivation?.options.find((option) => option.id === "open"),
    ).toMatchObject({ uncertainty: true });
  });

  it("states the exploratory, private, and ability-neutral boundaries", () => {
    expect(intro.scopeNote).toContain("not a final research question");
    expect(intro.scopeNote).toContain("judgment of mathematical ability");
    expect(intro.privacyNote).toContain("does not transmit");
    expect(intro.noScoreLabel).toContain("not access");
  });

  it("ships a complete, unique foundational glossary", () => {
    expect(physicsGlossary).toHaveLength(13);
    expect(new Set(physicsGlossary.map((item) => item.term)).size).toBe(
      physicsGlossary.length,
    );
    expect(physicsGlossary.map((item) => item.term)).toEqual(
      expect.arrayContaining([
        "Computational model",
        "Numerical simulation",
        "Discretization",
        "Convergence",
        "Validation",
        "Uncertainty quantification",
      ]),
    );
    for (const item of physicsGlossary) {
      expect(item.term.trim().length).toBeGreaterThan(0);
      expect(item.text.trim().length, item.term).toBeGreaterThan(30);
    }
  });

  it("remains serializable as editable local data", () => {
    expect(() => JSON.stringify(computationalPhysicsFoundation)).not.toThrow();
    expect(JSON.parse(JSON.stringify(computationalPhysicsFoundation))).toEqual(
      computationalPhysicsFoundation,
    );
  });
});
