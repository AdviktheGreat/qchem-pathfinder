// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PathfinderApp } from "@/components/PathfinderApp";
import { pathfinderModules } from "@/data/pathfinder-modules";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";
import { quantumChemistryInterdisciplinaryLinks } from "@/data/pathfinders/quantum-chemistry-links";
import { materialsStudentProfiles } from "@/tests/fixtures/materials-student-profiles";
import { studentProfiles } from "@/tests/fixtures/student-profiles";
import { resolveInterdisciplinaryArrival } from "@/lib/interdisciplinary-destinations";
import { getInterdisciplinaryDestination } from "@/lib/interdisciplinary-links";
import { createPathfinderPersistence } from "@/lib/persistence";
import { getRecommendations } from "@/lib/recommendation";

const targetDefinition = computationalMaterialsPathfinder;
const targetPersistence = createPathfinderPersistence(targetDefinition);
const sourcePersistence = createPathfinderPersistence(
  quantumChemistryPathfinder,
);
const targetAnswers = materialsStudentProfiles[0].answers;

function recommendationIds() {
  return getRecommendations(targetAnswers, undefined, {
    questions: targetDefinition.survey.questions,
    niches: targetDefinition.recommendations.niches,
    openExplorationIds: targetDefinition.recommendations.openExplorationIds,
    scoring: targetDefinition.recommendations.scoring,
  }).map((result) => result.niche.id);
}

function canonicalArrival() {
  const link = quantumChemistryInterdisciplinaryLinks[0];
  const destination = new URL(
    getInterdisciplinaryDestination(link, {
      sourcePathfinderId: quantumChemistryPathfinder.identity.id,
    }),
    "https://pathfinder.test",
  );
  return resolveInterdisciplinaryArrival(
    Object.fromEntries(destination.searchParams.entries()),
    targetDefinition,
    pathfinderModules,
  );
}

beforeEach(() => {
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("interdisciplinary arrival context isolation", () => {
  it("preserves destination progress, rankings, and source storage", async () => {
    const targetRaw = targetPersistence.serializeProgress(
      targetPersistence.createPersistedState({
        screen: "results",
        answers: targetAnswers,
      }),
    );
    const sourceRaw = sourcePersistence.serializeProgress(
      sourcePersistence.createPersistedState({
        screen: "results",
        answers: studentProfiles[4].answers,
      }),
    );
    const storage = new Map([
      [targetPersistence.storageKey, targetRaw],
      [sourcePersistence.storageKey, sourceRaw],
    ]);
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(
      (key) => storage.get(key) ?? null,
    );
    vi.spyOn(Storage.prototype, "setItem").mockImplementation((key, value) => {
      storage.set(key, value);
    });

    const arrival = canonicalArrival();
    expect(arrival).toBeDefined();
    if (!arrival) throw new Error("Canonical bridge arrival must resolve.");
    const rankingsBeforeArrival = recommendationIds();

    render(
      <PathfinderApp definition={targetDefinition} bridgeArrival={arrival} />,
    );

    expect(
      await screen.findByRole("heading", {
        name: "From Molecular charge transfer to Photovoltaic materials",
      }),
    ).toBeDefined();
    expect(
      screen.getByText(/answers there have not been copied or scored here/i),
    ).toBeDefined();

    await waitFor(() => {
      expect(
        targetPersistence.parseProgress(
          storage.get(targetPersistence.storageKey) ?? null,
        )?.screen,
      ).toBe("results");
    });

    const restoredTarget = targetPersistence.parseProgress(
      storage.get(targetPersistence.storageKey) ?? null,
    );
    expect(restoredTarget?.answers).toEqual(targetAnswers);
    expect(restoredTarget?.primaryOverride).toBeUndefined();
    expect(recommendationIds()).toEqual(rankingsBeforeArrival);
    expect(storage.get(sourcePersistence.storageKey)).toBe(sourceRaw);

    const targetQuestionIds = new Set(
      targetDefinition.survey.questions.map((question) => question.id),
    );
    expect(
      Object.keys(restoredTarget?.answers ?? {}).every((questionId) =>
        targetQuestionIds.has(questionId),
      ),
    ).toBe(true);
  });

  it("rejects arrival context aimed at another destination", () => {
    const link = quantumChemistryInterdisciplinaryLinks[0];
    expect(
      resolveInterdisciplinaryArrival(
        {
          from: quantumChemistryPathfinder.identity.id,
          source: link.sourceNicheId,
          bridge: link.id,
          target: "battery-electrodes",
        },
        targetDefinition,
        pathfinderModules,
      ),
    ).toBeUndefined();
  });
});
