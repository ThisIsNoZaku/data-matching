import { ArrayOperator, CompositeOperator, ObjectOperator, Operator, StringOperator } from "./operators";
// The category is the kind of data the matcher is tested against.
type NumberCategory = "number";
type BooleanCategory = "boolean";
type StringCategory = "string";
type ArrayCategory = "array";
type ObjectCategory = "object";
type CompositeCategory = "composite";

// The type is the kind of comparison being made
// Ordinal types are ordered types like numbers and booleans
type OrdinalType = "ordinal";
// Categorical types are unordered types like strings or objects
type CategoricalType = "categorical";
// Describe a data pattern to test for.
export type Matcher = ScalarMatcher | ArrayMatcher | ObjectMatcher | CompositeMatcher;

export type ScalarMatcher = NumberMatcher | BooleanMatcher | StringMatcher;

interface BaseMatcher {
  category: NumberCategory | BooleanCategory | StringCategory | ArrayCategory | ObjectCategory | CompositeCategory,
  operator: Operator | ArrayOperator | ObjectOperator | CompositeOperator | StringOperator,
  value?: any
}

// A pattern against a single number.
export interface NumberMatcher extends BaseMatcher {
  category: NumberCategory,
  operator: Operator,
  value: number
}

// A pattern against a single boolean.
export interface BooleanMatcher extends BaseMatcher {
  category: BooleanCategory,
  operator: Operator,
  value: boolean
}

// A pattern against a single string.
export interface StringMatcher extends BaseMatcher {
  category: StringCategory,
  operator: StringOperator,
  value: string
}

// A pattern against properties of an array
// The filter is applied to array elements, then the operator tests the resulting array
export interface ArrayMatcher extends BaseMatcher {
  category: ArrayCategory,
  operator: ArrayOperator,
  filter?: Matcher, // Optional filter to apply to array elements before testing
  value?: number // Used with length operators (lengthEq, lengthGt, etc.)
}

// A pattern against a property in an object
export interface ObjectMatcher extends BaseMatcher {
  category: ObjectCategory,
  operator: ObjectOperator,
  path: string,
  matcher: Matcher
}

// A composite pattern that combines multiple matchers
export interface CompositeMatcher extends BaseMatcher {
  category: CompositeCategory,
  operator: CompositeOperator,
  matchers: Matcher[]
}