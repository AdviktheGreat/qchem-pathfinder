// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ResultsScreen } from "@/components/ResultsScreen";
import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology/pathfinder";

afterEach(() => cleanup());

function renderBiologyResults() {
  return render(
    <ResultsScreen
      definition={computationalBiologyPathfinder}
      answers={{
        "biology-starting-point": ["recognize"],
        "biology-quantitative-comfort": ["with-guidance"],
        "biology-statistics-comfort": ["learning"],
        "biology-coding-comfort": ["learning"],
        "biology-tools-comfort": ["guided"],
        "biology-explanation-style": ["visual"],
        "biology-motivation": ["genomes"],
        "biology-question-kind": ["compare"],
        "biology-scale": ["genes-genomes"],
        "biology-evidence": ["sequences"],
        "biology-workflow": ["visualize"],
        "biology-genome-focus": ["across-species"],
        "biology-genome-evidence": ["conserved-changed-regions"],
      }}
      onExploreNearby={vi.fn()}
      onReview={vi.fn()}
      onRestart={vi.fn()}
    />,
  );
}

describe("computational biology results presentation", () => {
  it("marks the page and primary direction with biology-specific themes", () => {
    const { container } = renderBiologyResults();

    expect(
      container.querySelector('[data-pathfinder="computational-biology"]'),
    ).not.toBeNull();
    expect(
      container.querySelector(".primary-result.theme-genomics"),
    ).not.toBeNull();
  });

  it("keeps essential results and export actions available in the shared responsive layout", () => {
    renderBiologyResults();

    expect(
      screen.getByRole("heading", {
        name: "A promising biological direction to investigate",
      }),
    ).toBeDefined();
    expect(screen.getByRole("button", { name: "Print" })).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Copy biology profile" }),
    ).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Download biology profile" }),
    ).toBeDefined();
  });
});
