import { exampleInput, advent9, advent10 } from "../src/day-five";

describe("Day 5 of advent of code", () => {
  describe("Problem 1", () => {
    test("example input result should be 35", () => {
      expect(advent9(exampleInput)).toEqual(35);
    })
  })

  describe.skip("Problem 2", () => {
    test("example input result should be 46", () => {
      expect(advent10(exampleInput)).toEqual(46);
    });
  })
})