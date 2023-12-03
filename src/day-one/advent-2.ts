import { input } from "./input";
import { exampleInput } from "./exampleInput";

const numbers: Record<string, number> = { 
  "one": 1 , 
  "two": 2 , 
  "three": 3, 
  "four": 4, 
  "five": 5, 
  "six": 6, 
  "seven": 7, 
  "eight": 8, 
  "nine": 9 
}

const firstLastDigit = (input: string) => {
  let matches = input.match(/\d/gm);

  let first ="0";
  let last = "0";
  let firstIdx = Infinity;
  let lastIdx = -Infinity;
  
  
  if (matches && matches?.length > 0) { 
    first = matches[0];    
    last = matches[matches.length - 1];
    firstIdx  = input.indexOf(first);
    lastIdx = input.indexOf(last);
  }
  
  return [{ first: Number(first), firstIdx }, { last: Number(last), lastIdx }];
}

const codeFinderAdvancedPlus = (input: string) => {
  const inputs = input.split("\n");
  let acum = 0;

  for(const input of inputs) {
    let [bestFirst, bestLast] = firstLastDigit(input);

    for( let idx = 0; idx < input.length; idx++) {
      let matchedKey = undefined;

      for(const key of Object.keys(numbers)) {
        const substr = input.substring(idx, key.length);

        let res = substr.search(key);
        if ( res >= 0) {
          matchedKey = key;
          break;
        }
      }

      if( matchedKey ) {
        // replace best first or last
        if ( idx < bestFirst.firstIdx!) {
          bestFirst.firstIdx = idx;
          bestFirst.first = numbers[matchedKey]
        } else if ( idx > bestLast.lastIdx! ) {
          bestLast.lastIdx = idx;
          bestLast.last = numbers[matchedKey]
        }
      } 
    }

    //console.log({ input, result: bestFirst.first * 10 +  bestLast.last })
    acum += bestFirst.first! * 10 + bestLast.last!;
  }

  return acum;
};

export const solution = () => {
  return codeFinderAdvancedPlus(input); // { result: 54845 } perfect
};
