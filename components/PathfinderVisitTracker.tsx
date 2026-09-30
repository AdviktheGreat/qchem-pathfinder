"use client";

import { useEffect } from "react";
import { createHubState, HUB_STORAGE_KEY } from "@/lib/hub-persistence";

export function PathfinderVisitTracker({
  pathfinderId,
}: {
  pathfinderId: string;
}) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(
          HUB_STORAGE_KEY,
          JSON.stringify(createHubState(pathfinderId)),
        );
      } catch {
        // The pathfinder remains usable when browser storage is unavailable.
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathfinderId]);

  return null;
}
