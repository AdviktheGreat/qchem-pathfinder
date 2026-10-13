# Hub orientation

Hub orientation is an optional two-to-four-minute guide for students who are interested in computational research but do not yet know which subject pathfinder to open first.

## Product promise

The guide uses a small number of accessible preference questions to suggest:

- one **good place to start**;
- one **nearby alternative** worth keeping open;
- a short explanation grounded in the student's selected interests and working style.

Students may ignore the guide and browse every pathfinder directly. A suggestion is a starting point, not a verdict about talent, identity, future study, or the objective value of a field.

## Boundaries

Hub orientation must not:

- test scientific knowledge or mathematical ability;
- reuse or compare scores from subject pathfinders;
- declare a perfect match or hide other available modules;
- transfer hub answers into a subject survey;
- penalize uncertainty, mixed interests, or limited experience;
- collect names, contact details, demographic data, or other personal information;
- transmit answers or progress away from the current browser.

## Recommendation principles

Strong, specific preferences may contribute more than broad preferences. Conflicting signals should produce a balanced result rather than an error. Honest uncertainty choices contribute no scoring evidence and keep all modules open. Ties remain ties until stable registry order is needed only for deterministic display.

User-facing explanations must identify the selected answer that contributed to each reason. The interface should describe interest fit and working-style fit separately, then name any meaningful ambiguity.

## Relationship to subject pathfinders

The hub answers only “Which complete exploration might be a useful first stop?” Each subject pathfinder independently answers “Which sub-niche within this subject is worth exploring?” Opening a recommended module starts or resumes that module on its own terms.

Interdisciplinary bridges remain a later results feature. They can reassure students that neighboring fields stay open, but they do not alter hub rankings or move answers between modules.

## Architecture and visible guide

The orientation system is split into editable layers:

- `data/hub-orientation-signals.ts` owns the shared motivation, system, question, and working-style vocabulary.
- Each entry in `data/pathfinder-modules.ts` owns a scientific summary, a boundary, and weighted affinities with student-facing reasons.
- `lib/hub-orientation-validation.ts` checks the vocabulary and every released module profile without mutating either.
- `lib/hub-orientation-ranking.ts` converts future answer evidence into stable rankings and answer-grounded reasons.
- `data/hub-orientation-questions.ts` defines the five core choices and two optional boundary follow-ups.
- `lib/hub-orientation-branching.ts` derives the current question path and removes answers when an edited choice closes a branch.
- `lib/hub-orientation-answers.ts` converts selected options into the evidence consumed by the ranker.
- `components/HubOrientationGuide.tsx` owns the short, optional intro-to-results flow without turning the whole hub into a client component.

To add a signal, give it a lowercase `dimension:value` ID, an accessible label, and a concise explanation. Then add it only to module profiles where the connection is scientifically meaningful. Affinity strengths use a deliberately small scale: `1` is a neighboring connection, `2` is a meaningful fit, and `3` is central to the pathfinder.

To add a released module, supply at least one affinity in every orientation dimension and run configuration validation. Coming-soon modules cannot participate in orientation recommendations.

## Student journey

Students can browse the full directory immediately or choose **Help me choose**. The guide asks five focused questions about broad curiosity, preferred system, research question, working style, and applied/fundamental balance. A molecular-versus-materials or biology-versus-physics follow-up appears only when the existing answers make that boundary useful, so the journey contains five to seven decisions.

Every core question includes **I’m not sure yet**. It contributes no scoring evidence and does not trigger a follow-up. If an edited answer makes a follow-up irrelevant, that hidden answer is deleted before ranking so it cannot contradict the visible profile.

The result presents one good place to start, one nearby alternative, answer-grounded reasons, and an honest boundary for each suggestion. Students can open either complete pathfinder, review their choices, or return to all four modules. When no positive evidence exists, the interface keeps every path open instead of manufacturing a recommendation.

The guide does not currently persist its own answers. Subject-pathfinder progress remains independently saved, and opening a suggested pathfinder starts or resumes that module normally.

## Scoring behavior

The ranking engine multiplies answer-evidence weight by module-affinity strength and sums the contributions. It does not normalize the result into a percentage. Repeated evidence for one signal is consolidated to its strongest instance rather than double counted.

Uncertainty evidence contributes nothing. Unknown, blank, non-finite, or non-positive evidence is ignored safely. Conflicting preferences contribute to each relevant module, and equal scores retain canonical registry order solely for deterministic display. Every generated reason keeps the label of the answer that produced it.
