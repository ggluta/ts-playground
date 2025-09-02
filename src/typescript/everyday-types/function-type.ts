// Making the file a module so names won’t leak
export {}

/**
 * LEGEND:
 * ✅ Allowed
 * ❌ Error
 */

// ====================================================
/**
 * Function types
 */
type GreetFunction = (name: string) => string
const greet: GreetFunction = (name) => `Hello, ${name}` // ✅ Allowed
// @ts-expect-error
const greet2: GreetFunction = (name, age) => `Hello, ${name}` // ❌ Error: Too many parameters
// @ts-expect-error
const greet3: GreetFunction = (name) => 42 // ❌ Error: Return type should be string
greet('Alice') // ✅ Allowed
// @ts-expect-error
greet(42) // ❌ Error: Argument should be string
// @ts-expect-error
greet() // ❌ Error: Argument is required
console.log(greet('Alice'))

// ====================================================
/**
 * Optional and default parameters
 */
type LogFunction = (message: string, userId?: string) => void
const log: LogFunction = (message, userId) => {
  const time = new Date().toISOString()
  console.log(time, message, userId || 'Not signed in')
}
log('User logged in', 'user-123') // ✅ Allowed
log('User logged out') // ✅ Allowed
// @ts-expect-error
log() // ❌ Error: Argument is required
// @ts-expect-error
log(42) // ❌ Error: Argument should be string
// @ts-expect-error
log('Message', 42) // ❌ Error: userId should be string if provided

// ====================================================
/**
 * Rest parameters
 */
type SumFunction = (...numbers: number[]) => number
const sum: SumFunction = (...numbers) => numbers.reduce((total, n) => total + n, 0)
sum(1, 2, 3) // ✅ Allowed
sum(10, 20, 30, 40, 50) // ✅ Allowed
sum() // ✅ Allowed, returns 0
// @ts-expect-error
sum(1, '2', 3) // ❌ Error: All arguments should be numbers
