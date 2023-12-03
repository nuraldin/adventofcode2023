import { input } from "./input";
import { exampleInput } from "./exampleInput";

const codeFinder = (input: string) => {
  const inputs = input.split("\n");

  console.log(inputs)
  let acum = 0;
  for(const input of inputs) {

    let matches = input.match(/\d/gm);
    
    const first = matches && matches[0];    
    const last = matches && matches[matches.length - 1];

    console.log(`${first}${last}`)
    acum += (+first! * 10) + +last!;
  }

  return acum;
};

export const solution = (): number => {
  return codeFinder(input);
};