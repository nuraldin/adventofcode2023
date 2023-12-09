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
  let nextDirections = getStartingDirections(directionsMap);
  
  let nextInstructionIdx = 0;
  let steps = 0;
  while(!nextDirections.every(direction => direction.endsWith('Z'))) {
    let currentInstruction = instructions[nextInstructionIdx];
    nextDirections = nextDirections.map(direction => directionsMap[direction][instructionMap[currentInstruction]]);
    nextInstructionIdx = nextInstructionIdx + 1 >= instructions.length ? 0 : nextInstructionIdx + 1;
    steps++;
  }

  return steps;
}

export const solution = (input: string): number => {
  const parsedInput = parseInput(input);
  return getSteps(parsedInput);
}
