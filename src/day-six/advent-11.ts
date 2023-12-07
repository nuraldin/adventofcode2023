const parseInput = (input: string): { time: number, distance: number}[] => {
  const lines = input.split("\n");
  const times = lines[0].match(/\d+/g)!.map(n => Number(n));
  const distances = lines[1].match(/\d+/g)!.map(n => Number(n));
  console.log({ times, distances })

  let parsedInput: { time: number, distance: number}[] = [];
  for(let idx = 0; idx < times?.length; ++idx) {
    parsedInput.push({ time: times[idx], distance: distances[idx]})
  }

  return parsedInput;
}

const numberOfWaysToWin = (input: { time: number, distance: number}[]) => {
  let numberOfWaysToWin = 1;
  
  input.forEach(value => {
    let ways: number[] = [];

    for(let idx = 0; idx <= value.time; ++idx) {
      ways[idx] = idx * (value.time - idx)
    }

    const winners = ways.reduce((acum, way) => {
      if ( way > value.distance ) {
        acum += 1;
      }
      return acum;
    } , 0);

    numberOfWaysToWin *= winners;
  })

  return numberOfWaysToWin;
}

export const solution = (input: string): number => {
  const parsedInput = parseInput(input);
  return numberOfWaysToWin(parsedInput);
}
