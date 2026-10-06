import { describe, expect, it } from "vitest";
import {
  computationalPhysicsNiches,
  physicsStarterPaperTypes,
} from "@/data/pathfinders/computational-physics";

describe("computational physics Phase 2 taxonomy", () => {
  it("contains twenty-eight unique, beginner-explorable directions", () => {
    expect(computationalPhysicsNiches).toHaveLength(28);
    expect(
      new Set(computationalPhysicsNiches.map((niche) => niche.id)).size,
    ).toBe(computationalPhysicsNiches.length);
    expect(
      computationalPhysicsNiches.filter((niche) => niche.explorationFriendly)
        .length,
    ).toBeGreaterThanOrEqual(14);
  });

  it("covers the intended physical systems and cross-cutting methods", () => {
    const ids = computationalPhysicsNiches.map((niche) => niche.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        "orbital-n-body-dynamics",
        "stellar-structure-evolution",
        "cosmological-structure-formation",
        "turbulence-coherent-structures",
        "climate-earth-system-modeling",
        "magnetic-confinement-fusion",
        "heliophysics-space-weather",
        "quantum-many-body-phases",
        "open-quantum-systems",
        "phase-transitions-critical-phenomena",
        "nonlinear-dynamics-chaos",
        "particle-collision-simulation",
        "nuclear-structure-reactions",
        "lattice-field-theory",
        "numerical-methods-hpc-uncertainty",
        "physics-informed-ml-inverse-problems",
      ]),
    );
  });

  it("provides complete scientific and literature-search content", () => {
    for (const niche of computationalPhysicsNiches) {
      expect(niche.name.trim().length, niche.id).toBeGreaterThan(0);
      expect(niche.shortDescription.length, niche.id).toBeGreaterThan(40);
      expect(niche.explanation.length, niche.id).toBeGreaterThan(120);
      expect(niche.questions, niche.id).toHaveLength(3);
      expect(niche.systems.length, niche.id).toBeGreaterThanOrEqual(4);
      expect(niche.approaches, niche.id).toHaveLength(3);
      expect(niche.concepts.length, niche.id).toBeGreaterThanOrEqual(4);
      expect(niche.preparation.length, niche.id).toBeGreaterThan(80);
      expect(niche.keywords.length, niche.id).toBeGreaterThanOrEqual(7);
      expect(niche.synonyms.length, niche.id).toBeGreaterThanOrEqual(3);
      expect(niche.searches.orientation.length, niche.id).toBeGreaterThan(20);
      expect(niche.searches.focused.length, niche.id).toBeGreaterThan(20);
      expect(niche.searches.review.length, niche.id).toBeGreaterThan(20);
      expect(niche.comparisonLens.length, niche.id).toBeGreaterThan(60);
      expect(niche.paperTypes, niche.id).toEqual([...physicsStarterPaperTypes]);
      expect(niche.affinities, niche.id).toEqual({});
      expect(niche.reasons, niche.id).toEqual([]);
    }
  });

  it("keeps all search queries and niche names distinct", () => {
    const names = computationalPhysicsNiches.map((niche) => niche.name);
    const queries = computationalPhysicsNiches.flatMap((niche) =>
      Object.values(niche.searches),
    );
    expect(new Set(names).size).toBe(names.length);
    expect(new Set(queries).size).toBe(queries.length);
  });
});
