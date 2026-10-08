# Platform consolidation baseline

Recorded October 7, 2026 before consolidating module registration. This is the behavior the manifest and registry work must preserve.

## Released modules

| Module                  | Route                                  | Storage key                                   | Typical questions | Directions |
| ----------------------- | -------------------------------------- | --------------------------------------------- | ----------------: | ---------: |
| Quantum Chemistry       | `/pathfinders/quantum-chemistry`       | `quantum-pathfinder:progress`                 |                16 |         18 |
| Computational Materials | `/pathfinders/computational-materials` | `computational-materials-pathfinder:progress` |                17 |         22 |
| Computational Biology   | `/pathfinders/computational-biology`   | `computational-biology-pathfinder:progress`   |                14 |         24 |
| Computational Physics   | `/pathfinders/computational-physics`   | `computational-physics-pathfinder:progress`   |                14 |         28 |

All four modules are available from the hub, registered in the definition lookup, included in the in-pathfinder switcher, and statically prerendered by the production build.

## Registration before consolidation

Module identity is currently repeated across four places:

1. The subject's `PathfinderDefinition` owns its ID, name, short name, route, icon, and storage configuration.
2. `data/pathfinders.ts` repeats catalog identity, route, and availability alongside hub-specific copy.
3. `data/pathfinder-definitions.ts` separately lists definitions for lookup.
4. Each App Router page repeats route metadata and selects its definition directly.

The consolidation should establish one typed manifest per module, derive the shared registries from those manifests, and keep each route as a Server Component that passes a serializable definition to `PathfinderApp`.

## Invariants to preserve

- The hub order remains Quantum Chemistry, Computational Materials, Computational Biology, then Computational Physics.
- IDs, routes, storage keys, storage versions, visible labels, catalog copy, and route metadata remain stable.
- Each module keeps independent local progress and exports the same profile format.
- Shared client components remain driven by the active definition and do not import the full module registry.
- Numeric scores remain meaningful only inside their own taxonomy.
- No module becomes available without a complete definition, route, persistence, results, export, and automated coverage.
- Existing survey branching, scoring, recommendations, and user-facing copy do not change during Phase 1.

## Verification baseline

Before this phase, formatting, ESLint, TypeScript, all 497 tests across 84 files, and the Next.js production build passed. Each consolidation commit should keep relevant tests green; the phase closes with the complete release gate.
