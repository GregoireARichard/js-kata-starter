// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { convertToInfix, convertToArr } from ".";
expect.extend(matchers);

test("first test", () => {
  expect(convertToInfix("3 4 +")).toEqual(3);
});
test("converToStackTest", () => {
  expect(convertToArr("3 4 +")).toEqual(["3", "4", "+"]);
});
