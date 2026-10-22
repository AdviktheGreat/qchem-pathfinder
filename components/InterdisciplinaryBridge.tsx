import Link from "next/link";
import { ArrowUpRight, Network, Search } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { InterdisciplinarySearchPanel } from "@/components/InterdisciplinarySearchPanel";
import {
  formatInterdisciplinaryBridgeNote,
  getInterdisciplinaryDestination,
  getInterdisciplinaryConnectionLabel,
  type InterdisciplinaryLink,
} from "@/lib/interdisciplinary-links";

export function InterdisciplinaryBridge({
  links,
  sourcePathfinderName = "This pathfinder",
  sourceDirectionName = "your current direction",
}: {
  links: readonly InterdisciplinaryLink[];
  sourcePathfinderName?: string;
  sourceDirectionName?: string;
}) {
  if (links.length === 0) return null;

  return (
    <section
      className="interdisciplinary-bridge no-print"
      aria-labelledby="interdisciplinary-bridge-title"
    >
      <div className="interdisciplinary-heading">
        <div>
          <p className="section-kicker">
            <Network size={15} aria-hidden="true" /> Across subject boundaries
          </p>
          <h2 id="interdisciplinary-bridge-title" tabIndex={-1}>
            See where this direction meets another field.
          </h2>
        </div>
        <p>
          This is an optional next lens—not another score or a replacement for
          your current result.
        </p>
      </div>

      <div className="interdisciplinary-grid">
        {links.map((link) => {
          return (
            <article key={link.id}>
              <span className="interdisciplinary-subject">
                {link.targetPathfinderName}
              </span>
              <div
                className="interdisciplinary-connection-kinds"
                role="group"
                aria-label={`Connection types for ${link.targetNicheName}`}
              >
                {link.connectionKinds.map((kind) => (
                  <span key={kind}>
                    {getInterdisciplinaryConnectionLabel(kind)}
                  </span>
                ))}
              </div>
              <h3>{link.targetNicheName}</h3>
              <p>{link.bridge}</p>
              <p className="interdisciplinary-why">
                <strong>Why this appeared:</strong> {sourceDirectionName} and{" "}
                {link.targetNicheName} connect through{" "}
                {link.connectionKinds
                  .map(getInterdisciplinaryConnectionLabel)
                  .join(", ")
                  .toLocaleLowerCase()}
                .
              </p>
              <div className="interdisciplinary-shared-question">
                <span>Shared research question</span>
                <p>{link.sharedQuestion}</p>
              </div>
              <div
                className="interdisciplinary-lens-comparison"
                aria-label={`Research lens comparison for ${link.targetNicheName}`}
              >
                <div>
                  <span>Current lens · {sourcePathfinderName}</span>
                  <strong>{sourceDirectionName}</strong>
                </div>
                <div>
                  <span>Neighboring lens · {link.targetPathfinderName}</span>
                  <strong>{link.targetNicheName}</strong>
                </div>
                <p>
                  <span>Boundary between them</span>
                  {link.distinction}
                </p>
              </div>
              <div className="interdisciplinary-first-step">
                <span>Try this first</span>
                <p>{link.explorationStep}</p>
              </div>
              <details>
                <summary>How the fields differ</summary>
                <p>{link.distinction}</p>
              </details>
              <div
                className="tag-list interdisciplinary-keywords"
                role="group"
                aria-label={`Shared search terms for ${link.targetNicheName}`}
              >
                {link.sharedKeywords.map((keyword) => (
                  <span key={keyword}>{keyword}</span>
                ))}
              </div>
              <InterdisciplinarySearchPanel link={link} />
              <div className="interdisciplinary-actions">
                <Link href={getInterdisciplinaryDestination(link)}>
                  Open {link.targetPathfinderName} pathfinder
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <CopyButton
                  text={formatInterdisciplinaryBridgeNote(link, {
                    sourcePathfinderName,
                    sourceDirectionName,
                  })}
                  label="Copy bridge note"
                  context={link.targetNicheName}
                />
              </div>
            </article>
          );
        })}
      </div>
      <p className="interdisciplinary-note">
        <Search size={14} aria-hidden="true" /> Your progress in this pathfinder
        stays saved if you open another one.
      </p>
    </section>
  );
}
