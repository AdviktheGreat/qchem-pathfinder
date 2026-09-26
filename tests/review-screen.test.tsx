// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { ReviewScreen } from "@/components/ReviewScreen";
afterEach(cleanup);
it("marks uncertainty without labeling specific answers as uncertain", () => {
  render(
    <ReviewScreen
      answers={{ "phase-one-memory": ["fresh"], "math-comfort": ["unsure"] }}
      onEdit={vi.fn()}
      onBack={vi.fn()}
    />,
  );
  expect(screen.getAllByText("Still exploring")).toHaveLength(1);
  expect(
    screen.getByText("Still exploring").closest(".review-row")?.textContent,
  ).toContain("equations");
});
