export function HubOrientationNextSteps({
  primaryName,
  alternativeName,
}: {
  primaryName?: string;
  alternativeName?: string;
}) {
  const hasSuggestion = Boolean(primaryName);
  const steps = hasSuggestion
    ? [
        {
          title: `Open ${primaryName}`,
          description:
            "Read its introduction and notice which examples or questions make you want to keep going.",
        },
        {
          title: "Complete the deeper pathfinder",
          description:
            "Narrow the broad field into one promising sub-niche and two nearby alternatives.",
        },
        {
          title: `Keep ${alternativeName ?? "the nearby field"} in view`,
          description:
            "Bring both lenses into the workshop, then use the literature launchpad from the field you choose first.",
        },
      ]
    : [
        {
          title: "Scan all four field cards",
          description:
            "Notice the systems and typical questions rather than searching for a perfect label.",
        },
        {
          title: "Open two introductions",
          description:
            "Compare their examples for a minute or two; you do not need to finish both surveys.",
        },
        {
          title: "Choose the one that creates another question",
          description:
            "Complete that deeper pathfinder and bring its three directions into the workshop.",
        },
      ];

  return (
    <section
      className="hub-orientation-next-steps"
      aria-labelledby="hub-orientation-next-steps-title"
    >
      <div>
        <p className="section-kicker">From orientation to exploration</p>
        <h3 id="hub-orientation-next-steps-title">Your next three moves.</h3>
        <p>
          This short guide chooses a doorway. The subject pathfinder and
          literature search do the real narrowing.
        </p>
      </div>
      <ol>
        {steps.map((step, index) => (
          <li key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>{step.title}</strong>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
