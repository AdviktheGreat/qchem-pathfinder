// @vitest-environment jsdom

import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SurveyScreen } from "@/components/SurveyScreen";

afterEach(cleanup);

describe("survey keyboard shortcuts", () => {
  it("handles only single-letter option shortcuts", () => {
    const onAnswer = vi.fn();

    render(
      <SurveyScreen
        answers={{ "concept-familiarity": ["orbitals"] }}
        currentQuestionId="concept-familiarity"
        onAnswer={onAnswer}
        onQuestionChange={vi.fn()}
        onComplete={vi.fn()}
      />,
    );

    fireEvent.keyDown(window, { key: "Enter" });
    fireEvent.keyDown(window, { key: "ArrowRight" });

    expect(onAnswer).not.toHaveBeenCalled();

    fireEvent.keyDown(window, { key: "E" });

    expect(onAnswer).toHaveBeenCalledWith("concept-familiarity", [
      "orbitals",
      "methods",
    ]);
  });
});
