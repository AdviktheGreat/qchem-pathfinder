# Research Pathfinder release verification

Verified October 7, 2026 against the local production build after completing Platform Consolidation Phase 2.

## Automated release gate

- Prettier passed for the application, components, data, libraries, tests, documentation, and README.
- ESLint and TypeScript checks passed.
- Vitest passed all 519 tests across 91 files.
- The Next.js production build passed and statically prerendered the hub, not-found page, and all four pathfinder routes.
- Manifest coverage confirms that the registry, definition lookup, hub catalog, switcher destinations, lifecycle boundaries, route metadata, IDs, routes, and storage namespaces remain aligned.
- The type-checked authoring template assembles into a complete module, supports adaptive journeys and stable profile export, and remains deliberately absent from the live registry and production routes.
- Automated physics coverage includes four complete rendered journeys, all 28 directions, eight representative profiles, balanced and uncertain rankings, ties, calibration neutrality, conflict-free branch editing, isolated persistence, profile export, search-tab keyboard interaction, and release-contract checks.
- The full gate also retains the existing quantum chemistry, computational materials, and computational biology coverage.

## Production browser review

- Reviewed the four-card hub and Computational Physics introduction in the production app at desktop and 390 × 844 phone widths. The physics identity, launch action, research-map preview, scope boundaries, and cross-pathfinder navigation remain clear at both sizes.
- Completed a mobile uncertainty journey from introduction through results. Confirmed answer controls, 14-question progress semantics, fixed phone actions, open-ended recommendation labels, three-direction overview, preparation guidance, literature launchpad, and profile actions.
- Verified result actions, search tabs, nearby-direction controls, and research-profile export through rendered component journeys at shared responsive breakpoints.
- Confirmed no captured browser warnings or errors during the production smoke test.
- Confirmed the hub and Computational Physics route loaded from the production server; the static build generated all four pathfinder routes.

## Remaining manual checks

This verification is not a complete screen-reader, physical-device, native print-preview, multi-browser, or independent scientific-content review. Before a workshop, test the deployed preview in the browsers and devices students will use, try the full flow with a screen reader, inspect printed results, and have a subject-matter expert review any newly edited scientific copy.

No deployment was performed as part of this verification.
