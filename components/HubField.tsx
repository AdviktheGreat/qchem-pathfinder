import { BookOpenText, Compass, Route, Sparkles } from "lucide-react";

export function HubField() {
  return (
    <div className="hub-field" aria-hidden="true">
      <div className="hub-field-grid" />
      <div className="hub-orbit hub-orbit-one" />
      <div className="hub-orbit hub-orbit-two" />
      <div className="hub-core">
        <Compass size={28} />
        <span>Choose a field</span>
      </div>
      <div className="hub-node hub-node-one">
        <Sparkles size={16} />
        Curiosity
      </div>
      <div className="hub-node hub-node-two">
        <Route size={16} />
        Research style
      </div>
      <div className="hub-node hub-node-three">
        <BookOpenText size={16} />
        Reading trail
      </div>
      <span className="hub-field-label">Research direction mapper</span>
    </div>
  );
}
