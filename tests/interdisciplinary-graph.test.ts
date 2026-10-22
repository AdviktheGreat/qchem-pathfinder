import { describe, expect, it } from "vitest";
import { pathfinderModules } from "@/data/pathfinder-modules";
import {
  buildInterdisciplinaryGraph,
  getIncomingInterdisciplinaryEdges,
  getOutgoingInterdisciplinaryEdges,
  groupInterdisciplinaryEdgesByConnection,
  groupInterdisciplinaryEdgesByDestination,
} from "@/lib/interdisciplinary-graph";

const graph = buildInterdisciplinaryGraph(pathfinderModules);

describe("interdisciplinary graph indexing", () => {
  it("indexes every curated bridge exactly once", () => {
    const registeredIds = pathfinderModules.flatMap((moduleEntry) =>
      moduleEntry.lifecycle === "available"
        ? moduleEntry.definition.interdisciplinaryLinks.map((link) => link.id)
        : [],
    );

    expect(graph.edges).toHaveLength(35);
    expect(graph.edges.map((edge) => edge.id)).toEqual(registeredIds);
    expect(new Set(graph.edges.map((edge) => edge.id)).size).toBe(
      graph.edges.length,
    );
  });

  it("keeps incoming and outgoing indexes directional", () => {
    const outgoing = getOutgoingInterdisciplinaryEdges(
      graph,
      "quantum-chemistry",
      "charge-transfer",
    );
    const incoming = getIncomingInterdisciplinaryEdges(
      graph,
      "quantum-chemistry",
      "charge-transfer",
    );

    expect(outgoing.map((edge) => edge.id)).toEqual([
      "qchem-charge-transfer-materials-photovoltaics",
    ]);
    expect(incoming.map((edge) => edge.id)).toEqual([
      "materials-photovoltaics-qchem-charge-transfer",
    ]);
    expect(outgoing[0].source.nicheName).toBe("Molecular charge transfer");
    expect(incoming[0].target.nicheName).toBe("Molecular charge transfer");
  });

  it("groups a field's edges by canonical destination", () => {
    const edges = getOutgoingInterdisciplinaryEdges(
      graph,
      "computational-materials",
    );

    expect(
      groupInterdisciplinaryEdgesByDestination(edges).map((group) => ({
        id: group.pathfinderId,
        name: group.pathfinderName,
        edgeIds: group.edges.map((edge) => edge.id),
      })),
    ).toEqual([
      {
        id: "quantum-chemistry",
        name: "Quantum chemistry",
        edgeIds: [
          "materials-photovoltaics-qchem-charge-transfer",
          "materials-electrocatalysis-qchem-catalysis",
          "materials-batteries-qchem-energy-conversion",
          "materials-porous-storage-qchem-noncovalent",
        ],
      },
      {
        id: "computational-biology",
        name: "Computational biology",
        edgeIds: [
          "materials-biomaterials-biology-dynamics",
          "materials-ml-biology-prediction",
        ],
      },
      {
        id: "computational-physics",
        name: "Computational physics",
        edgeIds: [
          "materials-quantum-physics-many-body",
          "materials-solid-electrolytes-physics-transport",
          "materials-spintronics-physics-lattice-spin",
        ],
      },
    ]);
  });

  it("groups shared lenses in the declared vocabulary order", () => {
    const edge = graph.edges.find(
      (candidate) =>
        candidate.id === "qchem-charge-transfer-materials-photovoltaics",
    );
    expect(edge).toBeDefined();

    expect(
      groupInterdisciplinaryEdgesByConnection([edge!]).map((group) => ({
        kind: group.kind,
        edgeIds: group.edges.map((entry) => entry.id),
      })),
    ).toEqual([
      {
        kind: "shared-question",
        edgeIds: ["qchem-charge-transfer-materials-photovoltaics"],
      },
      {
        kind: "connected-scales",
        edgeIds: ["qchem-charge-transfer-materials-photovoltaics"],
      },
    ]);
  });

  it("returns empty collections for unknown or deliberately unconnected nodes", () => {
    expect(
      getOutgoingInterdisciplinaryEdges(graph, "missing-pathfinder"),
    ).toEqual([]);
    expect(
      getIncomingInterdisciplinaryEdges(graph, "missing-pathfinder"),
    ).toEqual([]);
    expect(
      getOutgoingInterdisciplinaryEdges(
        graph,
        "quantum-chemistry",
        "fundamental-electronic-structure",
      ),
    ).toEqual([]);
    expect(
      getIncomingInterdisciplinaryEdges(
        graph,
        "quantum-chemistry",
        "fundamental-electronic-structure",
      ),
    ).toEqual([]);
    expect(groupInterdisciplinaryEdgesByDestination([])).toEqual([]);
    expect(groupInterdisciplinaryEdgesByConnection([])).toEqual([]);
  });
});
