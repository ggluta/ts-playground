### **Cool for making constants stay constant**

So the readonly keyword is pretty much what it sounds like.
It’s a way to say that a property on an object can’t be changed after it’s been set. So if you have a property that’s marked as readonly, you can give it an initial value, but then TypeScript will complain if you try to reassign it later.
It’s great for making sure certain parts of your objects stay constant.

Properties can also be marked as `readonly` for TypeScript. While it won’t change any behavior at runtime, a property marked as `readonly` can’t be written to during type-checking.

```typescript
interface SomeType {
  readonly prop: string
}

function doSomething(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`)
  // But we can't re-assign it.
  obj.prop = 'hello'
}
```

Using the readonly modifier doesn’t necessarily imply that a value is totally immutable - or in other words, that its internal contents can’t be changed.
It just means the property itself can’t be re-written to.

```typescript
interface Home {
  readonly resident: { name: string; age: number }
}

function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'.
  console.log(`Happy birthday ${home.resident.name}!`)
  home.resident.age++
}

function evict(home: Home) {
  // But we can't write to the 'resident' property itself on a 'Home'.
  home.resident = {
    // Cannot assign to 'resident' because it is a read-only property.
    name: 'Victor the Evictor',
    age: 42,
  }
}
```

You can also use `readonly` in combination with `Array` to prevent the array from being modified.

```typescript
function doStuff(values: readonly string[]) {
  // We can read from and iterate over 'values'.
  console.log(`The first value is ${values[0]}`)
  for (const v of values) {
    console.log(`Here's a value: ${v}`)
  }
  // But we can't re-assign to 'values[0]' or call mutating methods
  values[0] = 'hello'
  values.push('goodbye')
}
```

### Removing `readonly`

If you have a `readonly` array or tuple, you can use a `-readonly` mapped type to create a mutable version of it.

```typescript
type Mutable<T> = { -readonly [P in keyof T]: T[P] }
function doStuff(values: Mutable<readonly string[]>) {
  values.push('hello')
}
```
