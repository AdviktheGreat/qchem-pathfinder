# Research Pathfinder

Research Pathfinder is a privacy-minded hub for focused, peer-guided research-orientation tools. Its four complete modules—Quantum Chemistry, Computational Materials, Computational Biology, and Computational Physics—help motivated high-school students move from broad curiosity to one promising sub-niche, two nearby alternatives, and practical language for beginning a literature review in roughly 8–12 minutes.

The hub does **not** choose a final research question, grade prior knowledge, diagnose health, or send student answers anywhere. Each pathfinder keeps an independent progress record in the browser on the current device.

## Local development and checks

Use Node.js 22 LTS and npm. No API keys or environment variables are needed.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Before committing changes, run:

```bash
npx prettier --check app components data lib tests docs README.md
npm run lint
npm run typecheck
npm test
npm run build
```

On a fresh checkout, run `npx next typegen` before type checking to generate route types. `npm run start` serves the production build; `npm run test:watch` runs tests while editing. Format changed files with `npx prettier --write <paths>`.

## Project structure

```text
app/                    Next.js App Router entry points and global styles
app/pathfinders/        Individual pathfinder routes
components/             Hub, survey, review, results, and shared controls
data/pathfinder-modules.ts Canonical module manifests and release order
data/pathfinders.ts     Hub catalog derived from module manifests
data/hub-orientation-signals.ts Shared cross-subject orientation vocabulary
data/pathfinders/       Subject definitions, questions, taxonomies, and guidance
data/questions.ts       Quantum chemistry questions (legacy stable module)
data/niches.ts          Quantum chemistry taxonomy (legacy stable module)
data/preparation.ts     Math, coding, and explanation guidance
data/glossary.ts        Shared scientific definitions
data/exploration.ts     Varied starting directions for open-ended answers
data/profile.ts         Research-style dimension labels
lib/branching.ts        Question visibility and branch cleanup
lib/recommendation.ts   Deterministic scoring, ranking, and explanations
lib/preparation.ts      Shared preparation model for results and exports
lib/profile-export.ts   Plain-text research-profile formatter
lib/persistence.ts      Versioned local-storage serialization and validation
lib/hub-persistence.ts  Validated recently visited pathfinder state
lib/pathfinder-manifest.ts Typed module and catalog authoring contract
lib/pathfinder-metadata.ts Standard App Router metadata projection
lib/pathfinder-lifecycle.ts Draft-to-release lifecycle vocabulary
lib/pathfinder-validation.ts Structured definition, manifest, and registry checks
lib/hub-orientation-*.ts Orientation contracts, validation, and ranking
lib/interdisciplinary-links.ts Typed cross-subject link helpers
data/pathfinders/**/interdisciplinary-links.ts Curated adjacent-field bridges
tests/fixtures/         Complete, validated student paths for all four modules
tests/                  Unit and rendered-component journey tests
templates/              Type-checked, unregistered module authoring reference
docs/                   Export format contract and scientific-copy sources
```

## Hub and pathfinder routes

The central hub lives at `/`. The complete experiences live at `/pathfinders/quantum-chemistry`, `/pathfinders/computational-materials`, `/pathfinders/computational-biology`, and `/pathfinders/computational-physics`. The hub and in-pathfinder switcher connect them without clearing any survey.

The hub resolves each card to its typed pathfinder definition, reads only that definition’s storage key, and shows whether the student should start, continue, or review it. A small separate hub record remembers the most recently visited available pathfinder. All records remain local to the browser.

Pathfinder registration and availability are controlled in `data/pathfinder-modules.ts`. `data/pathfinders.ts` derives the public catalog from those manifests:

- `available` entries require a real route and receive an interactive card.
- `coming-soon` entries are non-interactive roadmap previews.

See [the pathfinder platform contract](docs/pathfinder-platform.md) before adding another active module.

## How adaptation works

Each definition declares its calibration, motivation, common-preference, and conditional narrowing questions. A broad-motivation answer reveals only the relevant follow-ups; other branches are not rendered or counted in progress. Quantum chemistry usually shows 16 questions, computational materials usually shows 17, computational biology usually shows 14, and computational physics usually shows 14.

Questions are typed objects in `data/questions.ts` for quantum chemistry. Materials, biology, and physics each use `questions.ts` plus `adaptive-questions.ts` inside their subject folder under `data/pathfinders/`. A conditional question has a small `visibleWhen` rule:

```ts
visibleWhen: { questionId: "motivation", anyOf: ["light"] }
```

Changing an upstream answer prunes answers from branches that are no longer visible.

## How recommendations are scored

The engine is deterministic and intentionally inspectable:

