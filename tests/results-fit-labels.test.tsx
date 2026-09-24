// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ResultsScreen } from "@/components/ResultsScreen";
import type { AnswerMap } from "@/lib/types";

afterEach(cleanup);

describe("result fit labels", () => {
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
  });
});
