// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { SurveyScreen } from "@/components/SurveyScreen";

afterEach(cleanup);
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
