import { describe, expect, it } from "vitest";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import {
  aggregateSignals,
  type RecommendationContext,
} from "@/lib/recommendation";

const motivation = computationalMaterialsPathfinder.survey.questions.find(
  (question) => question.id === "materials-motivation",
)!;

describe("computational materials motivations", () => {
  it("offers broad, scenario-based doorways and an open option", () => {
    expect(motivation.stage).toBe("motivation");
    expect(motivation.options).toHaveLength(11);
    expect(motivation.options.map((option) => option.id)).toEqual([
      "energy-storage",
      "energy-conversion",
      "electronics",
      "light-sensing",
      "climate-environment",
      "catalysis",
      "structural",
      "soft-health",
      "fundamentals",
      "data-discovery",
      "open",
    ]);
    for (const option of motivation.options) {
      expect(option.description?.length, option.id).toBeGreaterThan(40);
    }
    expect(
      motivation.options.find((option) => option.id === "open")?.label,
    ).toBe("Show me several possibilities");
  });

  it("records declared interests without using calibration answers", () => {
    const context: RecommendationContext = {
      questions: computationalMaterialsPathfinder.survey.questions,
      niches: [],
      openExplorationIds: [],
    };
    expect(
      aggregateSignals(
        {
          "materials-starting-point": ["comfortable"],
          "materials-math-comfort": ["comfortable"],
          "materials-motivation": ["energy-storage"],
        },
        context,
      ),
    ).toEqual({
      "interest:energy-storage": 3,
      "application:energy": 2,
    });
  });

  it("keeps several possibilities open without pretending uncertainty is a match", () => {
    const open = motivation.options.find((option) => option.id === "open");
    expect(open?.signals).toEqual({ "interest:open": 3 });
    expect(open?.nicheBoosts).toBeUndefined();
  });
});
