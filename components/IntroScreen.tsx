import {
  ArrowRight,
  BookOpen,
  Check,
  Compass,
  FlaskConical,
  Sparkles,
} from "lucide-react";

interface IntroScreenProps {
  hasProgress: boolean;
  onBegin: () => void;
  onResume: () => void;
}

export function IntroScreen({
  hasProgress,
  onBegin,
  onResume,
}: IntroScreenProps) {
  return (
    <>
      <section className="hero" aria-labelledby="intro-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <Sparkles size={15} /> A guided research exploration
          </p>
          <h1 id="intro-title">
            Find the question-space that makes you want to look closer.
          </h1>
          <p className="lede">
            You know the broad landscape. In about ten minutes, we’ll help you
            identify one promising quantum chemistry direction—and two nearby
            paths worth keeping open.
          </p>
          <div className="hero-actions">
            <button
              className="primary-button"
              type="button"
              onClick={hasProgress ? onResume : onBegin}
            >
              {hasProgress ? "Continue exploring" : "Begin exploring"}{" "}
              <ArrowRight size={18} />
            </button>
            {hasProgress && (
              <button className="text-button" type="button" onClick={onBegin}>
                Start from my first answer
              </button>
            )}
          </div>
          <p className="microcopy">
            No grades. No wrong answers. Limited experience never closes a door.
          </p>
        </div>

        <aside className="field-note" aria-label="What you will leave with">
          <div className="orbit" aria-hidden="true">
            <span />
          </div>
          <p className="field-label">Your field note</p>
          <h2>A direction, not a verdict.</h2>
          <ul>
            <li>
              <Compass size={17} /> One well-matched sub-niche
            </li>
            <li>
              <FlaskConical size={17} /> Two nearby alternatives
            </li>
            <li>
              <BookOpen size={17} /> Search language to start reading
            </li>
          </ul>
          <p className="field-foot">
            You choose a final research question later, after the literature
            shows what is known—and what is still open.
          </p>
        </aside>
      </section>

      <section className="promise-strip" aria-label="How the pathfinder works">
        <div>
          <span>01</span>
          <p>
            <strong>Notice</strong> what naturally holds your attention.
          </p>
        </div>
        <div>
          <span>02</span>
          <p>
            <strong>Narrow</strong> with a few questions shaped by your choices.
          </p>
        </div>
        <div>
          <span>03</span>
          <p>
            <strong>Launch</strong> into the literature with useful search
            terms.
          </p>
        </div>
        <div className="privacy-promise">
          <Check size={17} />
          <p>No names, accounts, or transmitted answers.</p>
        </div>
      </section>
    </>
  );
}
