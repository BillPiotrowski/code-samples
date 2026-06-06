# react-ios-nav

A React implementation of iOS-style hierarchical navigation — menu-diving, directional segue transitions, and mobile-optimized layout — built with React Router v6.

Originally extracted from a production WordPress + React integration, adapted here as a standalone demo using a Dürer woodcut catalog as illustrative content. The point is the navigation architecture, not the data.

## What it demonstrates

**Hierarchical routing** — nested React Router v6 routes that mirror iOS's push/pop navigation model. Each level of the hierarchy is a discrete route, navigable forward and back with consistent directional transitions.

**Outlet context as dependency injection** — shared state, services, and navigation callbacks are threaded through the component tree via React Router's outlet context rather than prop drilling or a global store.

**Generic infinite scroll** — `InfiniteScroll.tsx` is a fully typed generic component (`<T>`) that accepts a paginated data getter, sort options, and a render function as props. It handles pagination state, intersection observation, and loading/error states internally, and can be dropped into any list surface without modification.

**Mobile-first layout** — the shell replicates iOS navigation conventions: a persistent header with back navigation, title reflecting current depth, and content that transitions directionally as the user moves through the hierarchy.

## Running locally

```bash
npm install
npm start
```

## Structure

```
src/
  GameEngine.tsx              # Entry point — initializes services and mounts the router
  GameEngineRouter.tsx        # Route definitions, nested hierarchy, loader functions
  GameEngineRoot.tsx          # Shell layout, outlet context, loading state
  GameEngineIndex.tsx         # Root index view
  PlayerCharacter/
    PlayerCharactersList.tsx  # List view — consumes InfiniteScroll
    PlayerCharacters.tsx      # Section root — manages section-level context
  AppMock/
    Components/
      InfiniteScroll/
        InfiniteScroll.tsx    # Generic paginated list component
```

## Related

This navigation shell was built alongside a real-time multiplayer game server. The case study documenting what it surfaced and why it mattered is here: [Multiplayer Game Engine — Prototype](https://billpiotrowski.com)