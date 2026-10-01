import { describe, expect, it } from "vitest";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { getVisibleQuestions } from "@/lib/branching";
import { getRecommendations } from "@/lib/recommendation";
import { materialsStudentProfiles } from "./fixtures/materials-student-profiles";

const definition = computationalMaterialsPathfinder;
const context = {
  questions: definition.survey.questions,
  niches: definition.recommendations.niches,
  openExplorationIds: definition.recommendations.openExplorationIds,
  scoring: definition.recommendations.scoring,
};

describe("representative computational materials profiles", () => {
  it.each(materialsStudentProfiles)(
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
