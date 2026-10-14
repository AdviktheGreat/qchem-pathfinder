import { GitBranch, LockKeyhole } from "lucide-react";

export function HubOrientationBridge({
  primaryName,
  alternativeName,
}: {
  primaryName: string;
  alternativeName: string;
}) {
  return (
    <aside
      className="hub-orientation-bridge"
      aria-labelledby="hub-orientation-bridge-title"
    >
      <span className="hub-orientation-bridge-icon" aria-hidden="true">
        <GitBranch size={20} />
      </span>
      <div>
        <p className="section-kicker">Fields overlap by design</p>
        <h3 id="hub-orientation-bridge-title">
          A starting point is not a closed door.
        </h3>
        <p>
          {primaryName} and {alternativeName} can meet around shared systems,
          methods, or applications. Begin with one field’s full map, then use
          its interdisciplinary bridges to inspect the neighboring lens.
        </p>
      </div>
      <p className="hub-orientation-bridge-privacy">
        <LockKeyhole size={16} aria-hidden="true" /> These short-guide answers
        are not copied into either subject survey.
      </p>
    </aside>
  );
}
