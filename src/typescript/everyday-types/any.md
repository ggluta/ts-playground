### **“Opt-out” of Type Checking**

- **Permissive**: You can do anything with an any value — assign it to any type, call any method, access any property.
- **No Safety**: You lose all type checking. TypeScript won’t catch errors if you’re misusing the value.
- **Use case**: When you’re integrating with code you don’t control (e.g., third-party libraries) and need to quickly bypass type checks.

```typescript
let value: any = 'hello'

value.trim() // ✅ allowed
value() // ✅ allowed, even if it's not a function
let num: number = value // ✅ allowed, no checks
```

| **Feature**            | any                            |
| ---------------------- | ------------------------------ |
| Accepts any value      | ✅ Yes                         |
| Safe to use            | ❌ No                          |
| Type-checked           | ❌ No                          |
| Assignable to anything | ✅ Yes                         |
| Use when               | You need to escape type system |
