# Hub orientation baseline

Recorded October 9, 2026 before Hub Orientation Phase 1.

## Current student experience

The root route is a server-rendered hub with four released pathfinder cards in a stable registry order. Students can open any pathfinder directly; the hub does not currently ask questions or recommend where to begin.

Each card resolves its matching definition and reads only that module's local progress record. It then presents a start, continue, or review action. A separate hub record remembers the most recently visited available pathfinder. No hub or subject progress leaves the browser.

The hub also provides:

- one clear page heading, skip navigation, labeled section navigation, and semantic card articles;
- a concise explanation of the shared pathfinder outcome;
- focus-area summaries, approximate duration, and saved-progress reassurance;
- a recent-pathfinder return action when a valid local record exists;
- direct access to every released module without requiring an orientation flow.

## Existing source boundaries

- `components/PathfinderHub.tsx` composes the static server-rendered hub.
- `components/PathfinderCard.tsx` reads subject progress in a narrow client boundary.
- `components/RecentPathfinder.tsx` reads the separate recent-visit record.
- `data/pathfinder-modules.ts` is the canonical ordered registry.
- `data/pathfinders.ts` derives public catalog entries from the registry.
- `lib/hub-persistence.ts` validates the recent-visit record.
- Hub, catalog, accessibility, persistence, and navigation behavior have focused tests.

## Constraints for orientation work

The orientation layer must remain optional and shorter than a subject pathfinder. It must not replace direct browsing, compare subject-survey scores, transfer answers into a pathfinder, grade prior knowledge, or erase existing progress. Recommendations must be deterministic, traceable to selected answers, and able to preserve multiple possibilities when a student is unsure.

Phase 1 adds contracts, content, validation, and pure ranking logic only. Phase 2 will introduce the visible guided experience.
