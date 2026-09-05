# Quantum Research Pathfinder

Quantum Research Pathfinder is a private, peer-guided survey for the first workshop of a high-school quantum chemistry research program. In roughly 8–12 minutes, it helps a student move from broad curiosity to one promising sub-niche, two nearby alternatives, and practical language for beginning a literature review.

The app does **not** choose a final research question, grade prior knowledge, or send student answers anywhere. Progress is stored only in the browser on the current device.

## Run locally

Requirements: Node.js 22 and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Quality checks:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Project structure

```text
app/                    Next.js App Router entry points and global styles
components/             Introduction, survey, review, results, and shared controls
data/questions.ts       Typed survey questions, choices, signals, and branch rules
data/niches.ts          Typed taxonomy, educational copy, keywords, and searches
lib/branching.ts        Question visibility and branch cleanup
lib/recommendation.ts   Deterministic scoring, ranking, and explanations
lib/profile-export.ts   Plain-text research-profile formatter
lib/persistence.ts      Versioned local-storage serialization and validation
tests/                  Branching, scoring, reachability, export, and persistence tests
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
5. Knowledge-confidence answers do not contribute to niche scores. They only change the starting-point and concept-review advice.
6. Uncertain answers add no negative score. Repeated uncertainty gently favors exploration-friendly entry points, and ties use the stable taxonomy order.
7. Results expose separate interest-fit and research-style reasons generated only from signals the student actually selected. The UI uses qualitative labels, never invented percentages.

Tests confirm that all niches have a targeted path, conflicting preferences remain deterministic, uncertainty never creates a dead end, and six complete student profiles produce sensible results.

## Edit the survey or taxonomy

To add a question, add one `SurveyQuestion` in `data/questions.ts`. Reuse an existing signal when it represents the same preference, or add a clearly named signal and matching niche affinities. Add `visibleWhen` only when the question belongs to a branch.

To add or edit a research direction, update `data/niches.ts`. Each `Niche` owns its descriptions, typical questions, example systems, approaches, preparation, concepts, keywords, synonyms, searches, paper guidance, affinities, and explanation rules. New niches should also receive at least one meaningful `nicheBoosts` route from a narrowing answer; the reachability test fails if it is missing.

Weighting conventions:

- `3–5`: strong declared interests or direct research preferences
- `2–3`: meaningful research-style matches
- `1`: supporting evidence or a weak preference
- Narrowing boosts are multiplied by the engine so an explicit targeted choice outweighs incidental style overlap

After content changes, run `npm test` and read several full profiles in the UI. Scientific judgment still matters more than a passing snapshot.

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

The exported profile has stable headings suitable for a facilitator’s prompt kit. A future version could map those sections into a local prompt template, add instructor-curated source databases, or open prefilled scholarly-search URLs. Any live integration should preserve citation verification, source transparency, and the current no-personal-data approach.
