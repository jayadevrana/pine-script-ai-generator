import type { BuildMode, PineGenerationResponse } from "@/lib/types";

function titleFromPrompt(prompt: string, mode: BuildMode) {
  const normalized = prompt
    .replace(/^build\s+(me\s+)?/i, "")
    .replace(/^a\s+/i, "")
    .replace(/^pine\s+script\s+v?6\s+/i, "")
    .replace(/^(strategy|indicator)\s+that\s+/i, "")
    .replace(/^(strategy|indicator)\s+/i, "");

  const cleaned = normalized
    .replace(/[^a-z0-9\s]/gi, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 6)
    .join(" ");

  return cleaned ? `${cleaned} ${mode === "strategy" ? "Strategy" : "Indicator"}` : "Custom Pine Script";
}

export function generateFallbackStrategy(prompt: string, mode: BuildMode): PineGenerationResponse {
  const lowered = prompt.toLowerCase();
  const usesAtr = lowered.includes("atr");
  const usesRsi = lowered.includes("rsi");
  const usesEma = lowered.includes("ema");
  const title = titleFromPrompt(prompt, mode);

  const code = `//@version=6
${mode}("${title}", overlay=true${mode === "strategy" ? ", pyramiding=0, initial_capital=10000" : ""})

// Prompt basis:
// ${prompt.replace(/\n/g, " ").slice(0, 180)}

fastLength = input.int(${usesEma ? 10 : 9}, "Fast Length", minval=1)
slowLength = input.int(${usesEma ? 20 : 21}, "Slow Length", minval=1)
${usesRsi ? 'rsiLength = input.int(14, "RSI Length", minval=1)' : ""}
${usesAtr && mode === "strategy" ? 'atrLength = input.int(14, "ATR Length", minval=1)\natrMultiplier = input.float(1.5, "ATR Multiplier", step=0.1, minval=0.1)' : ""}

fastLine = ta.ema(close, fastLength)
slowLine = ta.ema(close, slowLength)
${usesRsi ? "rsiValue = ta.rsi(close, rsiLength)" : ""}
${usesAtr && mode === "strategy" ? "atrValue = ta.atr(atrLength)" : ""}

longCondition = ta.crossover(fastLine, slowLine)${usesRsi ? " and rsiValue > 50" : ""}
shortCondition = ta.crossunder(fastLine, slowLine)${usesRsi ? " and rsiValue < 50" : ""}

${mode === "strategy"
    ? `if longCondition
    strategy.entry("Long", strategy.long)

if shortCondition
    strategy.entry("Short", strategy.short)

longStop = strategy.position_avg_price - ${usesAtr ? "atrValue * atrMultiplier" : "strategy.position_avg_price * 0.01"}
longTarget = strategy.position_avg_price + ${usesAtr ? "(atrValue * atrMultiplier) * 2.0" : "strategy.position_avg_price * 0.02"}
shortStop = strategy.position_avg_price + ${usesAtr ? "atrValue * atrMultiplier" : "strategy.position_avg_price * 0.01"}
shortTarget = strategy.position_avg_price - ${usesAtr ? "(atrValue * atrMultiplier) * 2.0" : "strategy.position_avg_price * 0.02"}

strategy.exit("Long Exit", from_entry="Long", stop=longStop, limit=longTarget)
strategy.exit("Short Exit", from_entry="Short", stop=shortStop, limit=shortTarget)`
    : `plotshape(longCondition, title="Buy", style=shape.triangleup, location=location.belowbar, color=color.new(color.green, 0), size=size.small)
plotshape(shortCondition, title="Sell", style=shape.triangledown, location=location.abovebar, color=color.new(color.red, 0), size=size.small)`}

plot(fastLine, "Fast Line", color=color.new(color.teal, 0), linewidth=2)
plot(slowLine, "Slow Line", color=color.new(color.orange, 0), linewidth=2)
${usesRsi ? `\nalertcondition(longCondition, "Long Signal", "Long signal detected")\nalertcondition(shortCondition, "Short Signal", "Short signal detected")` : ""}`;

  return {
    summary:
      mode === "strategy"
        ? "Generated a local fallback Pine strategy shell based on crossover logic and optional ATR/RSI hints from the prompt."
        : "Generated a local fallback Pine indicator shell based on crossover logic and optional ATR/RSI hints from the prompt.",
    spec: {
      title,
      type: mode,
      summary: "Fallback spec generated locally because OpenAI is unavailable or not configured.",
      indicators: [
        usesEma ? "EMA crossover" : "Moving average crossover",
        ...(usesRsi ? ["RSI filter"] : []),
        ...(usesAtr ? ["ATR risk sizing"] : []),
      ],
      entryLogic: [
        "Long on fast/slow crossover.",
        "Short on fast/slow crossunder.",
      ],
      exitLogic:
        mode === "strategy"
          ? ["Single bracket exit using fixed or ATR-derived stop and target."]
          : ["Visual markers only; no order execution in indicator mode."],
      riskNotes:
        mode === "strategy"
          ? [usesAtr ? "ATR-based stop enabled." : "Percent-style fallback stop enabled."]
          : ["Risk settings are informational in indicator mode."],
    },
    code,
    warnings: [
      "OpenAI generation was unavailable, so the app used a deterministic local fallback.",
    ],
    source: "fallback",
  };
}
