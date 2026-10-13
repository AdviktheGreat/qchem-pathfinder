"use client";

import { ArrowRight, Compass, X } from "lucide-react";
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
        This optional guide looks at what holds your attention and how you like
        to investigate a question. It does not test your knowledge or lock you
        into a field.
      </p>
      <a className="text-link" href="#directory-title">
        Browse all pathfinders instead{" "}
        <ArrowRight size={16} aria-hidden="true" />
      </a>
    </section>
  );
}
