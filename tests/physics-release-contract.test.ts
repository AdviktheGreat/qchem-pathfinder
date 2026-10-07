import { describe, expect, it } from "vitest";
import { getPathfinderDefinition } from "@/data/pathfinder-definitions";
import { getPathfinder } from "@/data/pathfinders";
import { computationalPhysicsPathfinder } from "@/data/pathfinders/computational-physics";
import { getVisibleQuestions } from "@/lib/branching";
import type { AnswerMap } from "@/lib/types";

const definition = computationalPhysicsPathfinder;

describe("computational physics release contract", () => {
  it("keeps the catalog, registry, route, and local storage identity aligned", () => {
    const catalogEntry = getPathfinder(definition.identity.id);

    expect(catalogEntry).toMatchObject({
      id: definition.identity.id,
      name: definition.identity.name,
      href: definition.identity.route,
      status: "available",
    });
    expect(getPathfinderDefinition(definition.identity.id)).toBe(definition);
    expect(definition.identity.route).toBe(
      "/pathfinders/computational-physics",
    );
    expect(definition.storage).toEqual({
      key: "computational-physics-pathfinder:progress",
      version: 1,
    });
  });

  it("provides a complete fourteen-question journey for every motivation", () => {
    const motivation = definition.survey.questions.find(
      (question) => question.id === definition.survey.branchQuestionId,
    )!;

    for (const motivationOption of motivation.options) {
      const answers: AnswerMap = {
        [motivation.id]: [motivationOption.id],
      };
      const visible = getVisibleQuestions(answers, definition.survey.questions);

      expect(visible, motivationOption.id).toHaveLength(14);
      expect(
        visible.filter((question) => question.visibleWhen),
        motivationOption.id,
      ).toHaveLength(2);
      expect(new Set(visible.map((question) => question.id)).size).toBe(
        visible.length,
      );
    }
  });

  it("ships every results, literature, and export capability", () => {
    expect(definition.recommendations.niches).toHaveLength(28);
    expect(definition.recommendations.openExplorationIds).toHaveLength(3);
    expect(definition.results.searchProviders?.length).toBeGreaterThanOrEqual(
      2,
    );
    expect(
      definition.results.readingCopy?.checklist.length,
    ).toBeGreaterThanOrEqual(3);
    expect(definition.results.readingCopy?.citationWarning).toMatch(
      /verify|check/i,
    );
    expect(definition.results.exportCopy).toBeDefined();
    expect(definition.results.actionsCopy).toBeDefined();
    expect(definition.profile.exportTitle).toContain("PHYSICS");

    for (const niche of definition.recommendations.niches) {
      expect(niche.keywords.length, niche.id).toBeGreaterThanOrEqual(5);
      expect(Object.values(niche.searches), niche.id).toHaveLength(3);
      expect(
        Object.values(niche.searches).every((query) => query.trim().length > 0),
        niche.id,
      ).toBe(true);
      expect(JSON.stringify(niche), niche.id).not.toMatch(
        /\b(?:TODO|TBD|placeholder)\b/i,
      );
    }
  });

  it("remains a fully serializable local definition", () => {
    const serialized = JSON.stringify(definition);
    const restored = JSON.parse(serialized);

    expect(restored.identity).toEqual(definition.identity);
    expect(restored.survey.questions).toHaveLength(
      definition.survey.questions.length,
    );
    expect(restored.recommendations.niches).toHaveLength(28);
    expect(serialized).not.toContain("apiKey");
  });
});
