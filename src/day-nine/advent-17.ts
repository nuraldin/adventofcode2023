const parseInput = (input: string): number[][] => {
  return input.split("\n").map(line => line.match(/-?\d+/g)!.map(n => Number(n)));
}

const predictHistory = (histories: number[][]): number[] => {
  let predictions: number[] = []

  histories.forEach(history => {
    let steps: number[][] = [[...history]];
    while(!steps[steps.length - 1].every(n => n === 0)) {
      let nextStep = [];
      let previousStep = steps[steps.length - 1];
      
      for( let idx = 0; idx < previousStep.length - 1; idx++) {
        let left = previousStep[idx];
        let right = previousStep[idx + 1];
        
        nextStep.push(right - left);
      }

      steps.push(nextStep);
    }

    const prediction = steps.reverse().reduce((acum, step) => acum + step[step.length - 1], 0);

    predictions.push(prediction);
  });
  
  return predictions;
}

export const solution = (input: string): number => {
  const histories = parseInput(input);
  const predictions = predictHistory(histories);
  console.log({ predictions })
  return predictions.reduce((acum, prediction) => acum + prediction, 0);
}
