import { match } from "../src/index";
describe("Regex matching", () => {
  describe("regex patterns", () => { 
    it("matches string with regex pattern", () => {
      expect(match("hello world", {
        type: "string",
        category: "scalar",
        operator: "match",
        value: "^hello"
      })).toBeTruthy();
    });

    it("does not match string that doesn't match regex pattern", () => {
      expect(match("goodbye world", {
        type: "string",
        category: "scalar",
        operator: "match",
        value: "^hello"
      }, {logging: "info"})).toBeFalsy();
    });

    it("matches with complex regex pattern", () => {
      expect(match("test123", {
        type: "string",
        category: "scalar",
        operator: "match",
        value: "^test\\d+$"
      })).toBeTruthy();
    });

    it("matches email pattern", () => {
      expect(match("user@example.com", {
        type: "string",
        category: "scalar",
        operator: "match",
        value: "^[^@]+@[^@]+\\.[^@]+$"
      })).toBeTruthy();
    });

    it("does not match invalid email", () => {
      expect(match("not-an-email", {
        type: "string",
        category: "scalar",
        operator: "match",
        value: "^[^@]+@[^@]+\\.[^@]+$"
      })).toBeFalsy();
    });

    it("does not match non-string data", () => {
      expect(match(123, {
        type: "string",
        category: "scalar",
        operator: "nmatch",
        value: "\\d+"
      })).toBeFalsy();
    });

    it("matches with case insensitive flag", () => {
      expect(match("HELLO", {
        type: "string",
        category: "scalar",
        operator: "match",
        value: "hello"
      })).toBeFalsy(); // Without flag, should not match
    });
  })
})
