import { describe, expect, it } from "vitest";
import { getHubOrientationBalance } from "@/lib/hub-orientation-balance";
import type { HubOrientationRanking } from "@/lib/hub-orientation";

function rankings(...scores: number[]): HubOrientationRanking[] {
  return scores.map((score, index) => ({
    pathfinderId: `path-${index}`,
    score,
    reasons: [],
  }));
}

describe("hub orientation result balance", () => {
  it("keeps an evidence-free result open", () => {
    expect(getHubOrientationBalance(rankings(0, 0))).toBe("open");
  });

  it("preserves exact ties and near-balanced preferences", () => {
    expect(getHubOrientationBalance(rankings(18, 18))).toBe("tie");
    expect(getHubOrientationBalance(rankings(18, 15))).toBe("close");
  });

  it("uses a clear lead only when the evidence separates the paths", () => {
    expect(getHubOrientationBalance(rankings(18, 14))).toBe("clear");
  });
});
