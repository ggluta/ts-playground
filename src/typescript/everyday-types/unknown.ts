// Making the file a module so names won’t leak
export {}

/**
 * LEGEND:
 * ✅ Allowed
 * ❌ Error
 */
let value: unknown = 'hello'

// @ts-expect-error
value.trim() // ❌ Error: Object is of type 'unknown'
// @ts-expect-error
value() // ❌ Error
// @ts-expect-error
let num: number = value // ❌ Error

if (typeof value === 'string') {
  value.trim() // ✅ OK now
}
