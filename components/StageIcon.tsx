import {
  Atom,
  Binoculars,
  CircleGauge,
  FlaskConical,
  Route,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";
import type { SurveyStage } from "@/lib/types";

const stageIcons = {
  calibration: CircleGauge,
  motivation: Binoculars,
  narrowing: Route,
  question: FlaskConical,
  style: Atom,
} satisfies Record<SurveyStage, ComponentType<LucideProps>>;

export function StageIcon({
  stage,
  ...props
}: LucideProps & { stage: SurveyStage }) {
  const Icon = stageIcons[stage];
  return <Icon aria-hidden="true" {...props} />;
}
