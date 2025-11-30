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
export type Matcher = ScalarMatcher | ArrayMatcher | ObjectMatcher | CompositeMatcher;
export type ScalarMatcher = NumberMatcher | BooleanMatcher | StringMatcher;
export interface NumberMatcher {
    category: ScalarCategory;
    type: NumberType;
    operator: Operator;
    value: number;
}
export interface BooleanMatcher {
    category: ScalarCategory;
    type: BooleanType;
    operator: Operator;
    value: boolean;
}
export interface StringMatcher {
    category: ScalarCategory;
    type: StringType;
    operator: StringOperator;
    value: string;
}
export interface ArrayMatcher {
    category: ArrayCategory;
    type: ArrayType;
    operator: ArrayOperator;
    matchers: ScalarMatcher[];
}
export interface ObjectMatcher {
    category: ObjectCategory;
    type: ObjectType;
    operator: ObjectOperator;
    path: string;
    matcher: Matcher;
}
export interface CompositeMatcher {
    category: CompositeCategory;
    type: CompositeType;
    operator: CompositeOperator;
    matchers: Matcher[];
}
export interface ValuesInArrayMatcher {
    type: ArrayType;
}
export {};
//# sourceMappingURL=matchers.d.ts.map