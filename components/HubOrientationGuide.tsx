"use client";

import {
  ArrowRight,
  Check,
  Clock3,
  Compass,
  RotateCcw,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HubOrientationQuestion } from "@/components/HubOrientationQuestion";
import { HubOrientationResults } from "@/components/HubOrientationResults";
import { hubOrientationQuestions } from "@/data/hub-orientation-questions";
import { hubOrientationSignals } from "@/data/hub-orientation-signals";
import { pathfinderModules } from "@/data/pathfinder-modules";
import { collectHubOrientationEvidence } from "@/lib/hub-orientation-answers";
import {
  getHubOrientationQuestionPath,
  updateHubOrientationAnswer,
} from "@/lib/hub-orientation-branching";
import { rankHubOrientation } from "@/lib/hub-orientation-ranking";
import {
  clearHubOrientationStorage,
  createHubOrientationState,
  hasHubOrientationAnswers,
  type HubOrientationStorageHealth,
  type PersistedHubOrientationState,
  readHubOrientationStorage,
  writeHubOrientationStorage,
} from "@/lib/hub-orientation-persistence";

export function HubOrientationGuide() {
  const entryButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const guideOpenedRef = useRef(false);
  const [screen, setScreen] = useState<
    "closed" | "intro" | "question" | "results"
  >("closed");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [restoredState, setRestoredState] =
    useState<PersistedHubOrientationState | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [storageHealth, setStorageHealth] = useState<
    "checking" | HubOrientationStorageHealth
  >("checking");
  const questionPath = getHubOrientationQuestionPath(
    hubOrientationQuestions,
    answers,
  );
  const question = questionPath[questionIndex];
  const rankings = rankHubOrientation(
    pathfinderModules,
    hubOrientationSignals,
    collectHubOrientationEvidence(questionPath, answers),
  );
  const restoredQuestionPath = restoredState
    ? getHubOrientationQuestionPath(
        hubOrientationQuestions,
        restoredState.answers,
      )
    : [];
  const restoredAnswerCount = restoredQuestionPath.filter(
    (candidate) => restoredState?.answers[candidate.id],
  ).length;
  const orientationStatus =
    restoredState?.screen === "results"
      ? {
          label: "Suggestions ready",
          detail: "Reopen your saved starting map",
        }
      : restoredState?.screen === "question"
        ? {
            label: "Continue choosing",
            detail: `${restoredAnswerCount} of ${restoredQuestionPath.length} decisions saved`,
          }
        : {
            label: "Not started",
            detail: "A short optional guide",
          };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const result = readHubOrientationStorage(window.localStorage);
        setRestoredState(result.state);
        setStorageHealth(result.health);
      } catch {
        setRestoredState(null);
        setStorageHealth("unavailable");
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated || screen === "closed") return;
    if (screen === "intro" && !hasHubOrientationAnswers(answers)) return;
    const state = createHubOrientationState({
      screen,
      answers,
      currentQuestionId: screen === "question" ? question?.id : undefined,
    });
    try {
      const health = writeHubOrientationStorage(window.localStorage, state);
      const timer = window.setTimeout(() => {
        setRestoredState(state);
        setStorageHealth(health);
      }, 0);
      return () => window.clearTimeout(timer);
    } catch {
      // The guide still works for the current visit when storage is blocked.
    }
  }, [answers, hydrated, question?.id, screen]);

  useEffect(() => {
    if (!guideOpenedRef.current) return;
    const timer = window.setTimeout(() => {
      if (screen === "closed") entryButtonRef.current?.focus();
      if (screen === "intro")
        panelRef.current
          ?.querySelector<HTMLHeadingElement>("h2")
          ?.focus({ preventScroll: true });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [screen]);

  function openGuide() {
    guideOpenedRef.current = true;
    if (!restoredState) {
      setScreen("intro");
      return;
    }
    const restoredPath = getHubOrientationQuestionPath(
      hubOrientationQuestions,
      restoredState.answers,
    );
    const restoredIndex = Math.max(
      0,
      restoredPath.findIndex(
        (candidate) => candidate.id === restoredState.currentQuestionId,
      ),
    );
    setAnswers(restoredState.answers);
    setQuestionIndex(restoredIndex);
    setScreen(restoredState.screen);
  }

  function restartGuide() {
    if (
      hasHubOrientationAnswers(answers) &&
      !window.confirm(
        "Restart this short guide and clear its saved answers? Your progress inside every subject pathfinder will stay exactly as it is.",
      )
    )
      return;
    try {
      setStorageHealth(clearHubOrientationStorage(window.localStorage));
    } catch {
      // Reset the in-memory guide even when browser storage is unavailable.
    }
    setAnswers({});
    setQuestionIndex(0);
    setRestoredState(null);
    setScreen("intro");
  }

  if (screen === "closed")
    return (
      <section
        className="hub-orientation-entry"
        aria-labelledby="hub-orientation-entry-title"
      >
        <span className="hub-orientation-entry-icon" aria-hidden="true">
          <Compass size={22} />
        </span>
        <div>
          <p className="section-kicker">Not sure where to begin?</p>
          <h2 id="hub-orientation-entry-title">Find a good first stop.</h2>
          <p>
            Answer a few preference questions and compare two sensible places to
            start. You can still browse every pathfinder yourself.
          </p>
        </div>
        <div
          className="hub-orientation-entry-status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span aria-hidden="true" />
          <strong>{orientationStatus.label}</strong>
          <small>
            {storageHealth === "unavailable"
              ? "This visit only — saving unavailable"
              : orientationStatus.detail}
          </small>
        </div>
        <button
          ref={entryButtonRef}
          className="primary-button"
          onClick={openGuide}
        >
          {restoredState?.screen === "results"
            ? "View my suggestions"
            : restoredState?.screen === "question"
              ? "Continue choosing"
              : "Help me choose"}{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </button>
      </section>
    );

  return (
    <section
      ref={panelRef}
      className={`hub-orientation-panel is-${screen}`}
      aria-label="Pathfinder guide"
    >
      <div className="hub-orientation-panel-tools">
        {hasHubOrientationAnswers(answers) ? (
          <button
            className="hub-orientation-reset"
            type="button"
            onClick={restartGuide}
          >
            <RotateCcw size={15} aria-hidden="true" /> Restart guide
          </button>
        ) : null}
        <button
          className="icon-button hub-orientation-close"
          type="button"
          onClick={() => setScreen("closed")}
          aria-label="Close pathfinder guide"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
      <div
        className={`hub-orientation-save-state is-${storageHealth}`}
        aria-live="polite"
        aria-atomic="true"
      >
        <span aria-hidden="true" />
        {storageHealth === "unavailable"
          ? "Saving unavailable — progress lasts for this visit"
          : storageHealth === "checking"
            ? "Checking local save"
            : hasHubOrientationAnswers(answers)
              ? "Progress saved on this device"
              : "Ready to save on this device"}
      </div>
      {screen === "results" ? (
        <HubOrientationResults
          rankings={rankings}
          answers={answers}
          questions={questionPath}
          onReview={() => {
            panelRef.current?.scrollIntoView?.({ block: "start" });
            setQuestionIndex(0);
            setScreen("question");
          }}
        />
      ) : screen === "question" ? (
        <HubOrientationQuestion
          question={question}
          selectedOptionId={answers[question.id]}
          currentStep={questionIndex + 1}
          totalSteps={questionPath.length}
          onSelect={(optionId) =>
            setAnswers((current) =>
              updateHubOrientationAnswer(
                hubOrientationQuestions,
                current,
                question.id,
                optionId,
              ),
            )
          }
          onBack={() => {
            if (questionIndex === 0) setScreen("intro");
            else setQuestionIndex((index) => index - 1);
          }}
          onContinue={() => {
            if (questionIndex < questionPath.length - 1)
              setQuestionIndex((index) => index + 1);
            else setScreen("results");
          }}
        />
      ) : (
        <>
          <p className="section-kicker">Pathfinder guide</p>
          <h2 id="hub-orientation-title" tabIndex={-1}>
            Let’s find a useful place to start.
          </h2>
          <p>
            You’ll make a handful of low-pressure choices about what holds your
            attention and how you like to investigate a question. We’ll suggest
            one pathfinder to begin with and one nearby alternative.
          </p>
          <div className="hub-orientation-meta" aria-label="Guide details">
            <span>
              <Clock3 size={15} aria-hidden="true" /> About 2–4 minutes
            </span>
            <span>
              <ShieldCheck size={15} aria-hidden="true" /> Answers stay on this
              device
            </span>
            <span>
              <Check size={15} aria-hidden="true" /> No scores or wrong answers
            </span>
          </div>
          <div className="hub-orientation-promise">
            <article>
              <span>01</span>
              <strong>Notice</strong>
              <p>
                Choose situations and questions that naturally catch your eye.
              </p>
            </article>
            <article>
              <span>02</span>
              <strong>Compare</strong>
              <p>
                See why two subject areas could both be worthwhile starting
                points.
              </p>
            </article>
            <article>
              <span>03</span>
              <strong>Choose freely</strong>
              <p>
                Open either suggestion, revise your choices, or browse all four.
              </p>
            </article>
          </div>
          <p className="hub-orientation-reassurance">
            This is not a knowledge test, a talent assessment, or a permanent
            field choice.
          </p>
          <div className="hub-orientation-intro-actions">
            <button
              className="primary-button"
              type="button"
              onClick={() => {
                setQuestionIndex(0);
                setScreen("question");
              }}
            >
              Start the guide <ArrowRight size={17} aria-hidden="true" />
            </button>
            <a className="text-link" href="#directory-title">
              Browse all pathfinders instead{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </>
      )}
    </section>
  );
}
