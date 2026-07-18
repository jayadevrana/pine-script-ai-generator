# Pine Script v6 Knowledge Map

This document acts as the core curriculum for a Pine Script v6 coding system. It focuses on the official TradingView model of execution, typing, data structures, strategy semantics, visuals, anti-repaint practices, and code organization.

## 1. Execution Model

### What it is

Pine executes code bar-by-bar in chronological order. On each bar it runs top-level statements, user functions, and built-ins. Series variables accumulate bar history, while non-series values represent the current value only.

### Why it matters

Execution order affects:

- state persistence
- history indexing
- request behavior
- differences between historical and realtime processing

### Common mistakes

- Using loop variables inside `request.security()` calls or series offsets.
- Expecting non-`var` variables to persist across bars.
- Assuming higher-timeframe values refresh on every lower-timeframe bar regardless of `gaps`.

### Advanced usage

- Combine `calc_on_every_tick` with `barstate.isrealtime`.
- Use arrays or matrices to maintain custom state across bars.

### Model learning goals

- Understand sequential bar execution.
- Know that series values retain history automatically.
- Use `var` and `varip` correctly.
- Avoid future-data leakage.

## 2. Type System

### What it is

Pine includes:

- primitive types: `int`, `float`, `bool`, `string`, `color`
- series forms of those types
- reference types: `line`, `label`, `box`, `table`
- collections: arrays, matrices, maps
- user-defined types (UDTs)

Collections must use a single element type and should declare a template when initialized with `na`.

### Why it matters

Strong typing prevents invalid calls and shapes function signatures.

### Common mistakes

- Mixing series and simple values incorrectly.
- Passing a drawing ID where a numeric value is required.
- Omitting generic types on `array<type>` or `matrix<type>` declarations initialized with `na`.

### Advanced usage

- Typed helper functions for collections.
- Enum-driven inputs.
- UDTs that wrap collections or references.

### Model learning goals

- Emit correct type identifiers.
- Distinguish series from non-series values.
- Select the right collection type for the job.

## 3. Series Behavior

### What it is

A series stores one value per bar. Historical access uses the `[]` operator, for example `close[1]`.

### Why it matters

Many indicators rely on prior-bar values, and MTF requests can repaint if offsets are handled incorrectly.

### Common mistakes

- Treating series like arrays.
- Failing to offset higher-timeframe series when needed.
- Using dynamic history references in restricted contexts.

### Advanced usage

- `ta.valuewhen()`
- `ta.barssince()`
- state machines built on multiple series

### Model learning goals

- Use `[]` only for time-series history.
- Know when a `[1]` offset is needed for safety.
- Avoid invalid dynamic indexing in `request.*()` expressions.

## 4. `var` and `varip`

### What they are

- `var`: initialize once, then persist across bars
- `varip`: similar persistence, but supports intrabar updates during realtime processing and has stricter type limits

### Why they matter

Without persistent storage, counters, arrays, objects, and drawings reset every bar.

### Common mistakes

- Forgetting `var` for arrays that should grow over time.
- Using `varip` with unsupported complex values.

### Advanced usage

- Persistent trade-state objects
- intrabar counters for scalping logic

### Model learning goals

- Use `var` for state that must survive across bars.
- Respect `varip` limitations.

## 5. Arrays

### What they are

Arrays are one-dimensional collections with a single element type, accessed through functions or methods such as:

- `array.get()` / `.get()`
- `array.set()` / `.set()`
- `array.push()` / `.push()`

### Why they matter

Arrays enable variable-length storage when built-in series behavior is not enough.

### Common mistakes

- Using `arr[i]` instead of `arr.get(i)`.
- Not typing `array<float>` when initializing with `na`.
- Letting persistent arrays grow without limits.

### Advanced usage

- rolling windows with `shift()` and `unshift()`
- arrays of UDTs
- arrays of references or nested collections

### Model learning goals

- Declare arrays correctly.
- Guard with `size()` before access.
- Persist them with `var` when needed.

## 6. Matrices

### What they are

Matrices are two-dimensional typed collections indexed by row and column.

### Why they matter

They fit correlation grids, tabular risk models, and multi-asset calculations better than nested arrays.

### Common mistakes

- Treating them like arrays or using bracket syntax.
- Omitting type templates.
- Exceeding the 100,000-element platform limit.

### Advanced usage

- `transpose()`
- `sum()`
- persistent selective updates

### Model learning goals

- Use `matrix.get()` and `matrix.set()`.
- Manage row and column growth carefully.

## 7. Maps

### What they are

Maps store unique keys and values, enabling direct lookup by key.

### Why they matter

They work well for timestamped levels, symbol settings, or keyed state.

### Common mistakes

- Using unsupported key types.
- Assuming map iteration preserves insertion order.

### Advanced usage

- maps of arrays
- maps of UDTs
- session or color configurations keyed by string

### Model learning goals

- Choose maps when random access by key is needed.
- Declare valid key and value types.

## 8. Objects and User-Defined Types

### What they are

UDTs group related fields into a single logical object. Instances are created with `.new()` and fields are accessed with dot notation.

### Why they matter

UDTs improve readability and let complex state travel through arrays and maps cleanly.

### Common mistakes

