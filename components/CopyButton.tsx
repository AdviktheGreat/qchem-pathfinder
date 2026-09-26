"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({
  text,
  label = "Copy",
  context,
}: {
  text: string;
  label?: string;
  context?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const resetTimer = useRef<number | undefined>(undefined);
  const manualRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status === "failed") {
      manualRef.current?.focus();
      manualRef.current?.select();
    }
  }, [status]);

  useEffect(
    () => () => {
      if (resetTimer.current !== undefined)
        window.clearTimeout(resetTimer.current);
    },
    [],
  );

  async function copy() {
    if (resetTimer.current !== undefined)
      window.clearTimeout(resetTimer.current);
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
      return;
    }
    if (resetTimer.current !== undefined)
      window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => {
      setStatus("idle");
      resetTimer.current = undefined;
    }, 2200);
  }

  const buttonLabel =
    status === "copied"
      ? "Copied"
      : status === "failed"
        ? "Copy failed—select manually"
        : label;

  return (
    <>
      <button
        ref={buttonRef}
        className="copy-button"
        type="button"
        onClick={copy}
        aria-label={context ? `${buttonLabel} — ${context}` : undefined}
      >
        {status === "copied" ? <Check size={15} /> : <Copy size={15} />}
        <span aria-live="polite">{buttonLabel}</span>
      </button>
      {status === "failed" && (
        <div className="manual-copy no-print">
          <p>
            Automatic copying was unavailable. The text below is selected; use
            your device’s Copy command.
          </p>
          <textarea
            ref={manualRef}
            readOnly
            value={text}
            rows={5}
            aria-label={`Manual copy: ${context ?? label}`}
          />
          <button
            className="text-button"
            type="button"
            onClick={() => {
              manualRef.current?.focus();
              manualRef.current?.select();
            }}
          >
            Select all text
          </button>
          <button
            className="text-button"
            type="button"
            onClick={() => {
              setStatus("idle");
              buttonRef.current?.focus();
            }}
          >
            Close manual copy
          </button>
        </div>
      )}
    </>
  );
}
