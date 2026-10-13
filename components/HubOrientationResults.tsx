import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { getPathfinder } from "@/data/pathfinders";
import { pathfinderModules } from "@/data/pathfinder-modules";
import type { HubOrientationRanking } from "@/lib/hub-orientation";

export function HubOrientationResults({
  rankings,
  onReview,
}: {
  rankings: readonly HubOrientationRanking[];
  onReview: () => void;
}) {
  const primary = rankings[0];
  const alternative = rankings[1];
  const catalog = primary ? getPathfinder(primary.pathfinderId) : undefined;
  const alternativeCatalog = alternative
    ? getPathfinder(alternative.pathfinderId)
    : undefined;
  const manifest = primary
    ? pathfinderModules.find(
        (candidate) =>
          candidate.definition.identity.id === primary.pathfinderId,
      )
    : undefined;
  const alternativeManifest = alternative
    ? pathfinderModules.find(
        (candidate) =>
          candidate.definition.identity.id === alternative.pathfinderId,
      )
    : undefined;

  if (
    !primary ||
    !catalog ||
    catalog.status !== "available" ||
    !manifest?.orientation ||
    primary.score === 0
  )
    return (
      <div className="hub-orientation-results is-open">
        <span className="hub-orientation-result-icon" aria-hidden="true">
          <Compass size={24} />
        </span>
        <p className="section-kicker">Your starting map</p>
        <h2>Several paths are still open.</h2>
        <p>
          Your choices did not push one subject ahead—and that is a useful
          result. Browse the four pathfinders, open whichever example catches
          your eye, or revise one answer for a little more direction.
        </p>
        <div className="hub-orientation-result-actions">
          <a className="primary-button" href="#directory-title">
            Browse all pathfinders
          </a>
          <button className="secondary-button" type="button" onClick={onReview}>
            <ArrowLeft size={17} aria-hidden="true" /> Review my choices
          </button>
        </div>
      </div>
    );

  return (
    <div className="hub-orientation-results">
      <p className="section-kicker">
        {alternative?.score === primary.score
          ? "Two equally open starting points"
          : "A good place to start"}
      </p>
      <div className="hub-orientation-result-grid">
        <article className="hub-orientation-primary-result">
          <span>Start here</span>
          <h2>{catalog.name}</h2>
          <p className="hub-orientation-result-summary">
            {manifest.orientation.summary}
          </p>
          <div className="hub-orientation-reasons">
            <h3>Why it connects with your choices</h3>
            <ul>
              {primary.reasons.slice(0, 3).map((reason) => (
                <li key={reason.signalId}>
                  <strong>{reason.answerLabel}</strong>
                  <span>{reason.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="hub-orientation-boundary">
            <strong>Keep in mind:</strong> {manifest.orientation.boundary}
          </p>
          <Link className="primary-button" href={catalog.href}>
            Open {catalog.shortName}
          </Link>
        </article>
        {alternative &&
        alternativeCatalog &&
        alternativeCatalog.status === "available" &&
        alternativeManifest?.orientation ? (
          <article className="hub-orientation-alternative-result">
            <span>Nearby alternative</span>
            <h3>{alternativeCatalog.name}</h3>
            <p>{alternativeManifest.orientation.summary}</p>
            <h4>Why it also stayed in view</h4>
            {alternative.reasons.length > 0 ? (
              <ul>
                {alternative.reasons.slice(0, 2).map((reason) => (
                  <li key={reason.signalId}>
                    <strong>{reason.answerLabel}:</strong> {reason.text}
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                Your answers leave room to inspect this subject from a different
                angle.
              </p>
            )}
            <details>
              <summary>How it differs</summary>
              <p>{alternativeManifest.orientation.boundary}</p>
            </details>
            <Link className="secondary-button" href={alternativeCatalog.href}>
              Open {alternativeCatalog.shortName}
            </Link>
          </article>
        ) : null}
      </div>
      <div className="hub-orientation-result-actions">
        <button className="secondary-button" type="button" onClick={onReview}>
          <ArrowLeft size={17} aria-hidden="true" /> Review my choices
        </button>
        <a className="text-link" href="#directory-title">
          Browse all four pathfinders
        </a>
      </div>
    </div>
  );
}
