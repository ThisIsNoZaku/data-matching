import { match } from "../src/index";
describe("String matching", () => {
  describe("strings", () => { 
    it("matches equal strings", () => {
      expect(match("hello", {
        category: "string",
        operator: "eq",
        value: "hello"
      })).toBeTruthy();
    });

    it("does not match unequal strings with eq", () => {
      expect(match("hello", {
        category: "string",
        operator: "eq",
        value: "world"
      })).toBeFalsy();
    });

    it("matches not equal strings", () => {
      expect(match("hello", {
        category: "string",
        operator: "neq",
        value: "world"
      })).toBeTruthy();
    });

    it("does not match not equal when strings are equal", () => {
      expect(match("hello", {
        category: "string",
        operator: "neq",
        value: "hello"
      })).toBeFalsy();
    });

    it("does not match non-string data", () => {
      expect(match(123, {
        category: "string",
        operator: "eq",
        value: "123"
      })).toBeFalsy();
    });
  })
})
