import { match } from "../src/index";

describe("Array matching", () => {
  describe("empty operator", () => { 
    it("matches empty arrays", () => {
      expect(match([], {
        category: "array",
        operator: "empty"
      })).toBeTruthy();
    });

    it("does not match non-empty arrays", () => {
      expect(match([1, 2, 3], {
        category: "array",
        operator: "empty"
      })).toBeFalsy();
    });

    it("matches arrays that become empty after filtering", () => {
      expect(match([1, 2, 3], {
        category: "array",
        operator: "empty",
        filter: {
          category: "number",
          operator: "gt",
          value: 10
        }
      })).toBeTruthy();
    });

    it("does not match non-array data", () => {
      expect(match("not an array", {
        category: "array",
        operator: "empty"
      })).toBeFalsy();
    });
  });

  describe("notEmpty operator", () => { 
    it("matches non-empty arrays", () => {
      expect(match([1, 2, 3], {
        category: "array",
        operator: "notEmpty"
      })).toBeTruthy();
    });

    it("does not match empty arrays", () => {
      expect(match([], {
        category: "array",
        operator: "notEmpty"
      })).toBeFalsy();
    });

    it("matches arrays with elements remaining after filtering", () => {
      expect(match([1, 2, 3, 4, 5], {
        category: "array",
        operator: "notEmpty",
        filter: {
          category: "number",
          operator: "gt",
          value: 3
        }
      })).toBeTruthy();
    });

    it("does not match arrays that become empty after filtering", () => {
      expect(match([1, 2, 3], {
        category: "array",
        operator: "notEmpty",
        filter: {
          category: "number",
          operator: "gt",
          value: 10
        }
      })).toBeFalsy();
    });
  });

  describe("length operators", () => { 
    it("lengthEq matches arrays with exact length", () => {
      expect(match([1, 2, 3], {
        category: "array",
        operator: "lengthEq",
        value: 3
      })).toBeTruthy();
    });

    it("lengthEq does not match arrays with different length", () => {
      expect(match([1, 2, 3], {
        category: "array",
        operator: "lengthEq",
        value: 5
      })).toBeFalsy();
    });

    it("lengthEq works with filtered arrays", () => {
      expect(match([1, 2, 3, 4, 5], {
        category: "array",
        operator: "lengthEq",
        filter: {
          category: "number",
          operator: "gt",
          value: 3
        },
        value: 2
      })).toBeTruthy();
    });

    it("lengthGt matches arrays with greater length", () => {
      expect(match([1, 2, 3, 4, 5], {
        category: "array",
        operator: "lengthGt",
        value: 3
      })).toBeTruthy();
    });

    it("lengthLt matches arrays with smaller length", () => {
      expect(match([1, 2], {
        category: "array",
        operator: "lengthLt",
        value: 5
      })).toBeTruthy();
    });

    it("lengthGte matches arrays with greater or equal length", () => {
      expect(match([1, 2, 3], {
        category: "array",
        operator: "lengthGte",
        value: 3
      })).toBeTruthy();
    });

    it("lengthLte matches arrays with smaller or equal length", () => {
      expect(match([1, 2, 3], {
        category: "array",
        operator: "lengthLte",
        value: 3
      })).toBeTruthy();
    });
  });

  describe("anyOf operator", () => { 
    it("matches when at least one element remains after filtering", () => {
      expect(match([1, 2, 3, 4, 5], {
        category: "array",
        operator: "anyOf",
        filter: {
          category: "number",
          operator: "gt",
          value: 3
        }
      })).toBeTruthy();
    });

    it("does not match when all elements are filtered out", () => {
      expect(match([1, 2, 3], {
        category: "array",
        operator: "anyOf",
        filter: {
          category: "number",
          operator: "gt",
          value: 10
        }
      })).toBeFalsy();
    });

    it("matches non-empty arrays without a filter", () => {
      expect(match([1, 2, 3], {
        category: "array",
        operator: "anyOf"
      })).toBeTruthy();
    });

    it("does not match empty arrays", () => {
      expect(match([], {
        category: "array",
        operator: "anyOf"
      })).toBeFalsy();
    });
  });

  describe("allOf operator", () => { 
    it("matches when all elements remain after filtering", () => {
      expect(match([2, 3, 4], {
        category: "array",
        operator: "allOf",
        filter: {
          category: "number",
          operator: "gt",
          value: 1
        }
      })).toBeTruthy();
    });

    it("does not match when some elements are filtered out", () => {
      expect(match([1, 2, 3], {
        category: "array",
        operator: "allOf",
        filter: {
          category: "number",
          operator: "gt",
          value: 1
        }
      })).toBeFalsy();
    });

    it("matches arrays without a filter", () => {
      expect(match([1, 2, 3], {
        category: "array",
        operator: "allOf"
      })).toBeTruthy();
    });

    it("matches empty arrays (vacuous truth)", () => {
      expect(match([], {
        category: "array",
        operator: "allOf"
      })).toBeTruthy();
    });
  });

  describe("filtering with complex matchers", () => {
    it("can filter array of numbers and check if any remain", () => {
      expect(match([1, 2, 3, 4, 5, 6], {
        category: "array",
        operator: "anyOf",
        filter: {
          category: "number",
          operator: "gt",
          value: 3
        }
      })).toBeTruthy();
    });

    it("can filter array of strings and check length", () => {
      expect(match(["hello", "help", "hero", "world"], {
        category: "array",
        operator: "lengthEq",
        filter: {
          category: "string",
          operator: "match",
          value: "^he"
        },
        value: 3
      })).toBeTruthy();
    });

    it("can filter array of objects and check if any remain", () => {
      expect(match([
        { "name": "Alice", "age": 30 },
        { "name": "Bob", "age": 25 },
        { "name": "Charlie", "age": 35 }
      ], {
        category: "array",
        operator: "lengthEq",
        filter: {
          category: "object",
          operator: "prop",
          path: "age",
          matcher: {
            category: "number",
            operator: "gte",
            value: 30
          }
        },
        value: 2
      })).toBeTruthy();
    });

    it("does not match non-array data", () => {
      expect(match(42, {
        category: "array",
        operator: "notEmpty"
      })).toBeFalsy();
    });
  });
});
