// @vitest-environment jsdom

import { readFileSync } from "node:fs";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { InterdisciplinaryBridge } from "@/components/InterdisciplinaryBridge";
import { quantumChemistryInterdisciplinaryLinks } from "@/data/pathfinders/quantum-chemistry-links";

afterEach(cleanup);

describe("desktop interdisciplinary bridge layout", () => {
  it("keeps multiple bridge cards in a resilient responsive grid", () => {
    const css = readFileSync("app/globals.css", "utf8");

    expect(css).toMatch(
      /\.interdisciplinary-grid\s*{[^}]*grid-template-columns:\s*repeat\(auto-fit,\s*minmax\(min\(100%,\s*24rem\),\s*1fr\)\)/,
    );
    expect(css).toContain(".interdisciplinary-grid > *");
    expect(css).toContain(".interdisciplinary-lens-comparison > *");
    expect(css).toContain("overflow-wrap: anywhere");
  });

  it("renders long scientific names and comparisons without truncating content", () => {
    const longName =
      "Charge-transfer photophysics across electronically coupled multiscale interfaces";
    const links = quantumChemistryInterdisciplinaryLinks
      .slice(0, 2)
      .map((link, index) => ({
        ...link,
        id: `${link.id}-layout-${index}`,
        targetNicheName: index === 0 ? longName : link.targetNicheName,
      }));

    const { container } = render(
      <InterdisciplinaryBridge
        links={links}
        sourcePathfinderName="Quantum chemistry"
        sourceDirectionName="A long molecular electronic-structure direction"
      />,
    );

    expect(screen.getByRole("heading", { name: longName })).toBeDefined();
    expect(
      container.querySelectorAll("details.interdisciplinary-disclosure"),
    ).toHaveLength(2);
    expect(container.textContent).toContain(
      "A long molecular electronic-structure direction",
    );
    expect(container.textContent).toContain(links[0].distinction);
  });
});
