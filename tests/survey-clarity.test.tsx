// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { questionById } from "@/data/questions";
import { afterEach, expect, it, vi } from "vitest";
import { SurveyScreen } from "@/components/SurveyScreen";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";

afterEach(cleanup);
it("defines DFT where students first encounter it", () => {
  render(
    <SurveyScreen
      {...handlers}
      answers={{}}
      currentQuestionId="concept-familiarity"
    />,
  );
  fireEvent.click(screen.getByText("About dft"));
  expect(
    screen.getByText(/Density functional theory:/).closest("details")?.open,
  ).toBe(true);
});
it("starts each question definition closed rather than reusing another disclosure", () => {
  const first = questionById["phase-one-memory"];
  const original = first.definition;
  first.definition = {
    term: "Test context",
    text: "A separate question definition",
  };
  try {
    const view = render(
      <SurveyScreen {...handlers} answers={{}} currentQuestionId={first.id} />,
    );
    fireEvent.click(screen.getByText("About test context"));
    const old = screen.getByText("About test context").closest("details")!;
    expect(old.open).toBe(true);
    view.rerender(
      <SurveyScreen
        {...handlers}
        answers={{}}
        currentQuestionId="electronic-state"
      />,
    );
    const next = screen
      .getByText("About electronic states")
      .closest("details")!;
    expect(next).not.toBe(old);
    expect(next.open).toBe(false);
  } finally {
    first.definition = original;
  }
});
it("gives keyboard guidance appropriate to the choice type", () => {
  const view = render(
    <SurveyScreen
      {...handlers}
      answers={{}}
      currentQuestionId="phase-one-memory"
    />,
  );
  expect(
    screen.getByText("Tab to the choices; use arrow keys to select"),
  ).toBeDefined();
  view.rerender(
    <SurveyScreen
      {...handlers}
      answers={{}}
      currentQuestionId="concept-familiarity"
    />,
  );
  expect(
    screen.getByText("Tab between choices; press Space to toggle"),
  ).toBeDefined();
});
it("explains the actual choice behind a narrowing question", () => {
  render(
    <SurveyScreen
      {...handlers}
      answers={{ motivation: ["energy"] }}
      currentQuestionId="energy-focus"
    />,
  );
  expect(screen.getByText(/You chose “Energy & sustainability”/)).toBeDefined();
});
it("renders a supplied pathfinder survey", () => {
  render(
    <SurveyScreen
      {...handlers}
      survey={{
        ...quantumChemistryPathfinder.survey,
        questions: [
          {
            id: "material-family",
            stage: "motivation",
            kicker: "Materials",
            title: "Which material family catches your attention?",
            type: "single",
            options: [{ id: "battery", label: "Battery materials" }],
          },
        ],
        branchQuestionId: "material-family",
      }}
      answers={{}}
      currentQuestionId="material-family"
    />,
  );

  expect(
    screen.getByRole("heading", {
      name: "Which material family catches your attention?",
    }),
  ).toBeDefined();
  expect(
    screen.getByRole("radio", { name: "Battery materials" }),
  ).toBeDefined();
});
const handlers = {
  onAnswer: vi.fn(),
  onQuestionChange: vi.fn(),
  onComplete: vi.fn(),
};

it("explains how to enable Continue and removes the prompt after an answer", () => {
  const view = render(
    <SurveyScreen
      {...handlers}
      answers={{}}
      currentQuestionId="phase-one-memory"
    />,
  );
  expect(screen.getByText(/Choose an answer—or/)).toBeDefined();
  expect(
    screen
      .getByRole("button", { name: "Continue" })
      .getAttribute("aria-describedby"),
  ).toBe("selection-guidance");
  view.rerender(
    <SurveyScreen
      {...handlers}
      answers={{ "phase-one-memory": ["unsure"] }}
      currentQuestionId="phase-one-memory"
    />,
  );
  expect(screen.queryByText(/Choose an answer—or/)).toBeNull();
  expect(
    (screen.getByRole("button", { name: "Continue" }) as HTMLButtonElement)
      .disabled,
  ).toBe(false);
});
