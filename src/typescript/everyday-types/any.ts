// Making the file a module so names won’t leak
export {}

/**
 * LEGEND:
 * ✅ Allowed
 * ❌ Error
 */

let value: any = 'hello'

value.trim() // ✅ allowed
value() // ✅ allowed, even if it's not a function
let num: number = value // ✅ allowed, no checks
