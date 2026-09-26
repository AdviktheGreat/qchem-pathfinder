// @vitest-environment jsdom

import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CopyButton } from "@/components/CopyButton";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("copy feedback", () => {
  it.each(["missing", "denied"])(
    "offers persistent selectable text when clipboard is %s",
    async (kind) => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value:
          kind === "missing"
            ? undefined
            : { writeText: vi.fn().mockRejectedValue(new Error("Denied")) },
      });
      render(
        <CopyButton
          text={"A complete profile\nwith searches"}
          label="Copy profile"
        />,
      );
      fireEvent.click(screen.getByRole("button", { name: "Copy profile" }));
      const field = (await screen.findByRole("textbox", {
        name: "Manual copy: Copy profile",
      })) as HTMLTextAreaElement;
      expect(field.value).toBe("A complete profile\nwith searches");
      expect(document.activeElement).toBe(field);
      expect(field.selectionStart).toBe(0);
      expect(field.selectionEnd).toBe(field.value.length);
      fireEvent.click(
        screen.getByRole("button", { name: "Close manual copy" }),
      );
      expect(screen.queryByRole("textbox")).toBeNull();
      expect(document.activeElement).toBe(
        screen.getByRole("button", { name: "Copy profile" }),
      );
    },
  );
  it("keeps feedback visible for the full interval after each copy", async () => {
    vi.useFakeTimers();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });

    render(<CopyButton text="research profile" />);
    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });
    act(() => vi.advanceTimersByTime(1500));
    await act(async () => {
      fireEvent.click(button);
    });
    act(() => vi.advanceTimersByTime(1000));

    expect(screen.getByText("Copied")).toBeDefined();

    act(() => vi.advanceTimersByTime(1200));

    expect(screen.getByText("Copy")).toBeDefined();
  });
});
