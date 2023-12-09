const parseInput = (input: string) => {
  const splittedLines = input.split("\n");
  
  let idx = 0;
  let instructions = splittedLines[idx];
  
  idx += 2
  let directionsMap: Record<string, [string, string]> = {};
  while(splittedLines[idx]) {
    let match = splittedLines[idx].match(/([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)/)!;
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

const getSteps = ({instructions, directionsMap}: ReturnType<typeof parseInput>): number => {
  let nextDirection = 'AAA';
  let nextInstructionIdx = 0;
  let steps = 0;

  while(nextDirection !== 'ZZZ') {
    let currentInstruction = instructions[nextInstructionIdx];
    nextDirection = directionsMap[nextDirection][instructionMap[currentInstruction]]
    nextInstructionIdx = nextInstructionIdx + 1 >= instructions.length ? 0 : nextInstructionIdx + 1;
    steps++;
  }

  return steps;
}

export const solution = (input: string): number => {
  const parsedInput = parseInput(input);
  return getSteps(parsedInput);
}
