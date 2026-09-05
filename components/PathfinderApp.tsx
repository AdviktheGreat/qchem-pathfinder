"use client";

import { useEffect, useMemo, useState } from "react";
import { Atom, LockKeyhole, RotateCcw } from "lucide-react";
import { getVisibleQuestions, pruneHiddenAnswers } from "@/lib/branching";
import {
  createPersistedState,
  parseProgress,
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
  const [screen, setScreen] = useState<Screen>("intro");
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [currentQuestionId, setCurrentQuestionId] = useState<string>();
  const [primaryOverride, setPrimaryOverride] = useState<string>();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = parseProgress(window.localStorage.getItem(STORAGE_KEY));
      if (saved) {
        setScreen(saved.screen);
        setAnswers(saved.answers);
        setCurrentQuestionId(saved.currentQuestionId);
        setPrimaryOverride(saved.primaryOverride);
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const state = createPersistedState({
      screen,
      answers,
      currentQuestionId,
      primaryOverride,
    });
    window.localStorage.setItem(STORAGE_KEY, serializeProgress(state));
  }, [answers, currentQuestionId, hydrated, primaryOverride, screen]);

  const visibleQuestions = useMemo(
    () => getVisibleQuestions(answers),
    [answers],
  );
  const surveyComplete = visibleQuestions.every(
    (question) => (answers[question.id]?.length ?? 0) > 0,
  );

  function begin() {
    setCurrentQuestionId(visibleQuestions[0]?.id);
    setScreen("survey");
    window.scrollTo({ top: 0 });
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
    window.localStorage.removeItem(STORAGE_KEY);
    setAnswers({});
    setPrimaryOverride(undefined);
    setCurrentQuestionId(undefined);
    setScreen("intro");
  }

  if (!hydrated)
    return (
      <div className="loading-screen" aria-label="Loading your pathfinder" />
    );

  return (
    <main className={`app-frame screen-${screen}`}>
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
          <LockKeyhole size={14} /> Progress stays on this device
        </div>
        {screen !== "intro" && (
          <button className="quiet-action" type="button" onClick={restart}>
            <RotateCcw size={15} /> Restart
          </button>
        )}
      </header>

      {screen === "intro" && (
        <IntroScreen
          hasProgress={Object.keys(answers).length > 0}
          onBegin={begin}
          onResume={() => showScreen(surveyComplete ? "results" : "survey")}
        />
      )}
      {screen === "survey" && currentQuestionId && (
        <SurveyScreen
          answers={answers}
          currentQuestionId={currentQuestionId}
          onAnswer={updateAnswer}
          onQuestionChange={goToQuestion}
          onComplete={() => showScreen("results")}
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
  );
}
