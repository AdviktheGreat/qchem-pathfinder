import type { Metadata } from "next";
import { PathfinderApp } from "@/components/PathfinderApp";
import { PathfinderVisitTracker } from "@/components/PathfinderVisitTracker";
import { computationalPhysicsModule } from "@/data/pathfinder-modules";
import { createPathfinderMetadata } from "@/lib/pathfinder-metadata";

export const metadata: Metadata = createPathfinderMetadata(
  computationalPhysicsModule,
);

export default function ComputationalPhysicsPathfinderPage() {
  const { definition } = computationalPhysicsModule;

  return (
    <>
      <PathfinderVisitTracker pathfinderId={definition.identity.id} />
      <PathfinderApp definition={definition} />
    </>
  );
}
