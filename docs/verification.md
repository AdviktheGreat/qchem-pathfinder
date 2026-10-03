# Research Pathfinder release verification

Verified October 3, 2026 against the local production build after launching the Computational Biology module.

## Automated release gate

- Prettier passed for the application, components, data, libraries, tests, documentation, and README.
- ESLint and TypeScript checks passed.
- Vitest passed all 420 tests across 72 files.
- The Next.js production build passed and statically prerendered the hub, not-found page, and all three pathfinder routes.
- Automated biology coverage includes complete student journeys, all 24 directions, seven representative profiles, balanced and uncertain rankings, ties, calibration neutrality, branch editing, manual alternative selection, isolated persistence, corrupted-storage recovery, and keyboard interaction.
- The full gate also retains the existing quantum chemistry and computational materials coverage.

## Production browser review

- Reviewed the three-card hub and Computational Biology introduction and adaptive survey at 1440 × 1000 and 390 × 844. Cards form an even three-column directory on wide screens and a readable single-column flow on phones.
- Confirmed the Biology page title, primary heading, visible launch action, fixed phone controls, progress semantics, and cross-pathfinder destinations.
- Verified result actions, literature tabs, nearby-direction controls, and research-profile export through rendered component journeys at the shared responsive breakpoints.
- Confirmed no captured browser warnings or errors during the production smoke test.
- Confirmed HTTP 200 responses for the hub and all three pathfinder routes from the production server.

## Remaining manual checks

This verification is not a complete screen-reader, physical-device, native print-preview, multi-browser, or independent scientific-content review. Before a workshop, test the deployed preview in the browsers and devices students will use, try the full flow with a screen reader, inspect printed results, and have a subject-matter expert review any newly edited scientific copy.

No deployment was performed as part of this verification.
