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

Subject content belongs in a dedicated module under `data/pathfinders/`. A
single typed definition is the entry point consumed by the engine. Content
objects must remain serializable because the App Router page passes the
definition into an interactive client component.

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
2. Render `PathfinderApp` with that definition from its route.
3. Add the route to the hub catalog only after the experience is complete.
4. Add subject-specific fixtures, reachability checks, and full-journey tests.

Numeric scores remain an internal ranking tool. User-facing results explain
the answers that contributed to a direction and never present a fabricated
match percentage or a claim that one field is objectively perfect.
