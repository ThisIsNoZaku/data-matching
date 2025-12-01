"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_OF = exports.ANY_OF = exports.PROP = exports.LENGTH_LTE = exports.LENGTH_GTE = exports.LENGTH_LT = exports.LENGTH_GT = exports.LENGTH_EQ = exports.NOT_EMPTY = exports.EMPTY = exports.NREGEX = exports.REGEX = exports.NEQ = exports.LTE = exports.GTE = exports.LT = exports.GT = exports.EQ = void 0;
exports.EQ = "eq";
exports.GT = "gt";
exports.LT = "lt";
exports.GTE = "gte";
exports.LTE = "lte";
exports.NEQ = "neq";
exports.REGEX = "match";
exports.NREGEX = "nmatch";
// Array operators test properties of the (filtered) array
exports.EMPTY = "empty"; // True if the (filtered) array is empty
exports.NOT_EMPTY = "notEmpty"; // True if the (filtered) array is not empty
exports.LENGTH_EQ = "lengthEq"; // True if the (filtered) array length equals value
exports.LENGTH_GT = "lengthGt"; // True if the (filtered) array length is greater than value
exports.LENGTH_LT = "lengthLt"; // True if the (filtered) array length is less than value
exports.LENGTH_GTE = "lengthGte"; // True if the (filtered) array length is greater than or equal to value
exports.LENGTH_LTE = "lengthLte"; // True if the (filtered) array length is less than or equal to value
exports.PROP = "prop";
exports.ANY_OF = "anyOf";
exports.ALL_OF = "allOf";
//# sourceMappingURL=operators.js.map