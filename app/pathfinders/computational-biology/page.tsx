import type { Metadata } from "next";
import { PathfinderApp } from "@/components/PathfinderApp";
import { PathfinderVisitTracker } from "@/components/PathfinderVisitTracker";
import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology/pathfinder";

export const metadata: Metadata = {
  title: "Computational Biology Pathfinder",
  description:
    "Narrow broad computational biology interests into a promising research direction and a practical literature-search starting point.",
  alternates: { canonical: "/pathfinders/computational-biology" },
  openGraph: {
    title: "Computational Biology Pathfinder",
    description:
      "Explore biological scales, evidence, computational methods, and research styles—then leave with a focused direction and literature-search launchpad.",
    url: "/pathfinders/computational-biology",
  },
};

export default function ComputationalBiologyPathfinderPage() {
  return (
    <>
      <PathfinderVisitTracker pathfinderId="computational-biology" />
      <PathfinderApp definition={computationalBiologyPathfinder} />
    </>
  );
}
