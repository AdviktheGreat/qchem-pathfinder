import { resolveInterdisciplinaryDestination } from "@/lib/interdisciplinary-destinations";
import {
  INTERDISCIPLINARY_CONNECTION_KINDS,
  type InterdisciplinaryConnectionKind,
  type InterdisciplinaryLink,
} from "@/lib/interdisciplinary-links";
import type { PathfinderModuleManifest } from "@/lib/pathfinder-manifest";

export interface InterdisciplinaryGraphNode {
  pathfinderId: string;
  pathfinderName: string;
  nicheId: string;
  nicheName: string;
}

export interface InterdisciplinaryGraphEdge {
  id: string;
  source: InterdisciplinaryGraphNode;
  target: InterdisciplinaryGraphNode;
  link: InterdisciplinaryLink;
}

export interface InterdisciplinaryGraph {
  edges: readonly InterdisciplinaryGraphEdge[];
}

export interface InterdisciplinaryDestinationGroup {
  pathfinderId: string;
  pathfinderName: string;
  edges: readonly InterdisciplinaryGraphEdge[];
}

export interface InterdisciplinaryConnectionGroup {
  kind: InterdisciplinaryConnectionKind;
  edges: readonly InterdisciplinaryGraphEdge[];
}

export function buildInterdisciplinaryGraph(
  manifests: readonly PathfinderModuleManifest[],
): InterdisciplinaryGraph {
  const edges: InterdisciplinaryGraphEdge[] = [];

  for (const manifest of manifests) {
    if (manifest.lifecycle !== "available") continue;
    for (const link of manifest.definition.interdisciplinaryLinks) {
      const sourceNiche = manifest.definition.recommendations.niches.find(
        (niche) => niche.id === link.sourceNicheId,
      );
      const target = resolveInterdisciplinaryDestination(link, manifests);
      if (!sourceNiche || !target) continue;

      edges.push({
        id: link.id,
        source: {
          pathfinderId: manifest.definition.identity.id,
          pathfinderName: manifest.definition.identity.shortName,
          nicheId: sourceNiche.id,
          nicheName: sourceNiche.name,
        },
        target,
        link,
      });
    }
  }

  return { edges };
}

export function getOutgoingInterdisciplinaryEdges(
  graph: InterdisciplinaryGraph,
  pathfinderId: string,
  nicheId?: string,
): InterdisciplinaryGraphEdge[] {
  return graph.edges.filter(
    (edge) =>
      edge.source.pathfinderId === pathfinderId &&
      (!nicheId || edge.source.nicheId === nicheId),
  );
}

export function getIncomingInterdisciplinaryEdges(
  graph: InterdisciplinaryGraph,
  pathfinderId: string,
  nicheId?: string,
): InterdisciplinaryGraphEdge[] {
  return graph.edges.filter(
    (edge) =>
      edge.target.pathfinderId === pathfinderId &&
      (!nicheId || edge.target.nicheId === nicheId),
  );
}

export function groupInterdisciplinaryEdgesByDestination(
  edges: readonly InterdisciplinaryGraphEdge[],
): InterdisciplinaryDestinationGroup[] {
  const groups = new Map<string, InterdisciplinaryDestinationGroup>();
  for (const edge of edges) {
    const current = groups.get(edge.target.pathfinderId);
    if (current) {
      groups.set(edge.target.pathfinderId, {
        ...current,
        edges: [...current.edges, edge],
      });
    } else {
      groups.set(edge.target.pathfinderId, {
        pathfinderId: edge.target.pathfinderId,
        pathfinderName: edge.target.pathfinderName,
        edges: [edge],
      });
    }
  }
  return [...groups.values()];
}

export function groupInterdisciplinaryEdgesByConnection(
  edges: readonly InterdisciplinaryGraphEdge[],
): InterdisciplinaryConnectionGroup[] {
  return INTERDISCIPLINARY_CONNECTION_KINDS.flatMap((kind) => {
    const matching = edges.filter((edge) =>
      edge.link.connectionKinds.includes(kind),
    );
    return matching.length > 0 ? [{ kind, edges: matching }] : [];
  });
}
