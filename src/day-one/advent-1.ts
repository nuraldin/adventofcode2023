const codeFinder = (codeRows: string[]) => {
  let acum = 0;

  for(const codeRow of codeRows) {
    let matches = codeRow.match(/\d/gm);
    
    const first = matches && matches[0];    
    const last = matches && matches[matches.length - 1];

    acum += (+first! * 10) + +last!;
  }

  return acum;
};

export const solution = (input: string): number => {
  const codeRows = input.split("\n");
  return codeFinder(codeRows);
};