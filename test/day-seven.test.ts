import { exampleInput, advent13, advent14 } from "../src/day-seven";

describe("Day 7 of advent of code", () => {
  describe.skip("Problem 1", () => {
    test("example input result should be 6440", () => {
      expect(advent13(exampleInput)).toEqual(6440);
    })
  })

  describe("Problem 2", () => {
    test("The total winnings of the example should be 5905", () => {
      expect(advent14(exampleInput)).toEqual(5905);
    });
  })
})