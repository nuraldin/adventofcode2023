import { exampleInput1, exampleInput2, exampleInput3, exampleInput4, advent19, advent20, exampleInput6, exampleInput5 } from "../src/day-ten";

describe("Day 10 of advent of code", () => {
  describe("Problem 1", () => {
    test("The steps to the farthes distance should be 4", () => {
      expect(advent19(exampleInput1)).toEqual(4);
    })

    test("The steps to the farthes distance should be 8", () => {
      expect(advent19(exampleInput2
      )).toEqual(8)
    })
  })

  describe("Problem 2", () => {
    test("The number of enclosed tiles should be 4", () => {
      expect(advent20(exampleInput3)).toEqual(4);
    });  
    
    test("The number of enclosed tiles should be 4", () => {
      expect(advent20(exampleInput4)).toEqual(4);
    });

    test("The number of enclosed tiles should be 4", () => {
      expect(advent20(exampleInput5)).toEqual(8);
    });
  
    test("The number of enclosed tiles should be 10", () => {
      expect(advent20(exampleInput6)).toEqual(10);
    });
  })
})