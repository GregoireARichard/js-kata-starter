export function convertToArr(rpnNotation: string): string[] {
  return rpnNotation.split(" ");
}

export function convertToInfix(rpnNotation: string): number {
  const stack = convertToArr(rpnNotation);
  let countNumber = 0;
  let countOperators = 0;
  stack.map((e) => {
    !isNaN(parseFloat(e)) ? countNumber++ : countOperators++;
  });
  return countNumber + countOperators;
}
