// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { IntroScreen } from "@/components/IntroScreen";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";

afterEach(cleanup);

it("welcomes students without treating the result as a verdict", () => {
  render(
    <IntroScreen
      intro={computationalMaterialsPathfinder.intro}
      hasProgress={false}
      resumeDetail=""
      onBegin={vi.fn()}
      onResume={vi.fn()}
    />,
  );

  expect(
    screen.getByRole("heading", {
      name: "Find a materials direction worth reading about.",
    }),
  ).toBeDefined();
  expect(screen.getByText(/one promising sub-niche/).textContent).toContain(
    "not a final research question or a verdict",
  );
  expect(
    screen.getByText("Experience changes guidance, not access"),
  ).toBeDefined();
  expect(screen.getByText(/not an ability score/)).toBeDefined();
});

it("explains local privacy in an optional disclosure", () => {
  render(
    <IntroScreen
      intro={computationalMaterialsPathfinder.intro}
      hasProgress={false}
      resumeDetail=""
      onBegin={vi.fn()}
      onResume={vi.fn()}
    />,
  );

  const disclosure = screen.getByText("How your progress is saved");
  fireEvent.click(disclosure);
  expect(disclosure.closest("details")?.open).toBe(true);
  expect(screen.getByText(/does not transmit them to a server/)).toBeDefined();
});