1. Answer options add named signals such as `interest:light`, `mode:spectra`, or `style:coding`.
2. Each niche declares how strongly those signals fit in its `affinities` map.
3. Broad motivations and preferred question types carry stronger weights than small style preferences.
4. Narrowing answers apply explicit `nicheBoosts` because they distinguish close neighbors within a broad field.
5. All five calibration questions are excluded from scoring and fit confidence, including math, coding, and explanation preferences. They adjust explanations and preparation. The final work-balance question is a research preference and does contribute.
6. Uncertain answers add no negative score. Exploration bonuses are tracked separately from preference evidence. With no positive preference evidence, three curated, varied starting directions replace a misleading ranked match. Other ties use stable taxonomy order.
7. Results expose separate interest-fit and research-style reasons generated from actual answers. “Strong fit” requires a highest score, positive interest support, and evidence from at least two non-calibration questions. Open-ended results are labeled “Starting point,” never a match percentage.

The numeric score sums weighted signal affinities, direct narrowing boosts multiplied by the active definition’s explicit multiplier, and an exploration bonus. Quantum chemistry content lives in the top-level `data/` files. Materials, biology, and physics signals, boosts, weights, and affinities live in their respective folders under `data/pathfinders/`. Shared ranking and label rules live in `lib/recommendation.ts`. Keep preference evidence separate from exploration bonuses.

Tests confirm that all 18 quantum chemistry, all 22 computational materials, all 24 computational biology, and all 28 computational physics directions can become the primary result through a complete visible path. They also cover deterministic conflicts and ties, uncertainty, representative complete profiles, and calibration independence.

## Small usability refinements

The interface includes optional letter shortcuts (off by default), arrow-key single-choice navigation, a working skip link, deliberate heading focus, high-contrast support, and mobile-friendly controls. The shortcut preference is saved locally. Results offer copyable keywords and queries, Google Scholar links, a reading checklist, shared scientific definitions, and a dated export covering all three recommended directions.

“Explore a nearby path” takes students to the alternatives. Either alternative can be explicitly selected as the primary exploration direction, with a clear label and a control to restore the original suggestion. That choice survives refresh and updates preparation and export content. Editing an answer clears the manual choice so the next results reflect new preferences.

Saved progress is validated against current questions and options. Invalid choices and hidden branches are removed, incomplete results return to an unanswered question, and repaired progress is explained. Unreadable or unsupported-version data starts fresh with a notice. Storage failure does not prevent the survey from working, but progress cannot survive refresh in that case. No answers leave the browser; opening a scholarly search sends the selected query to that provider.

Mutually exclusive answers are also normalized before branching, scoring, preparation, persistence, or export. If old saved data contains two values for a single-choice question, the latest value wins; uncertainty cannot remain beside a specific multi-select answer. When a student changes an existing single choice in the live survey, an inline notice names the replaced and retained answers so it is clear that only the new choice will influence the recommendation and profile. The shared rules live in `lib/answer-conflicts.ts`.

## Visual and interaction system

The interface uses a warm laboratory-white base, graphite typography, spectral blue actions, and one stage-specific accent at a time. Design tokens for color, spacing, radii, shadows, surfaces, and survey stages live at the top of `app/globals.css`. Keep ultraviolet as a focus or scientific accent rather than a large background color.

The survey is intentionally one working surface per question. `JourneyNavigator` communicates the five stages, answer cards expose their single-, multi-, scenario-, and uncertainty states, and phone layouts use a safe-area-aware action dock. Motion is brief and automatically reduced for the operating-system reduced-motion preference.

Results use three layers: the research passport for orientation, an editorial primary-direction feature for depth, and a horizontally scrollable comparison on narrow screens. Each literature launchpad uses Orientation, Focused, and Review tabs; all three query panels are restored for printing. Recommendation evidence chips come from `getRecommendationEvidence`, which traces the selected options that actually contributed to the current niche rather than presenting decorative match claims.

## Test coverage

The second usability round adds stable pre-branch progress, exclusive uncertainty choices, pause/resume, visible save-failure notices, an uncertainty review filter, and a quick route back to results after complete edits. Unchanged answers preserve the chosen direction; changed motivations explain the new follow-ups.

Results include section navigation, a three-direction overview, explained fit labels, visible alternative comparisons, search-refinement and paper-type guidance, and a copyable reading-note template. Exports include related phrases and direction-specific filenames. Clipboard failure exposes selectable text. Printing includes both alternative launchpads even when their on-screen panels are collapsed.

Instructor-editable supporting copy lives in `data/fit-labels.ts`, `data/reading-guidance.ts`, and `data/concept-overlaps.ts`. Concept overlap rules only remove a narrower label when its explicitly listed umbrella topic is present; they do not infer equivalence from word similarity.

