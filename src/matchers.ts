import { ArrayOperator, CompositeOperator, ObjectOperator, Operator, StringOperator } from "./operators";

type ScalarCategory = "scalar";
type ArrayCategory = "array";
type ObjectCategory = "object";
type CompositeCategory = "composite";

type ArrayType = "array";
type ObjectType = "object";
type NumberType = "number";
type BooleanType = "boolean";
type StringType = "string";
type CompositeType = "composite";
// Describe a data pattern to test for.
export type Matcher = ScalarMatcher | ArrayMatcher | ObjectMatcher | CompositeMatcher;


export type ScalarMatcher = NumberMatcher | BooleanMatcher | StringMatcher;

// A pattern against a single number.
export interface NumberMatcher {
  category: ScalarCategory,
  type: NumberType,
  operator: Operator,
  value: number
}

// A pattern against a single boolean.
export interface BooleanMatcher {
  category: ScalarCategory,
  type: BooleanType,
  operator: Operator,
  value: boolean
}

// A pattern against a single string.
export interface StringMatcher {
  category: ScalarCategory,
  type: StringType,
  operator: StringOperator,
  value: string
}

// A pattern against elements in an array
export interface ArrayMatcher {
  category: ArrayCategory,
  type: ArrayType,
  operator: ArrayOperator,
  matchers: ScalarMatcher[]
}

// A pattern against a property in an object
export interface ObjectMatcher {
  category: ObjectCategory,
  type: ObjectType,
  operator: ObjectOperator,
  path: string,
  matcher: Matcher
}

// A composite pattern that combines multiple matchers
export interface CompositeMatcher {
  category: CompositeCategory,
  type: CompositeType,
  operator: CompositeOperator,
  matchers: Matcher[]
}

// A pattern against all values in an array
export interface ValuesInArrayMatcher {
    type: ArrayType,
}