import { describe, expect, it } from "vitest";
import { niches } from "@/data/niches";
import { questions } from "@/data/questions";
import { getRecommendations, rankNiches } from "@/lib/recommendation";
import type { AnswerMap } from "@/lib/types";

const profiles: Array<{ name: string; expected: string; answers: AnswerMap }> =
  [
    {
      name: "medicine-focused, chemistry-heavy, limited coding",
      expected: "biomolecular-electronics",
      answers: {
        motivation: ["medicine"],
        "medicine-focus": ["electrons"],
        "medicine-system": ["drug-dna"],
        "question-kind": ["explain"],
        "purpose-balance": ["applied"],
        "system-scale": ["molecule"],
        "change-style": ["static"],
        "electronic-state": ["ground"],
        "interpret-predict": ["interpret"],
        "evidence-style": ["visuals"],
        "coding-comfort": ["new"],
        "explanation-style": ["conceptual"],
      },
    },
    {
      name: "materials and energy focused, mathematically confident",
      expected: "organic-electronics",
      answers: {
        motivation: ["energy"],
        "energy-focus": ["device"],
        "energy-challenge": ["structure"],
        "question-kind": ["design"],
        "purpose-balance": ["applied"],
        "system-scale": ["material"],
        "electronic-state": ["excited"],
        "interpret-predict": ["predict"],
        "evidence-style": ["equations"],
        "math-comfort": ["comfortable"],
      },
    },
    {
      name: "photochemistry and spectroscopy focused, visually oriented",
      expected: "computational-spectroscopy",
      answers: {
        motivation: ["light"],
        "light-focus": ["signature"],
        "light-evidence": ["peaks"],
        "question-kind": ["spectrum"],
        "electronic-state": ["excited"],
        "evidence-style": ["visuals"],
        "interpret-predict": ["interpret"],
      },
    },
    {
      name: "reaction-mechanism focused",
      expected: "reaction-mechanisms",
      answers: {
        motivation: ["reactions"],
        "reactions-focus": ["steps"],
        "reactions-view": ["map"],
        "question-kind": ["pathway"],
        "change-style": ["changing"],
        "evidence-style": ["visuals"],
      },
    },
    {
      name: "coding and ML focused",
      expected: "ml-property-prediction",
      answers: {
        motivation: ["computing"],
        "computing-focus": ["learn"],
        "computing-priority": ["predict"],
        "question-kind": ["data"],
        "interpret-predict": ["predict"],
        "evidence-style": ["datasets"],
        "coding-comfort": ["enjoy"],
        "purpose-balance": ["applied"],
      },
    },
    {
      name: "highly uncertain",
      expected: "noncovalent-interactions",
      answers: {
        "phase-one-memory": ["unsure"],
        "concept-familiarity": ["uncertain"],
        "math-comfort": ["unsure"],
        "coding-comfort": ["unsure"],
        "explanation-style": ["unsure"],
        motivation: ["balanced"],
        "balanced-focus": ["unsure"],
        "balanced-lens": ["unsure"],
        "question-kind": ["unsure"],
        "purpose-balance": ["unsure"],
        "system-scale": ["unsure"],
        "change-style": ["unsure"],
        "electronic-state": ["unsure"],
        "interpret-predict": ["unsure"],
        "evidence-style": ["unsure"],
      },
    },
  ];

describe("recommendation scoring", () => {
  it.each(profiles)(
    "returns a sensible result for $name",
    ({ answers, expected }) => {
      const results = getRecommendations(answers);
      expect(results).toHaveLength(3);
      expect(new Set(results.map((result) => result.niche.id)).size).toBe(3);
      expect(results[0].niche.id).toBe(expected);
      expect(results.every((result) => Number.isFinite(result.score))).toBe(
        true,
      );
    },
  );

  it("does not use knowledge confidence to lower a niche score", () => {
    const interestAnswers: AnswerMap = {
      motivation: ["light"],
      "light-focus": ["react"],
      "light-evidence": ["lifetimes"],
    };
    const confident = rankNiches({
      ...interestAnswers,
      "phase-one-memory": ["fresh"],
      "concept-familiarity": ["methods", "spectra"],
    });
    const uncertain = rankNiches({
      ...interestAnswers,
      "phase-one-memory": ["unsure"],
      "concept-familiarity": ["uncertain"],
    });
    expect(confident[0].niche.id).toBe("excited-states");
    expect(uncertain[0].niche.id).toBe("excited-states");
    expect(confident[0].score).toBe(uncertain[0].score);
  });

  it("keeps conflicting preferences balanced and deterministic", () => {
    const answers: AnswerMap = {
      motivation: ["materials"],
      "materials-focus": ["glow"],
      "question-kind": ["theory"],
      "purpose-balance": ["fundamental"],
      "system-scale": ["material"],
      "electronic-state": ["ground"],
      "interpret-predict": ["predict"],
    };
    const first = getRecommendations(answers).map((result) => result.niche.id);
    const second = getRecommendations(answers).map((result) => result.niche.id);
    expect(first).toEqual(second);
    expect(new Set(first).size).toBe(3);
  });

  it("makes every niche reachable through a targeted answer", () => {
    const reachable = new Set<string>();
    for (const question of questions) {
      for (const option of question.options) {
        for (const nicheId of Object.keys(option.nicheBoosts ?? {}))
          reachable.add(nicheId);
      }
    }
    expect([
      ...niches.map((niche) => niche.id).filter((id) => !reachable.has(id)),
    ]).toEqual([]);

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
      const chosen = candidates[0];
      const answers: AnswerMap = { [chosen.question.id]: [chosen.option.id] };
      if (chosen.question.visibleWhen)
        answers[chosen.question.visibleWhen.questionId] = [
          chosen.question.visibleWhen.anyOf[0],
        ];
      expect(
        getRecommendations(answers).map((result) => result.niche.id),
        niche.name,
      ).toContain(niche.id);
    }
  });
});
