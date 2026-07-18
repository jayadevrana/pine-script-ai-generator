# Technical Architecture

This document defines the MVP architecture for the Pine Script generation platform.

## System Overview

The proposed stack:

- Next.js frontend
- Node.js and TypeScript backend through Next API routes
- Prisma ORM
- SQLite for local MVP persistence
- a standalone generation engine library under `lib/`

## Component View

```text
Browser UI
  -> Next.js app and API routes
  -> Generation engine
  -> Validation and eval subsystem
  -> Prisma
  -> SQLite
```

## Primary Components

### Browser UI

- landing page
- dashboard
- project editor
- debugger

### API Routes

- `/api/generate`
- `/api/validate`
- `/api/repair`
- `/api/projects`
- `/api/examples`

### Generation Engine

Suggested modules:

- `parser.ts`
- `normaliser.ts`
- `planner.ts`
- `generator.ts`
- `validator.ts`
- `repair.ts`
- `utils.ts`

### Persistence

Use Prisma with SQLite for the MVP. Postgres can replace SQLite later with minimal contract changes.

## Database Schema

Suggested tables:

| Table | Purpose |
| --- | --- |
| `User` | Optional account model |
| `Project` | Current saved project state |
| `Version` | Historical snapshots |
| `Example` | Template gallery entries |
| `EvalResult` | Validation and benchmark output |

## Suggested Folder Structure

```text
/
|- app/
|- docs/
|- lib/
|  |- generator/
|  |- prompts/
|  |- schemas/
|- prisma/
|- tests/
|- examples/
|- README.md
```

## API Contract Direction

Responses should follow a consistent shape:

- success: `{ data: ... }`
- failure: `{ error: { code, message } }`

Detailed interfaces live in [API Contracts](./API_CONTRACTS.md).

## Environment Variables

- `DATABASE_URL`
- `OPENAI_API_KEY`
- `NEXTAUTH_SECRET`
- `BASE_URL`

## Local Setup Plan

1. Install dependencies.
2. Generate the Prisma client.
3. Run migrations.
4. Seed example data.
5. Start the Next.js dev server.

## Production Path

For production:

- move from SQLite to Postgres
- add caching and rate limiting for OpenAI calls
- add a job queue for heavy validation tasks
- integrate structured logging and error tracking

## Architectural Goals

- modular generation pipeline
- testable business logic
- clear schema boundaries
- easy local setup with a cloud upgrade path

