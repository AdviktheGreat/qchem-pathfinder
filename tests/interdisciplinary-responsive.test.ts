import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("app/globals.css", "utf8");

function section(startToken: string, endToken: string): string {
  const start = css.indexOf(startToken);
  const end = endToken
    ? css.indexOf(endToken, start + startToken.length)
    : css.length;
  return start < 0 ? "" : css.slice(start, end < 0 ? css.length : end);
}

describe("interdisciplinary responsive layout", () => {
  it("stacks bridge orientation content at tablet width", () => {
    const tablet = section(
      "@media (max-width: 820px)",
      "@media (max-width: 620px)",
    );

    expect(tablet).toContain(".interdisciplinary-heading");
    expect(tablet).toContain("grid-template-columns: 1fr");
    expect(tablet).toContain(".interdisciplinary-arrival");
    expect(tablet).toContain("margin-inline: 1rem");
  });

  it("stacks cards, searches, actions, and arrivals on phones", () => {
    const phone = section("@media (max-width: 620px)", '[id$="-title"]');

    expect(phone).toContain(".interdisciplinary-actions > *");
    expect(phone).toContain("width: 100%");
    expect(phone).toContain(".interdisciplinary-search-copy");
    expect(phone).toContain(".interdisciplinary-arrival");
    expect(phone).toContain("grid-template-columns: 1fr");
    expect(css).toMatch(
      /\.interdisciplinary-bridge\s*{[^}]*max-width:\s*100%[^}]*overflow-x:\s*clip/,
    );
  });

  it("provides large touch targets for every bridge control", () => {
    const coarsePointer = section("@media (pointer: coarse)", "");

    expect(coarsePointer).toContain(".interdisciplinary-disclosure > summary");
    expect(coarsePointer).toContain(".interdisciplinary-search-tabs button");
    expect(coarsePointer).toContain(".interdisciplinary-actions > a");
    expect(coarsePointer).toContain(".interdisciplinary-return");
    expect(coarsePointer).toContain("min-height: 48px");
  });
});
