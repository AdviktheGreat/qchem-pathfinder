import { describe, expect, it } from "vitest";
import { niches } from "@/data/niches";
import { questions } from "@/data/questions";
import { getRecommendations, rankNiches } from "@/lib/recommendation";
import type { AnswerMap } from "@/lib/types";

import { studentProfiles as profiles } from "./fixtures/student-profiles";

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
    expect(confident.map((result) => [result.niche.id, result.score])).toEqual(
      uncertain.map((result) => [result.niche.id, result.score]),
    );
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

  it("explains direct narrowing choices that drive a recommendation", () => {
    const primary = getRecommendations({
      motivation: ["balanced"],
      "balanced-focus": ["reaction"],
    })[0];

    expect(primary.niche.id).toBe("reaction-mechanisms");
    expect(primary.interestReasons).toContain(
      "Your choice “A molecule changing bonds” directly points toward this direction.",
    );
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
