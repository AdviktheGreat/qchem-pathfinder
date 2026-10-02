import { describe, expect, it } from "vitest";
import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology/pathfinder";
import { formatResearchProfile, profileFilename } from "@/lib/profile-export";

const answers = {
  "biology-starting-point": ["recognize"],
  "biology-concept-familiarity": ["genes-genomes", "evolution"],
  "biology-quantitative-comfort": ["with-guidance"],
  "biology-statistics-comfort": ["learning"],
  "biology-coding-comfort": ["learning"],
  "biology-tools-comfort": ["guided"],
  "biology-explanation-style": ["visual"],
  "biology-motivation": ["genomes"],
  "biology-question-kind": ["compare"],
  "biology-scale": ["genes-genomes"],
  "biology-evidence": ["sequences"],
  "biology-workflow": ["visualize"],
  "biology-genome-focus": ["across-species"],
  "biology-genome-evidence": ["conserved-changed-regions"],
};

describe("computational biology research profile", () => {
  it("exports a complete, consistent literature-search handoff", () => {
    const profile = formatResearchProfile(
      answers,
      undefined,
      computationalBiologyPathfinder,
    );

    expect(profile).toContain("COMPUTATIONAL BIOLOGY EXPLORATION PROFILE");
    expect(profile).toContain("PRIMARY DIRECTION");
    expect(profile).toContain("Comparative genomics & conserved biology");
    expect(profile).toContain("NEARBY ALTERNATIVES");
    expect(profile).toContain("STARTER KEYWORDS");
    expect(profile).toContain("RELATED SEARCH PHRASES");
    expect(profile).toContain("SUGGESTED SEARCHES");
    expect(profile).toContain("CONCEPTS TO REVISIT");
    expect(profile).toContain("Verify citations");
  });

  it("uses a direction-specific, dated biology filename", () => {
    expect(
      profileFilename(
        "comparative-genomics-conservation",
        new Date("2026-10-02T12:00:00Z"),
        computationalBiologyPathfinder,
      ),
    ).toBe(
      "computational-biology-profile-comparative-genomics-conservation-2026-10-02.txt",
    );
  });
});
