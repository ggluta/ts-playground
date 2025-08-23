
### **Some code that should "never" run**

The never type in TypeScript represents values that **never occur**. It’s used to indicate:

1. **A function that never returns** (e.g. throws an error or loops forever)
    
2. **Exhaustive checks** (e.g. when you’ve handled all possible cases in a union)

It’s the _bottom type_ — assignable to **every** type, but **no type** is assignable to never (except never itself).

The idea is that using never is really about helping TypeScript understand that a certain path is truly impossible. It’s almost like giving a hint to the type checker that, “Hey, this function is never going to return a value, so if you see code after it expecting a value, that’s probably a bug.”

#### Functions that never return

If a function throws or never finishes, its return type is never:
```typescript
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // do something forever
  }
}
```

Why never here?

Because the function never reaches the end (no return), TypeScript knows it has no possible return value — so the return type is never.

#### Exhaustiveness checking

When handling discriminated unions, never helps ensure all cases are covered.

```typescript
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.size * shape.size;
    default:
      // shape is of type `never` here if all cases are handled
      // you’re basically telling TypeScript, “Hey, if we ever get 
      // here, something has gone wrong because we should have handled all the cases above.”
      const _exhaustiveCheck: never = shape;
      throw new Error("Unhandled shape kind");
  }
}
```

Why never here?

If someone adds a new shape (e.g., { kind: "triangle" }) but forgets to handle it, TypeScript will show an error at the never line.
