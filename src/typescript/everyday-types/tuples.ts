// Making the file a module so names won’t leak
export {}

/**
 * LEGEND:
 * ✅ Allowed
 * ❌ Error
 */

// ====================================================
/**
 *  Tuples basics
 */

type Tuple = [number, string]
const goodTuple: Tuple = [1, 'tuple'] // tuple type
// @ts-expect-error
const badTuple: Tuple = ['tuple', 1] // ❌ Error: Type 'string' is not assignable to type 'number'
const anotherGoodTuple: [number, number] = [2, 2] // inline tuple type
// @ts-expect-error
const anotherBadTuple: [number, number] = [2, 2, 2] // ❌ Error: Source has 3 element(s) but target allows only 2

// ====================================================
/**
 *  Tuples with optional and rest elements
 */
const optionalTuple: [number, string?] = [1] // second element is optional
const restTuple: [number, ...string[]] = [1, 'a', 'b'] // rest element must be last
// @ts-expect-error
const badRestTuple: [number, ...string[]] = ['a', 'b', 1] // ❌ Error: Type 'string' is not assignable to type 'number'
const anotherRestTuple: [...string[], boolean] = ['a', 'b', true] // rest element can be first
// @ts-expect-error
const badAnotherRestTuple: [...string[], boolean] = ['a', 'b', 1] // ❌ Error: Type 'number' is not assignable to type 'boolean'

// ====================================================
/**
 *  Tuples with named elements
 */
const coordinates: [x: number, y: number] = [234, 35] // names are only in editor, not in runtime
function distanceFromOrigin([x, y]: [x: number, y: number]): number {
  return Math.sqrt(x ** 2 + y ** 2)
}
distanceFromOrigin(coordinates) // 236.73801661003113
