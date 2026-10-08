export const pathfinderLifecycleStages = [
  "draft",
  "testing",
  "coming-soon",
  "available",
] as const;

export type PathfinderLifecycleStage =
  (typeof pathfinderLifecycleStages)[number];
export type PathfinderCatalogStatus = Extract<
  PathfinderLifecycleStage,
  "coming-soon" | "available"
>;

export const pathfinderLifecycleRequirements = {
  draft: "Subject content is being authored and must not appear in the hub.",
  testing:
    "The complete local experience is under review and must not appear in the hub.",
  "coming-soon":
    "The roadmap may appear in the hub, but it must not link to an unfinished route.",
  available:
    "The complete, tested experience has a stable route and can launch from the hub.",
} as const satisfies Record<PathfinderLifecycleStage, string>;

export function appearsInCatalog(stage: PathfinderLifecycleStage): boolean {
  return stage === "coming-soon" || stage === "available";
}

export function canLaunchPathfinder(
  stage: PathfinderLifecycleStage,
): stage is "available" {
  return stage === "available";
}
