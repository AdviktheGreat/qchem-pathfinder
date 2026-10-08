import type {
  PathfinderIdentity,
  PathfinderStorageConfig,
} from "@/lib/pathfinder-definition";

// Replace every `template-science` value together so route, persistence, and
// registry lookup cannot drift apart.
export const templatePathfinderIdentity = {
  id: "template-science",
  name: "Template Science Pathfinder",
  shortName: "Template science",
  brandLabel: "Template Science Research Pathfinder",
  ariaLabel: "Template Science Research Pathfinder",
  route: "/pathfinders/template-science",
  icon: "atom",
} satisfies PathfinderIdentity;

export const templatePathfinderStorage = {
  key: "template-science-pathfinder:progress",
  version: 1,
} satisfies PathfinderStorageConfig;
