# Pine Script Error Taxonomy

This taxonomy classifies common Pine Script v6 compiler and runtime issues and provides repair direction for each category.

## 1. Syntax Errors

Cause:

- missing parentheses
- missing commas
- malformed blocks or keywords

Recommended fix:

- repair the grammar issue directly
- re-run compile validation

## 2. Undeclared Identifier

Cause:

- typo
- variable referenced before declaration
- missing import or helper declaration

Recommended fix:

- correct the name or add the missing declaration

## 3. Wrong Argument Type

Cause:

- series passed where a simple value is required
- wrong reference type
- bad input type

Recommended fix:

- replace with an input or literal
- convert to the expected type

## 4. Series vs Simple Mismatch

Cause:

- invalid mixing of historical series and scalar values
- array access or request expressions used incorrectly

Recommended fix:

- rewrite the logic using proper history references or explicit conversion patterns

## 5. Array Index Out of Bounds

Cause:

- accessing an index that does not exist
- negative or unchecked index values

Recommended fix:

- guard access with `array.size()`
- clamp or restructure indexing

## 6. `na` Handling and Conditional Initialization

Cause:

- reading an uninitialized variable
- allowing `na` to flow through arithmetic

Recommended fix:

- initialize state explicitly
- use `nz()` or guard conditions appropriately

## 7. Object Lifecycle Misuse

Cause:

- creating new drawings every bar
- not deleting or reusing references

Recommended fix:

- create once with `var`
- update existing objects instead of recreating them

## 8. Misuse of `strategy.exit()`

Cause:

- duplicate exit IDs
- invalid `from_entry`
- conflicting quantity arguments

Recommended fix:

- assign unique exit IDs
- attach exits to the intended entries
- normalize exit sizing

## 9. Repaint Bugs

Cause:

- future references
- unsafe `lookahead` behavior
- unconfirmed realtime logic treated as final

Recommended fix:

- remove future leakage
- offset HTF expressions when needed
- gate critical logic on confirmed bars

## 10. MTF Security Misuse

Cause:

- dynamic symbol or timeframe usage
- too many unique requests
- unhandled `na` results

Recommended fix:

- keep requests stable and bounded
- bundle expressions where possible
- guard missing values

## 11. Drawing Resource Limits

Cause:

- exceeding object counts
- updating too many labels or table cells unnecessarily

Recommended fix:

- consolidate drawings
- update only when needed

## 12. Logical Entry and Exit Conflicts

Cause:

- overlapping long and short conditions
- conflicting exit rules
- inconsistent state management

Recommended fix:

- add precedence checks
- inspect `strategy.position_size`
- centralize entry and exit coordination

## How to Use This Taxonomy

The repair engine should:

1. classify the error
2. explain the root cause
3. apply the smallest safe fix
4. revalidate the script

