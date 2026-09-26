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
import { getRecommendations } from "@/lib/recommendation";
afterEach(cleanup);
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
