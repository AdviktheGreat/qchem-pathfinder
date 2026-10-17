// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PathfinderHub } from "@/components/PathfinderHub";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  vi.restoreAllMocks();
});

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
      screen.getByText("Molecules, electrons, bonds, and reactions"),
    ).toBeDefined();
    expect(
      screen.getByText("How physical systems evolve under governing laws"),
    ).toBeDefined();
    expect(screen.getAllByText("Research-map outcome")).toHaveLength(4);
    expect(
      screen.getByRole("button", { name: "Help me choose" }),
    ).toBeDefined();
    expect(screen.getByText("Not started")).toBeDefined();
  });

  it("explains the optional guide before asking questions", async () => {
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
      await screen.findByText("Ready to save on this device"),
    ).toBeDefined();
    expect(
      screen.getByRole("link", { name: /Browse all pathfinders instead/i }),
    ).toBeDefined();
  });

  it("keeps working while clearly reporting blocked local storage", async () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    render(<PathfinderHub />);
    fireEvent.click(screen.getByRole("button", { name: "Help me choose" }));
    fireEvent.click(screen.getByRole("button", { name: "Start the guide" }));
    fireEvent.click(
      screen.getByRole("radio", { name: /How new materials gain/i }),
    );

    expect(
      await screen.findByText(
        "Saving unavailable — progress lasts for this visit",
      ),
    ).toBeDefined();
    expect(screen.getByRole("button", { name: "Continue" })).toBeDefined();
  });

  it("starts with an accessible broad-curiosity question", async () => {
    render(<PathfinderHub />);
    fireEvent.click(screen.getByRole("button", { name: "Help me choose" }));
    fireEvent.click(screen.getByRole("button", { name: "Start the guide" }));

    expect(
      screen
        .getByRole("region", { name: "Pathfinder guide" })
        .classList.contains("is-question"),
    ).toBe(true);

    const heading = screen.getByRole("heading", {
      name: "Which scientific neighborhood would you most like to peek into?",
    });
    expect(heading).toBeDefined();
    await waitFor(() => expect(document.activeElement).toBe(heading));
    expect(screen.getAllByRole("radio")).toHaveLength(9);
  });

  it("moves from broad curiosity to a preferred research system", () => {
    render(<PathfinderHub />);
    fireEvent.click(screen.getByRole("button", { name: "Help me choose" }));
    fireEvent.click(screen.getByRole("button", { name: "Start the guide" }));
    fireEvent.click(
      screen.getByRole("radio", { name: /How new materials gain/i }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(
      screen.getByRole("heading", {
        name: "Which kind of system would you most enjoy zooming in on?",
      }),
    ).toBeDefined();
    expect(screen.getAllByRole("radio")).toHaveLength(9);
  });

  it("continues from systems to a preferred research question", () => {
    render(<PathfinderHub />);
    fireEvent.click(screen.getByRole("button", { name: "Help me choose" }));
    fireEvent.click(screen.getByRole("button", { name: "Start the guide" }));
    fireEvent.click(
      screen.getByRole("radio", { name: /How living systems store/i }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.click(
      screen.getByRole("radio", { name: /Genes and populations/i }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(
      screen.getByRole("heading", {
        name: "Which kind of research question sounds most satisfying?",
      }),
    ).toBeDefined();
  });

  it("keeps an earlier selection available when moving back", () => {
    render(<PathfinderHub />);
    fireEvent.click(screen.getByRole("button", { name: "Help me choose" }));
    fireEvent.click(screen.getByRole("button", { name: "Start the guide" }));
    fireEvent.click(
      screen.getByRole("radio", { name: /How better computation/i }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.click(screen.getByRole("button", { name: "Back" }));

    expect(
      (
        screen.getByRole("radio", {
          name: /How better computation/i,
        }) as HTMLInputElement
      ).checked,
    ).toBe(true);
  });

  it("turns a complete biological path into a transparent starting suggestion", () => {
    render(<PathfinderHub />);
    fireEvent.click(screen.getByRole("button", { name: "Help me choose" }));
    fireEvent.click(screen.getByRole("button", { name: "Start the guide" }));

    for (const answer of [
      /How living systems store/i,
      /Genes and populations/i,
      /Find patterns hidden in data/i,
      /^Data and statistics/i,
      /concrete real-world goal/i,
      /Biological function and variation/i,
    ]) {
      fireEvent.click(screen.getByRole("radio", { name: answer }));
      fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    }

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Computational Biology Pathfinder",
      }),
    ).toBeDefined();
    expect(
      screen.getByRole("heading", {
        name: "Why it connects with your choices",
      }),
    ).toBeDefined();
    expect(screen.getByRole("heading", { name: "Interest fit" })).toBeDefined();
    expect(
      screen.getByRole("heading", { name: "Research-style fit" }),
    ).toBeDefined();
    expect(
      screen.getByRole("heading", { name: "Areas still open" }),
    ).toBeDefined();
    expect(
      screen.getByRole("heading", {
        name: "A starting point is not a closed door.",
      }),
    ).toBeDefined();
    expect(
      screen.getByText(/not copied into either subject survey/i),
    ).toBeDefined();
    expect(screen.getByText("Nearby alternative")).toBeDefined();
    expect(screen.getByText("How it differs")).toBeDefined();
    const comparison = screen
      .getByRole("heading", {
        name: "Compare the two starting points.",
      })
      .closest("section")!;
    expect(within(comparison).getAllByText("Typical questions")).toHaveLength(
      2,
    );
    expect(within(comparison).getAllByText("Pathfinder outcome")).toHaveLength(
      2,
    );
    expect(
      screen.getByRole("heading", { name: "Your next three moves." }),
    ).toBeDefined();
    expect(screen.getByText("Complete the deeper pathfinder")).toBeDefined();
    expect(
      screen
        .getByRole("link", { name: "Open Computational biology" })
        .getAttribute("href"),
    ).toBe("/pathfinders/computational-biology");
    expect(
      screen.getByRole("button", { name: /Review my choices/i }),
    ).toBeDefined();
    expect(
      screen.getByRole("link", { name: "Browse all four pathfinders" }),
    ).toBeDefined();
  });

  it("keeps every path open after an all-uncertain journey", () => {
    render(<PathfinderHub />);
    fireEvent.click(screen.getByRole("button", { name: "Help me choose" }));
    fireEvent.click(screen.getByRole("button", { name: "Start the guide" }));

    for (let step = 0; step < 5; step += 1) {
      fireEvent.click(
        screen.getByRole("radio", { name: /^I’m not sure yet/i }),
      );
      fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    }

    expect(
      screen.getByRole("heading", { name: "Several paths are still open." }),
    ).toBeDefined();
    expect(
      screen.getByRole("link", { name: "Browse all pathfinders" }),
    ).toBeDefined();
    const choicesSummary = screen.getByText(
      "Review the choices behind this map",
    );
    fireEvent.click(choicesSummary);
    expect(screen.getAllByText("I’m not sure yet")).toHaveLength(5);
    expect(screen.getAllByText("Kept open")).toHaveLength(5);
    expect(
      screen.getByRole("button", { name: "Copy workshop map" }),
    ).toBeDefined();
  });

  it("copies a portable orientation workshop map", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    try {
      render(<PathfinderHub />);
      fireEvent.click(screen.getByRole("button", { name: "Help me choose" }));
      fireEvent.click(screen.getByRole("button", { name: "Start the guide" }));

      for (let step = 0; step < 5; step += 1) {
        fireEvent.click(
          screen.getByRole("radio", { name: /^I’m not sure yet/i }),
        );
        fireEvent.click(screen.getByRole("button", { name: "Continue" }));
      }

      fireEvent.click(
        screen.getByRole("button", { name: "Copy workshop map" }),
      );
      await screen.findByRole("button", { name: "Copied" });
      expect(writeText).toHaveBeenCalledWith(
        expect.stringContaining("RESEARCH PATHFINDER WORKSHOP MAP"),
      );
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("downloads a dated orientation workshop map", async () => {
    const createObjectURL = vi.fn().mockReturnValue("blob:workshop-map");
    const revokeObjectURL = vi.fn();
    vi.stubGlobal("URL", { createObjectURL, revokeObjectURL });
    let filename = "";
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(function (this: HTMLAnchorElement) {
        filename = this.download;
      });
    try {
      window.localStorage.setItem(
        "research-pathfinder:hub-orientation",
        JSON.stringify({
          version: 1,
          screen: "results",
          savedAt: "2026-10-17T18:00:00.000Z",
          answers: {
            "broad-curiosity": "not-sure-yet",
            "preferred-system": "not-sure-yet",
            "question-style": "not-sure-yet",
            "working-style": "not-sure-yet",
            "application-balance": "not-sure-yet",
          },
        }),
      );

      render(<PathfinderHub />);
      fireEvent.click(
        await screen.findByRole("button", { name: /View my suggestions/i }),
      );
      fireEvent.click(
        screen.getByRole("button", { name: "Download workshop map" }),
      );

      expect(filename).toMatch(
        /^research-pathfinder-workshop-map-\d{4}-\d{2}-\d{2}\.txt$/,
      );
      expect(createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(revokeObjectURL).toHaveBeenCalledWith("blob:workshop-map");
    } finally {
      click.mockRestore();
      vi.unstubAllGlobals();
    }
  });

  it("prints the orientation starting map", async () => {
    const print = vi.spyOn(window, "print").mockImplementation(() => undefined);
    window.localStorage.setItem(
      "research-pathfinder:hub-orientation",
      JSON.stringify({
        version: 1,
        screen: "results",
        savedAt: "2026-10-17T18:00:00.000Z",
        answers: {
          "broad-curiosity": "not-sure-yet",
          "preferred-system": "not-sure-yet",
          "question-style": "not-sure-yet",
          "working-style": "not-sure-yet",
          "application-balance": "not-sure-yet",
        },
      }),
    );

    render(<PathfinderHub />);
    fireEvent.click(
      await screen.findByRole("button", { name: /View my suggestions/i }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Print starting map" }));

    expect(print).toHaveBeenCalledOnce();
  });

  it("resumes saved orientation progress", async () => {
    window.localStorage.setItem(
      "research-pathfinder:hub-orientation",
      JSON.stringify({
        version: 1,
        screen: "question",
        savedAt: "2026-10-13T18:00:00.000Z",
        currentQuestionId: "preferred-system",
        answers: { "broad-curiosity": "living-systems" },
      }),
    );

    render(<PathfinderHub />);
    const continueButton = await screen.findByRole("button", {
      name: /Continue choosing/i,
    });
    fireEvent.click(continueButton);

    expect(
      screen.getByRole("heading", {
        name: "Which kind of system would you most enjoy zooming in on?",
      }),
    ).toBeDefined();
  });

  it("marks a completed guide as suggestions ready", async () => {
    window.localStorage.setItem(
      "research-pathfinder:hub-orientation",
      JSON.stringify({
        version: 1,
        screen: "results",
        savedAt: "2026-10-13T18:00:00.000Z",
        answers: {
          "broad-curiosity": "not-sure-yet",
          "preferred-system": "not-sure-yet",
          "question-style": "not-sure-yet",
          "working-style": "not-sure-yet",
          "application-balance": "not-sure-yet",
        },
      }),
    );

    render(<PathfinderHub />);

    expect(await screen.findByText("Suggestions ready")).toBeDefined();
    expect(
      screen.getByRole("button", { name: /View my suggestions/i }),
    ).toBeDefined();
  });

  it("reflects orientation progress saved in another tab", async () => {
    render(<PathfinderHub />);
    await screen.findByText("Not started");

    fireEvent(
      window,
      new StorageEvent("storage", {
        key: "research-pathfinder:hub-orientation",
        newValue: JSON.stringify({
          version: 1,
          screen: "results",
          savedAt: "2026-10-17T18:00:00.000Z",
          answers: {
            "broad-curiosity": "not-sure-yet",
            "preferred-system": "not-sure-yet",
            "question-style": "not-sure-yet",
            "working-style": "not-sure-yet",
            "application-balance": "not-sure-yet",
          },
        }),
      }),
    );

    expect(await screen.findByText("Suggestions ready")).toBeDefined();
    expect(
      screen.getByRole("button", { name: "View my suggestions" }),
    ).toBeDefined();
  });

  it("moves an open guide to the question saved in another tab", async () => {
    render(<PathfinderHub />);
    fireEvent.click(screen.getByRole("button", { name: "Help me choose" }));
    await screen.findByText("Ready to save on this device");

    fireEvent(
      window,
      new StorageEvent("storage", {
        key: "research-pathfinder:hub-orientation",
        newValue: JSON.stringify({
          version: 1,
          screen: "question",
          savedAt: "2026-10-17T18:00:00.000Z",
          currentQuestionId: "preferred-system",
          answers: { "broad-curiosity": "living-systems" },
        }),
      }),
    );

    expect(
      await screen.findByRole("heading", {
        name: "Which kind of system would you most enjoy zooming in on?",
      }),
    ).toBeDefined();
  });

  it("restarts only the hub guide and preserves subject progress", async () => {
    const subjectKey = quantumChemistryPathfinder.storage.key;
    window.localStorage.setItem(subjectKey, "subject-progress");
    vi.spyOn(window, "confirm").mockReturnValue(true);

    render(<PathfinderHub />);
    fireEvent.click(screen.getByRole("button", { name: "Help me choose" }));
    fireEvent.click(screen.getByRole("button", { name: "Start the guide" }));
    fireEvent.click(
      screen.getByRole("radio", { name: /How new materials gain/i }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Restart guide" }));

    expect(window.confirm).toHaveBeenCalledWith(
      expect.stringContaining("progress inside every subject pathfinder"),
    );
    expect(window.localStorage.getItem(subjectKey)).toBe("subject-progress");
    expect(
      await screen.findByRole("heading", {
        name: "Let’s find a useful place to start.",
      }),
    ).toBeDefined();
  });

  it("returns focus to the guide entry after closing", async () => {
    render(<PathfinderHub />);
    const entryButton = screen.getByRole("button", { name: "Help me choose" });
    fireEvent.click(entryButton);
    fireEvent.click(
      screen.getByRole("button", { name: "Close pathfinder guide" }),
    );

    await waitFor(() =>
      expect(document.activeElement).toBe(
        screen.getByRole("button", { name: "Help me choose" }),
      ),
    );
  });

  it("returns the viewport to the guide when reviewing results", async () => {
    const scrollIntoView = vi.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: scrollIntoView,
    });
    window.localStorage.setItem(
      "research-pathfinder:hub-orientation",
      JSON.stringify({
        version: 1,
        screen: "results",
        savedAt: "2026-10-13T20:00:00.000Z",
        answers: {
          "broad-curiosity": "not-sure-yet",
          "preferred-system": "not-sure-yet",
          "question-style": "not-sure-yet",
          "working-style": "not-sure-yet",
          "application-balance": "not-sure-yet",
        },
      }),
    );

    render(<PathfinderHub />);
    fireEvent.click(
      await screen.findByRole("button", { name: /View my suggestions/i }),
    );
    fireEvent.click(screen.getByRole("button", { name: /Review my choices/i }));

    expect(scrollIntoView).toHaveBeenCalledWith({ block: "start" });
    expect(
      screen.getByRole("heading", {
        name: "Which scientific neighborhood would you most like to peek into?",
      }),
    ).toBeDefined();
  });
});
