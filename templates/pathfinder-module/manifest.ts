import { definePathfinderModule } from "@/lib/pathfinder-manifest";
import { templatePathfinderDefinition } from "@/templates/pathfinder-module/pathfinder";

// This complete example remains intentionally absent from pathfinderModules.
export const templatePathfinderModule = definePathfinderModule({
  lifecycle: "available",
  definition: templatePathfinderDefinition,
  catalog: {
    eyebrow: "Systems, evidence, and computational methods",
    description:
      "A type-checked example showing how a new research pathfinder is assembled.",
    outcome:
      "Use this local template to author and validate a subject before release.",
    focusAreas: ["Systems", "Evidence", "Methods"],
    duration: "About 10 minutes",
  },
  metadata: {
    description:
      "A local reference module for building another Research Pathfinder subject.",
    openGraphDescription:
      "A type-checked reference for a focused, adaptive research-orientation experience.",
  },
});
