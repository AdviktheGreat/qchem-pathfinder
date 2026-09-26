import { expect, it } from "vitest";
import { questions } from "@/data/questions";
import { niches } from "@/data/niches";
import { getVisibleQuestions } from "@/lib/branching";
import {
  getFitLabel,
  getRecommendations,
  rankNiches,
} from "@/lib/recommendation";
import { completeAnswers, studentProfiles } from "./fixtures/student-profiles";

it("allows every niche to be the primary result of a complete visible path", () => {
  const reachable = new Set<string>();
  const motivation = questions.find((q) => q.id === "motivation")!;
  for (const option of motivation.options) {
    const base = { motivation: [option.id] };
    const branches = getVisibleQuestions(base).filter(
      (q) => q.stage === "narrowing",
    );
    expect(branches).toHaveLength(2);
    for (const first of branches[0].options) {
      for (const second of branches[1].options) {
        const answers = completeAnswers({
          ...base,
          [branches[0].id]: [first.id],
          [branches[1].id]: [second.id],
        });
        expect(Object.keys(answers)).toHaveLength(16);
        reachable.add(getRecommendations(answers)[0].niche.id);
      }
    }
  }
  expect(niches.filter((n) => !reachable.has(n.id)).map((n) => n.name)).toEqual(
    [],
  );
});

it("retains both explicit directions when neighboring interests conflict", () => {
  const answers = completeAnswers({
    motivation: ["materials"],
    "materials-focus": ["catalyze"],
    "materials-scale": ["building-block"],
  });
  const results = getRecommendations(answers);
  expect(results.map((r) => r.niche.id)).toContain("computational-catalysis");
  expect(results.map((r) => r.niche.id)).toContain("organic-electronics");
  expect(getRecommendations(answers)).toEqual(results);
});

it("keeps a complete uncertain profile honest and stable through score ties", () => {
  const answers = studentProfiles.find(
    (p) => p.name === "highly uncertain",
  )!.answers;
  const ranked = rankNiches(answers);
  expect(rankNiches({ ...answers })).toEqual(ranked);
  const tied = ranked.filter((r) => r.score === ranked[0].score);
  expect(tied.length).toBeGreaterThan(1);
  expect(tied.map((r) => r.niche.id)).toEqual(
    niches
      .filter((n) => tied.some((r) => r.niche.id === n.id))
      .map((n) => n.id),
  );
  for (const result of getRecommendations(answers)) {
    expect(result.preferenceEvidenceCount).toBe(0);
    expect(getFitLabel(result, ranked[0].score)).toBe("Starting point");
  }
});

it.each(studentProfiles)(
  "keeps all calibration choices out of the complete $name ranking",
  ({ answers }) => {
    const expected = rankNiches(answers);
    for (const question of questions.filter((q) => q.stage === "calibration")) {
      for (const option of question.options)
        expect(rankNiches({ ...answers, [question.id]: [option.id] })).toEqual(
          expected,
        );
    }
  },
);
