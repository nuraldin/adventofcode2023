import { exampleInput, advent23, advent24 } from "../src/day-twelve";

describe("Day 12 of advent of code", () => {
  describe.skip("Problem 1", () => {
    test("The sum of the possible arrangements should be 21", () => {
      expect(advent23(exampleInput)).toEqual(21);
    })
  })

  describe("Problem 2", () => {
    test("the sum of the possible arrangements with unfolding should be ", () => {
      expect(advent24(exampleInput)).toEqual(525152);
    });
  })
})