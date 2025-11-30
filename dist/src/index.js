"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.match = match;
function match(data, matcher) {
    switch (matcher.category) {
        case "scalar":
            return matchScalarProperty(data, matcher);
    }
}
(matcher.type);
{
    "number";
    return matchNumber(data, matcher);
}
//# sourceMappingURL=index.js.map