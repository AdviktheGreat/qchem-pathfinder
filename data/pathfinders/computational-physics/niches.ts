import type { Niche } from "@/lib/types";
import { orbitalDynamicsDirections } from "@/data/pathfinders/computational-physics/niches-orbital-dynamics";
import { stellarAstrophysicsDirections } from "@/data/pathfinders/computational-physics/niches-stellar-astrophysics";

export const computationalPhysicsNiches: Niche[] = [
  ...orbitalDynamicsDirections,
  ...stellarAstrophysicsDirections,
];
