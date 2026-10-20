import { describe, expect, it } from "vitest";
import { pathfinderModules } from "@/data/pathfinder-modules";
import { resolveInterdisciplinaryDestination } from "@/lib/interdisciplinary-destinations";
import {
  buildInterdisciplinarySearch,
  buildInterdisciplinarySearchQueries,
  getInterdisciplinaryDestination,
  getInterdisciplinaryLinksForDirection,
  INTERDISCIPLINARY_CONNECTION_KINDS,
  type InterdisciplinaryLink,
} from "@/lib/interdisciplinary-links";

const links: InterdisciplinaryLink[] = [
  {
    id: "example-to-materials",
    sourceNicheId: "example-direction",
    connectionKinds: ["shared-question", "connected-scales"],
    sharedQuestion:
      "How does a shared structure create behavior at two scientific scales?",
    explorationStep:
      "Compare one source-field review with one target-field perspective.",
    targetPathfinderId: "computational-materials",
    targetPathfinderName: "Computational materials",
    targetNicheId: "example-materials-direction",
    targetNicheName: "Example materials direction",
    bridge: "The two directions share a structure–property question.",
    distinction: "One starts with molecules; the other starts with solids.",
    sharedKeywords: ["structure property", "multiscale modeling"],
    searchSeeds: {
      orientation: ["structure property", "multiscale modeling"],
      focused: ["molecular structure", "solid interfaces"],
      review: ["cross-scale structure property"],
    },
  },
  {
    id: "another-to-physics",
    sourceNicheId: "another-direction",
    connectionKinds: ["shared-method"],
    sharedQuestion:
      "How can one dynamical model clarify behavior in both fields?",
    explorationStep:
      "Trace the same model through one example from each field.",
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
  it("defines a stable, score-free connection vocabulary", () => {
    expect(INTERDISCIPLINARY_CONNECTION_KINDS).toEqual([
      "shared-system",
      "shared-method",
      "shared-question",
      "shared-data",
      "shared-application",
      "connected-scales",
    ]);
    expect(new Set(INTERDISCIPLINARY_CONNECTION_KINDS).size).toBe(
      INTERDISCIPLINARY_CONNECTION_KINDS.length,
    );
  });

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

  it("resolves destinations from canonical released definitions", () => {
    const link = pathfinderModules[0].definition.interdisciplinaryLinks[0];
    expect(
      resolveInterdisciplinaryDestination(link, pathfinderModules),
    ).toEqual({
      pathfinderId: "computational-materials",
      pathfinderName: "Computational materials",
      route: "/pathfinders/computational-materials",
      nicheId: "photovoltaic-materials",
      nicheName: "Photovoltaic materials",
    });
    expect(
      resolveInterdisciplinaryDestination(
        { ...link, targetNicheId: "missing-direction" },
        pathfinderModules,
      ),
    ).toBeUndefined();
  });

  it("builds stable orientation, focused, and review searches", () => {
    expect(buildInterdisciplinarySearchQueries(links[0])).toEqual({
      orientation: "structure property multiscale modeling overview",
      focused: "molecular structure solid interfaces",
      review: "cross-scale structure property review perspective",
    });
    expect(buildInterdisciplinarySearchQueries(links[1])).toEqual({
      orientation: "dynamical systems simulation overview",
      focused: "dynamical systems simulation",
      review: "dynamical systems simulation review perspective",
    });
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
      definitions.reduce(
        (total, definition) => total + definition.interdisciplinaryLinks.length,
        0,
      ),
    ).toBe(20);
  });
});
