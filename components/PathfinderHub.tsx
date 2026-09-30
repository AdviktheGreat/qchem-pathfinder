import Link from "next/link";
import { ArrowRight, Atom, Compass } from "lucide-react";
import { pathfinders } from "@/data/pathfinders";
import { HubField } from "@/components/HubField";

export function PathfinderHub() {
  const availablePathfinders = pathfinders.filter(
    (pathfinder) => pathfinder.status === "available" && pathfinder.href,
  );

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
                <article className="pathfinder-card" key={pathfinder.id}>
                  <div className="pathfinder-card-icon" aria-hidden="true">
                    <Atom size={24} />
                  </div>
                  <p className="eyebrow">{pathfinder.eyebrow}</p>
                  <h3>{pathfinder.name}</h3>
                  <p>{pathfinder.description}</p>
                  <ul
                    className="pathfinder-focus-list"
                    aria-label="Focus areas"
                  >
                    {pathfinder.focusAreas.map((area) => (
                      <li key={area}>{area}</li>
                    ))}
                  </ul>
                  <p className="pathfinder-outcome">{pathfinder.outcome}</p>
                  <Link className="primary-button" href={pathfinder.href!}>
                    Open {pathfinder.shortName} <ArrowRight size={17} />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
