import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const admin = await createAdminClient()

  // Just marks as pending (already is) — used when user skips tip
  const { error } = await admin
    .from("suggestions")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "pending")

  if (error) return NextResponse.json({ error: "Error" }, { status: 500 })

  return NextResponse.json({ success: true })
}
