import { exampleInput1, advent1 } from "../src/day-one";

describe("Day 1 of advent of code - problem 1", () => {
  test("example input result should be 142", () => {
    expect(advent1(exampleInput1)).toEqual(142);
  })
})