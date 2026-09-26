// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { ReviewScreen } from "@/components/ReviewScreen";
afterEach(cleanup);
it("filters uncertain answers and can return to all answers", () => {
  render(
    <ReviewScreen
      answers={{ "phase-one-memory": ["fresh"], "math-comfort": ["unsure"] }}
      onEdit={vi.fn()}
      onBack={vi.fn()}
    />,
  );
  const filter = screen.getByRole("checkbox", {
    name: "Show only answers I’m still exploring",
  });
  fireEvent.click(filter);
  expect(screen.getAllByRole("button", { name: /^Edit:/ })).toHaveLength(1);
  expect(screen.queryByText("The big picture feels fresh")).toBeNull();
  fireEvent.click(filter);
  expect(screen.getByText("The big picture feels fresh")).toBeDefined();
});
it("explains an empty uncertainty filter", () => {
  render(<ReviewScreen answers={{}} onEdit={vi.fn()} onBack={vi.fn()} />);
  fireEvent.click(screen.getByRole("checkbox"));
  expect(screen.getByText(/No uncertainty choices to revisit/)).toBeDefined();
});
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
