type ParsedInput = { winningNumbers: number[], myNumbers: number[]}[];

const parseInput = (input: string): ParsedInput => {
  let linesWithoutLabels = input.split("\n").map(il => il.split(":")[1].trim() );
  
  return linesWithoutLabels.map(il => { 
    const [leftSide, rightSide] = il.split(" | ");
    return {
      winningNumbers: leftSide.match(/\d+/g)?.map(n => Number(n)) ?? [],
      myNumbers: rightSide.match(/\d+/g)?.map(n => Number(n)) ?? []
    }
  });
}

const getWinningAmount = (row: ParsedInput[number]) => {
  let winningAmount = 0;
  for (const winningNumber of row.winningNumbers) {
    winningAmount += row.myNumbers.includes(winningNumber) ? 1 : 0;
  }
  return winningAmount;
}

const getAmountOfScratchcards = (input: ParsedInput): number => {
  let instancesOfCards = new Array(input.length).fill(1);
  console.log({ length: input.length, instancesOfCards });

  input.forEach(( row, index ) => {
    const value = getWinningAmount(row);
    const rowInstances = instancesOfCards[index];
    console.log({ row, index, value})
    for(let idx = index; idx < index + value; ++idx ) {
      if ( idx + 1 < instancesOfCards.length) instancesOfCards[idx + 1] += (1 * rowInstances);
    }
    console.log({ instancesOfCards })
  })

  return instancesOfCards.reduce((acum, value) => acum + value, 0);
};

export const solution = (input: string): number => {
  const parsedInput = parseInput(input);
  return getAmountOfScratchcards(parsedInput)
}
