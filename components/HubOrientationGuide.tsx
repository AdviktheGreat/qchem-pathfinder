"use client";

import {
  ArrowRight,
  Check,
  Clock3,
  Compass,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";
import { HubOrientationQuestion } from "@/components/HubOrientationQuestion";
import { hubOrientationQuestions } from "@/data/hub-orientation-questions";
import {
  getHubOrientationQuestionPath,
  updateHubOrientationAnswer,
} from "@/lib/hub-orientation-branching";

export function HubOrientationGuide() {
  const [screen, setScreen] = useState<"closed" | "intro" | "question">(
    "closed",
  );
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const questionPath = getHubOrientationQuestionPath(
    hubOrientationQuestions,
    answers,
  );
  const question = questionPath[questionIndex];

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
        <button className="primary-button" onClick={() => setScreen("intro")}>
          Help me choose <ArrowRight size={17} aria-hidden="true" />
        </button>
      </section>
    );

  return (
    <section className="hub-orientation-panel" aria-label="Pathfinder guide">
      <button
        className="icon-button hub-orientation-close"
        type="button"
        onClick={() => setScreen("closed")}
        aria-label="Close pathfinder guide"
      >
        <X size={18} aria-hidden="true" />
      </button>
      {screen === "question" ? (
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
            else setScreen("intro");
          }}
        />
      ) : (
        <>
          <p className="section-kicker">Pathfinder guide</p>
          <h2 id="hub-orientation-title">
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
