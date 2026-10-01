// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ResultsScreen } from "@/components/ResultsScreen";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";

afterEach(() => cleanup());

function renderMaterialsResults() {
  render(
    <ResultsScreen
      definition={computationalMaterialsPathfinder}
      answers={{
        "materials-starting-point": ["recognize"],
        "materials-motivation": ["energy-conversion"],
        "materials-question-kind": ["predict"],
        "materials-family": ["crystalline"],
        "materials-phenomena": ["optical", "electrons"],
        "materials-scale": ["device"],
        "materials-energy-direction": ["photovoltaics"],
      }}
      onExploreNearby={vi.fn()}
      onReview={vi.fn()}
      onRestart={vi.fn()}
    />,
  );
}

describe("computational materials results", () => {
  it("introduces the primary direction as an exploratory scientific starting point", () => {
    renderMaterialsResults();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "A promising materials direction to investigate",
      }),
    ).toBeDefined();
    expect(
      screen.getByText(
        /well-supported starting point for reading and comparison/i,
      ),
    ).toBeDefined();
    expect(
      screen.getByText("Beginner-friendly scientific orientation"),
    ).toBeDefined();
  });

  it("summarizes the student’s material family, target, phenomenon, and scale", () => {
    renderMaterialsResults();
    const overview = screen
      .getByRole("heading", {
        name: "A clear map of what you want to investigate",
      })
      .closest("section");

    expect(overview).not.toBeNull();
    const scopedOverview = within(overview as HTMLElement);
    expect(
      scopedOverview.getByText("Crystals and ordered solids"),
    ).toBeDefined();
    expect(
      scopedOverview.getByText("Predict a property or behavior"),
    ).toBeDefined();
    expect(
      scopedOverview.getByText(
        "Light and optical response · Electrons and electrical behavior",
      ),
    ).toBeDefined();
    expect(
      scopedOverview.getByText("Interfaces, devices, and operating conditions"),
    ).toBeDefined();
  });

  it("connects research questions to materials and application contexts", () => {
    renderMaterialsResults();
    const primary = screen
      .getByRole("heading", { name: "Photovoltaic materials" })
      .closest("section");
    expect(primary).not.toBeNull();
    const scopedPrimary = within(primary as HTMLElement);

    expect(
      scopedPrimary.getByRole("heading", {
        name: "Questions materials researchers ask",
      }),
    ).toBeDefined();
    expect(
      scopedPrimary.getByRole("heading", {
        name: "Materials, applications, and contexts",
      }),
    ).toBeDefined();
    expect(
      scopedPrimary.getByText(
        /material families, devices, and real operating settings/i,
      ),
    ).toBeDefined();
  });

  it("explains computational approaches without assuming mastery", () => {
    renderMaterialsResults();

    expect(
      screen.getAllByRole("heading", {
        name: "How researchers model this direction",
      }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/do not need to master these tools/i).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText("Finite-element method")).toBeDefined();
    expect(screen.getByText("Machine learning")).toBeDefined();
  });

  it("separates traceable interest and research-style evidence", () => {
    renderMaterialsResults();

    const trace = screen.getByText("Trace the recommendation to your answers");
    expect(trace.closest("details")?.hasAttribute("open")).toBe(true);
    expect(screen.getByText("Interest fit")).toBeDefined();
    expect(screen.getByText("Research-style fit")).toBeDefined();
    expect(
      screen.getByText(/familiarity only changes the preparation guidance/i),
    ).toBeDefined();
  });

  it("frames preparation as support rather than a gate", () => {
    renderMaterialsResults();

    expect(
      screen.getByRole("heading", {
        name: "Build the background while you explore",
      }),
    ).toBeDefined();
    expect(
      screen.getByText(
        /starting familiarity changes which refreshers may help/i,
      ),
    ).toBeDefined();
    expect(
      screen.getByRole("heading", {
        name: "Materials concepts worth revisiting",
      }),
    ).toBeDefined();
    expect(screen.getByText("A realistic first modeling step")).toBeDefined();
  });

  it("presents two concise nearby materials directions", () => {
    renderMaterialsResults();

    expect(
      screen.getByRole("heading", {
        name: "Two nearby directions worth comparing",
      }),
    ).toBeDefined();
    expect(
      screen.getAllByText((_, element) =>
        Boolean(
          element?.classList.contains("alternative-reason") &&
          element.textContent?.startsWith("Why it also fits:"),
        ),
      ),
    ).toHaveLength(2);
    expect(
      screen.getAllByRole("button", {
        name: /explore .* as my primary direction/i,
      }),
    ).toHaveLength(2);
  });

  it("compares alternatives and expands their full research details", () => {
    renderMaterialsResults();

    expect(screen.getByText("Compare the research emphasis")).toBeDefined();
    expect(
      screen.getByText(
        /scientific focus—not the difficulty, importance, or quality/i,
      ),
    ).toBeDefined();

    const expand = screen.getAllByRole("button", {
      name: /see questions, methods, and searches for/i,
    })[0];
    expect(expand.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(expand);
    expect(expand.getAttribute("aria-expanded")).toBe("true");
    expect(expand.textContent).toContain(
      "Hide questions, methods, and searches",
    );
  });

  it("introduces starter keywords and materials-specific related phrases", () => {
    renderMaterialsResults();

    expect(
      screen.getAllByRole("heading", { name: "Starter materials keywords" })
        .length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/combine a material family, a target property/i)
        .length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/related phrases used in materials literature/i)
        .length,
    ).toBeGreaterThan(0);
  });

  it("offers broad, focused, and review searches at distinct depths", () => {
    renderMaterialsResults();

    expect(
      screen.getAllByRole("heading", {
        name: "Three searches at different depths",
      }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/material–property–method combination/i).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("tab", { name: "Orientation" }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("tab", { name: "Focused" }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("tab", { name: "Review" }).length,
    ).toBeGreaterThan(0);
  });

  it("provides a materials reading sequence and citation warning", () => {
    renderMaterialsResults();

    expect(
      screen.getByText(/introduce the material families, property language/i),
    ).toBeDefined();
    expect(
      screen.getByText(
        /verify the title, authors, year, journal, and DOI or URL/i,
      ),
    ).toBeDefined();
    expect(
      screen.getByText(
        /identify the material, target property, modeling scale/i,
      ),
    ).toBeDefined();
    expect(screen.getByText("Benchmark or validation study")).toBeDefined();
  });

  it("links each search to scholarly tools and keeps a copy action", () => {
    renderMaterialsResults();

    const googleScholar = screen.getByRole("link", {
      name: /search google scholar — broad orientation/i,
    });
    const semanticScholar = screen.getByRole("link", {
      name: /search semantic scholar — broad orientation/i,
    });
    expect(googleScholar.getAttribute("href")).toContain("scholar.google.com");
    expect(semanticScholar.getAttribute("href")).toContain(
      "semanticscholar.org/search",
    );
    expect(googleScholar.getAttribute("href")).toContain("%20");
    expect(
      screen.getByRole("button", {
        name: /copy query — broad orientation for photovoltaic materials/i,
      }),
    ).toBeDefined();
  });

  it("offers a copyable and downloadable materials research profile", () => {
    renderMaterialsResults();

    expect(
      screen.getByRole("heading", {
        name: "Computational materials exploration profile",
      }),
    ).toBeDefined();
    expect(screen.getByText(/contains no personal information/i)).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Copy materials profile" }),
    ).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Download materials profile" }),
    ).toBeDefined();
  });
});
