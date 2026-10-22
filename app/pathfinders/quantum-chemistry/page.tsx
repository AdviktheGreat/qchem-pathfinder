import type { Metadata } from "next";
import { PathfinderApp } from "@/components/PathfinderApp";
import { PathfinderVisitTracker } from "@/components/PathfinderVisitTracker";
import { quantumChemistryModule } from "@/data/pathfinder-modules";
import { pathfinderModules } from "@/data/pathfinder-modules";
import {
  resolveInterdisciplinaryArrival,
  type InterdisciplinarySearchParams,
} from "@/lib/interdisciplinary-destinations";
import { createPathfinderMetadata } from "@/lib/pathfinder-metadata";

export const metadata: Metadata = createPathfinderMetadata(
  quantumChemistryModule,
);

export default async function QuantumChemistryPathfinderPage({
  searchParams,
}: {
  searchParams: Promise<InterdisciplinarySearchParams>;
}) {
  const { definition } = quantumChemistryModule;
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
