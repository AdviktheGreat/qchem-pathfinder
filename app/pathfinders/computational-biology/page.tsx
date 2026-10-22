import type { Metadata } from "next";
import { PathfinderApp } from "@/components/PathfinderApp";
import { PathfinderVisitTracker } from "@/components/PathfinderVisitTracker";
import {
  computationalBiologyModule,
  pathfinderModules,
} from "@/data/pathfinder-modules";
import {
  resolveInterdisciplinaryArrival,
  type InterdisciplinarySearchParams,
} from "@/lib/interdisciplinary-destinations";
import { createPathfinderMetadata } from "@/lib/pathfinder-metadata";

export const metadata: Metadata = createPathfinderMetadata(
  computationalBiologyModule,
);

export default async function ComputationalBiologyPathfinderPage({
  searchParams,
}: {
  searchParams: Promise<InterdisciplinarySearchParams>;
}) {
  const { definition } = computationalBiologyModule;
  const bridgeArrival = resolveInterdisciplinaryArrival(
    await searchParams,
    definition,
    pathfinderModules,
  );

  return (
    <>
      <PathfinderVisitTracker pathfinderId={definition.identity.id} />
      <PathfinderApp definition={definition} bridgeArrival={bridgeArrival} />
    </>
  );
}
