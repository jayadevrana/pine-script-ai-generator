# UX Blueprint

This document defines the user experience for the Pine Script generation platform.

## Core UX Principles

- Focus on the user's goal.
- Use progressive disclosure.
- Give immediate feedback.
- Keep the product visually consistent and calm.
- Preserve iteration history over time.

## Primary Page Flow

### Landing Page

- headline and value proposition
- link to start a new project
- links to examples and docs
- educational-use disclaimer

### Dashboard

- list of projects
- quick filters by type
- entry point for new projects

### New Project Flow

- choose project title
- choose type: indicator, strategy, or debugger
- open the editor with the right initial template

## Project Editor

The editor should be split into three primary areas:

| Panel | Purpose |
| --- | --- |
| Requirement input | Natural-language prompt area |
| Spec preview | Structured JSON or form editor |
| Code editor | Monaco-based Pine editor |
| Validation panel | Errors, metrics, and repair actions |

## Core Interaction Flow

1. User writes the requirement.
2. System parses it into a structured spec.
3. User reviews or adjusts the spec.
4. System generates Pine code.
5. System validates the result.
6. User repairs, saves, copies, or exports.

## Debugger and Repair Studio

The debugger should let users:

- paste broken Pine code
- attach compiler or runtime errors
- view root-cause classification
- inspect proposed fixes
- revalidate corrected code

## Example Library

Provide a gallery of common examples with:

- name
- short description
- tags
- preview of spec or code

## Settings

Suggested preferences:

- dark or light theme
- accent colors
- default risk-unit preferences
- optional AI tone settings

## UI Components

- text area for requirements
- JSON viewer or schema-driven form
- Monaco editor
- accordions and tabs for advanced settings
- modal dialogs
- toasts for success and error feedback

## Accessibility and Responsiveness

- semantic HTML
- keyboard navigation
- accessible color contrast
- mobile-friendly panel collapsing

## Visual Direction

- neutral, professional palette
- clear typography separation between UI and code
- restrained icon use
- minimal clutter

## Future Enhancements

- embedded backtesting views
- version diffs
- collaborative editing
- dashboard builder
- risk calculators

