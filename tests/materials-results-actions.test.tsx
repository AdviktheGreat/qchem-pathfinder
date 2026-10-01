// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ResultsScreen } from "@/components/ResultsScreen";
import { ReviewScreen } from "@/components/ReviewScreen";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";

const answers = {
  "materials-starting-point": ["recognize"],
  "materials-motivation": ["energy-conversion"],
  "materials-question-kind": ["predict"],
  "materials-family": ["crystalline"],
  "materials-phenomena": ["optical", "electrons"],
  "materials-scale": ["device"],
  "materials-energy-direction": ["photovoltaics"],
};

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("computational materials results actions", () => {
  it("supports nearby exploration, review, and restart actions", () => {
    const onExploreNearby = vi.fn();
    const onReview = vi.fn();
    const onRestart = vi.fn();
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    render(
      <ResultsScreen
        definition={computationalMaterialsPathfinder}
        answers={answers}
        onExploreNearby={onExploreNearby}
        onReview={onReview}
        onRestart={onRestart}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Explore a nearby materials path" }),
    );
    expect(
      screen.getByRole("heading", {
        name: "Two nearby directions worth comparing",
      }),
    ).toBe(document.activeElement);

    fireEvent.click(
      screen.getByRole("button", { name: "Review my materials answers" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Restart materials pathfinder" }),
    );
    expect(onReview).toHaveBeenCalledOnce();
    expect(onRestart).toHaveBeenCalledOnce();

    fireEvent.click(
      screen.getAllByRole("button", {
        name: /explore .* as my primary direction/i,
      })[0],
    );
    expect(onExploreNearby).toHaveBeenCalledWith(expect.any(String));
  });

  it("can return from a chosen direction to the original suggestion", () => {
    const onExploreNearby = vi.fn();
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    render(
      <ResultsScreen
        definition={computationalMaterialsPathfinder}
        answers={answers}
        primaryOverride="thermoelectric-materials"
        onExploreNearby={onExploreNearby}
        onReview={vi.fn()}
        onRestart={vi.fn()}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Return to my original materials suggestion",
      }),
    );
    expect(onExploreNearby).toHaveBeenCalledWith(undefined);
  });

  it("returns from answer review to results", () => {
    const onBack = vi.fn();
    render(
      <ReviewScreen
        survey={computationalMaterialsPathfinder.survey}
        answers={answers}
        onEdit={vi.fn()}
        onBack={onBack}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Back to results" }));
    expect(onBack).toHaveBeenCalledOnce();
  });

  it("connects tabs and expandable controls to labeled panels", () => {
    render(
      <ResultsScreen
        definition={computationalMaterialsPathfinder}
        answers={answers}
        onExploreNearby={vi.fn()}
        onReview={vi.fn()}
        onRestart={vi.fn()}
      />,
    );

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const selectedTab = screen.getByRole("tab", { name: "Orientation" });
    expect(selectedTab.getAttribute("aria-selected")).toBe("true");
    expect(
      document.getElementById(selectedTab.getAttribute("aria-controls") ?? ""),
    ).not.toBeNull();

    const expand = screen.getAllByRole("button", {
      name: /see questions, methods, and searches for/i,
    })[0];
    const panel = document.getElementById(
      expand.getAttribute("aria-controls") ?? "",
    );
    expect(panel).not.toBeNull();
    expect(expand.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(expand);
    expect(expand.getAttribute("aria-expanded")).toBe("true");
    expect(panel?.classList.contains("print-only")).toBe(false);

    for (const link of screen.getAllByRole("link", {
      name: /opens in a new tab/i,
    })) {
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toContain("noreferrer");
    }
  });
});
