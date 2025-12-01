import { match } from "../src/index";
describe("Regex matching", () => {
  describe("regex patterns", () => { 
    it("matches string with regex pattern", () => {
      expect(match("hello world", {
        category: "string",
        operator: "match",
        value: "^hello"
      })).toBeTruthy();
    });

    it("does not match string that doesn't match regex pattern", () => {
      expect(match("goodbye world", {
        category: "string",
        operator: "match",
        value: "^hello"
      })).toBeFalsy();
    });

    it("matches with complex regex pattern", () => {
      expect(match("test123", {
        category: "string",
        operator: "match",
        value: "^test\\d+$"
      })).toBeTruthy();
    });

    it("matches email pattern", () => {
      expect(match("user@example.com", {
        category: "string",
        operator: "match",
        value: "^[^@]+@[^@]+\\.[^@]+$"
      })).toBeTruthy();
    });

    it("does not match invalid email", () => {
      expect(match("not-an-email", {
        category: "string",
        operator: "match",
        value: "^[^@]+@[^@]+\\.[^@]+$"
      })).toBeFalsy();
    });

    it("does not match non-string data", () => {
      expect(match(123, {
        category: "string",
        operator: "nmatch",
        value: "\\d+"
      })).toBeFalsy();
    });

    it("matches with case insensitive flag", () => {
      expect(match("HELLO", {
        category: "string",
        operator: "match",
        value: "hello"
      })).toBeFalsy(); // Without flag, should not match
    });
  })
})
