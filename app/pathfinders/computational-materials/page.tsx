import type { Metadata } from "next";
import { PathfinderApp } from "@/components/PathfinderApp";
import { PathfinderVisitTracker } from "@/components/PathfinderVisitTracker";
import { computationalMaterialsModule } from "@/data/pathfinder-modules";
import { createPathfinderMetadata } from "@/lib/pathfinder-metadata";

export const metadata: Metadata = createPathfinderMetadata(
  computationalMaterialsModule,
);

export default function ComputationalMaterialsPathfinderPage() {
  const { definition } = computationalMaterialsModule;

  return (
    <>
      <PathfinderVisitTracker pathfinderId={definition.identity.id} />
      <PathfinderApp definition={definition} />
    </>
  );
}
