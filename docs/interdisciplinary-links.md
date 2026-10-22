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

The hub introduces the pathfinder collection as connected without asking students to choose every field at once. The results page shows a field bridge only when the current primary direction has curated link data. It identifies the connection category, adjacent pathfinder and direction, shared question, overlap, boundary, two research lenses, and a concrete first step. Orientation, focused, and review searches can be inspected and copied separately, while a complete bridge note supports workshop use.

Opening another pathfinder carries only validated bridge IDs in the URL. The destination resolves them against released definitions, explains the arrival context, and offers a return control to the original saved result. It does not auto-answer the new survey or declare its target niche a match. Progress in the current module remains stored under its existing local namespace, and the destination follows its own introduction, questions, scoring, and results process. Bridge details and all three search levels are included in plain-text profiles and print layouts.

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

## Instructor review workflow

An instructor can revise student-facing bridge language without changing ranking behavior: bridge records are presentation and exploration data, not recommendation weights. Review the source result and destination direction together before editing.

1. Read the source niche, target niche, and existing row in the [scientific review matrix](interdisciplinary-bridge-review-matrix.md).
2. Check that `sharedQuestion` is answerable from both fields and that `distinction` clearly names the different system, scale, evidence, or goal.
3. Read the generated orientation, focused, and review queries aloud. They should use real disciplinary vocabulary without assuming a specific paper exists.
4. Keep the first step manageable for a student beginning a literature review; it should say what kind of source or comparison to begin with.
5. Update the matrix row’s evidence basis, boundary, and terminology whenever the scientific framing changes.
6. Preview the source result, exported profile, print layout, destination arrival banner, and return link.

Passing tests protect structure and consistency, but they do not replace subject-matter review. When a bridge crosses expertise areas, ask a reviewer familiar with both sides or two reviewers with complementary expertise.

## Maintainer change recipes

### Add a bridge

1. Add one typed record to the source module’s `interdisciplinary-links.ts` file. Use a globally unique ID whose words make the source and destination recognizable.
2. Copy canonical IDs and labels from the registered definitions; do not retype a shortened display name.
3. Add the new ID to the scientific review matrix after editorial review.
4. Confirm the source module still connects selectively to at least two neighboring fields and uses varied connection kinds.
5. Add a rendered journey if the bridge introduces a new destination pattern or UI state.

### Revise or rename a bridge

- Copy-only changes should preserve the ID unless the scientific relationship itself changes.
- A renamed module or niche must update every incoming bridge label. Registry validation reports stale names and IDs with the exact source link path.
- If a niche ID changes, update its local source references, all incoming `targetNicheId` values, and saved-data migration rules if the niche can be persisted as a chosen result.
- Search-seed changes must keep all three levels non-empty and distinct. Verify the generated query, not only the seed array.

### Remove a bridge

- Remove the source record and its review-matrix row together.
- Check whether the removal drops a released module below the network coverage standard.
- Confirm a result with that source niche now omits the field-bridge section cleanly.
- Old shared URLs are allowed to lose their arrival banner; destination progress remains unaffected because bridge context is optional.

## Focused verification commands

Run structural, graph, network, and editorial checks while editing data:

```bash
npm test -- --run tests/pathfinder-validation.test.ts tests/interdisciplinary-links.test.ts tests/interdisciplinary-graph.test.ts tests/interdisciplinary-review-matrix.test.ts
```

Run student-journey, isolation, export, keyboard, accessibility, and layout checks while editing presentation code:

```bash
npm test -- --run tests/interdisciplinary-journeys.test.tsx tests/interdisciplinary-context-isolation.test.tsx tests/interdisciplinary-bridge.test.tsx tests/interdisciplinary-accessibility-styles.test.ts tests/interdisciplinary-layout.test.tsx tests/interdisciplinary-responsive.test.ts tests/export-persistence.test.ts
```

Before release, run formatting, lint, type checking, the complete test suite, and the production build. In a real browser, review at least one bridge from every pathfinder, one unconnected result, keyboard tab changes, copy feedback, destination arrival and return, refresh restoration, print preview, 200% zoom, a phone viewport, reduced motion, and forced colors or an equivalent high-contrast mode.
