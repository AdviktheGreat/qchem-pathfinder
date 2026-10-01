"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
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
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";
import { formatResearchProfile, profileFilename } from "@/lib/profile-export";
import { getPreparationProfile } from "@/lib/preparation";
import {
  explainDifference,
  explainRecommendationContext,
  getFitLabel,
  getKnowledgeProfile,
  getRecommendationEvidence,
  getRecommendations,
  type RecommendationContext,
} from "@/lib/recommendation";
import type { AnswerMap, RankedNiche } from "@/lib/types";
import type {
  PathfinderDefinition,
  PathfinderResultsConfig,
} from "@/lib/pathfinder-definition";

interface ResultsScreenProps {
  definition?: PathfinderDefinition;
  answers: AnswerMap;
  primaryOverride?: string;
  onExploreNearby: (nicheId: string | undefined) => void;
  onReview: () => void;
  onRestart: () => void;
}

const queryLabels = {
  orientation: "Broad orientation",
  focused: "Narrower sub-niche",
  review: "Review or perspective",
} as const;

const defaultSearchProviders = [
  {
    label: "Google Scholar",
    urlTemplate: "https://scholar.google.com/scholar?q={query}",
  },
] as const;

function buildSearchUrl(template: string, query: string): string {
  return template.replace("{query}", encodeURIComponent(query));
}

function areaTheme(area: string): string {
  const value = area.toLowerCase();
  if (/reaction|catal|selectiv/.test(value)) return "reaction";
  if (/light|spectro|excited|charge/.test(value)) return "light";
  if (/material|energy|electronic/.test(value)) return "materials";
  if (/bio|drug|interaction|solvat/.test(value)) return "molecular";
  if (/machine|method|theory|structure/.test(value)) return "methods";
  return "environment";
}

