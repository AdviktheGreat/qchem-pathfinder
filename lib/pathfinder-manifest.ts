import type {
  PathfinderDefinition,
  PathfinderIcon,
} from "@/lib/pathfinder-definition";
import type { HubOrientationProfile } from "@/lib/hub-orientation";

export interface PathfinderCatalogCopy {
  eyebrow: string;
  description: string;
  outcome: string;
  focusAreas: readonly string[];
  duration: string;
}

export interface PathfinderRouteMetadataCopy {
  description: string;
  openGraphDescription: string;
}

export interface AvailablePathfinderModuleManifest {
  lifecycle: "available";
  definition: PathfinderDefinition;
  catalog: PathfinderCatalogCopy;
  metadata: PathfinderRouteMetadataCopy;
  orientation?: HubOrientationProfile;
}

export interface ComingSoonPathfinderModuleManifest {
  lifecycle: "coming-soon";
  identity: {
    id: string;
    name: string;
    shortName: string;
    icon: PathfinderIcon;
  };
  catalog: PathfinderCatalogCopy;
  orientation?: HubOrientationProfile;
}

export type PathfinderModuleManifest =
  AvailablePathfinderModuleManifest | ComingSoonPathfinderModuleManifest;

export function definePathfinderModule<
  const Manifest extends PathfinderModuleManifest,
>(manifest: Manifest): Manifest {
  return manifest;
}
