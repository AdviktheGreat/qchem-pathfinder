import { describe, expect, it } from "vitest";
import ComputationalMaterialsPathfinderPage, {
  metadata,
} from "@/app/pathfinders/computational-materials/page";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { getPathfinder } from "@/data/pathfinders";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";

describe("computational materials pathfinder shell", () => {
  it("defines a distinct pathfinder identity and storage namespace", () => {
    expect(computationalMaterialsPathfinder.identity).toMatchObject({
      id: "computational-materials",
      route: "/pathfinders/computational-materials",
      icon: "material",
    });
    expect(computationalMaterialsPathfinder.storage.key).not.toBe(
      quantumChemistryPathfinder.storage.key,
    );
    expect(computationalMaterialsPathfinder.profile.exportTitle).toBe(
      "COMPUTATIONAL MATERIALS EXPLORATION PROFILE",
    );
  });

  it("keeps the unfinished survey out of the interactive hub", () => {
    const catalogEntry = getPathfinder("computational-materials");
    expect(catalogEntry?.status).toBe("coming-soon");
    expect(catalogEntry?.href).toBeUndefined();
    expect(
      computationalMaterialsPathfinder.survey.questions.filter(
        (question) => question.stage === "calibration",
      ),
    ).toHaveLength(6);
    expect(
      computationalMaterialsPathfinder.survey.questions.filter(
        (question) => question.stage === "motivation",
      ),
    ).toHaveLength(1);
    expect(
      computationalMaterialsPathfinder.survey.questions.filter(
        (question) => question.stage === "question",
      ),
    ).toHaveLength(1);
  });

  it("publishes route metadata without exposing an incomplete experience", () => {
    expect(metadata).toMatchObject({
      title: "Computational Materials Pathfinder",
      description: expect.stringContaining("computational materials"),
    });
    expect(() => ComputationalMaterialsPathfinderPage()).toThrow(
      "NEXT_HTTP_ERROR_FALLBACK;404",
    );
  });
});
