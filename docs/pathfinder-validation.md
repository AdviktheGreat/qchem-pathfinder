# Pathfinder validation rules

The shared validator turns the platform contract into actionable checks for new and edited modules. It does not replace scientific review, representative student journeys, reachability proofs, accessibility review, or production-browser testing.

## Validation levels

`lib/pathfinder-validation.ts` exposes three pure functions:

- `validatePathfinderDefinition(definition)` checks one subject's identity, survey, adaptive branches, scoring evidence, taxonomy, literature launchpads, preparation guidance, results copy, and export mappings.
- `validatePathfinderModuleManifest(manifest)` adds catalog and route-metadata checks around a definition. Coming-soon manifests receive the smaller identity and catalog checks appropriate to that lifecycle state.
- `validatePathfinderRegistry(manifests)` validates every manifest and catches collisions in IDs, names, public routes, and local-storage namespaces.

Each returns `{ valid, issues }`. An issue has a stable `code`, a precise `path`, and a human-readable `message`, so a failing test points an instructor toward the editable field.

```ts
const result = validatePathfinderModuleManifest(myPathfinderModule);

expect(result.issues, JSON.stringify(result.issues, null, 2)).toEqual([]);
```

## Protected invariants

The rules protect these authoring boundaries:

- definitions remain serializable across the App Router server-to-client boundary;
- IDs, routes, versions, question IDs, option IDs, and selection limits are well formed;
- visibility rules point backward to real questions and options;
- calibration IDs stay aligned and uncertainty answers add no evidence;
- signal, affinity, boost, and scoring weights are finite and meaningful;
- each result direction contains complete research, method, preparation, and comparison content;
- each literature launchpad contains focused keywords, related phrases, three distinct queries, and paper-type guidance;
- reasons use signals that actually contribute to the direction;
- targeted choices and open-exploration defaults point to real directions;
- preparation, overview, profile, and export mappings point to real questions and options;
- catalog copy, search providers, metadata, routes, and storage namespaces remain usable and unique.

## Authoring workflow

1. Copy `templates/pathfinder-module/` and keep the new module outside `data/pathfinder-modules.ts`.
2. Add a focused validator test as soon as the definition and manifest assemble.
3. Read every returned issue from top to bottom; fixing an earlier structural issue often removes later reference issues.
4. Add subject-specific branching, uncertainty, scoring, reachability, persistence, export, rendered-journey, and accessibility tests.
5. Register the module only after its focused validation and the full registry validation both pass.
6. Run the complete release gate and perform scientific and production-browser review.

Do not weaken a shared rule merely to silence an incomplete draft. If a subject genuinely needs a different invariant, document the scientific or product reason and change the contract, template, validator, and tests together.
