import type { Niche } from "@/lib/types";
import { cosmologyDirections } from "@/data/pathfinders/computational-physics/niches-cosmology";
import { orbitalDynamicsDirections } from "@/data/pathfinders/computational-physics/niches-orbital-dynamics";
import { stellarAstrophysicsDirections } from "@/data/pathfinders/computational-physics/niches-stellar-astrophysics";

export const computationalPhysicsNiches: Niche[] = [
  ...orbitalDynamicsDirections,
  ...stellarAstrophysicsDirections,
  ...cosmologyDirections,
];
