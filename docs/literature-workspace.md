# Literature Exploration Workspace

The Literature Exploration Workspace is the next platform stage after a student receives a pathfinder direction. Phase 1 supplies the local data foundation; it does not add a public route or change the existing hub and pathfinder experiences.

## Educational boundary

The workspace is an organizer, not a literature database or research-question generator. Students enter source details themselves and explicitly mark whether they checked those details against the real source. The model keeps reported findings, reported limitations, and student interpretations in separate fields. Later synthesis tools must preserve that distinction and describe gaps as possibilities to investigate, not facts discovered by the software.

The workspace may eventually help a student prepare several question areas for discussion. It must not rank or declare a final research question.

## Phase 1 structure

- `lib/literature-workspace.ts` owns the serializable contracts and schema version.
- `lib/literature-workspace-state.ts` creates empty, testable workspace records.
- `lib/literature-workspace-sources.ts` applies immutable source changes and removes dependent records safely.
- `lib/literature-workspace-notes.ts` manages reading notes and linked vocabulary.
- `lib/literature-workspace-comparison.ts` manages two- or three-paper comparisons across seven explicit axes.
- `lib/literature-workspace-progress.ts` derives named milestones and a next step without a fake completion percentage.
- `lib/literature-workspace-validation.ts` checks the full object graph and returns path-specific issues.
- `lib/literature-workspace-persistence.ts` reads and writes isolated, versioned browser records.
- `lib/literature-workspace-backup.ts` creates and validates portable JSON backups.

The complete four-phase sequence lives in [the roadmap](literature-workspace-roadmap.md).

## Citation and note states

Every source begins as `unverified`. A future interface may set `student-checked` only after the student confirms the title, author information, year, and destination against the real paper. The state means the student performed that check; it is not an endorsement from Research Pathfinder.

Reading notes use separate lists for:

- research purpose;
- methods and evidence;
- findings and limitations reported by the source;
- the student's interpretations; and
- open questions.

Do not merge reported claims with student inference in UI copy, exports, or migrations.

## Persistence and backups

Each workspace uses `research-pathfinder:literature-workspace:<encoded workspace ID>`. Records remain isolated from every survey, hub guide, and recent-pathfinder key. Storage failures return an `unavailable` state so the later UI can remain usable for the current visit.

Portable backups use a named envelope and an independent backup-format version. Import validates both the envelope and the complete workspace before returning data. Invalid records are not partially loaded, overwritten, or silently repaired in Phase 1.

Backups contain everything the student typed. Future download UI must explain that clearly and must never transmit the file automatically.

## Maintenance rules

1. Increase `LITERATURE_WORKSPACE_SCHEMA_VERSION` when the stored workspace shape changes.
2. Add a forward migration before a released schema changes; version rejection is sufficient only before the public workspace launches.
3. Keep source deletion cascading so notes, vocabulary links, and comparison observations cannot become orphaned.
4. Keep comparison axes explicit and score-free.
5. Validate any new referenced ID against its owning collection.
6. Preserve immutable operations so save, undo, cross-tab, and testing behavior remains predictable.
7. Add focused tests for valid, corrupted, blocked-storage, and import paths.

Run the Phase 1 checks with:

```bash
npx vitest run tests/literature-workspace-foundation.test.ts
npm run typecheck
npm run lint
```
