import { NextResponse } from "next/server"
import { createAdminClient, createClient } from "@/lib/supabase/server"
import { generateSlug } from "@/lib/utils"
import { z } from "zod"

const schema = z.object({
  displayName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 })
    }

    const { displayName, email, password } = parsed.data

    // Use regular client for signup (anon key is enough for auth.signUp)
    const supabase = await createClient()

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
      },
    })

    if (signUpError) {
      const msg = signUpError.message.toLowerCase()
      if (msg.includes("already registered") || msg.includes("already exists") || msg.includes("email address") ) {
        return NextResponse.json({ error: "Este email ya está registrado" }, { status: 409 })
      }
      if (msg.includes("password")) {
        return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 })
      }
      console.error("[register] signUp error:", signUpError)
      return NextResponse.json({ error: signUpError.message }, { status: 400 })
    }

    const userId = signUpData.user?.id
    if (!userId) {
      return NextResponse.json({ error: "No se pudo crear el usuario" }, { status: 500 })
    }

    // Generate unique slug from display name
    const admin = await createAdminClient()

    const baseSlug = displayName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 30) || "dj"

    let slug = baseSlug
    for (let attempt = 0; attempt < 5; attempt++) {
      const { data: existing } = await admin
        .from("users")
        .select("id")
        .eq("slug", slug)
        .maybeSingle()
      if (!existing) break
      slug = `${baseSlug}-${generateSlug(3)}`
    }

    // Create DJ profile with service role (bypasses RLS)
    const { error: profileError } = await admin.from("users").insert({
      id: userId,
      display_name: displayName,
      slug,
    })

    if (profileError) {
      console.error("[register] profile insert error:", profileError)
      // Don't delete auth user — they can still log in, profile can be recreated
    }

    // Check if email confirmation is required
    const needsConfirmation = !signUpData.session

    return NextResponse.json({ success: true, needsConfirmation })
  } catch (err) {
    console.error("[register] unexpected error:", err)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
