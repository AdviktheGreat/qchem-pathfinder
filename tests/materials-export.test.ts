import { describe, expect, it } from "vitest";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { formatResearchProfile, profileFilename } from "@/lib/profile-export";

const answers = {
  "materials-starting-point": ["recognize"],
  "materials-concept-familiarity": ["atomic-structure", "properties"],
  "materials-math-comfort": ["guided"],
  "materials-coding-comfort": ["beginner"],
  "materials-explanation-style": ["mixed"],
  "materials-motivation": ["energy-conversion"],
  "materials-question-kind": ["predict"],
  "materials-family": ["crystalline"],
  "materials-phenomena": ["optical", "electrons"],
  "materials-scale": ["device"],
  "materials-energy-direction": ["photovoltaics"],
};

describe("computational materials profile export", () => {
  it("formats a complete, reusable materials exploration profile", () => {
    const profile = formatResearchProfile(
      answers,
      undefined,
      computationalMaterialsPathfinder,
    );

    expect(profile).toMatch(/^COMPUTATIONAL MATERIALS EXPLORATION PROFILE\n=+/);
    for (const section of [
      "KNOWLEDGE STARTING POINT",
      "INTEREST THEMES",
      "PREFERRED RESEARCH STYLE",
      "PRIMARY DIRECTION",
      "NEARBY ALTERNATIVES",
      "STARTER KEYWORDS",
      "SUGGESTED SEARCHES",
      "CONCEPTS TO REVISIT",
    ]) {
      expect(profile).toContain(section);
    }
    expect(profile).toContain("Photovoltaic materials");
    expect(profile).not.toMatch(/undefined|null/);
  });

  it("uses a clear materials-specific filename", () => {
    expect(
      profileFilename(
        "photovoltaic-materials",
        new Date("2026-09-30T12:00:00Z"),
        computationalMaterialsPathfinder,
      ),
    ).toBe(
      "computational-materials-profile-photovoltaic-materials-2026-09-30.txt",
    );
  });
});
