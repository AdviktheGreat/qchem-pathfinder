# Quantum Research Pathfinder

Quantum Research Pathfinder is a private, peer-guided survey for the first workshop of a high-school quantum chemistry research program. In roughly 8–12 minutes, it helps a student move from broad curiosity to one promising sub-niche, two nearby alternatives, and practical language for beginning a literature review.

The app does **not** choose a final research question, grade prior knowledge, or send student answers anywhere. Progress is stored only in the browser on the current device.

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
components/             Introduction, survey, review, results, and shared controls
data/questions.ts       Typed survey questions, choices, signals, and branch rules
data/niches.ts          Typed taxonomy, educational copy, keywords, and searches
data/preparation.ts     Math, coding, and explanation guidance
data/glossary.ts        Shared scientific definitions
data/exploration.ts     Varied starting directions for open-ended answers
data/profile.ts         Research-style dimension labels
lib/branching.ts        Question visibility and branch cleanup
lib/recommendation.ts   Deterministic scoring, ranking, and explanations
lib/preparation.ts      Shared preparation model for results and exports
lib/profile-export.ts   Plain-text research-profile formatter
lib/persistence.ts      Versioned local-storage serialization and validation
tests/fixtures/         Six complete, validated student answer paths
tests/                  Unit and rendered-component journey tests
docs/                   Export format contract and scientific-copy sources
```

## How adaptation works

Five calibration questions establish explanation and preparation needs without changing a field’s worthiness. The broad-motivation answer then reveals exactly two relevant narrowing questions; other branches are not rendered or counted in progress. Seven common research-style questions finish the path. A typical student therefore sees 16 questions.

Questions are typed objects in `data/questions.ts`. A conditional question has a small `visibleWhen` rule:

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

The numeric score sums weighted signal affinities, direct narrowing boosts multiplied by five, and an exploration bonus. Edit signals/boosts in `data/questions.ts`, affinities in `data/niches.ts`, and scoring or label rules in `lib/recommendation.ts`. Keep evidence requirements separate from exploration bonuses.

Tests confirm that all niches have a targeted path, conflicting preferences remain deterministic, uncertainty never creates a dead end, and six complete student profiles produce sensible results.

## Small usability refinements

The interface includes optional letter shortcuts (off by default), arrow-key single-choice navigation, a working skip link, deliberate heading focus, high-contrast support, and mobile-friendly controls. The shortcut preference is saved locally. Results offer copyable keywords and queries, Google Scholar links, a reading checklist, shared scientific definitions, and a dated export covering all three directions.

“Explore a nearby path” takes students to the alternatives. Either alternative can be explicitly selected as the primary exploration direction, with a clear label and a control to restore the original suggestion. That choice survives refresh and updates preparation and export content. Editing an answer clears the manual choice so the next results reflect new preferences.

Saved progress is validated against current questions and options. Invalid choices and hidden branches are removed, incomplete results return to an unanswered question, and repaired progress is explained. Unreadable or unsupported-version data starts fresh with a notice. Storage failure does not prevent the survey from working, but progress cannot survive refresh in that case. No answers leave the browser; opening a scholarly search sends the selected query to that provider.

## Test coverage

`npm test` runs unit and jsdom component tests. The six shared fixtures cover medicine, energy/materials, spectroscopy, reactions, machine learning, and extensive uncertainty. Each completes the current 16-question visible path. Journey tests exercise introduction, answer controls, adaptive questions, results, export preview, review, and upstream branch edits.

Coverage also checks all 18 niches can become the **primary** result through a complete visible path; calibration independence; ties and conflicting interests; honest uncertainty labels; shared preparation/export content; saved-data repair; chosen-direction refresh recovery; keyboard navigation; focus; and shortcut settings. These are not substitutes for browser, assistive-technology, or scientific review. After UI changes, review introduction, survey, and results at desktop and phone widths, including refresh and alternative selection.

`tests/taxonomy.test.ts` also protects the instructor-edited content: direction IDs and names must stay unique, every literature launchpad must remain complete, starter keyword counts stay manageable, and explanation rules must refer to signals the niche actually scores.

## Edit the survey or taxonomy

To add a question, add one `SurveyQuestion` in `data/questions.ts`. Reuse an existing signal when it represents the same preference, or add a clearly named signal and matching niche affinities. Add `visibleWhen` only when the question belongs to a branch.

To add or edit a research direction, update `data/niches.ts`. Each `Niche` owns its descriptions, typical questions, example systems, approaches, preparation, concepts, keywords, synonyms, searches, paper guidance, affinities, and explanation rules. New niches should also receive at least one meaningful `nicheBoosts` route from a narrowing answer; the reachability test fails if it is missing.

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
3. Keep the detected framework as **Next.js** and the default build settings.
4. Deploy. Vercel installs from `package-lock.json` and builds the App Router application.

For a CLI preview after signing in to Vercel:

```bash
npx vercel
```

Use `npx vercel --prod` only after the preview is approved.

## Known limitations

- Recommendations reflect a curated taxonomy and declared weights; they are conversation starters, not objective measurements.
- Progress is browser- and device-specific. Clearing site storage removes it.
- Search launchpads provide vocabulary and query strings, not live literature results or verified citations.
- The taxonomy is intentionally scoped to approachable computational quantum chemistry directions and is not exhaustive.

## Later literature-kit integration

The exported profile has stable headings documented in [the profile format contract](docs/profile-format.md). A future version could map those sections into a local prompt template or add instructor-curated source databases. Preserve citation verification, source transparency, and the no-personal-data approach. Shared terminology and its sources are documented in [scientific copy notes](docs/scientific-copy.md).
