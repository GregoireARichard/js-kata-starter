// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";

import rpn from ".";

expect.extend(matchers);

test("RPN zero division, ce test doit retouner une erreur", () => {
  expect(() => {
    rpn("1 0 /");
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
