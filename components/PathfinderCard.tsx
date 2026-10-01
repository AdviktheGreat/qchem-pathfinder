"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Atom, Check, Clock3 } from "lucide-react";
import { getPathfinderDefinition } from "@/data/pathfinder-definitions";
import type { PathfinderCatalogEntry } from "@/data/pathfinders";
import {
  getNewPathfinderProgress,
  readPathfinderProgress,
} from "@/lib/pathfinder-progress-summary";

export function PathfinderCard({
  pathfinder,
}: {
  pathfinder: PathfinderCatalogEntry;
}) {
  const definition = getPathfinderDefinition(pathfinder.id);
  const [progress, setProgress] = useState(() =>
    definition
      ? getNewPathfinderProgress(definition)
      : {
          label: "Ready when you are",
          detail: "No saved answers yet",
          cta: `Open ${pathfinder.shortName.toLowerCase()}`,
          complete: false,
        },
  );

  useEffect(() => {
    if (!definition) return;
    const timer = window.setTimeout(
      () =>
        setProgress(
          readPathfinderProgress(
            definition,
            window.localStorage.getItem(definition.storage.key),
          ),
        ),
      0,
    );
    return () => window.clearTimeout(timer);
  }, [definition]);

  if (!pathfinder.href) return null;

  const titleId = `${pathfinder.id}-title`;
  const outcomeId = `${pathfinder.id}-outcome`;
  const progressId = `${pathfinder.id}-progress`;

  return (
    <article className="pathfinder-card" aria-labelledby={titleId}>
      <div className="pathfinder-card-topline">
        <div className="pathfinder-card-icon" aria-hidden="true">
          <Atom size={24} />
        </div>
        <div
          className={`pathfinder-card-status ${progress.complete ? "is-complete" : ""}`}
          id={progressId}
          aria-live="polite"
        >
          {progress.complete ? (
            <Check size={14} aria-hidden="true" />
          ) : (
            <Clock3 size={14} aria-hidden="true" />
          )}
          <span>
            <strong>{progress.label}</strong>
            <small>{progress.detail}</small>
          </span>
        </div>
      </div>
      <p className="eyebrow">{pathfinder.eyebrow}</p>
      <h3 id={titleId}>{pathfinder.name}</h3>
      <p>{pathfinder.description}</p>
      <ul className="pathfinder-focus-list" aria-label="Focus areas">
        {pathfinder.focusAreas.map((area) => (
          <li key={area}>{area}</li>
        ))}
      </ul>
      <p className="pathfinder-outcome" id={outcomeId}>
        {pathfinder.outcome}
      </p>
      <div className="pathfinder-card-meta">
        <span>
          <Clock3 size={14} aria-hidden="true" /> {pathfinder.duration}
        </span>
        <span>Progress stays on this device</span>
      </div>
      <Link
        className="primary-button"
        href={pathfinder.href}
        aria-describedby={`${progressId} ${outcomeId}`}
      >
        {progress.cta} <ArrowRight size={17} />
      </Link>
    </article>
  );
}
