import { NextResponse } from "next/server";
import { profileText } from "@/app/lib/profile";

export function GET() {
  return new NextResponse(profileText, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
