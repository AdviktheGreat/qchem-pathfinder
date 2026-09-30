import { getPathfinder } from "@/data/pathfinders";

export const HUB_STORAGE_KEY = "research-pathfinder:hub";
export const HUB_STORAGE_VERSION = 1;

export interface HubState {
  version: number;
  lastPathfinderId: string;
  lastVisitedAt: string;
}

export function createHubState(
  lastPathfinderId: string,
  date = new Date(),
): HubState {
  return {
    version: HUB_STORAGE_VERSION,
    lastPathfinderId,
    lastVisitedAt: date.toISOString(),
  };
}

export function parseHubState(raw: string | null): HubState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (
      parsed.version !== HUB_STORAGE_VERSION ||
      typeof parsed.lastPathfinderId !== "string" ||
      typeof parsed.lastVisitedAt !== "string" ||
      !Number.isFinite(Date.parse(parsed.lastVisitedAt))
    )
      return null;
    const pathfinder = getPathfinder(parsed.lastPathfinderId);
    if (!pathfinder?.href || pathfinder.status !== "available") return null;
    return parsed as unknown as HubState;
  } catch {
    return null;
  }
}
