import { describe, expect, it } from "vitest";
import { pathfinderModules } from "@/data/pathfinder-modules";
import { getVisibleQuestions } from "@/lib/branching";
import { createPathfinderMetadata } from "@/lib/pathfinder-metadata";
import { formatResearchProfile } from "@/lib/profile-export";
import { getRecommendations } from "@/lib/recommendation";
import { validatePathfinderModuleManifest } from "@/lib/pathfinder-validation";
import type { AnswerMap, SurveyQuestion } from "@/lib/types";
import {
  templatePathfinderDefinition,
  templatePathfinderModule,
} from "@/templates/pathfinder-module";

const definition = templatePathfinderDefinition;
const recommendationContext = {
  questions: definition.survey.questions,
  niches: definition.recommendations.niches,
  openExplorationIds: definition.recommendations.openExplorationIds,
  scoring: definition.recommendations.scoring,
};

function firstSpecificAnswer(question: SurveyQuestion): string[] {
  return [question.options.find((option) => !option.uncertainty)!.id];
}

function completePath(motivationId: string): AnswerMap {
  const answers: AnswerMap = {
    [definition.survey.branchQuestionId]: [motivationId],
  };

  for (const question of getVisibleQuestions(
    answers,
    definition.survey.questions,
  )) {
    answers[question.id] ??= firstSpecificAnswer(question);
  }
  return answers;
}

describe("reusable pathfinder module template", () => {
  it("assembles a serializable definition without registering a live module", () => {
    expect(() => JSON.stringify(definition)).not.toThrow();
    expect(
      pathfinderModules.some(
        (moduleEntry) =>
          moduleEntry.definition.identity.id === definition.identity.id,
      ),
    ).toBe(false);
    expect(createPathfinderMetadata(templatePathfinderModule)).toMatchObject({
      title: definition.identity.name,
      alternates: { canonical: definition.identity.route },
    });
    expect(validatePathfinderModuleManifest(templatePathfinderModule)).toEqual({
      valid: true,
      issues: [],
    });
  });

  it.each(["systems", "data", "methods", "open"])(
    "provides a complete adaptive %s journey",
    (motivationId) => {
      const answers = completePath(motivationId);
      const visible = getVisibleQuestions(answers, definition.survey.questions);

      expect(visible).toHaveLength(10);
      expect(visible.every((question) => answers[question.id]?.length)).toBe(
        true,
      );
      expect(
        getRecommendations(answers, undefined, recommendationContext),
      ).toHaveLength(3);
    },
  );

  it("keeps calibration and uncertainty neutral", () => {
    for (const question of definition.survey.questions) {
      const uncertainty = question.options.filter(
        (option) => option.uncertainty,
      );
      expect(uncertainty, question.id).toHaveLength(1);
      expect(uncertainty[0].signals, question.id).toBeUndefined();
      expect(uncertainty[0].nicheBoosts, question.id).toBeUndefined();

      if (question.stage === "calibration") {
        expect(definition.survey.calibrationQuestionIds).toContain(question.id);
        expect(
          question.options.every(
            (option) => !option.signals && !option.nicheBoosts,
          ),
          question.id,
        ).toBe(true);
      }
    }
  });

  it("keeps every direct boost connected to a real direction", () => {
    const nicheIds = new Set(
      definition.recommendations.niches.map((niche) => niche.id),
    );
    for (const question of definition.survey.questions) {
      for (const option of question.options) {
        for (const nicheId of Object.keys(option.nicheBoosts ?? {})) {
          expect(nicheIds.has(nicheId), `${question.id}:${option.id}`).toBe(
            true,
          );
        }
      }
    }
  });

  it("formats a stable exploration profile", () => {
    const output = formatResearchProfile(
      completePath("systems"),
      undefined,
      definition,
    );

    expect(output).toContain("TEMPLATE SCIENCE EXPLORATION PROFILE");
    expect(output).toContain("PRIMARY DIRECTION");
    expect(output).toContain("NEARBY ALTERNATIVES");
    expect(output).toContain("SUGGESTED SEARCHES");
    expect(output).toContain("Verify citations");
  });
});
