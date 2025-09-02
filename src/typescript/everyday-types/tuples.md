### **Tuple**

Tuple types allow you to express an array with a fixed number of elements whose types are known, but need not be the same. 
For example, you may want to represent a value as a pair of a string and a number:

```typescript
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
```
> Type 'number' is not assignable to type 'string'.
Type 'string' is not assignable to type 'number'.

```typescript
type Tuple = [number, string]
const goodTuple: Tuple = [1, 'tuple'] // tuple type
// const badTuple: Tuple = ['tuple', 1] // ❌ Error: Type 'string' is not assignable to type 'number'
const anotherGoodTuple: [number, number] = [2, 2] // inline tuple type
// const anotherBadTuple: [number, number] = [2, 2, 2] // ❌ Error: Source has 3 element(s) but target allows only 2
```

You can also give tuples more clarity by using named elements:

```typescript
type NamedTuple = [id: number, name: string]
const namedTuple: NamedTuple = [1, 'named tuple']
```

This will make it easier to understand what each element represents when you hover over the type in an editor.

```typescript
const coordinates: [x: number, y: number] = [234, 35] // names are only in editor, not in runtime
function distanceFromOrigin([x, y]: [x: number, y: number]) : number {
  return Math.sqrt(x ** 2 + y ** 2)
}
distanceFromOrigin(coordinates) // 236.73801661003113
```

Tuples can also be used with functions to represent a fixed set of parameters or return values:

```typescript
function getUserInfo(): [number, string] {
  return [1, "Alice"];
}
```

You can also have optional elements in tuples:

```typescript
let y: [string, number?];
y = ["hello"]; // OK
y = ["hello", 10]; // OK
y = ["hello", 10, 20]; // ❌ Error
```

You can also have rest elements in tuples:

```typescript
let z: [string, ...number[]];
z = ["hello"]; // OK
z = ["hello", 10, 20, 30]; // OK
z = [10, "hello"]; // ❌ Error
```
