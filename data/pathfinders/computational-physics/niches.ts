import type { Niche } from "@/lib/types";
import { condensedMatterDirections } from "@/data/pathfinders/computational-physics/niches-condensed-matter";
import { complexSystemsDirections } from "@/data/pathfinders/computational-physics/niches-complex-systems";
import { computationalMethodDirections } from "@/data/pathfinders/computational-physics/niches-computational-methods";
import { cosmologyDirections } from "@/data/pathfinders/computational-physics/niches-cosmology";
import { fluidDynamicsDirections } from "@/data/pathfinders/computational-physics/niches-fluid-dynamics";
import { geophysicalFlowDirections } from "@/data/pathfinders/computational-physics/niches-geophysical-flows";
import { nuclearFieldTheoryDirections } from "@/data/pathfinders/computational-physics/niches-nuclear-field-theory";
import { orbitalDynamicsDirections } from "@/data/pathfinders/computational-physics/niches-orbital-dynamics";
import { particleDetectorDirections } from "@/data/pathfinders/computational-physics/niches-particle-detectors";
import { plasmaFusionDirections } from "@/data/pathfinders/computational-physics/niches-plasma-fusion";
import { quantumDynamicsDirections } from "@/data/pathfinders/computational-physics/niches-quantum-dynamics";
import { spacePlasmaDirections } from "@/data/pathfinders/computational-physics/niches-space-plasma";
import { stellarAstrophysicsDirections } from "@/data/pathfinders/computational-physics/niches-stellar-astrophysics";
import { statisticalMechanicsDirections } from "@/data/pathfinders/computational-physics/niches-statistical-mechanics";

export const computationalPhysicsNiches: Niche[] = [
  ...orbitalDynamicsDirections,
  ...stellarAstrophysicsDirections,
  ...cosmologyDirections,
  ...fluidDynamicsDirections,
  ...geophysicalFlowDirections,
  ...plasmaFusionDirections,
  ...spacePlasmaDirections,
  ...condensedMatterDirections,
  ...quantumDynamicsDirections,
  ...statisticalMechanicsDirections,
  ...complexSystemsDirections,
  ...particleDetectorDirections,
  ...nuclearFieldTheoryDirections,
  ...computationalMethodDirections,
];
