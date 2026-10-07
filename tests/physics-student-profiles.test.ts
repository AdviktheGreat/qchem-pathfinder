import { describe, expect, it } from "vitest";
import { computationalPhysicsPathfinder } from "@/data/pathfinders/computational-physics";
import { getVisibleQuestions } from "@/lib/branching";
import { formatResearchProfile, profileFilename } from "@/lib/profile-export";
import { getRecommendations } from "@/lib/recommendation";
import { physicsStudentProfiles } from "./fixtures/physics-student-profiles";

const definition = computationalPhysicsPathfinder;
const context = {
  questions: definition.survey.questions,
  niches: definition.recommendations.niches,
  openExplorationIds: definition.recommendations.openExplorationIds,
  scoring: definition.recommendations.scoring,
};

describe("representative computational physics profiles", () => {
  it.each(physicsStudentProfiles)(
    "produces a complete and sensible map for $name",
    ({ answers, expectedPrimary }) => {
      const visible = getVisibleQuestions(answers, definition.survey.questions);
      expect(visible).toHaveLength(14);
      expect(visible.every((question) => answers[question.id]?.length)).toBe(
        true,
      );
      expect(getRecommendations(answers, undefined, context)[0].niche.id).toBe(
        expectedPrimary,
      );
    },
  );

  it("exports a stable, source-aware physics exploration profile", () => {
    const profile = physicsStudentProfiles[0];
    const output = formatResearchProfile(
      profile.answers,
      undefined,
      definition,
    );

    expect(output).toContain("COMPUTATIONAL PHYSICS EXPLORATION PROFILE");
    expect(output).toContain("KNOWLEDGE STARTING POINT");
    expect(output).toContain("PRIMARY DIRECTION");
    expect(output).toContain("NEARBY ALTERNATIVES");
    expect(output).toContain("STARTER KEYWORDS");
    expect(output).toContain("RELATED SEARCH PHRASES");
    expect(output).toContain("SUGGESTED SEARCHES");
    expect(output).toContain("CONCEPTS TO REVISIT");
    expect(output).toContain("Verify citations");
    expect(
      profileFilename(
        profile.expectedPrimary,
        new Date("2026-10-06T12:00:00.000Z"),
        definition,
      ),
    ).toBe(
      "computational-physics-profile-orbital-n-body-dynamics-2026-10-06.txt",
    );
  });
});
