import { describe, expect, it } from "vitest";
import { createHubState, parseHubState } from "@/lib/hub-persistence";

describe("hub visit persistence", () => {
  it("round-trips the latest available pathfinder", () => {
    const state = createHubState(
      "quantum-chemistry",
      new Date("2026-09-29T18:00:00.000Z"),
    );
    expect(parseHubState(JSON.stringify(state))).toEqual(state);
  });

  it("ignores malformed, unavailable, or unknown destinations", () => {
    expect(parseHubState("not json")).toBeNull();
    expect(
      parseHubState(
        JSON.stringify({
          version: 1,
          lastPathfinderId: "computational-materials",
          lastVisitedAt: "2026-09-29T18:00:00.000Z",
        }),
      ),
    ).toBeNull();
    expect(
      parseHubState(
        JSON.stringify({
          version: 1,
          lastPathfinderId: "unknown",
          lastVisitedAt: "2026-09-29T18:00:00.000Z",
        }),
      ),
    ).toBeNull();
  });
});
