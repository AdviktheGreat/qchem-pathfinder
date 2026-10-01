// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { PathfinderCard } from "@/components/PathfinderCard";
import { pathfinders } from "@/data/pathfinders";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { getVisibleQuestions } from "@/lib/branching";
import type { AnswerMap } from "@/lib/types";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it("shows saved quantum chemistry progress on the hub card", async () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(
    JSON.stringify({
      version: 1,
      savedAt: "2026-09-29T18:00:00.000Z",
      screen: "survey",
      currentQuestionId: "phase-one-memory",
      answers: { "phase-one-memory": ["fresh"] },
    }),
  );

  render(<PathfinderCard pathfinder={pathfinders[0]} />);

  expect(await screen.findByText("Exploration in progress")).toBeDefined();
  expect(screen.getByText("1 of 16 questions answered")).toBeDefined();
  expect(
    screen.getByRole("link", { name: /Continue quantum chemistry/ }),
  ).toBeDefined();
});

const materialsCatalogEntry = {
  ...pathfinders[1],
  href: computationalMaterialsPathfinder.identity.route,
};

function completeMaterialsAnswers(): AnswerMap {
  const answers: AnswerMap = {};
  let question = getVisibleQuestions(
    answers,
    computationalMaterialsPathfinder.survey.questions,
  ).find((candidate) => !answers[candidate.id]);

  while (question) {
    answers[question.id] = [question.options[0].id];
    question = getVisibleQuestions(
      answers,
      computationalMaterialsPathfinder.survey.questions,
    ).find((candidate) => !answers[candidate.id]);
  }

  return answers;
}

it("shows the start state for computational materials", async () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

  render(<PathfinderCard pathfinder={materialsCatalogEntry} />);

  expect(await screen.findByText("Ready when you are")).toBeDefined();
  expect(
    screen.getByRole("link", { name: /Open computational materials/ }),
  ).toBeDefined();
});

it("shows resumable computational materials progress", async () => {
  vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) =>
    key === computationalMaterialsPathfinder.storage.key
      ? JSON.stringify({
          version: computationalMaterialsPathfinder.storage.version,
          savedAt: "2026-10-01T18:00:00.000Z",
          screen: "survey",
          currentQuestionId: "materials-concept-familiarity",
          answers: { "materials-starting-point": ["recognize"] },
        })
      : null,
  );

  render(<PathfinderCard pathfinder={materialsCatalogEntry} />);

  expect(await screen.findByText("Exploration in progress")).toBeDefined();
  expect(
    screen.getByRole("link", { name: /Continue computational materials/ }),
  ).toBeDefined();
});

it("shows a review state for a completed computational materials map", async () => {
  vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) =>
    key === computationalMaterialsPathfinder.storage.key
      ? JSON.stringify({
          version: computationalMaterialsPathfinder.storage.version,
          savedAt: "2026-10-01T18:00:00.000Z",
          screen: "results",
          answers: completeMaterialsAnswers(),
        })
      : null,
  );

  render(<PathfinderCard pathfinder={materialsCatalogEntry} />);

  expect(await screen.findByText("Research map ready")).toBeDefined();
  expect(
    screen.getByRole("link", {
      name: /Review my computational materials map/,
    }),
  ).toBeDefined();
});
