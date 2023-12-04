class Coordinate {
  public row: number
  public column: number

  constructor (row: number, column: number) {
    this.row = row
    this.column = column
  }

  isAdjacent (coordinate: Coordinate): boolean {
    return Math.abs(this.row - coordinate.row) <= 1 && Math.abs(this.column - coordinate.column) <= 1
  }

  toString (): string {
    return `x: ${this.row}, y: ${this.column}`
  }
}

class Digit {
  constructor (public value: number, public coordinate: Coordinate) {}
}

class Shape {
  constructor (public shape: string, public coordinate: Coordinate) {}
}

class Gear {
  constructor (public partA: Part, public partB: Part) {}

  get ratio (): number {
    return this.partA.number * this.partB.number
  }
}

class Part {
  private digits: Digit[];

  constructor(...digits: Digit[]) {
    this.digits = digits;
  }

  get number() {
    return this.digits.reduce((acum, currentDigit) => {
      acum = acum * 10 + currentDigit.value;
      return acum;
    } , 0)
  }

  toString() {
    return `${this.number}`;
  }
  
  isAdjacent(coordinate: Coordinate) {
    return this.digits.some(digit => digit.coordinate.isAdjacent(coordinate));
  }
}

const getPartsAndSymbols = (input: string[]): { parts: Part[], shapes: Shape[] } => {
  const parts: Part[] = []
  const shapes: Shape[] = []

  let rowId = 0
  let columnId = 0

  for (const row of input) {
    let digits: Digit[] = []
    let numberFlag = false

    for (const column of row) {
      if (column === '.') {
        if (numberFlag) {
          parts.push(new Part(...digits))
          digits = []
          numberFlag = false
        }
      } else if (column >= '0' && column <= '9') {
        if (!numberFlag) numberFlag = true
        digits.push(new Digit(Number(column), new Coordinate(rowId, columnId)))
      } else {
        if (numberFlag) {
          parts.push(new Part(...digits))
          digits = []
          numberFlag = false
        }

        shapes.push(new Shape(column, new Coordinate(rowId, columnId)))
      }

      columnId++
    }

    if (numberFlag) {
      // leftover numbers
      parts.push(new Part(...digits))
      digits = []
      numberFlag = false
    }

    rowId++
    columnId = 0
  }

  return {
    parts,
    shapes
  }
}

const getGears = (parts: Part[], asterisks: Shape[]): Gear[] => {
  const gears: Gear[] = []

  asterisks.forEach(asterisk => {
    const adjacentParts = parts.reduce<Part[]>((acum, part) => {
      if (part.isAdjacent(asterisk.coordinate)) {
        acum.push(part)
      }
      return acum
    }, [])

    if (adjacentParts.length === 2) {
      gears.push(new Gear(adjacentParts[0], adjacentParts[1]))
    }
  })

  return gears
}

const getGearRatiosSum = (input: string[]): number => {
  const { parts, shapes } = getPartsAndSymbols(input)

  const asterisks = shapes.reduce<Shape[]>((acum, symbol) => {
    if (symbol.shape === '*') {
      acum.push(symbol)
    }
    return acum
  }, [])

  const gears = getGears(parts, asterisks)

  return gears.reduce((acum, gear) => {
    acum += gear.ratio
    return acum
  }, 0)
}

export const solution = (input: string): number => {
  const parsedInput = input.split('\n')
  return getGearRatiosSum(parsedInput)
}
