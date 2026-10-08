import { describe, expect, it } from "vitest";
import ComputationalBiologyPathfinderPage, {
  metadata,
} from "@/app/pathfinders/computational-biology/page";
import { computationalBiologyModule } from "@/data/pathfinder-modules";
import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology/pathfinder";
import { createPathfinderMetadata } from "@/lib/pathfinder-metadata";

describe("computational biology route shell", () => {
  it("uses the complete biology definition at its stable route", () => {
    expect(computationalBiologyPathfinder.identity.route).toBe(
      "/pathfinders/computational-biology",
    );
    expect(ComputationalBiologyPathfinderPage()).toBeDefined();
  });

  it("publishes subject-specific static metadata", () => {
    expect(metadata).toEqual(
      createPathfinderMetadata(computationalBiologyModule),
    );
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
