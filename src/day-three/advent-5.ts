class Coordinate {
  constructor (public row: number, public column: number) {}

  isAdjacent (coordinate: Coordinate) {
    return Math.abs(this.row - coordinate.row) <= 1 && Math.abs(this.column - coordinate.column) <= 1
  }

  toString () {
    return `x: ${this.row}, y: ${this.column}`
  }
}

class Digit {
  constructor (public value: number, public coordinate: Coordinate) {}
}

class Part {
  private digits: Digit[];

  constructor (...digits: Digit[]) {
    this.digits = digits
  }

  get number () {
    return this.digits.reduce((acum, currentDigit) => {
      acum = acum * 10 + currentDigit.value
      return acum
    }, 0)
  }

  toString (): string {
    return `${this.number}`
  }

  isAdjacent (coordinate: Coordinate): boolean {
    return this.digits.some(digit => digit.coordinate.isAdjacent(coordinate))
  }
}

const getPartsAndSymbols = (input: string[]) => {
  const parts = []
  const symbols = []

  let rowId = 0
  let columnId = 0

  for (const row of input) {
    let digits = []
    let numberFlag = false

    for (const column of row) {
      if (column == '.') {
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
        // if symbol save coordinate
        symbols.push(new Coordinate(rowId, columnId))
      }

      columnId++
    }

    if (numberFlag) {
      // leftover numbers
      console.log(digits)
      parts.push(new Part(...digits))
      digits = []
      numberFlag = false
    }

    rowId++
    columnId = 0
  }

  return {
    parts,
    symbols
  }
}

const getSchematicPartsSum = (input: string[]) => {
  const { parts, symbols } = getPartsAndSymbols(input)

  const partNumbers: Part[] = []

  parts.forEach(part => {
    console.log(part.toString())
    if (symbols.some(symbol => part.isAdjacent(symbol))) {
      partNumbers.push(part)
    }
  })

  return [...partNumbers].reduce((acum, part) => {
    acum += part.number
    return acum
  }, 0)
}

export const solution = (input: string): number => {
  const parsedInput = input.split('\n')
  return getSchematicPartsSum(parsedInput)
}
