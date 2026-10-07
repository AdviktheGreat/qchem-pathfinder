import { describe, expect, it } from "vitest";
import {
  computationalPhysicsNiches,
  computationalPhysicsPathfinder,
  computationalPhysicsQuestions,
  physicsAlternativesCopy,
  physicsComparisonPrinciples,
  physicsDirectionDetailsCopy,
  physicsFitEvidenceCopy,
  physicsGlossary,
  physicsKeywordCopy,
  physicsPaperNoteTemplate,
  physicsPaperTypeGuide,
  physicsPreparationConfig,
  physicsPreparationCopy,
  physicsPrimaryCopy,
  physicsQueryGuidance,
  physicsReadingCopy,
  physicsResultsOverview,
  physicsSearchCopy,
  physicsSearchProviders,
  physicsSearchRefinements,
} from "@/data/pathfinders/computational-physics";
import { getPreparationProfile } from "@/lib/preparation";

describe("computational physics results experience", () => {
  it("summarizes four useful research coordinates", () => {
    const questionIds = new Set(
      computationalPhysicsQuestions.map((question) => question.id),
    );

    expect(physicsResultsOverview.dimensions).toHaveLength(4);
    expect(
      physicsResultsOverview.dimensions.every((dimension) =>
        questionIds.has(dimension.questionId),
      ),
    ).toBe(true);
    expect(
      physicsResultsOverview.dimensions.every(
        (dimension) => dimension.fallback.length > 20,
      ),
    ).toBe(true);
  });

  it("frames the primary direction as an exploratory starting point", () => {
    expect(physicsPrimaryCopy.title).toContain("promising");
    expect(physicsPrimaryCopy.description).toContain(
      "not as a final research question",
    );
    expect(physicsPrimaryCopy.description).toContain("ability judgment");
    expect(physicsPrimaryCopy.contextSummary).toContain("Beginner-friendly");
  });

  it("pairs every direction with concrete questions, systems, and methods", () => {
    for (const niche of computationalPhysicsNiches) {
      expect(niche.questions, niche.id).toHaveLength(3);
      expect(niche.systems.length, niche.id).toBeGreaterThanOrEqual(4);
      expect(niche.questions.every((question) => question.endsWith("?"))).toBe(
        true,
      );
      expect(niche.approaches, niche.id).toHaveLength(3);
      expect(
        niche.approaches.every(
          (approach) =>
            approach.name.length > 3 && approach.explanation.length > 60,
        ),
        niche.id,
      ).toBe(true);
    }

    expect(physicsDirectionDetailsCopy.questionsHeading).toContain(
      "computational physicists",
    );
    expect(physicsDirectionDetailsCopy.approachesDescription).toContain(
      "do not need to master",
    );
    expect(physicsGlossary.length).toBeGreaterThanOrEqual(10);
  });

  it("separates interest fit, research style, and preparation", () => {
    expect(physicsFitEvidenceCopy.interestHeading).toContain("interest");
    expect(physicsFitEvidenceCopy.styleHeading).toContain("Research-style");
    expect(physicsFitEvidenceCopy.transparentNote).toContain(
      "only change preparation guidance",
    );
    expect(physicsFitEvidenceCopy.transparentNote).toContain("never");
    expect(physicsFitEvidenceCopy.openInitially).toBe(true);
  });

  it("turns calibration into supportive, non-exclusionary preparation", () => {
    const profile = getPreparationProfile(
      {
        "physics-starting-point": ["new"],
        "physics-concept-familiarity": ["motion-energy"],
        "physics-math-comfort": ["concept-first"],
        "physics-statistics-comfort": ["new"],
        "physics-coding-comfort": ["new"],
        "physics-tools-comfort": ["new"],
        "physics-explanation-style": ["visual"],
      },
      computationalPhysicsNiches[0],
      physicsPreparationConfig,
      computationalPhysicsQuestions,
    );

    expect(profile.steps).toHaveLength(4);
    expect(profile.startingPoint).toContain("not a limit");
    expect(profile.explanation.text).toContain("trajectory");
    expect(profile.concepts).toContain(
      "Quantum states, probabilities, and measurement",
    );
    expect(physicsPreparationCopy.description).toContain("not whether");
  });

  it("keeps two nearby directions open for active comparison", () => {
    expect(physicsAlternativesCopy.title).toContain("Two nearby directions");
    expect(physicsAlternativesCopy.chooseActionLabel).toContain(
      "physics direction",
    );
    expect(physicsComparisonPrinciples).toHaveLength(3);

    for (const niche of computationalPhysicsNiches) {
      expect(niche.comparisonLens.length, niche.id).toBeGreaterThan(60);
      expect(niche.comparisonLens, niche.id).toMatch(/^Compared with /);
      expect(niche.comparisonLens.toLowerCase(), niche.id).not.toContain(
        "better than",
      );
    }
  });

  it("provides focused keywords and three usable search depths", () => {
    for (const niche of computationalPhysicsNiches) {
      expect(niche.keywords.length, niche.id).toBeGreaterThanOrEqual(5);
      expect(niche.keywords.length, niche.id).toBeLessThanOrEqual(8);
      expect(new Set(niche.keywords).size, niche.id).toBe(
        niche.keywords.length,
      );
      expect(niche.synonyms.length, niche.id).toBeGreaterThanOrEqual(3);
      const searches = Object.values(niche.searches);
      expect(new Set(searches).size, niche.id).toBe(3);
      expect(niche.searches.review, niche.id).toMatch(/review|perspective/i);
    }

    expect(physicsKeywordCopy.description).toContain("physical system");
    expect(Object.keys(physicsQueryGuidance)).toEqual([
      "orientation",
      "focused",
      "review",
    ]);
    expect(physicsSearchRefinements).toHaveLength(3);
    expect(physicsSearchCopy.queriesDescription).toContain("recent review");
  });

  it("teaches source-first reading and citation verification", () => {
    expect(physicsPaperTypeGuide.map((entry) => entry.term)).toEqual([
      "Review",
      "Perspective",
      "Methods or benchmark paper",
      "Original simulation or application study",
    ]);
    expect(physicsReadingCopy.description).toContain("original evidence");
    expect(physicsReadingCopy.citationWarning).toContain("invented citations");
    expect(physicsReadingCopy.checklist).toHaveLength(3);
    expect(physicsPaperNoteTemplate).toContain("Source checked");
    expect(physicsPaperNoteTemplate).toContain("Governing model");
  });

  it("offers search links through useful scholarly providers", () => {
    expect(physicsSearchProviders.map((provider) => provider.label)).toEqual([
      "Google Scholar",
      "arXiv",
      "Semantic Scholar",
    ]);
    for (const provider of physicsSearchProviders) {
      expect(provider.urlTemplate).toMatch(/^https:\/\//);
      expect(provider.urlTemplate).toContain("{query}");
    }
  });

  it("assembles a complete typed results definition", () => {
    const { results } = computationalPhysicsPathfinder;

    expect(results.glossary.length).toBeGreaterThanOrEqual(10);
    expect(results.fitLabelDescriptions.length).toBeGreaterThan(0);
    expect(results.overview?.dimensions).toHaveLength(4);
    expect(results.primaryCopy).toBeDefined();
    expect(results.directionDetailsCopy).toBeDefined();
    expect(results.fitEvidenceCopy).toBeDefined();
    expect(results.preparationCopy).toBeDefined();
    expect(results.alternativesCopy).toBeDefined();
    expect(results.searchCopy).toBeDefined();
    expect(results.readingCopy).toBeDefined();
    expect(results.searchProviders).toHaveLength(3);
    expect(results.exportCopy).toBeDefined();
    expect(results.actionsCopy).toBeDefined();
    expect(computationalPhysicsPathfinder.recommendations.niches).toHaveLength(
      28,
    );
  });
});
