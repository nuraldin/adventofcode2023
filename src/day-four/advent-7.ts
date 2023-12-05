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

const getPoints = (input: ParsedInput): number => {
  let result = 0;

  result = input.reduce((acum, row) => {
    let winningAmount = 0;
    for( const winningNumber of row.winningNumbers ) {
      winningAmount += row.myNumbers.includes(winningNumber) ? 1 : 0;
    }    

    const value = winningAmount > 0 ? Math.pow(2, winningAmount - 1) : 0;
    acum += value;
    return acum;
  }, 0)

  return result;
};

export const solution = (input: string): number => {
  const parsedInput = parseInput(input);
  return getPoints(parsedInput)
}
