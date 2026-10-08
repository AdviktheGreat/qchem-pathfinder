import { describe, expect, it } from "vitest";
import {
  appearsInCatalog,
  canLaunchPathfinder,
  pathfinderLifecycleRequirements,
  pathfinderLifecycleStages,
} from "@/lib/pathfinder-lifecycle";

describe("pathfinder lifecycle", () => {
  it("keeps the authoring stages explicit and ordered", () => {
    expect(pathfinderLifecycleStages).toEqual([
      "draft",
      "testing",
      "coming-soon",
      "available",
    ]);
    expect(Object.keys(pathfinderLifecycleRequirements)).toEqual([
      "draft",
      "testing",
      "coming-soon",
      "available",
    ]);
  });

  it("only exposes intentional catalog states", () => {
    expect(appearsInCatalog("draft")).toBe(false);
    expect(appearsInCatalog("testing")).toBe(false);
    expect(appearsInCatalog("coming-soon")).toBe(true);
    expect(appearsInCatalog("available")).toBe(true);
  });

  it("only launches released modules", () => {
    for (const stage of pathfinderLifecycleStages) {
      expect(canLaunchPathfinder(stage)).toBe(stage === "available");
    }
  });
});
