import { mkdirSync, writeFileSync } from "fs";

const numberToString: Record<string, string> = {
  "0": "zero",
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine",
  "10": "ten",
  "11": "eleven",
  "12": "twelve",
  "13": "thirteen",
  "14": "fourteen",
  "15": "fifteen",
  "16": "sixteen",
  "17": "seventeen",
  "18": "eighteen",
  "19": "nineteen",
  "20": "twenty",
  "21": "twenty-one",
  "22": "twenty-two",
  "23": "twenty-three",
  "24": "twenty-four",
  "25": "twenty-five"
};

const getProblemNumber = (day: string) => {
  return 2 * (Number(day) - 1) + 1
}

const makeSolutionFile = () => {
  return `export const solution = (input: string): number => {
  // put here your solution
  return 0;
}`
}

const makeExampleTemplate = () => {
  return `export const input = '';

export const exampleInput = '';`
}

const makeIndexTemplate = (day: string) => {
  const problem1 = getProblemNumber(day);
  const problem2 = problem1 + 1;

  return `export { solution as advent${problem1} } from "./advent-${problem1}";
export { solution as advent${problem2} } from "./advent-${problem2}";
  
export { exampleInput, input as input${day} } from "./input";`
}

const makeTestFile = (day: string) =>  {
  const dayString = numberToString[day];
  
  const problem1 = getProblemNumber(day);
  const problem2 = problem1 + 1;

  return `import { exampleInput, advent${problem1}, advent${problem2} } from "../src/day-${dayString}";

describe("Day ${day} of advent of code", () => {
  describe("Problem 1", () => {
    test("", () => {
      expect(advent${problem1}(exampleInput)).toEqual();
    })
  })

  describe("Problem 2", () => {
    test("", () => {
      expect(advent${problem2}(exampleInput)).toEqual();
    });
  })
})`
};

const run = () => {
  if (process.argv.length <= 2) {
    throw new Error(`At least an argument for the day number must be passed. Usage: npm run create-new-day <number>`)
  }

  const day = process.argv[2];
  if ( Number.isNaN(day) ) {
    throw new Error(`The <number> argument must be a number. Usage: npm run create-new-day <number>`)
  }
  const dayString = numberToString[day];

  const solutionTemplate = makeSolutionFile()
  const testTemplate = makeTestFile(day)

  // TODO: make this dynamically rather than hard-coded
  const basePath = `/Users/santiagomartin/Workspace/adventofcode`

  // create solutions folder
  const baseFolder = `${basePath}/src/day-${dayString}`;
  mkdirSync(baseFolder)

  // create solution files
  writeFileSync(`${baseFolder}/advent-${getProblemNumber(day)}.ts`, solutionTemplate)
  writeFileSync(`${baseFolder}/advent-${getProblemNumber(day) + 1}.ts`, solutionTemplate)
  writeFileSync(`${baseFolder}/input.ts`, makeExampleTemplate())
  writeFileSync(`${baseFolder}/index.ts`, makeIndexTemplate(day))

  // create test file
  writeFileSync(`/Users/santiagomartin/Workspace/adventofcode/test/day-${dayString}.test.ts`, testTemplate)
}

run()