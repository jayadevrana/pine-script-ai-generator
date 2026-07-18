# API Contracts

This document defines the TypeScript-style interfaces for the initial API surface.

## Conventions

- Successful responses return `data`.
- Errors return `error` with `code` and `message`.
- JSON is used for all request and response bodies.

## Shared Types

```ts
interface ApiError {
  code: string;
  message: string;
}
```

## `/api/generate`

```ts
interface GenerateRequest {
  requirement?: RequirementSpec;
  indicatorSpec?: IndicatorSpec;
  strategySpec?: StrategySpec;
}

interface GenerateResponse {
  data?: {
    spec: IndicatorSpec | StrategySpec;
    code: string;
    errors: string[];
  };
  error?: ApiError;
}
```

## `/api/validate`

```ts
interface ValidateRequest {
  code: string;
}

interface ValidateResponse {
  data?: {
    errors: string[];
    metrics: Record<string, unknown>;
  };
  error?: ApiError;
}
```

## `/api/repair`

```ts
interface RepairRequest {
  code: string;
  errorMessages: string[];
  spec?: IndicatorSpec | StrategySpec;
}

interface RepairResponse {
  data?: {
    fixedCode: string;
    report: string;
  };
  error?: ApiError;
}
```

## `/api/projects`

```ts
interface ProjectSummary {
  id: string;
  title: string;
  type: "indicator" | "strategy" | "debug";
  updatedAt: string;
}

interface GetProjectsResponse {
  data?: ProjectSummary[];
  error?: ApiError;
}

interface SaveProjectRequest {
  id?: string;
  title: string;
  type: "indicator" | "strategy" | "debug";
  spec: IndicatorSpec | StrategySpec;
  code: string;
}

interface SaveProjectResponse {
  data?: {
    id: string;
    updatedAt: string;
  };
  error?: ApiError;
}
```

## `/api/examples`

```ts
interface ExampleEntry {
  id: string;
  name: string;
  description: string;
  spec: IndicatorSpec | StrategySpec;
  code: string;
}

interface GetExamplesResponse {
  data?: ExampleEntry[];
  error?: ApiError;
}
```

## Core Domain Schemas

```ts
interface RequirementSpec {
  title: string;
  description: string;
  type: "indicator" | "strategy" | "debug";
  inputs?: Record<string, unknown>;
  risk?: RiskSpec;
  exitPlan?: ExitPlan;
}

interface IndicatorSpec {
  title: string;
  inputs: Record<string, unknown>;
  calculations: string[];
  plotConfig: VisualSpec;
  alerts?: AlertSpec;
}

interface StrategySpec extends IndicatorSpec {
  entryLogic: string[];
  exitPlan: ExitPlan;
  riskManagement: RiskSpec;
  pyramiding?: number;
  sessionFilter?: string;
  mtfFilter?: string;
}

interface RiskSpec {
  type: "fixed" | "percent" | "points" | "ATR" | "swing";
  value?: number;
  atrLength?: number;
  swingLookback?: number;
  breakEvenAfter?: number;
  trailing?: {
    startAfterTarget?: number;
    step?: number;
  };
}

interface ExitPlan {
  targets: {
    id: string;
    percent: number;
    mode: "fixed" | "percent" | "points" | "ATR" | "RR";
    value: number;
  }[];
  runner?: boolean;
  breakEvenAfter?: number;
  trailingAfter?: number;
}

interface VisualSpec {
  colours: Record<string, string>;
  plotShapes?: Record<string, string>;
  showDashboard?: boolean;
  dashboardFields?: string[];
}

interface AlertSpec {
  conditions: {
    id: string;
    message: string;
    trigger: string;
  }[];
  webhookURL?: string;
  includePositionSize?: boolean;
}
```

## Implementation Note

These interfaces should eventually move into a shared `lib/types` or `lib/contracts` module so both frontend and backend use the same types.

