# Research Pathfinder release verification

Verified October 12, 2026 against the local production build after completing Hub Orientation Phase 2.

## Automated release gate

- Prettier passed for the application, components, data, libraries, tests, documentation, and README.
- ESLint and TypeScript checks passed.
- Vitest passed all 573 tests across 97 files.
- The Next.js production build passed and statically prerendered the hub, not-found page, and all four pathfinder routes.
- Manifest coverage confirms that the registry, definition lookup, hub catalog, switcher destinations, lifecycle boundaries, route metadata, IDs, routes, and storage namespaces remain aligned.
- The type-checked authoring template assembles into a complete module, supports adaptive journeys and stable profile export, and remains deliberately absent from the live registry and production routes.
- Definition, manifest, and complete-registry validation passed for every released module; focused failure cases cover malformed identities, surveys, branches, scoring evidence, taxonomies, search data, preparation mappings, results mappings, and cross-module collisions.
- All 20 curated interdisciplinary bridges passed local source, canonical cross-registry target, label, keyword, and global-ID validation across the four released modules.
- Rendered bridge coverage confirms conditional display, accessible disclosure and navigation labels, copy feedback, results-nav focus movement, and the unconnected-result fallback.
- Hub-orientation coverage validates all four released profiles, every shared signal dimension, malformed and unavailable configurations, uncertainty neutrality, conflicts and ties, evidence consolidation, transparent reasons, and reasonable paths that make every module the leading suggestion.
- Rendered hub-orientation coverage exercises the optional introduction, five core questions, both adaptive boundary questions, honest uncertainty, progress semantics, branch-answer cleanup after edits, answer-grounded primary and alternative results, direct pathfinder launches, review, and the all-open fallback.
- Hub answers remain separate from subject surveys and recommendation scores. Direct browsing, existing module progress, and subject scoring are unchanged.
- Automated physics coverage includes four complete rendered journeys, all 28 directions, eight representative profiles, balanced and uncertain rankings, ties, calibration neutrality, conflict-free branch editing, isolated persistence, profile export, search-tab keyboard interaction, and release-contract checks.
- The full gate also retains the existing quantum chemistry, computational materials, and computational biology coverage.

## Production browser review

- Reviewed the hub-orientation entry, introduction, question flow, adaptive scale follow-up, and two-path result in the local app at desktop and 390 × 844 phone widths.
- Confirmed the phone result cards stack into a single readable column, answer cards and actions remain usable, reviewed answers stay selected, and the page has no horizontal overflow.
- Confirmed the primary and nearby-alternative launch controls point to their complete subject pathfinders, while review and direct directory browsing remain available.
- Completed a mobile uncertainty journey from introduction through results. Confirmed answer controls, 14-question progress semantics, fixed phone actions, open-ended recommendation labels, three-direction overview, preparation guidance, literature launchpad, and profile actions.
- Verified result actions, search tabs, nearby-direction controls, and research-profile export through rendered component journeys at shared responsive breakpoints.
- Confirmed no captured browser warnings or errors during the hub-orientation smoke test.
- Confirmed the hub and Computational Physics route loaded from the production server; the static build generated all four pathfinder routes.
- Reviewed a connected Quantum Chemistry result at desktop and 390 × 844 phone widths. Confirmed the bridge explanation, field distinction, search terms, destination action, saved-progress note, responsive stacking, keyboard target, and copied-search feedback.
- Confirmed no browser-console warnings or errors during the interdisciplinary bridge review.

## Remaining manual checks

This verification is not a complete screen-reader, physical-device, native print-preview, multi-browser, or independent scientific-content review. Before a workshop, test the deployed preview in the browsers and devices students will use, try the full flow with a screen reader, inspect printed results, and have a subject-matter expert review any newly edited scientific copy.

No deployment was performed as part of this verification.
