import { match } from "../src/index";

describe("Object matching", () => {
  describe("prop operator", () => { 
    it("matches top-level property with scalar matcher", () => {
      expect(match({ name: "John", age: 30 }, {
        category: "object",
        operator: "prop",
        path: "age",
        matcher: {
          category: "number",
          operator: "eq",
          value: 30
        }
      })).toBeTruthy();
    });

    it("does not match when top-level property value doesn't match", () => {
      expect(match({ name: "John", age: 30 }, {
        category: "object",
        operator: "prop",
        path: "age",
        matcher: {
          category: "number",
          operator: "eq",
          value: 25
        }
      })).toBeFalsy();
    });

    it("matches nested property with dot notation", () => {
      expect(match({ 
        user: { 
          profile: { 
            age: 30 
          } 
        } 
      }, {
        category: "object",
        operator: "prop",
        path: "user.profile.age",
        matcher: {
          category: "number",
          operator: "eq",
          value: 30
        }
      })).toBeTruthy();
    });

    it("does not match when nested property doesn't exist", () => {
      expect(match({ 
        user: { 
          profile: {} 
        } 
      }, {
        category: "object",
        operator: "prop",
        path: "user.profile.age",
        matcher: {
          category: "number",
          operator: "eq",
          value: 30
        }
      })).toBeFalsy();
    });

    it("matches string property", () => {
      expect(match({ name: "John Doe" }, {
        category: "object",
        operator: "prop",
        path: "name",
        matcher: {
          category: "string",
          operator: "eq",
          value: "John Doe"
        }
      })).toBeTruthy();
    });

    it("matches string property with regex", () => {
      expect(match({ email: "user@example.com" }, {
        category: "object",
        operator: "prop",
        path: "email",
        matcher: {
          category: "string",
          operator: "match",
          value: "@example\\.com$"
        }
      })).toBeTruthy();
    });

    it("matches boolean property", () => {
      expect(match({ active: true }, {
        category: "object",
        operator: "prop",
        path: "active",
        matcher: {
          category: "boolean",
          operator: "eq",
          value: true
        }
      })).toBeTruthy();
    });

    it("matches deeply nested property", () => {
      expect(match({ 
        a: { 
          b: { 
            c: { 
              d: { 
                e: "deep" 
              } 
            } 
          } 
        } 
      }, {
        category: "object",
        operator: "prop",
        path: "a.b.c.d.e",
        matcher: {
          category: "string",
          operator: "eq",
          value: "deep"
        }
      })).toBeTruthy();
    });

    it("matches property with number comparison operator", () => {
      expect(match({ score: 85 }, {
        category: "object",
        operator: "prop",
        path: "score",
        matcher: {
          category: "number",
          operator: "gt",
          value: 80
        }
      })).toBeTruthy();
    });

    it("does not match non-object data", () => {
      expect(match("not an object", {
        category: "object",
        operator: "prop",
        path: "any",
        matcher: {
          category: "string",
          operator: "eq",
          value: "test"
        }
      })).toBeFalsy();
    });

    it("does not match null", () => {
      expect(match(null, {
        category: "object",
        operator: "prop",
        path: "any",
        matcher: {
          category: "string",
          operator: "eq",
          value: "test"
        }
      })).toBeFalsy();
    });

    it("does not match array", () => {
      expect(match([1, 2, 3], {
        category: "object",
        operator: "prop",
        path: "0",
        matcher: {
          category: "number",
          operator: "eq",
          value: 1
        }
      })).toBeFalsy();
    });

    it("matches with nested array matcher", () => {
      expect(match({ 
        tags: ["javascript", "typescript", "node"] 
      }, {
        category: "object",
        operator: "prop",
        path: "tags",
        matcher: {
          category: "array",
          operator: "anyOf",
          filter: {
            category: "string",
            operator: "eq",
            value: "typescript"
          }
        }
      })).toBeTruthy();
    });

    it("matches with nested object matcher", () => {
      expect(match({ 
        user: { 
          address: { 
            city: "New York" 
          } 
        } 
      }, {
        category: "object",
        operator: "prop",
        path: "user",
        matcher: {
          category: "object",
          operator: "prop",
          path: "address.city",
          matcher: {
            category: "string",
            operator: "eq",
            value: "New York"
          }
        }
      })).toBeTruthy();
    });

    it("does not match when path traverses through null", () => {
      expect(match({ 
        user: null 
      }, {
        category: "object",
        operator: "prop",
        path: "user.profile.age",
        matcher: {
          category: "number",
          operator: "eq",
          value: 30
        }
      })).toBeFalsy();
    });

    it("does not match when path traverses through undefined", () => {
      expect(match({ 
        user: { } 
      }, {
        category: "object",
        operator: "prop",
        path: "user.profile.age",
        matcher: {
          category: "number",
          operator: "eq",
          value: 30
        }
      })).toBeFalsy();
    });
  });
});
