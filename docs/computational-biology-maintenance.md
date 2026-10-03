# Computational biology maintenance guide

The complete biology module is assembled by `data/pathfinders/computational-biology/pathfinder.ts`. Keep scientific content in that definition tree and shared application behavior in `components/` or `lib/`.

## Where to edit

- `questions.ts`: calibration, motivation, and common research-style questions.
- `adaptive-questions.ts`: the two follow-ups revealed by each motivation family.
- `niches.ts` and `niches-*.ts`: the 24 directions, split by scientific neighborhood.
- `affinities.ts`, `narrowing-boosts.ts`, and `scoring.ts`: signal fit, direct routes, weight conventions, and varied open defaults.
- `reasons.ts`: answer-grounded interest and research-style explanations.
- `preparation.ts`: familiarity-, statistics-, coding-, tools-, and explanation-sensitive guidance.
- `glossary.ts`: concise definitions reused in results.
- `reading-guidance.ts`: paper types, search guidance, verification warnings, and reading-note template.
- `profile.ts`, `results.ts`, and `pathfinder.ts`: export labels, interface copy, identity, persistence, and final assembly.

## Add or change a question

Use stable question and option IDs because saved answers refer to them. Register any new preference signal in `scoring.ts` and add deliberate affinities for relevant directions. Calibration questions belong in `calibrationQuestionIds`; they may change preparation, never rankings. An uncertainty option must set `uncertainty: true` and carry neither signals nor direct boosts.

Conditional questions use a `visibleWhen` rule tied to an earlier single choice. Test that changing the source answer removes the old branch, introduces the correct new questions, and leaves no stale evidence in results or export. Bump the storage version only when the existing sanitizer cannot safely repair older records.

## Add or change a direction

Every direction needs a unique ID and name, accurate beginner explanation, typical research questions, example systems, explained computational approaches, realistic preparation, concepts to revisit, five to eight keywords, related phrases, three search queries, paper types, affinities, and answer-grounded reason rules.

Give a new direction at least one scientifically reasonable `nicheBoosts` path from a visible narrowing answer. `tests/biology-reachability.test.ts` constructs a complete survey path for every direction and requires it to rank first. Also inspect the resulting copy in the browser: reachability is necessary, not a substitute for scientific review.

## Adjust scoring

Broad signals capture interests and research style. Direct boosts distinguish close directions after the student enters a motivation branch. Keep targeted evidence stronger than incidental workflow overlap; keep calibration neutral; keep uncertainty non-negative; and preserve deterministic ties. Do not expose numeric scores or match percentages.

Biomedical and health-related copy must remain educational. Do not request personal health data, interpret an individual’s results, or turn a research direction into clinical advice. Preserve reminders about responsible data governance, bias, validation, and reading original sources.

## Release checklist

Run Prettier, ESLint, TypeScript, the full Vitest suite, and a production build. Review the hub, introduction, at least one route through every motivation family, branch editing, primary and alternative results, copy/download, print styling, and cross-pathfinder switching. Check phone, tablet, and desktop widths; keyboard focus; reduced motion and forced colors; refresh recovery; malformed storage; and the browser console. Record the final audit in `docs/verification.md`.
