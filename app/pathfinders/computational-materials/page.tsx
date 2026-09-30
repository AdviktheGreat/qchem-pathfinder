import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Computational Materials Pathfinder",
  description:
    "Narrow broad computational materials interests into a promising research direction and a practical literature-search starting point.",
};

export default function ComputationalMaterialsPathfinderPage() {
  // Keep the unfinished survey inaccessible until its questions, taxonomy,
  // recommendations, and search guidance are complete.
  notFound();
}
