import { describe, expect, it } from "vitest";
import { computationalBiologyQuestions } from "@/data/pathfinders/computational-biology/questions";
import {
  biologyAlternativesCopy,
  biologyComparisonPrinciples,
  biologyDirectionDetailsCopy,
  biologyFitEvidenceCopy,
  biologyPreparationCopy,
  biologyPrimaryCopy,
  biologyResultsOverview,
} from "@/data/pathfinders/computational-biology/results";
import { biologyPreparationConfig } from "@/data/pathfinders/computational-biology/preparation";
import { getPreparationProfile } from "@/lib/preparation";
import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology/pathfinder";
import { computationalBiologyNiches } from "@/data/pathfinders/computational-biology/niches";
import { biologyGlossary } from "@/data/pathfinders/computational-biology/glossary";

describe("computational biology results experience", () => {
  it("summarizes four useful research coordinates", () => {
    const questionIds = new Set(
      computationalBiologyQuestions.map((question) => question.id),
    );

    expect(biologyResultsOverview.dimensions).toHaveLength(4);
    expect(
      biologyResultsOverview.dimensions.every((dimension) =>
        questionIds.has(dimension.questionId),
      ),
    ).toBe(true);
    expect(
      biologyResultsOverview.dimensions.every(
        (dimension) => dimension.fallback.length > 20,
      ),
    ).toBe(true);
  });

  it("frames the primary direction as an exploratory starting point", () => {
    expect(biologyPrimaryCopy.title).toContain("promising");
    expect(biologyPrimaryCopy.description).toContain("not as a final topic");
    expect(biologyPrimaryCopy.description).toContain("not as");
    expect(biologyPrimaryCopy.contextSummary).toContain("Beginner-friendly");
  });

  it("pairs every direction with concrete questions and biological contexts", () => {
    for (const niche of computationalBiologyNiches) {
      expect(niche.questions.length, niche.id).toBeGreaterThanOrEqual(3);
      expect(niche.systems.length, niche.id).toBeGreaterThanOrEqual(4);
      expect(niche.questions.every((question) => question.endsWith("?"))).toBe(
        true,
      );
    }

    expect(biologyDirectionDetailsCopy.questionsHeading).toContain(
      "computational biologists",
    );
    expect(biologyDirectionDetailsCopy.systemsDescription).toContain(
      "research datasets",
    );
  });

  it("explains methods without assuming prior mastery", () => {
    for (const niche of computationalBiologyNiches) {
      expect(niche.approaches.length, niche.id).toBeGreaterThanOrEqual(3);
      expect(
        niche.approaches.every(
          (approach) =>
            approach.name.length > 3 && approach.explanation.length > 60,
        ),
        niche.id,
      ).toBe(true);
    }

    expect(biologyGlossary.length).toBeGreaterThanOrEqual(10);
    expect(new Set(biologyGlossary.map((item) => item.term)).size).toBe(
      biologyGlossary.length,
    );
    expect(biologyDirectionDetailsCopy.approachesDescription).toContain(
      "do not need to master",
    );
  });

  it("separates interest fit, research style, and preparation", () => {
    expect(biologyFitEvidenceCopy.interestHeading).toContain("interest");
    expect(biologyFitEvidenceCopy.styleHeading).toContain("Research-style");
    expect(biologyFitEvidenceCopy.transparentNote).toContain(
      "only change preparation guidance",
    );
    expect(biologyFitEvidenceCopy.transparentNote).toContain("never");
    expect(biologyFitEvidenceCopy.openInitially).toBe(true);
  });

  it("turns calibration into supportive, non-exclusionary preparation", () => {
    const profile = getPreparationProfile(
      {
        "biology-starting-point": ["new"],
        "biology-concept-familiarity": ["genes-genomes"],
        "biology-quantitative-comfort": ["concept-first"],
        "biology-statistics-comfort": ["new"],
        "biology-coding-comfort": ["new"],
        "biology-tools-comfort": ["new"],
        "biology-explanation-style": ["visual"],
      },
      computationalBiologyNiches[0],
      biologyPreparationConfig,
      computationalBiologyQuestions,
    );

    expect(profile.steps).toHaveLength(4);
    expect(profile.startingPoint).toContain("not a limit");
    expect(profile.explanation.text).toContain("diagram");
    expect(profile.concepts).toContain(
      "Protein sequence, structure, and function",
    );
    expect(biologyPreparationCopy.description).toContain("not whether");
  });

  it("keeps two nearby directions open for active comparison", () => {
    expect(biologyAlternativesCopy.title).toContain("Two nearby directions");
    expect(biologyAlternativesCopy.chooseActionLabel).toContain(
      "biology direction",
    );
    expect(biologyAlternativesCopy.detailOpenLabel).toContain("questions");
    expect(biologyAlternativesCopy.detailOpenLabel).toContain("searches");
  });

  it("gives every neighboring direction a substantive comparison lens", () => {
    expect(biologyComparisonPrinciples).toHaveLength(3);
    expect(
      new Set(computationalBiologyNiches.map((niche) => niche.comparisonLens))
        .size,
    ).toBe(computationalBiologyNiches.length);

    for (const niche of computationalBiologyNiches) {
      expect(niche.comparisonLens.length, niche.id).toBeGreaterThan(90);
      expect(niche.comparisonLens, niche.id).toMatch(/^Compared with /);
      expect(niche.comparisonLens.toLowerCase(), niche.id).not.toContain(
        "better than",
      );
    }
  });

  it("assembles a complete but still unregistered results definition", () => {
    const { results } = computationalBiologyPathfinder;

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
    expect(computationalBiologyPathfinder.recommendations.niches).toHaveLength(
      24,
    );
  });
});
