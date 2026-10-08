import Link from "next/link";
import { Compass } from "lucide-react";
import { availablePathfinders, upcomingPathfinders } from "@/data/pathfinders";
import { HubField } from "@/components/HubField";
import { PathfinderCard } from "@/components/PathfinderCard";
import { PathfinderPreviewCard } from "@/components/PathfinderPreviewCard";
import { RecentPathfinder } from "@/components/RecentPathfinder";

export function PathfinderHub() {
  return (
    <>
      <a className="skip-link" href="#hub-main">
        Skip to pathfinders
      </a>
      <div className="hub-frame">
        <header className="hub-header">
          <Link className="brand" href="/" aria-label="Research Pathfinder hub">
            <span className="brand-mark">
              <Compass size={18} aria-hidden="true" />
            </span>
            <span>Research Pathfinder</span>
          </Link>
          <p>Choose a scientific neighborhood to explore.</p>
        </header>

        <main id="hub-main" className="hub-main" tabIndex={-1}>
          <nav className="hub-section-nav" aria-label="Hub sections">
            <a href="#directory-title">Available pathfinders</a>
            {upcomingPathfinders.length > 0 ? (
              <a href="#roadmap-title">Collection roadmap</a>
            ) : null}
            <span>
              {availablePathfinders.length} available
              {upcomingPathfinders.length > 0
                ? ` · ${upcomingPathfinders.length} in development`
                : null}
            </span>
          </nav>
          <section className="hub-intro" aria-labelledby="hub-title">
            <div className="hub-intro-copy">
              <p className="eyebrow">A growing collection of research maps</p>
              <h1 id="hub-title">
                Start broad. Find a direction worth reading.
              </h1>
              <p className="lede">
                Each pathfinder turns your interests and preferred way of
                working into a focused research direction, nearby alternatives,
                and a practical literature-search starting point.
              </p>
              <div className="hub-intro-note">
                <span>One hub</span>
                <span>Focused pathways</span>
                <span>No grades or perfect matches</span>
              </div>
            </div>
            <HubField />
          </section>

          <section
            className="hub-principles"
            aria-label="What every pathfinder provides"
          >
            <article>
              <span>01</span>
              <h2>Follow genuine curiosity</h2>
              <p>Begin with situations and questions, not unfamiliar labels.</p>
            </article>
            <article>
              <span>02</span>
              <h2>Keep nearby doors open</h2>
              <p>
                Compare one leading direction with two worthwhile alternatives.
              </p>
            </article>
            <article>
              <span>03</span>
              <h2>Leave ready to read</h2>
              <p>
                Turn a direction into keywords, searches, and a first-paper
                plan.
              </p>
            </article>
          </section>

          <RecentPathfinder />

          <section
            className="pathfinder-directory"
            aria-labelledby="directory-title"
          >
            <div className="section-heading">
              <div>
                <p className="section-kicker">Available now</p>
                <h2 id="directory-title">Choose your pathfinder.</h2>
              </div>
            </div>
            <div className="pathfinder-grid">
              {availablePathfinders.map((pathfinder) => (
                <PathfinderCard pathfinder={pathfinder} key={pathfinder.id} />
              ))}
            </div>
          </section>

          {upcomingPathfinders.length > 0 ? (
            <section
              className="pathfinder-roadmap"
              aria-labelledby="roadmap-title"
            >
              <div className="section-heading">
                <div>
                  <p className="section-kicker">On the horizon</p>
                  <h2 id="roadmap-title">More scientific neighborhoods.</h2>
                </div>
                <p>
                  These previews show where the collection can grow. They will
                  open only after their questions, recommendations, and search
                  guidance are complete.
                </p>
              </div>
              <div className="pathfinder-preview-grid">
                {upcomingPathfinders.map((pathfinder) => (
                  <PathfinderPreviewCard
                    pathfinder={pathfinder}
                    key={pathfinder.id}
                  />
                ))}
              </div>
            </section>
          ) : null}
        </main>
      </div>
    </>
  );
}
