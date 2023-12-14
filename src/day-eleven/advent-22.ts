const expandSpace = (input: string[]): { expandedRows: number[], expandedColumns: number[]} => {
  let rows = [];
  for(let idx = 0; idx < input.length; idx++) {
    rows.push(input[idx].split(""));
  }

  // expand rows
  let expandedRows: number[] = [];
  for(let idx = 0; idx < rows.length; idx++) {
    if(rows[idx].every(tile => tile === ".")) {
      expandedRows.push(idx)
    }
  }

  let expandedColumns: number[] = [];
  for(let jdx = 0; jdx < rows[0].length; jdx++) {
    if(rows.every(row => row[jdx] === ".")) {
      expandedColumns.push(jdx);
    }
  }

  return {
    expandedRows,
    expandedColumns
  };
}

const getGalaxies = (space: string[]): { x: number, y: number }[] => {
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

const getExpandCorrection = (currentGalaxy: { x: number, y: number }, nextGalaxy: { x: number, y: number }, expandedSpace: { expandedRows: number[], expandedColumns: number[]}, expandedAmount: number): number => {
  const xCorrection = expandedSpace.expandedRows.reduce((acum, expandedRow) => {
    if ( currentGalaxy.x < nextGalaxy.x ) {
      acum += (expandedRow > currentGalaxy.x && expandedRow < nextGalaxy.x) ? expandedAmount - 1 : 0;
    } else {
      acum += (expandedRow > nextGalaxy.x && expandedRow < currentGalaxy.x) ? expandedAmount - 1 : 0;
    }

    return acum;
  } , 0)

  const yCorrection = expandedSpace.expandedColumns.reduce((acum, expandedColumn) => {
    if ( currentGalaxy.y < nextGalaxy.y ) {
      acum += (expandedColumn > currentGalaxy.y && expandedColumn < nextGalaxy.y) ? expandedAmount - 1 : 0;
    } else {
      acum += (expandedColumn > nextGalaxy.y && expandedColumn < currentGalaxy.y) ? expandedAmount - 1 : 0;
    }

    return acum;
  } , 0)

  return xCorrection + yCorrection;
}

const getGalaxyPathsLength = (galaxies: { x: number, y: number }[], expandedSpace: { expandedRows: number[], expandedColumns: number[]}, expandedAmount: number): number => {
  let sum = 0;

  for(let idx = 0; idx < galaxies.length; idx++ ) {
    let currentGalaxy = galaxies[idx];
    for(let jdx = idx + 1; jdx < galaxies.length; jdx++) {
      let nextGalaxy = galaxies[jdx];
      let expandCorrection = getExpandCorrection(currentGalaxy, nextGalaxy, expandedSpace, expandedAmount);
      let distance = Math.abs(currentGalaxy.x - nextGalaxy.x) + Math.abs(currentGalaxy.y - nextGalaxy.y) + expandCorrection;
      sum += distance;
    }
  }

  return sum;
}

export const solution = (input: string, expandedAmount = 1_000_000): number => {
  const space = input.split("\n");
  const expandedSpace = expandSpace(space);
  const galaxies = getGalaxies(space);
  return getGalaxyPathsLength(galaxies, expandedSpace, expandedAmount);
}
