// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { HubOrientationQuestion } from "@/components/HubOrientationQuestion";
import type { HubOrientationQuestion as Question } from "@/lib/hub-orientation";

afterEach(cleanup);

const question: Question = {
  id: "example",
  kicker: "First lens",
  title: "What catches your attention?",
  guidance: "Choose the option you would most like to investigate.",
  options: [
    {
      id: "molecules",
      label: "Molecules",
      description: "Structures, interactions, and reactions.",
      evidence: [],
    },
    {
      id: "materials",
      label: "Materials",
      description: "Useful properties and performance.",
      evidence: [],
    },
  ],
};

it("renders an accessible single-choice question shell", () => {
  const onSelect = vi.fn();
  const onContinue = vi.fn();
  render(
    <HubOrientationQuestion
      question={question}
      currentStep={2}
      totalSteps={5}
      onSelect={onSelect}
      onContinue={onContinue}
    />,
  );

  expect(screen.getByRole("group", { name: question.title })).toBeDefined();
  const progress = screen.getByRole("progressbar", {
    name: "Pathfinder guide progress",
  });
  expect(progress.getAttribute("aria-valuenow")).toBe("2");
  expect(progress.getAttribute("aria-valuemax")).toBe("5");
  expect(
    screen.getByRole("button", { name: /Continue/i }).hasAttribute("disabled"),
  ).toBe(true);
  fireEvent.click(screen.getByRole("radio", { name: /Molecules/i }));
  expect(onSelect).toHaveBeenCalledWith("molecules");
});
