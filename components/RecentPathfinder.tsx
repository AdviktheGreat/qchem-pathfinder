"use client";

import Link from "next/link";
import { ArrowRight, History } from "lucide-react";
import { useEffect, useState } from "react";
import type { PathfinderCatalogEntry } from "@/data/pathfinders";
import { getRecentPathfinder, HUB_STORAGE_KEY } from "@/lib/hub-persistence";

export function RecentPathfinder() {
  const [pathfinder, setPathfinder] = useState<PathfinderCatalogEntry>();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        setPathfinder(
          getRecentPathfinder(window.localStorage.getItem(HUB_STORAGE_KEY)),
        );
      } catch {
        setPathfinder(undefined);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

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
