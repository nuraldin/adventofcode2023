import { exampleInput, advent7, advent8 } from "../../src/day-four";

describe("Day 4 of advent of code", () => {
  describe("Problem 1", () => {
    test("example input result should be 13", () => {
      expect(advent7(exampleInput)).toEqual(13);
    })
  })

  describe.only("Problem 2", () => {
    test("example input result should be 30 scratchcards", () => {
      expect(advent8(exampleInput)).toEqual(30);
    });
  })
})