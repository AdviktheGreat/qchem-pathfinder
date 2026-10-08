# Route and activation template

Do not create a public route or register a module until its assembled definition and release tests are complete. Keeping the subject folder under `templates/` or an unregistered `data/pathfinders/<id>/` folder does not create an App Router route.

## 1. Create the manifest

Add a named manifest to `data/pathfinder-modules.ts` with `definePathfinderModule()`:

```ts
export const exampleScienceModule = definePathfinderModule({
  lifecycle: "available",
  definition: exampleSciencePathfinder,
  catalog: {
    eyebrow: "A concise scientific neighborhood",
    description: "What students will explore.",
    outcome: "The useful map they will leave with.",
    focusAreas: ["System", "Question", "Method"],
    duration: "About 10 minutes",
  },
  metadata: {
    description: "A concise route description.",
    openGraphDescription: "A concise sharing description.",
  },
});
```

Append it to `pathfinderModules` only when it is ready to appear in the released order. Identity, route, status, catalog entry, switcher destination, and definition lookup will then derive from this single registration.

## 2. Add the App Router page

Create `app/pathfinders/<id>/page.tsx` as a Server Component:

```tsx
import type { Metadata } from "next";
import { PathfinderApp } from "@/components/PathfinderApp";
import { PathfinderVisitTracker } from "@/components/PathfinderVisitTracker";
import { exampleScienceModule } from "@/data/pathfinder-modules";
import { createPathfinderMetadata } from "@/lib/pathfinder-metadata";

export const metadata: Metadata =
  createPathfinderMetadata(exampleScienceModule);

export default function ExampleSciencePathfinderPage() {
  const { definition } = exampleScienceModule;

  return (
    <>
      <PathfinderVisitTracker pathfinderId={definition.identity.id} />
      <PathfinderApp definition={definition} />
    </>
  );
}
```

The page stays server-rendered and passes a serializable local definition across the client boundary. It must not access `window`, `localStorage`, hooks, or event handlers directly.

## 3. Confirm activation

Before pushing the activation commit:

- verify the manifest ID, definition ID, route segment, canonical metadata URL, and storage namespace agree;
- verify the hub card and switcher destination are derived without editing either component;
- run the full tests and production build and confirm the new route is statically prerendered;
- test start, pause, refresh, review, results, nearby selection, export, print, and restart;
- review phone, tablet, desktop, keyboard, reduced-motion, and forced-color behavior.

Never create a placeholder `page.tsx` for an unfinished module. Use a `coming-soon` manifest only when a non-interactive roadmap card is intentionally useful.
