import type {
  PathfinderDefinition,
  PathfinderIcon,
} from "@/lib/pathfinder-definition";

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
}

export type PathfinderModuleManifest =
  AvailablePathfinderModuleManifest | ComingSoonPathfinderModuleManifest;
