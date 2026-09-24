// @vitest-environment jsdom

import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CopyButton } from "@/components/CopyButton";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("copy feedback", () => {
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
