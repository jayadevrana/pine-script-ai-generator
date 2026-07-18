export type BuildMode = "indicator" | "strategy";

export interface PineSpec {
  title: string;
  type: BuildMode;
  summary: string;
  indicators: string[];
  entryLogic: string[];
  exitLogic: string[];
  riskNotes: string[];
}

export interface PineGenerationResponse {
  summary: string;
  spec: PineSpec;
  code: string;
  warnings: string[];
  source: "openai" | "fallback";
}
