### **“Safe version of any”**

- **Restrictive**: You can’t use the value without first narrowing it (e.g., with typeof, type guards, or type assertions).
- **Type-safe**: Prevents you from performing unsafe operations without checks.
- **Use case**: When accepting values from dynamic sources (e.g. JSON input, user input) but still want to enforce type safety before using them.

```typescript
let value: unknown = 'hello'

value.trim() // ❌ Error: Object is of type 'unknown'
value() // ❌ Error
let num: number = value // ❌ Error

if (typeof value === 'string') {
  value.trim() // ✅ OK now
}
```

| **Feature**            | unknown                                |
| ---------------------- | -------------------------------------- |
| Accepts any value      | ✅ Yes                                 |
| Safe to use            | ✅ Yes                                 |
| Type-checked           | ✅ Yes (requires narrowing)            |
| Assignable to anything | ❌ No (requires check)                 |
| Use when               | You want flexibility but retain safety |
