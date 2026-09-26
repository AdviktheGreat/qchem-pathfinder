// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { PathfinderApp } from "@/components/PathfinderApp";

beforeEach(() => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it("skips the header and focuses the screen content", async () => {
  render(<PathfinderApp />);
  fireEvent.click(
    await screen.findByRole("link", { name: "Skip to main content" }),
  );
  const main = screen.getByRole("main");
  expect(document.activeElement).toBe(main);
  expect(
    main.contains(
      screen.getByRole("button", { name: "Quantum Research Pathfinder" }),
    ),
  ).toBe(false);
});

it("pauses and resumes without losing the current answer", async () => {
  render(<PathfinderApp />);
  fireEvent.click(
    await screen.findByRole("button", { name: "Begin exploring" }),
  );
  fireEvent.click(
    screen.getByRole("radio", { name: /The big picture feels fresh/ }),
  );
  fireEvent.click(
    screen.getByRole("button", { name: "Pause and return home" }),
  );
  fireEvent.click(screen.getByRole("button", { name: "Continue exploring" }));
  expect(
    screen
      .getByRole("radio", { name: /The big picture feels fresh/ })
      .getAttribute("aria-checked"),
  ).toBe("true");
});

it("moves focus to the appropriate heading when screens change", async () => {
  render(<PathfinderApp />);
  fireEvent.click(
    await screen.findByRole("button", { name: "Begin exploring" }),
  );
  expect(document.activeElement?.id).toBe("question-title");
  fireEvent.click(
    screen.getByRole("button", { name: "Quantum Research Pathfinder" }),
  );
  expect(document.activeElement?.id).toBe("intro-title");
});
