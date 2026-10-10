import { describe, expect, it } from "vitest";
import { hubOrientationSignals } from "@/data/hub-orientation-signals";
import {
  pathfinderModules,
  quantumChemistryModule,
} from "@/data/pathfinder-modules";
import type {
  HubOrientationEvidence,
  HubOrientationSignalDefinition,
} from "@/lib/hub-orientation";
import {
  getHubOrientationSuggestions,
  rankHubOrientation,
} from "@/lib/hub-orientation-ranking";
import { validateHubOrientationConfiguration } from "@/lib/hub-orientation-validation";
import type { PathfinderModuleManifest } from "@/lib/pathfinder-manifest";

function evidence(
  signalId: string,
  label: string,
  weight = 3,
): HubOrientationEvidence {
  return { signalId, label, weight };
}

describe("hub orientation configuration", () => {
  it("validates every released module against the shared vocabulary", () => {
    expect(
      validateHubOrientationConfiguration(
        pathfinderModules,
        hubOrientationSignals,
      ),
    ).toEqual({ valid: true, issues: [] });
  });

  it("keeps signal IDs unique and covers every orientation dimension", () => {
    expect(new Set(hubOrientationSignals.map((signal) => signal.id)).size).toBe(
      hubOrientationSignals.length,
    );
    expect(
      new Set(hubOrientationSignals.map((signal) => signal.dimension)),
    ).toEqual(new Set(["motivation", "system", "question", "working-style"]));
  });

  it("reports missing profiles, unavailable profiles, and malformed affinities", () => {
    const missingProfile = structuredClone(
      pathfinderModules,
    ) as unknown as PathfinderModuleManifest[];
    missingProfile[0].orientation = undefined;

    expect(
      validateHubOrientationConfiguration(
        missingProfile,
        hubOrientationSignals,
      ).issues.map((entry) => entry.code),
    ).toContain("orientation.missing-module-profile");

    const comingSoon: PathfinderModuleManifest = {
      lifecycle: "coming-soon",
      identity: {
        id: "future-field",
        name: "Future Field Pathfinder",
        shortName: "Future field",
        icon: "atom",
      },
      catalog: quantumChemistryModule.catalog,
      orientation: quantumChemistryModule.orientation,
    };
    expect(
      validateHubOrientationConfiguration(
        [comingSoon],
        hubOrientationSignals,
      ).issues.map((entry) => entry.code),
    ).toContain("orientation.unavailable-module-profile");

    const malformed = structuredClone(
      pathfinderModules,
    ) as unknown as PathfinderModuleManifest[];
    const profile = malformed[0].orientation;
    if (!profile) throw new Error("Expected a copied orientation profile.");
    const first = profile.affinities[0] as {
      signalId: string;
      strength: number;
      reason: string;
    };
    first.signalId = "motivation:not-registered";
    first.strength = 4;
    first.reason = "Too short";

    const codes = validateHubOrientationConfiguration(
      malformed,
      hubOrientationSignals,
    ).issues.map((entry) => entry.code);
    expect(codes).toContain("orientation.unknown-affinity-signal");
    expect(codes).toContain("orientation.invalid-affinity-strength");
    expect(codes).toContain("orientation.weak-affinity-reason");
  });

  it("rejects duplicate or mismatched vocabulary entries", () => {
    const signals: HubOrientationSignalDefinition[] = [
      ...hubOrientationSignals,
      {
        ...hubOrientationSignals[0],
        dimension: "system",
      },
    ];
    const codes = validateHubOrientationConfiguration(
      pathfinderModules,
      signals,
    ).issues.map((entry) => entry.code);

    expect(codes).toContain("orientation.duplicate-signal-definition");
    expect(codes).toContain("orientation.signal-dimension-mismatch");
  });
});

