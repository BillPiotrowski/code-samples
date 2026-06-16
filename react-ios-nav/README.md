# react-ios-nav

A React implementation of iOS-style hierarchical navigation — split-view layout, directional segue transitions, and a responsive mobile menu — built with React Router v6 and Framer Motion.

Originally extracted from a production WordPress + React integration, adapted here as a standalone demo using an artist catalog as illustrative data. The point is the navigation architecture, not the data.

## What it demonstrates

**Split-view navigation shell** — `SplitNav` renders a persistent sidebar menu alongside a content area. The sidebar is defined by a `NavListGroup[]` config and renders grouped `NavLink` items. The title bar updates automatically as the user moves through the hierarchy.

**Responsive single-column layout** — below 800px the layout collapses to a single column. The sidebar becomes a slide-in mobile menu, navigated with a back button in the title bar. No separate mobile routes — the same route tree drives both layouts.

**Directional segue transitions** — `SplitNavSection` tracks navigation history and computes a direction (`left`, `right`, or `lateral`) for each route change. `SplitNavView` uses this to animate content in and out with Framer Motion, replicating iOS push/pop transitions. Cross-section navigations are always lateral.

**Outlet context as dependency injection** — shared state, services, and callbacks are threaded down the route tree via React Router's outlet context rather than prop drilling or a global store. Each section root extends the parent context and passes it to its children via `SplitNavSection`.

**Generic infinite scroll** — `InfiniteScroll<T>` accepts a paginated data getter, sort options, and a render function as props. It handles page state, intersection observation via `useLastElementRef`, and loading/error states internally. Fully typed — drop it into any list surface without modification.

**Splash screen segue** — on load, a splash screen fades out before the app mounts. `SplashScreenSegue` wraps content in a Framer Motion `AnimatePresence` transition that fades on exit but not on enter.

## Running locally

```bash
npm install
npm run dev
```

## Structure

```
src/
  App.tsx                          # Entry point — splash screen, API init, router mount
  AppRoot.tsx                      # Shell layout, modal layer, outlet context
  AppRouter.tsx                    # Route definitions and nested hierarchy
  Component/
    SplitNav/
      SplitNav.tsx                 # Layout shell — title bar, sidebar, content area
      SplitNavMenu.tsx             # Sidebar nav — grouped NavLink list
      SplitNavSection.tsx          # Section root — AnimatePresence + segue direction
      SplitNavView.tsx             # Animated content wrapper — push/pop transitions
      PathParser.ts                # Segue direction logic
      Context/                     # SplitNav context, NavPath context, Segue context
    InfiniteScroll/
      InfiniteScroll.tsx           # Generic paginated list component
      SortOptions.tsx              # Sort control UI
  Hook/
    useInfiniteScroll.ts           # Pagination + fetch state
    useLastElementRef.ts           # IntersectionObserver for page advancement
  Page/
    Artists/
      ArtistsRoot.tsx              # Section root — manages selected artist state
      ArtistsList.tsx              # List view — consumes InfiniteScroll
      ArtistLoader.tsx             # Loads artist by route param, passes to outlet
      ArtistView.tsx               # Detail view
  Segue/
    SplashScreenSegue.tsx          # Fade-out transition wrapper
  API.ts                           # Mock API with simulated latency and response cache
```
