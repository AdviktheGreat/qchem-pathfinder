import { Blocks, Dna, Orbit } from "lucide-react";
import type { PathfinderCatalogEntry } from "@/data/pathfinders";

const previewIcons = {
  "computational-materials": Blocks,
  "computational-biology": Dna,
  "computational-physics": Orbit,
};

export function PathfinderPreviewCard({
  pathfinder,
}: {
  pathfinder: PathfinderCatalogEntry;
}) {
  const Icon =
    previewIcons[pathfinder.id as keyof typeof previewIcons] ?? Blocks;
  const titleId = `${pathfinder.id}-title`;

  return (
    <article className="pathfinder-preview-card" aria-labelledby={titleId}>
      <div className="preview-card-heading">
        <span className="preview-card-icon" aria-hidden="true">
          <Icon size={20} />
        </span>
        <span className="coming-soon-label">Coming later</span>
      </div>
      <p className="eyebrow">{pathfinder.eyebrow}</p>
      <h3 id={titleId}>{pathfinder.name}</h3>
      <p>{pathfinder.description}</p>
      <ul
        className="pathfinder-focus-list"
        aria-label={`${pathfinder.shortName} focus areas`}
      >
        {pathfinder.focusAreas.map((area) => (
          <li key={area}>{area}</li>
        ))}
      </ul>
      <p className="preview-note">
        This pathfinder is shown as part of the roadmap and is not available
        yet.
      </p>
    </article>
  );
}
