# Computational materials maintenance guide

The complete materials module is assembled by `data/pathfinders/computational-materials.ts`. Keep subject copy in that definition tree and shared application behavior in `components/` or `lib/`.

## Where to edit

- `questions.ts`: calibration, motivation, and common research-style questions.
- `adaptive-questions.ts`: the two follow-ups revealed by each motivation family.
- `niches.ts` and `niches-*.ts`: the 22 directions, split by scientific neighborhood for readability.
- `scoring.ts`: the registered signal vocabulary, weight conventions, engine multipliers, and varied open defaults.
- `preparation.ts`: familiarity-, math-, coding-, tool-, and explanation-sensitive preparation guidance.
- `glossary.ts`: concise definitions used in results.
- `reading-guidance.ts`: paper types, query guidance, search refinements, and note template.
- `computational-materials.ts`: identity, persistence version, intro copy, labels, providers, and export configuration.

## Add or change a question

Use a stable question and option ID; saved answers refer to them. A new preference signal must also be registered in `scoring.ts` and receive deliberate affinities in relevant niches. Calibration questions belong in `calibrationQuestionIds` and may change preparation only. An uncertainty option should set `uncertainty: true` and carry neither signals nor direct boosts.

For a conditional question, use a `visibleWhen` rule tied to an earlier single-choice answer. Test that changing the source answer removes the old branch and that the new path has no dead end. Bump `COMPUTATIONAL_MATERIALS_STORAGE_VERSION` only when old records cannot be repaired safely by the existing sanitizer.

## Add or change a direction

Each direction needs a unique ID and name, an accurate beginner explanation, three research questions, representative systems, at least three explained approaches, preparation guidance, concepts to revisit, five to eight keywords, related phrases, three search queries, paper types, affinities, and answer-grounded reason rules.

A new direction also needs at least one visible, scientifically reasonable `nicheBoosts` path. Run `tests/materials-reachability.test.ts`; it constructs a complete visible survey path and requires the direction to become the primary result. Read its generated result in the browser as well—reachability is necessary, not sufficient scientific review.

## Adjust scoring

Broad signals express interests and research style. Direct boosts distinguish neighboring directions after the student has entered a motivation branch. Keep direct narrowing evidence stronger than incidental workflow overlap. Calibration must remain excluded from ranking, uncertainty must remain non-negative, and ties must remain stable. Update the scoring principles and balanced-recommendation tests whenever the convention changes.

Never expose the numeric score as a match percentage. Results should continue to distinguish interest fit, research-style fit, open starting points, and preparation considerations.

## Release checklist

Run formatting, lint, type checking, the full Vitest suite, and a production build. Review the hub, introduction, a branch from each motivation family, review/edit behavior, the primary and alternative results, copy/download, print styling, and cross-pathfinder switching. Check phone, tablet, and desktop widths, keyboard focus, reduced motion, forced colors, refresh restoration, corrupted storage recovery, and browser console output. Record the release audit in `docs/verification.md`.
