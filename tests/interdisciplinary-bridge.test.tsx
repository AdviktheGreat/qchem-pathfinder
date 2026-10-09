// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { InterdisciplinaryBridge } from "@/components/InterdisciplinaryBridge";
import { ResultsScreen } from "@/components/ResultsScreen";
import { quantumChemistryInterdisciplinaryLinks } from "@/data/pathfinders/quantum-chemistry-links";

const handlers = {
  onExploreNearby: vi.fn(),
  onReview: vi.fn(),
  onRestart: vi.fn(),
};

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("interdisciplinary result bridges", () => {
  it("renders nothing when a direction has no curated bridge", () => {
    const { container } = render(<InterdisciplinaryBridge links={[]} />);
    expect(container.childElementCount).toBe(0);
  });

  it("explains, searches, and links to the adjacent pathfinder", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    const link = quantumChemistryInterdisciplinaryLinks[0];

    render(<InterdisciplinaryBridge links={[link]} />);

    const region = screen.getByRole("region", {
      name: "See where this direction meets another field.",
    });
    expect(within(region).getByText(link.targetNicheName)).toBeDefined();
    expect(
      within(region)
        .getByRole("link", {
          name: "Open Computational materials pathfinder",
        })
        .getAttribute("href"),
    ).toBe("/pathfinders/computational-materials");
    expect(
      within(region).getByRole("group", {
        name: `Shared search terms for ${link.targetNicheName}`,
      }),
    ).toBeDefined();

    fireEvent.click(
      within(region).getByRole("button", {
        name: `Copy bridge search — ${link.targetNicheName}`,
      }),
    );
    await within(region).findByRole("button", {
      name: `Copied — ${link.targetNicheName}`,
    });
    expect(writeText).toHaveBeenCalledWith(
      `${link.sharedKeywords.join(" ")} review`,
    );
  });

  it("adds a focusable result-section link only for connected primaries", () => {
    const { rerender } = render(
      <ResultsScreen
        {...handlers}
        answers={{}}
        primaryOverride="charge-transfer"
      />,
    );
    const navigation = screen.getByRole("navigation", {
      name: "Results sections",
    });
    const fieldBridge = within(navigation).getByRole("link", {
      name: "Field bridge",
    });
    fireEvent.click(fieldBridge);
    expect(document.activeElement?.id).toBe("interdisciplinary-bridge-title");

    rerender(
      <ResultsScreen
        {...handlers}
        answers={{}}
        primaryOverride="method-benchmarking"
      />,
    );
    expect(
      within(navigation).queryByRole("link", { name: "Field bridge" }),
    ).toBeNull();
  });
});
