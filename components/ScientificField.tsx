"use client";

import type { PointerEvent } from "react";

export function ScientificField() {
  function shiftField(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--field-x", x.toFixed(2));
    event.currentTarget.style.setProperty("--field-y", y.toFixed(2));
  }

  return (
    <div
      className="scientific-field"
      aria-hidden="true"
      onPointerMove={shiftField}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--field-x", "0");
        event.currentTarget.style.setProperty("--field-y", "0");
      }}
    >
      <div className="density-contours">
        <span />
        <span />
        <span />
      </div>
      <svg viewBox="0 0 260 120" focusable="false">
        <path d="M8 86 C 58 84, 65 18, 126 48 S 197 99, 252 24" />
        <circle cx="126" cy="48" r="4" />
        <circle cx="252" cy="24" r="4" />
      </svg>
      <div className="state-network">
        <span />
        <span />
        <span />
        <i />
        <i />
      </div>
    </div>
  );
}
