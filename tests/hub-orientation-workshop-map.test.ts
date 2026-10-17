import { describe, expect, it } from "vitest";
import { hubOrientationQuestions } from "@/data/hub-orientation-questions";
import { hubOrientationSignals } from "@/data/hub-orientation-signals";
import { pathfinderModules } from "@/data/pathfinder-modules";
import { collectHubOrientationEvidence } from "@/lib/hub-orientation-answers";
import { rankHubOrientation } from "@/lib/hub-orientation-ranking";
import {
  createHubOrientationWorkshopMap,
  formatHubOrientationWorkshopMap,
} from "@/lib/hub-orientation-workshop-map";

describe("hub orientation workshop map", () => {
  it("formats an answer-aware map without exposing numeric scores", () => {
    const answers = {
      "broad-curiosity": "materials-technology",
      "preferred-system": "materials-interfaces",
      "question-style": "design-optimize",
      "working-style": "numerical-simulation",
      "application-balance": "practical-applications",
      "scale-boundary": "material-performance",
    };
    const rankings = rankHubOrientation(
      pathfinderModules,
      hubOrientationSignals,
      collectHubOrientationEvidence(hubOrientationQuestions, answers),
    );
    const map = createHubOrientationWorkshopMap(
      rankings,
      hubOrientationQuestions,
      answers,
      new Date("2026-10-17T12:00:00.000Z"),
    );
    const text = formatHubOrientationWorkshopMap(map);

    expect(map.primary?.pathfinderId).toBe("computational-materials");
    expect(text).toContain("GOOD PLACE TO START\nComputational Materials");
    expect(text).toContain(
      "Which kind of system would you most enjoy zooming in on?: Materials and interfaces",
    );
    expect(text).toContain("Generated: 2026-10-17");
    expect(text).not.toMatch(/\d+%|score/i);
  });

  it("keeps an all-uncertain result explicitly open", () => {
    const answers = Object.fromEntries(
      hubOrientationQuestions
        .filter((question) => !question.visibleWhen)
        .map((question) => [question.id, "not-sure-yet"]),
    );
    const rankings = rankHubOrientation(
      pathfinderModules,
      hubOrientationSignals,
      collectHubOrientationEvidence(hubOrientationQuestions, answers),
    );
    const map = createHubOrientationWorkshopMap(
      rankings,
      hubOrientationQuestions,
      answers,
      new Date("2026-10-17T12:00:00.000Z"),
    );
    const text = formatHubOrientationWorkshopMap(map);

    expect(map.result).toBe("open");
    expect(text).toContain("STARTING POINTS\nSeveral fields remain open.");
    expect(text).toContain("I’m not sure yet (kept open)");
  });
});
