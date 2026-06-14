import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ qrSlug: string }> }
) {
  const { qrSlug } = await params
  const supabase = await createClient()

  const { data: qr, error } = await supabase
    .from("qr_codes")
    .select(`
      id,
      slug,
      is_active,
      event:events (
        id,
        name,
        venue,
        genre,
        message,
        start_time,
        end_time,
        is_active,
        dj:users (
          id,
          display_name,
          slug,
          bio,
          instagram,
          avatar_url
        )
      )
    `)
    .eq("slug", qrSlug)
    .single()

  if (error || !qr) {
    return NextResponse.json({ error: "QR no encontrado" }, { status: 404 })
  }

  if (!qr.is_active) {
    return NextResponse.json({ error: "Este QR ya no está activo" }, { status: 410 })
  }

  return NextResponse.json(qr)
}
