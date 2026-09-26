"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookMarked,
  ChevronDown,
  ClipboardCheck,
  Download,
  ExternalLink,
  FlaskConical,
  Lightbulb,
  Printer,
  RotateCcw,
  Search,
  Sparkles,
} from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { formatResearchProfile } from "@/lib/profile-export";
import { getPreparationSteps } from "@/lib/preparation";
import {
  explainDifference,
  explainRecommendationContext,
  getFitLabel,
  getKnowledgeProfile,
  getRecommendations,
} from "@/lib/recommendation";
import type { AnswerMap, RankedNiche } from "@/lib/types";

interface ResultsScreenProps {
  answers: AnswerMap;
  primaryOverride?: string;
  onExploreNearby: (nicheId: string) => void;
  onReview: () => void;
  onRestart: () => void;
}

const queryLabels = {
  orientation: "Broad orientation",
  focused: "Narrower sub-niche",
  review: "Review or perspective",
} as const;

function DirectionDetails({
  result,
  primary,
}: {
  result: RankedNiche;
  primary: RankedNiche;
}) {
  const niche = result.niche;
  return (
    <div className="direction-details">
      <div className="detail-grid two-up">
        <section>
          <h3>What researchers ask</h3>
          <ul>
            {niche.questions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3>Example systems</h3>
          <div className="tag-list">
            {niche.systems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>
      </div>
      <section className="approach-section">
        <h3>Computational approaches</h3>
        <div className="approach-grid">
          {niche.approaches.map((approach) => (
            <article key={approach.name}>
              <strong>{approach.name}</strong>
              <p>{approach.explanation}</p>
            </article>
          ))}
        </div>
      </section>
      {primary.niche.id !== niche.id && (
        <section className="difference-note">
          <strong>How it differs from your primary path</strong>
          <p>{explainDifference(primary, result)}</p>
        </section>
      )}
      <SearchLaunchpad
        result={result}
        compact={primary.niche.id !== niche.id}
      />
    </div>
  );
}

function SearchLaunchpad({
  result,
  compact = false,
}: {
  result: RankedNiche;
  compact?: boolean;
}) {
  const niche = result.niche;
  const allQueries = Object.values(niche.searches).join("\n");
  const allKeywords = [
    ...niche.keywords,
    ...niche.synonyms.map((synonym) => `Related: ${synonym}`),
  ].join("\n");
  return (
    <section className={`search-launchpad ${compact ? "compact" : ""}`}>
      <div className="section-heading">
        <div>
          <p className="section-kicker">
            <Search size={14} /> Literature-search launchpad
          </p>
          <h2>
            {compact
              ? `Search ${niche.name}`
              : "Turn this direction into a reading trail."}
          </h2>
        </div>
      </div>
      <div className="keyword-block">
        <div className="keyword-heading">
          <h3>Starter keywords</h3>
          <CopyButton text={allKeywords} label="Copy keywords" />
        </div>
        <div className="tag-list accent">
          {niche.keywords.map((keyword) => (
            <span key={keyword}>{keyword}</span>
          ))}
        </div>
        <p>
          <strong>Also try:</strong> {niche.synonyms.join(" · ")}
        </p>
      </div>
      <div className="query-heading">
        <h3>Ready-to-use searches</h3>
        <CopyButton text={allQueries} label="Copy all queries" />
      </div>
      <div className="query-list">
        {Object.entries(niche.searches).map(([kind, query]) => (
          <div className="query-row" key={kind}>
            <div className="query-copy">
              <span>{queryLabels[kind as keyof typeof queryLabels]}</span>
              <code>{query}</code>
            </div>
            <div className="query-actions">
              <a
                className="scholar-link"
                href={`https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink size={14} /> Open Scholar
              </a>
              <CopyButton text={query} label="Copy query" />
            </div>
          </div>
        ))}
      </div>
      {!compact && (
        <div className="reading-note">
          <BookMarked size={20} />
          <div>
            <strong>Begin with a recent review or perspective.</strong>
            <p>
              It can give you vocabulary, major debates, and a map of important
              methods before you tackle narrower papers. Then follow its
              references to the original work.
            </p>
            <p className="source-warning">
              Search results and AI tools can contain incorrect citations.
              Verify every citation and read the real source before relying on
              it.
            </p>
            <ul className="reading-checklist">
              <li>
                Write down unfamiliar terms to look up after the first skim.
              </li>
              <li>
                Scan headings, figures, and the conclusion before reading
                deeply.
              </li>
              <li>Notice repeated methods, molecules, and open questions.</li>
            </ul>
          </div>
        </div>
      )}
      <div className="paper-types">
        <strong>Good paper types to begin with</strong>
        <ul>
          {niche.paperTypes.map((type) => (
            <li key={type}>{type}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ResultsScreen({
  answers,
  primaryOverride,
  onExploreNearby,
  onReview,
  onRestart,
}: ResultsScreenProps) {
  const recommendations = useMemo(
    () => getRecommendations(answers, primaryOverride),
    [answers, primaryOverride],
  );
  const bestScore = useMemo(
    () => getRecommendations(answers)[0]?.score ?? 0,
    [answers],
  );
  const [primary, ...alternatives] = recommendations;
  const knowledge = getKnowledgeProfile(answers);
  const profileText = formatResearchProfile(answers, primary.niche.id);
  const [openAlternative, setOpenAlternative] = useState<string>();

  function downloadProfile() {
    const blob = new Blob([profileText], { type: "text/plain;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    const dateStamp = new Date().toISOString().slice(0, 10);
    anchor.href = href;
    anchor.download = `quantum-research-profile-${dateStamp}.txt`;
    anchor.click();
    URL.revokeObjectURL(href);
  }

  return (
    <div className="results-shell">
      <section className="result-hero">
        <div>
          <p className="eyebrow">
            <Sparkles size={15} /> Your exploration map
          </p>
          <h1>Here’s a promising place to begin.</h1>
          <p>
            This is a research direction to investigate, not a verdict or final
            question. Your nearby paths stay open.
          </p>
        </div>
        <div className="result-actions no-print">
          <button
            className="secondary-button"
            type="button"
            onClick={() => window.print()}
          >
            <Printer size={16} /> Print
          </button>
          <CopyButton text={profileText} label="Copy profile" />
        </div>
      </section>

      <section className="primary-result" aria-labelledby="primary-title">
        <div className="primary-label">
          <span>{getFitLabel(primary, bestScore)}</span>
          <span>Primary direction</span>
        </div>
        <div className="primary-grid">
          <div className="primary-copy">
            <p className="area-label">{primary.niche.area}</p>
            <h2 id="primary-title">{primary.niche.name}</h2>
            <p className="short-description">
              {primary.niche.shortDescription}
            </p>
            <p>{primary.niche.explanation}</p>
          </div>
          <aside className="fit-card">
            <p className="section-kicker">
              <ClipboardCheck size={14} /> Why it matched
            </p>
            <div>
              <strong>Interest fit</strong>
              {primary.interestReasons.map((reason) => (
                <p key={reason}>{reason}</p>
              ))}
            </div>
            <div>
              <strong>Research-style fit</strong>
              {primary.styleReasons.map((reason) => (
                <p key={reason}>{reason}</p>
              ))}
            </div>
            <p className="transparent-note">
              The engine compares explicit answer weights—never grades or hidden
              personality labels.
            </p>
          </aside>
        </div>
        <DirectionDetails result={primary} primary={primary} />
      </section>

      <section className="preparation-card">
        <div>
          <p className="section-kicker">
            <Lightbulb size={14} /> Preparation, not permission
          </p>
          <h2>What to revisit before you dive in</h2>
          <p>{knowledge.startingPoint}</p>
        </div>
        <div>
          <h3>Helpful Phase 1 concepts</h3>
          <ul>
            {Array.from(
              new Set([
                ...primary.niche.concepts,
                ...knowledge.conceptsToRevisit,
              ]),
            )
              .slice(0, 6)
              .map((concept) => (
                <li key={concept}>{concept}</li>
              ))}
          </ul>
        </div>
        <div className="prep-note">
          <strong>A realistic first step</strong>
          <p>{primary.niche.preparation}</p>
          <ul>
            {getPreparationSteps(answers).map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      </section>

      <details className="results-glossary">
        <summary>Quick glossary for common computational terms</summary>
        <dl>
          <div>
            <dt>DFT</dt>
            <dd>
              A widely used way to approximate a molecule’s electron behavior.
            </dd>
          </div>
          <div>
            <dt>Transition state</dt>
            <dd>
              A fleeting, high-energy arrangement along a reaction pathway.
            </dd>
          </div>
          <div>
            <dt>Excited state</dt>
            <dd>
              An electronic state reached after a molecule absorbs energy.
            </dd>
          </div>
          <div>
            <dt>Electronic structure</dt>
            <dd>
              How electrons are arranged and how that shapes molecular behavior.
            </dd>
          </div>
          <div>
            <dt>Computational spectroscopy</dt>
            <dd>
              Predicting or interpreting spectra with molecular calculations.
            </dd>
          </div>
        </dl>
      </details>

      <section className="alternatives-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">
              <FlaskConical size={14} /> Keep two doors open
            </p>
            <h2>Nearby directions worth exploring.</h2>
          </div>
          <p>{explainRecommendationContext(recommendations)}</p>
        </div>
        <div className="alternative-list">
          {alternatives.map((result, index) => {
            const open = openAlternative === result.niche.id;
            const panelId = `alternative-${result.niche.id}-details`;
            return (
              <article
                className={`alternative-card ${open ? "is-open" : ""}`}
                key={result.niche.id}
              >
                <div className="alternative-summary">
                  <span className="alt-number">0{index + 2}</span>
                  <div>
                    <p>
                      {getFitLabel(result, bestScore)} · {result.niche.area}
                    </p>
                    <h3>{result.niche.name}</h3>
                    <span>{result.niche.shortDescription}</span>
                    <small className="alternative-reason">
                      Why it may fit: {result.interestReasons[0]}
                    </small>
                  </div>
                  <button
                    className="expand-button"
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenAlternative(open ? undefined : result.niche.id)
                    }
                  >
                    {open ? "Hide details" : "Explore details"}
                    <ChevronDown size={17} />
                  </button>
                </div>
                {open && (
                  <div id={panelId}>
                    <DirectionDetails result={result} primary={primary} />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="export-card">
        <div>
          <p className="section-kicker">
            <ExternalLink size={14} /> Take your map with you
          </p>
          <h2>Research exploration profile</h2>
          <p>
            Copy this consistent plain-text summary into your workshop notes or
            a later literature-search prompt kit.
          </p>
        </div>
        <pre>{profileText}</pre>
        <div className="export-actions no-print">
          <CopyButton text={profileText} label="Copy full profile" />
          <button
            className="secondary-button"
            type="button"
            onClick={downloadProfile}
          >
            <Download size={16} /> Download .txt
          </button>
        </div>
      </section>

      <section className="next-actions no-print">
        <div>
          <p className="section-kicker">This map can move</p>
          <h2>Want to look from another angle?</h2>
        </div>
        <div className="next-action-buttons">
          <button
            className="primary-button"
            type="button"
            onClick={() => {
              onExploreNearby(alternatives[0].niche.id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Explore a nearby path <ArrowRight size={17} />
          </button>
          <button className="secondary-button" type="button" onClick={onReview}>
            Review my answers
          </button>
          <button className="text-button" type="button" onClick={onRestart}>
            <RotateCcw size={15} /> Restart
          </button>
        </div>
      </section>
    </div>
  );
}
