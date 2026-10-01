import type { Metadata } from "next";
import { PathfinderApp } from "@/components/PathfinderApp";
import { PathfinderVisitTracker } from "@/components/PathfinderVisitTracker";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";

export const metadata: Metadata = {
  title: "Computational Materials Pathfinder",
  description:
    "Narrow broad computational materials interests into a promising research direction and a practical literature-search starting point.",
};

export default function ComputationalMaterialsPathfinderPage() {
  return (
    <>
      <PathfinderVisitTracker pathfinderId="computational-materials" />
      <PathfinderApp definition={computationalMaterialsPathfinder} />
    </>
  );
}
