const mapValues = (currentIdx: number, input: string[], source: number[]): { currentIdx: number; destination: number[] } => {
  let destination: number[] = [];

  console.log({ currentIdx, source, line: input[currentIdx] })
  
  while( input[currentIdx] !== '' && input[currentIdx] ) {
    let [destinationStart, sourceStart, range] = input[currentIdx].match(/\d+/g)!.map(n => Number(n)); 
    source.forEach(( sourceValue, idx ) => {
        if ( sourceValue >= sourceStart && sourceValue < sourceStart + range ) {
          destination[idx] = destinationStart + ( sourceValue - sourceStart );
        } else if ( !destination[idx] ) {
          destination[idx] = sourceValue;
        }
    })
    currentIdx++;
  }

  return {
    currentIdx,
    destination,
  }
}

const mapToLocation = (splittedLines: string[], seeds: number[]): number[] => {
  let soils: number[] = [];
  let fertilizers: number[] = [];
  let waters: number[] = [];
  let lights:  number[] = [];
  let temperatures: number[] = [];
  let humidities: number[] = [];
  let locations: number[] = [];

  for(let idx = 2; idx < splittedLines.length; ++idx) {
    let l = splittedLines[idx];

    if ( l.includes("seed-to-soil" ) ) {
      const { currentIdx, destination } = mapValues(idx + 1, splittedLines, seeds);
      idx = currentIdx;
      soils = destination;
      console.log({ soils, idx, line: splittedLines[idx] })
    } else if ( l.includes("soil-to-fertilizer")) {
      const { currentIdx, destination } = mapValues(idx + 1, splittedLines, soils);
      idx = currentIdx;
      fertilizers = destination;
      console.log({ fertilizers, idx, line: splittedLines[idx] })
    } else if ( l.includes("fertilizer-to-water" ) ) {
      const { currentIdx, destination } = mapValues(idx + 1, splittedLines, fertilizers);
      idx = currentIdx;
      waters = destination;
      console.log({ waters })
    } else if ( l.includes("water-to-light")) {
      const { currentIdx, destination } = mapValues(idx + 1, splittedLines, waters);
      idx = currentIdx;
      lights = destination;
      console.log({ lights })
    } else if ( l.includes("light-to-temperature" ) ) {
      const { currentIdx, destination } = mapValues(idx + 1, splittedLines, lights);
      idx = currentIdx;
      temperatures = destination;
      console.log({ temperatures })
    } else if ( l.includes("temperature-to-humidity")) {
      const { currentIdx, destination } = mapValues(idx + 1, splittedLines, temperatures);
      idx = currentIdx;
      humidities = destination;
      console.log({ humidities })
    } else if ( l.includes("humidity-to-location" ) ) {
      const { currentIdx, destination } = mapValues(idx + 1, splittedLines, humidities);
      idx = currentIdx;
      locations = destination;
      console.log({ locations })
    }
  } 

  return locations;
}

const getLowestLocation = (input: string): number => {
  const splittedLines = input.split("\n");

  let seedsLine = splittedLines[0].match(/\d+/g)!.map(seed => Number(seed));
  let seedsMap = [];
  for(let idx = 0; idx < seedsLine.length; idx += 2) {
    seedsMap.push([seedsLine[idx], seedsLine[idx + 1]])
  }
 
  let locations: number[] = [];
  seedsMap.forEach(seedMap => {
    let [ seedStart, seedRange ] = seedMap;

    let seeds: number[] = [];
    for(let idx = 0; idx < seedRange; idx++ ) {
      seeds.push(seedStart + idx);
    }

    let seedRangeLocations = mapToLocation(splittedLines, seeds);
    locations.push(seedRangeLocations.reduce((acum, location) => { 
      return Number(location) < acum ? Number(location) : acum 
    }, +Infinity))
  })

  return locations.reduce((acum, location) => { 
    return Number(location) < acum ? Number(location) : acum 
  }, +Infinity);
} 

export const solution = (input: string): number => {
  return getLowestLocation(input);
}
