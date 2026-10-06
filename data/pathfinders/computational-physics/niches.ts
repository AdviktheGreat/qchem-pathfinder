import type { Niche } from "@/lib/types";
import { orbitalDynamicsDirections } from "@/data/pathfinders/computational-physics/niches-orbital-dynamics";

export const computationalPhysicsNiches: Niche[] = [
  ...orbitalDynamicsDirections,
];
