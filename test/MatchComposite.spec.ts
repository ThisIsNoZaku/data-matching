import { match } from "../src/index";

describe("Composite matching", () => {
  describe("anyOf operator", () => { 
    it("matches when any submatcher matches", () => {
      expect(match(42, {
        category: "composite",
        operator: "anyOf",
        matchers: [
          {
            category: "number",
            operator: "eq",
            value: 42
          },
          {
            category: "number",
            operator: "eq",
            value: 100
          }
        ]
      })).toBeTruthy();
    });

    it("does not match when no submatcher matches", () => {
      expect(match(42, {
        category: "composite",
        operator: "anyOf",
        matchers: [
          {
            category: "number",
            operator: "eq",
            value: 100
          },
          {
            category: "number",
            operator: "eq",
            value: 200
          }
        ]
      })).toBeFalsy();
    });

    it("matches with different types of matchers", () => {
      expect(match("hello", {
        category: "composite",
        operator: "anyOf",
        matchers: [
          {
            category: "number",
            operator: "eq",
            value: 42
          },
          {
            category: "string",
            operator: "eq",
            value: "hello"
          }
        ]
      })).toBeTruthy();
    });

    it("matches with complex matchers", () => {
      expect(match([1, 2, 3], {
        category: "composite",
        operator: "anyOf",
        matchers: [
          {
            category: "string",
            operator: "eq",
            value: "test"
          },
          {
            category: "array",
            operator: "anyOf",
            filter: {
              category: "number",
              operator: "gt",
              value: 2
            }
          }
        ]
      })).toBeTruthy();
    });

    it("matches with object matcher", () => {
      expect(match({ name: "John", age: 30 }, {
        category: "composite",
        operator: "anyOf",
        matchers: [
          {
            category: "object",
            operator: "prop",
            path: "age",
            matcher: {
              category: "number",
              operator: "lt",
              value: 18
            }
          },
          {
            category: "object",
            operator: "prop",
            path: "age",
            matcher: {
              category: "number",
              operator: "gte",
              value: 18
            }
          }
        ]
      })).toBeTruthy();
    });

    it("matches when first matcher matches", () => {
      expect(match(5, {
        category: "composite",
        operator: "anyOf",
        matchers: [
          {
            category: "number",
            operator: "lt",
            value: 10
          },
          {
            category: "number",
            operator: "gt",
            value: 100
          }
        ]
      })).toBeTruthy();
    });

    it("matches when last matcher matches", () => {
      expect(match(5, {
        category: "composite",
        operator: "anyOf",
        matchers: [
          {
            category: "number",
            operator: "gt",
            value: 100
          },
          {
            category: "number",
            operator: "lt",
            value: 10
          }
        ]
      })).toBeTruthy();
    });

    it("does not match empty matchers array", () => {
      expect(match(42, {
        category: "composite",
        operator: "anyOf",
        matchers: []
      })).toBeFalsy();
    });
  });

  describe("allOf operator", () => { 
    it("matches when all submatchers match", () => {
      expect(match(50, {
        category: "composite",
        operator: "allOf",
        matchers: [
          {
            category: "number",
            operator: "gt",
            value: 40
          },
          {
            category: "number",
            operator: "lt",
            value: 60
          }
        ]
      })).toBeTruthy();
    });

    it("does not match when any submatcher fails", () => {
      expect(match(50, {
        category: "composite",
        operator: "allOf",
        matchers: [
          {
            category: "number",
            operator: "gt",
            value: 40
          },
          {
            category: "number",
            operator: "lt",
            value: 45
          }
        ]
      })).toBeFalsy();
    });

    it("matches with multiple conditions on same data", () => {
      expect(match(100, {
        category: "composite",
        operator: "allOf",
        matchers: [
          {
            category: "number",
            operator: "gte",
            value: 100
          },
          {
            category: "number",
            operator: "lte",
            value: 100
          },
          {
            category: "number",
            operator: "neq",
            value: 99
          }
        ]
      })).toBeTruthy();
    });

    it("matches object with multiple property checks", () => {
      expect(match({ name: "John", age: 30, active: true }, {
        category: "composite",
        operator: "allOf",
        matchers: [
          {
            category: "object",
            operator: "prop",
            path: "name",
            matcher: {
              category: "string",
              operator: "eq",
              value: "John"
            }
          },
          {
            category: "object",
            operator: "prop",
            path: "age",
            matcher: {
              category: "number",
              operator: "gte",
              value: 18
            }
          },
          {
            category: "object",
            operator: "prop",
            path: "active",
            matcher: {
              category: "boolean",
              operator: "eq",
              value: true
            }
          }
        ]
      })).toBeTruthy();
    });

    it("does not match object when one property check fails", () => {
      expect(match({ name: "John", age: 15, active: true }, {
        category: "composite",
        operator: "allOf",
        matchers: [
          {
            category: "object",
            operator: "prop",
            path: "name",
            matcher: {
              category: "string",
              operator: "eq",
              value: "John"
            }
          },
          {
            category: "object",
            operator: "prop",
            path: "age",
            matcher: {
              category: "number",
              operator: "gte",
              value: 18
            }
          }
        ]
      })).toBeFalsy();
    });

    it("matches with string regex patterns", () => {
      expect(match("hello123", {
        category: "composite",
        operator: "allOf",
        matchers: [
          {
            category: "string",
            operator: "match",
            value: "^hello"
          },
          {
            category: "string",
            operator: "match",
            value: "\\d+$"
          }
        ]
      })).toBeTruthy();
    });

    it("matches empty matchers array (vacuous truth)", () => {
      expect(match(42, {
        category: "composite",
        operator: "allOf",
        matchers: []
      })).toBeTruthy();
    });
  });

  describe("nested composite matchers", () => {
    it("matches with nested anyOf inside allOf", () => {
      expect(match(25, {
        category: "composite",
        operator: "allOf",
        matchers: [
          {
            category: "number",
            operator: "gt",
            value: 0
          },
          {
            category: "composite",
            operator: "anyOf",
            matchers: [
              {
                category: "number",
                operator: "lt",
                value: 50
              },
              {
                  
                category: "number",
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
        category: "composite",
        operator: "anyOf",
        matchers: [
          {
            category: "composite",
            operator: "allOf",
            matchers: [
              {
                category: "number",
                operator: "gt",
                value: 40
              },
              {
                category: "number",
                operator: "lt",
                value: 50
              }
            ]
          },
          {
            category: "number",
            operator: "eq",
            value: 100
          }
        ]
      })).toBeTruthy();
    });

    it("does not match when nested conditions fail", () => {
      expect(match(150, {
        category: "composite",
        operator: "allOf",
        matchers: [
          {
            category: "number",
            operator: "gt",
            value: 100
          },
          {
            category: "composite",
            operator: "anyOf",
            matchers: [
              {
                category: "number",
                operator: "lt",
                value: 50
              },
              {
                category: "number",
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
