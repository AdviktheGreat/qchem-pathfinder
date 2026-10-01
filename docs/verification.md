# Computational materials release verification

Verified October 1, 2026 against the local production build.

## Automated release gate

- Prettier passed for the application, components, data, libraries, tests, documentation, and README.
- ESLint and TypeScript checks passed.
- Vitest passed all 308 tests across 54 files.
- The Next.js production build passed and statically prerendered the hub, not-found page, quantum chemistry pathfinder, and computational materials pathfinder.
- Automated coverage includes complete student journeys, all 22 computational materials directions, balanced and uncertain profiles, ties, answer editing, manual alternative selection, isolated persistence, and corrupted-storage recovery.

## Production browser review

- Reviewed the computational materials introduction, adaptive survey, and results experience at desktop, tablet, and phone sizes.
- Checked 1280 × 900, 768 × 1024, and 390 × 844 viewports. At each size, the document width matched the viewport with no horizontal overflow.
- Confirmed the materials page title, primary heading, canonical URL, visible launch action, responsive navigation, and cross-pathfinder controls.
- Verified touch-target sizing and keyboard-visible focus treatment through the accessibility test suite and responsive browser review.
- Confirmed no captured browser warnings or errors during the production smoke test.
- Confirmed HTTP 200 responses for the hub, computational materials pathfinder, and quantum chemistry pathfinder from the production server.

## Remaining manual checks

This verification is not a complete screen-reader, physical-device, native print-preview, multi-browser, or independent scientific-content review. Before a workshop, test the deployed preview in the browsers and devices students will use, try the full flow with a screen reader, inspect printed results, and have a subject-matter expert review any newly edited scientific copy.

No deployment was performed as part of this verification.
