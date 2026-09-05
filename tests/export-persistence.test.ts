import { describe, expect, it } from "vitest";
import { formatResearchProfile } from "@/lib/profile-export";
import {
  createPersistedState,
  parseProgress,
  serializeProgress,
  STORAGE_VERSION,
} from "@/lib/persistence";

const answers = {
  "phase-one-memory": ["recognize"],
  "math-comfort": ["with-guidance"],
  "coding-comfort": ["new"],
  "explanation-style": ["conceptual"],
  motivation: ["reactions"],
  "reactions-focus": ["steps"],
  "reactions-view": ["map"],
  "question-kind": ["pathway"],
  "purpose-balance": ["middle"],
  "change-style": ["changing"],
};

describe("research profile export", () => {
  it("uses a stable, useful section structure", () => {
    const output = formatResearchProfile(answers);
    for (const heading of [
      "KNOWLEDGE STARTING POINT",
      "INTEREST THEMES",
      "PREFERRED RESEARCH STYLE",
      "PRIMARY DIRECTION",
      "NEARBY ALTERNATIVES",
      "STARTER KEYWORDS",
      "SUGGESTED SEARCHES",
      "CONCEPTS TO REVISIT",
      "NOTE",
    ]) {
      expect(output).toContain(heading);
    }
    expect(output).toContain("Reaction mechanisms & transition states");
    expect(output).toContain("Verify citations");
  });
});

describe("progress persistence", () => {
  it("round-trips a valid versioned state", () => {
    const state = createPersistedState({
      screen: "survey",
      answers,
      currentQuestionId: "question-kind",
    });
    expect(parseProgress(serializeProgress(state))).toEqual(state);
    expect(state.version).toBe(STORAGE_VERSION);
  });

  it("ignores corrupt and incompatible saved data", () => {
    expect(parseProgress("not json")).toBeNull();
    expect(
      parseProgress(
        JSON.stringify({ version: 999, screen: "survey", answers: {} }),
      ),
    ).toBeNull();
  });
});
