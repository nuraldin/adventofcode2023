import { exampleInput, advent21, advent22 } from "../src/day-eleven";

describe("Day 11 of advent of code", () => {
  describe.skip("Problem 1", () => {
    test("The sum of the lengths between the unverses is 374", () => {
      expect(advent21(exampleInput)).toEqual(374);
    })
  })

  describe("Problem 2", () => {
    test("the sum of the length between the universese if the expansiion is 10 times should be 1030", () => {
      expect(advent22(exampleInput, 10)).toEqual(1030);
    });

    test("the sum of the length between the universese if the expansiion is 100 times should be 8410", () => {
      expect(advent22(exampleInput, 100)).toEqual(8410);
    });
  })
})