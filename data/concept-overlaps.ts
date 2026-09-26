// Only fold a narrower label into an explicitly present umbrella topic.
// Do not infer scientific equivalence from similar-looking words.
export const conceptOverlaps = [
  {
    umbrella: "Orbitals and electron density",
    covered: ["Electron density", "Molecular orbitals"],
  },
  {
    umbrella: "Potential energy, stability, and energy profiles",
    covered: [
      "Potential energy",
      "Energy and stability",
      "Molecular stability",
    ],
  },
  {
    umbrella: "Bonding and molecular geometry",
    covered: ["Molecular geometry", "Chemical bonding"],
  },
  {
    umbrella: "Light absorption and molecular spectra",
    covered: ["Light absorption", "Molecular spectroscopy", "Spectroscopy"],
  },
] as const;
