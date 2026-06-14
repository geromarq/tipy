import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { z } from "zod"

const schema = z.object({
  qr_slug: z.string().min(1).max(20),
  rating: z.number().int().min(1).max(10),
  session_token: z.string().optional(),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 })
  }

  const { qr_slug, rating, session_token } = parsed.data
  const admin = await createAdminClient()

  // Resolve QR → event → DJ
  const { data: qr } = await admin
    .from("qr_codes")
    .select("id, is_active, event:events(id, user_id, is_active)")
    .eq("slug", qr_slug)
    .single()

  if (!qr || !qr.is_active) {
    return NextResponse.json({ error: "QR no válido" }, { status: 404 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const event = (qr.event as any) as { id: string; user_id: string; is_active: boolean }
  if (!event?.is_active) {
    return NextResponse.json({ error: "Evento no activo" }, { status: 410 })
  }

  // Check for duplicate session vote (soft dedup — not an error, just ignore)
  if (session_token) {
    const { data: existing } = await admin
      .from("vibe_ratings")
      .select("id")
      .eq("event_id", event.id)
      .eq("session_token", session_token)
      .single()

    if (existing) {
      // Allow re-vote — just update
      await admin
        .from("vibe_ratings")
        .update({ rating })
        .eq("id", existing.id)

      return NextResponse.json({ success: true })
    }
  }

  const { error } = await admin.from("vibe_ratings").insert({
    qr_code_id: qr.id,
    event_id: event.id,
    dj_user_id: event.user_id,
    rating,
    session_token: session_token ?? null,
  })

  if (error) return NextResponse.json({ error: "Error" }, { status: 500 })

  return NextResponse.json({ success: true })
}
