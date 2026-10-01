import { describe, expect, it } from "vitest";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { materialsSignalGroups } from "@/data/pathfinders/computational-materials/scoring";
import { getPreparationProfile, mergeConcepts } from "@/lib/preparation";
import { getRecommendations } from "@/lib/recommendation";
import type { AnswerMap } from "@/lib/types";

const definition = computationalMaterialsPathfinder;
const questions = definition.survey.questions;
const niches = definition.recommendations.niches;
const context = {
  questions,
  niches,
  openExplorationIds: definition.recommendations.openExplorationIds,
  scoring: definition.recommendations.scoring,
};

describe("validated computational materials taxonomy", () => {
  it("has unique, complete, searchable direction records", () => {
    expect(niches).toHaveLength(22);
    expect(new Set(niches.map((niche) => niche.id))).toHaveLength(22);
    expect(new Set(niches.map((niche) => niche.name))).toHaveLength(22);

    for (const niche of niches) {
      expect(niche.explanation.length, niche.id).toBeGreaterThan(180);
      expect(niche.questions, niche.id).toHaveLength(3);
      expect(niche.systems.length, niche.id).toBeGreaterThanOrEqual(4);
      expect(niche.approaches.length, niche.id).toBeGreaterThanOrEqual(3);
      expect(niche.concepts.length, niche.id).toBeGreaterThanOrEqual(4);
      expect(niche.keywords.length, niche.id).toBeGreaterThanOrEqual(5);
      expect(niche.keywords.length, niche.id).toBeLessThanOrEqual(8);
      expect(niche.synonyms.length, niche.id).toBeGreaterThanOrEqual(3);
      expect(niche.paperTypes.length, niche.id).toBeGreaterThanOrEqual(3);
      expect(Object.values(niche.searches).every(Boolean), niche.id).toBe(true);
    }
  });

  it("uses only registered signals and valid direct-boost targets", () => {
    const registeredSignals = new Set<string>(
      Object.values(materialsSignalGroups).flat(),
    );
    const nicheIds = new Set(niches.map((niche) => niche.id));

    for (const niche of niches) {
      for (const signal of Object.keys(niche.affinities))
        expect(registeredSignals.has(signal), `${niche.id}:${signal}`).toBe(
          true,
        );
      for (const reason of niche.reasons)
        expect(niche.affinities[reason.signal], niche.id).toBeGreaterThan(0);
    }

    for (const question of questions) {
      for (const option of question.options) {
        for (const nicheId of Object.keys(option.nicheBoosts ?? {}))
          expect(nicheIds.has(nicheId), `${question.id}:${nicheId}`).toBe(true);
      }
    }
  });

  it("makes every direction initially reachable through a visible targeted choice", () => {
    for (const niche of niches) {
      const candidates = questions
        .flatMap((question) =>
          question.options.map((option) => ({
            question,
            option,
            boost: option.nicheBoosts?.[niche.id] ?? 0,
          })),
        )
        .filter((candidate) => candidate.boost > 0)
        .sort((a, b) => b.boost - a.boost);
      expect(candidates.length, niche.id).toBeGreaterThan(0);

      const chosen = candidates[0];
      const answers: AnswerMap = {
        [chosen.question.id]: [chosen.option.id],
      };
      if (chosen.question.visibleWhen)
        answers[chosen.question.visibleWhen.questionId] = [
          chosen.question.visibleWhen.anyOf[0],
        ];
      expect(
        getRecommendations(answers, undefined, context)[0].niche.id,
        niche.name,
      ).toBe(niche.id);
    }
  });

  it("returns three varied starting points for a highly uncertain student", () => {
    const recommendations = getRecommendations(
      {
        "materials-motivation": ["open"],
        "materials-question-kind": ["unsure"],
        "materials-family": ["unsure"],
        "materials-phenomena": ["unsure"],
        "materials-computation-direction": ["unsure"],
        "materials-computation-evidence": ["unsure"],
      },
      undefined,
      context,
    );
    expect(recommendations.map((result) => result.niche.id)).toEqual([
      "crystal-phase-stability",
      "porous-separation-storage",
      "method-potential-evaluation",
    ]);
  });
});

describe("computational materials preparation", () => {
  it("merges narrower concepts only when their umbrella is present", () => {
    expect(
      mergeConcepts(
        [
          "Crystal structure, phases, and stability",
          "Crystal lattices and unit cells",
          "Thermodynamic stability",
          "Diffusion and kinetic barriers",
        ],
        definition.preparation.conceptOverlaps,
      ),
    ).toEqual([
      "Crystal structure, phases, and stability",
      "Diffusion and kinetic barriers",
    ]);
  });

  it("adds tool, workflow, and experiment advice without using confidence as a gate", () => {
    const niche = niches.find(
      (candidate) => candidate.id === "photovoltaic-materials",
    )!;
    const preparation = getPreparationProfile(
      {
        "materials-starting-point": ["new"],
        "materials-math-comfort": ["concept-first"],
        "materials-coding-comfort": ["new"],
        "materials-tools-comfort": ["new"],
        "materials-explanation-style": ["visual"],
        "materials-workflow": ["experimental-evidence"],
        "materials-experiment-connection": ["interpret"],
      },
      niche,
      definition.preparation,
      questions,
    );
    expect(preparation.steps).toHaveLength(5);
    expect(preparation.steps.join(" ")).toContain("experimental plot");
    expect(preparation.steps.join(" ")).toContain("measured feature");
    expect(preparation.startingPoint).toContain("New vocabulary");
    expect(preparation.nicheNote).toBe(niche.preparation);
  });

  it("defines concise materials-method glossary entries", () => {
    expect(definition.results.glossary.map((entry) => entry.term)).toEqual([
      "DFT",
      "Molecular dynamics",
      "Monte Carlo method",
      "Electronic band structure",
      "Phonon",
      "Phase-field modeling",
      "Interatomic potential",
    ]);
    for (const entry of definition.results.glossary)
      expect(entry.text.length, entry.term).toBeGreaterThan(80);
  });
});
