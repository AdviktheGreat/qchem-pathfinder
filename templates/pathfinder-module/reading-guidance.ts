export const templatePaperTypeGuide = [
  {
    term: "Review or perspective",
    text: "Maps a research area, introduces shared vocabulary, and points toward major debates and original studies.",
  },
  {
    term: "Methods or tutorial paper",
    text: "Explains a computational approach, its assumptions, implementation choices, validation, and appropriate uses.",
  },
  {
    term: "Application paper",
    text: "Uses a method on a particular scientific system and should connect its output to evidence and limitations.",
  },
];

export const templateReadingCopy = {
  heading: "Begin with a recent review or perspective",
  description:
    "It can introduce the field’s vocabulary, central models, evidence, and open questions before you tackle a narrow study. Then follow its references to the original sources behind important claims.",
  citationWarning:
    "Search engines and AI tools can return incomplete, incorrect, or invented citations. Verify the title, authors, year, journal or archive, and DOI or URL against the real source—and read that source before relying on it.",
  checklist: [
    "Identify the system, scale, assumptions, computational method, and evidence.",
    "Scan figures, captions, methods, results, and limitations before every implementation detail.",
    "Record validation, uncertainty, unresolved questions, and references worth following.",
  ],
};

export const templatePaperNote = `PAPER
Title:
Authors and year:
Verified DOI or URL:

RESEARCH MAP
System and scale:
Question:
Model or computational method:
Evidence and validation:
Main result:
Important assumptions:
Limitations and uncertainty:
New terms:
References to follow:
Question this paper leaves me with:`;
