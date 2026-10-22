// @vitest-environment jsdom

import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { InterdisciplinaryArrivalBanner } from "@/components/InterdisciplinaryArrivalBanner";
import { ResultsScreen } from "@/components/ResultsScreen";
import { pathfinderModules } from "@/data/pathfinder-modules";
import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { computationalPhysicsPathfinder } from "@/data/pathfinders/computational-physics";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";
import { biologyStudentProfiles } from "@/tests/fixtures/biology-student-profiles";
import { materialsStudentProfiles } from "@/tests/fixtures/materials-student-profiles";
import { physicsStudentProfiles } from "@/tests/fixtures/physics-student-profiles";
import { studentProfiles } from "@/tests/fixtures/student-profiles";
import { resolveInterdisciplinaryArrival } from "@/lib/interdisciplinary-destinations";
import { getRecommendations } from "@/lib/recommendation";
import type { AnswerMap } from "@/lib/types";
import type { PathfinderDefinition } from "@/lib/pathfinder-definition";

const handlers = {
  onExploreNearby: vi.fn(),
  onReview: vi.fn(),
  onRestart: vi.fn(),
};

const journeys: Array<{
  label: string;
  definition: PathfinderDefinition;
  answers: AnswerMap;
  expectedPrimary: string;
}> = [
  {
    label: "quantum chemistry",
    definition: quantumChemistryPathfinder,
    answers: studentProfiles[4].answers,
    expectedPrimary: studentProfiles[4].expected,
  },
  {
    label: "computational materials",
    definition: computationalMaterialsPathfinder,
    answers: materialsStudentProfiles[0].answers,
    expectedPrimary: materialsStudentProfiles[0].expectedPrimary,
  },
  {
    label: "computational biology",
    definition: computationalBiologyPathfinder,
    answers: biologyStudentProfiles[1].answers,
    expectedPrimary: biologyStudentProfiles[1].expectedPrimary,
  },
  {
    label: "computational physics",
    definition: computationalPhysicsPathfinder,
    answers: physicsStudentProfiles[2].answers,
    expectedPrimary: physicsStudentProfiles[2].expectedPrimary,
  },
];

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("complete interdisciplinary result journeys", () => {
  it.each(journeys)(
    "carries validated context from $label into its neighboring pathfinder",
    ({ definition, answers, expectedPrimary }) => {
      const context = {
        questions: definition.survey.questions,
        niches: definition.recommendations.niches,
        openExplorationIds: definition.recommendations.openExplorationIds,
        scoring: definition.recommendations.scoring,
      };
      const primary = getRecommendations(answers, undefined, context)[0];
      expect(primary.niche.id).toBe(expectedPrimary);

      const bridge = definition.interdisciplinaryLinks.find(
        (link) => link.sourceNicheId === primary.niche.id,
      );
      expect(bridge).toBeDefined();
      const targetModule = pathfinderModules.find(
        (moduleEntry) =>
          moduleEntry.lifecycle === "available" &&
          moduleEntry.definition.identity.id === bridge!.targetPathfinderId,
      );
      expect(targetModule?.lifecycle).toBe("available");
      if (!targetModule || targetModule.lifecycle !== "available") return;

      render(
        <ResultsScreen
          {...handlers}
          definition={definition}
          answers={answers}
        />,
      );
      const bridgeRegion = screen.getByRole("region", {
        name: "See where this direction meets another field.",
      });
      const destinationLink = within(bridgeRegion).getByRole("link", {
        name: `Open ${bridge!.targetPathfinderName} pathfinder`,
      });
      const destination = new URL(
        destinationLink.getAttribute("href")!,
        "https://pathfinder.test",
      );
      expect(destination.pathname).toBe(targetModule.definition.identity.route);

      const arrival = resolveInterdisciplinaryArrival(
        Object.fromEntries(destination.searchParams.entries()),
        targetModule.definition,
        pathfinderModules,
      );
      expect(arrival).toMatchObject({
        sourcePathfinderId: definition.identity.id,
        sourceNicheId: primary.niche.id,
        targetPathfinderId: targetModule.definition.identity.id,
        targetNicheId: bridge!.targetNicheId,
      });
      if (!arrival)
        throw new Error("Canonical bridge context must resolve on arrival.");

      cleanup();
      render(<InterdisciplinaryArrivalBanner arrival={arrival} />);
      expect(
        screen.getByRole("heading", {
          name: `From ${primary.niche.name} to ${bridge!.targetNicheName}`,
        }),
      ).toBeDefined();
      expect(
        screen
          .getByRole("link", {
            name: `Return to ${definition.identity.shortName} result`,
          })
          .getAttribute("href"),
      ).toBe(definition.identity.route);
    },
  );
});
