class GroundElement {
  constructor(private element: string, public x: number, public y: number) {}

  equals(element: GroundElement) {
    return element.element === this.element;
  }
}

const hasReflection = (groundElements: GroundElement[][], element: GroundElement, direction: "y" | "x"): boolean => {
  switch(direction) {
    case "y":
      const reflectionY = groundElements[element.x].length - element.y - 1;
      return groundElements[element.x][reflectionY].equals(element);
    case "x":
      return false;
  }
}

const getAshAndRocksMap = (input: string): GroundElement[][] => {
  let splittedLines = input.split("\n");

  const map = splittedLines.reduce<GroundElement[][]>((groundElements, line, xIndex) => {
    console.log(line)
    const elements = line.split('').reduce<GroundElement[]>((elements, point, yIndex) => {
      elements.push(new GroundElement(point, xIndex, yIndex ))
      return elements;
    }, []);
    groundElements.push(elements);
    return groundElements;
  }, [])

  return map;
}

export const solution = (input: string): number => {
  const ashRocksMap = getAshAndRocksMap(input);

  return 0;
}
