import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { z } from "zod"

const schema = z.object({
  contact_name: z.string().max(100).nullable().optional(),
  contact_instagram: z.string().max(100).nullable().optional(),
  contact_phone: z.string().max(30).nullable().optional(),
  contact_email: z.string().email().nullable().optional(),
})

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 })
  }

  const admin = await createAdminClient()

  const { error } = await admin
    .from("suggestions")
    .update({
      contact_name: parsed.data.contact_name ?? null,
      contact_instagram: parsed.data.contact_instagram ?? null,
      contact_phone: parsed.data.contact_phone ?? null,
      contact_email: parsed.data.contact_email ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("status", "pending")

  if (error) return NextResponse.json({ error: "Error" }, { status: 500 })

  return NextResponse.json({ success: true })
}
