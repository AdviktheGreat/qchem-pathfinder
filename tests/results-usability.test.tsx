// @vitest-environment jsdom
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { ResultsScreen } from "@/components/ResultsScreen";
import { queryGuidance } from "@/data/reading-guidance";
import { getRecommendations, explainDifference } from "@/lib/recommendation";
afterEach(cleanup);
it("explains when to use each search query", () => {
  render(<ResultsScreen {...handlers} answers={{}} />);
  for (const guidance of Object.values(queryGuidance))
    expect(screen.getByText(guidance)).toBeDefined();
});
it("shows each alternative comparison while its details are collapsed", () => {
  render(<ResultsScreen {...handlers} answers={{}} />);
  const [primary, ...alternatives] = getRecommendations({});
  for (const result of alternatives) {
    const card = screen
      .getByRole("heading", { name: result.niche.name })
      .closest("article")!;
    expect(card.textContent).toContain(explainDifference(primary, result));
    expect(
      within(card)
        .getByRole("button", { name: "Explore details" })
        .getAttribute("aria-expanded"),
    ).toBe("false");
  }
});
it("explains all qualitative recommendation labels", () => {
  render(<ResultsScreen {...handlers} answers={{}} />);
  const summary = screen.getByText("What do the recommendation labels mean?");
  fireEvent.click(summary);
  const disclosure = summary.closest("details")!;
  expect(disclosure.open).toBe(true);
  for (const label of [
    "Strong fit",
    "Worth exploring",
    "Nearby direction",
    "Starting point",
  ])
    expect(within(disclosure).getByText(label)).toBeDefined();
});
it("does not describe open-ended defaults as discovered matches", () => {
  const view = render(<ResultsScreen {...handlers} answers={{}} />);
  expect(screen.getByText("Why this is a starting point")).toBeDefined();
  expect(screen.queryByText("Why it matched")).toBeNull();
  view.rerender(
    <ResultsScreen
      {...handlers}
      answers={{ motivation: ["reactions"], "reactions-focus": ["steps"] }}
    />,
  );
  expect(screen.getByText("Why it matched")).toBeDefined();
});
it("previews all three recommended directions before the detailed result", () => {
  render(<ResultsScreen {...handlers} answers={{}} />);
  const overview = screen.getByRole("complementary", {
    name: "Your three directions at a glance",
  });
  expect(within(overview).getAllByRole("listitem")).toHaveLength(3);
  for (const result of getRecommendations({}))
    expect(within(overview).getByText(result.niche.name)).toBeDefined();
});
const handlers = {
  onExploreNearby: vi.fn(),
  onReview: vi.fn(),
  onRestart: vi.fn(),
};
it("navigates to and focuses each result section", () => {
  render(<ResultsScreen {...handlers} answers={{}} />);
  for (const link of within(
    screen.getByRole("navigation", { name: "Results sections" }),
  ).getAllByRole("link")) {
    const id = link.getAttribute("href")!.slice(1);
    fireEvent.click(link);
    expect(document.activeElement?.id).toBe(id);
  }
});
