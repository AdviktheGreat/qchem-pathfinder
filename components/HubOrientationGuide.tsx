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

export function HubOrientationGuide() {
  const [open, setOpen] = useState(false);

  if (!open)
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
        <button className="primary-button" onClick={() => setOpen(true)}>
          Help me choose <ArrowRight size={17} aria-hidden="true" />
        </button>
      </section>
    );

  return (
    <section
      className="hub-orientation-panel"
      aria-labelledby="hub-orientation-title"
    >
      <button
        className="icon-button hub-orientation-close"
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Close pathfinder guide"
      >
        <X size={18} aria-hidden="true" />
      </button>
      <p className="section-kicker">Pathfinder guide</p>
      <h2 id="hub-orientation-title">Let’s find a useful place to start.</h2>
      <p>
        You’ll make a handful of low-pressure choices about what holds your
        attention and how you like to investigate a question. We’ll suggest one
        pathfinder to begin with and one nearby alternative.
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
          <p>Choose situations and questions that naturally catch your eye.</p>
        </article>
        <article>
          <span>02</span>
          <strong>Compare</strong>
          <p>
            See why two subject areas could both be worthwhile starting points.
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
        This is not a knowledge test, a talent assessment, or a permanent field
        choice.
      </p>
      <a className="text-link" href="#directory-title">
        Browse all pathfinders instead{" "}
        <ArrowRight size={16} aria-hidden="true" />
      </a>
    </section>
  );
}
