import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { pathfinderModules } from "@/data/pathfinder-modules";

const matrix = readFileSync(
  "docs/interdisciplinary-bridge-review-matrix.md",
  "utf8",
);
const releasedIds = pathfinderModules.flatMap((moduleEntry) =>
  moduleEntry.lifecycle === "available"
    ? moduleEntry.definition.interdisciplinaryLinks.map((link) => link.id)
    : [],
);
const matrixIds = [...matrix.matchAll(/^\|\s*`([^`]+)`\s*\|/gm)].map(
  (match) => match[1],
);

describe("interdisciplinary scientific review matrix", () => {
  it("records every released bridge exactly once", () => {
    expect(matrixIds).toHaveLength(35);
    expect(new Set(matrixIds).size).toBe(matrixIds.length);
    expect(matrixIds.toSorted()).toEqual(releasedIds.toSorted());
  });

  it("records evidence, boundaries, terminology, and review status", () => {
    expect(matrix).toMatch(
      /^\| Bridge ID\s+\| Evidence basis\s+\| Boundary recorded\s+\| Terminology reviewed\s+\| Status\s+\|$/m,
    );
    expect(matrix.match(/\| Reviewed\s+\|$/gm)).toHaveLength(35);
    for (const id of releasedIds) {
      const row = matrix
        .split("\n")
        .find((line) => line.startsWith("| `" + id + "`"));
      expect(row, id).toBeDefined();
      expect(
        row
          ?.split("|")
          .slice(2, 5)
          .every((cell) => cell.trim()),
      ).toBe(true);
    }
  });
});
