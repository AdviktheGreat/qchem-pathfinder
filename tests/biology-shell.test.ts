import { describe, expect, it } from "vitest";
import ComputationalBiologyPathfinderPage, {
  metadata,
} from "@/app/pathfinders/computational-biology/page";
import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology/pathfinder";

describe("computational biology route shell", () => {
  it("uses the complete biology definition at its stable route", () => {
    expect(computationalBiologyPathfinder.identity.route).toBe(
      "/pathfinders/computational-biology",
    );
    expect(ComputationalBiologyPathfinderPage()).toBeDefined();
  });

  it("publishes subject-specific static metadata", () => {
    expect(metadata).toMatchObject({
      title: "Computational Biology Pathfinder",
      alternates: { canonical: "/pathfinders/computational-biology" },
      openGraph: {
        url: "/pathfinders/computational-biology",
      },
    });
    expect(metadata.description).toContain("literature-search");
  });
});
