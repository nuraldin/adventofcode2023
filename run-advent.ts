import { advent1, advent2, input1 } from './src/day-one';
import { advent3, advent4, input2 } from './src/day-two';
import { advent5, advent6, input3 } from './src/day-three';
import { advent7, advent8, input4 } from './src/day-four';
import { advent9, advent10, input5 } from './src/day-five';
import { advent11, advent12, input6 } from './src/day-six';
// import { advent13, advent14, input7 } from './src/day-seven';
// import { advent15, advent16, input8 } from './src/day-eight;
// import { advent17, advent18, input9 } from './src/day-nine';
// import { advent19, advent20, input10 } from './src/day-ten';
// import { advent21, advent22, input11 } from './src/day-eleven';
// import { advent23, advent24, input12 } from './src/day-twelve';
// import { advent13, advent14, input7 } from './src/day-thirteen';
// import { advent15, advent16, input8 } from './src/day-fourteen';
// import { advent17, advent18, input9 } from './src/day-sixteen';
// import { advent19, advent20, input10 } from './src/day-seventeen';
// import { advent21, advent22, input11 } from './src/day-eighteen';
// import { advent23, advent24, input12 } from './src/day-nineteen';
// import { advent17, advent18, input9 } from './src/day-twenty';
// import { advent19, advent20, input10 } from './src/day-twentyone';
// import { advent21, advent22, input11 } from './src/day-twentytwo';
// import { advent23, advent24, input12 } from './src/day-twentythree';
// import { advent21, advent22, input11 } from './src/day-twentyfour';

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
  { solution: advent10, input: input5 },
  { solution: advent11, input: input6 },
  { solution: advent12, input: input6 },
  // { solution: advent1, input: input1 },
  // { solution: advent2, input: input1 },
  // { solution: advent3, input: input2 },
  // { solution: advent4, input: input2 },
  // { solution: advent5, input: input3 },
  // { solution: advent6, input: input3 },
  // { solution: advent7, input: input4 },
  // { solution: advent8, input: input4 },
  // { solution: advent9, input: input5 },
  // { solution: advent10, input: input5 },
  // { solution: advent11, input: input6 },
  // { solution: advent12, input: input6 },
  // { solution: advent12, input: input6 }
]


const run = () => {
  const optionIdx = Number(process.argv[2]) - 1;

  if (optionIdx > options.length ) throw new Error("This advent of code problem is still not solved. Try another one...")
  
  const {solution, input} = options[optionIdx];
  console.log({ result: solution(input) })
}

run()