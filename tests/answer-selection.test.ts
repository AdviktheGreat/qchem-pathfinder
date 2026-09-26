import { expect, it } from "vitest";
import { selectAnswer } from "@/lib/answer-selection";
import { questionById } from "@/data/questions";
const question = questionById["concept-familiarity"];
it("keeps uncertainty exclusive in both directions, even at the selection limit", () => {
  expect(selectAnswer(question, ["uncertain"], "orbitals")).toEqual([
    "orbitals",
  ]);
  expect(
    selectAnswer(
      question,
      ["orbitals", "energy", "bonding", "spectra", "methods"],
      "uncertain",
    ),
  ).toEqual(["uncertain"]);
  expect(selectAnswer(question, ["uncertain"], "uncertain")).toEqual([]);
});
