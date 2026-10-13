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
  const catalog = primary ? getPathfinder(primary.pathfinderId) : undefined;
  const manifest = primary
    ? pathfinderModules.find(
        (candidate) =>
          candidate.definition.identity.id === primary.pathfinderId,
      )
    : undefined;

  if (!primary || !catalog || !manifest?.orientation || primary.score === 0)
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
        <button className="secondary-button" type="button" onClick={onReview}>
          <ArrowLeft size={17} aria-hidden="true" /> Review my choices
        </button>
      </div>
    );

  return (
    <div className="hub-orientation-results">
      <p className="section-kicker">A good place to start</p>
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
      <button className="secondary-button" type="button" onClick={onReview}>
        <ArrowLeft size={17} aria-hidden="true" /> Review my choices
      </button>
    </div>
  );
}