`npm test` runs unit and jsdom component tests. Quantum chemistry fixtures cover medicine, energy/materials, spectroscopy, reactions, machine learning, and extensive uncertainty. Materials fixtures cover energy storage, electronics, light and sensing, catalysis, soft materials, machine learning, and extensive uncertainty. Biology fixtures cover health and variants, therapeutic protein structure, comparative genomics, spatial biology, microbiomes, machine learning, and extensive uncertainty. Physics fixtures cover astrophysics, quantum systems, plasma and fusion, fluid and Earth systems, particle and nuclear physics, computational methods, and extensive uncertainty. Rendered journeys exercise introduction, answer controls, adaptive questions, results, export preview, review, refresh restoration, branch edits, and manually selected alternatives.

Coverage also checks all 18 qchem, all 22 materials, all 24 biology, and all 28 physics niches can become the **primary** result through complete visible paths; calibration independence; ties and conflicting interests; honest uncertainty labels; shared preparation/export content; saved-data repair; chosen-direction refresh recovery; keyboard navigation; focus; and shortcut settings. These are not substitutes for browser, assistive-technology, or scientific review. After UI changes, review introduction, survey, and results at desktop, tablet, and phone widths, including refresh and alternative selection.

`tests/taxonomy.test.ts` also protects the instructor-edited content: direction IDs and names must stay unique, every literature launchpad must remain complete, starter keyword counts stay manageable, and explanation rules must refer to signals the niche actually scores.

## Edit the survey or taxonomy

To edit quantum chemistry, use the established top-level `data/` modules. For the newer modules, start with the [computational materials](docs/computational-materials-maintenance.md), [computational biology](docs/computational-biology-maintenance.md), or [computational physics](docs/computational-physics-maintenance.md) maintenance guide. Reuse an existing signal when it represents the same preference, or add a clearly named signal and matching niche affinities. Add `visibleWhen` only when the question belongs to a branch.

To begin a new subject, copy the [type-checked module template](templates/pathfinder-module/README.md), follow the [validation rule guide](docs/pathfinder-validation.md), and keep it unregistered until its content and release tests are complete.

Use the [interdisciplinary link format](docs/interdisciplinary-links.md) only after both the source and target directions are scientifically stable. Links are optional next lenses and never cross-subject score comparisons.

The optional hub-orientation foundation is documented in [Hub orientation](docs/hub-orientation.md). Phase 1 provides typed signals, validated module profiles, and deterministic ranking logic; the visible guided flow is reserved for Phase 2.

Each `Niche` owns its descriptions, typical questions, example systems, approaches, preparation, concepts, keywords, synonyms, searches, paper guidance, affinities, and explanation rules. New niches should also receive at least one meaningful `nicheBoosts` route from a visible narrowing answer; the reachability tests fail if it is missing or cannot become primary.

Weighting conventions:

- `3–5`: strong declared interests or direct research preferences
- `2–3`: meaningful research-style matches
- `1`: supporting evidence or a weak preference
- Narrowing boosts are multiplied by the engine so an explicit targeted choice outweighs incidental style overlap

After content changes, run `npm test` and read several full profiles in the UI. The taxonomy integrity tests catch common editing mistakes, but scientific judgment still matters more than a passing test.

## Deploy to Vercel

No environment variables, database, authentication, API routes, or external services are required.

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the detected framework as **Next.js**, the root directory as the repository root, and the default install/build settings (`npm ci` and `npm run build`).
4. No environment variables are required. Deploy the preview and test `/`, all four pathfinder routes, refresh restoration, and one completed export.
5. Promote the verified preview to production. Vercel installs the locked dependencies and statically prerenders the App Router routes.

For a CLI preview after signing in to Vercel:

```bash
npx vercel
```

Use `npx vercel --prod` only after the preview is approved.

## Known limitations

- The four curated taxonomies offer approachable starting points, not exhaustive maps of their disciplines.
- Recommendations reflect a curated taxonomy and declared weights; they are conversation starters, not objective measurements.
- Progress is browser- and device-specific. Clearing site storage removes it.
- Search launchpads provide vocabulary and query strings, not live literature results or verified citations.
- Computational biology is an educational orientation tool, not a source of personal, clinical, or medical advice.

## Later literature-kit integration

The exported profile has stable headings documented in [the profile format contract](docs/profile-format.md). A future version could map those sections into a local prompt template or add instructor-curated source databases. Preserve citation verification, source transparency, and the no-personal-data approach. Shared terminology and its sources are documented in [scientific copy notes](docs/scientific-copy.md).
