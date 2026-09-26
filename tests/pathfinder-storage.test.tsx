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
  it("repairs an empty survey and restores the repair on the next visit", async () => {
    let saved = JSON.stringify({
      version: 1,
      savedAt: "2026-09-25",
      screen: "survey",
      answers: {},
    });
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => saved);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation((_key, value) => {
      saved = value;
    });
    const first = render(<PathfinderApp />);
    await screen.findByRole("heading", {
      name: "How does Phase 1 feel in your memory right now?",
    });
    expect(screen.getByRole("status").textContent).toContain(
      "updated your saved exploration",
    );
    await waitFor(() =>
      expect(JSON.parse(saved).currentQuestionId).toBe("phase-one-memory"),
    );
    first.unmount();
    render(<PathfinderApp />);
    await screen.findByRole("heading", {
      name: "How does Phase 1 feel in your memory right now?",
    });
    expect(screen.queryByRole("status")).toBeNull();
  });
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
    expect(screen.getByRole("status").textContent).toContain(
      "Progress is not being saved.",
    );
    expect(screen.getByRole("main").contains(screen.getByRole("status"))).toBe(
      true,
    );
    fireEvent.click(screen.getByRole("button", { name: /Restart/ }));

    await waitFor(() => expect(removeItem).toHaveBeenCalledWith(STORAGE_KEY));
  });
});
