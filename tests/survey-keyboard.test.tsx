// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useState } from "react";
import type { AnswerMap } from "@/lib/types";
import { SurveyScreen } from "@/components/SurveyScreen";

afterEach(cleanup);

describe("survey keyboard shortcuts", () => {
  it("uses one radio tab stop and wraps arrow-key selection", () => {
    function Survey() {
      const [answers, setAnswers] = useState<AnswerMap>({});
      return (
        <SurveyScreen
          answers={answers}
          currentQuestionId="phase-one-memory"
          onAnswer={(id, values) => setAnswers({ [id]: values })}
          onQuestionChange={vi.fn()}
          onComplete={vi.fn()}
        />
      );
    }
    render(<Survey />);
    const radios = screen.getAllByRole("radio");
    expect(radios.filter((radio) => radio.tabIndex === 0)).toHaveLength(1);
    fireEvent.keyDown(radios[0], { key: "ArrowLeft" });
    expect(document.activeElement).toBe(radios[3]);
    expect(radios[3].getAttribute("aria-checked")).toBe("true");
    fireEvent.keyDown(radios[3], { key: "ArrowRight" });
    expect(document.activeElement).toBe(radios[0]);
    expect(radios.filter((radio) => radio.tabIndex === 0)).toHaveLength(1);
  });

  it("does not select an answer with letters when shortcuts are disabled", () => {
    const onAnswer = vi.fn();
    render(
      <SurveyScreen
        answers={{}}
        currentQuestionId="phase-one-memory"
        onAnswer={onAnswer}
        onQuestionChange={vi.fn()}
        onComplete={vi.fn()}
      />,
    );
    fireEvent.keyDown(window, { key: "a" });
    expect(onAnswer).not.toHaveBeenCalled();
  });
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
