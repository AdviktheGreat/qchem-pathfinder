import Link from "next/link";
import { ArrowLeft, Network } from "lucide-react";
import type { InterdisciplinaryArrival } from "@/lib/interdisciplinary-destinations";

export function InterdisciplinaryArrivalBanner({
  arrival,
}: {
  arrival: InterdisciplinaryArrival;
}) {
  return (
    <aside
      className="interdisciplinary-arrival no-print"
      role="note"
      aria-labelledby="interdisciplinary-arrival-title"
      aria-describedby="interdisciplinary-arrival-description interdisciplinary-arrival-question"
    >
      <Network size={18} aria-hidden="true" />
      <div>
        <p className="section-kicker">Following an interdisciplinary bridge</p>
        <h2 id="interdisciplinary-arrival-title">
          From {arrival.sourceNicheName} to {arrival.targetNicheName}
        </h2>
        <p id="interdisciplinary-arrival-description">
          You came from the {arrival.sourcePathfinderName} pathfinder to explore
          this neighboring lens. Your answers there have not been copied or
          scored here.
        </p>
        <p
          className="interdisciplinary-arrival-question"
          id="interdisciplinary-arrival-question"
        >
          <strong>Question connecting the fields:</strong>{" "}
          {arrival.sharedQuestion}
        </p>
        <Link className="interdisciplinary-return" href={arrival.sourceRoute}>
          <ArrowLeft size={14} aria-hidden="true" />
          Return to {arrival.sourcePathfinderName} result
        </Link>
      </div>
    </aside>
  );
}
