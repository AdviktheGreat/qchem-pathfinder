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
          {intro.scopeNote && (
            <p className="intro-scope-note">{intro.scopeNote}</p>
          )}
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
          {intro.privacyNote && (
            <details className="privacy-details">
              <summary>How your progress is saved</summary>
              <p>{intro.privacyNote}</p>
            </details>
          )}
        </div>
        <ResearchMapPreview />
      </section>

      <section className="promise-strip" aria-label="How the pathfinder works">
        {intro.promiseSteps.map((step, index) => (
          <div key={step.label}>
            <span>0{index + 1}</span>
            <p>
              <strong>{step.label}</strong> {step.text}
            </p>
          </div>
        ))}
        <div className="privacy-promise">
          <GitBranch size={17} />
          <p>{intro.branchingNote}</p>
        </div>
      </section>
    </>
  );
}
