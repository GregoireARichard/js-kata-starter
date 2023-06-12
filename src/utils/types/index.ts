import { Operator, UnaryOperator } from "./types";

export function isOperator(token: string): token is Operator {
  return token === "+" || token === "-" || token === "*" || token === "/" || token === "MOD";
}
export function isUnaryOperator(token: string): token is UnaryOperator {
  return token === "NEGATE";
}
export function performBinaryOperation(operator: Operator, operand1: number, operand2: number): number {
  if (operator === "/" && operand2 === 0) {
    throw new Error("Division par zéro impossible");
  }
  switch (operator) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "*":
      return operand1 * operand2;
    case "/":
      return operand1 / operand2;
    case "MOD":
      return operand1 % operand2;
  }
}
// Performs the unary operation corresponding to the operator
export function performUnaryOperation(operator: UnaryOperator, operand: number): number {
  return -operand;
}

// Perform the binary operation corresponding to the operator and stack the result
export function performBinaryOperationOnStack(stack: number[], operator: Operator): void {
  const operand2 = stack.pop();
  const operand1 = stack.pop();

  if (operand1 === undefined || operand2 === undefined) {
    throw new Error("Expression RPN invalide : opérandes insuffisants");
  }

  const result = performBinaryOperation(operator, operand1, operand2);
  stack.push(result);
}

// Performs the unary operation with the retrieved operator and operand and stacks the result
export function performUnaryOperationOnStack(stack: number[], operator: UnaryOperator): void {
  const operand = stack.pop();

  if (operand === undefined) {
    throw new Error("Expression RPN invalide : opérandes insuffisants");
  }

  const result = performUnaryOperation(operator, operand);
  stack.push(result);
}

// Convert the token to a float and stack it
export function pushOperandToStack(stack: number[], token: string): void {
  const operand = parseFloat(token);

  if (isNaN(operand)) {
    throw new Error(`token invalide : ${token}`);
  }

  stack.push(operand);
}
