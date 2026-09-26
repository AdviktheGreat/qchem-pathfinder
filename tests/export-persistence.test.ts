import { describe, expect, it } from "vitest";
import { formatResearchProfile } from "@/lib/profile-export";
import {
  createPersistedState,
  parseProgress,
  serializeProgress,
  STORAGE_VERSION,
  sanitizeAnswers,
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
      "PREPARATION NOTE",
      "CONCEPTS TO REVISIT",
      "NOTE",
    ]) {
      expect(output).toContain(heading);
    }
    expect(output).toContain("Reaction mechanisms & transition states");
    expect(output).toContain("The hidden sequence of bond changes");
    expect(output).toContain("An energy map of the complete pathway");
    expect(output).toMatch(/STARTER KEYWORDS\n(?:[^\n]+\n[^\n]+\n){3}/);
    expect(output.match(/^- (?:Broad|Focused|Review):/gm)).toHaveLength(9);
    expect(output).toContain("Verify citations");
  });
});

describe("progress persistence", () => {
  it("drops hidden branch answers and obsolete direction overrides", () => {
    const state = createPersistedState({
      screen: "intro",
      answers: {
        motivation: ["light"],
        "medicine-focus": ["binding"],
        "light-focus": ["react"],
      },
      primaryOverride: "retired-niche",
    });
    const restored = parseProgress(serializeProgress(state));
    expect(restored?.answers).toEqual({
      motivation: ["light"],
      "light-focus": ["react"],
    });
    expect(restored?.primaryOverride).toBeUndefined();
  });
  it("removes unknown choices, duplicates, and excess selections", () => {
    expect(
      sanitizeAnswers({
        bogus: ["anything"],
        motivation: ["medicine", "energy"],
        "evidence-style": [
          "visuals",
          "visuals",
          "invalid",
          "datasets",
          "equations",
        ],
      }),
    ).toEqual({
      motivation: ["medicine"],
      "evidence-style": ["visuals", "datasets"],
    });
  });
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

  it("rejects malformed screens and answer maps", () => {
    const base = {
      version: STORAGE_VERSION,
      savedAt: new Date().toISOString(),
    };
    expect(
      parseProgress(
        JSON.stringify({ ...base, screen: "elsewhere", answers: {} }),
      ),
    ).toBeNull();
    expect(
      parseProgress(
        JSON.stringify({
          ...base,
          screen: "survey",
          answers: { motivation: "reactions" },
        }),
      ),
    ).toBeNull();
  });
});
