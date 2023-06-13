import { Operator, UnaryOperator } from "./types";

// Checks if the operator is correct
export function isOperator(token: string): token is Operator {
  return token === "+" || token === "-" || token === "*" || token === "/" || token === "MOD";
}
// Checks if the unary operator is correct
export function isUnaryOperator(token: string): token is UnaryOperator {
  return token === "NEGATE";
}
// Performs the operation given an operator and operands
export function performBinaryOperation(operator: Operator, operand1: number, operand2: number): number {
  if (operator === "/" && operand2 === 0) {
    throw new Error("Can't divide by zero");
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

// Performs the binary operation corresponding to the operator and stack the result
export function performBinaryOperationOnStack(stack: number[], operator: Operator): void {
  const operand2 = stack.pop();
  const operand1 = stack.pop();

  if (operand1 === undefined || operand2 === undefined) {
    throw new Error("Invalid RPN expression : insufficient operand");
  }

  const result = performBinaryOperation(operator, operand1, operand2);
  stack.push(result);
}

// Performs the unary operation with the retrieved operator and operand and stacks the result
export function performUnaryOperationOnStack(stack: number[], operator: UnaryOperator): void {
  const operand = stack.pop();

  if (operand === undefined) {
    throw new Error("Invalid RPN expression : insufficient operand");
  }

  const result = performUnaryOperation(operator, operand);
  stack.push(result);
}

// Converts the token to a float and stack it
export function pushOperandToStack(stack: number[], token: string): void {
  const operand = parseFloat(token);

  if (isNaN(operand)) {
    throw new Error(`invalid token : ${token}`);
  }

  stack.push(operand);
}
