import {
  ArrowRight,
  Clock3,
  GitBranch,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { ResearchMapPreview } from "@/components/ResearchMapPreview";
import type { PathfinderIntroCopy } from "@/lib/pathfinder-definition";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";

interface IntroScreenProps {
  intro?: PathfinderIntroCopy;
  hasProgress: boolean;
  resumeDetail: string;
  onBegin: () => void;
  onResume: () => void;
}

export function IntroScreen({
  intro = quantumChemistryPathfinder.intro,
  hasProgress,
  resumeDetail,
  onBegin,
  onResume,
}: IntroScreenProps) {
  return (
    <>
      <section className="hero" aria-labelledby="intro-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <Sparkles size={15} /> {intro.eyebrow}
          </p>
          <h1 id="intro-title" tabIndex={-1}>
            {intro.title}
          </h1>
          <p className="lede">{intro.description}</p>
          <div className="hero-actions">
            <button
              className="primary-button"
              type="button"
              onClick={hasProgress ? onResume : onBegin}
            >
              {hasProgress ? "Continue exploring" : "Begin exploring"}{" "}
              <ArrowRight size={18} />
            </button>
            {hasProgress && <span className="resume-note">{resumeDetail}</span>}
            {hasProgress && (
              <button className="text-button" type="button" onClick={onBegin}>
                Start from my first answer
              </button>
            )}
          </div>
          <div className="reassurance-row" aria-label="What to expect">
            <span>
              <Clock3 size={15} /> {intro.durationLabel}
            </span>
            <span>
              <ShieldCheck size={15} /> {intro.privacyLabel}
            </span>
            <span>
              <SlidersHorizontal size={15} /> {intro.noScoreLabel}
            </span>
          </div>
        </div>
        <ResearchMapPreview />
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
          <GitBranch size={17} />
          <p>
            Your answers shape the next questions, not a hidden personality
            label.
          </p>
        </div>
      </section>
    </>
  );
}
