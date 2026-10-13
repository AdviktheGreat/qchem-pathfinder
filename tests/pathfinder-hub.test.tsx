// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
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
    expect(
      screen.getByRole("button", { name: "Help me choose" }),
    ).toBeDefined();
  });

  it("explains the optional guide before asking questions", () => {
    render(<PathfinderHub />);
    fireEvent.click(screen.getByRole("button", { name: "Help me choose" }));

    expect(
      screen.getByRole("heading", {
        name: "Let’s find a useful place to start.",
      }),
    ).toBeDefined();
    expect(screen.getByText("About 2–4 minutes")).toBeDefined();
    expect(screen.getByText("No scores or wrong answers")).toBeDefined();
    expect(
      screen.getByRole("link", { name: /Browse all pathfinders instead/i }),
    ).toBeDefined();
  });

  it("starts with an accessible broad-curiosity question", () => {
    render(<PathfinderHub />);
    fireEvent.click(screen.getByRole("button", { name: "Help me choose" }));
    fireEvent.click(screen.getByRole("button", { name: "Start the guide" }));

    expect(
      screen.getByRole("heading", {
        name: "Which scientific neighborhood would you most like to peek into?",
      }),
    ).toBeDefined();
    expect(screen.getAllByRole("radio")).toHaveLength(8);
  });
});
