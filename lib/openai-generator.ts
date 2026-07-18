import OpenAI from "openai";
import { z } from "zod";
import { generateFallbackStrategy } from "@/lib/pine-fallback";
import type { BuildMode, PineGenerationResponse } from "@/lib/types";

const pineGenerationSchema = z.object({
  summary: z.string(),
  spec: z.object({
    title: z.string(),
    type: z.enum(["indicator", "strategy"]),
    summary: z.string(),
    indicators: z.array(z.string()),
    entryLogic: z.array(z.string()),
    exitLogic: z.array(z.string()),
    riskNotes: z.array(z.string()),
  }),
  code: z.string(),
  warnings: z.array(z.string()),
});

const responseSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    summary: { type: "string" },
    spec: {
      type: "object",
      additionalProperties: false,
      properties: {
        title: { type: "string" },
        type: { type: "string", enum: ["indicator", "strategy"] },
        summary: { type: "string" },
        indicators: {
          type: "array",
          items: { type: "string" },
        },
        entryLogic: {
          type: "array",
          items: { type: "string" },
        },
        exitLogic: {
          type: "array",
          items: { type: "string" },
        },
        riskNotes: {
          type: "array",
          items: { type: "string" },
        },
      },
      required: ["title", "type", "summary", "indicators", "entryLogic", "exitLogic", "riskNotes"],
    },
    code: { type: "string" },
    warnings: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["summary", "spec", "code", "warnings"],
} as const;

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new OpenAI({ apiKey });
}

export async function generatePineFromPrompt(prompt: string, mode: BuildMode): Promise<PineGenerationResponse> {
  const client = getClient();

  if (!client) {
    return generateFallbackStrategy(prompt, mode);
  }

  try {
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5",
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text:
                "You are a senior Pine Script v6 engineer. Convert the user's request into production-minded Pine code. Return only valid JSON matching the schema. Prefer anti-repaint patterns, clear inputs, descriptive variable names, and safe request.security usage. If details are missing, make reasonable assumptions and state them in warnings.",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Build a ${mode} in Pine Script v6 from this prompt:\n\n${prompt}\n\nRequirements:\n- Output complete Pine v6 code.\n- Include alertcondition calls when appropriate.\n- If mode is strategy, include entries and exits.\n- Keep the script readable and modular.\n- The JSON field spec.type must be ${mode}.`,
            },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "pine_generation_response",
          schema: responseSchema,
          strict: true,
        },
      },
    });

    const parsed = pineGenerationSchema.parse(JSON.parse(response.output_text));

    return {
      ...parsed,
      source: "openai",
    };
  } catch (error) {
    const fallback = generateFallbackStrategy(prompt, mode);

    return {
      ...fallback,
      warnings: [
        `OpenAI generation failed and local fallback was used: ${error instanceof Error ? error.message : "Unknown error"}`,
        ...fallback.warnings,
      ],
    };
  }
}
