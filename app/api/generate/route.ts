import { NextResponse } from "next/server";
import { z } from "zod";
import { generatePineFromPrompt } from "@/lib/openai-generator";

const requestSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters."),
  mode: z.enum(["indicator", "strategy"]).default("strategy"),
});

export async function POST(request: Request) {
  try {
    const body = requestSchema.parse(await request.json());
    const result = await generatePineFromPrompt(body.prompt, body.mode);

    return NextResponse.json({ data: result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: error.issues[0]?.message || "Invalid request body.",
          },
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: {
          code: "GENERATION_ERROR",
          message: error instanceof Error ? error.message : "Unable to generate Pine code.",
        },
      },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json({
    data: {
      message: "POST a JSON body with { prompt, mode } to generate Pine code.",
    },
  });
}
