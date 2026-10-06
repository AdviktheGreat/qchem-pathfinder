import type { PathfinderStorageConfig } from "@/lib/pathfinder-definition";

export const COMPUTATIONAL_PHYSICS_STORAGE_KEY =
  "computational-physics-pathfinder:progress";
export const COMPUTATIONAL_PHYSICS_STORAGE_VERSION = 1;

export const computationalPhysicsStorage = {
  key: COMPUTATIONAL_PHYSICS_STORAGE_KEY,
  version: COMPUTATIONAL_PHYSICS_STORAGE_VERSION,
} satisfies PathfinderStorageConfig;
