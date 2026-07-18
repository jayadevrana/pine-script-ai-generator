"use client";

import Link from "next/link";
import { useDeferredValue, useState, useTransition } from "react";
import { exampleRequirement } from "@/lib/mock-data";
import type { BuildMode, PineGenerationResponse } from "@/lib/types";

const presets = [
  {
    label: "London EMA",
    prompt:
      "Build a Pine Script v6 strategy that buys when the 9 EMA crosses above the 21 EMA, only takes longs during the London session, uses a 1.8 ATR stop, takes 50% off at 1R, moves stop to break-even, and trails the remainder.",
  },
  {
    label: "Supertrend RR",
    prompt:
      "Create a strategy that enters on Supertrend flips confirmed by RSI above 55, risks with swing low stops, and exits with three RR-based profit targets.",
  },
  {
    label: "Mean Reversion",
    prompt:
      "Make an indicator that marks mean-reversion entries when price pierces Bollinger Bands and RSI diverges, with alerts only on confirmed closes.",
  },
];

const workspaceNotes = [
  "Custom Pine Script indicator development",
  "Multi-target strategy logic",
  "TradingView alert-ready scripts",
  "Non-repaint conscious tooling",
];

function DetailList({
  title,
  items,
  emptyState,
}: {
  title: string;
  items?: string[];
  emptyState: string;
}) {
  return (
    <div className="detail-block">
      <h3>{title}</h3>
      <ul className="feature-list compact">
        {(items?.length ? items : [emptyState]).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function WorkspaceClient() {
  const [prompt, setPrompt] = useState(exampleRequirement);
  const [mode, setMode] = useState<BuildMode>("strategy");
  const [result, setResult] = useState<PineGenerationResponse | null>(null);
  const [validation, setValidation] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copyState, setCopyState] = useState("Copy Code");
  const [isPending, startTransition] = useTransition();
  const deferredPrompt = useDeferredValue(prompt);
  const promptWords = deferredPrompt.trim() ? deferredPrompt.trim().split(/\s+/).length : 0;
  const checksStatus = result ? (validation.length ? `${validation.length} issues` : "validated") : "standby";

  function handleGenerate() {
    setError(null);
    setValidation([]);
    setCopyState("Copy Code");

    startTransition(async () => {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
            mode,
          }),
        });

        const payload = (await response.json()) as
          | { data: PineGenerationResponse }
          | { error: { message: string } };

        if (!response.ok || !("data" in payload)) {
          throw new Error("error" in payload ? payload.error.message : "Generation failed.");
        }

        setResult(payload.data);

        const validationResponse = await fetch("/api/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: payload.data.code,
          }),
        });

        const validationPayload = (await validationResponse.json()) as
          | { data: { errors: string[] } }
          | { error: { message: string } };

        if (!validationResponse.ok || !("data" in validationPayload)) {
          throw new Error(
            "error" in validationPayload ? validationPayload.error.message : "Validation failed.",
          );
        }

        setValidation(validationPayload.data.errors);
      } catch (caughtError) {
        setError(caughtError instanceof Error ? caughtError.message : "Something went wrong.");
      }
    });
  }

  async function copyCode() {
    if (!result?.code) {
      return;
    }

    await navigator.clipboard.writeText(result.code);
    setCopyState("Copied");
    window.setTimeout(() => {
      setCopyState("Copy Code");
    }, 1800);
  }

  return (
    <div className="page workspace-page">
      <section className="workspace-top shell-panel">
        <div className="workspace-top-copy">
          <p className="section-eyebrow">PSQPine Workspace</p>
          <h1>Founder-branded Pine generation with a cleaner development workflow.</h1>
          <p className="hero-description">
            Write the prompt, inspect the blueprint, review Pine code, and keep the
            process aligned with a premium technical studio rather than a generic text box.
          </p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={handleGenerate} type="button" disabled={isPending}>
              {isPending ? "Generating..." : "Build Pine Script"}
            </button>
            <a
              className="button button-secondary"
              href="https://wa.me/917735268199"
              target="_blank"
              rel="noreferrer"
            >
              Contact Jayadev
            </a>
          </div>
        </div>

        <div className="workspace-top-status">
          <div className="status-card">
            <span>Mode</span>
            <strong>{mode}</strong>
          </div>
          <div className="status-card">
            <span>Prompt size</span>
            <strong>{promptWords} words</strong>
          </div>
          <div className="status-card">
            <span>Generator</span>
            <strong>{result?.source ?? "standby"}</strong>
          </div>
          <div className="status-card">
            <span>Checks</span>
            <strong>{checksStatus}</strong>
          </div>
        </div>
      </section>

      <section className="workspace-main-grid">
        <div className="workspace-composer-column">
          <section className="shell-panel composer-panel">
            <div className="panel-head">
              <div>
                <p className="card-label">Prompt composer</p>
                <h2>Describe the strategy or indicator with technical clarity.</h2>
              </div>
              <span className="status-pill">{isPending ? "thinking" : "ready"}</span>
            </div>

            <div className="mode-switch">
              <button
                className={`mode-toggle${mode === "strategy" ? " mode-toggle-active" : ""}`}
                onClick={() => setMode("strategy")}
                type="button"
              >
                Strategy
              </button>
              <button
                className={`mode-toggle${mode === "indicator" ? " mode-toggle-active" : ""}`}
                onClick={() => setMode("indicator")}
                type="button"
              >
                Indicator
              </button>
            </div>

            <div className="preset-row">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  className="preset-chip"
                  onClick={() => setPrompt(preset.prompt)}
                  type="button"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <label className="input-label" htmlFor="requirement">
              Prompt
            </label>
            <textarea
              id="requirement"
              className="editor-surface prompt-editor"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Describe entry logic, filters, stops, targets, session rules, alerts, or output expectations."
            />

            <div className="composer-footer">
              <div className="meter-row">
                <span>{promptWords} words</span>
                <span>{mode === "strategy" ? "orders enabled" : "indicator mode"}</span>
                <span>software / IT only</span>
              </div>
              <div className="composer-actions">
                <button className="button button-primary" onClick={handleGenerate} type="button" disabled={isPending}>
                  {isPending ? "Generating..." : "Generate"}
                </button>
                {result ? (
                  <button className="button button-secondary" onClick={copyCode} type="button">
                    {copyState}
                  </button>
                ) : null}
              </div>
            </div>

            {error ? <p className="error-text">{error}</p> : null}
          </section>

          <section className="shell-panel workspace-side-note">
            <p className="card-label">Studio focus</p>
            <ul className="feature-list compact">
              {workspaceNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <p className="small-compliance">
              Software / IT services only. This workspace helps draft Pine development
              outputs and does not provide financial advice.
            </p>
          </section>
        </div>

        <section className="workspace-output-column">
          <section className="shell-panel code-panel">
            <div className="panel-head">
              <div>
                <p className="card-label">Generated Pine</p>
                <h2>Code surface</h2>
              </div>
              <span className="status-pill">pine v6</span>
            </div>
            <pre className="editor-surface code-surface">
              {result?.code ?? "Generated Pine Script will appear here once you build from the prompt."}
            </pre>
          </section>

          <div className="workspace-review-grid">
            <section className="shell-panel detail-panel">
              <div className="panel-head">
                <div>
                  <p className="card-label">Blueprint</p>
                  <h2>Structured output</h2>
                </div>
                <span className="status-pill">{result?.source ?? "idle"}</span>
              </div>

              <div className="detail-stack">
                <div className="detail-block">
                  <h3>Summary</h3>
                  <p className="panel-description">{result?.summary ?? "No build has been generated yet."}</p>
                </div>
                <DetailList
                  title="Indicators"
                  items={result?.spec.indicators}
                  emptyState="Generate from the prompt to view indicator or logic modules."
                />
                <DetailList
                  title="Entry logic"
                  items={result?.spec.entryLogic}
                  emptyState="Entry rules will appear after generation."
                />
                <DetailList
                  title="Exit and risk"
                  items={result ? [...result.spec.exitLogic, ...result.spec.riskNotes] : undefined}
                  emptyState="Exit and risk notes will appear after generation."
                />
              </div>
            </section>

            <section className="shell-panel detail-panel">
              <div className="panel-head">
                <div>
                  <p className="card-label">Review board</p>
                  <h2>Warnings and checks</h2>
                </div>
                <Link className="inline-link" href="/">
                  Back to Home
                </Link>
              </div>

              <div className="detail-stack">
                <DetailList
                  title="Warnings"
                  items={result?.warnings}
                  emptyState="No warnings yet."
                />
                <DetailList
                  title="Validation"
                  items={validation}
                  emptyState="Local static validation has not raised issues yet."
                />
              </div>
            </section>

            <section className="shell-panel detail-panel">
              <div className="panel-head">
                <div>
                  <p className="card-label">Raw spec</p>
                  <h2>JSON</h2>
                </div>
              </div>
              <pre className="editor-surface spec-surface">
                {result ? JSON.stringify(result.spec, null, 2) : "Generate a result to inspect the raw spec."}
              </pre>
            </section>
          </div>
        </section>
      </section>
    </div>
  );
}
