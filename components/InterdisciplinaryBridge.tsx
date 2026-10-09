import Link from "next/link";
import { ArrowUpRight, Network, Search } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import {
  buildInterdisciplinarySearch,
  getInterdisciplinaryDestination,
  type InterdisciplinaryLink,
} from "@/lib/interdisciplinary-links";

export function InterdisciplinaryBridge({
  links,
}: {
  links: readonly InterdisciplinaryLink[];
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
          <h2 id="interdisciplinary-bridge-title">
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
          const search = buildInterdisciplinarySearch(link);
          return (
            <article key={link.id}>
              <span className="interdisciplinary-subject">
                {link.targetPathfinderName}
              </span>
              <h3>{link.targetNicheName}</h3>
              <p>{link.bridge}</p>
              <details>
                <summary>How the fields differ</summary>
                <p>{link.distinction}</p>
              </details>
              <div
                className="tag-list interdisciplinary-keywords"
                aria-label={`Shared search terms for ${link.targetNicheName}`}
              >
                {link.sharedKeywords.map((keyword) => (
                  <span key={keyword}>{keyword}</span>
                ))}
              </div>
              <div className="interdisciplinary-actions">
                <Link href={getInterdisciplinaryDestination(link)}>
                  Open {link.targetPathfinderName} pathfinder
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <CopyButton
                  text={search}
                  label="Copy bridge search"
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
