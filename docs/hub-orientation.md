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
- `lib/hub-orientation-balance.ts` converts score relationships into the user-facing open, tied, nearby, or clear result state.
- `lib/hub-orientation-persistence.ts` validates and restores the guide's independent, versioned local record.
- `lib/hub-orientation-workshop-map.ts` builds the typed, score-free workshop map used by copy and download actions.
- `components/HubOrientationGuide.tsx` owns the short, optional intro-to-results flow without turning the whole hub into a client component.

To add a signal, give it a lowercase `dimension:value` ID, an accessible label, and a concise explanation. Then add it only to module profiles where the connection is scientifically meaningful. Affinity strengths use a deliberately small scale: `1` is a neighboring connection, `2` is a meaningful fit, and `3` is central to the pathfinder.

To add a released module, supply at least one affinity in every orientation dimension and run configuration validation. Coming-soon modules cannot participate in orientation recommendations. Add at least one realistic journey to `tests/hub-orientation-release.test.ts` that makes the new module the first result before marking it available.

### Editing questions safely

Question and option IDs are persistence contracts. Keep an existing ID when only its student-facing wording changes. When removing or replacing an ID, expect old saved values to be discarded during validation.

Each core question should:

- ask one preference in accessible, non-evaluative language;
- contain one neutral `uncertainty: true` option with no evidence;
- reference only signals registered in `data/hub-orientation-signals.ts`;
- use larger weights for direct interests than for supporting style clues.

An adaptive question needs a `visibleWhen.anyOf` rule. `updateHubOrientationAnswer` must remain the only live edit path because it repeatedly removes answers from questions that are no longer visible. After changing a branch, test both the path that reveals it and an earlier edit that hides it again.

### Editing module fit profiles

Module affinities live beside the module manifests rather than in UI code. Strength `1` describes a nearby connection, `2` a meaningful fit, and `3` a central connection. Reasons should explain the scientific relationship without claiming aptitude or certainty. Run `validateHubOrientationConfiguration` after changing a profile; it rejects unknown signals, missing dimension coverage, malformed strengths, and incomplete reasons.

## Student journey

Students can browse the full directory immediately or choose **Help me choose**. The guide asks five focused questions about broad curiosity, preferred system, research question, working style, and applied/fundamental balance. A molecular-versus-materials or biology-versus-physics follow-up appears only when the existing answers make that boundary useful, so the journey contains five to seven decisions.

Every core question includes **I’m not sure yet**. It contributes no scoring evidence and does not trigger a follow-up. If an edited answer makes a follow-up irrelevant, that hidden answer is deleted before ranking so it cannot contradict the visible profile.

The result presents one good place to start, one nearby alternative, answer-grounded reasons, and an honest boundary for each suggestion. Students can open either complete pathfinder, review their choices, or return to all four modules. When no positive evidence exists, the interface keeps every path open instead of manufacturing a recommendation.

The guide saves its own versioned record under `research-pathfinder:hub-orientation`. It resumes at the saved visible question or reopens completed suggestions after a refresh. Invalid options and answers from hidden branches are removed during restoration; an incomplete saved result resumes at the first unanswered question.

**Restart guide** clears only this orientation record. It does not clear the hub's recently visited module or progress inside any subject pathfinder. Hub answers are never copied into those surveys.

If browser storage is unavailable, the guide remains fully usable and labels the session **This visit only**. Its state will not survive refresh. A successful write changes the status to **Progress saved on this device**. Storage events keep the guide's status and active question aligned across open hub tabs; synchronized state is not written back immediately, which prevents a tab-to-tab update loop.

## Workshop map and result handoff

Completed results provide four local-only handoff tools:

- **Copy workshop map** uses the shared clipboard control and exposes selectable fallback text when automatic copying fails.
- **Download workshop map** creates a dated UTF-8 `.txt` file and immediately releases its temporary object URL.
- **Print starting map** removes hub navigation and directory content while retaining the result evidence, comparison, answer snapshot, and next steps.
- **Review the choices behind this map** shows the selected option labels and marks neutral uncertainty choices as “Kept open.”

The workshop map includes the suggested field, nearby alternative, answer-grounded reasons, selected preferences, boundaries, and next step. It deliberately excludes numeric scores, match percentages, personal data, and citations. `createHubOrientationWorkshopMap` owns its structured contract; `formatHubOrientationWorkshopMap` owns the stable plain-text headings. Keep UI-only copy out of the formatter so copied and downloaded maps remain consistent.

The two-field comparison uses each module's existing catalog `comparison` and `outcome` content. Edit those fields in `data/pathfinder-modules.ts`; do not duplicate scientific comparison copy inside the result component.

## Scoring behavior

The ranking engine multiplies answer-evidence weight by module-affinity strength and sums the contributions. It does not normalize the result into a percentage. Repeated evidence for one signal is consolidated to its strongest instance rather than double counted.

Uncertainty evidence contributes nothing. Unknown, blank, non-finite, or non-positive evidence is ignored safely. Conflicting preferences contribute to each relevant module, and equal scores retain canonical registry order solely for deterministic display. Every generated reason keeps the label of the answer that produced it.

The interface interprets the relationship between the first two scores, not their magnitude as a fake confidence measure:

- **Open:** the leading score is zero, so every path remains available.
- **Tie:** the leading scores are exactly equal and both positive.
- **Close:** the leading score is one to three points ahead.
- **Clear:** the lead is greater than three points, or no alternative has positive evidence.

These thresholds live in `lib/hub-orientation-balance.ts`. Change them only alongside copy review and tie/conflict tests.

## Maintenance checklist

After changing orientation content or logic:

1. Run the orientation configuration, question, persistence, release-journey, and rendered hub tests.
2. Confirm every available module can still rank first through a coherent complete journey.
3. Complete one uncertain journey and one mixed-interest journey in the browser.
4. Edit an early answer and verify that a now-hidden follow-up disappears from both the reviewable answers and the result reasons.
5. Refresh midway and on results, then restart the guide and confirm subject-pathfinder progress is unchanged.
6. Block local storage and confirm the guide says **This visit only** while navigation still works.
7. Open two hub tabs and confirm a saved question or result appears in the other without repeated updates.
8. Copy, download, and print both a decisive result and an all-open result.
9. Review keyboard focus, Escape dismissal, reduced motion, forced colors or high contrast, phone touch targets, and desktop/tablet/phone layouts.
