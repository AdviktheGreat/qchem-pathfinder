"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Atom, Check, Clock3 } from "lucide-react";
import type { PathfinderCatalogEntry } from "@/data/pathfinders";
import {
  getAnsweredCount,
  getPlannedQuestionCount,
  getVisibleQuestions,
} from "@/lib/branching";
import { restoreProgress, STORAGE_KEY } from "@/lib/persistence";

interface CardProgress {
  label: string;
  detail: string;
  cta: string;
  complete: boolean;
}

const newProgress: CardProgress = {
  label: "Ready when you are",
  detail: "No saved answers yet",
  cta: "Open quantum chemistry",
  complete: false,
};

function readQuantumChemistryProgress(): CardProgress {
  try {
    const { state } = restoreProgress(window.localStorage.getItem(STORAGE_KEY));
    if (!state || Object.keys(state.answers).length === 0) return newProgress;
    const visible = getVisibleQuestions(state.answers);
    const complete = visible.every(
      (question) => (state.answers[question.id]?.length ?? 0) > 0,
    );
    if (complete)
      return {
        label: "Research map ready",
        detail: "Your completed exploration is saved on this device",
        cta: "Review my quantum chemistry map",
        complete: true,
      };
    return {
      label: "Exploration in progress",
      detail: `${getAnsweredCount(state.answers)} of ${getPlannedQuestionCount(state.answers)} questions answered`,
      cta: "Continue quantum chemistry",
      complete: false,
    };
  } catch {
    return newProgress;
  }
}

export function PathfinderCard({
  pathfinder,
}: {
  pathfinder: PathfinderCatalogEntry;
}) {
  const [progress, setProgress] = useState(newProgress);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setProgress(readQuantumChemistryProgress()),
      0,
    );
    return () => window.clearTimeout(timer);
  }, []);

  if (!pathfinder.href) return null;

  return (
    <article className="pathfinder-card">
      <div className="pathfinder-card-topline">
        <div className="pathfinder-card-icon" aria-hidden="true">
          <Atom size={24} />
        </div>
        <div
          className={`pathfinder-card-status ${progress.complete ? "is-complete" : ""}`}
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
      <h3>{pathfinder.name}</h3>
      <p>{pathfinder.description}</p>
      <ul className="pathfinder-focus-list" aria-label="Focus areas">
        {pathfinder.focusAreas.map((area) => (
          <li key={area}>{area}</li>
        ))}
      </ul>
      <p className="pathfinder-outcome">{pathfinder.outcome}</p>
      <div className="pathfinder-card-meta">
        <span>
          <Clock3 size={14} aria-hidden="true" /> {pathfinder.duration}
        </span>
        <span>Progress stays on this device</span>
      </div>
      <Link className="primary-button" href={pathfinder.href}>
        {progress.cta} <ArrowRight size={17} />
      </Link>
    </article>
  );
}
