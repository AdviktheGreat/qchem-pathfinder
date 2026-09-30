// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PathfinderHub } from "@/components/PathfinderHub";

afterEach(cleanup);

describe("PathfinderHub", () => {
  it("introduces the collection and links to quantum chemistry", () => {
    render(<PathfinderHub />);

    expect(
      screen.getByRole("heading", {
        name: "Start broad. Find a direction worth reading.",
      }),
    ).toBeDefined();
    expect(
      screen
        .getByRole("link", { name: /Open Quantum chemistry/ })
        .getAttribute("href"),
    ).toBe("/pathfinders/quantum-chemistry");
  });
});
