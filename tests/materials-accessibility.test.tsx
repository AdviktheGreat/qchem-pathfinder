// @vitest-environment jsdom

import { readFileSync } from "node:fs";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PathfinderApp } from "@/components/PathfinderApp";
import { ResultsScreen } from "@/components/ResultsScreen";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { materialsStudentProfiles } from "./fixtures/materials-student-profiles";

beforeEach(() => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("computational materials accessibility", () => {
  it("provides landmarks, a working skip link, and labeled navigation", async () => {
    render(<PathfinderApp definition={computationalMaterialsPathfinder} />);

    const skip = await screen.findByRole("link", {
      name: "Skip to main content",
    });
    fireEvent.click(skip);
    expect(document.activeElement).toBe(screen.getByRole("main"));
    expect(
      screen.getByRole("navigation", { name: "Switch pathfinder" }),
    ).toBeDefined();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("supports roving keyboard selection and announces survey progress", async () => {
    render(<PathfinderApp definition={computationalMaterialsPathfinder} />);
    fireEvent.click(
      await screen.findByRole("button", { name: "Begin exploring" }),
    );

    expect(document.activeElement?.id).toBe("question-title");
    const radios = screen.getAllByRole("radio");
    expect(radios.filter((radio) => radio.tabIndex === 0)).toHaveLength(1);
    fireEvent.keyDown(radios[0], { key: "ArrowRight" });
    expect(document.activeElement).toBe(radios[1]);
    expect(radios[1].getAttribute("aria-checked")).toBe("true");

    const progress = screen.getByRole("progressbar", {
      name: "Survey progress",
    });
    expect(progress.getAttribute("aria-valuetext")).toMatch(
      /^Question 1 of \d+$/,
    );
  });

  it("supports arrow-key navigation through materials search tabs", () => {
    render(
      <ResultsScreen
        definition={computationalMaterialsPathfinder}
        answers={materialsStudentProfiles[0].answers}
        onExploreNearby={vi.fn()}
        onReview={vi.fn()}
        onRestart={vi.fn()}
      />,
    );
    const tablist = screen.getAllByRole("tablist")[0];
    const orientation = within(tablist).getByRole("tab", {
      name: "Orientation",
    });
    const focused = within(tablist).getByRole("tab", { name: "Focused" });

    orientation.focus();
    fireEvent.keyDown(orientation, { key: "ArrowRight" });
    expect(document.activeElement).toBe(focused);
    expect(focused.getAttribute("aria-selected")).toBe("true");
    expect(
      document.getElementById(focused.getAttribute("aria-controls") ?? ""),
    ).not.toBeNull();
  });

  it("defines visible focus, reduced-motion, higher-contrast, and forced-color fallbacks", () => {
    const css = readFileSync("app/globals.css", "utf8");

    expect(css).toContain(":focus-visible");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain("animation-duration: 0.01ms !important");
    expect(css).toContain("@media (prefers-contrast: more)");
    expect(css).toContain("@media (forced-colors: active)");
  });
});
