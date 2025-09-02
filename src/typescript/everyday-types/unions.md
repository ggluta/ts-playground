### **Union**

Union types allow you to express an array with a fixed number of elements whose types are known, but need not be the same.
For example, you may want to represent a value as a pair of a string and a number:

```
                    ┌────────────┐
                    │  string    │   <- Base type in TypeScript / wider type
                    └────┬───────┘
                         │
                         ▼
         ┌────────────────────────────────────┐
         │  'up' | 'down' | 'left' | 'right'  │   <- Union of string literals (narrower type)
         └────┬────────┬───────┬───────┬──────┘
              │        │       │       │
              ▼        ▼       ▼       ▼
           ┌────┐   ┌──────┐ ┌──────┐ ┌───────┐
           │'up'│   │'down'│ │'left'│ │'right'│  <- Literal string values (only these exact values allowed)
           └────┘   └──────┘ └──────┘ └───────┘
```

A union type is a type formed from two or more other types, representing values that may be any one of those types. We refer to each of these types as the union’s members.

```typescript
type Direction = "up" | "down" | "left" | "right";

function move(direction: Direction, distance: number) {}

```
