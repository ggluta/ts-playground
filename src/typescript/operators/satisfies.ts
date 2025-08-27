// Making the file a module so names won’t leak
export {}

/**
 * LEGEND:
 * ✅ Allowed
 * ❌ Error
 */

// ====================================================
/**
 *  Config objects: check shape, keep precision
 */

interface Animal {
  hasFur: boolean
  hasTail: boolean
}

const catTraits = {
  hasFur: true,
  hasTail: true,
} satisfies Animal // ✅ Allowed - traits has the same shape as Animal

const rabbitTraits = {
  hasFur: true,
  hasTail: false,
  // eatsCarrots: true, // extra property
} satisfies Animal // ❌ Error - extra property not in Animal

const dogTraits = {
  hasFur: true,
} // satisfies Animal // ❌ Error - missing property from Animal

const randomAnimal = {
  hasFur: true,
  hasTail: false,
}

randomAnimal.hasTail = true // ✅ Allowed - randomAnimal is mutable and has no type constraints

// Still mutable, but with a twist
// satisfies preserves the precise (literal) inference of the value it checks.
// rabbitTraits.hasTail = true // ❌ Error - rabbitTraits is readonly because of 'satisfies'
type CatTraits = keyof typeof catTraits // "hasFur" | "hasTail" // ✅ precise inference

// ====================================================
/**
 *  Preserving the precise (literal) inference of the value it checks. (satisfies)
 *  How to make it mutable (choose one):
 */
interface FeatureFlags {
  newCheckout: boolean
  betaSearch: boolean
}

const flags = {
  newCheckout: true,
  betaSearch: false,
} satisfies FeatureFlags // satisfies preserves the precise (literal) inference of the value it checks.

// 1. Annotate the variable (widens to booleans)
let flags1: FeatureFlags = { newCheckout: true, betaSearch: false }
flags1.newCheckout = false // ✅

// 2. Keep satisfies, then explicitly widen
const flags2 = {
  newCheckout: true,
  betaSearch: false,
} satisfies FeatureFlags as FeatureFlags // safe widen after a real check
flags2.newCheckout = false // ✅

// 3. Widen specific props
const flags3 = {
  newCheckout: true as boolean, // widen only this prop
  betaSearch: false,
} satisfies FeatureFlags
flags3.newCheckout = false // ✅

// 4. Two-stage “verified defaults + mutable copy” (nice for configs)
const DEFAULT_FLAGS = {
  newCheckout: true,
  betaSearch: false,
} as const satisfies FeatureFlags // frozen, verified source of truth

let flags4: FeatureFlags = { ...DEFAULT_FLAGS } // widened, mutable copy
flags4.newCheckout = false // ✅
