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

test("Test isOperator returning true for any operator type", () => {
  expect(isOperator("MOD")).toEqual(true);
});
test("Test isOperator returning false for unknown token", () => {
  expect(isOperator("3")).toEqual(false);
});
test("isUnaryOperator is returning true when given NEGATE", () => {
  expect(isUnaryOperator("NEGATE")).toEqual(true);
});
test("isUnaryOperator is returning false when given any other token", () => {
  expect(isUnaryOperator("POSISATE")).toEqual(false);
});

test("performBinaryOperation is calculating the result", () => {
  expect(performBinaryOperation("+", 3, 2)).toEqual(5);
  expect(performBinaryOperation("-", 3, 2)).toEqual(1);
  expect(performBinaryOperation("/", 3, 2)).toEqual(1.5);
  expect(performBinaryOperation("*", 3, 2)).toEqual(6);
  expect(performBinaryOperation("MOD", 3, 2)).toEqual(1);
});
test("performUnaryOperation is returning the opposite of the given number", () => {
  expect(performUnaryOperation("NEGATE", 1)).toEqual(-1);
});
test("performBinaryOperationOnStack should return the right result of the operatio", () => {
  const stack = [3, 5];
  performBinaryOperationOnStack(stack, "+");
  expect(stack).toEqual([8]);
});

test("performUnaryOperationOnStack should return the right result of the operation using a unaryoperator", () => {
  const stack = [3];
  performUnaryOperationOnStack(stack, "NEGATE");
  expect(stack).toEqual([-3]);
});

test("pushOperandToStack should push operand to stack", () => {
  const stack = [];
  pushOperandToStack(stack, "3");
  expect(stack).toEqual([3]);
});
test("RPN zero division, ce test doit retouner une erreur", () => {
  const stack = [];
  const token = "/";
  expect(() => {
    pushOperandToStack(stack, token);
  }).toThrowError(`token invalide : ${token}`);
});

test("RPN zero division, ce test doit retouner une erreur", () => {
  expect(() => {
    performBinaryOperation("/", 1, 0);
  }).toThrowError("Division par zéro impossible");
});

test("RPN addition", () => {
  expect(rpn("1 1 +")).toEqual(2);
});

test("RPN modulo", () => {
  expect(rpn("4 3 MOD")).toEqual(1);
});

test("RPN operateur unaire", () => {
  expect(rpn("1 NEGATE")).toEqual(-1);
});

test("RPN expression complexe", () => {
  expect(rpn("1 1 NEGATE +")).toEqual(0);
});

test("RPN multiplication et addition", () => {
  expect(rpn("2 3 + 4 *")).toEqual(20);
});

test("Expression complexe RPN avec plusieurs opérateurs", () => {
  expect(rpn("7 4 5 * + 10 12 - +")).toEqual(25);
});
