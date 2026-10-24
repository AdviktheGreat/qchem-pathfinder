# Literature Exploration Workspace roadmap

The Literature Exploration Workspace extends Research Pathfinder after a student receives a direction. It helps students organize search results, read papers deliberately, compare evidence, and prepare possible question areas for an instructor conversation. It does not search the web, verify citations automatically, identify research gaps, or select a final research question.

All workspace data remains in the current browser unless the student explicitly copies or downloads an export. The implementation is divided into four phases of 15 independently committable steps.

## Phase 1 — Foundation and local workspace model

1. Record the 60-step roadmap, product boundaries, and privacy principles.
2. Define versioned workspace identity, stage, and provenance contracts.
3. Define a student-entered source record with explicit citation-verification state.
4. Define structured reading notes for claims, methods, evidence, limitations, and questions.
5. Define typed paper-comparison axes and comparison entries.
6. Define a local vocabulary-note contract with paper-level source links.
7. Create a complete workspace aggregate and safe empty-workspace factory.
8. Add immutable source create, edit, and remove operations.
9. Add immutable reading-note and vocabulary-note operations.
10. Add comparison selection and comparison-entry operations.
11. Derive transparent workspace progress and next-step summaries.
12. Validate complete workspaces with precise, student-safe repair issues.
13. Add versioned local persistence with corrupted-data recovery.
14. Add portable JSON backup export and import validation.
15. Test, document, and verify the complete Phase 1 foundation.

## Phase 2 — Paper reading and comparison workflow

16. Add the Literature Workspace App Router route and metadata.
17. Create the accessible workspace shell and stage navigation.
18. Add an orientation screen explaining purpose, privacy, and citation limits.
19. Add a source-library overview with clear empty and saved states.
20. Build the source-entry form with labels, hints, and validation.
21. Add safe source editing and deletion confirmation.
22. Add reading-status and citation-verification controls.
23. Build a structured paper-reading checklist.
24. Build claim, method, evidence, limitation, and question note editors.
25. Add the linked vocabulary notebook interface.
26. Add source-detail views with completion cues.
27. Build a two- or three-paper comparison selector.
28. Build the comparison table with evidence-aware prompts.
29. Add local-save status, unavailable-storage guidance, and cross-tab updates.
30. Test and verify the complete reading and comparison experience.

## Phase 3 — Synthesis and question-area development

31. Add a synthesis view for recurring findings and disagreements.
32. Separate source-supported observations from student inferences.
33. Add careful language guidance for possible gaps and unknowns.
34. Define typed exploratory question-area records.
35. Add system, scale, outcome, and method scoping prompts.
36. Build a research-question boundary checker.
37. Add feasibility and evidence-availability reflections.
38. Add method-to-question fit prompts without prescribing a method.
39. Detect overly broad, compound, or unsupported draft wording.
40. Support several question-area candidates without ranking a winner.
41. Add an instructor-discussion preparation sheet.
42. Connect pathfinder profile context to a new workspace explicitly.
43. Generate a consistent plain-text literature exploration profile.
44. Add copy, download, and print-friendly workspace exports.
45. Test and verify synthesis, boundaries, exports, and uncertainty handling.

## Phase 4 — Platform integration and release

46. Add a clear workspace entry point to the central hub.
47. Add result-page launch actions for all four pathfinders.
48. Preserve direction provenance without transferring survey answers.
49. Support separate local workspaces for distinct exploration directions.
50. Add forward-safe migrations for older workspace records.
51. Verify keyboard navigation and focus management end to end.
52. Add screen-reader labels, landmarks, and save announcements.
53. Harden reduced-motion, increased-contrast, and forced-color behavior.
54. Polish phone layouts and touch targets.
55. Polish tablet, desktop, print, and long-content layouts.
56. Test refresh, cross-tab, blocked-storage, and corrupted-data recovery.
57. Audit privacy, export safety, and citation-verification language.
58. Document instructor editing and workspace maintenance workflows.
59. Add facilitator guidance and complete scientific editorial review.
60. Run and record the full release gate and responsive browser review.

## Non-negotiable boundaries

- Entered citation details are never presented as verified automatically.
- Notes distinguish what a source reports from what a student infers.
- The workspace supports possible question areas, not a final-question verdict.
- No personal information, accounts, database, API key, or runtime model is required.
- Removing or restarting one workspace never clears any pathfinder survey.
- Exports warn students to open and verify the real source before relying on it.
