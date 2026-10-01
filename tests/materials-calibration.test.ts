import { describe, expect, it } from "vitest";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { getKnowledgeProfile } from "@/lib/recommendation";

const { questions } = computationalMaterialsPathfinder.survey;
const calibrationQuestions = questions.filter(
  (question) => question.stage === "calibration",
);

describe("computational materials knowledge calibration", () => {
  it("asks about familiarity without scoring scientific knowledge", () => {
    expect(calibrationQuestions.map((question) => question.id)).toEqual([
      "materials-starting-point",
      "materials-concept-familiarity",
      "materials-math-comfort",
      "materials-coding-comfort",
      "materials-tools-comfort",
      "materials-explanation-style",
    ]);
    for (const question of calibrationQuestions) {
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

  it("turns math, coding, and tool comfort into practical preparation", async () => {
    const { getExplanationGuide, getPreparationSteps } =
      await import("@/lib/preparation");
    const answers = {
      "materials-starting-point": ["recognize"],
      "materials-math-comfort": ["concept-first"],
      "materials-coding-comfort": ["new"],
      "materials-tools-comfort": ["guided"],
      "materials-explanation-style": ["visual"],
      "materials-workflow": ["comparisons"],
      "materials-experiment-connection": ["predict"],
    };
    const steps = getPreparationSteps(
      answers,
      computationalMaterialsPathfinder.preparation,
      questions,
    );

    expect(steps).toHaveLength(5);
    expect(steps[0]).toContain("structure image or property plot");
    expect(steps[1]).toContain("prepared notebook");
    expect(steps[2]).toContain("Repeat a guided calculation");
    expect(steps[3]).toContain("comparison table");
    expect(steps[4]).toContain("testable prediction");
    expect(
      getExplanationGuide(
        answers,
        computationalMaterialsPathfinder.preparation,
        questions,
      ).text,
    ).toContain("unit-cell image");
  });

  it("turns unfamiliar concepts into preparation topics rather than exclusions", () => {
    const profile = getKnowledgeProfile(
      {
        "materials-starting-point": ["new"],
        "materials-concept-familiarity": ["atomic-structure", "bonding"],
      },
      computationalMaterialsPathfinder.preparation,
      calibrationQuestions,
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
