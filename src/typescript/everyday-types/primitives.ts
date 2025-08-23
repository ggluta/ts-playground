// Making the file a module so names won’t leak
export {};

/**
 * LEGEND:
 * ✅ Allowed
 * ❌ Error
 */

/**
 * This file contains examples of primitive types in TypeScript.
 */
const a: number = 42;
const b: string = "Hello, World!";
const c: boolean = true;
const d: bigint = BigInt(9007199254740991);
const e: symbol = Symbol("unique");
const f: null = null;
const g: undefined = undefined;
const h: void = undefined; // void is often used in function return types
const i: any = "This can be anything"; // any type can hold any value, but it's not recommended to use it
const j: object = {
  key: "value",
  anotherKey: 123,
  nestedObject: {
    innerKey: true
  }
}
// The `unknown` type is similar to `any`, but safer because it requires type checking before use
const k: unknown = "This could be anything, but you need to check its type before using it";


function fn(param: string): void {
  console.log(`Parameter is: ${param}`);
}
fn(b);





