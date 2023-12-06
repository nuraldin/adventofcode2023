import { advent1, advent2, input1 } from './src/day-one';
import { advent3, advent4, input2 } from './src/day-two';
import { advent5, advent6, input3 } from './src/day-three';
import { advent7, advent8, input4 } from './src/day-four';
import { advent9, advent10, input5 } from './src/day-five';

const options: { solution: (input: string) => number, input: string}[] = [
  { solution: advent1, input: input1 },
  { solution: advent2, input: input1 },
  { solution: advent3, input: input2 },
  { solution: advent4, input: input2 },
  { solution: advent5, input: input3 },
  { solution: advent6, input: input3 },
  { solution: advent7, input: input4 },
  { solution: advent8, input: input4 },
  { solution: advent9, input: input5 },
  { solution: advent10, input: input5 }
]


const run = () => {
  const optionIdx = Number(process.argv[2]) - 1;

  if (optionIdx > options.length ) throw new Error("This advent of code problem is still not solved. Try another one...")
  
  const {solution, input} = options[optionIdx];
  console.log({ result: solution(input) })
}

run()