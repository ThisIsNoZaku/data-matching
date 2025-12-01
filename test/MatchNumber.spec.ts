import { match } from "../src/index";
describe("Scalar matching", () => {
  describe("numbers", () => { 
    it("matches equal numbers", () => {
      expect(match(42, {
        category: "number",
        operator: "eq",
        value: 42
      })).toBeTruthy();
    });

    it("does not match unequal numbers with eq", () => {
      expect(match(42, {
        category: "number",
        operator: "eq",
        value: 43
      })).toBeFalsy();
    });

    it("matches greater than", () => {
      expect(match(42, {
        category: "number",
        operator: "gt",
        value: 41
      })).toBeTruthy();
    });

    it("does not match greater than when equal or less", () => {
      expect(match(42, {
        category: "number",
        operator: "gt",
        value: 42
      })).toBeFalsy();
    });

    it("matches less than", () => {
      expect(match(42, {
        category: "number",
        operator: "lt",
        value: 43
      })).toBeTruthy();
    });

    it("does not match less than when equal or greater", () => {
      expect(match(42, {
        category: "number",
        operator: "lt",
        value: 42
      })).toBeFalsy();
    });

    it("matches greater than or equal", () => {
      expect(match(42, {
        category: "number",
        operator: "gte",
        value: 42
      })).toBeTruthy();
    });

    it("does not match greater than or equal when less", () => {
      expect(match(42, {
        category: "number",
        operator: "gte",
        value: 43
      })).toBeFalsy();
    });

    it("matches less than or equal", () => {
      expect(match(42, {
        category: "number",
        operator: "lte",
        value: 42
      })).toBeTruthy();
    });

    it("does not match less than or equal when greater", () => {
      expect(match(42, {
        category: "number",
        operator: "lte",
        value: 41
      })).toBeFalsy();
    });

    it("matches not equal", () => {
      expect(match(42, {
        category: "number",
        operator: "neq",
        value: 43
      })).toBeTruthy();
    });

    it("does not match not equal when equal", () => {
      expect(match(42, {
        category: "number",
        operator: "neq",
        value: 42
      })).toBeFalsy();
    });
  })
})