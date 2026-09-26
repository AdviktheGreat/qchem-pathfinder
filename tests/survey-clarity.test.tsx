// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { SurveyScreen } from "@/components/SurveyScreen";

afterEach(cleanup);
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
