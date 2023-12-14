
const expandSpace = (input: string[]): string[][] => {
  let rows = [];
  for(let idx = 0; idx < input.length; idx++) {
    rows.push(input[idx].split(""));
  }


  // expand rows
  let expandedSpace: string[][] = [];
  for(let idx = 0; idx < rows.length; idx++) {
    let row = rows[idx];
    expandedSpace.push(row);
    if(row.every(tile => tile === ".")) {
      expandedSpace.push(new Array(rows[idx].length).fill("."))
    }
  }

  for(let jdx = 0; jdx < expandedSpace[0].length; jdx++) {
    if(expandedSpace.every(row => row[jdx] === ".")) {
      for(const row of expandedSpace) {
        row.splice(jdx, 0, ".");
      }
      jdx++
    }
  }

  return expandedSpace;
}

const getGalaxies = (space: string[][]): { x: number, y: number }[] => {
  let galaxies: { x: number, y: number }[] = [];

  for(let idx = 0; idx < space.length; idx++) {
    let spaceRow = space[idx];
    for(let jdx = 0; jdx < spaceRow.length; jdx++) {
      if ( spaceRow[jdx] === "#") {
        galaxies.push({ x: idx, y: jdx });
      }
    }
  } 

  return galaxies
}

const getGalaxyPathsLength = (galaxies: { x: number, y: number }[]): number => {
  let sum = 0;

  for(let idx = 0; idx < galaxies.length; idx++ ) {
    let currentGalaxy = galaxies[idx];
    for(let jdx = idx + 1; jdx < galaxies.length; jdx++) {
      let nextGalaxy = galaxies[jdx];
      let distance = Math.abs(currentGalaxy.x - nextGalaxy.x) + Math.abs(currentGalaxy.y - nextGalaxy.y);
      sum += distance;
    }
  }

  return sum;
}

export const solution = (input: string): number => {
  const space = input.split("\n");
  const expandedSpace = expandSpace(space);
  const galaxies = getGalaxies(expandedSpace);
  return getGalaxyPathsLength(galaxies);
}
