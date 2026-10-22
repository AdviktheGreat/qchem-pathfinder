import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("app/globals.css", "utf8");

function mediaSection(query: string, nextQuery?: string): string {
  const start = css.indexOf(`@media (${query})`);
  if (start < 0) return "";
  const end = nextQuery
    ? css.indexOf(`@media (${nextQuery})`, start)
    : css.length;
  return css.slice(start, end < 0 ? css.length : end);
}

describe("interdisciplinary accessibility styles", () => {
  it("removes bridge motion when reduced motion is requested", () => {
    const reducedMotion = mediaSection(
      "prefers-reduced-motion: reduce",
      "prefers-contrast: more",
    );

    expect(reducedMotion).toContain(".interdisciplinary-disclosure");
    expect(reducedMotion).toContain(".interdisciplinary-search-tabs button");
    expect(reducedMotion).toContain("transition: none !important");
    expect(reducedMotion).toContain("transform: none !important");
  });

  it("strengthens bridge boundaries in increased-contrast mode", () => {
    const increasedContrast = mediaSection(
      "prefers-contrast: more",
      "forced-colors: active",
    );

    expect(increasedContrast).toContain(".interdisciplinary-arrival");
    expect(increasedContrast).toContain(".interdisciplinary-search-panel");
    expect(increasedContrast).toContain("border-width: 2px");
    expect(increasedContrast).toContain(
      '.interdisciplinary-search-tabs button[aria-selected="true"]',
    );
  });

  it("preserves selected and focused states in forced colors", () => {
    const forcedColors = mediaSection(
      "forced-colors: active",
      "pointer: coarse",
    );

    expect(forcedColors).toContain(".interdisciplinary-shared-question");
    expect(forcedColors).toContain("background: Highlight");
    expect(forcedColors).toContain("color: HighlightText");
    expect(forcedColors).toContain(
      ".interdisciplinary-search-tabs button:focus-visible",
    );
    expect(forcedColors).toContain("outline: 3px solid Highlight");
  });
});
