// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PathfinderApp } from "@/components/PathfinderApp";
import { STORAGE_KEY } from "@/lib/persistence";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("pathfinder storage recovery", () => {
  it("still clears saved progress after a storage write fails", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue(
      JSON.stringify({
        version: 1,
        savedAt: "2026-09-24T00:00:00.000Z",
        screen: "survey",
        answers: { "phase-one-memory": ["fresh"] },
        currentQuestionId: "phase-one-memory",
      }),
    );
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Quota exceeded", "QuotaExceededError");
    });
    const removeItem = vi
      .spyOn(Storage.prototype, "removeItem")
      .mockImplementation(() => undefined);
    vi.spyOn(window, "confirm").mockReturnValue(true);

    render(<PathfinderApp />);

    await screen.findByText("Progress available for this visit");
    fireEvent.click(screen.getByRole("button", { name: /Restart/ }));

    await waitFor(() => expect(removeItem).toHaveBeenCalledWith(STORAGE_KEY));
  });
});
