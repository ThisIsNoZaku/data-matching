import { match } from "../src/index";

describe("Array matching", () => {
  describe("any operator", () => { 
    it("matches when any element matches any submatcher", () => {
      expect(match([1, 2, 3], {
        type: "array",
        category: "array",
        operator: "any",
        matchers: [{
          type: "number",
          category: "scalar",
          operator: "eq",
          value: 2
        }]
      })).toBeTruthy();
    });

    it("does not match when no element matches any submatcher", () => {
      expect(match([1, 2, 3], {
        type: "array",
        category: "array",
        operator: "any",
        matchers: [{
          type: "number",
          category: "scalar",
          operator: "eq",
          value: 5
        }]
      })).toBeFalsy();
    });

    it("matches with multiple submatchers", () => {
      expect(match([1, 2, 3], {
        type: "array",
        category: "array",
        operator: "any",
        matchers: [
          {
            type: "number",
            category: "scalar",
            operator: "gt",
            value: 2
          },
          {
            type: "number",
            category: "scalar",
            operator: "lt",
            value: 2
          }
        ]
      })).toBeTruthy();
    });

    it("matches array of strings", () => {
      expect(match(["hello", "world"], {
        type: "array",
        category: "array",
        operator: "any",
        matchers: [{
          type: "string",
          category: "scalar",
          operator: "eq",
          value: "hello"
        }]
      })).toBeTruthy();
    });

    it("matches array of booleans", () => {
      expect(match([true, false, true], {
        type: "array",
        category: "array",
        operator: "any",
        matchers: [{
          type: "boolean",
          category: "scalar",
          operator: "eq",
          value: false
        }]
      })).toBeTruthy();
    });

    it("does not match non-array data", () => {
      expect(match("not an array", {
        type: "array",
        category: "array",
        operator: "any",
        matchers: [{
          type: "string",
          category: "scalar",
          operator: "eq",
          value: "test"
        }]
      })).toBeFalsy();
    });

    it("does not match empty array", () => {
      expect(match([], {
        type: "array",
        category: "array",
        operator: "any",
        matchers: [{
          type: "number",
          category: "scalar",
          operator: "eq",
          value: 1
        }]
      })).toBeFalsy();
    });
  });

  describe("all operator", () => { 
    it("matches when all elements match at least one submatcher", () => {
      expect(match([2, 3, 4], {
        type: "array",
        category: "array",
        operator: "all",
        matchers: [{
          type: "number",
          category: "scalar",
          operator: "gt",
          value: 1
        }]
      })).toBeTruthy();
    });

    it("does not match when not all elements match any submatcher", () => {
      expect(match([1, 2, 3], {
        type: "array",
        category: "array",
        operator: "all",
        matchers: [{
          type: "number",
          category: "scalar",
          operator: "gt",
          value: 1
        }]
      })).toBeFalsy();
    });

    it("matches with multiple submatchers where each element matches at least one", () => {
      expect(match([1, 2, 3], {
        type: "array",
        category: "array",
        operator: "all",
        matchers: [
          {
            type: "number",
            category: "scalar",
            operator: "lte",
            value: 3
          },
          {
            type: "number",
            category: "scalar",
            operator: "gte",
            value: 1
          }
        ]
      })).toBeTruthy();
    });

    it("matches array of strings where all match", () => {
      expect(match(["hello", "help", "hero"], {
        type: "array",
        category: "array",
        operator: "all",
        matchers: [{
          type: "string",
          category: "scalar",
          operator: "match",
          value: "^he"
        }]
      })).toBeTruthy();
    });

    it("does not match array of strings where not all match", () => {
      expect(match(["hello", "world"], {
        type: "array",
        category: "array",
        operator: "all",
        matchers: [{
          type: "string",
          category: "scalar",
          operator: "match",
          value: "^he"
        }]
      })).toBeFalsy();
    });

    it("matches empty array (vacuous truth)", () => {
      expect(match([], {
        type: "array",
        category: "array",
        operator: "all",
        matchers: [{
          type: "number",
          category: "scalar",
          operator: "eq",
          value: 1
        }]
      })).toBeTruthy();
    });

    it("does not match non-array data", () => {
      expect(match(42, {
        type: "array",
        category: "array",
        operator: "all",
        matchers: [{
          type: "number",
          category: "scalar",
          operator: "eq",
          value: 42
        }]
      })).toBeFalsy();
    });
  });

  describe("filtered array", () => {
    it("can filter array elements before the ANY operator", () => {
      expect(match([1, 2, 3, 4, 5, 6], {
        type: "array",
        category: "array",
        operator: "any",
        filter: {
          type: "number",
          category: "scalar",
          operator: "gt",
          value: 3
        },
        matchers: [{
          type: "number",
          category: "scalar",
          operator: "eq",
          value: 5
        }]
      })).toBeTruthy();
    });
    it("can filter array elements before the ALL operator", () => {
      expect(match([1, 2, 3, 4, 5, 6], {
        type: "array",
        category: "array",
        operator: "all",
        filter: {
          type: "number",
          category: "scalar",
          operator: "gte",
          value: 2
        },
        matchers: [{
          type: "number",
          category: "scalar",
          operator: "gt",
          value: 1
        }]
      })).toBeTruthy();
    });
  })
});
