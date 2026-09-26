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
