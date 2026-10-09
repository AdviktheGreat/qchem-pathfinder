# Pathfinder engine architecture

Research Pathfinder separates the reusable survey experience from the scientific
content that makes each pathfinder distinct. This contract keeps new subject
areas consistent without turning the original quantum chemistry module into a
template that must be copied and edited.

## Platform responsibilities

The shared engine owns behavior that should be identical across pathfinders:

- one-question-at-a-time navigation, progress, review, and restart flows;
- conditional-question visibility and removal of answers from hidden branches;
- answer-conflict resolution for single choices and uncertainty options;
- deterministic scoring, ranking, ties, and open-exploration behavior;
- versioned local persistence and recovery of valid saved progress;
- primary and nearby-direction presentation, print behavior, and export actions;
- keyboard interaction, focus management, reduced motion, and status messages.

Shared behavior belongs in `components/` and `lib/`. It must receive the active
pathfinder definition rather than importing one subject's data directly.

## Pathfinder responsibilities

Each pathfinder owns its editable scientific content and identity:

- stable ID, route, storage namespace, name, icon, and interface labels;
- introduction and educational framing;
- stage names, questions, options, signals, and branch rules;
- recommendation taxonomy, affinities, direct boosts, and reason rules;
- preparation guidance, glossary, reading guidance, and concept relationships;
- open-exploration starting directions and export terminology.
- selective interdisciplinary bridges from local results to released adjacent directions.

Subject content belongs in a dedicated module under `data/pathfinders/`. A
single typed definition is the entry point consumed by the engine. Content
objects must remain serializable because the App Router page passes the
definition into an interactive client component.

## Module manifests and registry

`data/pathfinder-modules.ts` is the canonical release registry. Each manifest keeps a completed definition together with hub-specific catalog copy, route metadata copy, and its lifecycle state. Definition lookup, the hub catalog, available navigation, and standardized route metadata are projections from this registry; they must not maintain separate identity lists.

Use `definePathfinderModule()` so TypeScript preserves the manifest's literal identity while checking the complete contract. App Router pages remain Server Components: they select their registered manifest, generate static `Metadata` with `createPathfinderMetadata()`, and pass only the serializable definition into `PathfinderApp`.

The pure validators in `lib/pathfinder-validation.ts` check one definition, one manifest, or the complete registry. They report stable issue codes and field paths without mutating content. See [Pathfinder validation rules](pathfinder-validation.md) for the rule catalog and authoring workflow.

Interdisciplinary links remain subject-owned serializable content. Complete-registry validation resolves every target against canonical module and niche identities, while the shared results component handles display and navigation. See [Interdisciplinary link format](interdisciplinary-links.md) for the data and editorial contract.

## Dependency direction

Dependencies flow in one direction:

```text
App Router page
  -> pathfinder definition
    -> shared PathfinderApp
      -> shared screens and domain functions
```

Shared modules must not import a concrete pathfinder definition. Definitions
may import shared types and pure helpers. Route pages select the definition and
provide metadata, while browser state remains inside the client application.

## Stability requirements

Refactoring the engine must preserve the completed quantum chemistry behavior.
Every extraction should keep existing tests passing before the next dependency
is moved. A second pathfinder must use a distinct storage key so progress can
coexist on the same device.

Adding a pathfinder should ultimately require four actions:

1. Create and validate its typed content definition.
2. Create one module manifest containing its catalog and metadata copy.
3. Render `PathfinderApp` with that registered definition from its route, then mark the manifest available only after the experience is complete.
4. Add subject-specific fixtures, reachability checks, and full-journey tests.

Numeric scores remain an internal ranking tool. User-facing results explain
the answers that contributed to a direction and never present a fabricated
match percentage or a claim that one field is objectively perfect.
