import { describe, expect, it } from "vitest";
import { pathfinderModules } from "@/data/pathfinder-modules";
import { createPathfinderMetadata } from "@/lib/pathfinder-metadata";

describe("pathfinder route metadata", () => {
  it("derives identity and canonical fields from each available manifest", () => {
    for (const moduleEntry of pathfinderModules) {
      const metadata = createPathfinderMetadata(moduleEntry);
      const { identity } = moduleEntry.definition;

      expect(metadata).toMatchObject({
        title: identity.name,
        description: moduleEntry.metadata.description,
        alternates: { canonical: identity.route },
        openGraph: {
          title: identity.name,
          description: moduleEntry.metadata.openGraphDescription,
          url: identity.route,
        },
      });
    }
  });
});
