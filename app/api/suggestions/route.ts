import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { z } from "zod"

const schema = z.object({
  qr_slug: z.string().min(1).max(20),
  text: z.string().min(1).max(300),
  matched_track: z.object({
    title: z.string(),
    artist: z.string(),
    album: z.string().optional(),
    image_url: z.string().optional(),
    source: z.enum(["spotify", "lastfm"]),
  }).nullable().optional(),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 })
  }

  const { qr_slug, text, matched_track } = parsed.data
  const admin = await createAdminClient()

  // Resolve QR → event → DJ
  const { data: qr } = await admin
    .from("qr_codes")
    .select("id, event_id, is_active, event:events(id, user_id, is_active)")
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

  const { data: suggestion, error } = await admin
    .from("suggestions")
    .insert({
      qr_code_id: qr.id,
      event_id: event.id,
      dj_user_id: event.user_id,
      text,
      matched_track: matched_track ?? null,
      status: "pending",
    })
    .select("id")
    .single()

  if (error || !suggestion) {
    return NextResponse.json({ error: "Error guardando sugerencia" }, { status: 500 })
  }

  return NextResponse.json({ suggestion_id: suggestion.id })
}
