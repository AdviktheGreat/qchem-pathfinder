// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { RecentPathfinder } from "@/components/RecentPathfinder";
import { createHubState, HUB_STORAGE_KEY } from "@/lib/hub-persistence";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it("offers a direct return to the most recently explored biology pathfinder", async () => {
  const state = createHubState(
    "computational-biology",
    new Date("2026-10-03T18:00:00.000Z"),
  );
  vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) =>
    key === HUB_STORAGE_KEY ? JSON.stringify(state) : null,
  );

  render(<RecentPathfinder />);

  expect(await screen.findByText("Computational biology")).toBeDefined();
  expect(
    screen
      .getByRole("link", { name: "Return to this pathfinder" })
      .getAttribute("href"),
  ).toBe("/pathfinders/computational-biology");
});

it("does not show a return destination for invalid saved state", async () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue("not json");

  render(<RecentPathfinder />);

  await new Promise((resolve) => window.setTimeout(resolve, 0));
  expect(
    screen.queryByRole("complementary", {
      name: "Recently explored pathfinder",
    }),
  ).toBeNull();
});
