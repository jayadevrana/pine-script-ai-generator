# Model Training and Adaptation Strategy

This document outlines a layered strategy for turning a general-purpose OpenAI model into a strong Pine Script v6 coding agent.

## Guiding Principles

- Layered learning before fine-tuning
- Official documentation as ground truth
- User-owned and public examples only
- Continuous repair loop
- Legal and ethical compliance

## Data Sources

Primary training assets:

- distilled notes from official Pine docs
- user-created examples
- bug-fix pairs
- requirement-to-code pairs
- code review pairs
- visual design pairs
- alert payload examples

## Core Schemas

Training and runtime should center on structured schemas such as:

- `RequirementSpec`
- `IndicatorSpec`
- `StrategySpec`
- `RiskSpec`
- `ExitPlan`
- `VisualSpec`
- `AlertSpec`
- `DebugCase`
- `RepairCase`
- `EvalCase`

These schemas should eventually live in `/lib/schemas` or `/data/schemas`.

## Mandatory Example Categories

- simple indicators
- combined indicators
- stop-loss variants
- multi-target strategies
- dashboard and table overlays
- drawing-heavy scripts
- session and MTF filters
- non-repaint signals
- indicator-to-strategy and strategy-to-indicator conversions
- intentionally broken debug cases

## Learning Approach

### 1. Prompt-only baseline

Start with strong system prompts and targeted retrieval.

### 2. Retrieval-augmented generation

Retrieve:

- docs notes
- example pairs
- repair cases

before generation.

### 3. Repair-loop integration

Compile or statically validate generated code, then feed errors back into a repair stage until the script passes or a repair budget is exhausted.

### 4. Fine-tuning candidate

Fine-tune only after baseline plus retrieval performance plateaus.

### 5. Tool-calling workflow

Teach the system when to use:

- validation tools
- style checks
- backtest or simulation helpers

### 6. Human-in-the-loop curation

Expert review should continuously improve examples, taxonomies, and evaluation criteria.

## Debug Training

The debug curriculum should map directly to the categories in [Error Taxonomy](./ERROR_TAXONOMY.md), including:

- syntax errors
- undeclared identifiers
- argument type mismatches
- series vs simple conflicts
- array bounds issues
- `na` handling problems
- drawing lifecycle mistakes
- `strategy.exit()` misuse
- repaint bugs
- invalid MTF requests

## Evaluation Feedback Loop

Performance should be tracked with benchmark suites and fed back into:

- new example creation
- repair-case expansion
- targeted prompt improvements
- future fine-tuning datasets

## Outcome

The target system should be able to:

- convert natural language into valid Pine v6 code
- catch and repair common compiler issues
- follow anti-repaint best practices
- generate readable, modular indicators and strategies

