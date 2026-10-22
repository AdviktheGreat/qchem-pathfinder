import { Network } from "lucide-react";
import type { InterdisciplinaryArrival } from "@/lib/interdisciplinary-destinations";

export function InterdisciplinaryArrivalBanner({
  arrival,
}: {
  arrival: InterdisciplinaryArrival;
}) {
  return (
    <aside
      className="interdisciplinary-arrival no-print"
      aria-labelledby="interdisciplinary-arrival-title"
    >
      <Network size={18} aria-hidden="true" />
      <div>
        <p className="section-kicker">Following an interdisciplinary bridge</p>
        <h2 id="interdisciplinary-arrival-title">
          From {arrival.sourceNicheName} to {arrival.targetNicheName}
        </h2>
        <p>
          You came from the {arrival.sourcePathfinderName} pathfinder to explore
          this neighboring lens. Your answers there have not been copied or
          scored here.
        </p>
        <p className="interdisciplinary-arrival-question">
          <strong>Question connecting the fields:</strong>{" "}
          {arrival.sharedQuestion}
        </p>
      </div>
    </aside>
  );
}
