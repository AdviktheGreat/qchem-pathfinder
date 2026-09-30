"use client";

import Link from "next/link";
import { ArrowRight, History } from "lucide-react";
import { useEffect, useState } from "react";
import { getPathfinder } from "@/data/pathfinders";
import { HUB_STORAGE_KEY, parseHubState } from "@/lib/hub-persistence";

export function RecentPathfinder() {
  const [recentId, setRecentId] = useState<string>();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        setRecentId(
          parseHubState(window.localStorage.getItem(HUB_STORAGE_KEY))
            ?.lastPathfinderId,
        );
      } catch {
        setRecentId(undefined);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const pathfinder = recentId ? getPathfinder(recentId) : undefined;
  if (!pathfinder?.href) return null;

  return (
    <aside
      className="recent-pathfinder"
      aria-label="Recently explored pathfinder"
    >
      <span className="recent-pathfinder-icon" aria-hidden="true">
        <History size={18} />
      </span>
      <div>
        <p>Recently explored</p>
        <strong>{pathfinder.shortName}</strong>
        <small>Your progress is still saved on this device.</small>
      </div>
      <Link href={pathfinder.href}>
        Return to this pathfinder <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </aside>
  );
}
