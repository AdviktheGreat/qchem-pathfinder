// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PathfinderApp } from "@/components/PathfinderApp";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { getVisibleQuestions } from "@/lib/branching";
import type { AnswerMap } from "@/lib/types";

const questions = computationalMaterialsPathfinder.survey.questions;
let savedProgress: string | null;

function buildJourney(motivation: string): AnswerMap {
  const answers: AnswerMap = {};

  while (true) {
    const next = getVisibleQuestions(answers, questions).find(
      (question) => !answers[question.id]?.length,
    );
    if (!next) return answers;

    const option =
      next.id === "materials-motivation"
        ? next.options.find((candidate) => candidate.id === motivation)
        : next.options.find((candidate) => !candidate.uncertainty);
    if (!option) throw new Error(`No journey option for ${next.id}`);
    answers[next.id] = [option.id];
  }
}

beforeEach(() => {
  savedProgress = null;
  vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) =>
    key === computationalMaterialsPathfinder.storage.key ? savedProgress : null,
  );
  vi.spyOn(Storage.prototype, "setItem").mockImplementation((key, value) => {
    if (key === computationalMaterialsPathfinder.storage.key)
      savedProgress = value;
  });
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("complete computational materials journeys", () => {
  it.each([
    ["energy storage", "energy-storage"],
    ["electronics", "electronics"],
  ])("moves from the introduction to results for %s", async (_, motivation) => {
    const answers = buildJourney(motivation);
    const path = getVisibleQuestions(answers, questions);

    render(<PathfinderApp definition={computationalMaterialsPathfinder} />);

    expect(
      await screen.findByRole("heading", {
        name: computationalMaterialsPathfinder.intro.title,
      }),
    ).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "Begin exploring" }));

    for (const [index, question] of path.entries()) {
      expect(
        screen.getByRole("heading", { name: question.title }),
      ).toBeDefined();
      const option = question.options.find(
        (candidate) => candidate.id === answers[question.id][0],
      )!;
      const role = question.type === "single" ? "radio" : "checkbox";
      fireEvent.click(
        screen
          .getAllByRole(role)
          .find((choice) => choice.textContent?.includes(option.label))!,
      );
      fireEvent.click(
        screen.getByRole("button", {
          name: index === path.length - 1 ? "See my directions" : "Continue",
        }),
      );
    }

    expect(document.getElementById("primary-title")?.textContent).toBeTruthy();
    expect(document.querySelector("pre")?.textContent).toContain(
      "COMPUTATIONAL MATERIALS EXPLORATION PROFILE",
    );
    expect(JSON.parse(savedProgress!).answers).toEqual(answers);

    fireEvent.click(
      screen.getByRole("button", { name: "Review my materials answers" }),
    );
    expect(
      screen.getByText(
        `${path.length} of ${path.length} visible questions answered.`,
      ),
    ).toBeDefined();
  });
});
