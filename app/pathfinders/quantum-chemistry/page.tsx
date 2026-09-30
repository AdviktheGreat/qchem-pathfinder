import type { Metadata } from "next";
import { PathfinderApp } from "@/components/PathfinderApp";
import { PathfinderVisitTracker } from "@/components/PathfinderVisitTracker";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";

export const metadata: Metadata = {
  title: "Quantum Chemistry Pathfinder",
  description:
    "Narrow broad quantum chemistry interests into a promising research direction and a practical literature-search starting point.",
};

export default function QuantumChemistryPathfinderPage() {
  return (
    <>
      <PathfinderVisitTracker pathfinderId="quantum-chemistry" />
      <PathfinderApp definition={quantumChemistryPathfinder} />
    </>
  );
}
