import { match } from "../src/index";

describe("Composite matching", () => {
  describe("anyOf operator", () => { 
    it("matches when any submatcher matches", () => {
      expect(match(42, {
        type: "composite",
        category: "composite",
        operator: "anyOf",
        matchers: [
          {
            type: "number",
            category: "scalar",
            operator: "eq",
            value: 42
          },
          {
            type: "number",
            category: "scalar",
            operator: "eq",
            value: 100
          }
        ]
      })).toBeTruthy();
    });

    it("does not match when no submatcher matches", () => {
      expect(match(42, {
        type: "composite",
        category: "composite",
        operator: "anyOf",
        matchers: [
          {
            type: "number",
            category: "scalar",
            operator: "eq",
            value: 100
          },
          {
            type: "number",
            category: "scalar",
            operator: "eq",
            value: 200
          }
        ]
      })).toBeFalsy();
    });

    it("matches with different types of matchers", () => {
      expect(match("hello", {
        type: "composite",
        category: "composite",
        operator: "anyOf",
        matchers: [
          {
            type: "number",
            category: "scalar",
            operator: "eq",
            value: 42
          },
          {
            type: "string",
            category: "scalar",
            operator: "eq",
            value: "hello"
          }
        ]
      })).toBeTruthy();
    });

    it("matches with complex matchers", () => {
      expect(match([1, 2, 3], {
        type: "composite",
        category: "composite",
        operator: "anyOf",
        matchers: [
          {
            type: "string",
            category: "scalar",
            operator: "eq",
            value: "test"
          },
          {
            type: "array",
            category: "array",
            operator: "any",
            matchers: [{
              type: "number",
              category: "scalar",
              operator: "gt",
              value: 2
            }]
          }
        ]
      })).toBeTruthy();
    });

    it("matches with object matcher", () => {
      expect(match({ name: "John", age: 30 }, {
        type: "composite",
        category: "composite",
        operator: "anyOf",
        matchers: [
          {
            type: "object",
            category: "object",
            operator: "prop",
            path: "age",
            matcher: {
              type: "number",
              category: "scalar",
              operator: "lt",
              value: 18
            }
          },
          {
            type: "object",
            category: "object",
            operator: "prop",
            path: "age",
            matcher: {
              type: "number",
              category: "scalar",
              operator: "gte",
              value: 18
            }
          }
        ]
      })).toBeTruthy();
    });

    it("matches when first matcher matches", () => {
      expect(match(5, {
        type: "composite",
        category: "composite",
        operator: "anyOf",
        matchers: [
          {
            type: "number",
            category: "scalar",
            operator: "lt",
            value: 10
          },
          {
            type: "number",
            category: "scalar",
            operator: "gt",
            value: 100
          }
        ]
      })).toBeTruthy();
    });

    it("matches when last matcher matches", () => {
      expect(match(5, {
        type: "composite",
        category: "composite",
        operator: "anyOf",
        matchers: [
          {
            type: "number",
            category: "scalar",
            operator: "gt",
            value: 100
          },
          {
            type: "number",
            category: "scalar",
            operator: "lt",
            value: 10
          }
        ]
      })).toBeTruthy();
    });

    it("does not match empty matchers array", () => {
      expect(match(42, {
        type: "composite",
        category: "composite",
        operator: "anyOf",
        matchers: []
      })).toBeFalsy();
    });
  });

  describe("allOf operator", () => { 
    it("matches when all submatchers match", () => {
      expect(match(50, {
        type: "composite",
        category: "composite",
        operator: "allOf",
        matchers: [
          {
            type: "number",
            category: "scalar",
            operator: "gt",
            value: 40
          },
          {
            type: "number",
            category: "scalar",
            operator: "lt",
            value: 60
          }
        ]
      })).toBeTruthy();
    });

    it("does not match when any submatcher fails", () => {
      expect(match(50, {
        type: "composite",
        category: "composite",
        operator: "allOf",
        matchers: [
          {
            type: "number",
            category: "scalar",
            operator: "gt",
            value: 40
          },
          {
            type: "number",
            category: "scalar",
            operator: "lt",
            value: 45
          }
        ]
      })).toBeFalsy();
    });

    it("matches with multiple conditions on same data", () => {
      expect(match(100, {
        type: "composite",
        category: "composite",
        operator: "allOf",
        matchers: [
          {
            type: "number",
            category: "scalar",
            operator: "gte",
            value: 100
          },
          {
            type: "number",
            category: "scalar",
            operator: "lte",
            value: 100
          },
          {
            type: "number",
            category: "scalar",
            operator: "neq",
            value: 99
          }
        ]
      })).toBeTruthy();
    });

    it("matches object with multiple property checks", () => {
      expect(match({ name: "John", age: 30, active: true }, {
        type: "composite",
        category: "composite",
        operator: "allOf",
        matchers: [
          {
            type: "object",
            category: "object",
            operator: "prop",
            path: "name",
            matcher: {
              type: "string",
              category: "scalar",
              operator: "eq",
              value: "John"
            }
          },
          {
            type: "object",
            category: "object",
            operator: "prop",
            path: "age",
            matcher: {
              type: "number",
              category: "scalar",
              operator: "gte",
              value: 18
            }
          },
          {
            type: "object",
            category: "object",
            operator: "prop",
            path: "active",
            matcher: {
              type: "boolean",
              category: "scalar",
              operator: "eq",
              value: true
            }
          }
        ]
      })).toBeTruthy();
    });

    it("does not match object when one property check fails", () => {
      expect(match({ name: "John", age: 15, active: true }, {
        type: "composite",
        category: "composite",
        operator: "allOf",
        matchers: [
          {
            type: "object",
            category: "object",
            operator: "prop",
            path: "name",
            matcher: {
              type: "string",
              category: "scalar",
              operator: "eq",
              value: "John"
            }
          },
          {
            type: "object",
            category: "object",
            operator: "prop",
            path: "age",
            matcher: {
              type: "number",
              category: "scalar",
              operator: "gte",
              value: 18
            }
          }
        ]
      })).toBeFalsy();
    });

    it("matches with string regex patterns", () => {
      expect(match("hello123", {
        type: "composite",
        category: "composite",
        operator: "allOf",
        matchers: [
          {
            type: "string",
            category: "scalar",
            operator: "match",
            value: "^hello"
          },
          {
            type: "string",
            category: "scalar",
            operator: "match",
            value: "\\d+$"
          }
        ]
      })).toBeTruthy();
    });

    it("matches empty matchers array (vacuous truth)", () => {
      expect(match(42, {
        type: "composite",
        category: "composite",
        operator: "allOf",
        matchers: []
      })).toBeTruthy();
    });
  });

  describe("nested composite matchers", () => {
    it("matches with nested anyOf inside allOf", () => {
      expect(match(25, {
        type: "composite",
        category: "composite",
        operator: "allOf",
        matchers: [
          {
            type: "number",
            category: "scalar",
            operator: "gt",
            value: 0
          },
          {
            type: "composite",
            category: "composite",
            operator: "anyOf",
            matchers: [
              {
                type: "number",
                category: "scalar",
                operator: "lt",
                value: 50
              },
              {
                type: "number",
                category: "scalar",
                operator: "gt",
                value: 100
              }
            ]
          }
        ]
      })).toBeTruthy();
    });

    it("matches with nested allOf inside anyOf", () => {
      expect(match(42, {
        type: "composite",
        category: "composite",
        operator: "anyOf",
        matchers: [
          {
            type: "composite",
            category: "composite",
            operator: "allOf",
            matchers: [
              {
                type: "number",
                category: "scalar",
                operator: "gt",
                value: 40
              },
              {
                type: "number",
                category: "scalar",
                operator: "lt",
                value: 50
              }
            ]
          },
          {
            type: "number",
            category: "scalar",
            operator: "eq",
            value: 100
          }
        ]
      })).toBeTruthy();
    });

    it("does not match when nested conditions fail", () => {
      expect(match(150, {
        type: "composite",
        category: "composite",
        operator: "allOf",
        matchers: [
          {
            type: "number",
            category: "scalar",
            operator: "gt",
            value: 100
          },
          {
            type: "composite",
            category: "composite",
            operator: "anyOf",
            matchers: [
              {
                type: "number",
                category: "scalar",
                operator: "lt",
                value: 50
              },
              {
                type: "number",
                category: "scalar",
                operator: "eq",
                value: 75
              }
            ]
          }
        ]
      })).toBeFalsy();
    });
  });
});
