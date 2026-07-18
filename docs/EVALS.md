# Evaluation and Grading Design

This document defines how to measure the quality of the Pine Script generation system.

## Grading Rubrics

| Criterion | Description | Grading Method |
| --- | --- | --- |
| Requirement coverage | All requested spec items are implemented | Manual or checklist-based |
| Pine syntax correctness | Script compiles cleanly | Automatic |
| Strategy logic correctness | Entries and exits behave as specified | Manual plus automated backtest checks |
| Risk and target correctness | Stop-loss and TP calculations use the right units and sizing | Unit tests plus review |
| Partial exit correctness | Split exits, break-even, and trailing are wired correctly | Unit tests |
| Visual clarity | Plots and drawings are useful and not cluttered | Review |
| Alert completeness | All expected alerts exist and are labeled correctly | Pattern checks |
| Repaint safety | No future leakage or invalid MTF handling | Code inspection plus scenario checks |
| Code cleanliness | Readable, modular, and well-named | Review |
| Modularity and reuse | Repeated logic is extracted | Review |
| Runtime efficiency | Avoids heavy loops and excessive requests | Inspection and metrics |
| User editability | Inputs are exposed with good defaults | Review |

## Benchmark Suites

### Beginner indicator tasks

- SMA crossover indicator
- RSI threshold indicator
- Bollinger Bands overlay

### Intermediate combined indicators

- Supertrend + EMA + oscillator alignment
- ATR trailing stop indicator
- MTF trend-filtered signal script

### Advanced dashboard indicators

- session dashboard
- support and resistance zones
- trendline auto-plotter

### Strategy tasks with 1-4 exits

- single-target fixed-stop strategy
- two-target ATR strategy with break-even
- four-target swing-stop strategy with trailing runner

### Debug and repair tasks

- undeclared identifiers
- series mismatch
- invalid `request.security()` usage

### Conversion tasks

- indicator to strategy
- strategy to indicator

### Styling tasks

- theme toggles
- configurable colors
- dashboard layout options

## Golden Tasks

The following cases should serve as long-term benchmark anchors:

- three-target ATR strategy
- four-target strategy with session and MTF filters
- partial exit plus optional runner
- stop-mode toggle between fixed, percent, and ATR
- RR-based target calculator
- line-based visual overlays
- array-driven state management
- dashboard table output
- explicit anti-repaint reference implementation

## Evaluation Process

1. Select benchmark cases aligned to the latest improvement target.
2. Generate code using the current system.
3. Run automated validation and tests.
4. Review subjective criteria such as visuals and cleanliness.
5. Aggregate scores.
6. Feed failure patterns back into training and repair data.

## Success Definition

A strong system should consistently produce:

- compile-clean Pine v6 code
- correct entry and exit behavior
- anti-repaint-safe MTF logic
- readable visuals and modular code

