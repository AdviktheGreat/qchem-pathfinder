// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { PathfinderApp } from "@/components/PathfinderApp";
import { questions } from "@/data/questions";
import { niches } from "@/data/niches";
import { getVisibleQuestions } from "@/lib/branching";
import { studentProfiles } from "./fixtures/student-profiles";

let saved: string | null;
beforeEach(() => {
  saved = null;
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => saved);
  vi.spyOn(Storage.prototype, "setItem").mockImplementation((_key, value) => {
    saved = value;
  });
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it.each(studentProfiles)(
  "completes the visible journey, export and review for $name",
  async ({ answers, expected }) => {
    render(<PathfinderApp />);
    fireEvent.click(
      await screen.findByRole("button", { name: "Begin exploring" }),
    );
    const path = getVisibleQuestions(answers);
    for (const [index, question] of path.entries()) {
      expect(
        screen.getByRole("heading", { name: question.title }),
      ).toBeDefined();
      for (const id of answers[question.id]) {
        const option = question.options.find((o) => o.id === id)!;
        const choices = screen.getAllByRole(
          question.type === "single" ? "radio" : "checkbox",
        );
        fireEvent.click(
          choices.find((choice) => choice.textContent?.includes(option.label))!,
        );
      }
      fireEvent.click(
        screen.getByRole("button", {
          name: index === path.length - 1 ? "See my directions" : "Continue",
        }),
      );
    }
    const name = niches.find((n) => n.id === expected)!.name;
    expect(screen.getByRole("heading", { name }).id).toBe("primary-title");
    expect(document.querySelector("pre")?.textContent).toContain(
      `PRIMARY DIRECTION\n${name}`,
    );
    expect(JSON.parse(saved!).answers).toEqual(answers);
    fireEvent.click(screen.getByRole("button", { name: "Review my answers" }));
    expect(
      screen.getByText("16 of 16 visible questions answered."),
    ).toBeDefined();
    const motivation = questions.find((q) => q.id === "motivation")!;
    fireEvent.click(
      screen.getByRole("button", { name: `Edit: ${motivation.title}` }),
    );
    const nextMotivation =
      answers.motivation[0] === "light" ? "medicine" : "light";
    const label = motivation.options.find(
      (o) => o.id === nextMotivation,
    )!.label;
    fireEvent.click(
      screen
        .getAllByRole("radio")
        .find((choice) => choice.textContent?.includes(label))!,
    );
    const updated = JSON.parse(saved!).answers;
    expect(
      screen.queryByRole("button", { name: "Update my directions" }),
    ).toBeNull();
    for (const question of path.filter((q) => q.visibleWhen))
      expect(updated[question.id]).toBeUndefined();
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    const firstBranch = getVisibleQuestions(updated).find(
      (q) => q.visibleWhen,
    )!;
    expect(
      screen.getByRole("heading", { name: firstBranch.title }),
    ).toBeDefined();
  },
);

it.each([true, false])(
  "remembers the letter-shortcut preference: %s",
  async (enabled) => {
    const first = render(<PathfinderApp />);
    fireEvent.click(
      await screen.findByRole("button", { name: "Begin exploring" }),
    );
    if (enabled)
      fireEvent.click(
        screen.getByRole("checkbox", {
          name: "Enable letter-key answer shortcuts",
        }),
      );
    first.unmount();
    render(<PathfinderApp />);
    const control = await screen.findByRole("checkbox", {
      name: "Enable letter-key answer shortcuts",
    });
    expect((control as HTMLInputElement).checked).toBe(enabled);
  },
);
