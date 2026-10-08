import type { Metadata } from "next";
import type { AvailablePathfinderModuleManifest } from "@/lib/pathfinder-manifest";

export function createPathfinderMetadata(
  moduleEntry: AvailablePathfinderModuleManifest,
): Metadata {
  const { identity } = moduleEntry.definition;
  const { description, openGraphDescription } = moduleEntry.metadata;

  return {
    title: identity.name,
    description,
    alternates: { canonical: identity.route },
    openGraph: {
      title: identity.name,
      description: openGraphDescription,
      url: identity.route,
    },
  };
}
