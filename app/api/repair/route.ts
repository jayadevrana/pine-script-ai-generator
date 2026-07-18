import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    data: {
      fixedCode: "// Repair output placeholder",
      report: "This is a stubbed repair endpoint for the MVP shell.",
    },
  });
}
