import { NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  code: z.string().min(1, "Code is required."),
});

function validatePine(code: string) {
  const errors: string[] = [];

  if (!code.includes("//@version=6")) {
    errors.push("Missing Pine version directive `//@version=6`.");
  }

  if (!code.includes("indicator(") && !code.includes("strategy(")) {
    errors.push("Code must declare either indicator() or strategy().");
  }

  return errors;
}

export async function POST(request: Request) {
  try {
    const body = requestSchema.parse(await request.json());
    const errors = validatePine(body.code);

    return NextResponse.json({
      data: {
        errors,
        metrics: {
          validationMode: "local-static-check",
          isValid: errors.length === 0,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: error instanceof Error ? error.message : "Unable to validate code.",
        },
      },
      { status: 400 },
    );
  }
}

export function GET() {
  return NextResponse.json({
    data: {
      errors: [],
      metrics: {
        compileStatus: "stubbed-pass",
        note: "Replace this route with a Pine validation service or parser integration.",
      },
    },
  });
}
