// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { PathfinderApp } from "@/components/PathfinderApp";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";
import type { PathfinderDefinition } from "@/lib/pathfinder-definition";

beforeEach(() => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it("runs the app from one supplied pathfinder definition", async () => {
  const definition: PathfinderDefinition = {
    ...quantumChemistryPathfinder,
    identity: {
      ...quantumChemistryPathfinder.identity,
      id: "materials-test",
      brandLabel: "Materials Research Pathfinder",
      ariaLabel: "Materials Research Pathfinder",
      icon: "material",
    },
    storage: {
      key: "materials-test:progress",
      version: 1,
    },
    intro: {
      ...quantumChemistryPathfinder.intro,
      title: "Find a materials direction worth exploring.",
    },
    survey: {
      ...quantumChemistryPathfinder.survey,
      branchQuestionId: "material-family",
      questions: [
        {
          id: "material-family",
          stage: "motivation",
          kicker: "Materials",
          title: "Which materials question catches your attention?",
          type: "single",
          options: [{ id: "battery", label: "Improving battery materials" }],
        },
      ],
    },
  };

  render(<PathfinderApp definition={definition} />);
  expect(
    await screen.findByRole("button", {
      name: "Materials Research Pathfinder",
    }),
  ).toBeDefined();
  expect(
    screen.getByRole("heading", {
      name: "Find a materials direction worth exploring.",
    }),
  ).toBeDefined();

  fireEvent.click(screen.getByRole("button", { name: "Begin exploring" }));
  expect(
    screen.getByRole("heading", {
      name: "Which materials question catches your attention?",
    }),
  ).toBeDefined();
  fireEvent.click(
    screen.getByRole("radio", { name: "Improving battery materials" }),
  );
  fireEvent.click(screen.getByRole("button", { name: "See my directions" }));
  expect(
    screen.getByRole("heading", { name: "Here’s a promising place to begin." }),
  ).toBeDefined();
  expect(Storage.prototype.setItem).toHaveBeenCalledWith(
    "materials-test:progress",
    expect.any(String),
  );
});
