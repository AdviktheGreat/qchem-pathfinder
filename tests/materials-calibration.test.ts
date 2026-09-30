import { describe, expect, it } from "vitest";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { getKnowledgeProfile } from "@/lib/recommendation";

const { questions } = computationalMaterialsPathfinder.survey;

describe("computational materials knowledge calibration", () => {
  it("asks about familiarity without scoring scientific knowledge", () => {
    expect(questions.map((question) => question.id)).toEqual([
      "materials-starting-point",
      "materials-concept-familiarity",
    ]);
    for (const question of questions) {
      expect(question.stage).toBe("calibration");
      expect(
        question.options.some((option) => option.uncertainty),
        question.id,
      ).toBe(true);
      for (const option of question.options) {
        expect(option.signals, option.id).toBeUndefined();
        expect(option.nicheBoosts, option.id).toBeUndefined();
      }
    }
  });

  it("turns unfamiliar concepts into preparation topics rather than exclusions", () => {
    const profile = getKnowledgeProfile(
      {
        "materials-starting-point": ["new"],
        "materials-concept-familiarity": ["atomic-structure", "bonding"],
      },
      computationalMaterialsPathfinder.preparation,
      questions,
    );

    expect(profile.startingPoint).toContain("New vocabulary is preparation");
    expect(profile.conceptsToRevisit).not.toContain(
      "Atomic arrangements and material structure",
    );
    expect(profile.conceptsToRevisit).toContain(
      "Crystal lattices, symmetry, and unit cells",
    );
    expect(profile.conceptsToRevisit).toContain(
      "Structure–property relationships",
    );
  });
});
