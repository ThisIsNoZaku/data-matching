export const EQ = "eq";
export const GT = "gt";
export const LT = "lt";
export const GTE = "gte";
export const LTE = "lte";
export const NEQ = "neq";
export const REGEX = "match";
export const NREGEX = "nmatch";
// Array operators test properties of the (filtered) array
export const EMPTY = "empty"; // True if the (filtered) array is empty
export const NOT_EMPTY = "notEmpty"; // True if the (filtered) array is not empty
export const LENGTH_EQ = "lengthEq"; // True if the (filtered) array length equals value
export const LENGTH_GT = "lengthGt"; // True if the (filtered) array length is greater than value
export const LENGTH_LT = "lengthLt"; // True if the (filtered) array length is less than value
export const LENGTH_GTE = "lengthGte"; // True if the (filtered) array length is greater than or equal to value
export const LENGTH_LTE = "lengthLte"; // True if the (filtered) array length is less than or equal to value
export const PROP = "prop";
export const ANY_OF = "anyOf";
export const ALL_OF = "allOf";

export type Operator = NumberOperator | BooleanOperator | StringOperator | ArrayOperator | ObjectOperator | CompositeOperator;
export type NumberOperator = typeof EQ | typeof GT | typeof LT | typeof GTE | typeof LTE | typeof NEQ;
export type BooleanOperator = typeof EQ | typeof NEQ;
export type StringOperator = typeof EQ | typeof NEQ | typeof REGEX | typeof NREGEX;
export type ArrayOperator = typeof EMPTY | typeof NOT_EMPTY | typeof LENGTH_EQ | typeof LENGTH_GT | typeof LENGTH_LT | typeof LENGTH_GTE | typeof LENGTH_LTE | typeof ANY_OF | typeof ALL_OF;
export type ObjectOperator = typeof PROP;
export type CompositeOperator = typeof ANY_OF | typeof ALL_OF;