import { describe, expect, it } from "vitest";
import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology";
import { getVisibleQuestions } from "@/lib/branching";
import { getRecommendations } from "@/lib/recommendation";
import { biologyStudentProfiles } from "./fixtures/biology-student-profiles";

const definition = computationalBiologyPathfinder;
const context = {
  questions: definition.survey.questions,
  niches: definition.recommendations.niches,
  openExplorationIds: definition.recommendations.openExplorationIds,
  scoring: definition.recommendations.scoring,
};

describe("representative computational biology profiles", () => {
  it.each(biologyStudentProfiles)(
    "produces a complete and sensible map for $name",
    ({ answers, expectedPrimary }) => {
      const visible = getVisibleQuestions(answers, definition.survey.questions);
      expect(visible.every((question) => answers[question.id]?.length)).toBe(
        true,
      );
      expect(getRecommendations(answers, undefined, context)[0].niche.id).toBe(
        expectedPrimary,
      );
    },
  );
});
