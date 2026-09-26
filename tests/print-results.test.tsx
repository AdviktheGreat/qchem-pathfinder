// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { ResultsScreen } from "@/components/ResultsScreen";
import { getRecommendations } from "@/lib/recommendation";
afterEach(cleanup);
it("keeps both alternative launchpads available to print regardless of expansion", () => {
  render(
    <ResultsScreen
      answers={{}}
      onExploreNearby={vi.fn()}
      onReview={vi.fn()}
      onRestart={vi.fn()}
    />,
  );
  for (const result of getRecommendations({}).slice(1)) {
    const panel = document.getElementById(
      `alternative-${result.niche.id}-details`,
    )!;
    expect(panel.classList.contains("print-only")).toBe(true);
    for (const query of Object.values(result.niche.searches))
      expect(panel.textContent).toContain(query);
    const toggle = screen.getByRole("button", {
      name: `Explore details for ${result.niche.name}`,
    });
    fireEvent.click(toggle);
    expect(panel.classList.contains("print-only")).toBe(false);
    fireEvent.click(toggle);
    expect(panel.classList.contains("print-only")).toBe(true);
  }
});
