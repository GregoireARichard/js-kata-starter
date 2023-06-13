import { Operator, UnaryOperator } from "./utils/types/types";
import {
  isOperator,
  isUnaryOperator,
  performBinaryOperation,
  performUnaryOperation,
  performBinaryOperationOnStack,
  performUnaryOperationOnStack,
  pushOperandToStack,
} from "./utils/types";

// Main function : RPN
function rpn(expression: string): number {
  const tokens = expression.trim().split(" ");
  const stack: number[] = [];

  for (const token of tokens) {
    if (isOperator(token)) {
      performBinaryOperationOnStack(stack, token);
    } else if (isUnaryOperator(token)) {
      performUnaryOperationOnStack(stack, token);
    } else {
      pushOperandToStack(stack, token);
    }
  }

  if (stack.length !== 1) {
    throw new Error("Expression RPN invalide : trop d'opérandes");
  }

  return stack[0];
}

export default rpn;
