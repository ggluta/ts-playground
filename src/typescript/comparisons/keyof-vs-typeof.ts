// Making the file a module so names won’t leak
export {}

/**
 * LEGEND:
 * ✅ Allowed
 * ❌ Error
 */

// ====================================================
/**
 * Get a type from a value with typeof
 */

const user = { id: 1, name: 'Ada' }

// value -> type
type User = typeof user
// { id: number; name: string }
type UserKeys = keyof User
// "id" | "name"

const config = {
  retries: 3,
  timeoutMs: 1000,
  mode: 'prod' as 'prod' | 'dev',
}

type Config = typeof config
// { retries: number; timeoutMs: number; mode: "prod" | "dev" }

// ====================================================
/**
 * Get valid property names with keyof
 */

type Person = { id: string; name: string; active: boolean }
type PersonKeys = keyof Person // "id" | "name" | "active"

// ====================================================
/**
 * You’ve got an object value and you want the union of its keys (without hardcoding strings):
 */

const statuses = {
  draft: 0,
  published: 1,
  archived: 2,
} as const

type StatusKey = keyof typeof statuses // "draft" | "published" | "archived"

// Now you can write safe APIs
function isStatus(k: string): k is StatusKey {
  return k in statuses
}

// ====================================================
/**
 *  Index into values safely: T[K] with K extends keyof T
 */

function get<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key]
}

const book = { title: 'Dune', pages: 412 }
const property = get(book, 'pages') // p: number; safe & inferred

// ====================================================
/**
 *  Get value unions from objects: typeof obj[keyof typeof obj]
 */

const roles = { admin: 1, editor: 2, viewer: 3 } as const
const roles2 = { admin: 1, editor: 2, viewer: 3 }

type RoleTypes = typeof roles // {readonly admin: 1, readonly editor: 2, readonly viewer: 3}
type RoleTypes2 = typeof roles2 // {admin: number, editor: number, viewer: number}
type RoleName = keyof typeof roles // "admin" | "editor" | "viewer"
type RoleCode = (typeof roles)[RoleName]
type RoleCode2 = (typeof roles)[keyof typeof roles]

// ====================================================
/**
 *  Enums: names vs values
 */

enum Direction {
  Up = 'UP',
  Down = 'DOWN',
}

// Keys (names) are a keyof-of-type-of thing:
type DirectionName = keyof typeof Direction // "Up" | "Down"

// Values are the enum’s union:
type DirectionValues = (typeof Direction)[keyof typeof Direction] // "UP" | "DOWN"
// or shorter
type DirectionValues2 = `${Direction}` // "UP" | "DOWN"

// ====================================================
/**
 *  typeof in functions and classes
 */

function fn(n: number): string {
  return `id-${n}`
}
type FnType = typeof fn // (n: number) => string

class Cls {
  find() {
    return 'some function'
  }
}

type ClsType = typeof Cls // Cls (constructor type)
type ClsInstance = InstanceType<typeof Cls>

// ====================================================
/**
 *  typeof / keyof - arrays and tuples
 */

const nums = [1, 2, 3] as const
type numsType = typeof nums
type Index = keyof typeof nums // "0" | "1" | "2" | "length" | number | ...
type Elem = (typeof nums)[number] // 1 | 2 | 3
