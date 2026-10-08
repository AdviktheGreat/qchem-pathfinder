# Pathfinder testing template

A module is not complete because its happy path renders. Add subject-specific tests before registry activation and keep failures understandable to instructors editing local data.

## Minimum automated coverage

| Area             | Required checks                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| Definition       | Serializable local data, stable identity, unique route and storage key                           |
| Questions        | Unique IDs and options, valid selection limits, neutral uncertainty, calibration independence    |
| Branching        | Every motivation reveals the intended follow-ups, hidden answers are pruned, no dead ends        |
| Taxonomy         | Unique directions, complete scientific copy, complete search language, valid reason signals      |
| Scoring          | Strong preferences, ties, conflicts, uncertainty, calibration neutrality, stable ordering        |
| Reachability     | Every direction can become primary through a complete visible answer path                        |
| Profiles         | Several representative students plus extensive uncertainty produce sensible three-direction maps |
| Persistence      | Resume exact question, repair invalid saved data, preserve manual alternatives, isolate storage  |
| Export           | Stable headings, all three directions, keywords, searches, concepts, citation warning, filename  |
| Rendered journey | Introduction through results, review/edit, branch cleanup, nearby selection, restart             |
| Accessibility    | Landmarks, one H1, labels, focus movement, keyboard controls, reduced motion, forced colors      |
| Platform         | Manifest, catalog, registry, route metadata, hub card, switcher, and static route agree          |

## Complete fixture pattern

Store representative paths in `tests/fixtures/<subject>-student-profiles.ts`. Each fixture should provide:

```ts
{
  name: "Clear human-readable profile name",
  answers: {
    "subject-starting-point": ["recognize"],
    "subject-motivation": ["one-motivation"],
    // Every visible common and branch question receives an answer.
  },
  expectedPrimary: "one-taxonomy-id",
}
```

Include at least:

- one profile for every broad motivation family;
- contrasting conceptual, mathematical, visual, and coding preferences;
- limited coding or mathematical experience without restricted recommendations;
- one profile with conflicting strong interests;
- one profile selecting uncertainty wherever possible.

## Reachability pattern

For each niche, maintain at least one complete answer path that makes it primary. Verify that every answer belongs to a visible question and real option before ranking it. A direct boost is not sufficient by itself if the required branch can never be reached.

## Release commands

```bash
npx prettier --check app components data lib tests templates docs README.md
npm run lint
npm run typecheck
npm test
npm run build
```

After automated checks, complete a production-browser review at phone and desktop widths. Inspect the console, refresh during the survey and on results, try keyboard-only navigation, verify print content, and confirm that no answers leave the browser.
