// @vitest-environment jsdom

import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ResultsScreen } from "@/components/ResultsScreen";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";

afterEach(() => cleanup());

function renderMaterialsResults() {
  render(
    <ResultsScreen
      definition={computationalMaterialsPathfinder}
      answers={{
        "materials-starting-point": ["recognize"],
        "materials-motivation": ["energy-conversion"],
        "materials-question-kind": ["predict"],
        "materials-family": ["crystalline"],
        "materials-phenomena": ["optical", "electrons"],
        "materials-scale": ["device"],
        "materials-energy-direction": ["photovoltaics"],
      }}
      onExploreNearby={vi.fn()}
      onReview={vi.fn()}
      onRestart={vi.fn()}
    />,
  );
}

describe("computational materials results", () => {
  it("introduces the primary direction as an exploratory scientific starting point", () => {
    renderMaterialsResults();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "A promising materials direction to investigate",
      }),
    ).toBeDefined();
    expect(
      screen.getByText(
        /well-supported starting point for reading and comparison/i,
      ),
    ).toBeDefined();
    expect(
      screen.getByText("Beginner-friendly scientific orientation"),
    ).toBeDefined();
  });

  it("summarizes the student’s material family, target, phenomenon, and scale", () => {
    renderMaterialsResults();
    const overview = screen
      .getByRole("heading", {
        name: "A clear map of what you want to investigate",
      })
      .closest("section");

    expect(overview).not.toBeNull();
    const scopedOverview = within(overview as HTMLElement);
    expect(
      scopedOverview.getByText("Crystals and ordered solids"),
    ).toBeDefined();
    expect(
      scopedOverview.getByText("Predict a property or behavior"),
    ).toBeDefined();
    expect(
      scopedOverview.getByText(
        "Light and optical response · Electrons and electrical behavior",
      ),
    ).toBeDefined();
    expect(
      scopedOverview.getByText("Interfaces, devices, and operating conditions"),
    ).toBeDefined();
  });
});
