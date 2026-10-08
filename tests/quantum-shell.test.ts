import { describe, expect, it } from "vitest";
import QuantumChemistryPathfinderPage, {
  metadata,
} from "@/app/pathfinders/quantum-chemistry/page";
import { quantumChemistryModule } from "@/data/pathfinder-modules";
import { createPathfinderMetadata } from "@/lib/pathfinder-metadata";

describe("quantum chemistry route shell", () => {
  it("uses its registered definition and standardized metadata", () => {
    expect(metadata).toEqual(createPathfinderMetadata(quantumChemistryModule));
    expect(metadata).toMatchObject({
      title: "Quantum Chemistry Pathfinder",
      alternates: { canonical: "/pathfinders/quantum-chemistry" },
      openGraph: { url: "/pathfinders/quantum-chemistry" },
    });
    expect(QuantumChemistryPathfinderPage()).toBeDefined();
  });
});
