swift-reading-layout

A data-driven layout engine for the Madame Endora iOS app — sizes and
positions tarot card spreads on AutoLayout with no fixed dimensions to
design against. Device size, orientation, and spread type all varied, and
each spread needed its cards as large as possible within whatever space
remained, so ReadingLayout derives every position and dimension
mathematically from a spread's grid definition rather than from fixed
values. Adding a new spread means defining its grid — no layout code
changes.

ReadingLayout.swift is the engine. ReadingLayoutSimpleMathExtension.swift
isolates the math as small, pure functions. GridLocation.swift /
XYGridLocation.swift are the grid-position data model.
ReadingLayoutConstraintExtension.swift and
ReadingViewControllerSetSpreadPositionsExtension.swift apply it as real
NSLayoutConstraints.

Built for Madame Endora's Fortune Cards,
shipped to the App Store.