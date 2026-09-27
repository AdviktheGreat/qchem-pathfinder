"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Atom,
  Check,
  ChevronDown,
  Home,
  LockKeyhole,
  RotateCcw,
  Save,
  ScanLine,
} from "lucide-react";
import {
  getVisibleQuestions,
  pruneHiddenAnswers,
  getPlannedQuestionCount,
} from "@/lib/branching";
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
import { stageLabels, questionById } from "@/data/questions";
import { resolveAnswerConflicts } from "@/lib/answer-conflicts";

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
  const [branchChanged, setBranchChanged] = useState(false);
  const [answerResolutionNotice, setAnswerResolutionNotice] = useState<
    string | undefined
  >();
  const [saveStatus, setSaveStatus] = useState<"saving" | "saved" | "failed">(
    "saved",
  );
  const saveTimerRef = useRef<number | undefined>(undefined);

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
      const savingTimer = window.setTimeout(() => setSaveStatus("saving"), 0);
      window.localStorage.setItem(STORAGE_KEY, serializeProgress(state));
      window.clearTimeout(saveTimerRef.current);
      saveTimerRef.current = window.setTimeout(
        () => setSaveStatus("saved"),
        550,
      );
      return () => {
        window.clearTimeout(savingTimer);
        window.clearTimeout(saveTimerRef.current);
      };
    } catch {
      window.setTimeout(() => setSaveStatus("failed"), 0);
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
  const currentQuestion = currentQuestionId
    ? questionById[currentQuestionId]
    : undefined;
  const contextLabel =
    screen === "survey" && currentQuestion
      ? stageLabels[currentQuestion.stage]
      : screen === "results"
        ? "Exploration map"
        : screen === "review"
          ? "Answer review"
          : "Research orientation";

  function begin() {
    setAnswerResolutionNotice(undefined);
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
    setAnswerResolutionNotice(undefined);
    setCurrentQuestionId(questionId);
    window.scrollTo({ top: 0 });
  }

  function showScreen(nextScreen: Screen) {
    setScreen(nextScreen);
    window.scrollTo({ top: 0 });
  }

  function updateAnswer(questionId: string, optionIds: string[]) {
    const previous = answers[questionId] ?? [];
    if (
      previous.length === optionIds.length &&
      previous.every((id) => optionIds.includes(id))
    )
      return;
    const question = questionById[questionId];
    const latestOptionId = optionIds.at(-1);
    const previousOptionId = previous.at(-1);
    if (
      question?.type === "single" &&
      previousOptionId &&
      latestOptionId &&
      previousOptionId !== latestOptionId
    ) {
      const previousLabel = question.options.find(
        (option) => option.id === previousOptionId,
      )?.label;
      const latestLabel = question.options.find(
        (option) => option.id === latestOptionId,
      )?.label;
      setAnswerResolutionNotice(
        `Updated this answer: “${previousLabel ?? previousOptionId}” was replaced by “${latestLabel ?? latestOptionId}.” Only the new choice will influence your directions and profile.`,
      );
    } else {
      setAnswerResolutionNotice(undefined);
    }
    if (
      questionId === "motivation" &&
      answers.motivation?.length &&
      answers.motivation[0] !== optionIds[0]
    )
      setBranchChanged(true);
    setAnswers((current) => {
      const currentPrevious = current[questionId] ?? [];
      const candidateIds =
        question?.type === "single"
          ? [...currentPrevious, ...optionIds]
          : optionIds;
      const resolved = resolveAnswerConflicts({
        ...current,
        [questionId]: candidateIds,
      }).answers;
      return pruneHiddenAnswers(resolved);
    });
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
    setBranchChanged(false);
    setAnswerResolutionNotice(undefined);
    setRecoveryNotice(undefined);
    setPrimaryOverride(undefined);
    setCurrentQuestionId(undefined);
    setScreen("intro");
  }

  if (!hydrated)
    return (
      <div
        className="loading-screen"
        role="status"
        aria-label="Loading your pathfinder"
      >
        <div className="orbital-loader" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p>Restoring your exploration…</p>
      </div>
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
          <div className="header-context" aria-live="polite">
            <span className="context-label">{contextLabel}</span>
            <span
              className={`save-state save-${storageAvailable ? saveStatus : "failed"}`}
            >
              {storageAvailable ? (
                saveStatus === "saving" ? (
                  <>
                    <Save size={13} /> Saving…
                  </>
                ) : (
                  <>
                    <Check size={13} /> Saved on this device
                  </>
                )
              ) : (
                <>
                  <LockKeyhole size={13} /> Progress available for this visit
                </>
              )}
            </span>
          </div>
          <details className="app-menu">
            <summary>
              Menu <ChevronDown size={15} />
            </summary>
            <div>
              <button type="button" onClick={() => showScreen("intro")}>
                <Home size={15} /> Home
              </button>
              {surveyComplete && screen !== "review" && (
                <button type="button" onClick={() => showScreen("review")}>
                  <ScanLine size={15} /> Review answers
                </button>
              )}
              {screen !== "intro" && (
                <button type="button" onClick={restart}>
                  <RotateCcw size={15} /> Restart
                </button>
              )}
            </div>
          </details>
        </header>
        <main id="main-content" ref={mainRef} tabIndex={-1}>
          {screen === "survey" &&
            branchChanged &&
            visibleQuestions.some(
              (question) =>
                question.visibleWhen && !answers[question.id]?.length,
            ) && (
              <div className="definition-card" role="status">
                <p>
                  Your doorway changed. The previous branch and its answers were
                  removed. Answer{" "}
                  {
                    visibleQuestions.filter(
                      (question) =>
                        question.visibleWhen && !answers[question.id]?.length,
                    ).length
                  }{" "}
                  new follow-up questions before updating your directions. Your
                  other answers are still here.
                </p>
              </div>
            )}
          {!storageAvailable && (
            <div
              className="definition-card storage-warning no-print"
              role="status"
            >
              <p>
                <strong>Progress is not being saved.</strong> You can keep
                exploring in this tab, but new answers may be lost if you
                refresh or leave. Copy or download your profile when you reach
                the results.
              </p>
            </div>
          )}
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
                  : `Saved at question ${resumeIndex + 1} of ${getPlannedQuestionCount(answers)}`
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
              answerResolutionNotice={answerResolutionNotice}
              onDismissAnswerResolution={() =>
                setAnswerResolutionNotice(undefined)
              }
              onQuestionChange={goToQuestion}
              onComplete={() => showScreen("results")}
              onPause={() => showScreen("intro")}
              canUpdateResults={surveyComplete}
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
