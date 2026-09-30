import { describe, expect, it } from "vitest";
import { formatResearchProfile } from "@/lib/profile-export";
import { getRecommendations } from "@/lib/recommendation";
import {
  createPersistedState,
  createPathfinderPersistence,
  parseProgress,
  serializeProgress,
  STORAGE_VERSION,
  sanitizeAnswers,
} from "@/lib/persistence";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";
import type { PathfinderDefinition } from "@/lib/pathfinder-definition";

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
  it("exports every direction and query after an alternative is promoted", () => {
    const override = getRecommendations(answers)[2].niche.id;
    const results = getRecommendations(answers, override);
    const output = formatResearchProfile(answers, override);
    expect(output).toContain(`PRIMARY DIRECTION\n${results[0].niche.name}`);
    for (const result of results) {
      for (const keyword of result.niche.keywords)
        expect(output).toContain(keyword);
      for (const query of Object.values(result.niche.searches))
        expect(output).toContain(query);
    }
    expect(formatResearchProfile({ motivation: ["balanced"] })).toContain(
      "order is not a measure of personal fit",
    );
  });
  it("uses a stable, useful section structure", () => {
    const output = formatResearchProfile(answers);
    for (const heading of [
      "KNOWLEDGE STARTING POINT",
      "INTEREST THEMES",
      "PREFERRED RESEARCH STYLE",
      "PREFERRED RESEARCH QUESTION TYPE",
      "PRIMARY DIRECTION",
      "NEARBY ALTERNATIVES",
      "STARTER KEYWORDS",
      "RELATED SEARCH PHRASES",
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
    expect(output).toContain("Which path does this reaction take?");
    expect(output).toContain(
      "Fundamental versus applied: A bridge between both",
    );
    expect(output).toContain("System scale: Not answered yet");
    expect(output).toMatch(/STARTER KEYWORDS\n(?:[^\n]+\n[^\n]+\n){3}/);
    expect(output.match(/^- (?:Broad|Focused|Review):/gm)).toHaveLength(9);
    expect(output).toContain("Verify citations");
  });

  it("uses the active pathfinder profile identity", () => {
    const materialsDefinition = {
      ...quantumChemistryPathfinder,
      profile: {
        ...quantumChemistryPathfinder.profile,
        exportTitle: "COMPUTATIONAL MATERIALS EXPLORATION PROFILE",
      },
    };

    expect(
      formatResearchProfile(answers, undefined, materialsDefinition),
    ).toMatch(/^COMPUTATIONAL MATERIALS EXPLORATION PROFILE\n=+/);
  });
});

describe("progress persistence", () => {
  it("creates isolated persistence for a supplied pathfinder", () => {
    const materialsDefinition: PathfinderDefinition = {
      ...quantumChemistryPathfinder,
      storage: {
        key: "materials-pathfinder:progress",
        version: 7,
      },
      survey: {
        ...quantumChemistryPathfinder.survey,
        questions: [
          {
            id: "material-family",
            stage: "motivation",
            kicker: "Materials",
            title: "Choose a material family",
            type: "single",
            options: [{ id: "battery", label: "Battery materials" }],
          },
        ],
      },
    };
    const materialsPersistence =
      createPathfinderPersistence(materialsDefinition);
    const state = materialsPersistence.createPersistedState({
      screen: "intro",
      answers: {
        "material-family": ["battery"],
        motivation: ["light"],
      },
    });

    expect(materialsPersistence.storageKey).toBe(
      "materials-pathfinder:progress",
    );
    expect(state.version).toBe(7);
    expect(state.answers).toEqual({ "material-family": ["battery"] });
  });

  it("recovers missing navigation and incomplete results", () => {
    for (const screen of ["survey", "results", "review"] as const) {
      const restored = parseProgress(
        serializeProgress(
          createPersistedState({
            screen,
            answers: { "phase-one-memory": ["fresh"] },
          }),
        ),
      );
      expect(restored?.screen).toBe("survey");
      expect(restored?.currentQuestionId).toBe("concept-familiarity");
    }
  });
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
      motivation: ["energy"],
      "evidence-style": ["datasets", "equations"],
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
