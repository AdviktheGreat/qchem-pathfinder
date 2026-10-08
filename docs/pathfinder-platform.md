# Pathfinder platform contract

The root page is a catalog, not a combined multidisciplinary survey. Every available pathfinder must remain a focused experience with its own scientifically coherent questions, taxonomy, recommendation evidence, preparation guidance, and literature-search language.

## Availability states

Module manifests live in `data/pathfinder-modules.ts`; public catalog entries are derived in `data/pathfinders.ts`.

Modules move through `draft`, `testing`, `coming-soon`, and `available`. The first two are authoring states and stay out of the public catalog. `lib/pathfinder-lifecycle.ts` is the canonical vocabulary and documents the release boundary.

- `available`: must provide a real `href`, a complete end-to-end experience, persistence, exports, and automated tests.
- `coming-soon`: must not provide an `href` or an interactive control. Its card communicates roadmap intent without pretending that an unfinished survey exists.

Catalog tests protect unique IDs and names, valid available routes, and non-interactive roadmap entries.

The canonical registry also drives definition lookup and the in-pathfinder switcher. A released module's identity, route, or availability must never be repeated in a second hand-maintained registry. Route pages derive their static title, description, canonical URL, and Open Graph fields from the manifest while remaining Server Components.

## Route and storage boundaries

The hub lives at `/`. Each active module uses a stable route below `/pathfinders/`. Quantum chemistry uses `/pathfinders/quantum-chemistry`; computational materials uses `/pathfinders/computational-materials`; computational biology uses `/pathfinders/computational-biology`; computational physics uses `/pathfinders/computational-physics`.

The hub stores only the most recently visited available pathfinder under `research-pathfinder:hub`. Quantum chemistry owns `quantum-pathfinder:progress`; computational materials owns `computational-materials-pathfinder:progress`; computational biology owns `computational-biology-pathfinder:progress`; computational physics owns `computational-physics-pathfinder:progress`. Hub cards resolve the matching typed definition before reading progress, and the in-pathfinder switcher navigates without deleting any record. Every future module must receive its own versioned key and validation rules.

## Activating another pathfinder

Before changing a catalog entry from `coming-soon` to `available`:

1. Create its route and complete all screens from introduction through export.
2. Keep its question definitions and recommendation taxonomy separate from quantum chemistry data.
3. Give every recommendation a reasonable complete answer path.
4. Add uncertainty, conflicting-preference, persistence, export, and reachability tests.
5. Review scientific copy with an appropriate subject-matter reviewer.
6. Verify desktop, tablet, phone, keyboard, reduced-motion, forced-color, refresh, print, and storage-failure behavior.
7. Register the definition so the shared hub progress summary and switcher can discover it.

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
