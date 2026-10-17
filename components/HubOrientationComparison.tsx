export interface HubOrientationComparisonField {
  name: string;
  label: string;
  systems: string;
  questions: string;
  outcome: string;
}

export function HubOrientationComparison({
  primary,
  alternative,
}: {
  primary: HubOrientationComparisonField;
  alternative: HubOrientationComparisonField;
}) {
  return (
    <section
      className="hub-orientation-comparison"
      aria-labelledby="hub-orientation-comparison-title"
    >
      <div>
        <p className="section-kicker">Two scientific lenses</p>
        <h3 id="hub-orientation-comparison-title">
          Compare the two starting points.
        </h3>
        <p>
          Both can use overlapping methods. The difference is what each field
          keeps at the center of the research question.
        </p>
      </div>
      <div className="hub-orientation-comparison-grid">
        {[primary, alternative].map((field) => (
          <article key={field.name}>
            <span>{field.label}</span>
            <h4>{field.name}</h4>
            <dl>
              <div>
                <dt>Systems</dt>
                <dd>{field.systems}</dd>
              </div>
              <div>
                <dt>Typical questions</dt>
                <dd>{field.questions}</dd>
              </div>
              <div>
                <dt>Pathfinder outcome</dt>
                <dd>{field.outcome}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
