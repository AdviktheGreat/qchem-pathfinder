import { describe, expect, it } from "vitest";
import { nicheById, niches } from "@/data/niches";
import { questionById } from "@/data/questions";
import { signalCategory } from "@/lib/recommendation";

describe("recommendation taxonomy integrity", () => {
  it("keeps stable, unique identifiers for every direction", () => {
    const ids = niches.map((niche) => niche.id);
    const names = niches.map((niche) => niche.name);

    expect(niches.length).toBeGreaterThanOrEqual(18);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(names).size).toBe(names.length);
    expect(Object.keys(nicheById)).toHaveLength(niches.length);
  });

  it("keeps every literature launchpad complete and beginner-usable", () => {
    for (const niche of niches) {
      expect(niche.keywords.length, niche.name).toBeGreaterThanOrEqual(5);
      expect(niche.keywords.length, niche.name).toBeLessThanOrEqual(8);
      expect(niche.synonyms.length, niche.name).toBeGreaterThan(0);
      expect(niche.paperTypes.length, niche.name).toBeGreaterThan(0);
      expect(niche.questions.length, niche.name).toBeGreaterThanOrEqual(2);
      expect(niche.systems.length, niche.name).toBeGreaterThanOrEqual(2);
      expect(niche.approaches.length, niche.name).toBeGreaterThan(0);

      for (const query of Object.values(niche.searches)) {
        expect(query.trim(), niche.name).not.toBe("");
      }
    }
  });

  it("only generates reasons from signals a niche actually scores", () => {
    for (const niche of niches) {
      for (const reason of niche.reasons) {
        expect(
          niche.affinities,
          `${niche.name}: ${reason.signal}`,
        ).toHaveProperty(reason.signal);
      }
    }
  });

  it("places explanations in the same category as their scores", () => {
    for (const niche of niches) {
      for (const reason of niche.reasons) {
        expect(reason.category, `${niche.name}: ${reason.signal}`).toBe(
          signalCategory(reason.signal),
        );
      }
    }
  });

  it("uses every declared evidence preference in niche scoring", () => {
    for (const option of questionById["evidence-style"].options) {
      for (const signal of Object.keys(option.signals ?? {})) {
        expect(
          niches.some((niche) => (niche.affinities[signal] ?? 0) > 0),
          signal,
        ).toBe(true);
      }
    }
  });
});
