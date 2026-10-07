// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PathfinderHub } from "@/components/PathfinderHub";

afterEach(cleanup);

describe("PathfinderHub", () => {
  it("introduces the collection and links to all available pathfinders", () => {
    render(<PathfinderHub />);

    expect(
      screen.getByRole("heading", {
        name: "Start broad. Find a direction worth reading.",
      }),
    ).toBeDefined();
    expect(
      screen
        .getByRole("link", { name: /quantum chemistry/i })
        .getAttribute("href"),
    ).toBe("/pathfinders/quantum-chemistry");
    expect(
      screen
        .getByRole("link", { name: /Open computational materials/i })
        .getAttribute("href"),
    ).toBe("/pathfinders/computational-materials");
    expect(
      screen
        .getByRole("link", { name: /Open computational biology/i })
        .getAttribute("href"),
    ).toBe("/pathfinders/computational-biology");
    expect(
      screen
        .getByRole("link", { name: /Open computational physics/i })
        .getAttribute("href"),
    ).toBe("/pathfinders/computational-physics");
    expect(screen.queryByText("Coming later")).toBeNull();
    expect(screen.queryByText("Collection roadmap")).toBeNull();
  });
});
