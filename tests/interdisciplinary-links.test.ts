import { describe, expect, it } from "vitest";
import { pathfinderModules } from "@/data/pathfinder-modules";
import {
  buildInterdisciplinarySearch,
  getInterdisciplinaryDestination,
  getInterdisciplinaryLinksForDirection,
  type InterdisciplinaryLink,
} from "@/lib/interdisciplinary-links";

const links: InterdisciplinaryLink[] = [
  {
    id: "example-to-materials",
    sourceNicheId: "example-direction",
    targetPathfinderId: "computational-materials",
    targetPathfinderName: "Computational materials",
    targetNicheId: "example-materials-direction",
    targetNicheName: "Example materials direction",
    bridge: "The two directions share a structure–property question.",
    distinction: "One starts with molecules; the other starts with solids.",
    sharedKeywords: ["structure property", "multiscale modeling"],
  },
  {
    id: "another-to-physics",
    sourceNicheId: "another-direction",
    targetPathfinderId: "computational-physics",
    targetPathfinderName: "Computational physics",
    targetNicheId: "example-physics-direction",
    targetNicheName: "Example physics direction",
    bridge: "The two directions share a dynamical model.",
    distinction: "They organize the model around different systems.",
    sharedKeywords: ["dynamical systems", "simulation"],
  },
];

describe("interdisciplinary link helpers", () => {
  it("selects links for only the active direction", () => {
    expect(
      getInterdisciplinaryLinksForDirection(links, "example-direction"),
    ).toEqual([links[0]]);
  });

  it("derives a stable pathfinder route and bridge search", () => {
    expect(getInterdisciplinaryDestination(links[0])).toBe(
      "/pathfinders/computational-materials",
    );
    expect(buildInterdisciplinarySearch(links[0])).toBe(
      "structure property multiscale modeling review",
    );
  });
});

describe("released interdisciplinary link coverage", () => {
  const definitions = pathfinderModules.map(
    (moduleEntry) => moduleEntry.definition,
  );

  it("gives every released pathfinder a small, varied bridge set", () => {
    for (const definition of definitions) {
      const links = definition.interdisciplinaryLinks;
      expect(links.length, definition.identity.id).toBeGreaterThanOrEqual(5);
      expect(
        new Set(links.map((link) => link.sourceNicheId)).size,
        definition.identity.id,
      ).toBe(links.length);
      expect(
        new Set(links.map((link) => link.targetPathfinderId)).size,
        definition.identity.id,
      ).toBeGreaterThanOrEqual(2);
    }
  });

  it("keeps bridge searches focused and tied to local directions", () => {
    for (const definition of definitions) {
      const nicheIds = new Set(
        definition.recommendations.niches.map((niche) => niche.id),
      );
      for (const link of definition.interdisciplinaryLinks) {
        expect(nicheIds.has(link.sourceNicheId), link.id).toBe(true);
        expect(link.targetPathfinderId, link.id).not.toBe(
          definition.identity.id,
        );
        expect(link.sharedKeywords, link.id).toHaveLength(3);
        expect(buildInterdisciplinarySearch(link), link.id).toMatch(/ review$/);
      }
    }
  });

  it("ships twenty curated bridges across the four current subjects", () => {
    expect(
      definitions.flatMap((definition) => definition.interdisciplinaryLinks),
    ).toHaveLength(20);
  });
});
