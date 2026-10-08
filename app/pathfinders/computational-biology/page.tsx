import type { Metadata } from "next";
import { PathfinderApp } from "@/components/PathfinderApp";
import { PathfinderVisitTracker } from "@/components/PathfinderVisitTracker";
import { computationalBiologyModule } from "@/data/pathfinder-modules";
import { createPathfinderMetadata } from "@/lib/pathfinder-metadata";

export const metadata: Metadata = createPathfinderMetadata(
  computationalBiologyModule,
);

export default function ComputationalBiologyPathfinderPage() {
  const { definition } = computationalBiologyModule;

  return (
    <>
      <PathfinderVisitTracker pathfinderId={definition.identity.id} />
      <PathfinderApp definition={definition} />
    </>
  );
}
