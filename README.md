# Pine Script AI Generator

AI Pine Script v6 generator — a Next.js + OpenAI platform that turns natural-language trading ideas into TradingView indicators and strategies, with validate/repair APIs, an editor workspace, and a Pine v6 knowledge base.

## Features

- Natural-language to Pine Script v6: describe a trading idea and get a working TradingView indicator or strategy.
- `/api/generate` route backed by the OpenAI API, with a deterministic fallback generator when no key is configured.
- `/api/validate` route that checks generated Pine source against a set of v6 rules and surfaces structured diagnostics.
- `/api/repair` route that takes failing code plus validation errors and returns a corrected version.
- Editor workspace UI for iterating on prompts, viewing generated code, and running validate/repair loops.
- Pine v6 knowledge base and capability matrix under `docs/` driving prompt design and error taxonomy.
- Shared TypeScript types and Zod schemas for the generate / validate / repair contracts.

## Stack

- Next.js 16 (App Router) with React 19 and TypeScript
- OpenAI Node SDK for generation
- Zod for schema validation
- Tailwind CSS 4 for styling
- ESLint for linting

## Getting started

```bash
npm install
cp .env.example .env.local   # add your OPENAI_API_KEY
npm run dev
```

Then open http://localhost:3000. The workspace lives at `/workspace`.

Environment variables (see `.env.example`):

- `OPENAI_API_KEY` — your OpenAI API key. Without it, the app uses the built-in fallback generator.
- `OPENAI_MODEL` — model id to use for generation.

## Documentation

Design and reference material lives in [`docs/`](./docs):

- [PRD](./docs/PRD.md), [Architecture](./docs/ARCHITECTURE.md), [API Contracts](./docs/API_CONTRACTS.md)
- [Pine Knowledge Map](./docs/PINE_KNOWLEDGE_MAP.md), [Capability Matrix](./docs/PINE_CAPABILITY_MATRIX.md)
- [Error Taxonomy](./docs/ERROR_TAXONOMY.md), [Evaluation Design](./docs/EVALS.md), [Training Plan](./docs/TRAINING_PLAN.md)
- [UX Blueprint](./docs/UX_BLUEPRINT.md), [Competitor Analysis](./docs/COMPETITOR_ANALYSIS.md)

## Notes

Generated Pine Script is a starting point, not financial advice. No profit guarantees. Always review, validate, and backtest generated indicators and strategies on TradingView before relying on them.

## Author

Built by [Jayadev Rana](https://jayadevrana.in) — @bluealgocapital · [YouTube](https://www.youtube.com/@jayadevrana3657) · [GitHub](https://github.com/jayadevrana)
