"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Atom, LockKeyhole, RotateCcw } from "lucide-react";
import { getVisibleQuestions, pruneHiddenAnswers } from "@/lib/branching";
import {
  createPersistedState,
  restoreProgress,
  serializeProgress,
  STORAGE_KEY,
} from "@/lib/persistence";
import type { AnswerMap, PersistedSurveyState } from "@/lib/types";
import { IntroScreen } from "@/components/IntroScreen";
import { SurveyScreen } from "@/components/SurveyScreen";
import { ResultsScreen } from "@/components/ResultsScreen";
import { ReviewScreen } from "@/components/ReviewScreen";

type Screen = PersistedSurveyState["screen"];

export function PathfinderApp() {
  const mainRef = useRef<HTMLElement>(null);
  const [screen, setScreen] = useState<Screen>("intro");
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [currentQuestionId, setCurrentQuestionId] = useState<string>();
  const [primaryOverride, setPrimaryOverride] = useState<string>();
  const [hydrated, setHydrated] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [recoveryNotice, setRecoveryNotice] = useState<string>();
  const [shortcutsEnabled, setShortcutsEnabled] = useState(false);

  useEffect(() => {
    if (hydrated && screen !== "survey") {
      mainRef.current
        ?.querySelector<HTMLHeadingElement>("h1")
        ?.focus({ preventScroll: true });
    }
  }, [hydrated, screen]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const { state: saved, notice } = restoreProgress(
          window.localStorage.getItem(STORAGE_KEY),
        );
        setRecoveryNotice(notice);
        if (saved) {
          setScreen(saved.screen);
          setAnswers(saved.answers);
          setCurrentQuestionId(saved.currentQuestionId);
          setPrimaryOverride(saved.primaryOverride);
          setShortcutsEnabled(saved.shortcutsEnabled ?? false);
        }
      } catch {
        setStorageAvailable(false);
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated || !storageAvailable) return;
    const state = createPersistedState({
      screen,
      answers,
      currentQuestionId,
      primaryOverride,
      shortcutsEnabled,
    });
    try {
      window.localStorage.setItem(STORAGE_KEY, serializeProgress(state));
    } catch {
      window.setTimeout(() => setStorageAvailable(false), 0);
    }
  }, [
    answers,
    currentQuestionId,
    hydrated,
    primaryOverride,
    screen,
    storageAvailable,
    shortcutsEnabled,
  ]);

  const visibleQuestions = useMemo(
    () => getVisibleQuestions(answers),
    [answers],
  );
  const surveyComplete = visibleQuestions.every(
    (question) => (answers[question.id]?.length ?? 0) > 0,
  );
  const resumeQuestion =
    visibleQuestions.find((question) => question.id === currentQuestionId) ??
    visibleQuestions.find((question) => !answers[question.id]?.length) ??
    visibleQuestions[0];
  const resumeIndex = visibleQuestions.findIndex(
    (question) => question.id === resumeQuestion?.id,
  );

  function begin() {
    setCurrentQuestionId(visibleQuestions[0]?.id);
    setScreen("survey");
    window.scrollTo({ top: 0 });
  }

  function resume() {
    if (surveyComplete) {
      showScreen("results");
      return;
    }
    setCurrentQuestionId(resumeQuestion?.id);
    showScreen("survey");
  }

  function goToQuestion(questionId: string) {
    setCurrentQuestionId(questionId);
    window.scrollTo({ top: 0 });
  }

  function showScreen(nextScreen: Screen) {
    setScreen(nextScreen);
    window.scrollTo({ top: 0 });
  }

  function updateAnswer(questionId: string, optionIds: string[]) {
    setAnswers((current) =>
      pruneHiddenAnswers({ ...current, [questionId]: optionIds }),
    );
    setPrimaryOverride(undefined);
  }

  function restart() {
    if (
      Object.keys(answers).length > 0 &&
      !window.confirm("Restart and clear your saved exploration?")
    )
      return;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      setStorageAvailable(false);
    }
    setAnswers({});
    setRecoveryNotice(undefined);
    setPrimaryOverride(undefined);
    setCurrentQuestionId(undefined);
    setScreen("intro");
  }

  if (!hydrated)
    return (
      <div className="loading-screen" aria-label="Loading your pathfinder" />
    );

  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Skip to main content
      </a>
      <div className={`app-frame screen-${screen}`}>
        <header className="app-header">
          <button
            className="brand brand-button"
            type="button"
            onClick={() => showScreen("intro")}
          >
            <span className="brand-mark">
              <Atom size={18} />
            </span>
            <span>Quantum Research Pathfinder</span>
          </button>
          <div className="header-note">
            <LockKeyhole size={14} />
            {storageAvailable
              ? "Progress stays on this device"
              : "Progress available for this visit"}
          </div>
          {screen !== "intro" && (
            <button className="quiet-action" type="button" onClick={restart}>
              <RotateCcw size={15} /> Restart
            </button>
          )}
        </header>
        <main id="main-content" ref={mainRef} tabIndex={-1}>
          {recoveryNotice && (
            <div className="definition-card" role="status">
              <p>{recoveryNotice}</p>
              <button
                className="text-button"
                type="button"
                onClick={() => setRecoveryNotice(undefined)}
              >
                Dismiss notice
              </button>
            </div>
          )}

          {screen === "intro" && (
            <IntroScreen
              hasProgress={Object.keys(answers).length > 0}
              resumeDetail={
                surveyComplete
                  ? "Your completed research map is ready"
                  : `Saved at question ${resumeIndex + 1} of ${visibleQuestions.length}`
              }
              onBegin={begin}
              onResume={resume}
            />
          )}
          {screen === "survey" && currentQuestionId && (
            <SurveyScreen
              answers={answers}
              currentQuestionId={currentQuestionId}
              onAnswer={updateAnswer}
              onQuestionChange={goToQuestion}
              onComplete={() => showScreen("results")}
              shortcutsEnabled={shortcutsEnabled}
              onShortcutsChange={setShortcutsEnabled}
            />
          )}
          {screen === "results" && (
            <ResultsScreen
              answers={answers}
              primaryOverride={primaryOverride}
              onExploreNearby={setPrimaryOverride}
              onReview={() => showScreen("review")}
              onRestart={restart}
            />
          )}
          {screen === "review" && (
            <ReviewScreen
              answers={answers}
              onEdit={(questionId) => {
                setCurrentQuestionId(questionId);
                showScreen("survey");
              }}
              onBack={() => showScreen("results")}
            />
          )}
        </main>
      </div>
    </>
  );
}
