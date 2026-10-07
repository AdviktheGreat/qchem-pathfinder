import type { Metadata } from "next";
import { PathfinderApp } from "@/components/PathfinderApp";
import { PathfinderVisitTracker } from "@/components/PathfinderVisitTracker";
import { computationalPhysicsPathfinder } from "@/data/pathfinders/computational-physics/pathfinder";

export const metadata: Metadata = {
  title: "Computational Physics Pathfinder",
  description:
    "Narrow broad computational physics interests into a promising research direction and a practical literature-search starting point.",
  alternates: { canonical: "/pathfinders/computational-physics" },
  openGraph: {
    title: "Computational Physics Pathfinder",
    description:
      "Explore physical systems, scales, evidence, numerical methods, and research styles—then leave with a focused direction and literature-search launchpad.",
    url: "/pathfinders/computational-physics",
  },
};

export default function ComputationalPhysicsPathfinderPage() {
  return (
    <>
      <PathfinderVisitTracker pathfinderId="computational-physics" />
      <PathfinderApp definition={computationalPhysicsPathfinder} />
    </>
  );
}
