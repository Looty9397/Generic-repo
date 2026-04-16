# Pathfinding Visualizer Specification

## Overview

A web app that generates a colored graph displaying the fastest route from the start square to the end square found by a selected pathfinding algorithm. It is highly customizable, allowing users to control graph dimensions, starting and ending positions, and any obstacles in the way.

## UI Description

**Graph**: The largest part of the page. Composed of differently colored square cells in a grid. Displays the results of the algorithm according to the user’s specifications.

**Configuration box**: Directly below the graph. Contains all the options readily available for users to edit. Changes made here, if applicable, will update the graph in real time.

## Classes

**Cell**
- A single cell on the grid.
- Attributes and methods
  - **state**: The current state of the cell (i.e. visited, wall, path, goal, etc). Determines the color of the cell.
  - **neighbors**: An Array of Cells, displaying neighbors. Organized in order of Left Right Up Down for consistency.
  - **element**: The element for the actual cell itself.
  - **parent**: The parent cell for this cell
  - **setState**(state): Changes this.state to state, provided state is valid.
  - **refresh**(): Updates this.element with any new states. Determines cell color.
  - **transform**(): Becomes a wall / normal cell. Toggles between both states and calls this.refresh() once complete.

**Queue**
- A queue object, can only be modified by appending to the back and taking from the front.
- Attributes and methods
  - **items**: The actual data.
  - **insert**(): append an item to the this.items
  - **extract**(): Take an item from this.items

## Justification of design

Potential issues are isolated through the Cell class and its methods / attributes. Cell.state can be checked when needed to determine if a cell is visited (no need for a separate list) or a wall.

Abstract complexity is supported with Cell.setState(), Cell.transform(), etc. Developers / users do not need to directly modify the state (could be dangerous), so instead they can use the simpler and safer alternative of setState(). Having Cell.element be a part of the class and not a separate object permits easier and more accurate referencing of the cell.

The design supports the simple addition of new features through Cell.refresh() and more. If a new state were to be added, you would only need to modify two methods to add it - setState to make it usable and refresh to give it a color.

## Limitations and compromises

Not everything can be a class, and in this case adding subclasses for Cell would be unnecessary. The graph will be a table in HTML and the cells stored in an Array in the JS. The pathfinding algorithms will be functions as a whole new class Algorithm would be bad design.

None of the user experience has been sacrificed to ease the modification of the backend. No needless inputs are added and no bloated attributes exist.

As far as I can tell right now, I did not choose a less efficient approach to make the code easier for others. In general, there is no way to know as the code has not yet been written.