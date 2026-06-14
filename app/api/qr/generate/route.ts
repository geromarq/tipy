import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { createClient } from "@/lib/supabase/server"
import { generateSlug } from "@/lib/utils"
import QRCode from "qrcode"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(1).max(100),
  venue: z.string().max(100).optional(),
  genre: z.string().max(100).optional(),
  message: z.string().max(300).optional(),
  start_time: z.string(),
  end_time: z.string(),
})

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 })
  }

  const data = parsed.data
  const admin = await createAdminClient()

  // Create event
  const { data: event, error: eventError } = await admin
    .from("events")
    .insert({
      user_id: user.id,
      name: data.name,
      venue: data.venue ?? null,
      genre: data.genre ?? null,
      message: data.message ?? null,
      start_time: data.start_time,
      end_time: data.end_time,
      is_active: true,
    })
    .select("id")
    .single()

  if (eventError || !event) {
    return NextResponse.json({ error: "Error creando evento" }, { status: 500 })
  }

  // Generate unique slug
  let slug = generateSlug(6)
  let attempts = 0
  while (attempts < 5) {
    const { data: existing } = await admin.from("qr_codes").select("id").eq("slug", slug).single()
    if (!existing) break
    slug = generateSlug(6)
    attempts++
  }

  // Insert QR record
  const { data: qrRecord, error: qrError } = await admin
    .from("qr_codes")
    .insert({
      event_id: event.id,
      slug,
      label: data.name,
      is_active: true,
    })
    .select("id, slug")
    .single()

  if (qrError || !qrRecord) {
    return NextResponse.json({ error: "Error creando QR" }, { status: 500 })
  }

  // Generate QR PNG
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://tipy.uy"
  const qrUrl = `${appUrl}/q/${slug}`

  const qrPngBase64 = await QRCode.toDataURL(qrUrl, {
    errorCorrectionLevel: "H",
    width: 512,
    margin: 2,
    color: { dark: "#7c3aed", light: "#09090b" },
  })

  return NextResponse.json({
    slug,
    qrUrl: qrPngBase64,
    eventId: event.id,
    qrId: qrRecord.id,
    link: qrUrl,
  })
}
