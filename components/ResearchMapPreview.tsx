import { ArrowRight, BookOpenText, Compass, Search } from "lucide-react";
import { ScientificField } from "@/components/ScientificField";

export function ResearchMapPreview() {
  return (
    <aside className="research-map" aria-label="Preview of your research map">
      <ScientificField />
      <div className="map-heading">
        <span>Research map preview</span>
        <Compass size={17} />
      </div>
      <div className="map-flow">
        <div className="map-node interest-node">
          <small>Your signals</small>
          <div>
            <span>What draws you in</span>
            <span>How you investigate</span>
          </div>
        </div>
        <ArrowRight className="map-arrow" size={18} aria-hidden="true" />
        <div className="map-node directions-node">
          <small>Three open doors</small>
          <strong>1 promising direction</strong>
          <span>+ 2 nearby paths</span>
        </div>
        <ArrowRight className="map-arrow" size={18} aria-hidden="true" />
        <div className="map-node search-node">
          <small>Literature launch</small>
          <span>
            <Search size={14} /> Keywords
          </span>
          <span>
            <BookOpenText size={14} /> Search queries
          </span>
        </div>
      </div>
      <p>
        A direction, not a verdict. You choose a research question after the
        literature shows what is known and what remains open.
      </p>
    </aside>
  );
}
