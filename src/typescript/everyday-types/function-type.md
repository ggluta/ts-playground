### **Function type**

A function type in TypeScript defines the types of parameters a function can take and the type of value it returns. This is useful for ensuring that functions are used correctly and consistently throughout your code.
```typescript
// Function type with two parameters: a string and a number, returning a boolean
type MyFunctionType = (arg1: string, arg2: number) => boolean;
// Function that matches the MyFunctionType
const myFunction: MyFunctionType = (name, age) => {
  return age > 18;
};
// Using the function
const isAdult = myFunction("Alice", 22); // true
```
You can also define function types using interfaces:
```typescript
interface MyFunctionInterface {
  (arg1: string, arg2: number): boolean;
}
const anotherFunction: MyFunctionInterface = (name, age) => {
  return age > 18;
};
const isAdult2 = anotherFunction("Bob", 16); // false
```
Function types can also include optional parameters and rest parameters:
```typescript
type OptionalRestFunction = (arg1: string, arg2?: number, ...rest: boolean[]) => void;
const optionalRestFunction: OptionalRestFunction = (name, age, ...flags) => {
  console.log(`Name: ${name}, Age: ${age}, Flags: ${flags}`);
};
optionalRestFunction("Charlie"); // Name: Charlie, Age: undefined, Flags: []
optionalRestFunction("Dave", 30, true, false); // Name: Dave, Age: 30, Flags: [true, false]
```
Function types are a powerful way to enforce the structure of functions in your TypeScript code, helping to catch errors early and improve code readability.