describe("hub orientation ranking", () => {
  it.each([
    [
      "quantum-chemistry",
      [
        evidence("system:molecules-electrons", "Molecules and electrons"),
        evidence(
          "working-style:chemical-mechanisms",
          "Chemical structures and mechanisms",
        ),
      ],
    ],
    [
      "computational-materials",
      [
        evidence("motivation:materials-technology", "Materials and technology"),
        evidence("system:materials-interfaces", "Materials and interfaces"),
        evidence("question:design-optimize", "Design or optimize something"),
      ],
    ],
    [
      "computational-biology",
      [
        evidence("motivation:living-systems", "Living systems"),
        evidence("system:genes-populations", "Genes and populations"),
        evidence("working-style:data-statistics", "Data and statistics"),
      ],
    ],
    [
      "computational-physics",
      [
        evidence("motivation:space-universe", "Space and the universe"),
        evidence("system:particles-fields", "Particles and fields"),
        evidence("working-style:mathematical-models", "Mathematical models"),
      ],
    ],
  ])(
    "makes %s reachable through a reasonable preference path",
    (id, answers) => {
      expect(
        rankHubOrientation(pathfinderModules, hubOrientationSignals, answers)[0]
          .pathfinderId,
      ).toBe(id);
    },
  );

  it("keeps all possibilities open when answers are uncertain", () => {
    const rankings = rankHubOrientation(
      pathfinderModules,
      hubOrientationSignals,
      [
        {
          signalId: "system:molecules-electrons",
          label: "I am not sure yet",
          weight: 3,
          uncertainty: true,
        },
      ],
    );

    expect(rankings.map((ranking) => ranking.score)).toEqual([0, 0, 0, 0]);
    expect(rankings.map((ranking) => ranking.pathfinderId)).toEqual([
      "quantum-chemistry",
      "computational-materials",
      "computational-biology",
      "computational-physics",
    ]);
    expect(rankings.every((ranking) => ranking.reasons.length === 0)).toBe(
      true,
    );
  });

  it("lets strong preferences outweigh weaker neighboring signals", () => {
    const rankings = rankHubOrientation(
      pathfinderModules,
      hubOrientationSignals,
      [
        evidence("system:molecules-electrons", "Molecules and electrons", 3),
        evidence("system:particles-fields", "Particles and fields", 1),
      ],
    );

    expect(rankings[0].pathfinderId).toBe("quantum-chemistry");
    expect(rankings[0].score).toBeGreaterThan(rankings[1].score);
  });

  it("balances conflicting preferences and preserves transparent reasons", () => {
    const rankings = rankHubOrientation(
      pathfinderModules,
      hubOrientationSignals,
      [
        evidence("system:materials-interfaces", "Materials and interfaces"),
        evidence("system:genes-populations", "Genes and populations"),
      ],
    );

    expect(rankings.slice(0, 2).map((ranking) => ranking.pathfinderId)).toEqual(
      ["computational-materials", "computational-biology"],
    );
    expect(rankings[0].score).toBe(rankings[1].score);
    expect(rankings[0].reasons[0].answerLabel).toBe("Materials and interfaces");
    expect(rankings[1].reasons[0].answerLabel).toBe("Genes and populations");
  });

  it("uses the strongest repeated evidence instead of double counting", () => {
    const rankings = rankHubOrientation(
      pathfinderModules,
      hubOrientationSignals,
      [
        evidence("system:molecules-electrons", "Molecules", 1),
        evidence("system:molecules-electrons", "Molecules and electrons", 3),
      ],
    );

    expect(rankings[0].pathfinderId).toBe("quantum-chemistry");
    expect(rankings[0].score).toBe(9);
    expect(rankings[0].reasons).toHaveLength(1);
    expect(rankings[0].reasons[0].answerLabel).toBe("Molecules and electrons");
  });

  it("returns the first two ranked modules as suggestions", () => {
    const rankings = rankHubOrientation(
      pathfinderModules,
      hubOrientationSignals,
      [evidence("motivation:living-systems", "Living systems")],
    );
    const suggestions = getHubOrientationSuggestions(rankings);

    expect(suggestions.primary).toBe(rankings[0]);
    expect(suggestions.alternative).toBe(rankings[1]);
  });
});
