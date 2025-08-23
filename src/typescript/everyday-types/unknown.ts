// Making the file a module so names won’t leak
export {}

/**
 * LEGEND:
 * ✅ Allowed
 * ❌ Error
 */
let value: unknown = 'hello'

// value.trim(); // ❌ Error: Object is of type 'unknown'
// value(); // ❌ Error
// let num: number = value; // ❌ Error

if (typeof value === 'string') {
  value.trim() // ✅ OK now
}
