import {
  ArrowDown,
  GitBranch,
  Layers3,
  Network,
  ScanSearch,
} from "lucide-react";
import { pathfinderModules } from "@/data/pathfinder-modules";

export function HubInterdisciplinaryOverview() {
  const bridgeCount = pathfinderModules.reduce(
    (total, moduleEntry) =>
      total + moduleEntry.definition.interdisciplinaryLinks.length,
    0,
  );

  return (
    <section
      className="hub-interdisciplinary-overview"
      aria-labelledby="hub-bridges-title"
    >
      <div className="hub-bridges-copy">
        <p className="section-kicker">
          <Network size={15} aria-hidden="true" /> Fields connect after the
          result
        </p>
        <h2 id="hub-bridges-title">
          Choose a home field. Keep the neighboring doors visible.
        </h2>
        <p>
          Some result directions include a curated bridge into another
          pathfinder. A bridge shows the question the fields share, where their
          lenses differ, and search language for exploring the overlap.
        </p>
        <div className="hub-bridge-count" aria-label="Bridge collection size">
          <strong>{bridgeCount}</strong>
          <span>
            curated connections across {pathfinderModules.length} complete
            pathfinders
          </span>
        </div>
        <a href="#directory-title">
          Choose a starting field <ArrowDown size={15} aria-hidden="true" />
        </a>
      </div>
      <div
        className="hub-bridge-principles"
        aria-label="What a bridge can share"
      >
        <article>
          <GitBranch size={18} aria-hidden="true" />
          <div>
            <strong>Shared questions</strong>
            <p>Carry one research question across two scientific lenses.</p>
          </div>
        </article>
        <article>
          <Layers3 size={18} aria-hidden="true" />
          <div>
            <strong>Connected scales</strong>
            <p>
              See how molecules, materials, organisms, and physical systems
              meet.
            </p>
          </div>
        </article>
        <article>
          <ScanSearch size={18} aria-hidden="true" />
          <div>
            <strong>Searchable overlap</strong>
            <p>
              Copy broad, focused, and review searches for the intersection.
            </p>
          </div>
        </article>
        <p className="hub-bridge-boundary">
          Bridges never transfer survey answers or compare fit scores between
          fields. Each pathfinder remains its own fresh exploration.
        </p>
      </div>
    </section>
  );
}
