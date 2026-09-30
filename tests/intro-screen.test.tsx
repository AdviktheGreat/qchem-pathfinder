// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { IntroScreen } from "@/components/IntroScreen";

afterEach(cleanup);

it("renders the active pathfinder introduction", () => {
  render(
    <IntroScreen
      intro={{
        eyebrow: "A materials research exploration",
        title: "Find a computational materials direction.",
        description: "Connect structures, properties, and simulations.",
        durationLabel: "About 10 minutes",
        privacyLabel: "Materials answers stay on this device",
        noScoreLabel: "No grades or perfect materials",
        promiseSteps: [
          { label: "Notice", text: "what interests you." },
          { label: "Narrow", text: "toward a useful direction." },
          { label: "Launch", text: "into the literature." },
        ],
        branchingNote: "Answers shape the route, not an ability score.",
      }}
      hasProgress={false}
      resumeDetail=""
      onBegin={vi.fn()}
      onResume={vi.fn()}
    />,
  );

  expect(
    screen.getByRole("heading", {
      name: "Find a computational materials direction.",
    }),
  ).toBeDefined();
  expect(
    screen.getByText("Connect structures, properties, and simulations."),
  ).toBeDefined();
  expect(screen.getByText("No grades or perfect materials")).toBeDefined();
});
