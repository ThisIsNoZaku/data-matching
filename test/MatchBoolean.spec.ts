import { match } from "../src/index";
describe("Boolean matching", () => {
  describe("booleans", () => { 
    it("matches equal booleans (true)", () => {
      expect(match(true, {
        type: "boolean",
        category: "scalar",
        operator: "eq",
        value: true
      })).toBeTruthy();
    });

    it("matches equal booleans (false)", () => {
      expect(match(false, {
        type: "boolean",
        category: "scalar",
        operator: "eq",
        value: false
      })).toBeTruthy();
    });

    it("does not match unequal booleans with eq", () => {
      expect(match(true, {
        type: "boolean",
        category: "scalar",
        operator: "eq",
        value: false
      })).toBeFalsy();
    });

    it("matches not equal booleans", () => {
      expect(match(true, {
        type: "boolean",
        category: "scalar",
        operator: "neq",
        value: false
      })).toBeTruthy();
    });

    it("does not match not equal when booleans are equal", () => {
      expect(match(true, {
        type: "boolean",
        category: "scalar",
        operator: "neq",
        value: true
      })).toBeFalsy();
    });

    it("does not match non-boolean data", () => {
      expect(match("true", {
        type: "boolean",
        category: "scalar",
        operator: "eq",
        value: true
      })).toBeFalsy();
    });
  })
})
