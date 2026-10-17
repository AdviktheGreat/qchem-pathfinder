import Link from "next/link";
import { ArrowLeft, Compass, Download } from "lucide-react";
import { useEffect, useRef } from "react";
import { CopyButton } from "@/components/CopyButton";
import { HubOrientationBridge } from "@/components/HubOrientationBridge";
import { getPathfinder } from "@/data/pathfinders";
import { pathfinderModules } from "@/data/pathfinder-modules";
import { explainHubOrientationFit } from "@/lib/hub-orientation-answers";
import { getHubOrientationBalance } from "@/lib/hub-orientation-balance";
import type {
  HubOrientationAnswers,
  HubOrientationQuestion,
  HubOrientationRanking,
} from "@/lib/hub-orientation";
import {
  createHubOrientationWorkshopMap,
  formatHubOrientationWorkshopMap,
  hubOrientationWorkshopMapFilename,
} from "@/lib/hub-orientation-workshop-map";

export function HubOrientationResults({
  rankings,
  answers,
  questions,
  onReview,
}: {
  rankings: readonly HubOrientationRanking[];
  answers: HubOrientationAnswers;
  questions: readonly HubOrientationQuestion[];
  onReview: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
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
  const fit = primary
    ? explainHubOrientationFit(primary, questions, answers)
    : undefined;
  const balance = getHubOrientationBalance(rankings);
  const workshopMapText = formatHubOrientationWorkshopMap(
    createHubOrientationWorkshopMap(rankings, questions, answers),
  );

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [primary?.pathfinderId]);

  function downloadWorkshopMap() {
    const blob = new Blob([workshopMapText], {
      type: "text/plain;charset=utf-8",
    });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = hubOrientationWorkshopMapFilename();
    anchor.click();
    URL.revokeObjectURL(href);
  }

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
        <h2 ref={headingRef} tabIndex={-1}>
          Several paths are still open.
        </h2>
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
          <CopyButton text={workshopMapText} label="Copy workshop map" />
          <button
            className="copy-button"
            type="button"
            onClick={downloadWorkshopMap}
          >
            <Download size={15} aria-hidden="true" /> Download workshop map
          </button>
        </div>
      </div>
    );

  return (
    <div className="hub-orientation-results">
      <p className="section-kicker">
        {balance === "tie"
          ? "Two equally supported starting points"
          : balance === "close"
            ? "Two strong starting points"
            : "A good place to start"}
      </p>
      {balance === "tie" || balance === "close" ? (
        <p className="hub-orientation-balance-note">
          {balance === "tie"
            ? "Your choices support both fields equally. Their order below is only for display, so begin with either one."
            : "Your interests pull toward both fields. The first has a slight lead, but comparing both introductions is a sensible next step."}
        </p>
      ) : null}
      <div className="hub-orientation-result-grid">
        <article
          className={`hub-orientation-primary-result ${balance === "tie" ? "is-balanced" : ""}`}
        >
          <span>
            {balance === "tie"
              ? "One starting point"
              : balance === "close"
                ? "Slight lead"
                : "Start here"}
          </span>
          <h2 ref={headingRef} tabIndex={-1}>
            {catalog.name}
          </h2>
          <p className="hub-orientation-result-summary">
            {manifest.orientation.summary}
          </p>
          <div className="hub-orientation-reasons">
            <h3>Why it connects with your choices</h3>
            <div className="hub-orientation-fit-groups">
              <section>
                <h4>Interest fit</h4>
                {fit?.interestReasons.length ? (
                  <ul>
                    {fit.interestReasons.slice(0, 2).map((reason) => (
                      <li key={reason.signalId}>
                        <strong>{reason.answerLabel}</strong>
                        <span>{reason.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No strong subject-interest signal separated this path.</p>
                )}
              </section>
              <section>
                <h4>Research-style fit</h4>
                {fit?.researchStyleReasons.length ? (
                  <ul>
                    {fit.researchStyleReasons.slice(0, 2).map((reason) => (
                      <li key={reason.signalId}>
                        <strong>{reason.answerLabel}</strong>
                        <span>{reason.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Your working-style choices kept several fields open.</p>
                )}
              </section>
              <section className="hub-orientation-uncertainty">
                <h4>Areas still open</h4>
                <p>
                  {fit?.uncertainAnswerCount
                    ? `${fit.uncertainAnswerCount} uncertain ${fit.uncertainAnswerCount === 1 ? "choice keeps" : "choices keep"} nearby fields in view.`
                    : "Your answers gave this starting point clear support, while the nearby alternative remains worth comparing."}
                </p>
              </section>
            </div>
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
            <span>
              {balance === "tie"
                ? "Equally supported"
                : balance === "close"
                  ? "Close alternative"
                  : "Nearby alternative"}
            </span>
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
      {alternativeCatalog?.status === "available" ? (
        <HubOrientationBridge
          primaryName={catalog.shortName}
          alternativeName={alternativeCatalog.shortName}
        />
      ) : null}
      <div className="hub-orientation-result-actions">
        <button className="secondary-button" type="button" onClick={onReview}>
          <ArrowLeft size={17} aria-hidden="true" /> Review my choices
        </button>
        <a className="text-link" href="#directory-title">
          Browse all four pathfinders
        </a>
        <CopyButton text={workshopMapText} label="Copy workshop map" />
        <button
          className="copy-button"
          type="button"
          onClick={downloadWorkshopMap}
        >
          <Download size={15} aria-hidden="true" /> Download workshop map
        </button>
      </div>
    </div>
  );
}
