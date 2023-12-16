import { exampleInput, advent25, advent26 } from "../src/day-thirteen";

describe("Day 13 of advent of code", () => {
  describe("Problem 1", () => {
    test("The result of summarizing all notes should be 405", () => {
      expect(advent25(exampleInput)).toEqual(405);
    })
  })

  describe.skip("Problem 2", () => {
    test("the sum of the possible arrangements with unfolding should be ", () => {
      expect(advent26(exampleInput)).toEqual(525152);
    });
  })
})