- Missing field initialization.
- Misordered constructor arguments.
- Assuming field persistence happens automatically without careful variable handling.

### Advanced usage

- nested UDTs
- UDTs containing collections
- domain objects such as `Trade`, `Pivot`, or `ExitState`

### Model learning goals

- Declare UDTs cleanly.
- Use factory patterns or defaults.
- Persist object state intentionally.

## 9. Methods

### What they are

Pine v6 supports method syntax, for example `myArray.push(value)` instead of `array.push(myArray, value)`.

### Why they matter

Methods improve readability and reduce parameter-order mistakes.

### Common mistakes

- Mixing styles inconsistently.
- Not realizing a function has a method form.

### Advanced usage

- UDT methods for encapsulated behavior
- collection method chaining when supported

### Model learning goals

- Prefer method syntax when available.
- Stay stylistically consistent.

## 10. Loops and Performance Limits

### What they are

Pine supports `for`, `for...in`, and `while`, but scripts must remain within platform execution limits.

### Why they matter

Naive loops can trigger timeouts or invalid request patterns.

### Common mistakes

- Iterating from `0` to `bar_index` without a cap.
- Using loop variables inside `request.security()` or restricted series expressions.

### Advanced usage

- `for [index, value] in array`
- early breaks once a condition is found

### Model learning goals

- Cap loop sizes.
- Avoid dynamic security requests in loops.
- Prefer array methods where possible.

## 11. Bar State Handling

### What it is

The `barstate` namespace describes whether the current bar is first, last, confirmed, historical, or realtime.

### Why it matters

It prevents duplicate drawing, noisy alerts, and historical/realtime mismatches.

### Common mistakes

- Drawing on every tick.
- Treating unconfirmed values as final.

### Advanced usage

- initialize on `barstate.isfirst`
- finalize dashboards on `barstate.islast`
- separate historical from realtime with `barstate.islastconfirmedhistory`

### Model learning goals

- Gate expensive or visual logic with bar-state checks.

## 12. `request.security()` and MTF Correctness

### What it is

`request.security()` evaluates an expression on another symbol or timeframe. Lower-timeframe requests use `request.security_lower_tf()`.

### Why it matters

MTF logic is high-value but easy to get wrong through repainting, invalid dynamic requests, or excessive unique calls.

### Common mistakes

- Dynamic symbol/timeframe usage inside loops.
- Failing to offset series when using `lookahead_on`.
- Exceeding the unique request budget.

### Advanced usage

- tuple requests and destructuring
- `calc_bars_count` to reduce work
- bundled requests to minimize unique calls

### Model learning goals

- Keep symbol/timeframe inputs valid and stable.
- Offset expressions appropriately for non-repaint patterns.
- Bundle values when possible.

## 13. Visuals: Plotting and Drawing

### 13.1 Plots

Use `plot()` for numeric series. Match plot type, color, and pane placement to the intended output.

Common mistakes:

- plotting non-numeric values
- forgetting `overlay=true` for price-pane visuals
- over-plotting too many series

### 13.2 Shapes and Labels

Use:

- `plotshape()`
- `plotchar()`
- `label.new()`
- `line.new()`
- `box.new()`
- `table.new()`

Reference objects must be reused or deleted to avoid platform limits.

### Model learning goals

- Produce readable visuals with minimal clutter.
- Reuse drawing IDs with `var`.
- Update tables only when needed.

## 14. Strategy System

### 14.1 Entries

`strategy.entry()` opens or reverses positions. Direction, quantity, and order style must match the trading logic.

### 14.2 Exits and Multi-Target Logic

`strategy.exit()` can create stop-loss, take-profit, and trailing orders. Multi-target logic requires multiple unique exit IDs and correct sizing.

### 14.3 Partial Exits and Runners

Partial exits should use:

- `qty`
- `qty_percent`
- break-even logic
- optional runner management

### Model learning goals

- Build 1-4 target strategies.
- Calculate correct position splits.
- Implement break-even and trailing logic safely.

## 15. Alerts and Payload Design

Alerts should:

- use `alertcondition()` or `alert()`
- trigger on confirmed logic when appropriate
- include enough context for webhook automation
- communicate symbol, timeframe, entry, stop, and targets where relevant

## 16. Anti-Repaint Patterns

Core anti-repaint principles:

- work on confirmed bars when appropriate
- offset HTF expressions when needed
- avoid future references
- avoid plotting future knowledge onto historical bars

The model must default to safe patterns and clearly document any intentional repaint behavior.

## 17. Sessions and Timezone Handling

Time-aware scripts may rely on:

- session filters
- explicit timezones
- `time()`
- `timestamp()`
- session-related helper functions

The model should be explicit about timezone assumptions.

## 18. Migration and Versioning

All generated scripts should declare:

```pine
//@version=6
```

Migration guidance should account for deprecated syntax such as legacy array declarations.

## 19. Style Guide and Code Organization

Recommended conventions:

- inputs at the top
- named constants over magic numbers
- entry and exit logic separated into clear sections
- helper functions for repeated logic
- descriptive naming
- sparse, useful comments

## 20. Libraries and Reusable Functions

Reusable Pine logic should be structured as libraries where appropriate, with clear namespaces, documented parameters, and predictable side effects.

