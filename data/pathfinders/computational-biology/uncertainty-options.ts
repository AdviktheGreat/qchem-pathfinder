import type { SurveyOption } from "@/lib/types";

export const biologyUnsureOption = {
  id: "unsure",
  label: "I’m not sure yet",
  description:
    "Keep the possibilities open; this will shape context and preparation guidance, not limit your directions.",
  uncertainty: true,
} satisfies SurveyOption;

export function createBiologyOpenOption(
  label: string,
  description: string,
): SurveyOption {
  return {
    id: "open",
    label,
    description,
    uncertainty: true,
  };
}
