"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.match = match;
__exportStar(require("./matchers"), exports);
__exportStar(require("./operators"), exports);
function match(data, matcher, config) {
    if (config?.logging === "info") {
        console.info("Attempting match");
    }
    switch (matcher.category) {
        case "scalar":
            return matchScalarProperty(data, matcher, config);
        case "array":
            return matchArray(data, matcher, config);
        case "object":
            return matchObject(data, matcher, config);
        case "composite":
            return matchComposite(data, matcher, config);
        default:
            throw new Error(`Unsupported category: ${matcher.category}`);
    }
}
// Test that the data has a matching scalar property.
function matchScalarProperty(data, matcher, config) {
    if (config?.logging === "info") {
        console.info("Attempting scalar match");
    }
    switch (matcher.type) {
        case "number":
            return matchNumber(data, matcher, config);
        case "boolean":
            return matchBoolean(data, matcher, config);
        case "string":
            return matchString(data, matcher, config);
        default:
            throw new Error(`Unsupported scalar type: ${matcher.type}`);
    }
}
function matchNumber(data, matcher, config) {
    if (config?.logging === "info") {
        console.info("Attempting number match");
    }
    if (typeof data !== "number") {
        if (config?.logging === "info") {
            console.warn("Data is not a number");
        }
        return false;
    }
    switch (matcher.operator) {
        case "eq":
            if (config?.logging === "info") {
                console.info("Checking eq");
            }
            return data === matcher.value;
        case "neq":
            if (config?.logging === "info") {
                console.info("Checking neq");
            }
            return data !== matcher.value;
        case "gt":
            if (config?.logging === "info") {
                console.info("Checking gt");
            }
            return data > matcher.value;
        case "gte":
            if (config?.logging === "info") {
                console.info("Checking gte");
            }
            return data >= matcher.value;
        case "lt":
            if (config?.logging === "info") {
                console.info("Checking lt");
            }
            return data < matcher.value;
        case "lte":
            if (config?.logging === "info") {
                console.info("Checking lte");
            }
            return data <= matcher.value;
        default:
            throw new Error(`Unsupported operator: ${matcher.operator}`);
    }
}
function matchBoolean(data, matcher, config) {
    if (config?.logging === "info") {
        console.info("Attempting boolean match");
    }
    if (typeof data !== "boolean") {
        if (config?.logging === "info") {
            console.warn("Data is not a boolean");
        }
        return false;
    }
    switch (matcher.operator) {
        case "eq":
            if (config?.logging === "info") {
                console.info("Checking eq");
            }
            return data === matcher.value;
        case "neq":
            if (config?.logging === "info") {
                console.info("Checking neq");
            }
            return data !== matcher.value;
        default:
            throw new Error(`Unsupported operator for boolean: ${matcher.operator}`);
    }
}
function matchString(data, matcher, config) {
    if (config?.logging === "info") {
        console.info("Attempting string match");
    }
    if (typeof data !== "string") {
        if (config?.logging === "info") {
            console.warn("Data is not a string");
        }
        return false;
    }
    switch (matcher.operator) {
        case "eq":
            if (config?.logging === "info") {
                console.info("Checking eq");
            }
            return data === matcher.value;
        case "neq":
            if (config?.logging === "info") {
                console.info("Checking neq");
            }
            return data !== matcher.value;
        case "match":
            if (config?.logging === "info") {
                console.info("Checking regex");
            }
            const regex = new RegExp(matcher.value).test(data);
            if (config?.logging === "info") {
                console.info(`Negative regex test result: '${matcher.value}' vs '${data}'? ${regex}`);
            }
            return regex;
        case "nmatch":
            if (config?.logging === "info") {
                console.info("Checking negative regex");
            }
            const negativeRegex = new RegExp(matcher.value).test(data);
            if (config?.logging === "info") {
                console.info(`Negative regex test result: '${matcher.value}' vs '${data}'? ${negativeRegex}`);
            }
            return !negativeRegex;
        default:
            throw new Error(`Unsupported operator for string: ${matcher.operator}`);
    }
}
function matchArray(data, matcher, config) {
    if (config?.logging === "info") {
        console.info("Attempting array match");
    }
    if (!Array.isArray(data)) {
        if (config?.logging === "info") {
            console.warn("Data is not an array");
        }
        return false;
    }
    switch (matcher.operator) {
        case "any":
            if (config?.logging === "info") {
                console.info("Checking if any element matches");
            }
            return data.some(element => matcher.matchers.some(submatcher => match(element, submatcher, config)));
        case "all":
            if (config?.logging === "info") {
                console.info("Checking if all elements match");
            }
            return data.every(element => matcher.matchers.some(submatcher => match(element, submatcher, config)));
        default:
            throw new Error(`Unsupported operator for array: ${matcher.operator}`);
    }
}
function matchObject(data, matcher, config) {
    if (config?.logging === "info") {
        console.info("Attempting object match");
    }
    if (typeof data !== "object" || data === null || Array.isArray(data)) {
        if (config?.logging === "info") {
            console.warn("Data is not an object");
        }
        return false;
    }
    switch (matcher.operator) {
        case "prop":
            if (config?.logging === "info") {
                console.info(`Checking property at path: ${matcher.path}`);
            }
            const value = getPropertyByPath(data, matcher.path);
            if (value === undefined) {
                if (config?.logging === "info") {
                    console.warn(`Property not found at path: ${matcher.path}`);
                }
                return false;
            }
            return match(value, matcher.matcher, config);
        default:
            throw new Error(`Unsupported operator for object: ${matcher.operator}`);
    }
}
function getPropertyByPath(obj, path) {
    const parts = path.split('.');
    let current = obj;
    for (const part of parts) {
        if (current === null || current === undefined) {
            return undefined;
        }
        current = current[part];
    }
    return current;
}
function matchComposite(data, matcher, config) {
    if (config?.logging === "info") {
        console.info("Attempting composite match");
    }
    switch (matcher.operator) {
        case "anyOf":
            if (config?.logging === "info") {
                console.info("Checking if any matcher matches");
            }
            return matcher.matchers.some(submatcher => match(data, submatcher, config));
        case "allOf":
            if (config?.logging === "info") {
                console.info("Checking if all matchers match");
            }
            return matcher.matchers.every(submatcher => match(data, submatcher, config));
        default:
            throw new Error(`Unsupported operator for composite: ${matcher.operator}`);
    }
}
//# sourceMappingURL=index.js.map