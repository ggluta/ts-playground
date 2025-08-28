### **Dissecting Equal<X, Y> — the “are these types exactly the same?” trick**

```typescript
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false
```

Better way to visualize this:

```typescript
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2)
    ? true
    : false;
```



#### What are those weird arrow types?

<T>() => ... is a generic function type. Think of it as a machine you can feed any type T, and it will spit out some result type.

Inside, we return either 1 or 2 (numeric literal types; they’re just two distinct markers) based on a test:
```typescript
T extends X ? 1 : 2
```

So the whole thing
```typescript
<T>() => T extends X ? 1 : 2
```
is a type-membership tester for X:
- If the input type T is assignable to X, the machine returns 1.
- Otherwise it returns 2.

Do the same for Y and you get a second tester.


#### Why compare the two function types with extends?

Now we ask:
```typescript
(<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
```
When TypeScript checks if one generic function type is assignable to another, it essentially asks:

> For every possible T, is the left function’s return type assignable to the right function’s return type (for the same T)?

Because our return types are only 1 or 2 and those don’t mix (1 is not assignable to 2, and 2 is not assignable to 1), the only way the left function is assignable to the right is if they never disagree for any T.
- If there exists some T where T extends X but not T extends Y, the left returns 1 while the right returns 2 — mismatch → not assignable.
- If there exists some T where T extends Y but not T extends X, then left returns 2 while right returns 1 — mismatch → not assignable.

So the check passes only if the sets of T that satisfy T extends X and T extends Y are identical. That is precisely type equality (under TypeScript’s notion of assignability).

Finally, the ternary yields true if they match for all T, else false.

> Intuition: each function is a “membership oracle” for X or Y. If two oracles give the same yes/no answer for every possible type, then X and Y are the same set of types.

#### Why not a simpler X extends Y ? (Y extends X ? true : false) : false?

That simpler “mutual assignability” test often works, but it can be tripped up by distribution over unions and some variance edge-cases. Wrapping the test inside generic function types forces a for-all-T comparison that’s more robust: you’re comparing the behavior of two predicates across the whole type universe, not just X and Y directly.

#### Examples

```typescript
type T0 = Equal<1, 1>;                      // true
type T1 = Equal<1, number>;                 // false
type T2 = Equal<'a' | 'b', 'b' | 'a'>;      // true (order doesn’t matter)
type T3 = Equal<{ a: 1 }, { a: 1 }>;        // true
type T4 = Equal<{ a: 1 }, { a: number }>;   // false

// Optional vs possibly-undefined (not the same!):
type T5 = Equal<{ x?: number }, { x: number | undefined }>; // false

// never behaves like “empty set”
type T6 = Equal<never, never>;              // true
type T7 = Equal<never, number>;             // false

// Caveat zone:
type T8  = Equal<any, any>;                 // true
type T9  = Equal<unknown, unknown>;         // true
type T10 = Equal<any, unknown>;             // true  ❗ (see caveats below)
```

#### Important caveats (aka: the type system’s gremlins)
- any vs unknown: With this particular trick, Equal<any, unknown> evaluates to true. Both “membership oracles” always return 1 for every T (T extends any and T extends unknown are both effectively always true), so they look identical. If you need to distinguish any from unknown, you must add an extra guard (people often pair this with a separate IsAny<T> helper).
- never: Substituting T = never into a conditional yields never (because it distributes over unions and never is the empty union). That’s fine here; it doesn’t break the equality trick.
- This isn’t “semantic” equality. It’s equality under TypeScript’s assignability rules (structural typing, variance rules, etc.). Two types that are logically equivalent in some human sense might not be considered equal by the compiler if their structures differ in a way that changes assignability (e.g., optional properties vs. explicit | undefined).

#### A tiny mental model you can reuse
- Build a “membership tester” for X: TestX(T) = 1 if T ⊆ X else 2.
- Build one for Y: TestY(T) = 1 if T ⊆ Y else 2.
- Compare the two testers as functions. If they’re assignable, they never disagree; thus X and Y include exactly the same Ts → equal.

If you like analogies: imagine two bouncers at two club doors (for X and Y). Each bouncer stamps your hand with “1” if you’re allowed in and “2” if not. If for every patron in the city the stamps always match, the guest lists are identical. Same club, different signs.

#### Bonus: common supporting helpers

If you need to treat any specially:
```typescript
type IsAny<T> = 0 extends (1 & T) ? true : false;

type EqualStrict<X, Y> =
  IsAny<X> extends true ? IsAny<Y> :
  IsAny<Y> extends true ? false :
  Equal<X, Y>;
```

That keeps the nice behavior of Equal but makes any vs. unknown come out as false.
