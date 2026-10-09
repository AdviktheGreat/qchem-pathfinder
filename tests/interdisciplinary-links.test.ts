import { describe, expect, it } from "vitest";
import {
  buildInterdisciplinarySearch,
  getInterdisciplinaryDestination,
  getInterdisciplinaryLinksForDirection,
  type InterdisciplinaryLink,
} from "@/lib/interdisciplinary-links";

const links: InterdisciplinaryLink[] = [
  {
    id: "example-to-materials",
    sourceNicheId: "example-direction",
    targetPathfinderId: "computational-materials",
    targetPathfinderName: "Computational materials",
    targetNicheId: "example-materials-direction",
    targetNicheName: "Example materials direction",
    bridge: "The two directions share a structure–property question.",
    distinction: "One starts with molecules; the other starts with solids.",
    sharedKeywords: ["structure property", "multiscale modeling"],
  },
  {
    id: "another-to-physics",
    sourceNicheId: "another-direction",
    targetPathfinderId: "computational-physics",
    targetPathfinderName: "Computational physics",
    targetNicheId: "example-physics-direction",
    targetNicheName: "Example physics direction",
    bridge: "The two directions share a dynamical model.",
    distinction: "They organize the model around different systems.",
    sharedKeywords: ["dynamical systems", "simulation"],
  },
];

describe("interdisciplinary link helpers", () => {
  it("selects links for only the active direction", () => {
    expect(
      getInterdisciplinaryLinksForDirection(links, "example-direction"),
    ).toEqual([links[0]]);
  });

  it("derives a stable pathfinder route and bridge search", () => {
    expect(getInterdisciplinaryDestination(links[0])).toBe(
      "/pathfinders/computational-materials",
    );
    expect(buildInterdisciplinarySearch(links[0])).toBe(
      "structure property multiscale modeling review",
    );
  });
});
