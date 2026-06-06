# code-samples

A curated set of production code samples across React and Swift, drawn from shipped projects. Different problems, same instinct: build the general system, not the specific solution.

**Portfolio:** [billpiotrowski.com](https://billpiotrowski.com)

---

## React — iOS-Style Navigation Architecture

`/react-ios-nav`

A React application built to replicate iOS navigation conventions on the web — hierarchical menu-diving, directional segue transitions, and mobile-optimized layout — using React Router v6 and a shared outlet context pattern.

Originally built as a personal experiment, then adapted for a production XR gaming platform at Mirrorscape.

**What to look at:**
- `GameEngineRouter.tsx` — nested route architecture with parallel data fetching via `Promise.all` and loader-level error boundaries
- `GameEngineRoot.tsx` — outlet context pattern for threading shared state and services through the component tree without prop drilling
- `InfiniteScroll.tsx` — generic, fully typed `<T>` scroll component that accepts a paginated data getter, sort options, and a render function as props. Designed to be reused across any list surface.

**Core patterns:** React Router v6 loaders, TypeScript generics, dependency injection via outlet context, infinite scroll with intersection observer

---

## Swift — Generative Layout Engine

`/swift-reading-layout`

A data-driven layout engine for the Madame Endora iOS app that calculates card positions, gutter ratios, and AutoLayout constraint multipliers mathematically from a spread type definition — rather than hardcoding layouts per configuration.

Any spread configuration (single card, three card, Celtic cross, etc.) resolves automatically from the grid definition. No layout code needs to change when new spread types are added.

**What to look at:**
- `ReadingLayout.swift` — the core layout engine. Derives all `NSLayoutConstraint` multipliers and constants from a `SpreadType` and gutter dimensions
- `ReadingLayoutSimpleMathExtension.swift` — isolated pure math functions for ratio, dimension, and gutter calculations
- `GridLocation.swift` / `XYGridLocation.swift` — the data model that drives position resolution
- `ReadingLayoutConstraintExtension.swift` / `ReadingViewControllerSetSpreadPositionsExtension.swift` — how the layout feeds into UIKit constraints

**Core patterns:** Data-driven layout, pure functions, UIKit AutoLayout via code, Swift extensions for separation of concerns

---

## More

**Case studies** documenting the systems these samples came from:

- [AR Combat Sequence — Interaction Design](https://billpiotrowski.com) — the orchestration layer and bracket language built on top of the React multiplayer prototype
- [Multiplayer Game Engine — Prototype](https://billpiotrowski.com) — how the React client surfaced architecture risks before XR development began
- [Adaptive Music for TTRPGs](https://billpiotrowski.com) — TensorFlow sentiment model integrated into an iOS prototype for hands-free music sequencing