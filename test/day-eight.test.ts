import { exampleInput, exampleInput2, advent15, advent16 } from "../src/day-eight";

describe("Day 8 of advent of code", () => {
  describe("Problem 1", () => {
    test("The number of steps to get to ZZZ should be 6", () => {
      expect(advent15(exampleInput)).toEqual(6);
    })
  })

  describe.only("Problem 2", () => {
    test("The number of steps to get all starting points to one ending in Z should be 6", () => {
      expect(advent16(exampleInput2)).toEqual(6);
    });
  })
})