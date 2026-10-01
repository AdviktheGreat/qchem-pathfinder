import type { PathfinderStorageConfig } from "@/lib/pathfinder-definition";

export const COMPUTATIONAL_BIOLOGY_STORAGE_KEY =
  "computational-biology-pathfinder:progress";
export const COMPUTATIONAL_BIOLOGY_STORAGE_VERSION = 1;

export const computationalBiologyStorage = {
  key: COMPUTATIONAL_BIOLOGY_STORAGE_KEY,
  version: COMPUTATIONAL_BIOLOGY_STORAGE_VERSION,
} satisfies PathfinderStorageConfig;
