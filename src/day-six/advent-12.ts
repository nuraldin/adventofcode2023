const parseInput = (input: string): { time: number, distance: number} => {
  const lines = input.split("\n");
  const time = Number(lines[0].match(/\d+/g)!.reduce((acum, number) => { 
    acum += number; 
    return acum 
  } , ''));
  const distance = Number(lines[1].match(/\d+/g)!.reduce((acum, number) => { 
    acum += number; 
    return acum 
  } , ''));
  console.log({ time, distance })

  return { time, distance };
}

const numberOfWaysToWin = (input: { time: number, distance: number}) => {
  let ways: number[] = [];

  for(let idx = 0; idx <= input.time; ++idx) {
    ways[idx] = idx * (input.time - idx)
  }
  
  return ways.reduce((acum, way) => {
    if ( way > input.distance ) {
      acum += 1;
    }
    return acum;
  } , 0);
}

export const solution = (input: string): number => {
  const parsedInput = parseInput(input);
  return numberOfWaysToWin(parsedInput);
}
