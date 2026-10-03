# Scientific terminology notes

Quantum chemistry definitions live in `data/glossary.ts`; the survey and results reuse them. The excited-state niche also reuses the electronic-excitation explanation. Computational materials definitions live in `data/pathfinders/computational-materials/glossary.ts`, with direction-specific method explanations in the niche data. Definitions are introductory paraphrases, not verbatim quotations.

Reviewed September 25, 2026 against the IUPAC Gold Book:

- [Electronically excited state](https://goldbook.iupac.org/terms/view/E01994): distinguishes electronic excitation relative to the electronic ground state.
- [Excited state](https://goldbook.iupac.org/terms/view/E02257/pdf): distinguishes electronic excitation from vibrational and rotational excitation within the electronic ground state.
- [Penning excitation](https://goldbook.iupac.org/terms/view/08515): an example of excitation through a collision, rather than photon absorption.

Avoid describing the electronic ground state as motionless. Specify electronic
energy and, when needed, the molecular geometry. Do not imply that all energy
absorption excites electrons or that all excited states are produced by light.
Electronic, vibrational, and rotational excitation should remain distinct.

These terminology references are for content maintenance. They are not invented
research-paper citations in students' literature-search launchpads.

## Computational biology copy

Biology definitions live in `data/pathfinders/computational-biology/glossary.ts`, with direction-specific method explanations in the niche modules. Copy distinguishes an observed association, a prediction, and a causal or clinical claim. Biomedical examples must stay at the level of research questions and appropriately governed datasets; they must not interpret personal health data, diagnose a condition, or imply that a computational result establishes treatment safety or effectiveness.

Sequence, expression, structure, imaging, network, ecological, and clinical-context data have different biases and validation needs. Search guidance therefore emphasizes independent evidence, held-out evaluation, uncertainty, data provenance, and reading the real source. Automated tests protect the presence and internal consistency of this guidance, but an appropriate subject-matter reviewer should still inspect edited scientific claims before a workshop release.

## Computational materials copy

The materials module distinguishes method, scale, and evidence instead of treating “simulation” as one interchangeable activity. DFT is described as an electronic-structure approach; molecular dynamics follows atomic motion; phase-field and finite-element approaches address larger-scale evolution or response; machine learning learns patterns from data. Copy must not imply that one method directly answers every scale.

Direction text also keeps prediction separate from experimental validation. Calculated observables may be compared with measurements, but agreement depends on model assumptions, numerical settings, sample conditions, and what the experiment actually measures. Preparation language presents unfamiliar thermodynamics, electronic structure, coding, or crystallography as learnable background rather than an eligibility test.

Search launchpads intentionally provide vocabulary and query structure rather than named papers. Students are told to verify titles, authors, dates, journals, and persistent identifiers against the real source. Before a workshop release, an instructor or subject-matter reviewer should sample every changed direction for scope, method–question alignment, and overclaiming; automated tests protect completeness and data integrity, not scientific consensus.
