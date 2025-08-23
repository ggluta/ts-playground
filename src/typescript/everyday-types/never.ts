// Making the file a module so names won’t leak
export {}

/**
 * LEGEND:
 * ✅ Allowed
 * ❌ Error
 */

// never type is used for functions that never return
function throwError(message: string): never {
  throw new Error(message)
}

function infiniteLoop(): never {
  while (true) {
    // do something forever
  }
}

enum Flower {
  Rose,
  Rhododendron,
  Violet,
  Daisy,
  // if you add more flowers, you need to handle them here
  // in the exhaustive check below
  Tulip,
}

// exhaustive checking with a discriminated union or enum
const flowerLatinName: (flower: Flower) => void = (flower) => {
  switch (flower) {
    case Flower.Rose:
      return 'Rosa rubiginosa'
    case Flower.Rhododendron:
      return 'Rhododendron ferrugineum'
    case Flower.Violet:
      return 'Viola reichenbachiana'
    case Flower.Daisy:
      return 'Bellis perennis'
    case Flower.Tulip: // if you comment this line, the exhaustive check will fail
      return 'Tulipa gesneriana'

    // you’re basically telling TypeScript, “Hey, if we ever get here, something has gone wrong
    // because we should have handled all the cases above.”
    default:
      const _exhaustiveCheck: never = flower
      return _exhaustiveCheck
  }
}
