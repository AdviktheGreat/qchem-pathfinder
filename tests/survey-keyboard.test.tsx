// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SurveyScreen } from "@/components/SurveyScreen";

afterEach(cleanup);

describe("survey keyboard shortcuts", () => {
  it("handles only single-letter option shortcuts", () => {
    const onAnswer = vi.fn();

    render(
      <SurveyScreen
        shortcutsEnabled
        answers={{ "concept-familiarity": ["orbitals"] }}
        currentQuestionId="concept-familiarity"
        onAnswer={onAnswer}
        onQuestionChange={vi.fn()}
        onComplete={vi.fn()}
      />,
    );

    fireEvent.keyDown(window, { key: "Enter" });
    fireEvent.keyDown(window, { key: "ArrowRight" });
    fireEvent.keyDown(window, { key: "a", repeat: true });
    fireEvent.keyDown(window, { key: "a", isComposing: true });

    expect(onAnswer).not.toHaveBeenCalled();

    fireEvent.keyDown(window, { key: "E" });

    expect(onAnswer).toHaveBeenCalledWith("concept-familiarity", [
      "orbitals",
      "methods",
    ]);
  });

  it("allows students to select all five familiar concepts", () => {
    const onAnswer = vi.fn();

    render(
      <SurveyScreen
        answers={{
          "concept-familiarity": ["orbitals", "energy", "bonding", "spectra"],
        }}
        currentQuestionId="concept-familiarity"
        onAnswer={onAnswer}
        onQuestionChange={vi.fn()}
        onComplete={vi.fn()}
      />,
    );

    fireEvent.click(
      screen.getByRole("checkbox", {
        name: /Computational methods such as DFT/,
      }),
    );

    expect(onAnswer).toHaveBeenCalledWith("concept-familiarity", [
      "orbitals",
      "energy",
      "bonding",
      "spectra",
      "methods",
    ]);
  });
});
