# code-samples

Production code samples across React and Swift, drawn from shipped projects. 
Different problems, same instinct: build the general system, not the specific 
solution.

**Portfolio:** [billpiotrowski.com](https://billpiotrowski.com)

---

## react-ios-nav

A React implementation of iOS-style hierarchical navigation — split-view layout, 
directional push/pop transitions, and a responsive mobile menu — built with React 
Router v6 and Framer Motion. Originally developed to prototype iOS navigation 
conventions in the browser, later refined across other projects, including a 
production XR gaming platform at Mirrorscape.

The interesting part: `SplitNavSection` computes a navigation direction for every 
route change, so transitions animate the way iOS does — push forward, pop back — 
across both a desktop split-view and a collapsed mobile menu driven by the same 
route tree. `InfiniteScroll<T>` is a generic, fully typed paginated list component.

[Full README →](./react-ios-nav)

---

## swift-reading-layout

A data-driven layout engine for an iOS tarot app. `ReadingLayout` derives every 
card position, gutter ratio, and AutoLayout constraint mathematically from a 
spread definition, rather than hardcoding layouts per configuration — any new 
spread resolves automatically from its grid definition.

[Full README →](./swift-reading-layout)

---

## Case studies

The systems these samples came from, in production context:

- [AR Combat Sequence — Interaction Design](https://billpiotrowski.com)
- [Multiplayer Game Engine — Prototype](https://billpiotrowski.com)
- [Adaptive Music for TTRPGs](https://billpiotrowski.com)