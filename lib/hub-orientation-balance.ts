import type { HubOrientationRanking } from "@/lib/hub-orientation";

export type HubOrientationBalance = "open" | "tie" | "close" | "clear";

export function getHubOrientationBalance(
  rankings: readonly HubOrientationRanking[],
): HubOrientationBalance {
  const primary = rankings[0];
  const alternative = rankings[1];
  if (!primary || primary.score <= 0) return "open";
  if (!alternative || alternative.score <= 0) return "clear";
  const difference = primary.score - alternative.score;
  if (difference === 0) return "tie";
  return difference <= 3 ? "close" : "clear";
}
