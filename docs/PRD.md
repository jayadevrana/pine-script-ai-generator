# Product Requirements Document (PRD)

## 1. Introduction

### 1.1 Purpose

Build a Pine Script v6 generation platform that converts plain-language trading ideas into TradingView indicators and strategies using OpenAI models.

### 1.2 Scope

The localhost MVP should include:

- a web interface for requirement intake
- structured specification review
- Pine code generation
- validation and repair
- export or copy for TradingView use

### 1.3 Definitions

- Indicator: a TradingView script using `indicator()`
- Strategy: a TradingView script using `strategy()`
- Requirement: plain-language user intent
- Spec: structured JSON representation of intent
- Generation Engine: the pipeline that turns specs into code
- Debugger: the repair-focused workflow for broken scripts
- Eval System: the benchmark and grading framework

## 2. User Stories

- Non-coder wants an indicator from a plain-English prompt.
- Trader wants a strategy with configurable stops, targets, and runners.
- Existing Pine user wants to debug broken code quickly.
- Analyst wants to iterate on versions over time.
- Admin wants to curate training and evaluation assets later.

## 3. Functional Requirements

### 3.1 Requirement Intake

- prompt input area
- mode toggle for indicator, strategy, or debugger
- advanced strategy controls for stop type, targets, and risk settings
- parser that converts user input into a validated spec

### 3.2 Specification Viewer

- structured spec preview
- editable fields for logic and visuals
- schema validation with inline feedback

### 3.3 Generation Engine

- support indicator and strategy generation
- support multi-target exits, break-even, trailing, and runners
- run static validation
- run repair loop if validation fails
- return clean Pine v6 code in an editor

### 3.4 Debugger and Repair Studio

- accept user code and error messages
- classify errors using the taxonomy
- propose fixes with rationale
- support review and application of repairs

### 3.5 Validation and Testing

- compile or statically validate generated code
- run test harnesses for exits, repaint safety, and basic logic
- display pass or fail results and logs

### 3.6 History and Versioning

Planned for V2.

### 3.7 Template Library

Planned for V2, with a limited example gallery acceptable in MVP.

### 3.8 User Settings

- preferred risk units
- default stop and target settings
- theme and advanced options

### 3.9 Export

- one-click copy
- `.pine` file export
- educational-use disclaimer

## 4. Non-Functional Requirements

- Performance: generation should complete quickly for normal requests.
- Reliability: generated code should compile cleanly in most supported cases.
- Maintainability: modular code, schemas, and tests.
- Security: local-first MVP with secrets stored in environment variables.
- Compliance: clear educational-use messaging and no broker connectivity.

## 5. User Interface Design

The UX should center on:

- requirement input
- spec preview
- code editor
- validation and repair panel

See [UX Blueprint](./UX_BLUEPRINT.md) for the detailed interaction model.

## 6. Milestones and MVP Scope

MVP should include:

- planning docs
- project scaffolding
- requirement intake UI
- spec preview
- mocked generation flow
- code editor display
- export action
- stubbed debugger

Deferred to later:

- accounts
- full history
- richer template library
- visual diffing
- collaboration

## 7. Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| Pine feature complexity | Use the knowledge map and curated examples |
| Model hallucinations | Use specs, retrieval, validation, and repair loops |
| User misconfiguration | Clear defaults, labels, and warnings |
| Scope creep | Strict MVP boundaries and a backlog for later |

## 8. Reference Documents

- [Pine Knowledge Map](./PINE_KNOWLEDGE_MAP.md)
- [Capability Matrix](./PINE_CAPABILITY_MATRIX.md)
- [Training Plan](./TRAINING_PLAN.md)
- [Evaluation Design](./EVALS.md)
- [Error Taxonomy](./ERROR_TAXONOMY.md)
- [Architecture](./ARCHITECTURE.md)
- [API Contracts](./API_CONTRACTS.md)
- [UX Blueprint](./UX_BLUEPRINT.md)
