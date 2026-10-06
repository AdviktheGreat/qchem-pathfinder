import { describe, expect, it } from "vitest";
import { computationalPhysicsQuestions as questions } from "@/data/pathfinders/computational-physics";
import {
  getPlannedQuestionCount,
  getVisibleQuestions,
  pruneHiddenAnswers,
} from "@/lib/branching";

function narrowingIds(motivation: string): string[] {
  return getVisibleQuestions({ "physics-motivation": [motivation] }, questions)
    .filter((question) => question.stage === "narrowing")
    .map((question) => question.id);
}

const expectedBranches: Record<string, string[]> = {
  "space-universe": [
    "physics-astrophysics-focus",
    "physics-astrophysics-evidence",
  ],
  "fluids-weather": ["physics-fluids-focus", "physics-fluids-evidence"],
  "quantum-atoms": ["physics-quantum-focus", "physics-quantum-evidence"],
  "matter-collective": [
    "physics-condensed-focus",
    "physics-condensed-evidence",
  ],
  "plasma-fusion": ["physics-plasma-focus", "physics-plasma-evidence"],
  "particles-nuclei": [
    "physics-particle-nuclear-focus",
    "physics-particle-nuclear-evidence",
  ],
  "complex-patterns": ["physics-complex-focus", "physics-complex-evidence"],
  "methods-computing": ["physics-methods-focus", "physics-methods-evidence"],
  open: ["physics-open-system", "physics-open-method"],
};

describe("adaptive computational physics questions", () => {
  it.each(Object.entries(expectedBranches))(
    "shows only the targeted follow-ups for %s",
    (motivation, expected) => {
      expect(narrowingIds(motivation)).toEqual(expected);
      expect(
        getVisibleQuestions({ "physics-motivation": [motivation] }, questions),
      ).toHaveLength(14);
    },
  );

  it("provides a complete fourteen-question path for every motivation", () => {
    const motivation = questions.find(
      (question) => question.id === "physics-motivation",
    )!;
    for (const option of motivation.options) {
      const visible = getVisibleQuestions(
        { "physics-motivation": [option.id] },
        questions,
      );
      expect(visible, option.id).toHaveLength(14);
      expect(
        visible.filter((question) => question.stage === "narrowing"),
        option.id,
      ).toHaveLength(2);
    }
    expect(getPlannedQuestionCount({}, questions, "physics-motivation")).toBe(
      14,
    );
  });

  it("removes answers from a previous physics branch", () => {
    const changed = pruneHiddenAnswers(
      {
        "physics-motivation": ["quantum-atoms"],
        "physics-astrophysics-focus": ["stellar-lifecycles"],
        "physics-quantum-focus": ["noise-decoherence"],
      },
      questions,
    );
    expect(changed["physics-astrophysics-focus"]).toBeUndefined();
    expect(changed["physics-quantum-focus"]).toEqual(["noise-decoherence"]);
  });

  it("keeps every narrowing uncertainty answer neutral", () => {
    const narrowing = questions.filter(
      (question) => question.stage === "narrowing",
    );
    expect(narrowing).toHaveLength(18);
    for (const question of narrowing) {
      const unsure = question.options.find((option) => option.uncertainty);
      expect(unsure, question.id).toBeDefined();
      expect(unsure?.signals, question.id).toBeUndefined();
      expect(unsure?.nicheBoosts, question.id).toBeUndefined();
    }
  });
});