function DirectionDetails({
  result,
  primary,
  results,
}: {
  result: RankedNiche;
  primary: RankedNiche;
  results: PathfinderResultsConfig;
}) {
  const niche = result.niche;
  return (
    <div className="direction-details">
      <div className="detail-grid two-up">
        <section>
          <h3>
            {results.directionDetailsCopy?.questionsHeading ??
              "What researchers ask"}
          </h3>
          <ul>
            {niche.questions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3>
            {results.directionDetailsCopy?.systemsHeading ?? "Example systems"}
          </h3>
          {results.directionDetailsCopy?.systemsDescription && (
            <p className="detail-intro">
              {results.directionDetailsCopy.systemsDescription}
            </p>
          )}
          <div className="tag-list">
            {niche.systems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>
      </div>
      <section className="approach-section">
        <h3>
          {results.directionDetailsCopy?.approachesHeading ??
            "Computational approaches"}
        </h3>
        {results.directionDetailsCopy?.approachesDescription && (
          <p className="detail-intro">
            {results.directionDetailsCopy.approachesDescription}
          </p>
        )}
        <div className="approach-grid">
          {niche.approaches.map((approach) => (
            <article key={approach.name}>
              <strong>{approach.name}</strong>
              <p>{approach.explanation}</p>
            </article>
          ))}
        </div>
      </section>
      <SearchLaunchpad
        result={result}
        compact={primary.niche.id !== niche.id}
        results={results}
      />
    </div>
  );
}

function SearchLaunchpad({
  result,
  compact = false,
  results,
}: {
  result: RankedNiche;
  compact?: boolean;
  results: PathfinderResultsConfig;
}) {
  const {
    queryGuidance,
    searchRefinements,
    paperTypeGuide,
    paperNoteTemplate,
  } = results;
  const niche = result.niche;
  const [activeQuery, setActiveQuery] =
    useState<keyof typeof queryLabels>("orientation");
  const tabsId = useId();
  const queryKinds = Object.keys(queryLabels) as Array<
    keyof typeof queryLabels
  >;
  const allQueries = Object.values(niche.searches).join("\n");
  const allKeywords = [
    ...niche.keywords,
    ...niche.synonyms.map((synonym) => `Related: ${synonym}`),
  ].join("\n");
  const searchProviders = results.searchProviders ?? defaultSearchProviders;
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
          <h3>{results.searchCopy?.keywordsHeading ?? "Starter keywords"}</h3>
          <CopyButton
            text={allKeywords}
            label="Copy keywords"
            context={niche.name}
          />
        </div>
        {results.searchCopy?.keywordsDescription && (
          <p className="keyword-description">
            {results.searchCopy.keywordsDescription}
          </p>
        )}
        <div className="tag-list accent">
          {niche.keywords.map((keyword) => (
            <span key={keyword}>{keyword}</span>
          ))}
        </div>
        <p>
          <strong>{results.searchCopy?.synonymsLabel ?? "Also try"}:</strong>{" "}
          {niche.synonyms.join(" · ")}
        </p>
      </div>
      <div className="query-heading">
        <div>
          <h3>
            {results.searchCopy?.queriesHeading ?? "Ready-to-use searches"}
          </h3>
          {results.searchCopy?.queriesDescription && (
            <p>{results.searchCopy.queriesDescription}</p>
          )}
        </div>
        <CopyButton
          text={allQueries}
          label="Copy all queries"
          context={niche.name}
        />
      </div>
      <div className="query-workspace">
        <div
          className="query-tabs"
          role="tablist"
          aria-label={`Search depth for ${niche.name}`}
        >
          {queryKinds.map((kind, index) => (
            <button
              key={kind}
              id={`${tabsId}-${kind}-tab`}
              type="button"
              role="tab"
              aria-selected={activeQuery === kind}
              aria-controls={`${tabsId}-${kind}-panel`}
              tabIndex={activeQuery === kind ? 0 : -1}
              onClick={() => setActiveQuery(kind)}
              onKeyDown={(event) => {
                const offset =
                  event.key === "ArrowRight"
                    ? 1
                    : event.key === "ArrowLeft"
                      ? -1
                      : 0;
                if (!offset) return;
                event.preventDefault();
                const nextKind =
                  queryKinds[
                    (index + offset + queryKinds.length) % queryKinds.length
                  ];
                setActiveQuery(nextKind);
                document.getElementById(`${tabsId}-${nextKind}-tab`)?.focus();
              }}
            >
              {kind === "orientation"
                ? "Orientation"
                : kind === "focused"
                  ? "Focused"
                  : "Review"}
            </button>
          ))}
        </div>
        <div className="query-list">
          {Object.entries(niche.searches).map(([kind, query]) => (
            <div
              className="query-row query-panel"
              key={kind}
              id={`${tabsId}-${kind}-panel`}
              role="tabpanel"
              aria-labelledby={`${tabsId}-${kind}-tab`}
              hidden={activeQuery !== kind}
            >
              <div className="query-copy">
                <span>{queryLabels[kind as keyof typeof queryLabels]}</span>
                <code>{query}</code>
                <p>{queryGuidance[kind as keyof typeof queryGuidance]}</p>
              </div>
              <div
                className="query-actions"
                aria-label={`Search and copy actions for ${queryLabels[kind as keyof typeof queryLabels]}`}
              >
                {searchProviders.map((provider) => {
                  const actionLabel = results.searchProviders
                    ? `Search ${provider.label}`
                    : "Open Scholar";
                  return (
                    <a
                      className="scholar-link"
                      href={buildSearchUrl(provider.urlTemplate, query)}
                      target="_blank"
                      rel="noreferrer"
                      key={provider.label}
                      aria-label={`${actionLabel} — ${queryLabels[kind as keyof typeof queryLabels]} for ${niche.name} (opens in a new tab)`}
                    >
                      <ExternalLink size={14} /> {actionLabel}{" "}
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  );
                })}
                <CopyButton
                  text={query}
                  label="Copy query"
                  context={`${queryLabels[kind as keyof typeof queryLabels]} for ${niche.name}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {!compact && (
        <details className="definition-card">
          <summary>Too many or too few search results?</summary>
          {searchRefinements.map(({ title, text }) => (
            <p key={title}>
              <strong>{title}</strong> {text}
            </p>
          ))}
        </details>
      )}
      {!compact && (
        <div className="reading-note">
          <BookMarked size={20} />
          <div>
            <strong>
              {results.readingCopy?.heading ??
                "Begin with a recent review or perspective."}
            </strong>
            <p>
              {results.readingCopy?.description ??
                "It can give you vocabulary, major debates, and a map of important methods before you tackle narrower papers. Then follow its references to the original work."}
            </p>
            <p className="source-warning">
              {results.readingCopy?.citationWarning ??
                "Search results and AI tools can contain incorrect citations. Verify every citation and read the real source before relying on it."}
            </p>
            <ul className="reading-checklist">
              {(
                results.readingCopy?.checklist ?? [
                  "Write down unfamiliar terms to look up after the first skim.",
                  "Scan headings, figures, and the conclusion before reading deeply.",
                  "Notice repeated methods, molecules, and open questions.",
                ]
              ).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className="paper-types">
        {!compact && (
          <details className="definition-card">
            <summary>Review, perspective, or original research?</summary>
            <dl>
              {paperTypeGuide.map(({ term, text }) => (
                <div key={term}>
                  <dt>
                    <strong>{term}</strong>
                  </dt>
                  <dd>{text}</dd>
                </div>
              ))}
            </dl>
          </details>
        )}
        <strong>Good paper types to begin with</strong>
        <ul>
          {niche.paperTypes.map((type) => (
            <li key={type}>{type}</li>
          ))}
        </ul>
      </div>
      {!compact && (
        <details className="definition-card">
          <summary>A note template for your first paper</summary>
          <p>
            Copy this into your own notes. You do not need to understand every
            method on a first reading.
          </p>
          <div className="reading-template">
            <code>{paperNoteTemplate}</code>
          </div>
          <CopyButton text={paperNoteTemplate} label="Copy reading template" />
        </details>
      )}
    </section>
  );
}

export function ResultsScreen({
  definition = quantumChemistryPathfinder,
  answers,
  primaryOverride,
  onExploreNearby,
  onReview,
  onRestart,
}: ResultsScreenProps) {
  const recommendationContext = useMemo<RecommendationContext>(
    () => ({
      questions: definition.survey.questions,
      niches: definition.recommendations.niches,
      openExplorationIds: definition.recommendations.openExplorationIds,
      scoring: definition.recommendations.scoring,
    }),
    [definition],
  );
  const recommendations = useMemo(
    () => getRecommendations(answers, primaryOverride, recommendationContext),
    [answers, primaryOverride, recommendationContext],
  );
  const originalRecommendations = useMemo(
    () => getRecommendations(answers, undefined, recommendationContext),
    [answers, recommendationContext],
  );
  const originalPrimary = originalRecommendations[0];
  const bestScore = Math.max(
    ...originalRecommendations.map((result) => result.score),
  );
  const [primary, ...alternatives] = recommendations;
  const isChosenAlternative = primary.niche.id !== originalPrimary.niche.id;
  const preparation = getPreparationProfile(
    answers,
    primary.niche,
    definition.preparation,
    definition.survey.questions,
  );
  const knowledge = getKnowledgeProfile(
    answers,
    definition.preparation,
    definition.survey.questions,
  );
  const recommendationEvidence = getRecommendationEvidence(
    answers,
    primary,
    4,
    recommendationContext,
  );
  const explanationGuide = preparation.explanation;
  const profileText = formatResearchProfile(
    answers,
    primary.niche.id,
    definition,
  );
  const [openAlternative, setOpenAlternative] = useState<string>();
  const alternativesHeadingRef = useRef<HTMLHeadingElement>(null);
  const primaryHeadingRef = useRef<HTMLHeadingElement>(null);
  const previousPrimary = useRef(primary.niche.id);

  useEffect(() => {
    if (previousPrimary.current !== primary.niche.id) {
      primaryHeadingRef.current?.focus({ preventScroll: true });
      previousPrimary.current = primary.niche.id;
    }
  }, [primary.niche.id]);

  function chooseDirection(nicheId?: string) {
    setOpenAlternative(undefined);
    onExploreNearby(nicheId);
    window.scrollTo({ top: 0 });
  }

  function downloadProfile() {
    const blob = new Blob([profileText], { type: "text/plain;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = profileFilename(primary.niche.id, new Date(), definition);
    anchor.click();
    URL.revokeObjectURL(href);
  }

  const overview = definition.results.overview;
  const primaryCopy = definition.results.primaryCopy;
  const fitEvidenceCopy = definition.results.fitEvidenceCopy;
  const preparationCopy = definition.results.preparationCopy;
  const alternativesCopy = definition.results.alternativesCopy;
  const overviewDimensions = overview?.dimensions.map((dimension) => {
    const question = definition.survey.questions.find(
      (candidate) => candidate.id === dimension.questionId,
    );
    const labels = (answers[dimension.questionId] ?? []).flatMap((optionId) => {
      const label = question?.options.find(
        (option) => option.id === optionId,
      )?.label;
      return label ? [label] : [];
    });
    return {
      ...dimension,
      value: labels.length > 0 ? labels.join(" · ") : dimension.fallback,
    };
  });

  return (
    <div className="results-shell">
      <section className="result-hero">
        <div>
          <p className="eyebrow">
            <Sparkles size={15} />{" "}
            {primaryCopy?.eyebrow ?? "Your exploration map"}
          </p>
          <h1 tabIndex={-1}>
            {primaryCopy?.title ?? "Here’s a promising place to begin."}
          </h1>
          <p>
            {primaryCopy?.description ??
              "This is a research direction to investigate, not a verdict or final question. Your nearby paths stay open."}
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

      <nav
        className="result-section-nav no-print"
        aria-label="Results sections"
      >
        {[
          ["primary-title", "Primary direction"],
          ["preparation-title", "Preparation"],
          ["alternatives-title", "Alternatives"],
          ["export-title", "Export profile"],
        ].map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(event) => {
              event.preventDefault();
              document.getElementById(id)?.focus();
            }}
          >
            {label}
          </a>
        ))}
      </nav>

      <details className="definition-card fit-label-guide">
        <summary>What do the recommendation labels mean?</summary>
        <dl>
          {definition.results.fitLabelDescriptions.map(
            ({ label, description }) => (
              <div key={label}>
                <dt>
                  <strong>{label}</strong>
                </dt>
                <dd>{description}</dd>
              </div>
            ),
          )}
        </dl>
        <p>
          These labels summarize declared interests—not ability, readiness, or
          your potential in a field.
        </p>
      </details>

      {overview && overviewDimensions && (
        <section
          className="research-coordinates"
          aria-labelledby="research-coordinates-title"
        >
          <div>
            <p className="section-kicker">{overview.eyebrow}</p>
            <h2 id="research-coordinates-title">{overview.title}</h2>
            <p>{overview.description}</p>
          </div>
          <dl>
            {overviewDimensions.map((dimension) => (
              <div key={dimension.questionId}>
                <dt>{dimension.label}</dt>
                <dd>{dimension.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <aside
        className="directions-overview research-passport"
        aria-label="Your three directions at a glance"
      >
        <div className="passport-heading">
          <div>
            <p className="section-kicker">Research passport</p>
            <h2>Your exploration in one view</h2>
          </div>
          <span>Ready to explore</span>
        </div>
        <dl className="passport-profile">
          <div>
            <dt>Starting point</dt>
            <dd>{knowledge.startingPoint}</dd>
          </div>
          <div>
            <dt>Strongest interest signal</dt>
            <dd>
              {primary.interestReasons[0] ??
                "Several interests remain open for comparison."}
            </dd>
          </div>
          <div>
            <dt>Working style</dt>
            <dd>{primary.styleReasons[0]}</dd>
          </div>
        </dl>
        <p className="passport-directions-label">
          Your three directions at a glance
        </p>
        <ol>
          {recommendations.map((result, index) => (
            <li key={result.niche.id}>
              <span>{index === 0 ? "Start here" : "Also explore"}</span>
              <strong>{result.niche.name}</strong>
              <p>{result.niche.shortDescription}</p>
            </li>
          ))}
        </ol>
      </aside>

      <section
        className={`primary-result theme-${areaTheme(primary.niche.area)}`}
        aria-labelledby="primary-title"
      >
        <div className="primary-label">
          <span>{getFitLabel(primary, bestScore)}</span>
          <span>
            {isChosenAlternative
              ? "Your chosen direction"
              : "Primary direction"}
          </span>
        </div>
        {isChosenAlternative && (
          <div className="definition-card">
            <p>
              You chose to explore this alternative. Your original suggestion
              was {originalPrimary.niche.name}.
            </p>
            <button
              type="button"
              className="text-button"
              onClick={() => chooseDirection()}
            >
              {definition.results.actionsCopy?.returnOriginalLabel ??
                "Return to my original suggestion"}
            </button>
          </div>
        )}
        <div className="primary-grid">
          <div className="primary-copy">
            <p className="area-label">{primary.niche.area}</p>
            <h2 id="primary-title" ref={primaryHeadingRef} tabIndex={-1}>
              {primary.niche.name}
            </h2>
            <p className="short-description">
              {primary.niche.shortDescription}
            </p>
            <p>{explanationGuide.text}</p>
            <details
              className="definition-card"
              key={primary.niche.id}
              open={explanationGuide.showContextInitially}
            >
              <summary>
                {primaryCopy?.contextSummary ?? "A little more context"}
              </summary>
              <p>{primary.niche.explanation}</p>
            </details>
          </div>
          <aside className="fit-card">
            <p className="section-kicker">
              <ClipboardCheck size={14} />{" "}
              {primary.preferenceEvidenceCount === 0
                ? (fitEvidenceCopy?.startingHeading ??
                  "Why this is a starting point")
                : (fitEvidenceCopy?.matchedHeading ?? "Why it matched")}
            </p>
            {recommendationEvidence.length > 0 && (
              <div
                className="evidence-chips"
                aria-label="Answers behind this match"
              >
                {recommendationEvidence.map((item) => (
                  <span key={`${item.kind}-${item.label}`}>
                    <small>{item.kind}</small>
                    {item.label}
                  </span>
                ))}
              </div>
            )}
            <details
              className="evidence-explanation"
              open={fitEvidenceCopy?.openInitially}
            >
              <summary>
                {fitEvidenceCopy?.explanationSummary ??
                  "See how these answers connect"}
              </summary>
              <div>
                <strong>
                  {primary.preferenceEvidenceCount === 0
                    ? "An interest to sample"
                    : (fitEvidenceCopy?.interestHeading ?? "Interest fit")}
                </strong>
                {primary.interestReasons.map((reason) => (
                  <p key={reason}>{reason}</p>
                ))}
              </div>
              <div>
                <strong>
                  {primary.preferenceEvidenceCount === 0
                    ? "Ways to approach it"
                    : (fitEvidenceCopy?.styleHeading ?? "Research-style fit")}
                </strong>
                {primary.styleReasons.map((reason) => (
                  <p key={reason}>{reason}</p>
                ))}
              </div>
            </details>
            <p className="transparent-note">
              {fitEvidenceCopy?.transparentNote ??
                "The engine compares explicit answer weights—never grades or hidden personality labels."}
            </p>
          </aside>
        </div>
        <DirectionDetails
          result={primary}
          primary={primary}
          results={definition.results}
        />
      </section>

      <section className="preparation-card">
        <div>
          <p className="section-kicker">
            <Lightbulb size={14} />{" "}
            {preparationCopy?.eyebrow ?? "Preparation, not permission"}
          </p>
          <h2 id="preparation-title" tabIndex={-1}>
            {preparationCopy?.title ?? "What to revisit before you dive in"}
          </h2>
          {preparationCopy?.description && <p>{preparationCopy.description}</p>}
          <p>{preparation.startingPoint}</p>
        </div>
        <div>
          <h3>
            {preparationCopy?.conceptsHeading ?? "Helpful Phase 1 concepts"}
          </h3>
          <ul>
            {preparation.concepts.map((concept) => (
              <li key={concept}>{concept}</li>
            ))}
          </ul>
        </div>
        <div className="prep-note">
          <strong>
            {preparationCopy?.firstStepHeading ?? "A realistic first step"}
          </strong>
          <p>{preparation.nicheNote}</p>
          <ul>
            {preparation.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      </section>

      <details className="results-glossary">
        <summary>Quick glossary for common computational terms</summary>
        <dl>
          {definition.results.glossary.map((entry) => (
            <div key={entry.term}>
              <dt>{entry.term}</dt>
              <dd>{entry.text}</dd>
            </div>
          ))}
        </dl>
      </details>

      <section className="alternatives-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">
              <FlaskConical size={14} />{" "}
              {alternativesCopy?.eyebrow ?? "Keep two doors open"}
            </p>
            <h2
              id="alternatives-title"
              ref={alternativesHeadingRef}
              tabIndex={-1}
            >
              {alternativesCopy?.title ?? "Nearby directions worth exploring."}
            </h2>
          </div>
          <p>{explainRecommendationContext(recommendations)}</p>
        </div>
        {alternativesCopy && (
          <div className="comparison-intro">
            <h3>{alternativesCopy.comparisonHeading}</h3>
            <p>{alternativesCopy.comparisonDescription}</p>
          </div>
        )}
        <div
          className="comparison-view"
          aria-label="Compare your three directions"
        >
          {recommendations.map((result, index) => (
            <article key={result.niche.id}>
              <header>
                <span>{index === 0 ? "Primary" : `Alternative ${index}`}</span>
                <strong>{result.niche.name}</strong>
              </header>
              <dl>
                <div>
                  <dt>What it studies</dt>
                  <dd>{result.niche.shortDescription}</dd>
                </div>
                <div>
                  <dt>Evidence from you</dt>
                  <dd>{result.interestReasons[0]}</dd>
                </div>
                <div>
                  <dt>First reading</dt>
                  <dd>{result.niche.paperTypes[0]}</dd>
                </div>
                <div>
                  <dt>Difference</dt>
                  <dd>
                    {index === 0
                      ? "The reference direction for this comparison."
                      : explainDifference(primary, result)}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
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
                      {result.preferenceEvidenceCount === 0
                        ? (alternativesCopy?.sampleReasonLabel ??
                          "Why sample it")
                        : (alternativesCopy?.matchedReasonLabel ??
                          "Why it may fit")}
                      : {result.interestReasons[0]}
                    </small>
                    <p className="difference-note">
                      <strong>How it differs:</strong>{" "}
                      {explainDifference(primary, result)}
                    </p>
                    <button
                      className="text-button"
                      type="button"
                      aria-label={`Explore ${result.niche.name} as my primary direction`}
                      onClick={() => {
                        chooseDirection(result.niche.id);
                      }}
                    >
                      {alternativesCopy?.chooseActionLabel ??
                        "Make this my exploration path"}{" "}
                      <ArrowRight size={15} />
                    </button>
                  </div>
                  <button
                    className="expand-button"
                    type="button"
                    aria-expanded={open}
                    aria-label={`${
                      open
                        ? (alternativesCopy?.detailCloseLabel ?? "Hide details")
                        : (alternativesCopy?.detailOpenLabel ??
                          "Explore details")
                    } for ${result.niche.name}`}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenAlternative(open ? undefined : result.niche.id)
                    }
                  >
                    {open
                      ? (alternativesCopy?.detailCloseLabel ?? "Hide details")
                      : (alternativesCopy?.detailOpenLabel ??
                        "Explore details")}
                    <ChevronDown size={17} />
                  </button>
                </div>
                <div
                  id={panelId}
                  hidden={!open}
                  className={
                    open
                      ? "alternative-details"
                      : "alternative-details print-only"
                  }
                >
                  <DirectionDetails
                    result={result}
                    primary={primary}
                    results={definition.results}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="export-card">
        <div>
          <p className="section-kicker">
            <ExternalLink size={14} />{" "}
            {definition.results.exportCopy?.eyebrow ?? "Take your map with you"}
          </p>
          <h2 id="export-title" tabIndex={-1}>
            {definition.results.exportCopy?.title ??
              "Research exploration profile"}
          </h2>
          <p>
            {definition.results.exportCopy?.description ??
              "Copy this consistent plain-text summary into your workshop notes or a later literature-search prompt kit."}
          </p>
        </div>
        <pre>{profileText}</pre>
        <div className="export-actions no-print">
          <CopyButton
            text={profileText}
            label={
              definition.results.exportCopy?.copyLabel ?? "Copy full profile"
            }
          />
          <button
            className="secondary-button"
            type="button"
            onClick={downloadProfile}
          >
            <Download size={16} />{" "}
            {definition.results.exportCopy?.downloadLabel ?? "Download .txt"}
          </button>
        </div>
      </section>

      <section className="next-actions no-print">
        <div>
          <p className="section-kicker">
            {definition.results.actionsCopy?.eyebrow ?? "This map can move"}
          </p>
          <h2>
            {definition.results.actionsCopy?.title ??
              "Want to look from another angle?"}
          </h2>
        </div>
        <div className="next-action-buttons">
          <button
            className="primary-button"
            type="button"
            onClick={() => {
              alternativesHeadingRef.current?.focus();
            }}
          >
            {definition.results.actionsCopy?.nearbyLabel ??
              "Explore a nearby path"}{" "}
            <ArrowRight size={17} />
          </button>
          <button className="secondary-button" type="button" onClick={onReview}>
            {definition.results.actionsCopy?.reviewLabel ?? "Review my answers"}
          </button>
          <button className="text-button" type="button" onClick={onRestart}>
            <RotateCcw size={15} />{" "}
            {definition.results.actionsCopy?.restartLabel ?? "Restart"}
          </button>
        </div>
      </section>
    </div>
  );
}
