import { Matcher } from "./matchers";
export * from "./matchers";
export * from "./operators";
export type Configuration = {
    strict?: boolean;
    logging?: false | "info" | "trace";
};
export declare function match(data: any, matcher: Matcher, config?: Configuration): boolean;
//# sourceMappingURL=index.d.ts.map