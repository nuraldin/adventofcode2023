type Line = {
  springs: string;
  configuration: number[];
};

const parseInput = (input: string[]): Line[] => {
  let result: Line[] = [];

  input.forEach(line => {
    const [springs, numbers] = line.split(" "); 

    const configuration = ((numbers + ",").repeat(4) + numbers).split(",").map(n => Number(n));
    result.push({ springs: (springs + "?").repeat(4) + springs, configuration: configuration })
  })

  
  return result;  
}

const getLineArrangements = (line: Line): string[] => {
  const springs = line.springs.split("");
  let possibleArrangements: string[] = []

  let missingInfo: number[] = [];
  springs.forEach((spring, index) => {
    if ( spring === "?" ) {
      missingInfo.push(index);
    }
  })

  const binaryOptions = Math.pow(2, missingInfo.length);
  for(let idx = 0; idx < binaryOptions; idx++) {
    let binaryIdx = idx.toString(2);
    
    let zeroes = "";
    for(let jdx = 0; jdx < missingInfo.length - binaryIdx.length; jdx++) {
      zeroes += '0';
    }
    binaryIdx = zeroes + binaryIdx;
    
    let chars = binaryIdx.split("").map(n => n === "0" ? "." : "#");
    
    let jdx = 0;
    let possibleArrangement: string[] = []
    springs.forEach(spring => {
      if ( spring === "?" ) {
        possibleArrangement.push(chars[jdx])
        jdx++
      } else {
        possibleArrangement.push(spring);
      }
    });
         
    if ( isValidArrangement(possibleArrangement.join(""), line.configuration) ) {
      possibleArrangements.push(possibleArrangement.join(""))
    }
  }

  return possibleArrangements;
}

const isValidArrangement = (possibleArrangement: string, configuration: number[]): boolean => {
  const regex = /#+/g;
  const match = possibleArrangement.match(regex);
  
  if ( !match || match.length != configuration.length) return false;

  return match.every((match, index) => match.length === configuration[index] );
} 

const getPossibleArrangementsSum = (input: Line[]): number => {
  return input.reduce(( arrangements, line) => {
    const validArrangements = getLineArrangements(line);
    arrangements += validArrangements.length;
    return arrangements;
  }, 0);
}

export const solution = (input: string): number => {
  const lines = input.split("\n");
  let parsedInput = parseInput(lines);

  return getPossibleArrangementsSum(parsedInput);
}
