export interface GlossaryEntry {
  term: string;
  text: string;
}

export const electronicStates: GlossaryEntry = {
  term: "Electronic states",
  text: "The electronic ground state has the lowest electronic energy. An electronically excited state has more. Either can involve moving or vibrating nuclei. Absorbing suitable light is one way to excite electrons; collisions or energy transfer can also do it.",
};

export const groundState: GlossaryEntry = {
  term: "Electronic ground state",
  text: "The lowest-energy electronic state for a given molecular geometry. Ground-state molecules can still move, rotate, vibrate, and react.",
};

export const excitedState: GlossaryEntry = {
  term: "Electronically excited state",
  text: "A state with more electronic energy than the ground state. It can be reached by absorbing suitable light or by other energy-transfer processes.",
};

export const glossary: GlossaryEntry[] = [
  {
    term: "DFT",
    text: "Density functional theory: a way to calculate electronic properties using electron density. Practical calculations use approximations.",
  },
  {
    term: "Transition state",
    text: "A configuration at an energy barrier along an elementary reaction step; it is a saddle point on the relevant energy surface.",
  },
  groundState,
  excitedState,
  {
    term: "Electronic structure",
    text: "How electrons are arranged and behave, and how that shapes molecular properties.",
  },
  {
    term: "Computational spectroscopy",
    text: "Predicting or interpreting spectra with molecular calculations.",
  },
];
