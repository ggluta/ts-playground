// Making the file a module so names won’t leak
export {}

/**
 * LEGEND:
 * ✅ Allowed
 * ❌ Error
 */

// ====================================================
/**
 *  Build a union from an object
 */

const modes = { prod: 'prod', dev: 'dev' } // prod/dev are inferred as string
const modes2 = { prod: 'prod', dev: 'dev' } as const // prod/dev are now inferred as actual literals
type Mode = (typeof modes)[keyof typeof modes] // string
type Mode2 = (typeof modes2)[keyof typeof modes2] // "prod" | "dev"

modes.prod = 'ala' // ✅ Allowed
// modes2.prod = 'ala' // ❌ Error - object properties are readonly with 'as const'

const statuses = ['idle', 'loading', 'done'] as const
type Status = (typeof statuses)[number] // "idle" | "loading" | "done"
