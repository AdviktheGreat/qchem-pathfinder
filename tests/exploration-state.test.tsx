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
import { getVisibleQuestions } from "@/lib/branching";
import { getRecommendations } from "@/lib/recommendation";
import { createPersistedState, serializeProgress } from "@/lib/persistence";
import type { AnswerMap } from "@/lib/types";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it("keeps a chosen path, preparation and export through refresh, then resets it after an answer edit", async () => {
  const answers: AnswerMap = { motivation: ["balanced"] };
  for (const q of getVisibleQuestions(answers))
    if (q.id !== "motivation")
      answers[q.id] = [q.options.find((o) => o.uncertainty)!.id];
  let saved = serializeProgress(
    createPersistedState({ screen: "results", answers }),
  );
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => saved);
  vi.spyOn(Storage.prototype, "setItem").mockImplementation((_key, value) => {
    saved = value;
  });
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  const original = getRecommendations(answers)[0];
  const chosen = getRecommendations(answers)[2];
  const first = render(<PathfinderApp />);
  fireEvent.click(
    await screen.findByRole("button", {
      name: `Explore ${chosen.niche.name} as my primary direction`,
    }),
  );
  await waitFor(() =>
    expect(JSON.parse(saved).primaryOverride).toBe(chosen.niche.id),
  );
  expect(document.activeElement?.id).toBe("primary-title");
  expect(screen.getByRole("heading", { name: chosen.niche.name }).id).toBe(
    "primary-title",
  );
  expect(
    screen.getByText(chosen.niche.preparation, { selector: ".prep-note p" }),
  ).toBeDefined();
  expect(document.querySelector("pre")?.textContent).toContain(
    `PRIMARY DIRECTION\n${chosen.niche.name}`,
  );
  first.unmount();
  render(<PathfinderApp />);
  await screen.findByText("Your chosen direction");
  fireEvent.click(
    screen.getByRole("button", { name: "Return to my original suggestion" }),
  );
  expect(screen.getByRole("heading", { name: original.niche.name }).id).toBe(
    "primary-title",
  );
  fireEvent.click(
    screen.getByRole("button", {
      name: `Explore ${chosen.niche.name} as my primary direction`,
    }),
  );
  fireEvent.click(screen.getByRole("button", { name: "Review my answers" }));
  expect(document.activeElement).toBe(
    screen.getByRole("heading", { name: "Review your answers." }),
  );
  fireEvent.click(
    screen.getByRole("button", {
      name: "Edit: How does Phase 1 feel in your memory right now?",
    }),
  );
  fireEvent.click(
    screen.getByRole("radio", { name: /The big picture feels fresh/ }),
  );
  await waitFor(() =>
    expect(JSON.parse(saved).primaryOverride).toBeUndefined(),
  );
});
