import type { Metadata } from "next";
import { PathfinderApp } from "@/components/PathfinderApp";

export const metadata: Metadata = {
  title: "Quantum Chemistry Pathfinder",
  description:
    "Narrow broad quantum chemistry interests into a promising research direction and a practical literature-search starting point.",
};

export default function QuantumChemistryPathfinderPage() {
  return <PathfinderApp />;
}
