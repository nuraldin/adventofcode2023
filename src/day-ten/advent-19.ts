type Direction = "south" | "west" | "north" | "east";

const isGround = (tile: Tile): boolean => {
  return tile.tileType === "."
}

  // The pipes are arranged in a two-dimensional grid of tiles:
// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
const canFlow = (incomingDirection: Direction, nextTile: Tile): boolean | undefined => {
  let directionMap: Record<string, boolean> = {
    '|': ["north", "south"].includes(incomingDirection),
    '-': ["east", "west"].includes(incomingDirection),
    'L': ["north", "east"].includes(incomingDirection),
    'J': ["north","west"].includes(incomingDirection),
    '7': ["south","west"].includes(incomingDirection),
    'F': ["south","east"].includes(incomingDirection)
  } 

  return directionMap[nextTile.tileType];
}

class Tile { 
  constructor(public tileType: string, public rowCoordinate: number, public columnCoordinate: number) {}

  equals(tile: Tile) {
    return this.tileType === tile.tileType && tile.columnCoordinate === this.columnCoordinate && this.rowCoordinate === tile.rowCoordinate;
  }

  nextDirection(previousDirection: Direction): Direction {
    // previous directions maps like this:
    // if previous is south then, it comes from the north.
    // if previous is north then, it comes from the south. and so on.
    let directionMap: Record<string, Direction> = {
      '|': previousDirection === "south" ? "south" : "north",
      '-': previousDirection === "west" ? "west" : "east",
      'L': previousDirection === "south" ? "east" : "north",
      'J': previousDirection === "south" ? "west" : "north",
      '7': previousDirection === "east" ? "south" : "west",
      'F': previousDirection === "north" ? "east" : "south"
    } 
    
    return directionMap[this.tileType];
  }
}

class Maze {
  private rows: Tile[][] = [];

  constructor(input: string) {
    const splittedLines = input.split("\n");

    for(let idx = 0; idx < splittedLines.length; idx++) {
      let rowTiles: Tile[] = [];
      let line = splittedLines[idx];
      for(let jdx = 0; jdx < line.length; jdx++) {
        rowTiles.push(new Tile(line[jdx], idx, jdx));
      }
      this.rows.push(rowTiles);
    }
  }



  get startingPoint(): Tile | undefined {
    for(let idx = 0; idx < this.rows.length; idx++) {
      let row = this.rows[idx];
      for(let jdx = 0; jdx < row.length; jdx++) {
        let tile = row[jdx];
        if ( tile.tileType === "S") {
          return tile;
        }
      }
    }
  }

  nextTile(direction: Direction, currentTile: Tile) {
    switch(direction) {
      case "south": return this.rows[currentTile.rowCoordinate + 1][currentTile.columnCoordinate];
      case "north": return this.rows[currentTile.rowCoordinate - 1][currentTile.columnCoordinate];
      case "east": return this.rows[currentTile.rowCoordinate][currentTile.columnCoordinate + 1];
      case "west": return this.rows[currentTile.rowCoordinate][currentTile.columnCoordinate - 1];
    }
  }

  nextValidDirections(tile: Tile): Direction[] {
    let validDirections: Direction[] = [];

    if ( 
      tile.rowCoordinate - 1 >= 0 && 
      !isGround(this.rows[tile.rowCoordinate - 1][tile.columnCoordinate]) && 
      canFlow("south", this.rows[tile.rowCoordinate - 1][tile.columnCoordinate])
    ) {
      validDirections.push("north");
    } 

    if ( 
      tile.rowCoordinate + 1 < this.rows.length && 
      !isGround(this.rows[tile.rowCoordinate + 1][tile.columnCoordinate]) && 
      canFlow("north", this.rows[tile.rowCoordinate + 1][tile.columnCoordinate])
    ) {
      validDirections.push("south");
    }

    if ( tile.columnCoordinate + 1 < this.columnWidth && 
      !isGround(this.rows[tile.rowCoordinate][tile.columnCoordinate + 1]) &&
      canFlow("west",this.rows[tile.rowCoordinate][tile.columnCoordinate + 1])
    ) {
      validDirections.push("east");
    }

    if ( 
      tile.columnCoordinate - 1 >= 0 && 
      !isGround(this.rows[tile.rowCoordinate][tile.columnCoordinate - 1]) &&
      canFlow("east", this.rows[tile.rowCoordinate][tile.columnCoordinate - 1])
    ) {
      validDirections.push("west");
    }

    return validDirections;
  }

  get columnWidth() {
    return this.rows[0].length;
  }

  get rowsWidth() {
    return this.rows.length;
  }
}

const getSteps = (maze: Maze): number => {
  let startingPoint = maze.startingPoint!;

  let [firstDirection, secondDirection] = maze.nextValidDirections(startingPoint);
  let steps = 0;
  let firstTile = maze.nextTile(firstDirection, startingPoint);
  let secondTile = maze.nextTile(secondDirection, startingPoint);

  while(!firstTile.equals(secondTile)) {
    firstDirection = firstTile.nextDirection(firstDirection);
    secondDirection = secondTile.nextDirection(secondDirection);
    firstTile = maze.nextTile(firstDirection, firstTile);
    secondTile = maze.nextTile(secondDirection, secondTile);

    ++steps;
  }
  ++steps;
  return steps;
}

export const solution = (input: string): number => {
  const maze = new Maze(input);
  return getSteps(maze);
}
