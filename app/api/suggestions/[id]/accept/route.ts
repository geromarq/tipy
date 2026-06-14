import { NextResponse } from "next/server"
import { createAdminClient, createClient } from "@/lib/supabase/server"

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const admin = await createAdminClient()

  // Verify ownership
  const { data: suggestion } = await admin
    .from("suggestions")
    .select("id, dj_user_id, status, contact_email, contact_phone, contact_name")
    .eq("id", id)
    .single()

  if (!suggestion || suggestion.dj_user_id !== user.id) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 })
  }

  if (suggestion.status !== "pending") {
    return NextResponse.json({ error: "La sugerencia ya fue procesada" }, { status: 409 })
  }

  const { error } = await admin
    .from("suggestions")
    .update({ status: "accepted", updated_at: new Date().toISOString() })
    .eq("id", id)

  if (error) return NextResponse.json({ error: "Error" }, { status: 500 })

  // Send notification if contact info available
  if (suggestion.contact_email || suggestion.contact_phone) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-Secret": process.env.INTERNAL_SECRET ?? "",
        },
        body: JSON.stringify({
          type: "suggestion_accepted",
          to_email: suggestion.contact_email,
          to_phone: suggestion.contact_phone,
          name: suggestion.contact_name,
          suggestion_id: id,
        }),
      })
    } catch {}
  }

  return NextResponse.json({ success: true })
}
