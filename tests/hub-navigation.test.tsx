// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { PathfinderApp } from "@/components/PathfinderApp";
import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { computationalPhysicsPathfinder } from "@/data/pathfinders/computational-physics";

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

it("switches between available pathfinders without clearing progress", async () => {
  const removeItem = vi
    .spyOn(Storage.prototype, "removeItem")
    .mockImplementation(() => {});
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});

  const { unmount } = render(<PathfinderApp />);

  expect(
    (
      await screen.findByRole("link", { name: "Computational materials" })
    ).getAttribute("href"),
  ).toBe("/pathfinders/computational-materials");
  expect(
    screen
      .getByRole("link", { name: "Computational biology" })
      .getAttribute("href"),
  ).toBe("/pathfinders/computational-biology");
  expect(
    screen
      .getByRole("link", { name: "Computational physics" })
      .getAttribute("href"),
  ).toBe("/pathfinders/computational-physics");
  expect(removeItem).not.toHaveBeenCalled();

  unmount();
  render(<PathfinderApp definition={computationalMaterialsPathfinder} />);

  expect(
    (
      await screen.findByRole("link", { name: "Quantum chemistry" })
    ).getAttribute("href"),
  ).toBe("/pathfinders/quantum-chemistry");
  expect(
    screen
      .getByRole("link", { name: "Computational biology" })
      .getAttribute("href"),
  ).toBe("/pathfinders/computational-biology");
  expect(removeItem).not.toHaveBeenCalled();

  cleanup();
  render(<PathfinderApp definition={computationalBiologyPathfinder} />);

  expect(
    (
      await screen.findByRole("link", { name: "Quantum chemistry" })
    ).getAttribute("href"),
  ).toBe("/pathfinders/quantum-chemistry");
  expect(
    screen
      .getByRole("link", { name: "Computational materials" })
      .getAttribute("href"),
  ).toBe("/pathfinders/computational-materials");
  expect(
    screen.getByRole("navigation", { name: "Switch pathfinder" }),
  ).toBeDefined();
  expect(removeItem).not.toHaveBeenCalled();

  cleanup();
  render(<PathfinderApp definition={computationalPhysicsPathfinder} />);

  expect(
    (
      await screen.findByRole("link", { name: "Quantum chemistry" })
    ).getAttribute("href"),
  ).toBe("/pathfinders/quantum-chemistry");
  expect(
    screen
      .getByRole("link", { name: "Computational biology" })
      .getAttribute("href"),
  ).toBe("/pathfinders/computational-biology");
  expect(removeItem).not.toHaveBeenCalled();
});
