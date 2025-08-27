### **satisfies**

#### **as const vs satisfies: cousins, not twins**

__as const__ freezes the shape and narrows to literals. 

__satisfies__ checks a value against a type while preserving precise inference but doesn’t make it readonly.

satisfies = “quality control without handcuffs.” It checks a value against a type without changing the value’s own inferred type (so you keep precise inference and mutability).

#### The core idea in one sentence
__satisfies__: “Make sure this value matches that type, but don’t change how you infer it.”


>Remember:
> 
> use satisfies when you want exact inference + type checking without locking it down; 
> 
> use as const when you want both exact inference and immutability.

```typescript
interface FeatureFlags {
  newCheckout: boolean;
  betaSearch: boolean;
}

const flags = {
  newCheckout: true,
  betaSearch: false,
} satisfies FeatureFlags;
```

satisfies checks the shape, and (crucially) it prevents the usual widening of true/false → boolean for object-literal initializers. So later:

```typescript
flags.newCheckout = false; // ❌ Type 'false' is not assignable to type 'true'
```

This is by design: satisfies preserves the precise (literal) inference of the value it checks.
