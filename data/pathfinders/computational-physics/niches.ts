import type { Niche } from "@/lib/types";
import { cosmologyDirections } from "@/data/pathfinders/computational-physics/niches-cosmology";
import { fluidDynamicsDirections } from "@/data/pathfinders/computational-physics/niches-fluid-dynamics";
import { geophysicalFlowDirections } from "@/data/pathfinders/computational-physics/niches-geophysical-flows";
import { orbitalDynamicsDirections } from "@/data/pathfinders/computational-physics/niches-orbital-dynamics";
import { plasmaFusionDirections } from "@/data/pathfinders/computational-physics/niches-plasma-fusion";
import { stellarAstrophysicsDirections } from "@/data/pathfinders/computational-physics/niches-stellar-astrophysics";

export const computationalPhysicsNiches: Niche[] = [
  ...orbitalDynamicsDirections,
  ...stellarAstrophysicsDirections,
  ...cosmologyDirections,
  ...fluidDynamicsDirections,
  ...geophysicalFlowDirections,
  ...plasmaFusionDirections,
];
