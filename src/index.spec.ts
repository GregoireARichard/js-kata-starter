// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";

import rpn from ".";
import {
  isOperator,
  isUnaryOperator,
  performBinaryOperation,
  performUnaryOperation,
  performBinaryOperationOnStack,
  performUnaryOperationOnStack,
  pushOperandToStack,
} from "./utils/types";

expect.extend(matchers);

//Test isOperator
test("isOperator returning true for any operator type", () => {
  expect(isOperator("MOD")).toEqual(true);
});
test("isOperator returning false for unknown token", () => {
  expect(isOperator("3")).toEqual(false);
});

//Test isUnaryOperator
test("isUnaryOperator is returning true when given NEGATE", () => {
  expect(isUnaryOperator("NEGATE")).toEqual(true);
});
test("isUnaryOperator is returning false when given any other token", () => {
  expect(isUnaryOperator("POSISATE")).toEqual(false);
});

//Test performBinaryOperation
test("performBinaryOperation is calculating the result", () => {
  expect(performBinaryOperation("+", 3, 2)).toEqual(5);
  expect(performBinaryOperation("-", 3, 2)).toEqual(1);
  expect(performBinaryOperation("/", 3, 2)).toEqual(1.5);
  expect(performBinaryOperation("*", 3, 2)).toEqual(6);
  expect(performBinaryOperation("MOD", 3, 2)).toEqual(1);
});

//Test performUnaryOperation
test("performUnaryOperation is returning the opposite of the given number", () => {
  expect(performUnaryOperation("NEGATE", 1)).toEqual(-1);
});

//Test performBinaryOperationOnStack
test("performBinaryOperationOnStack should return the right result of the operation", () => {
  const stack = [3, 5];
  performBinaryOperationOnStack(stack, "+");
  expect(stack).toEqual([8]);
});

//Test performUnaryOperationOnStack
test("performUnaryOperationOnStack should return the right result of the operation using a unaryoperator", () => {
  const stack = [3];
  performUnaryOperationOnStack(stack, "NEGATE");
  expect(stack).toEqual([-3]);
});

//Test pushOperandToStack
test("pushOperandToStack should push operand to stack", () => {
  const stack = [];
  pushOperandToStack(stack, "3");
  expect(stack).toEqual([3]);
});

//Test Division by zero
test("Division by zero, this test should receive an error", () => {
  const stack = [];
  const token = "/";
  expect(() => {
    pushOperandToStack(stack, token);
  }).toThrowError(`invalid token : ${token}`);
});

test("Division by zero, this test should receive an error", () => {
  expect(() => {
    performBinaryOperation("/", 1, 0);
  }).toThrowError("Can't divide by zero");
});

//Test RPN
test("RPN addition", () => {
  expect(rpn("1 1 +")).toEqual(2);
});

test("RPN modulo", () => {
  expect(rpn("4 3 MOD")).toEqual(1);
});

test("RPN complexe expression", () => {
  expect(rpn("1 1 NEGATE +")).toEqual(0);
});

test("RPN multiplication and addition", () => {
  expect(rpn("2 3 + 4 *")).toEqual(20);
});

test("Multiple operation expression", () => {
  expect(rpn("7 4 5 * + 10 12 - +")).toEqual(25);
});
