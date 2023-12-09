import { exampleInput, advent17, advent18 } from "../src/day-nine";

describe("Day 9 of advent of code", () => {
  describe.skip("Problem 1", () => {
    test("The sum of the extrapolated values should be 114", () => {
      expect(advent17(exampleInput)).toEqual(114);
    })

    test("The result of an example should be a number", () => {
      expect(advent17(
        '19 30 43 64 111 222 460 924 1800 3522 7160 15210 33030 71246 149543 302358 587105 1095686 1970177 3423724 5767841'
      )).not.toBeNaN()
    })

    test("The result of another example should be a number", () => {
      expect(advent18(
        '0 -8 -12 4 69 236 599 1312 2617 4909 8893 15917 28592 51831 94450 171471 307246 539478 924146 1541242 2501095'
      )).not.toBeNaN()
    })


  })

  describe("Problem 2", () => {
    test("the sum of the extrapolated value should be 2", () => {
      expect(advent18(exampleInput)).toEqual(2);
    });
  })
})