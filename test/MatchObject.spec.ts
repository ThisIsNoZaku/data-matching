import { match } from "../src/index";

describe("Object matching", () => {
  describe("prop operator", () => { 
    it("matches top-level property with scalar matcher", () => {
      expect(match({ name: "John", age: 30 }, {
        type: "object",
        category: "object",
        operator: "prop",
        path: "age",
        matcher: {
          type: "number",
          category: "scalar",
          operator: "eq",
          value: 30
        }
      })).toBeTruthy();
    });

    it("does not match when top-level property value doesn't match", () => {
      expect(match({ name: "John", age: 30 }, {
        type: "object",
        category: "object",
        operator: "prop",
        path: "age",
        matcher: {
          type: "number",
          category: "scalar",
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
        type: "object",
        category: "object",
        operator: "prop",
        path: "user.profile.age",
        matcher: {
          type: "number",
          category: "scalar",
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
        type: "object",
        category: "object",
        operator: "prop",
        path: "user.profile.age",
        matcher: {
          type: "number",
          category: "scalar",
          operator: "eq",
          value: 30
        }
      })).toBeFalsy();
    });

    it("matches string property", () => {
      expect(match({ name: "John Doe" }, {
        type: "object",
        category: "object",
        operator: "prop",
        path: "name",
        matcher: {
          type: "string",
          category: "scalar",
          operator: "eq",
          value: "John Doe"
        }
      })).toBeTruthy();
    });

    it("matches string property with regex", () => {
      expect(match({ email: "user@example.com" }, {
        type: "object",
        category: "object",
        operator: "prop",
        path: "email",
        matcher: {
          type: "string",
          category: "scalar",
          operator: "match",
          value: "@example\\.com$"
        }
      })).toBeTruthy();
    });

    it("matches boolean property", () => {
      expect(match({ active: true }, {
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
        type: "object",
        category: "object",
        operator: "prop",
        path: "a.b.c.d.e",
        matcher: {
          type: "string",
          category: "scalar",
          operator: "eq",
          value: "deep"
        }
      })).toBeTruthy();
    });

    it("matches property with number comparison operator", () => {
      expect(match({ score: 85 }, {
        type: "object",
        category: "object",
        operator: "prop",
        path: "score",
        matcher: {
          type: "number",
          category: "scalar",
          operator: "gt",
          value: 80
        }
      })).toBeTruthy();
    });

    it("does not match non-object data", () => {
      expect(match("not an object", {
        type: "object",
        category: "object",
        operator: "prop",
        path: "any",
        matcher: {
          type: "string",
          category: "scalar",
          operator: "eq",
          value: "test"
        }
      })).toBeFalsy();
    });

    it("does not match null", () => {
      expect(match(null, {
        type: "object",
        category: "object",
        operator: "prop",
        path: "any",
        matcher: {
          type: "string",
          category: "scalar",
          operator: "eq",
          value: "test"
        }
      })).toBeFalsy();
    });

    it("does not match array", () => {
      expect(match([1, 2, 3], {
        type: "object",
        category: "object",
        operator: "prop",
        path: "0",
        matcher: {
          type: "number",
          category: "scalar",
          operator: "eq",
          value: 1
        }
      })).toBeFalsy();
    });

    it("matches with nested array matcher", () => {
      expect(match({ 
        tags: ["javascript", "typescript", "node"] 
      }, {
        type: "object",
        category: "object",
        operator: "prop",
        path: "tags",
        matcher: {
          type: "array",
          category: "array",
          operator: "any",
          matchers: [{
            type: "string",
            category: "scalar",
            operator: "eq",
            value: "typescript"
          }]
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
        type: "object",
        category: "object",
        operator: "prop",
        path: "user",
        matcher: {
          type: "object",
          category: "object",
          operator: "prop",
          path: "address.city",
          matcher: {
            type: "string",
            category: "scalar",
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
        type: "object",
        category: "object",
        operator: "prop",
        path: "user.profile.age",
        matcher: {
          type: "number",
          category: "scalar",
          operator: "eq",
          value: 30
        }
      })).toBeFalsy();
    });

    it("does not match when path traverses through undefined", () => {
      expect(match({ 
        user: { } 
      }, {
        type: "object",
        category: "object",
        operator: "prop",
        path: "user.profile.age",
        matcher: {
          type: "number",
          category: "scalar",
          operator: "eq",
          value: 30
        }
      })).toBeFalsy();
    });
  });
});
