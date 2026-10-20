# Interdisciplinary link format

Interdisciplinary links help a student notice when one result has a meaningful neighboring lens in another released pathfinder. They do not merge surveys, compare scores across subjects, replace the three recommended directions, or carry answers into another module.

## Data contract

Each `PathfinderDefinition` owns a small `interdisciplinaryLinks` list. A link is directional and begins at one local niche.

```ts
{
  id: "source-topic-target-topic",
  sourceNicheId: "local-direction-id",
  connectionKinds: ["shared-question", "connected-scales"],
  sharedQuestion: "A question researchers from either field could investigate?",
  explorationStep: "One concrete, beginner-manageable action to take next.",
  targetPathfinderId: "released-pathfinder-id",
  targetPathfinderName: "Canonical short name",
  targetNicheId: "target-direction-id",
  targetNicheName: "Canonical direction name",
  bridge: "The scientific question or method the fields genuinely share.",
  distinction: "Where their systems, scales, evidence, or goals differ.",
  sharedKeywords: ["shared phrase", "method phrase", "system phrase"],
  searchSeeds: {
    orientation: ["source topic", "target topic"],
    focused: ["shared system", "shared method", "specific mechanism"],
    review: ["source target intersection"],
  },
}
```

Target labels are stored with the link so the active definition remains complete, local, and serializable. Complete-registry validation checks those labels against the canonical target module, preventing silent drift when a direction is renamed.

`connectionKinds` uses one to three values from the shared vocabulary: `shared-system`, `shared-method`, `shared-question`, `shared-data`, `shared-application`, and `connected-scales`. These labels describe the relationship; they are not fit scores or ranking evidence.

The search helper deterministically turns the three seed groups into orientation, focused, and review/perspective queries. Search seeds are editable phrases rather than hard-coded citations. The original `sharedKeywords` remain compact labels for the bridge card.

## Editorial rules

- Add a link only when a student can carry a concrete question, method, system, or search phrase across the boundary.
- Keep `bridge` specific enough to teach the connection; “these fields are related” is not sufficient.
- Use `distinction` to prevent the student from treating neighboring fields as interchangeable.
- Write `sharedQuestion` as a real question that makes sense from either disciplinary lens.
- Make `explorationStep` specific enough that a beginner could act on it without already knowing the literature.
- Classify the bridge with one to three connection kinds; do not encode strength or confidence.
- Supply two to five phrases that work in an interdisciplinary literature search.
- Give each search level one to five distinct phrases. The orientation search establishes vocabulary, the focused search names the intersection, and the review search helps locate recent overviews.
- Link only to an available module and an existing direction. Do not point students toward unfinished experiences.
- Keep the list selective. A missing link is better than a weak or misleading connection.
- Review both sides of every bridge with appropriate subject knowledge.
- Keep each copy field concise and never use match percentages, “perfect match,” or other cross-field scoring language.

Links need not be reciprocal. A direction may provide a useful next lens even when the reverse journey would need different framing.

## Student experience

The results page shows a field bridge only when the current primary direction has curated link data. It identifies the adjacent pathfinder and direction, explains the overlap and boundary, offers shared search language, and links to the target pathfinder with Next.js client navigation.

Opening another pathfinder does not auto-answer its survey or declare its target niche a match. Progress in the current module remains stored under its existing local namespace, and the destination follows its own introduction, questions, scoring, and results process.

## Graph and destination helpers

`resolveInterdisciplinaryDestination()` resolves a link against released module and niche identities. `buildInterdisciplinaryGraph()` creates deterministic incoming and outgoing edges only for valid released destinations. Grouping helpers organize edges by destination field or connection kind without producing a cross-field score.

The graph is an authoring and presentation model, not a recommendation engine. One-way links are valid, edge order follows the curated module data, and unresolved links are excluded from the graph while validation reports the underlying problem.

## Validation safeguards

Definition validation checks IDs, source directions, target separation, copy completeness, connection categories, shared-question form, first steps, keyword quality, search seeds, duplicate local targets, copy length, generic language, and misleading score claims. Complete-registry validation additionally checks global link IDs, duplicate directional edges, released destinations, canonical pathfinder and niche labels, and canonical routes.

## Editing workflow

1. Add or update the subject-local `interdisciplinary-links.ts` file.
2. Use canonical target IDs and labels from the released module.
3. Classify the connection, write the shared question and first step, and add all three search-seed groups.
4. Run focused definition and registry validation; read issue paths before changing shared rules.
5. Inspect incoming and outgoing graph coverage. Do not add a reverse link unless its framing is independently useful.
6. Add coverage when introducing a new target subject, rendering pattern, or unusual bridge.
7. Run the full release gate and review the connected result at phone and desktop widths.
