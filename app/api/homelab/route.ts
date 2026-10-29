import { NextResponse } from "next/server";
import { getHomelabStats } from "@/lib/homelab-server";

export const revalidate = 30;

export async function GET() {
  try {
    const stats = await getHomelabStats();
    return NextResponse.json(stats, {
      headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
    });
  } catch (err) {
    console.error("[homelab]", err);
    return NextResponse.json({ error: "Homelab is unreachable right now" }, { status: 503 });
  }
}
