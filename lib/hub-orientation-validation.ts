import type {
  HubOrientationDimension,
  HubOrientationProfile,
  HubOrientationSignalDefinition,
} from "@/lib/hub-orientation";
import type { PathfinderModuleManifest } from "@/lib/pathfinder-manifest";

export interface HubOrientationValidationIssue {
  code: string;
  path: string;
  message: string;
}

export interface HubOrientationValidationResult {
  valid: boolean;
  issues: HubOrientationValidationIssue[];
}

const dimensions: readonly HubOrientationDimension[] = [
  "motivation",
  "system",
  "question",
  "working-style",
];

function issue(
  code: string,
  path: string,
  message: string,
): HubOrientationValidationIssue {
  return { code, path, message };
}

function validateSignalDefinitions(
  signals: readonly HubOrientationSignalDefinition[],
): HubOrientationValidationIssue[] {
  const issues: HubOrientationValidationIssue[] = [];
  const ids = new Set<string>();

  signals.forEach((signal, index) => {
    const path = `signals[${index}]`;
    if (!/^[a-z]+(?:-[a-z]+)*:[a-z0-9]+(?:-[a-z0-9]+)*$/.test(signal.id))
      issues.push(
        issue(
          "orientation.invalid-signal-id",
          `${path}.id`,
          "Orientation signal IDs must use a lowercase dimension:value format.",
        ),
      );
    if (!signal.id.startsWith(`${signal.dimension}:`))
      issues.push(
        issue(
          "orientation.signal-dimension-mismatch",
          `${path}.dimension`,
          `Signal “${signal.id}” must use its declared dimension as the ID namespace.`,
        ),
      );
    if (ids.has(signal.id))
      issues.push(
        issue(
          "orientation.duplicate-signal-definition",
          `${path}.id`,
          `Signal “${signal.id}” is defined more than once.`,
        ),
      );
    ids.add(signal.id);
    if (!signal.label.trim() || !signal.description.trim())
      issues.push(
        issue(
          "orientation.incomplete-signal-copy",
          path,
          "Every orientation signal needs a label and accessible description.",
        ),
      );
  });

  for (const dimension of dimensions) {
    if (!signals.some((signal) => signal.dimension === dimension))
      issues.push(
        issue(
          "orientation.missing-signal-dimension",
          "signals",
          `The orientation vocabulary needs at least one “${dimension}” signal.`,
        ),
      );
  }

  return issues;
}

function validateProfile(
  profile: HubOrientationProfile,
  modulePath: string,
  signalById: ReadonlyMap<string, HubOrientationSignalDefinition>,
): HubOrientationValidationIssue[] {
  const issues: HubOrientationValidationIssue[] = [];
  const usedSignals = new Set<string>();
  const coveredDimensions = new Set<HubOrientationDimension>();

  if (!profile.summary.trim() || !profile.boundary.trim())
    issues.push(
      issue(
        "orientation.incomplete-profile-copy",
        `${modulePath}.orientation`,
        "Orientation profiles need a clear scientific summary and boundary.",
      ),
    );

  profile.affinities.forEach((affinity, index) => {
    const path = `${modulePath}.orientation.affinities[${index}]`;
    const signal = signalById.get(affinity.signalId);

    if (!signal)
      issues.push(
        issue(
          "orientation.unknown-affinity-signal",
          `${path}.signalId`,
          `Affinity refers to unknown signal “${affinity.signalId}”.`,
        ),
      );
    else coveredDimensions.add(signal.dimension);

    if (usedSignals.has(affinity.signalId))
      issues.push(
        issue(
          "orientation.duplicate-affinity-signal",
          `${path}.signalId`,
          `Signal “${affinity.signalId}” appears more than once in this profile.`,
        ),
      );
    usedSignals.add(affinity.signalId);

    if (
      !Number.isInteger(affinity.strength) ||
      affinity.strength < 1 ||
      affinity.strength > 3
    )
      issues.push(
        issue(
          "orientation.invalid-affinity-strength",
          `${path}.strength`,
          "Affinity strength must be an integer from 1 to 3.",
        ),
      );
    if (affinity.reason.trim().length < 30)
      issues.push(
        issue(
          "orientation.weak-affinity-reason",
          `${path}.reason`,
          "Each affinity needs a specific student-facing explanation of at least 30 characters.",
        ),
      );
  });

  for (const dimension of dimensions) {
    if (!coveredDimensions.has(dimension))
      issues.push(
        issue(
          "orientation.missing-profile-dimension",
          `${modulePath}.orientation.affinities`,
          `The profile needs at least one “${dimension}” affinity.`,
        ),
      );
  }

  return issues;
}

export function validateHubOrientationConfiguration(
  manifests: readonly PathfinderModuleManifest[],
  signals: readonly HubOrientationSignalDefinition[],
): HubOrientationValidationResult {
  const issues = validateSignalDefinitions(signals);
  const signalById = new Map(signals.map((signal) => [signal.id, signal]));

  manifests.forEach((manifest, index) => {
    const modulePath = `modules[${index}]`;
    if (manifest.lifecycle !== "available") {
      if (manifest.orientation)
        issues.push(
          issue(
            "orientation.unavailable-module-profile",
            `${modulePath}.orientation`,
            "Coming-soon modules cannot participate in orientation recommendations.",
          ),
        );
      return;
    }

    if (!manifest.orientation) {
      issues.push(
        issue(
          "orientation.missing-module-profile",
          `${modulePath}.orientation`,
          `Available module “${manifest.definition.identity.id}” needs an orientation profile.`,
        ),
      );
      return;
    }

    issues.push(
      ...validateProfile(manifest.orientation, modulePath, signalById),
    );
  });

  return { valid: issues.length === 0, issues };
}
