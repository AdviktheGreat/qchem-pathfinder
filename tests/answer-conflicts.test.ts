import { describe, expect, it } from "vitest";
import {
  normalizeAnswers,
  resolveAnswerConflicts,
} from "@/lib/answer-conflicts";
import { getVisibleQuestions } from "@/lib/branching";
import { formatResearchProfile } from "@/lib/profile-export";
import { rankNiches } from "@/lib/recommendation";
import { restoreProgress, sanitizeAnswers } from "@/lib/persistence";

describe("answer conflict resolution", () => {
  it("keeps the latest answer when a single-choice question has two values", () => {
    const resolution = resolveAnswerConflicts({
      "electronic-state": ["ground", "excited"],
    });

    expect(resolution.answers["electronic-state"]).toEqual(["excited"]);
    expect(resolution.conflicts).toEqual([
      {
        questionId: "electronic-state",
        keptOptionIds: ["excited"],
        removedOptionIds: ["ground"],
        reason: "single-choice",
      },
    ]);
  });

  it("never keeps uncertainty beside a specific multi-select answer", () => {
    expect(
      normalizeAnswers({
        "concept-familiarity": ["orbitals", "uncertain"],
      }),
    ).toEqual({ "concept-familiarity": ["uncertain"] });
    expect(
      normalizeAnswers({
        "concept-familiarity": ["uncertain", "orbitals"],
      }),
    ).toEqual({ "concept-familiarity": ["orbitals"] });
  });

  it("uses only the resolved value in scoring and the exported profile", () => {
    const conflicted = { "electronic-state": ["ground", "excited"] };
    expect(rankNiches(conflicted)).toEqual(
      rankNiches({ "electronic-state": ["excited"] }),
    );

    const profile = formatResearchProfile(conflicted);
    expect(profile).toContain(
      "- Electronic state: A higher electronic-energy state (excited state)",
    );
    expect(profile).not.toContain(
      "- Electronic state: The lowest electronic-energy state (ground state)",
    );
  });

  it("uses the newest broad motivation before calculating visible branches", () => {
    const ids = getVisibleQuestions({ motivation: ["medicine", "light"] }).map(
      (question) => question.id,
    );
    expect(ids).toContain("light-focus");
    expect(ids).not.toContain("medicine-focus");
  });

  it("repairs and flags conflicting saved progress", () => {
    expect(
      sanitizeAnswers({ "electronic-state": ["ground", "excited"] }),
    ).toEqual({ "electronic-state": ["excited"] });

    const restored = restoreProgress(
      JSON.stringify({
        version: 1,
        savedAt: "2026-09-26T12:00:00.000Z",
        screen: "survey",
        currentQuestionId: "electronic-state",
        answers: { "electronic-state": ["ground", "excited"] },
      }),
    );
    expect(restored.state?.answers["electronic-state"]).toEqual(["excited"]);
    expect(restored.notice).toContain("conflicting saved choices");
  });
});
