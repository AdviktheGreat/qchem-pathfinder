// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { PathfinderApp } from "@/components/PathfinderApp";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it("provides a persistent route from quantum chemistry back to the hub", async () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});

  render(<PathfinderApp />);

  const hubLink = await screen.findByRole("link", {
    name: "Back to all pathfinders",
  });
  expect(hubLink.getAttribute("href")).toBe("/");
  expect(
    screen.getByRole("link", { name: "All pathfinders" }).getAttribute("href"),
  ).toBe("/");
});
