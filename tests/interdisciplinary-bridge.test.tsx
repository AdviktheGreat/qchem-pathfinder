// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { InterdisciplinaryBridge } from "@/components/InterdisciplinaryBridge";
import { InterdisciplinaryArrivalBanner } from "@/components/InterdisciplinaryArrivalBanner";
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

  it("explains a validated bridge arrival without transferring answers", () => {
    render(
      <InterdisciplinaryArrivalBanner
        arrival={{
          bridgeId: "example-bridge",
          sourcePathfinderId: "quantum-chemistry",
          sourcePathfinderName: "Quantum chemistry",
          sourceRoute: "/pathfinders/quantum-chemistry",
          sourceNicheId: "charge-transfer",
          sourceNicheName: "Charge transfer",
          targetPathfinderId: "computational-materials",
          targetPathfinderName: "Computational materials",
          targetNicheId: "photovoltaic-materials",
          targetNicheName: "Photovoltaic materials",
          sharedQuestion: "How does charge move across the two scales?",
        }}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "From Charge transfer to Photovoltaic materials",
      }),
    ).toBeDefined();
    expect(
      screen.getByText(/answers there have not been copied or scored here/i),
    ).toBeDefined();
    expect(
      screen
        .getByRole("link", { name: "Return to Quantum chemistry result" })
        .getAttribute("href"),
    ).toBe("/pathfinders/quantum-chemistry");
  });

  it("explains, searches, and links to the adjacent pathfinder", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    const link = quantumChemistryInterdisciplinaryLinks[0];

    render(
      <InterdisciplinaryBridge
        links={[link]}
        sourcePathfinderId="quantum-chemistry"
        sourcePathfinderName="Quantum chemistry"
        sourceDirectionName="Charge transfer"
      />,
    );

    const region = screen.getByRole("region", {
      name: "See where this direction meets another field.",
    });
    expect(within(region).getByText("1 curated connection")).toBeDefined();
    expect(
      within(region).getByRole("list", {
        name: "1 interdisciplinary connection",
      }),
    ).toBeDefined();
    expect(
      within(region).getByRole("heading", { name: link.targetNicheName }),
    ).toBeDefined();
    expect(
      within(region).getByRole("listitem", {
        name: link.targetNicheName,
      }),
    ).toBeDefined();
    expect(
      within(region)
        .getByRole("link", {
          name: "Open Computational materials pathfinder",
        })
        .getAttribute("href"),
    ).toBe(
      getInterdisciplinaryDestination(link, {
        sourcePathfinderId: "quantum-chemistry",
      }),
    );
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
      within(region).getByRole("note", { name: "Shared research question" }),
    ).toBeDefined();
    expect(
      within(region).getByRole("note", { name: "Try this first" }),
    ).toBeDefined();
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
    expect(
      within(searches).getByRole("tablist", {
        name: `Bridge query levels for ${link.targetNicheName}`,
      }),
    ).toBeDefined();
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
    const printSearches = region.querySelector<HTMLElement>(
      ".interdisciplinary-print-searches",
    );
    expect(printSearches).not.toBeNull();
    expect(printSearches?.classList.contains("print-only")).toBe(true);
    expect(within(printSearches!).getByText(queries.orientation)).toBeDefined();
    expect(within(printSearches!).getByText(queries.focused)).toBeDefined();
    expect(within(printSearches!).getByText(queries.review)).toBeDefined();
    expect(region.textContent).toContain(link.distinction);
    expect(region.textContent).not.toMatch(/\d+(?:\.\d+)?%|match score/i);

    const printCss = readFileSync("app/globals.css", "utf8");
    expect(printCss).toMatch(
      /@media print[\s\S]*\.print-only\s*{[^}]*display: block !important/,
    );
    expect(printCss).toMatch(
      /@media print[\s\S]*\.interdisciplinary-search-panel[\s\S]*display: none !important/,
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

  it("uses calm disclosures when several neighboring bridges are available", () => {
    const { container } = render(
      <InterdisciplinaryBridge
        links={quantumChemistryInterdisciplinaryLinks.slice(0, 2)}
        sourceDirectionName="Charge-transfer directions"
      />,
    );

    const disclosures = container.querySelectorAll(
      "details.interdisciplinary-disclosure",
    );
    expect(disclosures).toHaveLength(2);
    expect(disclosures[0].hasAttribute("open")).toBe(true);
    expect(disclosures[1].hasAttribute("open")).toBe(false);
    expect(screen.getByText("2 curated connections")).toBeDefined();
    expect(screen.getByText("Connection 1 of 2")).toBeDefined();
    expect(screen.getByText("Connection 2 of 2")).toBeDefined();

    fireEvent.click(
      screen.getByText(
        `Explore ${quantumChemistryInterdisciplinaryLinks[1].targetNicheName}`,
      ),
    );
    expect(disclosures[1].hasAttribute("open")).toBe(true);
  });

  it("supports keyboard focus across bridge disclosures, searches, and navigation", () => {
    const link = quantumChemistryInterdisciplinaryLinks[0];
    const { container } = render(
      <InterdisciplinaryBridge
        links={quantumChemistryInterdisciplinaryLinks.slice(0, 2)}
        sourcePathfinderId="quantum-chemistry"
      />,
    );
    const firstSummary = container.querySelector<HTMLElement>("summary");
    expect(firstSummary?.tabIndex).toBe(0);
    firstSummary?.focus();
    expect(document.activeElement).toBe(firstSummary);

    const searches = screen.getAllByRole("region", {
      name: /^Bridge searches for/,
    })[0];
    const orientation = within(searches).getByRole("tab", {
      name: "Orientation",
    });
    const focused = within(searches).getByRole("tab", { name: "Focused" });
    const review = within(searches).getByRole("tab", { name: "Review" });

    orientation.focus();
    fireEvent.keyDown(orientation, { key: "ArrowRight" });
    expect(document.activeElement).toBe(focused);
    expect(focused.getAttribute("aria-selected")).toBe("true");
    fireEvent.keyDown(focused, { key: "End" });
    expect(document.activeElement).toBe(review);
    fireEvent.keyDown(review, { key: "Home" });
    expect(document.activeElement).toBe(orientation);
    fireEvent.keyDown(orientation, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(review);

    const copy = within(searches).getByRole("button", {
      name: `Copy review search — ${link.targetNicheName}`,
    });
    copy.focus();
    expect(document.activeElement).toBe(copy);
    const firstDisclosure = container.querySelector<HTMLElement>(
      "details.interdisciplinary-disclosure",
    )!;
    const destination = within(firstDisclosure).getByRole("link", {
      name: `Open ${link.targetPathfinderName} pathfinder`,
    });
    destination.focus();
    expect(document.activeElement).toBe(destination);
  });

  it("keeps the bridge return link in the normal keyboard sequence", () => {
    render(
      <InterdisciplinaryArrivalBanner
        arrival={{
          bridgeId: "example-bridge",
          sourcePathfinderId: "quantum-chemistry",
          sourcePathfinderName: "Quantum chemistry",
          sourceRoute: "/pathfinders/quantum-chemistry",
          sourceNicheId: "charge-transfer",
          sourceNicheName: "Charge transfer",
          targetPathfinderId: "computational-materials",
          targetPathfinderName: "Computational materials",
          targetNicheId: "photovoltaic-materials",
          targetNicheName: "Photovoltaic materials",
          sharedQuestion: "How does charge move across the two scales?",
        }}
      />,
    );
    const returnLink = screen.getByRole("link", {
      name: "Return to Quantum chemistry result",
    });
    const arrivalNote = screen.getByRole("note", {
      name: "From Charge transfer to Photovoltaic materials",
    });
    expect(arrivalNote.getAttribute("aria-describedby")).toBe(
      "interdisciplinary-arrival-description interdisciplinary-arrival-question",
    );
    returnLink.focus();
    expect(document.activeElement).toBe(returnLink);
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
