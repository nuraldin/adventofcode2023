import { lcm } from "mathjs";

const parseInput = (input: string) => {
  const splittedLines = input.split("\n");
  
  let idx = 0;
  let instructions = splittedLines[idx];

  idx += 2
  let directionsMap: Record<string, [string, string]> = {};
  while(splittedLines[idx]) {
    let match = splittedLines[idx].match(/([1-9A-Z]+) = \(([1-9A-Z]+), ([1-9A-Z]+)\)/)!;
    directionsMap[match[1]] = [match[2], match[3]];
    idx++
  }

  return {
    instructions,
    directionsMap,
  }
}

const instructionMap: Record<string, number> = {
  "L": 0,
  "R": 1
}

const getStartingDirections = (directionsMap: Record<string, [string, string]>) => {
  let startingDirections: string[] = [];

  Object.keys(directionsMap).forEach(direction => {
    if ( direction.endsWith('A') ) {
      startingDirections.push(direction);
    }
  })

  return startingDirections;
};

const getSteps = ({instructions, directionsMap}: ReturnType<typeof parseInput>): number => {
  let startingDirections = getStartingDirections(directionsMap);
  let allSteps: number[] = [];

  for (const startingDirection of startingDirections) {
    let steps = 0;
    let instructionIdx = 0;
    let currentInstruction = instructions[instructionIdx];


    let nextDirection = startingDirection;
    while(!nextDirection.endsWith("Z")) {
      nextDirection = directionsMap[nextDirection][instructionMap[currentInstruction]];
      instructionIdx = instructionIdx + 1 >= instructions.length ? 0 : instructionIdx + 1;
      currentInstruction = instructions[instructionIdx];
      steps++;
    }

    allSteps.push(steps);
  }


  const res = allSteps.reduce((acum, current) => lcm(acum, current));
  console.log({ allSteps,  res })
  return res;
}

export const solution = (input: string): number => {
  const parsedInput = parseInput(input);
  return getSteps(parsedInput);
}
