import { NextResponse } from "next/server"
import { createAdminClient, createClient } from "@/lib/supabase/server"
import { z } from "zod"

const schema = z.object({
  displayName: z.string().min(2).max(50),
  slug: z.string().min(2).max(50).regex(/^[a-z0-9-]+$/),
  bio: z.string().max(300).optional(),
  instagram: z.string().max(100).optional(),
})

export async function PATCH(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const body = await req.json()
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 })
  }

  const { displayName, slug, bio, instagram } = parsed.data
  const admin = await createAdminClient()

  // Check slug uniqueness (excluding current user)
  const { data: existing } = await admin
    .from("users")
    .select("id")
    .eq("slug", slug)
    .neq("id", user.id)
    .single()

  if (existing) {
    return NextResponse.json({ error: "Ese slug ya está en uso" }, { status: 409 })
  }

  const { error } = await admin
    .from("users")
    .update({
      display_name: displayName,
      slug,
      bio: bio ?? null,
      instagram: instagram ?? null,
    })
    .eq("id", user.id)

  if (error) return NextResponse.json({ error: "Error actualizando perfil" }, { status: 500 })

  return NextResponse.json({ success: true })
}
