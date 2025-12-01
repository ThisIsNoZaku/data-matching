import { ArrayOperator, CompositeOperator, ObjectOperator, Operator, StringOperator } from "./operators";
type NumberCategory = "number";
type BooleanCategory = "boolean";
type StringCategory = "string";
type ArrayCategory = "array";
type ObjectCategory = "object";
type CompositeCategory = "composite";
export type Matcher = ScalarMatcher | ArrayMatcher | ObjectMatcher | CompositeMatcher;
export type ScalarMatcher = NumberMatcher | BooleanMatcher | StringMatcher;
interface BaseMatcher {
    category: NumberCategory | BooleanCategory | StringCategory | ArrayCategory | ObjectCategory | CompositeCategory;
    operator: Operator | ArrayOperator | ObjectOperator | CompositeOperator | StringOperator;
    value?: any;
}
export interface NumberMatcher extends BaseMatcher {
    category: NumberCategory;
    operator: Operator;
    value: number;
}
export interface BooleanMatcher extends BaseMatcher {
    category: BooleanCategory;
    operator: Operator;
    value: boolean;
}
export interface StringMatcher extends BaseMatcher {
    category: StringCategory;
    operator: StringOperator;
    value: string;
}
export interface ArrayMatcher extends BaseMatcher {
    category: ArrayCategory;
    operator: ArrayOperator;
    filter?: Matcher;
    value?: number;
}
export interface ObjectMatcher extends BaseMatcher {
    category: ObjectCategory;
    operator: ObjectOperator;
    path: string;
    matcher: Matcher;
}
export interface CompositeMatcher extends BaseMatcher {
    category: CompositeCategory;
    operator: CompositeOperator;
    matchers: Matcher[];
}
export {};
//# sourceMappingURL=matchers.d.ts.map