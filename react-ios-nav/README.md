# React iOS Nav

A React implementation of iOS-style hierarchical navigation. Originally developed to prototype iOS navigation conventions on the web, later refined across other projects. Adapted here as a standalone demo with an artist catalog as illustrative data.

## Features
- **split-view layout**
- **directional push/pop transitions** - computes a direction — left, right, or lateral — for every route change 
- **generic infinate scroll** - typed component that takes a paginated getter and a render function
- **a responsive mobile menu** - same route tree drives both the desktop split-view and the collapsed mobile menu

## Tech Stack
- React
- React Router
- Framer Motion

![Navigation demo](./demo.gif)

## Running locally
`npm install` 
`npm run dev`