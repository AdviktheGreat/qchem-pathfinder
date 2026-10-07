// @vitest-environment jsdom

import { readFileSync } from "node:fs";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PathfinderApp } from "@/components/PathfinderApp";
import { ResultsScreen } from "@/components/ResultsScreen";
import { computationalPhysicsPathfinder } from "@/data/pathfinders/computational-physics";
import { createPathfinderPersistence } from "@/lib/persistence";
import { physicsStudentProfiles } from "./fixtures/physics-student-profiles";

const definition = computationalPhysicsPathfinder;
const persistence = createPathfinderPersistence(definition);
const orbitalAnswers = physicsStudentProfiles[0].answers;

function persisted(
  screenName: "intro" | "survey" | "results" | "review",
  answers = orbitalAnswers,
  currentQuestionId?: string,
) {
  return persistence.serializeProgress(
    persistence.createPersistedState({
      screen: screenName,
      answers,
      currentQuestionId,
    }),
  );
}

beforeEach(() => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("computational physics accessibility and progress", () => {
  it("provides landmarks, focus movement, and labeled navigation", async () => {
    render(<PathfinderApp definition={definition} />);

    const skip = await screen.findByRole("link", {
      name: "Skip to main content",
    });
    fireEvent.click(skip);
    expect(document.activeElement).toBe(screen.getByRole("main"));
    expect(
      screen.getByRole("navigation", { name: "Switch pathfinder" }),
    ).toBeDefined();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("supports keyboard navigation through physics search tabs", () => {
    render(
      <ResultsScreen
        definition={definition}
        answers={orbitalAnswers}
        onExploreNearby={vi.fn()}
        onReview={vi.fn()}
        onRestart={vi.fn()}
      />,
    );
    const tablist = screen.getAllByRole("tablist")[0];
    const orientation = within(tablist).getByRole("tab", {
      name: "Orientation",
    });
    const focused = within(tablist).getByRole("tab", { name: "Focused" });

    orientation.focus();
    fireEvent.keyDown(orientation, { key: "ArrowRight" });
    expect(document.activeElement).toBe(focused);
    expect(focused.getAttribute("aria-selected")).toBe("true");
  });

  it("removes an old physics branch when motivation changes", async () => {
    let saved = persisted("results");
    vi.mocked(Storage.prototype.getItem).mockImplementation(() => saved);
    vi.mocked(Storage.prototype.setItem).mockImplementation((_key, value) => {
      saved = value;
    });

    render(<PathfinderApp definition={definition} />);
    fireEvent.click(
      await screen.findByRole("button", { name: "Review my physics answers" }),
    );
    const motivation = definition.survey.questions.find(
      (question) => question.id === "physics-motivation",
    )!;
    fireEvent.click(
      screen.getByRole("button", { name: `Edit: ${motivation.title}` }),
    );
    fireEvent.click(
      screen.getByRole("radio", {
        name: /Quantum behavior, atoms, and light/,
      }),
    );

    await waitFor(() => {
      const answers = JSON.parse(saved).answers;
      expect(answers["physics-motivation"]).toEqual(["quantum-atoms"]);
      expect(answers["physics-astrophysics-focus"]).toBeUndefined();
      expect(answers["physics-astrophysics-evidence"]).toBeUndefined();
    });
    expect(screen.getByRole("note").textContent).toContain(
      "Only the new choice will influence your directions and profile",
    );
    expect(screen.getByRole("status").textContent).toContain(
      "Answer 2 new follow-up questions",
    );
  });

  it("restores the exact physics question after refresh", async () => {
    let saved = persisted(
      "survey",
      { "physics-starting-point": ["recognize"] },
      "physics-concept-familiarity",
    );
    vi.mocked(Storage.prototype.getItem).mockImplementation(() => saved);
    vi.mocked(Storage.prototype.setItem).mockImplementation((_key, value) => {
      saved = value;
    });

    const first = render(<PathfinderApp definition={definition} />);
    const question = definition.survey.questions.find(
      (candidate) => candidate.id === "physics-concept-familiarity",
    )!;
    expect(
      await screen.findByRole("heading", { name: question.title }),
    ).toBeDefined();

    first.unmount();
    render(<PathfinderApp definition={definition} />);
    expect(
      await screen.findByRole("heading", { name: question.title }),
    ).toBeDefined();
  });

  it("applies physics themes and system accessibility fallbacks", () => {
    const { container } = render(
      <ResultsScreen
        definition={definition}
        answers={orbitalAnswers}
        onExploreNearby={vi.fn()}
        onReview={vi.fn()}
        onRestart={vi.fn()}
      />,
    );
    const css = readFileSync("app/globals.css", "utf8");

    expect(
      container.querySelector(".primary-result.theme-cosmic"),
    ).not.toBeNull();
    expect(css).toContain(".primary-result.theme-plasma");
    expect(css).toContain(".primary-result.theme-quantum");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain("@media (forced-colors: active)");
  });
});
