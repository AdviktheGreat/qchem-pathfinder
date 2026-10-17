// @vitest-environment jsdom

import { readFileSync } from "node:fs";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { HubOrientationChoiceSummary } from "@/components/HubOrientationChoiceSummary";
import { HubOrientationComparison } from "@/components/HubOrientationComparison";
import { HubOrientationNextSteps } from "@/components/HubOrientationNextSteps";

afterEach(cleanup);

describe("hub orientation Phase 4 components", () => {
  it("summarizes recorded choices and labels uncertainty honestly", () => {
    render(
      <HubOrientationChoiceSummary
        choices={[
          {
            questionId: "broad-curiosity",
            question: "What catches your attention?",
            answer: "I’m not sure yet",
            uncertain: true,
          },
        ]}
      />,
    );

    fireEvent.click(screen.getByText("Review the choices behind this map"));
    expect(screen.getByText("What catches your attention?")).toBeDefined();
    expect(screen.getByText("I’m not sure yet")).toBeDefined();
    expect(screen.getByText("Kept open")).toBeDefined();
  });

  it("omits an empty choice summary", () => {
    const { container } = render(<HubOrientationChoiceSummary choices={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("compares systems, questions, and outcomes for both fields", () => {
    render(
      <HubOrientationComparison
        primary={{
          name: "Computational materials",
          label: "Leading lens",
          systems: "Solids and interfaces",
          questions: "How structure shapes properties",
          outcome: "A materials direction",
        }}
        alternative={{
          name: "Quantum chemistry",
          label: "Nearby lens",
          systems: "Molecules and electrons",
          questions: "Why molecular behavior occurs",
          outcome: "A molecular direction",
        }}
      />,
    );

    const comparison = screen
      .getByRole("heading", { name: "Compare the two starting points." })
      .closest("section")!;
    expect(within(comparison).getAllByText("Systems")).toHaveLength(2);
    expect(within(comparison).getAllByText("Typical questions")).toHaveLength(
      2,
    );
    expect(within(comparison).getAllByText("Pathfinder outcome")).toHaveLength(
      2,
    );
  });

  it("adapts the workshop handoff when no field leads", () => {
    const { rerender } = render(<HubOrientationNextSteps />);
    expect(screen.getByText("Scan all four field cards")).toBeDefined();
    expect(screen.getByText("Open two introductions")).toBeDefined();

    rerender(
      <HubOrientationNextSteps
        primaryName="Computational materials"
        alternativeName="Quantum chemistry"
      />,
    );
    expect(screen.getByText("Open Computational materials")).toBeDefined();
    expect(screen.getByText("Keep Quantum chemistry in view")).toBeDefined();
  });

  it("keeps Phase 4 layouts responsive, printable, and forced-color aware", () => {
    const css = readFileSync("app/globals.css", "utf8");
    expect(css).toContain(".hub-orientation-choice-summary");
    expect(css).toContain(".hub-orientation-comparison-grid");
    expect(css).toContain(".hub-orientation-next-steps");
    expect(css).toContain("@media print");
    expect(css).toContain("@media (forced-colors: active)");
    expect(css).toContain("@media (max-width: 620px)");
  });
});
