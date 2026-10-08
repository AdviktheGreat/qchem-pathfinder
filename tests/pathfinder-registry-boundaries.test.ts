import { describe, expect, it } from "vitest";
import { pathfinderModules } from "@/data/pathfinder-modules";

describe("pathfinder registry boundaries", () => {
  it("aligns every released ID, route, and storage namespace", () => {
    const ids = new Set<string>();
    const routes = new Set<string>();
    const storageKeys = new Set<string>();

    for (const moduleEntry of pathfinderModules) {
      const { identity, storage } = moduleEntry.definition;

      expect(identity.route).toBe(`/pathfinders/${identity.id}`);
      expect(storage.key).toMatch(/^[a-z0-9-]+:progress$/);
      expect(storage.version).toBeGreaterThan(0);
      expect(ids.has(identity.id), identity.id).toBe(false);
      expect(routes.has(identity.route), identity.route).toBe(false);
      expect(storageKeys.has(storage.key), storage.key).toBe(false);

      ids.add(identity.id);
      routes.add(identity.route);
      storageKeys.add(storage.key);
    }
  });

  it("keeps every available manifest complete and serializable", () => {
    for (const moduleEntry of pathfinderModules) {
      expect(moduleEntry.lifecycle).toBe("available");
      expect(moduleEntry.catalog.eyebrow.trim().length).toBeGreaterThan(0);
      expect(moduleEntry.catalog.description.trim().length).toBeGreaterThan(0);
      expect(moduleEntry.catalog.outcome.trim().length).toBeGreaterThan(0);
      expect(moduleEntry.catalog.focusAreas.length).toBeGreaterThanOrEqual(3);
      expect(moduleEntry.metadata.description.trim().length).toBeGreaterThan(0);
      expect(
        moduleEntry.metadata.openGraphDescription.trim().length,
      ).toBeGreaterThan(0);
      expect(() => JSON.stringify(moduleEntry.definition)).not.toThrow();
    }
  });

  it("does not compare recommendation scores across module boundaries", () => {
    for (const moduleEntry of pathfinderModules) {
      expect(moduleEntry).not.toHaveProperty("platformScore");
      expect(moduleEntry.catalog).not.toHaveProperty("score");
    }
  });
});
