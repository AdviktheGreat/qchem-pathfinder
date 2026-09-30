# Pathfinder platform contract

The root page is a catalog, not a combined multidisciplinary survey. Every available pathfinder must remain a focused experience with its own scientifically coherent questions, taxonomy, recommendation evidence, preparation guidance, and literature-search language.

## Availability states

Catalog entries live in `data/pathfinders.ts`.

- `available`: must provide a real `href`, a complete end-to-end experience, persistence, exports, and automated tests.
- `coming-soon`: must not provide an `href` or an interactive control. Its card communicates roadmap intent without pretending that an unfinished survey exists.

Catalog tests protect unique IDs and names, valid available routes, and non-interactive roadmap entries.

## Route and storage boundaries

The hub lives at `/`. Each active module uses a stable route below `/pathfinders/`; quantum chemistry currently uses `/pathfinders/quantum-chemistry`.

The hub stores only the most recently visited available pathfinder under `research-pathfinder:hub`. Quantum chemistry continues to own its established `quantum-pathfinder:progress` record. A future module must receive its own storage key and validation rules so restarting one pathfinder cannot erase another.

## Activating another pathfinder

Before changing a catalog entry from `coming-soon` to `available`:

1. Create its route and complete all screens from introduction through export.
2. Keep its question definitions and recommendation taxonomy separate from quantum chemistry data.
3. Give every recommendation a reasonable complete answer path.
4. Add uncertainty, conflicting-preference, persistence, export, and reachability tests.
5. Review scientific copy with an appropriate subject-matter reviewer.
6. Verify desktop, tablet, phone, keyboard, reduced-motion, forced-color, refresh, print, and storage-failure behavior.
7. Add a module-specific progress summary to the hub card.

Do not compare raw recommendation scores across modules. The scores are meaningful only inside the taxonomy whose explicit affinities and weights produced them.

## Shared product principles

Every module should preserve the current product contract:

- Knowledge gaps affect preparation, not eligibility.
- Results are starting directions, not perfect matches or final research questions.
- Strong declared preferences outweigh incidental style signals.
- Uncertainty keeps possibilities open.
- User-facing reasons trace back to actual answers.
- Literature guidance emphasizes vocabulary, recent reviews, original-source reading, and citation verification.
- No personal information or survey answers are transmitted by the application.
