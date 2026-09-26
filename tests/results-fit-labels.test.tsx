// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { getRecommendations } from "@/lib/recommendation";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ResultsScreen } from "@/components/ResultsScreen";
import type { AnswerMap } from "@/lib/types";

afterEach(cleanup);

describe("result fit labels", () => {
  it("opens the alternative choices without silently changing the primary", () => {
    const onExploreNearby = vi.fn();
    render(
      <ResultsScreen
        answers={{}}
        onExploreNearby={onExploreNearby}
        onReview={vi.fn()}
        onRestart={vi.fn()}
      />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Explore a nearby path" }),
    );
    expect(document.activeElement).toBe(
      screen.getByRole("heading", {
        name: "Nearby directions worth exploring.",
      }),
    );
    expect(onExploreNearby).not.toHaveBeenCalled();
  });
  it("lets students promote either alternative", () => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const onExploreNearby = vi.fn();
    render(
      <ResultsScreen
        answers={{}}
        onExploreNearby={onExploreNearby}
        onReview={vi.fn()}
        onRestart={vi.fn()}
      />,
    );
    for (const result of getRecommendations({}).slice(1)) {
      fireEvent.click(
        screen.getByRole("button", {
          name: `Explore ${result.niche.name} as my primary direction`,
        }),
      );
      expect(onExploreNearby).toHaveBeenCalledWith(result.niche.id);
    }
    vi.restoreAllMocks();
  });
  it("keeps labels relative to the highest-scoring direction", () => {
    const answers: AnswerMap = {
      motivation: ["reactions"],
      "reactions-focus": ["steps"],
      "reactions-view": ["map"],
      "question-kind": ["pathway"],
      "change-style": ["changing"],
      "evidence-style": ["visuals"],
    };

    render(
      <ResultsScreen
        answers={answers}
        primaryOverride="computational-catalysis"
        onExploreNearby={vi.fn()}
        onReview={vi.fn()}
        onRestart={vi.fn()}
      />,
    );

    expect(
      screen.getByText("Nearby direction", {
        selector: ".primary-label span",
      }),
    ).toBeDefined();
    expect(screen.getByText(/Strong fit ·/)).toBeDefined();
    expect(screen.getByText("Your chosen direction")).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Return to my original suggestion" }),
    ).toBeDefined();
  });
});
