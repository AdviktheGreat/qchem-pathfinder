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
import { pathfinderModules } from "@/data/pathfinder-modules";
import { quantumChemistryInterdisciplinaryLinks } from "@/data/pathfinders/quantum-chemistry-links";
import {
  buildInterdisciplinarySearchQueries,
  formatInterdisciplinaryBridgeNote,
  getInterdisciplinaryDestination,
} from "@/lib/interdisciplinary-links";

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

    render(
      <InterdisciplinaryBridge
        links={[link]}
        sourcePathfinderName="Quantum chemistry"
        sourceDirectionName="Charge transfer"
      />,
    );

    const region = screen.getByRole("region", {
      name: "See where this direction meets another field.",
    });
    expect(
      within(region).getByRole("heading", { name: link.targetNicheName }),
    ).toBeDefined();
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
    const connectionTypes = within(region).getByRole("group", {
      name: `Connection types for ${link.targetNicheName}`,
    });
    expect(within(connectionTypes).getByText("Shared question")).toBeDefined();
    expect(within(connectionTypes).getByText("Connected scales")).toBeDefined();
    expect(within(region).getByText("Shared research question")).toBeDefined();
    expect(within(region).getByText(link.sharedQuestion)).toBeDefined();
    expect(
      within(region).getByText(
        /Charge transfer and Photovoltaic materials connect through/,
      ),
    ).toBeDefined();
    const lensComparison = within(region).getByLabelText(
      `Research lens comparison for ${link.targetNicheName}`,
    );
    expect(
      within(lensComparison).getByText("Current lens · Quantum chemistry"),
    ).toBeDefined();
    expect(
      within(lensComparison).getByText(
        "Neighboring lens · Computational materials",
      ),
    ).toBeDefined();
    expect(within(lensComparison).getByText(link.distinction)).toBeDefined();
    expect(within(region).getByText("Try this first")).toBeDefined();
    expect(within(region).getByText(link.explorationStep)).toBeDefined();
    const searches = within(region).getByRole("region", {
      name: `Bridge searches for ${link.targetNicheName}`,
    });
    const queries = buildInterdisciplinarySearchQueries(link);
    expect(
      within(searches)
        .getByRole("tab", { name: "Orientation" })
        .getAttribute("aria-selected"),
    ).toBe("true");
    expect(within(searches).getByText(queries.orientation)).toBeDefined();
    fireEvent.click(within(searches).getByRole("tab", { name: "Focused" }));
    expect(
      within(searches)
        .getByRole("tab", { name: "Focused" })
        .getAttribute("aria-selected"),
    ).toBe("true");
    expect(within(searches).getByText(queries.focused)).toBeDefined();

    fireEvent.click(
      within(searches).getByRole("button", {
        name: `Copy focused search — ${link.targetNicheName}`,
      }),
    );
    await within(searches).findByRole("button", {
      name: `Copied — ${link.targetNicheName}`,
    });
    expect(writeText).toHaveBeenCalledWith(queries.focused);

    fireEvent.click(within(searches).getByRole("tab", { name: "Review" }));
    fireEvent.click(
      within(searches).getByRole("button", {
        name: `Copy review search — ${link.targetNicheName}`,
      }),
    );
    expect(writeText).toHaveBeenLastCalledWith(queries.review);

    fireEvent.click(
      within(region).getByRole("button", {
        name: `Copy bridge note — ${link.targetNicheName}`,
      }),
    );
    expect(writeText).toHaveBeenLastCalledWith(
      formatInterdisciplinaryBridgeNote(link, {
        sourcePathfinderName: "Quantum chemistry",
        sourceDirectionName: "Charge transfer",
      }),
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
        primaryOverride="fundamental-electronic-structure"
      />,
    );
    expect(
      within(navigation).queryByRole("link", { name: "Field bridge" }),
    ).toBeNull();
  });

  it("renders every released bridge with a reachable destination", () => {
    for (const moduleEntry of pathfinderModules) {
      for (const link of moduleEntry.definition.interdisciplinaryLinks) {
        const { unmount } = render(<InterdisciplinaryBridge links={[link]} />);
        const region = screen.getByRole("region", {
          name: "See where this direction meets another field.",
        });
        expect(
          within(region).getByRole("heading", { name: link.targetNicheName }),
        ).toBeDefined();
        expect(
          within(region)
            .getByRole("link", {
              name: `Open ${link.targetPathfinderName} pathfinder`,
            })
            .getAttribute("href"),
        ).toBe(getInterdisciplinaryDestination(link));
        unmount();
      }
    }
  });
});
