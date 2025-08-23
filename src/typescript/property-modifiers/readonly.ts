// Making the file a module so names won’t leak
export {};

/**
 * LEGEND:
 * ✅ Allowed
 * ❌ Error
  */


interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`); // ✅ Allowed

  // But we can't re-assign it.
  // obj.prop = "hello"; // ❌ Error: Cannot assign to 'prop' because it is a read-only property
}

interface Home {
  readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'.
  console.log(`Happy birthday ${home.resident.name}!`);
  home.resident.age++;
}

function evict(home: Home) {
  // But we can't write to the 'resident' property itself on a 'Home'.

  // ❌ Error - cannot reassign a readonly property
  // home.resident = {
  //   // Cannot assign to 'resident' because it is a read-only property.
  //   name: "Victor the Evictor",
  //   age: 42,
  // };
}

function doStuff(values: readonly string[]) {
  // We can read from and iterate over 'values'.
  console.log(`The first value is ${values[0]}`);
  for (const v of values) {
    console.log(`Here's a value: ${v}`);
  }
  // But we can't re-assign to 'values[0]' or call mutating methods
  // values[0] = "hello"; // ❌ Error: Index signature in type 'readonly string[]' only permits reading
  // values.push("goodbye"); // ❌ Error: Property 'push' does not exist on type 'readonly string[]'
}

type Person = {
  readonly name: string;
  readonly age: number;
  hometown: string;
}

// Make all properties in T mutable
type Mutable<T> = {
  -readonly[P in keyof T]: T[P];
}

type MutablePerson = Mutable<Person>;

// Or if we want to create a mutable version of an existing type without introducing a reusable generic

type MutablePerson2 = {
  -readonly [K in keyof Person]: Person[K]
}

let person1: MutablePerson = {
  name: "Alice",
  age: 30,
  hometown: "Wonderland"
};

let person2: MutablePerson2 = {
  name: "Alice",
  age: 30,
  hometown: "Wonderland"
};

person1.name = "Bob"; // ❌ Error
person2.name = "Bob"; // ❌ Error

type IsMutable<T, K extends keyof T> =
  { [P in K]: T[P] } extends { -readonly [P in K]: T[P] } ? true : false;

type _PersonNameMutable = IsMutable<MutablePerson, "name">;   // should be true
type _Person2NameMutable = IsMutable<MutablePerson2, "name">; // should be true

const seed = {
  name: "Alice",
  age: 30,
  hometown: "Wonderland",
} as const;

let p: MutablePerson = { ...seed }; // spread drops readonly
p.name = "Bob"; // ✅
