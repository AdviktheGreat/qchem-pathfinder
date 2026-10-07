# Computational physics maintenance guide

The complete physics module is assembled by `data/pathfinders/computational-physics/pathfinder.ts`. Keep scientific content in that definition tree and shared application behavior in `components/` or `lib/`.

## Content map

- `identity.ts`, `intro.ts`, and `foundation.ts`: module identity, introduction, stages, and shared survey settings.
- `questions.ts` and `adaptive-questions.ts`: calibration, motivation, research-style, and conditional narrowing questions.
- `affinities.ts`, `narrowing-boosts.ts`, `reasons.ts`, and `scoring.ts`: explicit recommendation evidence and ranking configuration.
- `niches-*.ts` and `niches.ts`: the 28 editable research directions and their literature launchpads.
- `glossary.ts`, `preparation.ts`, and `reading-guidance.ts`: definitions, starting-point support, and source-reading guidance.
- `profile.ts`, `results.ts`, and `pathfinder.ts`: export labels, interface copy, search providers, and final assembly.
- `storage.ts`: the module's isolated, versioned progress record.

## Add or change a question

Use a stable `physics-`-prefixed ID and choose one of the existing stages. Calibration options may change preparation but must not add recommendation signals. Preference options should reuse an existing signal when the meaning matches; otherwise add a clearly named signal and corresponding niche affinities. A branch-only question belongs in `adaptive-questions.ts` and needs a `visibleWhen` rule tied to `physics-motivation`.

Each selectable motivation has two follow-ups. When adding or renaming an option, update those visibility rules, provide complete test answers, and confirm that changing motivation removes the hidden branch answers before scoring, persistence, and export.

## Add or change a direction

Every direction needs a unique ID and name, beginner explanation, typical questions, representative systems, explained computational approaches, preparation guidance, concepts to revisit, five to eight keywords, related phrases, three search queries, paper types, affinities, and answer-grounded reason rules.

Add the direction to the appropriate `niches-*.ts` family and export it through `niches.ts`. Give it at least one targeted route in `narrowing-boosts.ts`; a broad affinity alone is not enough to guarantee a useful student path. Search copy should describe vocabulary rather than invent citations, and it should distinguish simulation output from observation or experimental evidence.

## Scoring conventions

- Broad motivations and preferred question types should provide the strongest signals.
- Research-style affinities can distinguish nearby directions without overruling a direct narrowing choice.
- `nicheBoosts` are multiplied by the explicit boost multiplier in `scoring.ts`; use them only for answers that name a close scientific distinction.
- Uncertainty options must not create negative scores or imply that preparation limits eligibility.
- Keep the curated open-exploration set scientifically varied so an uncertain student receives useful starting points instead of a fake match.

The shared recommendation engine is deterministic. Do not add runtime model calls, cross-pathfinder score comparisons, or hidden eligibility thresholds.

## Release checklist

Run Prettier, ESLint, TypeScript, the full Vitest suite, and a production build. Review the hub, introduction, a branch from each motivation family, answer edits, primary and alternative results, search tabs, copy/download, print styling, and cross-pathfinder switching. Check phone, tablet, and desktop widths; keyboard focus; reduced motion and forced colors; refresh recovery; malformed storage; and the browser console.

The automated physics coverage includes all 28 directions, four rendered end-to-end journeys, eight representative profiles, uncertainty, conflicts, ties, branch cleanup, persistence, export structure, keyboard navigation, and route/platform registration. These checks complement rather than replace scientific and assistive-technology review.
