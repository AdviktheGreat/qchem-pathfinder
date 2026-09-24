"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    window.setTimeout(() => setStatus("idle"), 2200);
  }

  const buttonLabel =
    status === "copied"
      ? "Copied"
      : status === "failed"
        ? "Copy failed—select manually"
        : label;

  return (
    <button className="copy-button" type="button" onClick={copy}>
      {status === "copied" ? <Check size={15} /> : <Copy size={15} />}
      <span aria-live="polite">{buttonLabel}</span>
    </button>
  );
}
