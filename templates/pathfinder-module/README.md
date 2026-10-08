# Pathfinder module template

This directory is a type-checked reference for authoring another focused research pathfinder. It is intentionally not imported by `data/pathfinder-modules.ts`, so copying or editing it cannot publish an unfinished module.

## Standard anatomy

```text
identity.ts              Stable ID, route, icon, and storage namespace
intro.ts                 Scope, privacy, duration, and three-step promise
uncertainty-options.ts   Neutral, reusable uncertainty choices
questions.ts             Calibration and common preference questions
adaptive-questions.ts    Motivation-specific follow-up questions
scoring.ts               Signal vocabulary and explicit engine weights
narrowing-boosts.ts      Direct evidence connecting answers to niches
niches.ts                Complete recommendation and search content
glossary.ts              Beginner definitions used by the experience
preparation.ts           Knowledge-sensitive, ability-neutral guidance
reading-guidance.ts      Source-reading and citation-verification copy
results.ts               Results, alternatives, search, and action labels
profile.ts               Stable export labels and filename prefix
pathfinder.ts            The assembled serializable definition
index.ts                 Public subject-module exports
```

Route creation, manifest registration, activation, and testing are documented separately because they should happen only after the content definition is complete.

## Authoring order

1. Replace the `template-` IDs, route, storage key, and example copy with subject-specific values.
2. Establish the survey's motivation families and neutral uncertainty behavior.
3. Define a controlled signal vocabulary before writing affinities or boosts.
4. Build a scientifically coherent taxonomy with complete literature-search language.
5. Assemble and validate the definition locally while it remains unregistered.
6. Add fixtures, reachability checks, rendered journeys, and accessibility coverage.
7. Create the App Router page and module manifest, then mark it available only after the complete release gate passes.

Start in `identity.ts`. Keep the ID lowercase and hyphenated, use `/pathfinders/<id>` for the route, and give the module a storage key no released pathfinder uses. Increment the storage version only when saved data can no longer be safely repaired by the existing persistence layer.

Then rewrite `intro.ts` for the audience and discipline. Preserve its four promises: exploration rather than evaluation, no final-question selection, browser-local privacy, and preparation that supports rather than excludes.

`questions.ts` demonstrates five calibration questions followed by motivation, research-question, and working-style choices. Add enough common and adaptive questions for an 8–12 minute journey, but keep one focused decision per screen. IDs should carry a subject prefix so saved answers and diagnostics remain unambiguous.

Keep branch-only questions in `adaptive-questions.ts`. Every `visibleWhen.questionId` should name the broad motivation question, and every `anyOf` value should be a real motivation option. Provide a useful open branch instead of showing every specialized follow-up to an uncertain student.

Build every honest uncertainty choice with `uncertainty-options.ts`. An uncertainty option must not carry `signals` or `nicheBoosts`, and it must remain mutually exclusive with specific answers in a multi-select question. Customize its label when useful, but keep its meaning neutral.

Define the controlled preference vocabulary in `scoring.ts` before attaching signals to answer options. Use strong weights for declared interests and question types, meaningful weights for working-style preferences, and small supporting weights only for secondary evidence. Calibration options never receive signals.

Use `narrowing-boosts.ts` only when an answer explicitly distinguishes nearby directions. Refer to stable niche IDs, use the named weight scale, and let the engine multiplier make a direct choice stronger than incidental style overlap. Do not add boosts to uncertainty options.

Each entry in `niches.ts` is a complete beginner-explorable research direction, not a final project question. It owns its scientific explanation, representative systems, methods, preparation note, affinities, answer-grounded reasons, comparison lens, keywords, synonyms, searches, and paper types. Keep open-exploration IDs varied across the taxonomy.

Put reusable beginner definitions in `glossary.ts` and ability-neutral support in `preparation.ts`. Every referenced question and option ID must exist. Advice should suggest a realistic next step without implying that limited mathematics, coding, or prior knowledge makes a direction less worthy.

Keep source-reading habits and the paper-note format in `reading-guidance.ts`; keep presentation labels and search-provider templates in `results.ts`. Results should explain actual evidence, distinguish primary and nearby directions, warn students to verify citations, and preserve complete copy and print actions.

`profile.ts` maps real survey IDs to stable plain-text export labels. Give the profile a subject-specific uppercase title and filesystem-safe filename prefix. Preserve the shared export headings so profiles remain useful to instructors and later literature-search tools.

Follow `route-and-activation.md` only after the local definition and its tests are complete. The page remains a Server Component, static metadata comes from the manifest, and registration happens exactly once in the canonical module registry.

## Non-negotiable boundaries

- Calibration changes preparation guidance, never eligibility or fit.
- Uncertainty keeps possibilities open and contributes no negative evidence.
- Strong, targeted choices outweigh incidental style preferences.
- Explanations trace back to actual answers; numeric scores remain internal.
- The definition contains local, serializable data and no runtime model or API dependency.
- Search guidance supplies vocabulary and verification habits, not fabricated citations.
- A new module receives a unique route and versioned local-storage key.
