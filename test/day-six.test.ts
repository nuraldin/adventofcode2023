import { exampleInput, advent11, advent12 } from "../src/day-six";

describe("Day 6 of advent of code", () => {
  describe("Problem 1", () => {
    test("example input result should be 288", () => {
      expect(advent11(exampleInput)).toEqual(288);
    })
  })

  describe("Problem 2", () => {
    test("example input result should be 71503", () => {
      expect(advent12(exampleInput)).toEqual(71503);
    });
  })
})