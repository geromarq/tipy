import { NextResponse } from "next/server"
import { createAdminClient, createClient } from "@/lib/supabase/server"
import { encryptToken } from "@/lib/mercadopago/client"
import { z } from "zod"

const schema = z.object({
  access_token: z.string().min(10),
  public_key: z.string().min(10),
})

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const body = await req.json()
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 })
  }

  const { access_token, public_key } = parsed.data

  // Verify the token is valid by calling MP API
  try {
    const verifyRes = await fetch("https://api.mercadopago.com/v1/payment_methods", {
      headers: { Authorization: `Bearer ${access_token}` },
    })
    if (!verifyRes.ok) {
      return NextResponse.json({ error: "Access token inválido" }, { status: 422 })
    }
  } catch {
    return NextResponse.json({ error: "No se pudo verificar el token" }, { status: 422 })
  }

  const encrypted = encryptToken(access_token)
  const admin = await createAdminClient()

  const { error } = await admin.from("mp_credentials").upsert({
    user_id: user.id,
    access_token_encrypted: encrypted,
    public_key,
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id" })

  if (error) return NextResponse.json({ error: "Error guardando credenciales" }, { status: 500 })

  return NextResponse.json({ success: true })
}
