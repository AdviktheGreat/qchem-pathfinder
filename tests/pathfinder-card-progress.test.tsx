// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { PathfinderCard } from "@/components/PathfinderCard";
import { pathfinders } from "@/data/pathfinders";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it("shows saved quantum chemistry progress on the hub card", async () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(
    JSON.stringify({
      version: 1,
      savedAt: "2026-09-29T18:00:00.000Z",
      screen: "survey",
      currentQuestionId: "phase-one-memory",
      answers: { "phase-one-memory": ["fresh"] },
    }),
  );

  render(<PathfinderCard pathfinder={pathfinders[0]} />);

  expect(await screen.findByText("Exploration in progress")).toBeDefined();
  expect(screen.getByText("1 of 16 questions answered")).toBeDefined();
  expect(
    screen.getByRole("link", { name: /Continue quantum chemistry/ }),
  ).toBeDefined();
});
