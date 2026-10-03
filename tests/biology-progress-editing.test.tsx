// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { PathfinderApp } from "@/components/PathfinderApp";
import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology";
import { createPathfinderPersistence } from "@/lib/persistence";
import { biologyStudentProfiles } from "./fixtures/biology-student-profiles";

const definition = computationalBiologyPathfinder;
const persistence = createPathfinderPersistence(definition);
const healthAnswers = biologyStudentProfiles[0].answers;

function persisted(
  screenName: "intro" | "survey" | "results" | "review",
  answers = healthAnswers,
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

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it("removes an old biology branch when an earlier answer changes", async () => {
  let saved = persisted("results");
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => saved);
  vi.spyOn(Storage.prototype, "setItem").mockImplementation((_key, value) => {
    saved = value;
  });
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});

  render(<PathfinderApp definition={definition} />);
  fireEvent.click(
    await screen.findByRole("button", { name: "Review my biology answers" }),
  );
  const motivation = definition.survey.questions.find(
    (question) => question.id === "biology-motivation",
  )!;
  fireEvent.click(
    screen.getByRole("button", { name: `Edit: ${motivation.title}` }),
  );
  fireEvent.click(
    screen.getByRole("radio", {
      name: /Understand how proteins and other biomolecules work/,
    }),
  );

  await waitFor(() => {
    const answers = JSON.parse(saved).answers;
    expect(answers["biology-motivation"]).toEqual(["proteins"]);
    expect(answers["biology-health-focus"]).toBeUndefined();
    expect(answers["biology-health-evidence"]).toBeUndefined();
  });
  expect(screen.getByRole("note").textContent).toContain(
    "Only the new choice will influence your directions and profile",
  );
  expect(screen.getByRole("status").textContent).toContain(
    "Answer 2 new follow-up questions",
  );
});

it("recovers safely from corrupted biology progress", async () => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue("{broken progress");
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});

  render(<PathfinderApp definition={definition} />);

  expect(
    await screen.findByText(/saved exploration could not be restored/i),
  ).toBeDefined();
  expect(screen.getByRole("button", { name: "Begin exploring" })).toBeDefined();
});

it("restores the exact biology question after a refresh", async () => {
  let saved = persisted(
    "survey",
    { "biology-starting-point": ["recognize"] },
    "biology-concept-familiarity",
  );
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => saved);
  vi.spyOn(Storage.prototype, "setItem").mockImplementation((_key, value) => {
    saved = value;
  });
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});

  const first = render(<PathfinderApp definition={definition} />);
  const question = definition.survey.questions.find(
    (candidate) => candidate.id === "biology-concept-familiarity",
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

it("persists a manually selected nearby biology direction", async () => {
  let saved = persisted("results");
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => saved);
  vi.spyOn(Storage.prototype, "setItem").mockImplementation((_key, value) => {
    saved = value;
  });
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});

  const first = render(<PathfinderApp definition={definition} />);
  const choose = (
    await screen.findAllByRole("button", {
      name: /explore .* as my primary direction/i,
    })
  )[0];
  fireEvent.click(choose);

  await waitFor(() => expect(JSON.parse(saved).primaryOverride).toBeTruthy());
  const chosenId = JSON.parse(saved).primaryOverride as string;
  const chosenName = definition.recommendations.niches.find(
    (niche) => niche.id === chosenId,
  )!.name;
  first.unmount();
  render(<PathfinderApp definition={definition} />);

  expect(await screen.findByText("Your chosen direction")).toBeDefined();
  expect(screen.getByRole("heading", { name: chosenName }).id).toBe(
    "primary-title",
  );
});
