// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { PathfinderHub } from "@/components/PathfinderHub";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it("exposes clear hub landmarks, destinations, and roadmap states", () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  render(<PathfinderHub />);

  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(
    screen.getByRole("navigation", { name: "Hub sections" }),
  ).toBeDefined();
  expect(
    screen
      .getByRole("link", { name: "Skip to pathfinders" })
      .getAttribute("href"),
  ).toBe("#hub-main");
  expect(screen.getByRole("main").getAttribute("id")).toBe("hub-main");

  const available = screen.getByRole("article", {
    name: "Quantum Chemistry Pathfinder",
  });
  expect(available.querySelector("a")?.getAttribute("href")).toBe(
    "/pathfinders/quantum-chemistry",
  );
  expect(
    screen.getByRole("article", {
      name: "Computational Materials Pathfinder",
    }),
  ).toBeDefined();
  expect(
    screen
      .getByRole("link", { name: /Open computational materials/i })
      .getAttribute("href"),
  ).toBe("/pathfinders/computational-materials");
  expect(
    screen.getByRole("article", {
      name: "Computational Biology Pathfinder",
    }),
  ).toBeDefined();
  expect(
    screen
      .getByRole("link", { name: /Open computational biology/i })
      .getAttribute("href"),
  ).toBe("/pathfinders/computational-biology");
  expect(screen.getAllByText("Coming later")).toHaveLength(1);
  expect(
    screen.getByRole("article", {
      name: "Computational Physics Pathfinder",
    }),
  ).toBeDefined();
});
