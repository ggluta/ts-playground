### **keyof vs typeof**

Note:
> If you remember only that: 
> typeof eats values → returns a type.
> keyof eats types → returns key names.

#### **The two “worlds” in TS**

TypeScript juggles two worlds:
- Value space (runtime JS): variables, functions, objects.
- Type space (compile-time): interfaces, type aliases, unions.

- typeof (TypeScript flavor): take a value (a variable, function, object literal, class) and produce its type. 
- keyof: take a type (usually an object/record-ish type) and produce a union of its property keys.

#### **Real-life analogies**
>Think of a warehouse and its blueprint.

The warehouse (actual building with shelves) = a value.
The blueprint (what’s on paper) = a type.

__typeof__ = “Draft me a blueprint from this specific warehouse.

__keyof__ = “Give me the list of labels on shelves in this blueprint.”

__keyof typeof__ = “From this actual warehouse, first draft its blueprint, then list the shelf labels from that blueprint.”

#### **Quick decision guide**

- “I have a value and want its type.” → typeof value
- “I have a type and want its property names.” → keyof Type
- “I have a value and I want its keys.” → keyof typeof value
- “I want the union of values stored in an object.” → typeof obj[keyof typeof obj]
- “I want a function that accepts only valid keys of T.” → <K extends keyof T>(key: K) => ...
