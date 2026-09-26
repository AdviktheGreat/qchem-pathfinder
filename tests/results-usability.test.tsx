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
afterEach(cleanup);
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
