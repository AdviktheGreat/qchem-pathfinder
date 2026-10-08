import type { SurveyOption } from "@/lib/types";

const defaultDescription =
  "Keep the possibilities open. This answer adds no negative evidence and does not limit your directions.";

export function createTemplateUncertaintyOption(
  label = "I’m not sure yet",
  description = defaultDescription,
): SurveyOption {
  return {
    id: "unsure",
    label,
    description,
    uncertainty: true,
  };
}

export const templateUnsureOption = createTemplateUncertaintyOption();
