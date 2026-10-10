import type {
  HubOrientationEvidence,
  HubOrientationRanking,
  HubOrientationSignalDefinition,
} from "@/lib/hub-orientation";
import type { PathfinderModuleManifest } from "@/lib/pathfinder-manifest";

function consolidateEvidence(
  evidence: readonly HubOrientationEvidence[],
): ReadonlyMap<string, HubOrientationEvidence> {
  const strongestBySignal = new Map<string, HubOrientationEvidence>();

  for (const item of evidence) {
    if (
      item.uncertainty ||
      !item.signalId.trim() ||
      !item.label.trim() ||
      !Number.isFinite(item.weight) ||
      item.weight <= 0
    )
      continue;

    const current = strongestBySignal.get(item.signalId);
    if (!current || item.weight > current.weight)
      strongestBySignal.set(item.signalId, item);
  }

  return strongestBySignal;
}

export function rankHubOrientation(
  manifests: readonly PathfinderModuleManifest[],
  signals: readonly HubOrientationSignalDefinition[],
  evidence: readonly HubOrientationEvidence[],
): HubOrientationRanking[] {
  const signalById = new Map(signals.map((signal) => [signal.id, signal]));
  const evidenceBySignal = consolidateEvidence(evidence);

  return manifests
    .flatMap((manifest, registryIndex) => {
      if (manifest.lifecycle !== "available" || !manifest.orientation)
        return [];

      const reasons = manifest.orientation.affinities.flatMap(
        (affinity, affinityIndex) => {
          const answer = evidenceBySignal.get(affinity.signalId);
          const signal = signalById.get(affinity.signalId);
          if (!answer || !signal) return [];

          return [
            {
              signalId: affinity.signalId,
              dimension: signal.dimension,
              answerLabel: answer.label,
              text: affinity.reason,
              contribution: answer.weight * affinity.strength,
              affinityIndex,
            },
          ];
        },
      );

      reasons.sort(
        (left, right) =>
          right.contribution - left.contribution ||
          left.affinityIndex - right.affinityIndex,
      );

      return [
        {
          pathfinderId: manifest.definition.identity.id,
          score: reasons.reduce(
            (total, reason) => total + reason.contribution,
            0,
          ),
          reasons: reasons.map((reason) => ({
            signalId: reason.signalId,
            dimension: reason.dimension,
            answerLabel: reason.answerLabel,
            text: reason.text,
            contribution: reason.contribution,
          })),
          registryIndex,
        },
      ];
    })
    .sort(
      (left, right) =>
        right.score - left.score || left.registryIndex - right.registryIndex,
    )
    .map((ranking) => ({
      pathfinderId: ranking.pathfinderId,
      score: ranking.score,
      reasons: ranking.reasons,
    }));
}

export function getHubOrientationSuggestions(
  rankings: readonly HubOrientationRanking[],
): {
  primary?: HubOrientationRanking;
  alternative?: HubOrientationRanking;
} {
  return {
    primary: rankings[0],
    alternative: rankings[1],
  };
}
