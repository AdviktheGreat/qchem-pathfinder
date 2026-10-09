# Interdisciplinary link format

Interdisciplinary links help a student notice when one result has a meaningful neighboring lens in another released pathfinder. They do not merge surveys, compare scores across subjects, replace the three recommended directions, or carry answers into another module.

## Data contract

Each `PathfinderDefinition` owns a small `interdisciplinaryLinks` list. A link is directional and begins at one local niche.

```ts
{
  id: "source-topic-target-topic",
  sourceNicheId: "local-direction-id",
  targetPathfinderId: "released-pathfinder-id",
  targetPathfinderName: "Canonical short name",
  targetNicheId: "target-direction-id",
  targetNicheName: "Canonical direction name",
  bridge: "The scientific question or method the fields genuinely share.",
  distinction: "Where their systems, scales, evidence, or goals differ.",
  sharedKeywords: ["shared phrase", "method phrase", "system phrase"],
}
```

Target labels are stored with the link so the active definition remains complete, local, and serializable. Complete-registry validation checks those labels against the canonical target module, preventing silent drift when a direction is renamed.

## Editorial rules

- Add a link only when a student can carry a concrete question, method, system, or search phrase across the boundary.
- Keep `bridge` specific enough to teach the connection; “these fields are related” is not sufficient.
- Use `distinction` to prevent the student from treating neighboring fields as interchangeable.
- Supply two to five phrases that work in an interdisciplinary literature search.
- Link only to an available module and an existing direction. Do not point students toward unfinished experiences.
- Keep the list selective. A missing link is better than a weak or misleading connection.
- Review both sides of every bridge with appropriate subject knowledge.

Links need not be reciprocal. A direction may provide a useful next lens even when the reverse journey would need different framing.

## Student experience

The results page shows a field bridge only when the current primary direction has curated link data. It identifies the adjacent pathfinder and direction, explains the overlap and boundary, offers shared search language, and links to the target pathfinder with Next.js client navigation.

Opening another pathfinder does not auto-answer its survey or declare its target niche a match. Progress in the current module remains stored under its existing local namespace, and the destination follows its own introduction, questions, scoring, and results process.

## Editing workflow

1. Add or update the subject-local `interdisciplinary-links.ts` file.
2. Use canonical target IDs and labels from the released module.
3. Run focused definition and registry validation; read issue paths before changing shared rules.
4. Add coverage when introducing a new target subject, rendering pattern, or unusual bridge.
5. Run the full release gate and review the connected result at phone and desktop widths.
